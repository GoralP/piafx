import React, {Component} from "react";
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import {connect} from "react-redux";
import {getmoveDate,changeScroller,addClicked,tableData} from "appRedux/actions/Exchange";
import PropTypes from "prop-types";
import {Row, Col, Tabs , Modal,Button} from "antd";
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
class SNR2 extends Component {
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
        var newvar3M = <div></div>
        var newvar6M = <div></div>
        var newvar1Y = <div></div>
        var newvar2Y = <div></div>
        var title_date = '';
        if(this.props.snrExt.length > 0 && this.props.snrExt[0].data && this.props.snrExt[0].data['3M'] && this.props.snrExt[0].data['6M'] && this.props.snrExt[0].data['1Y'] && this.props.snrExt[0].data['2Y']){
          // if(this.props.nzlc[0].length > 0){
            
            var bulletchart;
            var linechart;
            var j = 1;
            var k = 1;
            var l = 1;
            var m = 1;
            title_date = this.props.snrExt[0].date;
              // console.log(com_nzlc);
            const SNR3M = this.props.snrExt[0].data['3M'];
            newvar3M = <div className="cust_bullet_chart">
                <Row className="custom_main_chart_title cust-hass-font">
                    <Col lg={4} align="center">
                        <span><strong>Code</strong></span>
                    </Col>
                    <Col lg={10} align="center">
                        <span><strong>Ticker</strong></span>
                    </Col>
                    <Col lg={10} align="center">
                        <span><strong>BreakOut</strong></span>
                    </Col>
                </Row>
                { 
                SNR3M.map((item,key)=>{
                
                // console.log('asplprice',com_nzlc[key]['pricedata'])
                linechart = anychart.sparkline();
                linechart.data(item['price']);
                linechart.background().fill("#FFFFFF 0");
                // const breakoutValues = item['Values'].split(',');
                if(item['3M'] != '0')
                {
                return(
                    <div key={"div_"+ key}>
                        <Row className="custom_main_chart">
                            
                            <Col lg={4} align="center">
                                <span className="cust-ticker-hover" onClick={()=>this.OpenModal(item['ticker_code'])}>{item['ticker_code']}</span>    
                            </Col>
                            <Col lg={10} align="center">
                            <span>{item['ticker_name']}</span>
                            </Col>
                            <Col lg={10} align="center">
                            <span>{item['3M']==='down'?<span><img alt="" src={require("assets/images/ArrowDown_m.png")} className="arrow_icons"/></span>:<span><img alt="" src={require("assets/images/ArrowUp_m.png")} className="arrow_icons"/></span>}</span>
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
            const SNR6M = this.props.snrExt[0].data['6M'];
            newvar6M = <div className="cust_bullet_chart">
                <Row className="custom_main_chart_title cust-hass-font">
                    <Col lg={4} align="center">
                        <span><strong>Code</strong></span>
                    </Col>
                    <Col lg={10} align="center">
                        <span><strong>Ticker</strong></span>
                    </Col>
                    <Col lg={10} align="center">
                        <span><strong>BreakOut</strong></span>
                    </Col>
                </Row>
                { 
                SNR6M.map((item,key)=>{
                
                // console.log('asplprice',com_nzlc[key]['pricedata'])
                linechart = anychart.sparkline();
                linechart.data(item['price']);
                linechart.background().fill("#FFFFFF 0");
                // const breakoutValues = item['Values'].split(',');
                if(item['6M'] != '0')
                {
                return(
                    <div key={"divtwo_"+ key}>
                        <Row className="custom_main_chart">
                            <Col lg={4} align="center">
                                <span className="cust-ticker-hover" onClick={()=>this.OpenModal(item['ticker_code'])}>{item['ticker_code']}</span>    
                            </Col>
                            <Col lg={10} align="center">
                            <span>{item['ticker_name']}</span>
                            </Col>
                            <Col lg={10} align="center">
                            <span>{item['6M']==='down'?<span><img alt="" src={require("assets/images/ArrowDown_m.png")} className="arrow_icons"/></span>:<span><img alt="" src={require("assets/images/ArrowUp_m.png")} className="arrow_icons"/></span>}</span>
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
            const SNR1Y = this.props.snrExt[0].data['1Y'];
            newvar1Y = <div className="cust_bullet_chart">
            <Row className="custom_main_chart_title cust-hass-font">
                <Col lg={4} align="center">
                    <span><strong>Code</strong></span>
                </Col>
                <Col lg={10} align="center">
                    <span><strong>Ticker</strong></span>
                </Col>
                <Col lg={10} align="center">
                    <span><strong>BreakOut</strong></span>
                </Col>
            </Row>
            { 
            SNR1Y.map((item,key)=>{
            
            // console.log('asplprice',com_nzlc[key]['pricedata'])
            linechart = anychart.sparkline();
            linechart.data(item['price']);
            linechart.background().fill("#FFFFFF 0");
            // const breakoutValues = item['Values'].split(',');
            if(item['1Y'] != '0')
            {
            return(
                <div key={"divthree_"+ key}>
                    <Row className="custom_main_chart">
                        <Col lg={4} align="center">
                            <span className="cust-ticker-hover" onClick={()=>this.OpenModal(item['ticker_code'])}>{item['ticker_code']}</span>    
                        </Col>
                        <Col lg={10} align="center">
                        <span>{item['ticker_name']}</span>
                        </Col>
                        <Col lg={10} align="center">
                        <span>{item['1Y']==='down'?<span><img alt="" src={require("assets/images/ArrowDown_m.png")} className="arrow_icons"/></span>:<span><img alt="" src={require("assets/images/ArrowUp_m.png")} className="arrow_icons"/></span>}</span>
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
            const SNR2Y = this.props.snrExt[0].data['2Y'];
            newvar2Y = <div className="cust_bullet_chart">
            <Row className="custom_main_chart_title cust-hass-font">
                <Col lg={4} align="center">
                    <span><strong>Code</strong></span>
                </Col>
                <Col lg={10} align="center">
                    <span><strong>Ticker</strong></span>
                </Col>
                <Col lg={10} align="center">
                    <span><strong>BreakOut</strong></span>
                </Col>
            </Row>
            { 
            SNR2Y.map((item,key)=>{
            
            // console.log('asplprice',com_nzlc[key]['pricedata'])
            linechart = anychart.sparkline();
            linechart.data(item['price']);
            linechart.background().fill("#FFFFFF 0");
            // const breakoutValues = item['Values'].split(',');
            // console.log('asplbreakout',breakoutValues);
            if(item['2Y'] != '0')
            {
            return(
                <div key={"divfour_"+ key}>
                    <Row className="custom_main_chart">
                        <Col lg={4} align="center">
                            <span className="cust-ticker-hover" onClick={()=>this.OpenModal(item['ticker_code'])}>{item['ticker_code']}</span>    
                        </Col>
                        <Col lg={10} align="center">
                        <span>{item['ticker_name']}</span>
                        </Col>
                        <Col lg={10} align="center">
                        <span>{item['2Y']==='down'?<span><img alt="" src={require("assets/images/ArrowDown_m.png")} className="arrow_icons"/></span>:<span><img alt="" src={require("assets/images/ArrowUp_m.png")} className="arrow_icons"/></span>}</span>
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
              {/* <span className="cust_desciption cust-hass-font">S&R Vector Quantization Breakout</span> */}
                <div className="cust_price_chart" >
                    <Widget title="" styleName="sector_tabs gx-card-tabs" >  
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="3M" key="1" className="">
                                {newvar3M}
                            </TabPane>
                            <TabPane tab="6M" key="2" className="">
                                {newvar6M}
                            </TabPane>
                            <TabPane tab="1Y" key="3" className="">
                                {newvar1Y}
                            </TabPane>
                            <TabPane tab="2Y" key="4" className="">
                                {newvar2Y}
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
        snrExt: Object.keys(state.Exchange.snrbreakoutdata).filter(priceDataIndex => priceDataIndex == 'snr2').map((priceDataIndex)=>{
            return state.Exchange.snrbreakoutdata[priceDataIndex];
        }),
    }
  };
  export default connect(mapStateToProps, {getmoveDate,changeScroller,addClicked,tableData})(SNR2);
