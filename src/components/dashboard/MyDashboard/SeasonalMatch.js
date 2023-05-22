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
  confirmationModal1,
  testing,
} from "appRedux/actions/Exchange";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Popover, Switch, Slider, Row, Col, Tabs, Modal, Button } from "antd";
import Widget from "components/Widget";
import PropTypes from "prop-types";
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

class SeasonalMatch extends Component {
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
        id={"amscalemeter_" + id}
        width="100%"
        height={40}
        key={"amscalemeter_" + id}
        instance={stage}
        charts={[axis]}
      />
    );
  }

  render() {
    var positive5 = [];
    var positive10 = [];
    var positive15 = [];
    var positive20 = [];
    var negative5 = [];
    var negative10 = [];
    var negative15 = [];
    var negative20 = [];
    var newvar5 = <div></div>;
    var newvar10 = <div></div>;
    var newvar15 = <div></div>;
    var newvar20 = <div></div>;
    var bulletscale5 = <div></div>;
    var bulletscale10 = <div></div>;
    var bulletscale15 = <div></div>;
    var bulletscale20 = <div></div>;
    var legends1 = <div></div>;
    var legends2 = <div></div>;
    var title_date = "";
    var palette = anychart.palettes.defaultPalette;
    if (theme == "coffee") {
      anychart.theme(anychart.themes.coffee);
      palette = anychart.palettes.coffee;
    }
    if (this.props.SM.length > 0) {
      // if(this.props.SM[0].length > 0){

      var bulletchart;
      var linechart;
      var j = 1;
      var scalearray = [];
      var scalearray2 = [];
      var maximum;
      var minimum;
      positive5 = JSON.parse(this.props.SM[0].positive5);
      positive10 = JSON.parse(this.props.SM[0].positive10);
      positive15 = JSON.parse(this.props.SM[0].positive15);
      positive20 = JSON.parse(this.props.SM[0].positive20);
      negative5 = JSON.parse(this.props.SM[0].negative5);
      negative10 = JSON.parse(this.props.SM[0].negative10);
      negative15 = JSON.parse(this.props.SM[0].negative15);
      negative20 = JSON.parse(this.props.SM[0].negative20);
      // console.log('asplaspl',positive5);
      var title_date = this.props.SM[0].date;
      // var r = [];
      //   r[0] = 1
      //   legends1 =<div>
      //   {
      //     r.map((key)=>{
      //       var stage = anychart.graphics.create();
      //       var legend = anychart.standalones.legend();
      //       var items= [
      //         {
      //             'index': 0,
      //             'text': 'Extreme value - Not in scale',
      //             // 'iconType': 'area',
      //             'iconStroke': 'none',
      //             'iconFill': '#cf4140'
      //         },
      //     ]
      //       legend.fontSize('14px')
      //       .fontFamily("'Verdana', Helvetica, Arial, sans-serif")
      //       .itemsLayout('horizontal')
      //       .fontColor('#7c8482')
      //       .iconTextSpacing(0)
      //       .align('right')
      //       .position('center-bottom')
      //       .padding(0)
      //       .margin(0, 0, 7, 0)
      //       .itemsSpacing(3)
      //       .title(false)
      //       .titleSeparator(false)
      //       .paginator(false)
      //       .background(false)
      //       .items(items);
      //       return(
      //         <AnyChart
      //                 id={'twlegend3'}
      //                 width="100%"
      //                 height={30}
      //                 instance={stage}
      //                 charts={[legend]}
      //         />
      //       );
      //     })
      //   }
      // </div>
      //     legends2 =<div>
      //     {
      //       r.map((key)=>{
      //         var stage = anychart.graphics.create();
      //         var legend = anychart.standalones.legend();
      //         var items= [
      //           {
      //               'index': 0,
      //               'text': 'Extreme value - Not in scale',
      //               // 'iconType': 'area',
      //               'iconStroke': 'none',
      //               'iconFill': '#cf4140'
      //           },

      //       ]
      //         legend.fontSize('14px')
      //         .fontFamily("'Verdana', Helvetica, Arial, sans-serif")
      //         .itemsLayout('horizontal')
      //         .fontColor('#7c8482')
      //         .iconTextSpacing(0)
      //         .align('right')
      //         .position('center-bottom')
      //         .padding(0)
      //         .margin(0, 0, 7, 0)
      //         .itemsSpacing(3)
      //         .title(false)
      //         .titleSeparator(false)
      //         .paginator(false)
      //         .background(false)
      //         .items(items);
      //         return(
      //           <AnyChart
      //                   id={'legend4'}
      //                   width="100%"
      //                   height={30}
      //                   instance={stage}
      //                   charts={[legend]}
      //           />
      //         );
      //       })
      //     }
      //   </div>
      newvar5 = (
        <div className="cust_bullet_chart">
          <Row className="custom_main_chart_title cust-hass-font">
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
          {Object.keys(positive5).map((key) => {
            maximum = 100;
            minimum = -100;

            var value = positive5[key]["value"];
            if (value > 1000 || value < -1000) {
              var color = "#cf4140";
            } else {
              var color = palette[0];
            }

            //   if(positive5[key]['value']<0)
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
            ]);

            bulletchart
              .scale()
              .minimum(-100)
              .maximum(100);
            bulletchart
              .range()
              .from(0)
              .to(100);
            bulletchart.background().fill("#FFFFFF 0");
            bulletchart.tooltip().enabled(true);
            // Set bulletchart size and position settings
            bulletchart.bounds(0, 0, "100%", 125);
            bulletscale5 = this.createBulletScale(
              parseInt(minimum),
              parseInt(maximum),
              parseInt(maximum / 2),
              1
            );
            // console.log('asplbullet',bulletscale);
            return (
              <div key={"div_" + positive5[key]["name"]}>
                <Row className="custom_main_chart">
                  <Col lg={2}>
                    <span
                      className="cust-ticker-hover"
                      onClick={() => this.OpenModal(positive5[key]["key"])}
                    >
                      {positive5[key]["key"]}
                    </span>
                  </Col>
                  <Col lg={6}>
                    <span>{positive5[key]["name"]}</span>
                  </Col>
                  <Col lg={14}>
                    <AnyChart
                      id={"seasonalmatch5_" + j++}
                      width="100%"
                      height={20}
                      key={"seasonalmatch5_" + j++}
                      instance={bulletchart}
                    />
                  </Col>
                  <Col lg={2}>
                    <span>{positive5[key]["value"] + "%"}</span>
                  </Col>
                </Row>
                {/* {bulletscale} */}
              </div>
            );
            // }
            // else{j++}
          })}
          {Object.keys(negative5).map((key) => {
            maximum = 100;
            minimum = -100;
            var value = negative5[key]["value"];
            if (value > 1000 || value < -1000) {
              var color = "#cf4140";
            } else {
              var color = palette[0];
            }
            bulletchart = anychart.bullet([
              {
                value: 100,
                type: "bar",
                gap: 0.1,
                fill: bgcolor,
                stroke: { color: bgcolor },
              },
              {
                value: (100 - value) * -1,
                type: "bar",
                gap: 0.1,
                fill: color,
                stroke: null,
              },
            ]);
            bulletchart
              .scale()
              .minimum(-100)
              .maximum(100);
            bulletchart
              .range()
              .from(0)
              .to(100);
            bulletchart.background().fill("#FFFFFF 0");
            bulletchart.tooltip().enabled(true);
            // Set bulletchart size and position settings
            bulletchart.bounds(0, 0, "100%", 125);
            bulletscale5 = this.createBulletScale(
              parseInt(minimum),
              parseInt(maximum),
              parseInt(maximum / 2),
              1
            );
            // console.log('asplbullet',bulletscale);
            return (
              <div key={"divone_" + negative5[key]["name"]}>
                <Row className="custom_main_chart">
                  <Col lg={2}>
                    <span
                      className="cust-ticker-hover"
                      onClick={() => this.OpenModal(negative5[key]["key"])}
                    >
                      {negative5[key]["key"]}
                    </span>
                  </Col>
                  <Col lg={6}>
                    <span>{negative5[key]["name"]}</span>
                  </Col>
                  <Col lg={14}>
                    <AnyChart
                      id={"seasonalmatch5_" + j++}
                      width="100%"
                      height={20}
                      key={"seasonalmatch5_" + j++}
                      instance={bulletchart}
                    />
                  </Col>
                  <Col lg={2}>
                    <span>{negative5[key]["value"] + "%"}</span>
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
      );

      newvar10 = (
        <div className="cust_bullet_chart">
          <Row className="custom_main_chart_title cust-hass-font">
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
          {Object.keys(positive10).map((key) => {
            maximum = 100;
            minimum = -100;

            var value = positive10[key]["value"];
            if (value > 1000 || value < -1000) {
              var color = "#cf4140";
            } else {
              var color = palette[0];
            }

            //   if(positive5[key]['value']<0)
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
            ]);

            bulletchart
              .scale()
              .minimum(-100)
              .maximum(100);
            bulletchart
              .range()
              .from(0)
              .to(100);
            bulletchart.background().fill("#FFFFFF 0");
            bulletchart.tooltip().enabled(true);
            // Set bulletchart size and position settings
            bulletchart.bounds(0, 0, "100%", 125);
            bulletscale10 = this.createBulletScale(
              parseInt(minimum),
              parseInt(maximum),
              parseInt(maximum / 2),
              2
            );
            // console.log('asplbullet',bulletscale);
            return (
              <div key={"divtwo_" + positive10[key]["name"]}>
                <Row className="custom_main_chart">
                  <Col lg={2}>
                    <span
                      className="cust-ticker-hover"
                      onClick={() => this.OpenModal(positive10[key]["key"])}
                    >
                      {positive10[key]["key"]}
                    </span>
                  </Col>
                  <Col lg={6}>
                    <span>{positive10[key]["name"]}</span>
                  </Col>
                  <Col lg={14}>
                    <AnyChart
                      id={"seasonalmatch10_" + j++}
                      width="100%"
                      height={20}
                      key={"seasonalmatch10_" + j++}
                      instance={bulletchart}
                    />
                  </Col>
                  <Col lg={2}>
                    <span>{positive10[key]["value"] + "%"}</span>
                  </Col>
                </Row>
                {/* {bulletscale} */}
              </div>
            );
            // }
            // else{j++}
          })}
          {Object.keys(negative10).map((key) => {
            maximum = 100;
            minimum = -100;
            var value = negative10[key]["value"];
            if (value > 1000 || value < -1000) {
              var color = "#cf4140";
            } else {
              var color = palette[0];
            }
            bulletchart = anychart.bullet([
              {
                value: 100,
                type: "bar",
                gap: 0.1,
                fill: bgcolor,
                stroke: { color: bgcolor },
              },
              {
                value: (100 - value) * -1,
                type: "bar",
                gap: 0.1,
                fill: color,
                stroke: null,
              },
            ]);
            bulletchart
              .scale()
              .minimum(-100)
              .maximum(100);
            bulletchart
              .range()
              .from(0)
              .to(100);
            bulletchart.background().fill("#FFFFFF 0");
            bulletchart.tooltip().enabled(true);
            // Set bulletchart size and position settings
            bulletchart.bounds(0, 0, "100%", 125);
            bulletscale10 = this.createBulletScale(
              parseInt(minimum),
              parseInt(maximum),
              parseInt(maximum / 2),
              2
            );
            // console.log('asplbullet',bulletscale);
            return (
              <div key={"divthree_" + negative10[key]["name"]}>
                <Row className="custom_main_chart">
                  <Col lg={2}>
                    <span
                      className="cust-ticker-hover"
                      onClick={() => this.OpenModal(negative10[key]["key"])}
                    >
                      {negative10[key]["key"]}
                    </span>
                  </Col>
                  <Col lg={6}>
                    <span>{negative10[key]["name"]}</span>
                  </Col>
                  <Col lg={14}>
                    <AnyChart
                      id={"seasonalmatch10_" + j++}
                      width="100%"
                      height={20}
                      key={"seasonalmatch10_" + j++}
                      instance={bulletchart}
                    />
                  </Col>
                  <Col lg={2}>
                    <span>{negative10[key]["value"] + "%"}</span>
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
      );

      newvar15 = (
        <div className="cust_bullet_chart">
          <Row className="custom_main_chart_title cust-hass-font">
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
          {Object.keys(positive15).map((key) => {
            maximum = 100;
            minimum = -100;

            var value = positive15[key]["value"];
            if (value > 1000 || value < -1000) {
              var color = "#cf4140";
            } else {
              var color = palette[0];
            }

            //   if(positive5[key]['value']<0)
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
            ]);

            bulletchart
              .scale()
              .minimum(-100)
              .maximum(100);
            bulletchart
              .range()
              .from(0)
              .to(100);
            bulletchart.background().fill("#FFFFFF 0");
            bulletchart.tooltip().enabled(true);
            // Set bulletchart size and position settings
            bulletchart.bounds(0, 0, "100%", 125);
            bulletscale15 = this.createBulletScale(
              parseInt(minimum),
              parseInt(maximum),
              parseInt(maximum / 2),
              3
            );
            // console.log('asplbullet',bulletscale);
            return (
              <div key={"divfour_" + positive15[key]["name"]}>
                <Row className="custom_main_chart">
                  <Col lg={2}>
                    <span
                      className="cust-ticker-hover"
                      onClick={() => this.OpenModal(positive15[key]["key"])}
                    >
                      {positive15[key]["key"]}
                    </span>
                  </Col>
                  <Col lg={6}>
                    <span>{positive15[key]["name"]}</span>
                  </Col>
                  <Col lg={14}>
                    <AnyChart
                      id={"seasonalmatch15_" + j++}
                      width="100%"
                      height={20}
                      key={"seasonalmatch15_" + j++}
                      instance={bulletchart}
                    />
                  </Col>
                  <Col lg={2}>
                    <span>{positive15[key]["value"] + "%"}</span>
                  </Col>
                </Row>
                {/* {bulletscale} */}
              </div>
            );
            // }
            // else{j++}
          })}
          {Object.keys(negative15).map((key) => {
            maximum = 100;
            minimum = -100;
            var value = negative15[key]["value"];
            if (value > 1000 || value < -1000) {
              var color = "#cf4140";
            } else {
              var color = palette[0];
            }
            bulletchart = anychart.bullet([
              {
                value: 100,
                type: "bar",
                gap: 0.1,
                fill: bgcolor,
                stroke: { color: bgcolor },
              },
              {
                value: (100 - value) * -1,
                type: "bar",
                gap: 0.1,
                fill: color,
                stroke: null,
              },
            ]);
            bulletchart
              .scale()
              .minimum(-100)
              .maximum(100);
            bulletchart
              .range()
              .from(0)
              .to(100);
            bulletchart.background().fill("#FFFFFF 0");
            bulletchart.tooltip().enabled(true);
            // Set bulletchart size and position settings
            bulletchart.bounds(0, 0, "100%", 125);
            bulletscale15 = this.createBulletScale(
              parseInt(minimum),
              parseInt(maximum),
              parseInt(maximum / 2),
              3
            );
            // console.log('asplbullet',bulletscale);
            return (
              <div key={"divfive_" + negative15[key]["name"]}>
                <Row className="custom_main_chart">
                  <Col lg={2}>
                    <span
                      className="cust-ticker-hover"
                      onClick={() => this.OpenModal(negative15[key]["key"])}
                    >
                      {negative15[key]["key"]}
                    </span>
                  </Col>
                  <Col lg={6}>
                    <span>{negative15[key]["name"]}</span>
                  </Col>
                  <Col lg={14}>
                    <AnyChart
                      id={"seasonalmatch15_" + j++}
                      width="100%"
                      height={20}
                      key={"seasonalmatch15_" + j++}
                      instance={bulletchart}
                    />
                  </Col>
                  <Col lg={2}>
                    <span>{negative15[key]["value"] + "%"}</span>
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
      );
      newvar20 = (
        <div className="cust_bullet_chart">
          <Row className="custom_main_chart_title cust-hass-font">
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
          {Object.keys(positive20).map((key) => {
            maximum = 100;
            minimum = -100;

            var value = positive20[key]["value"];
            if (value > 1000 || value < -1000) {
              var color = "#cf4140";
            } else {
              var color = palette[0];
            }

            //   if(positive5[key]['value']<0)
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
            ]);

            bulletchart
              .scale()
              .minimum(-100)
              .maximum(100);
            bulletchart
              .range()
              .from(0)
              .to(100);
            bulletchart.background().fill("#FFFFFF 0");
            bulletchart.tooltip().enabled(true);
            // Set bulletchart size and position settings
            bulletchart.bounds(0, 0, "100%", 125);
            bulletscale20 = this.createBulletScale(
              parseInt(minimum),
              parseInt(maximum),
              parseInt(maximum / 2),
              4
            );
            // console.log('asplbullet',bulletscale);
            return (
              <div key={"divsix_" + positive20[key]["name"]}>
                <Row className="custom_main_chart">
                  <Col lg={2}>
                    <span
                      className="cust-ticker-hover"
                      onClick={() => this.OpenModal(positive20[key]["key"])}
                    >
                      {positive20[key]["key"]}
                    </span>
                  </Col>
                  <Col lg={6}>
                    <span>{positive20[key]["name"]}</span>
                  </Col>
                  <Col lg={14}>
                    <AnyChart
                      id={"seasonalmatch20_" + j++}
                      width="100%"
                      height={20}
                      key={"seasonalmatch20_" + j++}
                      instance={bulletchart}
                    />
                  </Col>
                  <Col lg={2}>
                    <span>{positive20[key]["value"] + "%"}</span>
                  </Col>
                </Row>
                {/* {bulletscale} */}
              </div>
            );
            // }
            // else{j++}
          })}
          {Object.keys(negative20).map((key) => {
            maximum = 100;
            minimum = -100;
            var value = negative20[key]["value"];
            if (value > 1000 || value < -1000) {
              var color = "#cf4140";
            } else {
              var color = palette[0];
            }
            bulletchart = anychart.bullet([
              {
                value: 100,
                type: "bar",
                gap: 0.1,
                fill: bgcolor,
                stroke: { color: bgcolor },
              },
              {
                value: (100 - value) * -1,
                type: "bar",
                gap: 0.1,
                fill: color,
                stroke: null,
              },
            ]);
            bulletchart
              .scale()
              .minimum(-100)
              .maximum(100);
            bulletchart
              .range()
              .from(0)
              .to(100);
            bulletchart.background().fill("#FFFFFF 0");
            bulletchart.tooltip().enabled(true);
            // Set bulletchart size and position settings
            bulletchart.bounds(0, 0, "100%", 125);
            bulletscale20 = this.createBulletScale(
              parseInt(minimum),
              parseInt(maximum),
              parseInt(maximum / 2),
              4
            );
            // console.log('asplbullet',bulletscale);
            return (
              <div key={"divseven_" + negative20[key]["name"]}>
                <Row className="custom_main_chart">
                  <Col lg={2}>
                    <span
                      className="cust-ticker-hover"
                      onClick={() => this.OpenModal(negative20[key]["key"])}
                    >
                      {negative20[key]["key"]}
                    </span>
                  </Col>
                  <Col lg={6}>
                    <span>{negative20[key]["name"]}</span>
                  </Col>
                  <Col lg={14}>
                    <AnyChart
                      id={"seasonalmatch20_" + j++}
                      width="100%"
                      height={20}
                      key={"seasonalmatch20_" + j++}
                      instance={bulletchart}
                    />
                  </Col>
                  <Col lg={2}>
                    <span>{negative20[key]["value"] + "%"}</span>
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
      <div
        style={{ width: "100%" }}
        className="cust_bullet_chart cust_ecin_div cust-tab-font "
      >
        <span className="cust_desciption cust-hass-font">
          Seasonal Match for day {title_date}
        </span>
        <div className="cust_price_chart">
          <Widget title="" styleName="sector_tabs gx-card-tabs">
            <Tabs defaultActiveKey="1">
              <TabPane tab="5Y" key="1" className="">
                {positive5.length > 0 || negative5.length > 0 ? (
                  <span>
                    <div>
                      {/* {legends1} */}
                      {newvar5}
                    </div>
                    <div className="scale">
                      <Row className="custom_main_chart">
                        <Col lg={8}></Col>
                        <Col lg={14}>{bulletscale5}</Col>
                      </Row>
                    </div>
                  </span>
                ) : (
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
                )}
              </TabPane>
              <TabPane tab="10Y" key="2" className="">
                {positive10.length > 0 || negative10.length > 0 ? (
                  <span>
                    <div>
                      {/* {legends1} */}
                      {newvar10}
                    </div>
                    <div className="scale">
                      <Row className="custom_main_chart">
                        <Col lg={8}></Col>
                        <Col lg={14}>{bulletscale10}</Col>
                      </Row>
                    </div>
                  </span>
                ) : (
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
                )}
              </TabPane>
              <TabPane tab="15Y" key="3" className="">
                {positive15.length > 0 || negative15.length > 0 ? (
                  <span>
                    <div>
                      {/* {legends1} */}
                      {newvar15}
                    </div>
                    <div className="scale">
                      <Row className="custom_main_chart">
                        <Col lg={8}></Col>
                        <Col lg={14}>{bulletscale15}</Col>
                      </Row>
                    </div>
                  </span>
                ) : (
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
                )}
              </TabPane>
              <TabPane tab="20Y" key="4" className="">
                {positive20.length > 0 || negative20.length > 0 ? (
                  <span>
                    <div>
                      {/* {legends1} */}
                      {newvar20}
                    </div>
                    <div className="scale">
                      <Row className="custom_main_chart">
                        <Col lg={8}></Col>
                        <Col lg={14}>{bulletscale20}</Col>
                      </Row>
                    </div>
                  </span>
                ) : (
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
    SM: Object.keys(state.Exchange.seasonalitydata)
      .filter((priceDataIndex) => priceDataIndex == "SM")
      .map((priceDataIndex) => {
        return state.Exchange.seasonalitydata[priceDataIndex];
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
)(SeasonalMatch);
