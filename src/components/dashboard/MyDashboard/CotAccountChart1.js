import React, {Component} from "react";
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import {Popover, Switch ,Col} from "antd";
import {connect} from "react-redux";
import {clearData,cotclickclear,savecotoneoone,saveoneoonetodb} from "appRedux/actions/Exchange";
import {Link} from "react-router-dom";

var cotdataArray = [];
var globalMax = 0;
var globalMin = 0;
class CotChart extends Component {
  state = {
    switchname: '',
    switchvalue: false,
    statedate: '',
    statevalue: '',
    annojson : '{}',
    annojson1 : '{}',
  };
  
  
    onChangescale(event)
    {
      if(event){
        this.setState({
         scalechecked: true,
        });
      }
      else{
        this.setState({
          scalechecked: false,
         });
      }
    }
    create(i,plot){
        var select = document.getElementById("typeSelect_"+i);
        plot.annotations().startDrawing(select.value);
      }
    removeAll(plot){
        plot.annotations().removeAllAnnotations();
      }
    
    render() {
        var height = 0;
        var cotdata = JSON.parse(localStorage.getItem('cotacntstate'));
        var i = 1;
        var newvar = <div></div>
        var newvar1 = <div></div>
        if(cotdata.length > 0 ){
          var series;
          newvar = <div><Switch size="small" name={"scalechange"} className={"scalechange"} onChange={(e)=>this.onChangescale(e)}/>
           { cotdata.map((key,item)=>{
              if(item == 0)
              {
                var chart = anychart.waterfall();
                chart.background().fill("#FFFFFF 0");
                chart.title(key[0].name);
                chart.crosshair(true);
                var switchstate = "switch_"+i;

                //set tooltip on top-right corner --start
                var tooltip = chart.tooltip();
                tooltip.displayMode("union");
                tooltip.positionMode("chart");
                tooltip.anchor("right-top");
                tooltip.position("right-top");
                //set tooltip on top-right corner --end

                var cotDataTable = anychart.data.table('date');
                cotDataTable.addData(key);
                var mapping = cotDataTable.mapAs({'value': 'diff'});
                mapping.addField('value', 1);
                chart.labels().enabled(false);
                var msftSeries = chart.waterfall(key);
                var yscale = chart.yScale();
                chart.draw();   
                
                if(this.props.getcotannotation_respo.length>0)
                {
                chart.annotations().fromJson(this.props.getcotannotation_respo[0].other_json);
                }
                
                {
                chart.annotations().fromJson(this.state.annojson);
                }
                chart.listen("annotationDrawingFinish", () => {
                  this.setState(
                    {
                      annojson: chart.annotations().toJson(),
                    });
                });
                if(this.props.cotoneoone)
                {
                  if(this.props.oneJson.pricejson)
                  {
                    this.props.oneJson.otherjson = chart.annotations().toJson()
                  }
                }
                //for same scaling on switch click --start
                var Max = chart.getStat("yScalesMax");
                var Min = chart.getStat("yScalesMin");
                if(!this.state.scalechecked)
                {
                  if(Max>globalMax)
                  {
                    globalMax = Max
                  }
                  if(Min<globalMin)
                  {
                    globalMin = Min
                  }
                }
                if(this.state.scalechecked)
                {
                  var yscale = chart.yScale();
                  yscale.maximum(globalMax);  
                  yscale.minimum(globalMin);  
                }
                //for same scaling on switch click --end
                 
                msftSeries.name(item+"_"+i);
                 var n="switch_"+i
                 var graphclick = i;
                return(
                    
                  <div className={"chart_box_design cust_price_chart cust_cot_chart1"}>
                  <p>
                     
                </p>
                <div className="chart_head_cust">
              <select id={"typeSelect_"+graphclick} onClick={() =>this.create(graphclick,chart)}>
                <option value="default" selected disabled>Annotation Type</option>
                <option value="andrews-pitchfork">Andrews' Pitchfork</option>
                <option value="ellipse">Ellipse</option>
                <option value="fibonacci-arc">Fibonacci Arc</option>
                <option value="fibonacci-fan">Fibonacci Fan</option>
                <option value="fibonacci-retracement">Fibonacci Retracement</option>
                <option value="fibonacci-timezones">Fibonacci Time Zones</option>  
                <option value="horizontal-line">Horizontal Line</option> 
                <option value="infinite-line">Infinite Line</option>
                <option value="line">Line Segment</option>
                <option value="marker">Marker</option> 
                <option value="ray">Ray</option>
                <option value="rectangle">Rectangle</option>
                <option value="trend-channel">Trend Channel</option>
                <option value="triangle">Triangle</option>
                <option value="vertical-line">Vertical Line</option>
              </select>
              <button onClick={() => this.removeAll(chart)}>Remove All</button>
            </div>
                
                    <AnyChart
                        // type="waterfall"
                        id={"cotchart_"+i++}
                        width="100%"
                        height={300}
                        instance={chart}
                    />
                    
                </div>
                
                )
              }
            })
            
          }
          </div>  


          newvar1 = <div>
          { cotdata.map((key,item)=>{
              if(item == 1)
              {
              var chart = anychart.waterfall();
              chart.background().fill("#FFFFFF 0");
              chart.title(key[0].name);
              chart.crosshair(true);
              var switchstate = "switch_"+i;

              //set tooltip on top-right corner --start
              var tooltip = chart.tooltip();
              tooltip.displayMode("union");
              tooltip.positionMode("chart");
              tooltip.anchor("right-top");
              tooltip.position("right-top");
              //set tooltip on top-right corner --end

              var cotDataTable = anychart.data.table('date');
              cotDataTable.addData(key);
              var mapping = cotDataTable.mapAs({'value': 'diff'});
              mapping.addField('value', 1);
              chart.labels().enabled(false);
              var msftSeries = chart.waterfall(key);
              var yscale = chart.yScale();
              chart.draw();   
              chart.annotations().fromJson(this.state.annojson1);
                chart.listen("annotationDrawingFinish", () => {
                  this.setState(
                    {
                      annojson1: chart.annotations().toJson(),
                    });
                });
              if(this.props.getcotannotation_respo.length>0)
                {
                chart.annotations().fromJson(this.props.getcotannotation_respo[0].other_json1);
                }
              
                {
                chart.annotations().fromJson(this.state.annojson1);
                }
              if(this.props.cotoneoone)
                {
                  if(this.props.oneJson.otherjson)
                  {
                    this.props.oneJson.otherjson1 = chart.annotations().toJson()
                    var user_id = localStorage.getItem('user_id');
                    var ticker_id = localStorage.getItem('ticker_code');
                    var family = localStorage.getItem('family');
                    var group = localStorage.getItem('group');
                    var data={user_id:user_id,json:this.props.oneJson,'page':'ca','chart_id':'','family':family,'group':group,'notes':'','ticker_id':ticker_id}
                    this.props.saveoneoonetodb(data)
                  }
                  this.props.savecotoneoone(false)
                }
              //for same scaling on switch click --start
              var Max = chart.getStat("yScalesMax");
              var Min = chart.getStat("yScalesMin");
              if(!this.state.scalechecked)
              {
                if(Max>globalMax)
                {
                  globalMax = Max
                }
                if(Min<globalMin)
                {
                  globalMin = Min
                }
              }
              if(this.state.scalechecked)
              {
                var yscale = chart.yScale();
                yscale.maximum(globalMax);  
                yscale.minimum(globalMin);  
              }
              //for same scaling on switch click --end
                
              msftSeries.name(item+"_"+i);
                var n="switch_"+i
                var graphclick = i;
              return(
                  
                <div className={"chart_box_design cust_price_chart cust_cot_chart1"}>
                <p>
                    
              </p>
              <div className="chart_head_cust">
            <select id={"typeSelect_"+graphclick} onClick={() =>this.create(graphclick,chart)}>
              <option value="default" selected disabled>Annotation Type</option>
              <option value="andrews-pitchfork">Andrews' Pitchfork</option>
              <option value="ellipse">Ellipse</option>
              <option value="fibonacci-arc">Fibonacci Arc</option>
              <option value="fibonacci-fan">Fibonacci Fan</option>
              <option value="fibonacci-retracement">Fibonacci Retracement</option>
              <option value="fibonacci-timezones">Fibonacci Time Zones</option>  
              <option value="horizontal-line">Horizontal Line</option> 
              <option value="infinite-line">Infinite Line</option>
              <option value="line">Line Segment</option>
              <option value="marker">Marker</option> 
              <option value="ray">Ray</option>
              <option value="rectangle">Rectangle</option>
              <option value="trend-channel">Trend Channel</option>
              <option value="triangle">Triangle</option>
              <option value="vertical-line">Vertical Line</option>
            </select>
            <button onClick={() => this.removeAll(chart)}>Remove All</button>
          </div>
              
                  <AnyChart
                      // type="waterfall"
                      id={"cotchart_"+i++}
                      width="100%"
                      height={300}
                      instance={chart}
                  />
                  
              </div>
              
              )
              }
          })
          
          }
          </div>  
        }    
        
        return (
            <div style={{"width":"100%"}}>
                {newvar}
                {newvar1}
            </div>
        );
    }
};

const mapStateToProps =  state => {
    return {
        getcotannotation_respo: state.Exchange.getcotannotation_respo,
        oneJson: state.Exchange.oneJson,
        cotoneoone: state.Exchange.cotoneoone,
        acntdatadone: state.Exchange.acntdatadone,
        moveDate: state.Exchange.moveDate,
        scrollData: state.Exchange.scrollData,
        cotData: state.Exchange.cotData,
        graphdata: state.Exchange.graphdata,
        addClicked1: state.Exchange.addClicked1,
        cotclicked: state.Exchange.cotclicked,
        tableData: state.Exchange.tableData,
    }
  };
  export default connect(mapStateToProps,{clearData,cotclickclear,savecotoneoone,saveoneoonetodb})(CotChart);
