import React, { Component } from "react";
import AnyChart from "anychart-react";
import anychart from "anychart";
import { connect } from "react-redux";
import {
  getmoveDate,
  changeScroller,
  addClicked,
  tableData,
} from "appRedux/actions/Exchange";
import PropTypes from "prop-types";
import { Row, Col, Tabs, Modal, Button } from "antd";
import Widget from "components/Widget";
import isEqual from "lodash/isEqual";
var common_colors = require("../../../assets/theme-variable");
var theme = localStorage.getItem("theme");
var bgcolor = common_colors.default_main_color;
if (theme == "coffee") {
  anychart.theme(anychart.themes.coffee);
  bgcolor = common_colors.coffee_main_color;
}
const TabPane = Tabs.TabPane;
class PriceperTickerMin extends Component {
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
      nextProps.oiperticker &&
      !isEqual(nextProps.oiperticker, this.props.oiperticker)
    ) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    var palette = anychart.palettes.defaultPalette;
    if (theme == "coffee") {
      anychart.theme(anychart.themes.coffee);
      palette = anychart.palettes.coffee;
    }
    var year20 = "";
    var year10 = "";
    var year5 = "";
    var year3 = "";
    var year1 = "";
    var month6 = "";
    var newvar = <div></div>;
    var newvar1 = <div></div>;
    var newvar2 = <div></div>;
    var newvar3 = <div></div>;
    var newvar4 = <div></div>;
    var newvar5 = <div></div>;
    var legends1 = <div></div>;
    var legends2 = <div></div>;
    var legends3 = <div></div>;
    var legends4 = <div></div>;
    var legends5 = <div></div>;
    var legends6 = <div></div>;
    if (this.props.oiperticker != "") {
      //   if(this.props.nzlc[0].length > 0){

      var bulletchart;
      var linechart;
      var j = 1;

      year20 = this.props.oiperticker.year20price_low;
      year10 = this.props.oiperticker.year10price_low;
      year5 = this.props.oiperticker.year5price_low;
      year3 = this.props.oiperticker.year3price_low;
      year1 = this.props.oiperticker.year1price_low;
      // month6=this.props.oiperticker.month6price_low;
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
                iconTextSpacing: "1px",
                // 'iconType': 'area',
                iconStroke: "none",
                iconFill: palette[0],
              },

              {
                index: 2,
                text: "Mean",
                // 'iconType': 'area',
                iconTextSpacing: "1px",
                iconStroke: "none",
                iconFill: "black",
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
                id={"legend17"}
                width="100%"
                height={30}
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

              {
                index: 2,
                text: "Mean",
                // 'iconType': 'area',
                iconTextSpacing: "1px",
                iconStroke: "none",
                iconFill: "black",
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
                id={"legend18"}
                width="100%"
                height={30}
                instance={stage}
                charts={[legend]}
              />
            );
          })}
        </div>
      );
      legends3 = (
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

              {
                index: 2,
                text: "Mean",
                // 'iconType': 'area',
                iconTextSpacing: "1px",
                iconStroke: "none",
                iconFill: "black",
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
                id={"legend19"}
                width="100%"
                height={30}
                instance={stage}
                charts={[legend]}
              />
            );
          })}
        </div>
      );
      legends4 = (
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

              {
                index: 2,
                text: "Mean",
                // 'iconType': 'area',
                iconTextSpacing: "1px",
                iconStroke: "none",
                iconFill: "black",
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
                id={"legend20"}
                width="100%"
                height={30}
                instance={stage}
                charts={[legend]}
              />
            );
          })}
        </div>
      );
      legends5 = (
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

              {
                index: 2,
                text: "Mean",
                // 'iconType': 'area',
                iconTextSpacing: "1px",
                iconStroke: "none",
                iconFill: "black",
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
                id={"legend21"}
                width="100%"
                height={30}
                instance={stage}
                charts={[legend]}
              />
            );
          })}
        </div>
      );
      legends6 = (
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

              {
                index: 2,
                text: "Mean",
                // 'iconType': 'area',
                iconTextSpacing: "1px",
                iconStroke: "none",
                iconFill: "black",
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
                id={"legend22"}
                width="100%"
                height={30}
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
            <Col lg={2}>
              <span>
                <strong>Code</strong>
              </span>
            </Col>
            <Col lg={6}>
              <span>
                <strong>Ticker</strong>
              </span>
            </Col>
            <Col lg={12}>
              <span>
                <strong>Comparison Bars</strong>
              </span>
            </Col>
            <Col lg={4}>
              <span>
                <strong>M.I.(%)</strong>
              </span>
            </Col>
          </Row>
          {Object.keys(year20).map((key) => {
            var overall_diff = year20[key]["max"] - year20[key]["min"];
            var close_diff = year20[key]["max"] - year20[key]["currentPrice"];
            var median_diff = year20[key]["max"] - year20[key]["median"];
            var mean_diff = year20[key]["max"] - year20[key]["mean"];
            var value = 100 - (close_diff * 100) / overall_diff;
            var median = 100 - (median_diff * 100) / overall_diff;
            var mean = 100 - (mean_diff * 100) / overall_diff;
            //   year20[key]['median'];
            bulletchart = anychart.bullet([
              {
                value: value,
                type: "bar",
                gap: 0.7,
                fill: palette[0],
                stroke: null,
              },

              {
                value: mean,
                type: "line",
                gap: 0.1,
                fill: "black",
                stroke: {
                  thickness: 0.5,
                  color: "black",
                },
              },
              // {value: value}
            ]);

            bulletchart
              .range(0)
              .from(0)
              .to(mean);
            bulletchart
              .range(2)
              .from(mean)
              .to(100);

            bulletchart.background().fill("#FFFFFF 0");
            bulletchart.bounds(0, 0, "100%", 125);

            // console.log('asplprice',year20[key]['pricedata'])

            return (
              <div>
                <Row className="custom_main_chart">
                  <Col lg={2}>
                    <span
                      className="cust-ticker-hover"
                      onClick={() => this.OpenModal(key)}
                    >
                      {key}
                    </span>
                  </Col>
                  <Col lg={6}>
                    <span>{year20[key]["name"]}</span>
                  </Col>
                  <Col lg={12}>
                    <AnyChart
                      id={"year20_price_low" + j++}
                      width="100%"
                      height={25}
                      instance={bulletchart}
                    />
                  </Col>
                  <Col lg={4}>
                    <span>{year20[key]["index"] + "%"}</span>
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
      );
      newvar1 = (
        <div className="cust_bullet_chart">
          <Row className="custom_main_chart_title cust-hass-font">
            <Col lg={2}>
              <span>
                <strong>Code</strong>
              </span>
            </Col>
            <Col lg={6}>
              <span>
                <strong>Ticker</strong>
              </span>
            </Col>
            <Col lg={12}>
              <span>
                <strong>Comparison Bars</strong>
              </span>
            </Col>
            <Col lg={4}>
              <span>
                <strong>M.I.(%)</strong>
              </span>
            </Col>
          </Row>
          {Object.keys(year10).map((key) => {
            var overall_diff = year10[key]["max"] - year10[key]["min"];
            var close_diff = year10[key]["max"] - year10[key]["currentPrice"];
            var median_diff = year10[key]["max"] - year10[key]["median"];
            var mean_diff = year10[key]["max"] - year10[key]["mean"];
            var value = 100 - (close_diff * 100) / overall_diff;
            var median = 100 - (median_diff * 100) / overall_diff;
            var mean = 100 - (mean_diff * 100) / overall_diff;
            //   year10[key]['median'];
            bulletchart = anychart.bullet([
              {
                value: value,
                type: "bar",
                gap: 0.7,
                fill: palette[0],
                stroke: null,
              },

              {
                value: mean,
                type: "line",
                gap: 0.1,
                fill: "black",
                stroke: {
                  thickness: 0.5,
                  color: "black",
                },
              },
              // {value: value}
            ]);

            bulletchart
              .range(0)
              .from(0)
              .to(mean);
            //  bulletchart.range(1).from(mean).to(median);
            bulletchart
              .range(2)
              .from(mean)
              .to(100);

            bulletchart.background().fill("#FFFFFF 0");
            // Set bulletchart size and position settings
            bulletchart.bounds(0, 0, "100%", 125);

            // console.log('asplprice',year10[key]['pricedata'])

            return (
              <div>
                <Row className="custom_main_chart">
                  <Col lg={2}>
                    <span
                      className="cust-ticker-hover"
                      onClick={() => this.OpenModal(key)}
                    >
                      {key}
                    </span>
                  </Col>
                  <Col lg={6}>
                    <span>{year10[key]["name"]}</span>
                  </Col>
                  <Col lg={12}>
                    <AnyChart
                      id={"year10_price_low" + j++}
                      width="100%"
                      height={25}
                      instance={bulletchart}
                    />
                  </Col>
                  <Col lg={4}>
                    <span>{year10[key]["index"] + "%"}</span>
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
      );
      newvar2 = (
        <div className="cust_bullet_chart">
          <Row className="custom_main_chart_title cust-hass-font">
            <Col lg={2}>
              <span>
                <strong>Code</strong>
              </span>
            </Col>
            <Col lg={6}>
              <span>
                <strong>Ticker</strong>
              </span>
            </Col>
            <Col lg={12}>
              <span>
                <strong>Comparison Bars</strong>
              </span>
            </Col>
            <Col lg={4}>
              <span>
                <strong>M.I.(%)</strong>
              </span>
            </Col>
          </Row>
          {Object.keys(year5).map((key) => {
            var overall_diff = year5[key]["max"] - year5[key]["min"];
            var close_diff = year5[key]["max"] - year5[key]["currentPrice"];
            var median_diff = year5[key]["max"] - year5[key]["median"];
            var mean_diff = year5[key]["max"] - year5[key]["mean"];
            var value = 100 - (close_diff * 100) / overall_diff;
            var median = 100 - (median_diff * 100) / overall_diff;
            var mean = 100 - (mean_diff * 100) / overall_diff;
            //   year5[key]['median'];
            bulletchart = anychart.bullet([
              {
                value: value,
                type: "bar",
                gap: 0.7,
                fill: palette[0],
                stroke: null,
              },

              {
                value: mean,
                type: "line",
                gap: 0.1,
                fill: "black",
                stroke: {
                  thickness: 0.5,
                  color: "black",
                },
              },
              // {value: value}
            ]);

            bulletchart
              .range(0)
              .from(0)
              .to(mean);
            //  bulletchart.range(1).from(mean).to(median);
            bulletchart
              .range(2)
              .from(mean)
              .to(100);

            bulletchart.background().fill("#FFFFFF 0");
            // Set bulletchart size and position settings
            bulletchart.bounds(0, 0, "100%", 125);

            // console.log('asplprice',year5[key]['pricedata'])

            return (
              <div>
                <Row className="custom_main_chart">
                  <Col lg={2}>
                    <span
                      className="cust-ticker-hover"
                      onClick={() => this.OpenModal(key)}
                    >
                      {key}
                    </span>
                  </Col>
                  <Col lg={6}>
                    <span>{year5[key]["name"]}</span>
                  </Col>
                  <Col lg={12}>
                    <AnyChart
                      id={"year5_price_low" + j++}
                      width="100%"
                      height={25}
                      instance={bulletchart}
                    />
                  </Col>
                  <Col lg={4}>
                    <span>{year5[key]["index"] + "%"}</span>
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
      );
      newvar3 = (
        <div className="cust_bullet_chart">
          <Row className="custom_main_chart_title cust-hass-font">
            <Col lg={2}>
              <span>
                <strong>Code</strong>
              </span>
            </Col>
            <Col lg={6}>
              <span>
                <strong>Ticker</strong>
              </span>
            </Col>
            <Col lg={12}>
              <span>
                <strong>Comparison Bars</strong>
              </span>
            </Col>
            <Col lg={4}>
              <span>
                <strong>M.I.(%)</strong>
              </span>
            </Col>
          </Row>
          {Object.keys(year3).map((key) => {
            var overall_diff = year3[key]["max"] - year3[key]["min"];
            var close_diff = year3[key]["max"] - year3[key]["currentPrice"];
            var median_diff = year3[key]["max"] - year3[key]["median"];
            var mean_diff = year3[key]["max"] - year3[key]["mean"];
            var value = 100 - (close_diff * 100) / overall_diff;
            var median = 100 - (median_diff * 100) / overall_diff;
            var mean = 100 - (mean_diff * 100) / overall_diff;
            //   year3[key]['median'];
            bulletchart = anychart.bullet([
              {
                value: value,
                type: "bar",
                gap: 0.7,
                fill: palette[0],
                stroke: null,
              },

              {
                value: mean,
                type: "line",
                gap: 0.1,
                fill: "black",
                stroke: {
                  thickness: 0.5,
                  color: "black",
                },
              },
              // {value: value}
            ]);

            bulletchart
              .range(0)
              .from(0)
              .to(mean);
            //  bulletchart.range(1).from(mean).to(median);
            bulletchart
              .range(2)
              .from(mean)
              .to(100);

            bulletchart.background().fill("#FFFFFF 0");
            // Set bulletchart size and position settings
            bulletchart.bounds(0, 0, "100%", 125);

            return (
              <div>
                <Row className="custom_main_chart">
                  <Col lg={2}>
                    <span
                      className="cust-ticker-hover"
                      onClick={() => this.OpenModal(key)}
                    >
                      {key}
                    </span>
                  </Col>
                  <Col lg={6}>
                    <span>{year3[key]["name"]}</span>
                  </Col>
                  <Col lg={12}>
                    <AnyChart
                      id={"year3_price_low" + j++}
                      width="100%"
                      height={25}
                      instance={bulletchart}
                    />
                  </Col>
                  <Col lg={4}>
                    <span>{year3[key]["index"] + "%"}</span>
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
      );

      newvar4 = (
        <div className="cust_bullet_chart">
          <Row className="custom_main_chart_title cust-hass-font ">
            <Col lg={2}>
              <span>
                <strong>Code</strong>
              </span>
            </Col>
            <Col lg={6}>
              <span>
                <strong>Ticker</strong>
              </span>
            </Col>
            <Col lg={12}>
              <span>
                <strong>Comparison Bars</strong>
              </span>
            </Col>
            <Col lg={4}>
              <span>
                <strong>M.I.(%)</strong>
              </span>
            </Col>
          </Row>
          {Object.keys(year1).map((key) => {
            var overall_diff = year1[key]["max"] - year1[key]["min"];
            var close_diff = year1[key]["max"] - year1[key]["currentPrice"];
            var median_diff = year1[key]["max"] - year1[key]["median"];
            var mean_diff = year1[key]["max"] - year1[key]["mean"];
            var value = 100 - (close_diff * 100) / overall_diff;
            var median = 100 - (median_diff * 100) / overall_diff;
            var mean = 100 - (mean_diff * 100) / overall_diff;
            //   year1[key]['median'];
            bulletchart = anychart.bullet([
              {
                value: value,
                type: "bar",
                gap: 0.7,
                fill: palette[0],
                stroke: null,
              },

              {
                value: mean,
                type: "line",
                gap: 0.1,
                fill: "black",
                stroke: {
                  thickness: 0.5,
                  color: "black",
                },
              },
              // {value: value}
            ]);

            bulletchart
              .range(0)
              .from(0)
              .to(mean);
            //  bulletchart.range(1).from(mean).to(median);
            bulletchart
              .range(2)
              .from(mean)
              .to(100);

            bulletchart.background().fill("#FFFFFF 0");
            // Set bulletchart size and position settings
            bulletchart.bounds(0, 0, "100%", 125);
            return (
              <div>
                <Row className="custom_main_chart">
                  <Col lg={2}>
                    <span
                      className="cust-ticker-hover"
                      onClick={() => this.OpenModal(key)}
                    >
                      {key}
                    </span>
                  </Col>
                  <Col lg={6}>
                    <span>{year1[key]["name"]}</span>
                  </Col>
                  <Col lg={12}>
                    <AnyChart
                      id={"year1_price_low" + j++}
                      width="100%"
                      height={25}
                      instance={bulletchart}
                    />
                  </Col>
                  <Col lg={4}>
                    <span>{year1[key]["index"] + "%"}</span>
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
      );
      // newvar5 = <div className="cust_bullet_chart">
      // <Row className="custom_main_chart_title cust-hass-font ">

      //     <Col lg={2}>
      //       <span><strong>Code</strong></span>
      //     </Col>
      //     <Col lg={6}>
      //       <span><strong>Ticker</strong></span>
      //     </Col>
      //     <Col lg={12}>
      //       <span><strong>Comparison Bars</strong></span>
      //     </Col>
      //     <Col lg={4}>
      //       <span><strong>M.I.(%)</strong></span>
      //     </Col>
      // </Row>
      // {
      //   Object.keys(month6).map((key)=>{
      //   var overall_diff = parseFloat(month6[key]['max']) - parseFloat(month6[key]['min']);
      //   var close_diff = parseFloat(month6[key]['max']) - parseFloat(month6[key]['currentPrice']);
      //   var median_diff = parseFloat(month6[key]['max']) - parseFloat(month6[key]['median']);
      //   var mean_diff = parseFloat(month6[key]['max']) - parseFloat(month6[key]['mean']);
      //   var value = 100-((close_diff*100)/overall_diff);
      //   var median = 100-((median_diff*100)/overall_diff);
      //   var mean = 100-((mean_diff*100)/overall_diff);
      // //   month6[key]['median'];
      //   bulletchart = anychart.bullet([
      //     {
      //       value: value,
      //       type: 'bar',
      //       gap: 0.7,
      //       fill: palette[0],
      //       stroke: null
      //     },

      //     {
      //         value: mean,
      //         type: 'line',
      //         gap: 0.1,
      //         fill: 'black',
      //         stroke: {
      //             thickness: 0.5,
      //             color: 'black'
      //         }
      //       }
      //     // {value: value}
      //   ]);

      //     bulletchart.range(0).from(0).to(mean);
      //   //  bulletchart.range(1).from(mean).to(median);
      //     bulletchart.range(2).from(mean).to(100);

      //   bulletchart.background().fill("#FFFFFF 0");
      //   // Set bulletchart size and position settings
      //   bulletchart.bounds(0, 0, "100%", 125);
      //   return(
      //     <div>
      //         <Row className="custom_main_chart">

      //             <Col lg={2}>
      //                 <span className="cust-ticker-hover" onClick={()=>this.OpenModal(key)}>{key}</span>
      //             </Col>
      //             <Col lg={6}>
      //                 <span>{month6[key]['name']}</span>
      //             </Col>
      //             <Col lg={12}>
      //             <AnyChart
      //                 id={'month6_price_low'+j++}
      //                 width="100%"
      //                 height={25}
      //                 instance={bulletchart}
      //             />
      //             </Col>
      //             <Col lg={4}>
      //             <span>{month6[key]['index']+'%'}</span>
      //             </Col>
      //         </Row>
      //     </div>
      //   )
      // })
      // }
      // </div>
    }
    return (
      <div
        style={{ width: "100%" }}
        className="cust_bullet_chart cust_ecin_div cust-tab-font sub_tab"
      >
        <Widget title="" styleName="sector_tabs gx-card-tabs">
          <Tabs defaultActiveKey="1">
            <TabPane tab="6 Months" key="1" className="">
              {month6 != "" || Object.keys(month6).length > 0 ? (
                <span>
                  {legends6}
                  {newvar5}
                </span>
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
            </TabPane>
            <TabPane tab="1 Year" key="2" className="">
              {year1 != "" || Object.keys(year1).length > 0 ? (
                <span>
                  {legends5}
                  {newvar4}
                </span>
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
            </TabPane>
            <TabPane tab="3 Years" key="3" className="">
              {year3 != "" || Object.keys(year3).length > 0 ? (
                <span>
                  {legends4}
                  {newvar3}
                </span>
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
            </TabPane>
            <TabPane tab="5 Years" key="4" className="">
              {year5 != "" || Object.keys(year5).length > 0 ? (
                <span>
                  {legends3}
                  {newvar2}
                </span>
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
            </TabPane>
            <TabPane tab="10 Years" key="5" className="">
              {year10 != "" || Object.keys(year10).length > 0 ? (
                <span>
                  {legends2}
                  {newvar1}
                </span>
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
            </TabPane>
            <TabPane tab="20 years" key="6" className="">
              {year20 != "" || Object.keys(year20).length > 0 ? (
                <span>
                  {legends1}
                  {newvar}
                </span>
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
            </TabPane>
          </Tabs>
        </Widget>
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
    oiperticker: state.Exchange.getoiperticker,
  };
};
export default connect(
  mapStateToProps,
  { getmoveDate, changeScroller, addClicked, tableData }
)(PriceperTickerMin);
