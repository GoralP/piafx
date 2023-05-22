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
    // axis.parentBounds(anychart.math.rect(50, 50, 400, 300));
    axis.parentBounds("0%", "0%", "100%", "100%");
    axis.title(null);

    var scale = anychart.scales.linear();
    scale.minimum(minimum).maximum(maximum);
    scale.ticks().interval(interval);

    // axis.parentBounds(50, 50, 400, 300);

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
      .format("{%Value}%");
    axis.minorTicks(null);

    return (
      <AnyChart
        id={"pricescalemeter_" + id}
        width="100%"
        height={40}
        key={"pricescalemeter_" + id}
        instance={stage}
        charts={[axis]}
      />
    );
  }
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.gettoppricemovers &&
      !isEqual(nextProps.gettoppricemovers, this.props.gettoppricemovers)
    ) {
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
    var tickerarray = [];
    var palette = anychart.palettes.defaultPalette;
    if (theme == "coffee") {
      anychart.theme(anychart.themes.coffee);
      palette = anychart.palettes.coffee;
    }
    if (this.props.gettoppricemovers.length > 0) {
      // if(this.props.topnet[0].length > 0){

      var bulletchart;
      var linechart;
      var j = 1;
      var scalearray = [];
      var scalearray2 = [];
      var maximum;
      var minimum;
      var title_date = this.props.gettoppricemovers[0].date;
      // topcom = JSON.parse(this.props.topnet[0].com);
      // topnoncom = JSON.parse(this.props.topnet[0].noncom);
      tickerarray = JSON.parse(this.props.gettoppricemovers[0].tickerarray);
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
                id={"legend29"}
                width="100%"
                height={30}
                key={"legend29"}
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
          {Object.keys(tickerarray).map((key) => {
            if (tickerarray[key]["value"] < 1000) {
              scalearray.push(tickerarray[key]["value"]);
            }
            // return(
            //     <td align="center">{tickerarray[key]['value']}</td>
            // )
          })}

          {Object.keys(tickerarray).map((key) => {
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
            var value = tickerarray[key]["value"];
            if (value > 10 || value < -10) {
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
            bulletscale = this.createBulletScale(
              parseInt(minimum),
              parseInt(maximum),
              parseInt(maximum / 2),
              1
            );
            // console.log('asplbullet',bulletscale);
            return (
              <div key={"pricemoversothers" + j++}>
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
                      onClick={() => this.OpenModal(key)}
                    >
                      {key}
                    </span>
                  </Col>
                  <Col lg={6}>
                    <span>{tickerarray[key]["name"]}</span>
                  </Col>
                  <Col lg={14}>
                    <AnyChart
                      id={"pricemovers_" + j++}
                      width="100%"
                      height={20}
                      key={"pricemovers_" + j++}
                      instance={bulletchart}
                    />
                  </Col>
                  <Col lg={2}>
                    <span>{tickerarray[key]["value"] + "%"}</span>
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
    }
    return (
      <div
        style={{ width: "100%" }}
        className="cust_bullet_chart cust_ecin_div cust-tab-font "
      >
        <span className="cust_desciption cust-hass-font">
          Price Daily Movers on day {title_date}
        </span>
        <div className="cust_price_chart">
          {tickerarray.length > 0 || Object.keys(tickerarray).length > 0 ? (
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
                  <img alt="" src={require("assets/images/emptyWhite.png")} />
                )}
                <br />
                <span className="nodata_title">No Data</span>
              </div>
            </div>
          )}
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
    gettoppricemovers: Object.keys(state.Exchange.pricesection)
      .filter((priceDataIndex) => priceDataIndex == "top_price_movers")
      .map((priceDataIndex) => {
        return state.Exchange.pricesection[priceDataIndex];
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
