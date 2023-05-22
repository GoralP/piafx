import React, {Component} from "react";
import {Col, Row, Card,Tabs,Table,Slider} from "antd";
import Widget from "components/Widget";
import Auxiliary from "util/Auxiliary";
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import {connect} from "react-redux";

import PriceChart from "components/dashboard/MyDashboard/PriceChart1";
import CotChart from "components/dashboard/MyDashboard/CotChart1";
import EcinChart from "components/dashboard/MyDashboard/EcinChart1";
import {saveoneoone,getannotation} from "appRedux/actions/Exchange";
var user_id = localStorage.getItem('user_id');
var ticker_id = localStorage.getItem('ticker_code');
var chart_id = localStorage.getItem('chart_id');
var data = {user_id:user_id,ticker_id:ticker_id,chart_id:chart_id}
class MyDashboard extends Component {
  
  state = {
    inputValue: 1,
  };
  onChange = (value) => {
    this.setState({
      inputValue: value,
    });
  };
  componentDidMount()
    {
      this.props.getannotation(data);
    }
  render() {
  var prestate = JSON.parse(localStorage.getItem('prestate'));   
      
         return (
            <div>
               { prestate.priceData.length>0 ?
            <Auxiliary>
              <Card className = "dash_background">
                <div align="right"><button onClick={()=>this.props.saveoneoone(true)}>Save</button></div>
                  <Row className="custom_main_chart">
                    
                    <Col lg={24}>
                          <Row>
                            <PriceChart />
                          </Row>
                          <Row> 
                              <CotChart/>
                          </Row> 
                          <Row>
                              <EcinChart />
                          </Row>
                    </Col>
                  </Row>
              </Card>
            </Auxiliary> 
            :<div></div>}
            </div>
          );
  }
};

const mapStateToProps =  state => {
  return {
    tableData: state.Exchange.tableData,
    priceData: Object.keys(state.Exchange.priceData).filter(priceDataIndex => priceDataIndex == 'tickers_search').map((priceDataIndex)=>{
      return state.Exchange.priceData[priceDataIndex];
    }),
    tickerData: Object.keys(state.Exchange.priceData).filter(priceDataIndex => priceDataIndex == 'tickers_details').map((priceDataIndex)=>{
      return state.Exchange.priceData[priceDataIndex];
  }),
  }
};
export default connect(mapStateToProps,{saveoneoone,getannotation})(MyDashboard);
