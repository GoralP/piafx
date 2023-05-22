import React, { Component } from "react";
import AnyChart from "anychart-react";
import anychart from "anychart";
import { connect } from "react-redux";
import {
  getmoveDate,
  changeScroller,
  addClicked,
  tableData,
  testing,
} from "appRedux/actions/Exchange";
import PropTypes from "prop-types";
import { Popover, Switch, Slider, Row, Col, Modal, Button } from "antd";
import isEqual from "lodash/isEqual";
var theme = localStorage.getItem("theme");
if (theme == "coffee") {
  anychart.theme(anychart.themes.coffee);
}
class TopTickers extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };
  constructor(props, context) {
    super(props, context);
  }
  state = {
    switchvalue: false,
    statedate: "",
    statevalue: "",
    visible: false,
    range1: true,
    symbol: 0,
  };
  state = {
    inputValue: 1,
    symbol: 0,
    timerange: true,
    addvisible: false,
    annojson: "{}",
  };
  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };
  maintoSE() {
    this.context.router.history.push({
      pathname: "/dashboard",
      state: { ticker: this.state.ticker },
    });
    this.setState({ modalVisible: false });
  }
  closeModal() {
    this.setState({ modalVisible: false });
  }
  OpenModal = (ticker) => {
    this.setState({ modalVisible: true, ticker: ticker });
  };
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.topmentioned &&
      !isEqual(nextProps.topmentioned, this.props.topmentioned)
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    var newvar = <div></div>;
    var legends1 = <div></div>;
    if (this.props.topmentioned.length > 0) {
      //   if(this.props.topmentioned[0].length > 0){

      // var bulletchart;
      var linechart;
      var j = 1;

      var r = [];
      r[0] = 1;
      legends1 = (
        <div>
          {r.map((key) => {
            var stage = anychart.graphics.create();
            var legend = anychart.standalones.legend();
            var items = [
              {
                index: 0,
                text: "Actual",
                // 'iconType': 'area',
                iconStroke: "none",
                iconFill: "#64b5f6",
              },
              {
                index: 1,
                text: "Previous",
                // 'iconType': 'area',
                iconStroke: "none",
                iconFill: "#828282",
              },
            ];
            legend
              .fontSize("14px")
              .fontFamily("'Verdana', Helvetica, Arial, sans-serif")
              .itemsLayout("horizontal")
              .fontColor("#7c8482")
              .iconTextSpacing(0)
              .align("right")
              .position("center-bottom")
              .padding(0)
              .margin(0, 0, 7, 0)
              .itemsSpacing(3)
              .title(false)
              .titleSeparator(false)
              .paginator(false)
              .background(false)
              .items(items);
            return (
              <AnyChart
                id={"legend1"}
                width="100%"
                height={30}
                key={"legend1"}
                instance={stage}
                charts={[legend]}
              />
            );
          })}
        </div>
      );

      // newvar = <div className="cust_bullet_chart top_ticker_charts cust_price_chart">
      newvar = (
        <div className="cust_bullet_chart top_ticker_charts">
          <table key="table1">
            <tbody>
              <tr>
                {Object.keys(this.props.topmentioned[0]).map((key, index) => {
                  var tickerdata = this.props.topmentioned[0][key];
                  //   console.log('asplaspl',tickerdata)
                  linechart = anychart.sparkline();
                  linechart.data(tickerdata["pricearray"]);
                  if (index == 0) {
                    linechart.stroke("white");
                  }
                  // if(theme == 'default')
                  // {
                  linechart.background().fill("#FFFFFF 0");
                  // }
                  //<span className="ticker_name_span cust-hass-font">{tickerdata['ticker_name'].replace(/^(.{12}[^\s]*).*/, "$1")}</span><br/>
                  return (
                    <td key={"toptickerone"+key}>
                      <Row
                        className={
                          index == 0
                            ? "custom_main_chart  cust-box-height ticker_details_red"
                            : "custom_main_chart cust-box-height"
                        }
                      >
                        <Col lg={24} className="ticker_details">
                          <span
                            className="ticker_name_span cust-hass-font"
                            onClick={() =>
                              this.OpenModal(tickerdata["ticker_code"])
                            }
                          >
                            {tickerdata["ticker_name"]}
                          </span>
                        </Col>
                        <Col lg={12} className="ticker_details">
                          {/* <span className="ticker_name_span cust-hass-font">{tickerdata['ticker_name']}</span><br/> */}
                          <span
                            className="ticker_code_span cust-hass-font cust-ticker-hover"
                            onClick={() =>
                              this.OpenModal(tickerdata["ticker_code"])
                            }
                          >
                            {tickerdata["ticker_code"]}
                          </span>
                          <br />
                          <span className="current_span cust-hass-font">
                            {tickerdata["current"]}
                          </span>
                          <br />
                          <div>
                            <span
                              className={
                                tickerdata["percentage"] < 0
                                  ? index == 0
                                    ? "percentage_span_black"
                                    : "percentage_span_red"
                                  : "percentage_span"
                              }
                            >
                              {tickerdata["percentage"] + "%"}
                            </span>
                            <span className="number_span">
                              {tickerdata["number"]}
                            </span>
                          </div>
                        </Col>
                        <Col lg={12}>
                          <div className={"topticker_charts"}>
                            <AnyChart
                              id={"topticker_" + j++}
                              width="100%"
                              height={40}
                              key={"topticker_" + j++}
                              instance={linechart}
                            />
                          </div>
                        </Col>
                        <span className="vline"></span>
                      </Row>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      );

      // }
    }
    return (
      <div
        style={{ width: "100%" }}
        className="cust_bullet_chart top_ticker_charts "
      >
        <span className="cust_desciption cust-hass-font">
          Top Mentioned Ticker
        </span>
        {/* {legends1} */}
        {this.props.topmentioned.length > 0 ? (
          Object.keys(this.props.topmentioned[0]).length > 0 ? (
            <span>{newvar}</span>
          ) : (
            <div className="nodata_div" align="center">
              {theme == "light" ? (
                <img alt="" src={require("assets/images/empty.png")} />
              ) : (
                <img alt="" src={require("assets/images/emptyWhite.png")} />
              )}
              <br />
              <span className="nodata_title">No Data</span>
            </div>
          )
        ) : (
          <div className="nodata_div" align="center">
            {theme == "light" ? (
              <img alt="" src={require("assets/images/empty.png")} />
            ) : (
              <img alt="" src={require("assets/images/emptyWhite.png")} />
            )}
            <br />
            <span className="nodata_title">No Data</span>
          </div>
        )}
        <Modal
          className="week_modal confirmation_modal"
          visible={this.state.modalVisible}
          onCancel={this.handleCancel}
        >
          {/* <form onSubmit={this.handleSubmit} method="post"> */}
          You have Clicked on ticker <strong>{this.state.ticker}</strong> and
          you will be redirect to Setup Explore if you click on Confirm button
          <div align="right">
            <Button type="danger" onClick={() => this.closeModal()}>
              Cancel
            </Button>
            <Button type="primary" onClick={() => this.maintoSE()}>
              Confirm
            </Button>
          </div>
          {/* </form> */}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topmentioned: Object.keys(state.Exchange.getoimovers)
      .filter((priceDataIndex) => priceDataIndex == "top_mentioned")
      .map((priceDataIndex) => {
        return state.Exchange.getoimovers[priceDataIndex];
      }),
  };
};
export default connect(
  mapStateToProps,
  { getmoveDate, changeScroller, addClicked, tableData, testing }
)(TopTickers);
