import React, {Component} from "react";
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import {connect} from "react-redux";
import {
  CirclePicker,
} from "react-color";
import {getmoveDate,changeScroller,addClicked,tableData,confirmationModal1,testing} from "appRedux/actions/Exchange";
import {Link} from "react-router-dom";
import { withRouter } from 'react-router-dom'
import {Popover, Switch ,Slider, Row, Col, Tabs,Modal,Button} from "antd";
import Widget from "components/Widget";
import PropTypes from "prop-types";
const TabPane = Tabs.TabPane;
var theme = localStorage.getItem('theme');
Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };
Array.prototype.min = function() {
    return Math.min.apply(null, this);
  };

class SentimentsChart extends Component {
    static contextTypes = {
      router: PropTypes.object
    }
    constructor(props,context) {
      super(props,context);
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
      modalVisible: false,
      ticker: '',
    };
    maintoSE()
    {
      this.context.router.history.push({
        pathname: '/dashboard',
        state: { ticker: this.state.ticker }
      })
      this.setState({modalVisible:false});
    }
    closeModal(){
      this.setState({modalVisible:false});
    }
    OpenModal = (ticker) =>
    {
      this.setState({modalVisible:true,ticker:ticker});
    }

    
    render() {
   
        var newvar = <div></div>
        var legends1 = <div></div>
        var title_date = '';
        if(this.props.newsDate.length > 0){
          title_date = this.props.newsDate[0];
        }
        if(this.props.newsDataMain.length > 0){
  
            var chart;
            var j = 1;
            // var r = [];
            //   r[0] = 1
            //   legends1 =<div>
            //   {
            //     r.map((key)=>{
            //       var stage = anychart.graphics.create();
            //       var legend = anychart.standalones.legend();
            //       var items= [
            //         {
            //             'index': 0,
            //             'text': 'Actual',
            //             // 'iconType': 'area',
            //             'iconStroke': 'none',
            //             'iconFill': '#64b5f6'
            //         },
            //     ]
            //       legend.fontSize('14px')
            //       .fontFamily("'Verdana', Helvetica, Arial, sans-serif")
            //       .itemsLayout('horizontal')
            //       .fontColor('#7c8482')
            //       .iconTextSpacing(0)
            //       .align('right')
            //       .position('center-bottom')
            //       .padding(0)
            //       .margin(0, 0, 7, 0)
            //       .itemsSpacing(3)
            //       .title(false)
            //       .titleSeparator(false)
            //       .paginator(false)
            //       .background(false)
            //       .items(items);
            //       return(
            //         <AnyChart
            //                 id={'legend3'}
            //                 width="100%"
            //                 height={30}
            //                 instance={stage}
            //                 charts={[legend]}
            //         />
            //       );
            //     })
            //   }
            // </div>
            var arrayData = [];
            this.props.newsDataMain[0].map((item,index)=>{
                arrayData.push([item['ticker_name'],item['group_red'],item['group_orange'],item['group_grey'],item['group_azure'],item['group_green']])
            })
            // console.log('aspldata',arrayData);
            var chart = anychart.bar();

            // data for the sample (completely fiction)
            // var survey_data = [
            //     ['Formation and evolution<br/>of the Solar System', 70, 145, 79, 416, 290],
            //     ['Giant impact hypothesis<br/>(Earth\'s Moon formation)', 232, 305, 20, 306, 137],
            //     ['Origin of water on Earth', 120, 545, 86, 156, 93],
            //     ['Conception of Darwinism', 203, 304, 92, 311, 90],
            //     ['Linnaean classification<br/>of organisms', 110, 144, 69, 321, 356],
            //     ['Historical materialism<br/>by Karl Marx', 100, 447, 39, 119, 295]
            // ];
            var survey_data = arrayData;
            // helper function to create series and customize them
            var createSeries = function (column_number, name) {
                var data = [];
                for (var i = 0; i < survey_data.length; i++) {
                    // var value = survey_data[i][column_number] ;
                    var value = survey_data[i][column_number] / 10;
                    // var center = (survey_data[i][3] ) / 2;
                    var center = (survey_data[i][3] / 10) / 2;
                    if (name == 'Neutral')
                        data.push({x: survey_data[i][0], low: -value / 2, high: value / 2, value: value});
                    else if (name == 'Positive')
                        data.push({x: survey_data[i][0], low: center, high: center + value, value: value});
                    else if (name == 'Very Positive')
                        data.push({
                            x: survey_data[i][0],
                            // low: center + survey_data[i][4] ,
                            low: center + survey_data[i][4] / 10,
                            // high: center + survey_data[i][4]  + value,
                            high: center + survey_data[i][4] / 10 + value,
                            value: value
                        });
                    else if (name == 'Negative')
                        data.push({x: survey_data[i][0], low: -center, high: -center - value, value: value});
                    else if (name == 'Very Negative')
                        data.push({
                            x: survey_data[i][0],
                            // low: -center - survey_data[i][2] ,
                            low: -center - survey_data[i][2] / 10,
                            // high: -center - survey_data[i][2]  - value,
                            high: -center - survey_data[i][2] / 10 - value,
                            value: value
                        });
                }
                // console.log('asplseriesdata',data);
                var series = chart.rangeBar(data);
                series.name(name)
                        .stroke('1 #fff 0')
                        .selectionMode('none');
                series.hovered().stroke('1 #fff 0');
                series.tooltip().title()
                        .useHtml(true)
                        .fontSize(12);
            };

            // creates series
            createSeries(1, 'Very Negative');
            createSeries(2, 'Negative');
            createSeries(3, 'Neutral');
            createSeries(4, 'Positive');
            createSeries(5, 'Very Positive');

            // sets title for map chart and customizes it
            // chart.title()
            //         .enabled(true)
            //         .useHtml(true)
            //         .padding([0, 0, 10, 0])
            //         .text('Diverging Chart<br/>' +
            //                 '<span style="color:#212121; font-size: 13px;">(According to survey 1000 in ACME corp.)</span>');

            // changes palette for this sample
            chart.palette(anychart.palettes.distinctColors().items(['#ef6c00', '#ffa000', '#96a6a6', '#42a5f5', '#1976d2']));
            chart.legend()
                    .enabled(true)
                    .padding([20, 0, 10, 0])
                    .position('center-bottom');

            // creates stack bar chart from multi series chart
            chart.yScale().stackMode('value');

            // changes settings for axis
            chart.xAxis().ticks(false);
            // chart.xAxis().title()
            //         .enabled(true)
            //         .text('Theories')
            //         .padding([0, 0, 10, 0]);
            chart.xAxis().labels()
                    .useHtml(true)
                    .hAlign('right')
                    .fontSize(11)
                    // .fontColor('#474747')
                    .padding([0, 10, 0, 0]);
            chart.yAxis(1).orientation('top');
            // chart.yAxis(0).labels().format(function () {
            //     return Math.abs(this.value) + '%'
            // });
            chart.background().fill("#FFFFFF 0");

            chart.tooltip()
                    .useHtml(true)
                    .fontSize(12)
                    .titleFormat(function () {
                        return this.getData('value') * 10 + ' Article ' //+
                                // '<span style="font-size: 13px; color: #cbcbcb">(' + this.getData('value') + '%)</span>'
                    })
                    .format(function () {
                        // if (this.seriesName == 'Don\'t care')
                        //     return this.seriesName + ' about <br/><span style="color: #cbcbcb">' + this.getData('x') + '</span>';
                        return this.seriesName + ' with <br/><span style="color: #cbcbcb">' + this.getData('x') + '</span>';
                    });

            // creates line marker at 0
            chart.lineMarker().value(0).stroke('#CECECE');
            newvar =<div className="cust_bullet_chart cust_price_chart">
                        {/* <Row className="custom_main_chart"> */}
                            <AnyChart
                                id={'sentiment'}
                                width="100%"
                                height={600}
                                instance={chart}
                            />
                        {/* </Row>   */}
                    </div>
        }
        return (
            <div style={{"width":"100%"}} className="cust_bullet_chart cust_ecin_div cust-tab-font ">
              <span className="cust_desciption cust-hass-font">Ticker Sentiment as per day {title_date}</span>
                {this.props.newsDataMain.length>0?this.props.newsDataMain[0].length>0?
                <div>
                  {/* {legends1} */}
                  {newvar} 
                </div>:
                <div className="nodata_div" align="center">
                  {theme=='light'?
                    <img alt="" src={require("assets/images/empty.png")} />
                    :<img alt="" src={require("assets/images/emptyWhite.png")} />}
                  <br />
                  <span className="nodata_title">No Data</span>
                </div>
                :
                <div className="nodata_div" align="center">
                  {theme=='light'?
                    <img alt="" src={require("assets/images/empty.png")} />
                    :<img alt="" src={require("assets/images/emptyWhite.png")} />}
                  <br />
                  <span className="nodata_title">No Data</span>
                </div>
                }
                <Modal className="week_modal confirmation_modal" visible={this.state.modalVisible} onCancel={this.handleCancel} >
                       {/* <form onSubmit={this.handleSubmit} method="post"> */}
                          You have Clicked on ticker <strong>{this.state.ticker}</strong> and you will be redirect to Setup Explore if you click on Confirm button
                          <div align="right">
                            <Button type="danger"  onClick={()=>this.closeModal()}>Cancel</Button>
                            <Button type="primary"  onClick={()=>this.maintoSE()} >Confirm</Button>
                          </div>
                        {/* </form> */}
                </Modal>
            </div>
        );
      
        
    }

};

const mapStateToProps =  state => {
    
    return {
        cnfrmmodal : state.Exchange.cnfrmmodal,
        // newsDataMain : state.Exchange.newsDataMain,
        newsDataMain: Object.keys(state.Exchange.newsDataMain).filter(priceDataIndex => priceDataIndex == 'newsdata').map((priceDataIndex)=>{
          return state.Exchange.newsDataMain[priceDataIndex];
        }),
        newsDate: Object.keys(state.Exchange.newsDataMain).filter(priceDataIndex => priceDataIndex == 'date').map((priceDataIndex)=>{
          return state.Exchange.newsDataMain[priceDataIndex];
        }),
    }
  };
  export default connect(mapStateToProps, {getmoveDate,changeScroller,addClicked,tableData,confirmationModal1,testing})(SentimentsChart);
