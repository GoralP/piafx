import React, {Component,PureComponent} from "react";
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import {connect} from "react-redux";
import {Popover, Switch, Menu} from "antd";
import {clearData,getmoveDate,ecinclickclear,savestatus} from "appRedux/actions/Exchange";
// import {Link} from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
const NUMBER_FORMAT1 = {
  scale: {
    'factors': [1e9, 1e6, 1e3, 1e2, 1],
    'suffixes': ['B', 'M', 'K', 'H', '']
  },
  decimalsCount: 0
}
var format = function(input) {
  var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
  var pattern1 = /(\d{2})\-(\d{2})\-(\d{4})/;
  if (!input) {
    return null;
  }
  if(input.match(pattern))
  {
    // console.log('aspl1');
    return input.replace(pattern, '$3-$2-$1');
  }
  if(input.match(pattern1))
  {
    // console.log('aspl2');
    return input.replace(pattern1, '$3-$2-$1');
    // return input;
  }
};
var ecindataArray = [];
var ecdata = [];
class EcinChart extends PureComponent {
    chartchange(ecinSeries,value) {
        ecinSeries.seriesType(value);
    }
    onChangecolormain(chart,event,name) {
      if(event){
       this.setState({
        [name]: true,
      });
      if(this.props.moveDate.moveDate!='')
        {
          chart.background().fill("#ffffff");
        }      
      }
      else{
        this.setState({
          [name]: false,
        });
        if(this.props.moveDate.moveDate!='')
        {
        chart.background().fill("#FFFFFF 0"); 
        }                                                                  
      }
    }   
    open1o1modal(i){
      if(this.props.selectedEcin.length>0){
        {
          localStorage.setItem('chart_id',this.props.selectedEcin[i-1]);
        }
      }
     localStorage.setItem('cot',0);
     localStorage.setItem('ecin',i);
     this.setState({
       visible1o1: true 
     })
    }
    gridonoff(firstPlot,status){
      this.setState({
        gridstate: status 
      })
    } 
    createDrawing(plot,type){
      plot.annotations().startDrawing(type);
    }
    removeDrawing(plot){
      plot.annotations().removeAllAnnotations();
      if(this.props.savestatus1)
      {
      this.props.savestatus(false);
      }
    }
    removeECIN(key)
    {
      if(this.props.selectedEcin[key])
      {
        delete this.props.selectedEcin[key];
      }
      if(ecindataArray[key])
      {
        delete ecindataArray[key];
          this.setState({deletedchart: key});
          if(this.props.savestatus1)
          {
          this.props.savestatus(false);
          }
      }
    }
    state = {
        gridstate:true,
        ecdataa: [],
    };
    render() {
        var height = 0;
        var newvar = <div></div>;
        var i = 1;
        if(this.props.ecinData['ecin_data'] || ecindataArray.length > 0){
            if(this.props.ecinData['ecin_data']){
                ecindataArray.push(this.props.ecinData);
                this.props.clearData()
            }
            // var prestate = JSON.parse(localStorage.getItem('prestate'));
            // prestate.ecinData = ecindataArray; 
            // localStorage.setItem('prestate',JSON.stringify(prestate));
            newvar = <div>
             {ecindataArray.map((key,item)=>{
                var title = key['ecin_details'][0]['short_desc'];
                var flag = key['country_details'][0]['flag'];
                var country = key['country_details'][0]['countrycode'];
                var length = key['ecin_data'].length
                var verticalline_date = key['ecin_data'][length-1]['date']; 
                var chart = anychart.stock();
                chart.background().fill("#FFFFFF 0");
                chart.scroller().enabled(false);
                chart.legend(false);
                // chart.title(' ');
                // chart.title(title);
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
                dataSet.addData(key['ecin_data']);
                var firstPlot = chart.plot(0);
                firstPlot.legend(false);
                // firstPlot.yAxis().labels().position("inside");
                var mapping = dataSet.mapAs({'value': 'value'});
                // mapping.addField('value', 1);
                var selectable = mapping.createSelectable();
                // var interval = chart.grouping().getCurrentDataInterval();
                // selectable.selectAll(interval.unit, interval.count);
                var firstSeriesData = firstPlot.line(dataSet.mapAs({'value': 'value'}));
                firstSeriesData.name(item+"_"+i);
                firstPlot.yAxis().labels().format(function() {
                  return anychart.format.number(this.value, NUMBER_FORMAT1);
                });
                chart.listen("annotationDrawingFinish", (e) => {
                  // drawingArray['price'] = firstPlot.annotations().toJson()
                  this.props.ecindrawingArray[title] = firstPlot.annotations().toJson()
                  if(this.props.savestatus1)
                  {
                  this.props.savestatus(false);
                  }
                });
                if(this.props.scrollData!='')
                {
                  chart.selectRange(this.props.scrollData.start, this.props.scrollData.end);
                }
                if(this.state.gridstate)
                {
                  firstPlot.xGrid().enabled(true);
                  firstPlot.xGrid().stroke({
                    // set stroke color
                    color: "#2f3c55",
                    // set dashes and gaps length
                    dash: "2 5"
                  });
                  firstPlot.yGrid().enabled(true);
                  firstPlot.yGrid().stroke({
                    // set stroke color
                    color: "#2f3c55",
                    // set dashes and gaps length
                    dash: "2 5"
                  });
                }
                // if(this.props.moveDate.moveDate!='' && this.state[switchstate])
                // {
                  // chart.crosshair(false);
                  // var controller = firstPlot.annotations();
                  // // create a Vertical Line annotation
                  // var date = this.props.moveDate!=''?this.props.moveDate.moveDate:verticalline_date;
                  // var verticalLine2=controller.verticalLine({
                  //   xAnchor: date,
                  //   allowEdit: false
                  // });
                  // verticalLine2.normal().stroke("#006600", 1, "10 2");
                  // var xValue = controller.getAnnotationAt(0).xAnchor();
                  // //get data from clicked point
                  // var selectable = mapping.createSelectable();
                  // var interval = chart.grouping().getCurrentDataInterval();
                  // selectable.selectAll("day", 1);
                  // var select = selectable.search(xValue, "nearest");
                  // //get point value
                  // //var value = select.Mf.values[2];
                  // var value = select.get('value');
                  // var key = select.getKey();
                  // // //format date and parse to string
                  // var pointDate = new Date(key);
                  // var month = String(pointDate.getMonth()+1)<10?'0'+String(pointDate.getMonth()+1):String(pointDate.getMonth()+1);
                  // var pointDateString = String(pointDate.getDate()<10?'0'+pointDate.getDate():pointDate.getDate())+ '-' + month + '-' + String(pointDate.getFullYear());
                  // // chart.title(' Date: ' + pointDateString + ', Value: ' + value);
                  // firstSeriesData.tooltip().format(' Date: ' + pointDateString + ', Value: ' + value);
                  if(this.props.tableData.length>0)
                  {
                    var markers = []
                    this.props.tableData.map((key,item)=>{
                      var marker_objects = {
                        "format": key.symbol,
                        "data": [
                          {
                            "date": format(key.date),
                            "description": key.description
                          }
                        ],
                        "normal":{"fill": key.format}
                      };
                      markers.push(marker_objects);
                    });
                    firstPlot.eventMarkers({"groups": markers}); 
                    firstPlot.eventMarkers().position("series");
                    firstPlot.eventMarkers().seriesId(0);
                  }
                  if(this.props.tableData.length>0)
                    {
                      var table = this.props.tableData;
                      this.props.tableData.map((item,key)=>{
                        if(item[title])
                        {}
                        else
                        {
                          var datestamp = item['datestamp'];                          
                          var select = selectable.search(datestamp, "nearest");
                          var key = select.getKey();
                          var pointDate = new Date(key);
                          var month = String(pointDate.getMonth()+1)<10?'0'+String(pointDate.getMonth()+1):String(pointDate.getMonth()+1);
                          var pointDateString = String(pointDate.getDate()<10?'0'+pointDate.getDate():pointDate.getDate())+ '-' + month + '-' + String(pointDate.getFullYear());
                          var pointDateString1 = String(pointDate.getFullYear())+ '-' + month + '-' + String(pointDate.getDate()<10?'0'+pointDate.getDate():pointDate.getDate());
                          var value = select.get('value');
                          item[title] = value;
                          this.props.ecinclickclear();
                        }
                      })

                    }
                //   if(this.props.ecinclicked!='')
                //   {
                //   selectable.selectAll("day", 1);
                //   var select = selectable.search(xValue, "nearest");
                //   //get point value
                //  // var value = select.Mf.values[2];
                //  var value = select.get('value'); 
                //  // //get point date (in milliseconds)
                //   var key = select.getKey();
                //   // //format date and parse to string
                //   var pointDate = new Date(key);
                //   var month = String(pointDate.getMonth()+1)<10?'0'+String(pointDate.getMonth()+1):String(pointDate.getMonth()+1);
                //   var pointDateString = String(pointDate.getDate()<10?'0'+pointDate.getDate():pointDate.getDate())+ '-' + month + '-' + String(pointDate.getFullYear());
                //   // chart.title(' Date: ' + pointDateString + ', Value: ' + value);
                //   firstSeriesData.tooltip().format(' Date: ' + pointDateString + ', Value: ' + value);
                //   if(this.props.tableData.length>0)
                //     {
                //       var length1 = this.props.tableData.length - 1;
                //       this.props.tableData[length1]["ecin"]=value;
                //     }
                //     this.props.ecinclickclear();
                //   }
                // }
                // else{
                //   chart.crosshair(true);
                //   chart.background().fill("#FFFFFF 0");
                //  }
                 //const changeOptions = (
                  // <Menu className="chart_hamburger_ul">
                  //   <SubMenu className="gx-menu-horizontal" title={<span>Chart Type</span>}>
                  //     <Menu.Item onClick={() => this.chartchange(firstSeriesData,'area')}>Area</Menu.Item>
                  //     <Menu.Item onClick={() => this.chartchange(firstSeriesData,'spline')}>Spline</Menu.Item>
                  //   </SubMenu>
                  //   <SubMenu className="gx-menu-horizontal" title={<span>Grids</span>}>
                  //     <Menu.Item onClick={() => this.gridonoff(firstPlot,true)}>ON</Menu.Item>
                  //     <Menu.Item onClick={() => this.gridonoff(firstPlot,false)}>OFF</Menu.Item>
                  //   </SubMenu>
                  //   <SubMenu className="gx-menu-horizontal" title={<span>Drawing Tools</span>}>
                  //     <Menu.Item onClick={() => this.createDrawing(firstPlot,"horizontal-line")}>Horizontal Line</Menu.Item>
                  //     <Menu.Item onClick={() => this.createDrawing(firstPlot,"vertical-line")}>Vertical Line</Menu.Item>
                  //     <Menu.Item onClick={() => this.createDrawing(firstPlot,"line")}>Line Segment</Menu.Item>
                  //     <Menu.Item onClick={() => this.createDrawing(firstPlot,"marker")}>Marker</Menu.Item>
                  //     <Menu.Item onClick={() => this.removeDrawing(firstPlot)}>Remove All</Menu.Item>
                  //   </SubMenu>
                  //   <Menu.Item onClick={() => this.removeECIN(item)}>Remove</Menu.Item>
                  // </Menu>
                //);
                // const changeOptions = (
                //     <ul className="gx-user-popover">
                //       <li 
                //        onClick={() => this.chartchange(firstSeriesData,'area')}
                //       >Area</li>
                //       <li 
                //       onClick={() => this.chartchange(firstSeriesData,'spline')}
                //       >Spline</li>
                //     </ul>
                //   );
                  var n="ecinswitch_"+i;
                  var graphclick = i;
                return(
                    <div style={{display:'inline-block'}}   className={this.state[switchstate] && this.props.moveDate.moveDate!='' ? "container_white cust_price_chart cust_chart_box pdf" : " cust_price_chart cust_chart_box pdf"}>
                      <div className="ecin_top_div_country pdf">
                        <table style={{width:"100%",tableLayout:"fixed"}}>
                          <tr>
                          <td>
                            <img src={flag} class="ecin_flag" ></img>
                            <p class="ecin_country" >{country}</p>
                          </td>
                          <td><p class="ecin_title" style={{textAlign:"center",float:"none"}}>{title}</p></td>
                          <td>
                            <span style={{'float':"right",'display':'inline-block'}} className='subtitle_class'>
                              {/* <Popover  content={changeOptions} overlayClassName="gx-popover-horizantal chart_hamburger_menu" placement="bottomRight"   trigger="hover">
                                <span className="gx-pointer gx-flex-row gx-align-items-center subtitle_class">
                                  <i class="icon icon-menu" style={{'fontSize':'20px'}}></i>
                                </span>
                              </Popover> */}
                              {/* <Switch size="small" name={n} onChange={(e)=>this.onChangecolormain(chart,e,n)} />
                              <Link to={"/oneoone"} target="_blank" onClick={() => this.open1o1modal(graphclick)}>
                                <span className="gx-pointer gx-flex-row gx-align-items-center">
                                  <i class="icon icon-expand" style={{'fontSize':'20px'}} ></i>
                                </span>
                              </Link> */}
                            </span>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <AnyChart id={'chart_'+i++} height={200} instance={chart} /> 
                    </div>);  
        })
            }
             </div>
        }
        
        return (
            <div className="ecin_chart_div pdf">
                {newvar}
            </div>
        );
    }
};

const mapStateToProps =  state => {
    return {
        savestatus1: state.Exchange.savestatus,
        ecindrawingArray : state.Exchange.ecindrawingArray,
        selectedEcin : state.Exchange.selectedEcin,
        moveDate: state.Exchange.moveDate,
        ecinData: state.Exchange.ecinData,
        selectedEcin : state.Exchange.selectedEcin,
        scrollData: state.Exchange.scrollData,
        addClicked1: state.Exchange.addClicked1,
        tableData: state.Exchange.tableData,
        ecinclicked: state.Exchange.ecinclicked,
    }
};
export default connect(mapStateToProps,{clearData,getmoveDate,ecinclickclear,savestatus})(EcinChart);
