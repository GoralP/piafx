import React, { Component } from "react";
import { Col, Row, Card, Tabs, Table, Slider } from "antd";
import Widget from "components/Widget";
import Auxiliary from "util/Auxiliary";
import AnyChart from "anychart-react";
import anychart from "anychart";
import { connect } from "react-redux";
import { savecotoneoone, getcotannotation } from "appRedux/actions/Exchange";

import PriceChart from "components/dashboard/MyDashboard/PriceChartCot1";
import CotChart from "components/dashboard/MyDashboard/CotAccountChart1";
// import EcinChart from "components/dashboard/MyDashboard/EcinChart1";

class MyDashboard extends Component {
  state = {
    inputValue: 1,
  };
  onChange = (value) => {
    this.setState({
      inputValue: value,
    });
  };
  componentDidMount() {
    var user_id = localStorage.getItem("user_id");
    var ticker_id = localStorage.getItem("ticker_code");
    var family = localStorage.getItem("family");
    var group = localStorage.getItem("group");
    var data = {
      user_id: user_id,
      ticker_id: ticker_id,
      family: family,
      group: group,
    };
    this.props.getcotannotation(data);
  }
  render() {
    var prestate = JSON.parse(localStorage.getItem("prestate"));

    return (
      <div>
        {prestate.priceData.length > 0 ? (
          <Auxiliary>
            <Card className="dash_background">
              <div align="right">
                <button onClick={() => this.props.savecotoneoone(true)}>
                  Save
                </button>
              </div>
              <Row className="custom_main_chart">
                <Col lg={24}>
                  <Row>
                    <PriceChart />
                  </Row>
                  <Row>
                    <CotChart />
                  </Row>
                  <Row></Row>
                </Col>
              </Row>
            </Card>
          </Auxiliary>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tableData: state.Exchange.tableData,
    priceData: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "tickers_search")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
      }),
    tickerData: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "tickers_details")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
      }),
  };
};
export default connect(
  mapStateToProps,
  { savecotoneoone, getcotannotation }
)(MyDashboard);
