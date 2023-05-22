import React, {Component} from "react";
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import {connect} from "react-redux";
import {Popover, Switch } from "antd";
import {clearData,getmoveDate,ecinclickclear,saveoneoone,saveoneoonetodb} from "appRedux/actions/Exchange";
import {Link} from "react-router-dom";
var ecindataArray = [];
var ecdata = [];
class EcinChart extends Component {
    
    state = {
        ecdataa: [],
        annojson: '{}'
    };
    create(plot){
      var select = document.getElementById("typeSelect");
      plot.annotations().startDrawing(select.value);
    }
    removeAll(plot){
      plot.annotations().removeAllAnnotations();
    }

    
    render() {
      var prestate = JSON.parse(localStorage.getItem('prestate')); 
        var height = 0;
        var newvar = <div></div>;
        var i = 1;
        if(prestate.ecinData.length > 0 || ecindataArray.length > 0){
            newvar = <div>
             {prestate.ecinData.map((key,item)=>{

                var chart = anychart.stock();
                chart.background().fill("#FFFFFF 0");
                chart.scroller().enabled(false);
                chart.legend(false);
                var tooltip = chart.tooltip();
                tooltip.displayMode("union");
                tooltip.positionMode("chart");
                tooltip.anchor("right-top");
                tooltip.position("right-top");
                var switchstate = "ecinswitch_"+i;
                if(this.state[switchstate]) 
                {
                  chart.background().fill("#ffffff");
                }
                var dataSet = anychart.data.table('date');
                dataSet.addData(key);
                var firstPlot = chart.plot(0);
                firstPlot.yAxis().labels().position("inside");
                var mapping = dataSet.mapAs({'value': 'calculation'});
                mapping.addField('value', 1);
                var firstSeriesData = firstPlot.line(dataSet.mapAs({'value': 'value'}));
                firstSeriesData.name(item+"_"+i);
                if(this.props.getannotation_respo.length>0)
                {
                  
                firstPlot.annotations().fromJson(this.props.getannotation_respo[0].other_json);
                }
                {
                firstPlot.annotations().fromJson(this.state.annojson);
                }
                chart.listen("annotationDrawingFinish", () => {
                  this.setState(
                    {
                      annojson: firstPlot.annotations().toJson(),
                    });
                });
                if(this.props.oneoone)
                {
                  if(this.props.oneJson.pricejson)
                  {
                    this.props.oneJson.otherjson = firstPlot.annotations().toJson()
                    this.props.oneJson.otherjson1 = '{}'
                    var user_id = localStorage.getItem('user_id');
                    var ticker_id = localStorage.getItem('ticker_code');
                    var chart_id = localStorage.getItem('chart_id');
                    var data={user_id:user_id,json:this.props.oneJson,'page':'se','chart_id':chart_id,'family':'','group':'','notes':'','ticker_id':ticker_id}
                    this.props.saveoneoonetodb(data)
                  }
                  this.props.saveoneoone(false)
                }
                if(this.props.scrollData!='')
                {
                  chart.selectRange(this.props.scrollData.start, this.props.scrollData.end);
                }
                if(localStorage.getItem('ecin')==i){
                  return(
                      <div style={{display:'block'}} >
                        <div className="chart_head_cust">
                          <select id="typeSelect" onClick={() =>this.create(firstPlot)}>
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
                          <button onClick={() => this.removeAll(firstPlot)}>Remove All</button>
                        </div>
                      <AnyChart id={'chart_'+i} height={300} instance={chart} />  <p><span style={{'float':"right",'display':'inline-block'}} className='subtitle_class'></span></p> </div>
                  );  
                }
                else
                {
                  return(<div style={{'display':'none'}}>{i++}</div>)
                }
                       
        })
            }
             </div>
        }
        
        return (
            <div style={{"width":"100%"}}>
                {newvar}
            </div>
        );
    }
};

const mapStateToProps =  state => {
    return {
        getannotation_respo: state.Exchange.getannotation_respo,
        oneJson: state.Exchange.oneJson,
        oneoone: state.Exchange.oneoone,
        moveDate: state.Exchange.moveDate,
        ecinData: state.Exchange.ecinData,
        selectedEcin : state.Exchange.selectedEcin,
        scrollData: state.Exchange.scrollData,
        addClicked1: state.Exchange.addClicked1,
        tableData: state.Exchange.tableData,
        ecinclicked: state.Exchange.ecinclicked,
    }
};
export default connect(mapStateToProps,{clearData,getmoveDate,ecinclickclear,saveoneoone,saveoneoonetodb})(EcinChart);
