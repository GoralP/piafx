import React, {Component} from "react";
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import {connect} from "react-redux";
import {getmoveDate,changeScroller,addClicked,tableData,confirmationModal1,testing} from "appRedux/actions/Exchange";
import {Row, Col, Tabs,Modal,Button} from "antd";
import PropTypes from "prop-types";
const TabPane = Tabs.TabPane;
var common_colors = require('../../../assets/theme-variable');
var theme = localStorage.getItem('theme');
var bgcolor = common_colors.default_main_color;
if(theme == 'coffee')
{
    anychart.theme(anychart.themes.coffee);
    bgcolor = common_colors.coffee_main_color;
}
Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };
Array.prototype.min = function() {
    return Math.min.apply(null, this);
  };

class NewsMain extends Component {
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
    shouldComponentUpdate(nextProps) {
        if (nextProps.newsDataMain && !isEqual(nextProps.newsDataMain,this.props.newsDataMain)) {
                return true;
        } else {
                return false;
        }
    }
    
    render() {
        var palette = anychart.palettes.defaultPalette;
        if(theme == 'coffee')
        {
          anychart.theme(anychart.themes.coffee);
          palette = anychart.palettes.coffee;
        }
        var newvar = <div></div>
        var newvar1 = <div></div>
        var bulletscale = <div></div>
        var bulletscale2 = <div></div>
        var legends1 = <div></div>
        var legends2 = <div></div>
        var title_date = '';
        if(this.props.newsDate.length > 0){
          title_date = this.props.newsDate[0];
        }
        if(this.props.newsDataMain.length > 0){
  
            var bulletchart;
            var linechart;
            var j = 1;
            var scalearray = [];
            var scalearray2 = [];
            var maximum;
            var minimum;
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
                        'iconFill': palette[0]
                    },
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
                            id={'legend_news'}
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
                <Row className="custom_main_chart_title cust-hass-font">
                    <Col lg={2} align="center">
                        <span><strong>Rank</strong></span>
                    </Col>
                    <Col lg={2} align="center">
                        <span><strong>Code</strong></span>
                    </Col>
                    <Col lg={6} align="center">
                        <span><strong>Ticker</strong></span>
                    </Col>
                    <Col lg={14} align="center">
                        <span><strong>Comparison Bars</strong></span>
                    </Col>

                </Row>
            
            { 
              
              this.props.newsDataMain[0].map((key,index)=>{
              
              var value = key['percentage'];

            //   if(topcom[key]['value']<0)
            //   {
              bulletchart = anychart.bullet([
                {
                    value: 100,
                    type: 'bar',
                    gap: 0.1,
                    fill: bgcolor,
                    stroke: {color:bgcolor}
                },
                {
                  value: value,
                  type: 'bar',
                  gap: 0.1,
                  fill: palette[0],
                  stroke: null
                },
                // {
                //   value: 0,
                //   type: 'line',
                //   gap: 0.5,
                //   fill: 'black',
                //   stroke: {
                //       thickness: 2,
                //       color: 'black'
                //   }
                // }
              ]);
            ;
              bulletchart.range().from(0).to(100);
              bulletchart.background().fill("#FFFFFF 0");
              bulletchart.tooltip().enabled(true);
              // Set bulletchart size and position settings
              bulletchart.bounds(0, 0, "100%", 125);
            //   bulletscale = this.createBulletScale(parseInt(minimum),parseInt(maximum),parseInt((maximum/2)),1)
              // console.log('asplbullet',bulletscale);
              return(
                <div>
                    <Row className="custom_main_chart">
                       
                        <Col lg={2}>
                            <span>{index+1}</span>    
                        </Col>
                        <Col lg={2}>
                            <span className="cust-ticker-hover" onClick={()=>this.OpenModal(key['ticker_code'])}>{key['ticker_code']}</span>    
                        </Col>
                        <Col lg={6}>
                            <span>{key['ticker_name']}</span>    
                        </Col>
                        <Col lg={14}>
                        <AnyChart
                            id={'newsmain_'+j++}
                            width="100%"
                            height={20}
                            instance={bulletchart}
                        />
                        </Col>
                    </Row>
                    {/* {bulletscale} */}
                </div>
              )
                    // }
                    // else{j++}
            })
            }
            </div>

           
        
        }
        return (
            <div style={{"width":"100%"}} className="cust_bullet_chart cust_ecin_div cust-tab-font ">
              <span className="cust_desciption cust-hass-font">Top Shared Rank for day {title_date}</span>
                {this.props.newsDataMain.length>0?this.props.newsDataMain[0].length>0?
                <div className="cust_price_chart">
                  {legends1}
                  {newvar} 
                </div>:
                <div className="cust_price_chart">
                  <div className="nodata_div" align="center">
                  {theme=='light'?
                    <img alt="" src={require("assets/images/empty.png")} />
                    :<img alt="" src={require("assets/images/emptyWhite.png")} />}
                    <br />
                    <span className="nodata_title">No Data</span>
                  </div>
                </div>
                :
                <div className="cust_price_chart">
                  <div className="nodata_div" align="center">
                  {theme=='light'?
                    <img alt="" src={require("assets/images/empty.png")} />
                    :<img alt="" src={require("assets/images/emptyWhite.png")} />}
                    <br />
                    <span className="nodata_title">No Data</span>
                  </div>
                </div>
                }
                
                <Modal className="week_modal confirmation_modal" visible={this.state.modalVisible} onCancel={this.handleCancel} >
                       {/* <form onSubmit={this.handleSubmit} method="post"> */}
                          You have Clicked on ticker <strong>{this.state.ticker}</strong> and you will be redirect to Setup Explore if you click on Confirm button
                          <div align="center">
                            <Button type="primary"  onClick={()=>this.maintoSE()} >Confirm</Button>
                            <Button type="danger"  onClick={()=>this.closeModal()}>Cancel</Button>
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
        newsDataMain: Object.keys(state.Exchange.newsDataMain).filter(priceDataIndex => priceDataIndex == 'newsdata').map((priceDataIndex)=>{
          return state.Exchange.newsDataMain[priceDataIndex];
        }),
        newsDate: Object.keys(state.Exchange.newsDataMain).filter(priceDataIndex => priceDataIndex == 'date').map((priceDataIndex)=>{
          return state.Exchange.newsDataMain[priceDataIndex];
        }),
    }
  };
  export default connect(mapStateToProps, {getmoveDate,changeScroller,addClicked,tableData,confirmationModal1,testing})(NewsMain);
