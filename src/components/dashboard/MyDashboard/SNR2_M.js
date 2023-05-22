import React, {Component} from "react";
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import {connect} from "react-redux";
import {getmoveDate,changeScroller,addClicked,tableData} from "appRedux/actions/Exchange";
import PropTypes from "prop-types";
import {Row, Col, Tabs , Modal,Button, Badge} from "antd";
import Widget from "components/Widget";
import isEqual from "lodash/isEqual";
const TabPane = Tabs.TabPane;
var common_colors = require('../../../assets/theme-variable');
var theme = localStorage.getItem('theme');
var bgcolor = common_colors.default_main_color;
if(theme == 'coffee')
{
    anychart.theme(anychart.themes.coffee);
    bgcolor = common_colors.coffee_main_color;
}
class SNR2_M extends Component {
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
    };
    handleCancel = () => {
    
      this.setState({
        modalVisible: false,
      });
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
        if (nextProps.snrExt && !isEqual(nextProps.snrExt,this.props.snrExt)) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        var newvar20Y = <div></div>
        var newvar5Y = <div></div>
        var newvar10Y = <div></div>
        var title_date = '';
        if(this.props.snrExt.length > 0 && this.props.snrExt[0].data && this.props.snrExt[0].data['5Y'] && this.props.snrExt[0].data['10Y'] && this.props.snrExt[0].data['20Y']){
          // if(this.props.nzlc[0].length > 0){
            
            var bulletchart;
            var linechart;
            var j = 1;
            var k = 1;
            var l = 1;
            var m = 1;
            title_date = this.props.snrExt[0].date;
              // console.log(com_nzlc);
            const SNR5Y = this.props.snrExt[0].data['5Y'];
            newvar5Y = <div className="cust_bullet_chart">
                <Row className="custom_main_chart_title cust-hass-font">
                    <Col lg={4} align="center">
                        <span><strong>Code</strong></span>
                    </Col>
                    <Col lg={10} align="center">
                        <span><strong>Ticker</strong></span>
                    </Col>
                    <Col lg={5} align="center">
                        <span><strong>BreakOut</strong></span>
                    </Col>
                    <Col lg={5} align="center">
                        <span><strong>Average</strong></span>
                    </Col>
                </Row>
                { 
                SNR5Y.map((item,key)=>{
                
                // console.log('asplprice',com_nzlc[key]['pricedata'])
                linechart = anychart.sparkline();
                linechart.data(item['price']);
                linechart.background().fill("#FFFFFF 0");
                // const breakoutValues = item['Values'].split(',');
                if(item['5Y'] != '0')
                {
                return(
                    <div>
                        <Row className="custom_main_chart">
                            
                            <Col lg={4} align="center">
                                <span className="cust-ticker-hover" onClick={()=>this.OpenModal(item['ticker_code'])}>{item['ticker_code']}</span>    
                            </Col>
                            <Col lg={10} align="center">
                            <span>{item['ticker_name']}</span>
                            </Col>
                            <Col lg={5} align="center">
                            <span>{item['5Y']==='down'?<span><img alt="" src={require("assets/images/ArrowDown_m.png")} className="arrow_icons"/></span>:<span><img alt="" src={require("assets/images/ArrowUp_m.png")} className="arrow_icons"/></span>}</span>
                            </Col>
                            <Col lg={5} align="center">
                                <span class="net_badge">{item['5Yavg']==='resistance'?<Badge color="#64b5f6" class="badge_cust snr"/>:item['5Yavg']==='support'?<Badge color="#cf4140" class="badge_cust snr"/>:null}</span>
                            </Col>
                        </Row>
                    </div>
                )
                }
                else
                {
                    return null;
                }
                })
                }
            </div>
            const SNR10Y = this.props.snrExt[0].data['10Y'];
            newvar10Y = <div className="cust_bullet_chart">
                <Row className="custom_main_chart_title cust-hass-font">
                    <Col lg={4} align="center">
                        <span><strong>Code</strong></span>
                    </Col>
                    <Col lg={10} align="center">
                        <span><strong>Ticker</strong></span>
                    </Col>
                    <Col lg={5} align="center">
                        <span><strong>BreakOut</strong></span>
                    </Col>
                    <Col lg={5} align="center">
                        <span><strong>Average</strong></span>
                    </Col>
                </Row>
                { 
                SNR10Y.map((item,key)=>{
                
                // console.log('asplprice',com_nzlc[key]['pricedata'])
                linechart = anychart.sparkline();
                linechart.data(item['price']);
                linechart.background().fill("#FFFFFF 0");
                // const breakoutValues = item['Values'].split(',');
                if(item['10Y'] != '0')
                {
                return(
                    <div>
                        <Row className="custom_main_chart">
                            <Col lg={4} align="center">
                                <span className="cust-ticker-hover" onClick={()=>this.OpenModal(item['ticker_code'])}>{item['ticker_code']}</span>    
                            </Col>
                            <Col lg={10} align="center">
                            <span>{item['ticker_name']}</span>
                            </Col>
                            <Col lg={5} align="center">
                            <span>{item['10Y']==='down'?<span><img alt="" src={require("assets/images/ArrowDown_m.png")} className="arrow_icons"/></span>:<span><img alt="" src={require("assets/images/ArrowUp_m.png")} className="arrow_icons"/></span>}</span>
                            </Col>
                            <Col lg={5} align="center">
                                <span class="net_badge">{item['10Yavg']==='resistance'?<Badge color="#64b5f6" class="badge_cust snr"/>:item['10Yavg']==='support'?<Badge color="#cf4140" class="badge_cust snr"/>:null}</span>
                            </Col>
                        </Row>
                    </div>
                )
                }
                else
                {
                    return null;
                }
                })
            }
            </div>
            const SNR20Y = this.props.snrExt[0].data['20Y'];
            newvar20Y = <div className="cust_bullet_chart">
            <Row className="custom_main_chart_title cust-hass-font">
                <Col lg={4} align="center">
                    <span><strong>Code</strong></span>
                </Col>
                <Col lg={10} align="center">
                    <span><strong>Ticker</strong></span>
                </Col>
                <Col lg={5} align="center">
                    <span><strong>BreakOut</strong></span>
                </Col>
                <Col lg={5} align="center">
                    <span><strong>Average</strong></span>
                </Col>
            </Row>
            { 
            SNR20Y.map((item,key)=>{
            
            // console.log('asplprice',com_nzlc[key]['pricedata'])
            linechart = anychart.sparkline();
            linechart.data(item['price']);
            linechart.background().fill("#FFFFFF 0");
            // const breakoutValues = item['Values'].split(',');
            // console.log('asplbreakout',breakoutValues);
            if(item['20Y'] != '0')
            {
            return(
                <div>
                    <Row className="custom_main_chart">
                        <Col lg={4} align="center">
                            <span className="cust-ticker-hover" onClick={()=>this.OpenModal(item['ticker_code'])}>{item['ticker_code']}</span>    
                        </Col>
                        <Col lg={10} align="center">
                        <span>{item['ticker_name']}</span>
                        </Col>
                        <Col lg={5} align="center">
                        <span>{item['20Y']==='down'?<span><img alt="" src={require("assets/images/ArrowDown_m.png")} className="arrow_icons"/></span>:<span><img alt="" src={require("assets/images/ArrowUp_m.png")} className="arrow_icons"/></span>}</span>
                        </Col>
                        <Col lg={5} align="center">
                            <span class="net_badge">{item['20Yavg']==='resistance'?<Badge color="#64b5f6" class="badge_cust snr"/>:item['20Yavg']==='support'?<Badge color="#cf4140" class="badge_cust snr"/>:null}</span>
                        </Col>
                    </Row>
                </div>
            )
            }
            else
            {
                return null;
            }
            })
            }
            </div>

            
            
        // }
        }
        return (
            <div style={{"width":"100%"}} className="cust_bullet_chart cust_ecin_div cust-tab-font ">
              {/* <span className="cust_desciption cust-hass-font">S&R Machine Learning Monthly Breakout</span> */}
                <div className="cust_price_chart" >
                    <Widget title="" styleName="sector_tabs gx-card-tabs" >  
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="5Y" key="1" className="">
                                {newvar5Y}
                            </TabPane>
                            <TabPane tab="10Y" key="2" className="">
                                {newvar10Y}
                            </TabPane>
                            <TabPane tab="20Y" key="3" className="">
                                {newvar20Y}
                            </TabPane>
                        </Tabs>
                    </Widget>
                </div>
                {/* {(this.props.snrExt.length > 0 && this.props.snrExt[0].length > 0)?
                <div className="cust_price_chart" >
                {newvar} 
                </div>
                :
                <div className="cust_price_chart" >
                  <div className="nodata_div" align="center">
                    {theme=='light'?
                    <img alt="" src={require("assets/images/empty.png")} />
                    :<img alt="" src={require("assets/images/emptyWhite.png")} />}
                    <br />
                    <span className="nodata_title">No Data</span>
                  </div>
                </div>
                } */}
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
        snrExt: Object.keys(state.Exchange.snrbreakoutdata).filter(priceDataIndex => priceDataIndex == 'snr2_M').map((priceDataIndex)=>{
            return state.Exchange.snrbreakoutdata[priceDataIndex];
        }),
    }
  };
  export default connect(mapStateToProps, {getmoveDate,changeScroller,addClicked,tableData})(SNR2_M);
