import React, { Component } from "react";
import AnyChart from "anychart-react";
import anychart from "anychart";
import { connect } from "react-redux";
import {
  getmoveDate,
  changeScroller,
  addClicked,
  tableData,
  confirmationModal1,
  testing,
} from "appRedux/actions/Exchange";
import { Row, Col, Tabs, Modal, Button } from "antd";
import Widget from "components/Widget";
import PropTypes from "prop-types";
import isEqual from "lodash/isEqual";
// import common_colors from "../../../../../public/theme-variable.js"
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
const TabPane = Tabs.TabPane;

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};
Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

class NetMovement extends Component {
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
    modalVisible: false,
    ticker: "",
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
  createBulletScale(minimum, maximum, interval, id) {
    var stage = anychart.graphics.create();
    var axis = anychart.standalones.axes.linear();
    axis.title(null);

    var scale = anychart.scales.linear();
    scale.minimum(minimum).maximum(maximum);
    scale.ticks().interval(interval);
    // axis.bounds('0%', '0%', '100%', '80%')
    axis.scale(scale);
    axis.orientation("bottom").stroke("#CECECE");
    axis
      .ticks()
      .enabled(true)
      .stroke("#CECECE")
      .length(4);
    axis
      .labels()
      .useHtml(true)
      .padding(0, 10, 10, 10)
      .format("{%Value}%");
    axis.minorTicks(null);

    return (
      <AnyChart
        id={"scalemeter_" + id}
        width="100%"
        height={40}
        key={"scalemeter_" + id}
        instance={stage}
        charts={[axis]}
      />
    );
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.topnet && !isEqual(nextProps.topnet, this.props.topnet)) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    var newvar = <div></div>;
    var newvar1 = <div></div>;
    var bulletscale = <div></div>;
    var bulletscale2 = <div></div>;
    var legends1 = <div></div>;
    var legends2 = <div></div>;
    var title_date = "";
    var topcom = [];
    var topnoncom = [];
    var palette = anychart.palettes.defaultPalette;
    if (theme == "coffee") {
      anychart.theme(anychart.themes.coffee);
      palette = anychart.palettes.coffee;
    }
    if (this.props.topnet.length > 0) {
      // if(this.props.topnet[0].length > 0){

      var bulletchart;
      var linechart;
      var j = 1;
      var scalearray = [];
      var scalearray2 = [];
      var maximum;
      var minimum;
      var title_date = this.props.topnet[0].date;
      topcom = JSON.parse(this.props.topnet[0].com);
      topnoncom = JSON.parse(this.props.topnet[0].noncom);
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
                text: "Extreme value - Not in scale",
                // 'iconType': 'area',
                iconTextSpacing: "1px",
                iconStroke: "none",
                iconFill: "#cf4140",
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
                id={"legend3"}
                width="100%"
                height={30}
                key={"legend3"}
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
                text: "Extreme value - Not in scale",
                // 'iconType': 'area',
                iconTextSpacing: "1px",
                iconStroke: "none",
                iconFill: "#cf4140",
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
                id={"legend4"}
                width="100%"
                height={30}
                key={"legend4"}
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
            {/* <Col lg={10}>
                        <span>Last 12 Month</span>
                    </Col> */}
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
            <Col lg={14} align="center">
              <span>
                <strong>Comparison Bars</strong>
              </span>
            </Col>
            <Col lg={2} align="center">
              <span>
                <strong>%</strong>
              </span>
            </Col>
          </Row>
          {Object.keys(topcom).map((key) => {
            if (topcom[key]["value"] < 1000 && topcom[key]["value"] > -1000) {
              scalearray.push(topcom[key]["value"]);
            }
          })}

          {Object.keys(topcom).map((key) => {
            //   if(j<=3){
            //   console.log('asplarray',scalearray);
            maximum = scalearray.max();
            minimum = scalearray.min();
            if (minimum * -1 > maximum) {
              maximum = minimum * -1;
              minimum = minimum;
            } else {
              maximum = maximum;
              minimum = maximum * -1;
            }
            // if(maximum>1000)
            // {
            //     maximum = 1000;
            //     minimum = -1000;
            // }
            var value = topcom[key]["value"];
            if (value > 1000 || value < -1000) {
              var color = "#cf4140";
            } else {
              var color = palette[0];
            }

            //   if(topcom[key]['value']<0)
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
                value: value,
                type: "bar",
                gap: 0.1,
                fill: color,
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
            bulletchart
              .scale()
              .minimum(minimum)
              .maximum(maximum);

            //   bulletchart.axis(null)
            //         .title(false)
            //         .padding(0, -1)
            //         .layout('horizontal');
            bulletchart
              .range()
              .from(0)
              .to(100);
            bulletchart.background().fill("#FFFFFF 0");
            bulletchart.tooltip().enabled(true);
            // Set bulletchart size and position settings
            bulletchart.bounds(0, 0, "100%", 125);
            bulletscale = this.createBulletScale(
              parseInt(minimum),
              parseInt(maximum),
              parseInt(maximum / 2),
              1
            );
            // console.log('asplbullet',bulletscale);
            return (
              <div key={"div_" + topcom[key]["name"]}>
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
                    <span
                      className="cust-ticker-hover"
                      onClick={() => this.OpenModal(topcom[key]["ticker"])}
                    >
                      {topcom[key]["ticker"]}
                    </span>
                  </Col>
                  <Col lg={6}>
                    <span>{topcom[key]["name"]}</span>
                  </Col>
                  <Col lg={14} style={{ marginRight: "-15px" }}>
                    <AnyChart
                      id={"netmovement_" + j++}
                      width="100%"
                      height={20}
                      key={"netmovement_" + j++}
                      instance={bulletchart}
                    />
                  </Col>
                  <Col lg={2}>
                    <span>{topcom[key]["value"] + "%"}</span>
                  </Col>
                </Row>
                {/* {bulletscale} */}
              </div>
            );
            // }
            // else{j++}
          })}
        </div>
      );

