import React, { Component } from "react";
import AnyChart from "anychart-react";
import anychart from "anychart";
import { connect } from "react-redux";
import { CirclePicker } from "react-color";
import {
  getmoveDate,
  changeScroller,
  addClicked,
  tableData,
} from "appRedux/actions/Exchange";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Popover, Switch, Slider, Row, Col, Modal, Button, Badge } from "antd";
var common_colors = require("../../../assets/theme-variable");
var theme = localStorage.getItem("theme");
var bgcolor = common_colors.default_main_color;
if (theme == "coffee") {
  anychart.theme(anychart.themes.coffee);
  bgcolor = common_colors.coffee_main_color;
} else if (theme == "light") {
  //     anychart.theme(anychart.themes.coffee);
  bgcolor = common_colors.light_main_color;
}
class PullbackScan extends Component {
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

  render() {
    var palette = anychart.palettes.defaultPalette;
    if (theme == "coffee") {
      anychart.theme(anychart.themes.coffee);
      palette = anychart.palettes.coffee;
    }
    var newvar = <div></div>;
    var newvar1 = <div></div>;
    var legends1 = <div></div>;
    var legends2 = <div></div>;
    var title_date = "";
    var long_term = [];
    var short_term = [];
    if (this.props.pullback.length > 0) {
      // if(this.props.nzlc[0].length > 0){

      var bulletchart;
      var linechart;
      var scalearray1 = [];
      var scalearray2 = [];
      var j = 1;
      title_date = this.props.pullback[0].date;
      long_term = this.props.pullback[0].long_term;
      short_term = this.props.pullback[0].short_term;
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
                iconTextSpacing: "1px",
                iconStroke: "none",
                iconFill: palette[0],
              },
              // {
              //     'index': 1,
              //     'text': 'Previous',
              //     // 'iconType': 'area',
              //     'iconStroke': 'none',
              //     'iconFill': '#828282'
              // }
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
                id={"intensitylegend1"}
                width="100%"
                height={30}
                key={"intensitylegend1"}
                instance={stage}
                charts={[legend]}
              />
            );
          })}
        </div>
      );
      legends2 = (
        <div>
          {r.map((key) => {
            var stage = anychart.graphics.create();
            var legend = anychart.standalones.legend();
            var items = [
              {
                index: 0,
                text: "Actual",
                // 'iconType': 'area',
                iconTextSpacing: "1px",
                iconStroke: "none",
                iconFill: palette[0],
              },
              //   {
              //       'index': 1,
              //       'text': 'Previous',
              //       // 'iconType': 'area',
              //       'iconStroke': 'none',
              //       'iconFill': '#828282'
              //   }
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
                id={"instensitylegend2"}
                width="100%"
                height={30}
                key={"instensitylegend2"}
                instance={stage}
                charts={[legend]}
              />
            );
          })}
        </div>
      );
      newvar = (
        <div className="cust_bullet_chart">
          <Row className="custom_main_chart_title cust-hass-font">
            <Col lg={7} align="center">
              <span>
                <strong>Last 3 Month</strong>
              </span>
            </Col>
            <Col lg={2} align="center">
              <span>
                <strong>Code</strong>
              </span>
            </Col>
            <Col lg={6} align="center">
              <span>
                <strong>Ticker</strong>
              </span>
            </Col>
            <Col lg={7} align="center">
              <span>
                <strong>Intensity</strong>
              </span>
            </Col>
            <Col lg={2} align="center">
              <span>
                <strong>NC NET Div.</strong>
              </span>
            </Col>
          </Row>
          {long_term.map((item, key) => {
            // if(topnoncom[key]['value']<1000 && topnoncom[key]['value']>-1000)
            // {
            scalearray1.push(item["intensity"]);
            // }
          })}
          {long_term.map((item, key) => {
            //   var overall_diff = com_nzlc[key]['current'] - com_nzlc[key]['previous'];
            // console.log('asplvalue',overall_diff);
            //   var close_diff = com_nzlc[key]['current'] - 0;
            // console.log('asplvalue1',close_diff);
            //   var value = 100-((close_diff*100)/overall_diff);
            var value = item["intensity"];
            // console.log('asplnzlc',value);
            //   if(com_nzlc[key]['value']<0)
            //   {
            bulletchart = anychart.bullet([
              {
                value: -100,
                type: "bar",
                gap: 0.1,
                fill: bgcolor,
                stroke: { color: bgcolor },
              },
              {
                value: value,
                type: "bar",
                gap: 0.1,
                fill: palette[0],
                stroke: null,
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
            //   }

            bulletchart
              .scale()
              .minimum(-75)
              .maximum(scalearray1.min());
            bulletchart
              .range()
              .from(-75)
              .to(scalearray1.min());
            bulletchart.background().fill("#FFFFFF 0");
            // Set bulletchart size and position settings
            bulletchart.bounds(0, 0, "100%", 125);

            //   console.log('asplprice',item['price'])
            var pricearray = [];
            var price = item["price"];
            price.forEach((element) => {
              pricearray.push(element["close"]);
            });
            linechart = anychart.sparkline();
            linechart.data(pricearray);
            linechart.background().fill("#FFFFFF 0");
            return (
              <div key={"div_" + item["ticker_code"]}>
                <Row className="custom_main_chart">
                  <Col lg={7}>
                    <AnyChart
                      id={"intensitysparkline_" + j++}
                      width="100%"
                      height={20}
                      key={"intensitysparkline_" + j++}
                      instance={linechart}
                    />
                  </Col>
                  <Col lg={2}>
                    <span
                      className="cust-ticker-hover"
                      onClick={() => this.OpenModal(item["ticker_code"])}
                    >
                      {item["ticker_code"]}
                    </span>
                  </Col>
                  <Col lg={6}>
                    <span>{item["name"]}</span>
                  </Col>
                  <Col lg={7}>
                    <AnyChart
                      id={"intensity" + j++}
                      width="100%"
                      height={20}
                      key={"intensity" + j++}
                      instance={bulletchart}
                    />
                  </Col>
                  <Col lg={2} align="center">
                    <span className="net_badge">
                      {item["future"] >= 0 ? (
                        <Badge status="success" className="badge_cust" />
                      ) : null}
                    </span>
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
      );

      // Non Commercial Charts
      newvar1 = (
        <div className="cust_bullet_chart">
          <Row className="custom_main_chart_title cust-hass-font">
            <Col lg={7} align="center">
              <span>
                <strong>Last 3 Month</strong>
              </span>
            </Col>
            <Col lg={2} align="center">
              <span>
                <strong>Code</strong>
              </span>
            </Col>
            <Col lg={6} align="center">
              <span>
                <strong>Ticker</strong>
              </span>
            </Col>
            <Col lg={7} align="center">
              <span>
                <strong>Intensity</strong>
              </span>
            </Col>
            <Col lg={2} align="center">
              <span>
                <strong>NC NET Div.</strong>
              </span>
            </Col>
          </Row>
          {short_term.map((item, key) => {
            // if(topnoncom[key]['value']<1000 && topnoncom[key]['value']>-1000)
            // {
            scalearray2.push(item["intensity"]);
            // }
          })}
          {short_term.map((item, key) => {
            var max = scalearray2.max();
            var min = scalearray2.min();
            var value = item["intensity"];
            var last = min - max;
            var value_diff = min - value;
            var final = (value_diff * 100) / last;
            // console.log('asplnzlc',value);
            //   if(com_nzlc[key]['value']<0)
            //   {
            bulletchart = anychart.bullet([
              {
                value: 100,
                type: "bar",
                gap: 0.1,
                fill: bgcolor,
                stroke: { color: bgcolor },
              },
              {
                value: final,
                type: "bar",
                gap: 0.1,
                fill: palette[0],
                stroke: null,
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
            //   }
            // console.log('asplmax',scalearray2.max())
            bulletchart
              .scale()
              .minimum(0)
              .maximum(100);
            bulletchart
              .range()
              .from(0)
              .to(100);
            bulletchart.background().fill("#FFFFFF 0");
            // Set bulletchart size and position settings
            bulletchart.bounds(0, 0, "100%", 125);

            //   console.log('asplprice',item['price'])
            var pricearray = [];
            var price = item["price"];
            price.forEach((element) => {
              pricearray.push(element["close"]);
            });
            linechart = anychart.sparkline();
            linechart.data(pricearray);
            linechart.background().fill("#FFFFFF 0");
            return (
              <div key={"divone_" + item["ticker_code"]}>
                <Row className="custom_main_chart">
                  <Col lg={7}>
                    <AnyChart
                      id={"intensitysparkline1_" + j++}
                      width="100%"
                      height={20}
                      key={"intensitysparkline1_" + j++}
                      instance={linechart}
                    />
                  </Col>
                  <Col lg={2}>
                    <span
                      className="cust-ticker-hover"
                      onClick={() => this.OpenModal(item["ticker_code"])}
                    >
                      {item["ticker_code"]}
                    </span>
                  </Col>
                  <Col lg={6}>
                    <span>{item["name"]}</span>
                  </Col>
                  <Col lg={7}>
                    <AnyChart
                      id={"intensity1" + j++}
                      width="100%"
                      height={20}
                      key={"intensity1" + j++}
                      instance={bulletchart}
                    />
                  </Col>
                  <Col lg={2} align="center">
                    <span className="net_badge">
                      {item["future"] <= 0 ? (
                        <Badge status="success" className="badge_cust" />
                      ) : null}
                    </span>
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
      );

      // }
    }
    return (
      <div style={{ width: "100%" }} className="cust_bullet_chart ">
        <span className="cust_desciption cust-hass-font">
          PullBack Scan as per day {title_date}
        </span>
        {long_term.length ? (
          <div className="cust_price_chart">
            {legends1}
            {newvar}
          </div>
        ) : (
          <div className="cust_price_chart">
            <div className="nodata_div" align="center">
              {theme == "light" ? (
                <img alt="" src={require("assets/images/empty.png")} />
              ) : (
                <img alt="" src={require("assets/images/emptyWhite.png")} />
              )}
              <br />
              <span className="nodata_title">No Data</span>
            </div>
          </div>
        )}
        <span
          className="cust_desciption cust-hass-font"
          style={{ marginTop: "15px" }}
        >
          Rebound Scan as per day {title_date}
        </span>
        {short_term.length ? (
          <div className="cust_price_chart">
            {legends2}
            {newvar1}
          </div>
        ) : (
          <div className="cust_price_chart">
            <div className="nodata_div" align="center">
              {theme == "light" ? (
                <img alt="" src={require("assets/images/empty.png")} />
              ) : (
                <img alt="" src={require("assets/images/emptyWhite.png")} />
              )}
              <br />
              <span className="nodata_title">No Data</span>
            </div>
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
    pullback: Object.keys(state.Exchange.cotreportdata)
      .filter((priceDataIndex) => priceDataIndex == "pullback")
      .map((priceDataIndex) => {
        return state.Exchange.cotreportdata[priceDataIndex];
      }),
  };
};
export default connect(
  mapStateToProps,
  { getmoveDate, changeScroller, addClicked, tableData }
)(PullbackScan);
