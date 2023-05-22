import React, {Component} from "react";
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import {connect} from "react-redux";
import {getmoveDate,changeScroller,addClicked,tableData,confirmationModal1,testing} from "appRedux/actions/Exchange";
import {Tabs,Modal,Button} from "antd";
import PropTypes from "prop-types";
import isEqual from "lodash/isEqual";
var theme = localStorage.getItem('theme');
const TabPane = Tabs.TabPane;

Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };
Array.prototype.min = function() {
    return Math.min.apply(null, this);
  };

class TagsChart extends Component {
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
        if (nextProps.titleTextData && !isEqual(nextProps.titleTextData,this.props.titleTextData)) {
            return true;
        } else {
            return false;
        }
    }
    render() {
        var title_date = '';
        if(this.props.newsDate.length > 0){
          title_date = this.props.newsDate[0];
        }
        var newvar = <div></div>
        var notAllowed = [];
        if(this.props.notAllowed.length > 0){
          notAllowed = this.props.notAllowed[0];
        }
        // console.log('asplaabbcc',this.props.titleTextData);
        if(this.props.titleTextData.length > 0){
  
            var value = this.props.titleTextData[0];
            var chart = anychart.tagCloud();
            // set data with settings
            chart.data(value, {
                mode: 'by-word',
                minLength: 4,
                maxItems: 200,
                ignoreItems: notAllowed
            });
            chart.background().fill("#FFFFFF 0");
            chart.angles([0]);
            chart.mode('spiral');
            var customColorScale = anychart.scales.ordinalColor();
            customColorScale.colors(["#579fda","#2684da","#176aba","#0e2e97","#344a92"]);

            // set the color scale as the color scale of the chart
            chart.colorScale(customColorScale);
            newvar = <div className="cust_bullet_chart cust_price_chart">
                    {/* <Row className="custom_main_chart">                        */}
                        <AnyChart
                            id={'tagChart'}
                            width="100%"
                            height={400}
                            instance={chart}
                        />
                        {/* </Row> */}
                    </div>
        }
        return (
            <div style={{"width":"100%"}} className="cust_bullet_chart cust_ecin_div cust-tab-font ">
              <span className="cust_desciption cust-hass-font">Most used words in News of {title_date}</span>
              {this.props.titleTextData.length > 0?
                <div>
                  {newvar} 
                </div>:
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
        titleTextData: Object.keys(state.Exchange.newsDataMain).filter(priceDataIndex => priceDataIndex == 'titleText').map((priceDataIndex)=>{
          return state.Exchange.newsDataMain[priceDataIndex];
        }),
        notAllowed: Object.keys(state.Exchange.newsDataMain).filter(priceDataIndex => priceDataIndex == 'notAllowed').map((priceDataIndex)=>{
          return state.Exchange.newsDataMain[priceDataIndex];
        }),
        newsDate: Object.keys(state.Exchange.newsDataMain).filter(priceDataIndex => priceDataIndex == 'date').map((priceDataIndex)=>{
          return state.Exchange.newsDataMain[priceDataIndex];
        }),
    }
  };
  export default connect(mapStateToProps, {getmoveDate,changeScroller,addClicked,tableData,confirmationModal1,testing})(TagsChart);