      // // Non Commercial Charts
      newvar1 = (
        <div className="cust_bullet_chart">
          <Row className="custom_main_chart_title cust-hass-font">
            {/* <Col lg={10}>
                        <span>Last 12 Month</span>
                    </Col> */}
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
            <Col lg={14} align="center">
              <span>
                <strong>Comparison Bars</strong>
              </span>
            </Col>
            <Col lg={2} align="center">
              <span>
                <strong>%</strong>
              </span>
            </Col>
          </Row>
          {Object.keys(topnoncom).map((key) => {
            if (
              topnoncom[key]["value"] < 1000 &&
              topnoncom[key]["value"] > -1000
            ) {
              scalearray2.push(topnoncom[key]["value"]);
            }
          })}

          {Object.keys(topnoncom).map((key) => {
            //   if(j<=3){
            //   console.log('asplarray',scalearray);
            maximum = scalearray2.max();
            minimum = scalearray2.min();
            if (minimum * -1 > maximum) {
              maximum = minimum * -1;
              minimum = minimum;
            } else {
              maximum = maximum;
              minimum = maximum * -1;
            }
            if (maximum > 1000) {
              maximum = 1000;
              minimum = -1000;
            }
            var value = topnoncom[key]["value"];
            if (value > 1000 || value < -1000) {
              var color = "#cf4140";
            } else {
              var color = palette[0];
            }
            //   if(topnoncom[key]['value']<0)
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
                value: value,
                type: "bar",
                gap: 0.1,
                fill: color,
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
            //   console.log('asplscale',maximum);
            //   console.log('asplscale',minimum);
            bulletchart
              .scale()
              .minimum(minimum)
              .maximum(maximum);

            //   bulletchart.axis(null)
            //         .title(false)
            //         .padding(0, -1)
            //         .layout('horizontal');
            bulletchart
              .range()
              .from(0)
              .to(100);
            bulletchart.background().fill("#FFFFFF 0");
            bulletchart.tooltip().enabled(true);
            // Set bulletchart size and position settings
            bulletchart.bounds(0, 0, "100%", 125);
            bulletscale2 = this.createBulletScale(
              parseInt(minimum),
              parseInt(maximum),
              parseInt(maximum / 2),
              2
            );
            return (
              <div key={"divtwo_" + topcom[key]["name"]}>
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
                    <span
                      className="cust-ticker-hover"
                      onClick={() => this.OpenModal(topcom[key]["ticker"])}
                    >
                      {topnoncom[key]["ticker"]}
                    </span>
                  </Col>
                  <Col lg={6}>
                    <span>{topnoncom[key]["name"]}</span>
                  </Col>
                  <Col lg={14}>
                    <AnyChart
                      id={"netmovement_" + j++}
                      width="100%"
                      height={20}
                      key={"netmovement_" + j++}
                      instance={bulletchart}
                    />
                  </Col>
                  <Col lg={2}>
                    <span>{topnoncom[key]["value"] + "%"}</span>
                  </Col>
                </Row>
              </div>
            );
            // }
            // else{j++}
          })}
        </div>
      );
      // }
    }

    return (
      <div
        style={{ width: "100%" }}
        className="cust_bullet_chart cust_ecin_div cust-tab-font "
      >
        <span className="cust_desciption cust-hass-font">
          Net Movement On Previous Value as per report dated {title_date}
        </span>
        <div className="cust_price_chart">
          <Widget title="" styleName="sector_tabs gx-card-tabs">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Commercial" key="1" className="">
                {topcom.length > 0 || Object.keys(topcom).length > 0 ? (
                  <span>
                    <div>
                      {legends1}
                      {newvar}
                    </div>
                    <div className="scale">
                      <Row className="custom_main_chart">
                        <Col lg={8}></Col>
                        <Col lg={14}>{bulletscale}</Col>
                      </Row>
                    </div>
                  </span>
                ) : (
                  <div className="cust_price_chart">
                    <div className="nodata_div" align="center">
                      {theme == "light" ? (
                        <img alt="" src={require("assets/images/empty.png")} />
                      ) : (
                        <img
                          alt=""
                          src={require("assets/images/emptyWhite.png")}
                        />
                      )}
                      <br />
                      <span className="nodata_title">No Data</span>
                    </div>
                  </div>
                )}
              </TabPane>
              <TabPane tab="Non-Commercial" key="2" className="">
                {topnoncom.length > 0 || Object.keys(topnoncom).length > 0 ? (
                  <span>
                    <div>
                      {legends2}
                      {newvar1}
                    </div>
                    <div className="scale">
                      <Row className="custom_main_chart">
                        <Col lg={8}></Col>
                        <Col lg={14}>{bulletscale2}</Col>
                      </Row>
                    </div>
                  </span>
                ) : (
                  <div className="cust_price_chart">
                    <div className="nodata_div" align="center">
                      {theme == "light" ? (
                        <img alt="" src={require("assets/images/empty.png")} />
                      ) : (
                        <img
                          alt=""
                          src={require("assets/images/emptyWhite.png")}
                        />
                      )}
                      <br />
                      <span className="nodata_title">No Data</span>
                    </div>
                  </div>
                )}
              </TabPane>
            </Tabs>
          </Widget>
        </div>
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
    cnfrmmodal: state.Exchange.cnfrmmodal,
    priceData: Object.keys(state.Exchange.mostviewedticker_respo)
      .filter((priceDataIndex) => priceDataIndex == "tickers_search")
      .map((priceDataIndex) => {
        return state.Exchange.mostviewedticker_respo[priceDataIndex];
      }),
    tickerData: Object.keys(state.Exchange.mostviewedticker_respo)
      .filter((priceDataIndex) => priceDataIndex == "tickers_details")
      .map((priceDataIndex) => {
        return state.Exchange.mostviewedticker_respo[priceDataIndex];
      }),
    // nzlc: Object.keys(state.Exchange.getoimovers)
    //   .filter((priceDataIndex) => priceDataIndex == "nzlc")
    //   .map((priceDataIndex) => {
    //     return state.Exchange.getoimovers[priceDataIndex];
    //   }),
    topnet: Object.keys(state.Exchange.cotreportdata)
      .filter((priceDataIndex) => priceDataIndex == "top_net")
      .map((priceDataIndex) => {
        return state.Exchange.cotreportdata[priceDataIndex];
      }),
    lownet: Object.keys(state.Exchange.getoimovers)
      .filter((priceDataIndex) => priceDataIndex == "low_net")
      .map((priceDataIndex) => {
        return state.Exchange.getoimovers[priceDataIndex];
      }),
  };
};
export default connect(
  mapStateToProps,
  {
    getmoveDate,
    changeScroller,
    addClicked,
    tableData,
    confirmationModal1,
    testing,
  }
)(NetMovement);
