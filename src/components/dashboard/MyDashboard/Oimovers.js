import React, {Component} from "react";
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import {connect} from "react-redux";
import {
  CirclePicker,
} from "react-color";
import {getmoveDate,changeScroller,addClicked,tableData} from "appRedux/actions/Exchange";
import {Link} from "react-router-dom";
import { withRouter } from 'react-router-dom'
import {Popover, Switch ,Slider, Row, Col} from "antd";

class Oimovers extends Component {
  constructor(props) {
    super(props);
}
    state = {
      switchvalue: false,
      statedate: '',
      statevalue: '',
      visible : false,
      range1 : true,
      symbol : 0,
    }; 
    state = {
      inputValue: 1,
      symbol: 0,
      timerange : true,
      addvisible : false,
      annojson : '{}',
    };
   

    
    
    render() {
   
        var newvar = <div></div>
        var newvar1 = <div></div>
        var legends1 = <div></div>
        var legends2 = <div></div>
        if(this.props.getoimovers.length>0)
        {
        if(this.props.getoimovers[0].length>0)
        {
            
            var bulletchart;
            var linechart;
            var j = 1;
              var tickerarray = JSON.parse(this.props.getoimovers[0][0].tickerarray);
            //   var non_nzlc = JSON.parse(this.props.nzlc[0][0].non_ticker);
              var r = [];
              r[0] = 1
              legends1 =<div>
              {
                r.map((key)=>{
                  var stage = anychart.graphics.create();
                  var legend = anychart.standalones.legend();
                  var items= [
                    {
                        'index': 0,
                        'text': 'Actual',
                        // 'iconType': 'area',
                        'iconStroke': 'none',
                        'iconFill': '#64b5f6'
                    },
                    {
                        'index': 1,
                        'text': 'Previous',
                        // 'iconType': 'area',
                        'iconStroke': 'none',
                        'iconFill': '#828282'
                    }
                ]
                  legend.fontSize('14px')
                  .fontFamily("'Verdana', Helvetica, Arial, sans-serif")
                  .itemsLayout('horizontal')
                  .fontColor('#7c8482')
                  .iconTextSpacing(0)
                  .align('right')
                  .position('center-bottom')
                  .padding(0)
                  .margin(0, 0, 7, 0)
                  .itemsSpacing(3)
                  .title(false)
                  .titleSeparator(false)
                  .paginator(false)
                  .background(false)
                  .items(items);
                  return(
                    <AnyChart
                            id={'legend23'}
                            width="100%"
                            height={30}
                            instance={stage}
                            charts={[legend]}
                    />
                  );
                })
              }
            </div>
              newvar = <div className="cust_bullet_chart">
                    <Row className="custom_main_chart_title">
                        <Col lg={10}>
                          <span>Last 12 Month</span>
                        </Col>
                        <Col lg={2}>
                          <span>Ticker</span>
                        </Col>
                        <Col lg={10}>
                          <span>O Crossover</span>
                        </Col>
                        <Col lg={2}>
                          <span>C.O.(%)</span>
                        </Col>
                    </Row>
            { 
              Object.keys(tickerarray).map((key)=>{
              var overall_diff = tickerarray[key]['currentOI'] - tickerarray[key]['previousOI']; 
              //console.log('asplvalue',overall_diff);
              var close_diff = tickerarray[key]['currentOI'] - 0; 
              //console.log('asplvalue1',close_diff);
              var value = ((close_diff*100)/overall_diff);
              //console.log('asplvalue%',value);  
              if(tickerarray[key]['value']<0)
              {
              bulletchart = anychart.bullet([
                // {
                //   value: 100,
                //   type: 'bar',
                //   gap: 0.1,
                //   fill: '#828282',
                //   stroke: null
                // },
                {
                  value: tickerarray[key]['value'],
                  type: 'bar',
                  gap: 0.1,
                  fill: '#64b5f6',
                  stroke: null
                },
                // {
                //   value: value,
                //   type: 'line',
                //   gap: 0.5,
                //   fill: 'black',
                //   stroke: {
                //       thickness: 2,
                //       color: 'black'
                //   }
                // }
                // {value: value}
              ]);
              }
              if(tickerarray[key]['value']>=0)
              {
              bulletchart = anychart.bullet([
                {
                  value: tickerarray[key]['value'],
                  type: 'bar',
                  gap: 0.1,
                  fill: '#64b5f6',
                  stroke: null
                },
                // {
                //   value: value,
                //   type: 'bar',
                //   gap: 0.1,
                //   fill: '#828282',
                //   stroke: null
                // },
                // {
                //   value: value,
                //   type: 'line',
                //   gap: 0.5,
                //   fill: 'black',
                //   stroke: {
                //       thickness: 2,
                //       color: 'black'
                //   }
                // }
                // {value: value}
              ]);
              }
              // Set bulletchart ranges
              // bulletchart.legend().enabled(true);
              //bulletchart.range().from(0).to(100);
              bulletchart.background().fill("#FFFFFF 0");
              // Set bulletchart size and position settings
              bulletchart.bounds(0, 0, "100%", 125);
              
              // console.log('asplprice',tickerarray[key]['pricedata'])
            //   linechart = anychart.sparkline();
            //   linechart.data(tickerarray[key]['pricedata']);
            //   linechart.background().fill("#FFFFFF 0");
              return(
                <div className="cust_price_chart">
                    <Row className="custom_main_chart">
                        {/* <Col lg={10}>
                        <AnyChart
                            id={'sparkline_'+j++}
                            width="100%"
                            height={20}
                            instance={linechart}
                        />
                        </Col> */}
                        <Col lg={2}>
                            <span>{key}</span>    
                        </Col>
                        <Col lg={20}>
                        <AnyChart
                            id={'oimovers_'+j++}
                            width="100%"
                            height={20}
                            instance={bulletchart}
                        />
                        </Col>
                        <Col lg={2}>
                        <span>{tickerarray[key]['value']+'%'}</span>
                        </Col>
                    </Row>
                </div>
              )
            })
            }
            </div>
            
        }
        }
        return (
            <div style={{"width":"100%"}} className="cust_bullet_chart ">
              <span className="cust_desciption">Top OI Daily Movers</span>
                {legends1}
                {newvar} 

            </div>
        );
      
    }
};

const mapStateToProps =  state => {
    
    return {
        nzlc: Object.keys(state.Exchange.getoimovers).filter(priceDataIndex => priceDataIndex == 'nzlc').map((priceDataIndex)=>{
            return state.Exchange.getoimovers[priceDataIndex];
        }),
        getoimovers: Object.keys(state.Exchange.getoimovers).filter(priceDataIndex => priceDataIndex == 'top_oi_movers').map((priceDataIndex)=>{
            return state.Exchange.getoimovers[priceDataIndex];
        }),
    }
  };
  export default connect(mapStateToProps, {getmoveDate,changeScroller,addClicked,tableData})(Oimovers);
