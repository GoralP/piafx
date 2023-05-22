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
import { Row, Col, Tabs, Modal, Button } from "antd";
import PropTypes from "prop-types";
import Widget from "components/Widget";
import isEqual from "lodash/isEqual";
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
class LegacyScan extends Component {
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
      nextProps.legacyscan &&
      !isEqual(nextProps.legacyscan, this.props.legacyscan)
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    var com_long = "";
    var com_short = "";
    var noncom_long = "";
    var noncom_short = "";
    var other_long = "";
    var other_short = "";
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
    var title_date = "";
    if (this.props.legacyscan.length > 0) {
      //     if(this.props.legacyscan[0].length > 0){

      var chart;
      var j = 1;
      var title_date = this.props.legacyscan[0].date;
      com_long = JSON.parse(this.props.legacyscan[0].com_long);
      com_short = JSON.parse(this.props.legacyscan[0].com_short);
      noncom_long = JSON.parse(this.props.legacyscan[0].noncom_long);
      noncom_short = JSON.parse(this.props.legacyscan[0].noncom_short);
      other_long = JSON.parse(this.props.legacyscan[0].other_long);
      other_short = JSON.parse(this.props.legacyscan[0].other_short);

      if (com_long != "") {
        var names = ["Tot. Long", "Com. Long", "N-Com Long", "N-Rep Long"];
        // var data = [23, 34, 67, 93, 56, 100];
        var data = [
          com_long["total_long"],
          com_long["com_long"],
          com_long["noncom_long"],
          com_long["other_long"],
        ];
        var dataSet = anychart.data.set(data);
        if (theme == "light") {
          var titleColor = "#37474f";
          var palette = anychart.palettes
            .distinctColors()
            .items([
              "#455a64",
              "#cf4140",
              "#455a64",
              "#455a64",
              "#64b5f6",
              "#1976d2",
              "#ef6c00",
              "#ffd54f",
              "#455a64",
              "#96a6a6",
              "#dd2c00",
              "#00838f",
              "#00bfa5",
              "#ffa000",
            ]);
        } else {
          var titleColor = "#929292";
          var palette = anychart.palettes
            .distinctColors()
            .items([
              "#d9d9d9",
              "#cf4140",
              "#d9d9d9",
              "#d9d9d9",
              "#64b5f6",
              "#1976d2",
              "#ef6c00",
              "#ffd54f",
              "#455a64",
              "#96a6a6",
              "#dd2c00",
              "#00838f",
              "#00bfa5",
              "#ffa000",
            ]);
        }
        var makeBarWithBar = function(gauge, radius, i, width, without_stroke) {
          var stroke = "1 #e5e4e4";
          if (without_stroke) {
            stroke = null;
            gauge
              .label(i)
              .text(
                '<span style="color:' +
                  titleColor +
                  ';">' +
                  names[i] +
                  ", " +
                  data[i] +
                  "%</span>"
              ) // color: #7c868e
              .useHtml(true);
            gauge
              .label(i)
              .hAlign("center")
              .vAlign("middle")
              .anchor("right-center")
              .padding(0, 10)
              .height(width / 2 + "%")
              .offsetY(radius + "%")
              .offsetX(0);
          }

          gauge
            .bar(i)
            .dataIndex(i)
            .radius(radius)
            .width(width)
            .fill(palette.itemAt(i))
            .stroke(null)
            .zIndex(5);
          gauge
            .bar(i + 100)
            .dataIndex(5)
            .radius(radius)
            .width(width)
            .fill(bgcolor)
            .stroke(stroke)
            .zIndex(4);

          return gauge.bar(i);
        };
        var gauge = anychart.gauges.circular();
        gauge.data(dataSet);
        gauge
          .fill(bgcolor)
          .stroke(null)
          .padding(0)
          .margin(100)
          .startAngle(0)
          .sweepAngle(270);
        gauge.background().fill("#FFFFFF 0");
        var axis = gauge
          .axis()
          .radius(100)
          .width(1)
          .fill(null);
        axis
          .scale()
          .minimum(0)
          .maximum(100)
          .ticks({ interval: 1 })
          .minorTicks({ interval: 1 });
        axis.labels().enabled(false);
        axis.ticks().enabled(false);
        axis.minorTicks().enabled(false);
        makeBarWithBar(gauge, 100, 0, 17, true);
        makeBarWithBar(gauge, 80, 1, 17, true);
        makeBarWithBar(gauge, 60, 2, 17, true);
        makeBarWithBar(gauge, 40, 3, 17, true);
        // makeBarWithBar(gauge, 20, 4, 17, true);

        gauge.margin(50);
        gauge
          .title()
          .text(
            '<strong className="cust-hass-font" style="color:' +
              titleColor +
              ';">Commercial Long</strong>' +
              '<br/><span className="cust-hass-font" style="color:' +
              titleColor +
              '; font-size: 12px;"><strong>' +
              com_long["name"] +
              " - " +
              com_long["ticker"] +
              "</strong></span>"
          )
          .useHtml(true);
        var self = this;
        gauge.title().listen("click", function(e) {
          self.OpenModal(com_long["ticker"]);
        });
        gauge
          .title()
          .enabled(true)
          .hAlign("center")
          .padding(0)
          .margin([0, 0, 20, 0]);
        newvar = (
          <div className="cust_bullet_chart">
            {
              <AnyChart
                id={"com_long"}
                width="100%"
                height={300}
                instance={gauge}
              />
            }
          </div>
        );
      }

      if (com_short != "") {
        var names = ["Tot. Short", "Com. Short", "N-Com Short", "N-Rep Short"];
        // var data = [23, 34, 67, 93, 56, 100];
        var data = [
          com_short["total_short"],
          com_short["com_short"],
          com_short["noncom_short"],
          com_short["other_short"],
        ];
        var dataSet = anychart.data.set(data);
        if (theme == "light") {
          var titleColor = "#37474f";
          var palette = anychart.palettes
            .distinctColors()
            .items([
              "#455a64",
              "#cf4140",
              "#455a64",
              "#455a64",
              "#64b5f6",
              "#1976d2",
              "#ef6c00",
              "#ffd54f",
              "#455a64",
              "#96a6a6",
              "#dd2c00",
              "#00838f",
              "#00bfa5",
              "#ffa000",
            ]);
        } else {
          var titleColor = "#929292";
          var palette = anychart.palettes
            .distinctColors()
            .items([
              "#d9d9d9",
              "#cf4140",
              "#d9d9d9",
              "#d9d9d9",
              "#64b5f6",
              "#1976d2",
              "#ef6c00",
              "#ffd54f",
              "#455a64",
              "#96a6a6",
              "#dd2c00",
              "#00838f",
              "#00bfa5",
              "#ffa000",
            ]);
        }
        var makeBarWithBar = function(gauge, radius, i, width, without_stroke) {
          var stroke = "1 #e5e4e4";
          if (without_stroke) {
            stroke = null;
            gauge
              .label(i)
              .text(
                '<span style="color:' +
                  titleColor +
                  ';">' +
                  names[i] +
                  ", " +
                  data[i] +
                  "%</span>"
              ) // color: #7c868e
              .useHtml(true);
            gauge
              .label(i)
              .hAlign("center")
              .vAlign("middle")
              .anchor("right-center")
              .padding(0, 10)
              .height(width / 2 + "%")
              .offsetY(radius + "%")
              .offsetX(0);
          }

          gauge
            .bar(i)
            .dataIndex(i)
            .radius(radius)
            .width(width)
            .fill(palette.itemAt(i))
            .stroke(null)
            .zIndex(5);
          gauge
            .bar(i + 100)
            .dataIndex(5)
            .radius(radius)
            .width(width)
            .fill(bgcolor)
            .stroke(stroke)
            .zIndex(4);
          return gauge.bar(i);
        };
        var gauge = anychart.gauges.circular();
        gauge.data(dataSet);
        gauge
          .fill(bgcolor)
          .stroke(null)
          .padding(0)
          .margin(100)
          .startAngle(0)
          .sweepAngle(270);
        gauge.background().fill("#FFFFFF 0");
        var axis = gauge
          .axis()
          .radius(100)
          .width(1)
          .fill(null);
        axis
          .scale()
          .minimum(0)
          .maximum(100)
          .ticks({ interval: 1 })
          .minorTicks({ interval: 1 });
        axis.labels().enabled(false);
        axis.ticks().enabled(false);
        axis.minorTicks().enabled(false);
        makeBarWithBar(gauge, 100, 0, 17, true);
        makeBarWithBar(gauge, 80, 1, 17, true);
        makeBarWithBar(gauge, 60, 2, 17, true);
        makeBarWithBar(gauge, 40, 3, 17, true);
        // makeBarWithBar(gauge, 20, 4, 17, true);

        gauge.margin(50);
        gauge
          .title()
          .text(
            '<strong className="cust-hass-font" style="color:' +
              titleColor +
              ';">Commercial Short</strong>' +
              '<br/><span className="cust-hass-font" style="color:' +
              titleColor +
              '; font-size: 12px;"><strong>' +
              com_short["name"] +
              " - " +
              com_short["ticker"] +
              "</strong></span>"
          )
          .useHtml(true);
        var self = this;
        gauge.title().listen("click", function(e) {
          self.OpenModal(com_short["ticker"]);
        });
        gauge
          .title()
          .enabled(true)
          .hAlign("center")
          .padding(0)
          .margin([0, 0, 20, 0]);
        newvar1 = (
          <div className="cust_bullet_chart">
            {
              <AnyChart
                id={"com_short"}
                width="100%"
                height={300}
                instance={gauge}
              />
            }
          </div>
        );
      }

      if (noncom_long != "") {
        var names = ["Tot. Long", "Com. Long", "N-Com Long", "N-Rep Long"];
        // var data = [23, 34, 67, 93, 56, 100];
        var data = [
          noncom_long["total_long"],
          noncom_long["com_long"],
          noncom_long["noncom_long"],
          noncom_long["other_long"],
        ];
        var dataSet = anychart.data.set(data);
        if (theme == "light") {
          var palette = anychart.palettes
            .distinctColors()
            .items([
              "#455a64",
              "#455a64",
              "#cf4140",
              "#455a64",
              "#64b5f6",
              "#1976d2",
              "#ef6c00",
              "#ffd54f",
              "#455a64",
              "#96a6a6",
              "#dd2c00",
              "#00838f",
              "#00bfa5",
              "#ffa000",
            ]);
        } else {
          var palette = anychart.palettes
            .distinctColors()
            .items([
              "#d9d9d9",
              "#d9d9d9",
              "#cf4140",
              "#d9d9d9",
              "#64b5f6",
              "#1976d2",
              "#ef6c00",
              "#ffd54f",
              "#455a64",
              "#96a6a6",
              "#dd2c00",
              "#00838f",
              "#00bfa5",
              "#ffa000",
            ]);
        }
        var makeBarWithBar = function(gauge, radius, i, width, without_stroke) {
          var stroke = "1 #e5e4e4";
          if (without_stroke) {
            stroke = null;
            gauge
              .label(i)
              .text(
                '<span style="color:' +
                  titleColor +
                  ';">' +
                  names[i] +
                  ", " +
                  data[i] +
                  "%</span>"
              ) // color: #7c868e
              .useHtml(true);
            gauge
              .label(i)
              .hAlign("center")
              .vAlign("middle")
              .anchor("right-center")
              .padding(0, 10)
              .height(width / 2 + "%")
              .offsetY(radius + "%")
              .offsetX(0);
          }

          gauge
            .bar(i)
            .dataIndex(i)
            .radius(radius)
            .width(width)
            .fill(palette.itemAt(i))
            .stroke(null)
            .zIndex(5);
          gauge
            .bar(i + 100)
            .dataIndex(5)
            .radius(radius)
            .width(width)
            .fill(bgcolor)
            .stroke(stroke)
            .zIndex(4);

          return gauge.bar(i);
        };
        var gauge = anychart.gauges.circular();
        gauge.data(dataSet);
        gauge
          .fill(bgcolor)
          .stroke(null)
          .padding(0)
          .margin(100)
          .startAngle(0)
          .sweepAngle(270);
        gauge.background().fill("#FFFFFF 0");
        var axis = gauge
          .axis()
          .radius(100)
          .width(1)
          .fill(null);
        axis
          .scale()
          .minimum(0)
          .maximum(100)
          .ticks({ interval: 1 })
          .minorTicks({ interval: 1 });
        axis.labels().enabled(false);
        axis.ticks().enabled(false);
        axis.minorTicks().enabled(false);
        makeBarWithBar(gauge, 100, 0, 17, true);
        makeBarWithBar(gauge, 80, 1, 17, true);
        makeBarWithBar(gauge, 60, 2, 17, true);
        makeBarWithBar(gauge, 40, 3, 17, true);
        // makeBarWithBar(gauge, 20, 4, 17, true);

        gauge.margin(50);
        gauge
          .title()
          .text(
            '<strong className="cust-hass-font" style="color:' +
              titleColor +
              ';">Non-Commercial Long</strong>' +
              '<br/><span className="cust-hass-font" style="color:' +
              titleColor +
              '; font-size: 12px;"><strong>' +
              noncom_long["name"] +
              " - " +
              noncom_long["ticker"] +
              "</strong></span>"
          )
          .useHtml(true);
        var self = this;
        gauge.title().listen("click", function(e) {
          self.OpenModal(noncom_long["ticker"]);
        });
        gauge
          .title()
          .enabled(true)
          .hAlign("center")
          .padding(0)
          .margin([0, 0, 20, 0]);
        newvar2 = (
          <div className="cust_bullet_chart">
            {
              <AnyChart
                id={"noncom_long"}
                width="100%"
                height={300}
                instance={gauge}
              />
            }
          </div>
        );
      }
      if (noncom_short != "") {
        var names = ["Tot. Short", "Com. Short", "N-Com Short", "N-Rep Short"];
        // var data = [23, 34, 67, 93, 56, 100];
        var data = [
          noncom_short["total_short"],
          noncom_short["com_short"],
          noncom_short["noncom_short"],
          noncom_short["other_short"],
        ];
        var dataSet = anychart.data.set(data);
        if (theme == "light") {
          var palette = anychart.palettes
            .distinctColors()
            .items([
              "#455a64",
              "#455a64",
              "#cf4140",
              "#455a64",
              "#64b5f6",
              "#1976d2",
              "#ef6c00",
              "#ffd54f",
              "#455a64",
              "#96a6a6",
              "#dd2c00",
              "#00838f",
              "#00bfa5",
              "#ffa000",
            ]);
        } else {
          var palette = anychart.palettes
            .distinctColors()
            .items([
              "#d9d9d9",
              "#d9d9d9",
              "#cf4140",
              "#d9d9d9",
              "#64b5f6",
              "#1976d2",
              "#ef6c00",
              "#ffd54f",
              "#455a64",
              "#96a6a6",
              "#dd2c00",
              "#00838f",
              "#00bfa5",
              "#ffa000",
            ]);
        }
        var makeBarWithBar = function(gauge, radius, i, width, without_stroke) {
          var stroke = "1 #e5e4e4";
          if (without_stroke) {
            stroke = null;
            gauge
              .label(i)
              .text(
                '<span style="color:' +
                  titleColor +
                  ';">' +
                  names[i] +
                  ", " +
                  data[i] +
                  "%</span>"
              ) // color: #7c868e
              .useHtml(true);
            gauge
              .label(i)
              .hAlign("center")
              .vAlign("middle")
              .anchor("right-center")
              .padding(0, 10)
              .height(width / 2 + "%")
              .offsetY(radius + "%")
              .offsetX(0);
          }

          gauge
            .bar(i)
            .dataIndex(i)
            .radius(radius)
            .width(width)
            .fill(palette.itemAt(i))
            .stroke(null)
            .zIndex(5);
          gauge
            .bar(i + 100)
            .dataIndex(5)
            .radius(radius)
            .width(width)
            .fill(bgcolor)
            .stroke(stroke)
            .zIndex(4);
          return gauge.bar(i);
        };
        var gauge = anychart.gauges.circular();
        gauge.data(dataSet);
        gauge
          .fill(bgcolor)
          .stroke(null)
          .padding(0)
          .margin(100)
          .startAngle(0)
          .sweepAngle(270);
        gauge.background().fill("#FFFFFF 0");
        var axis = gauge
          .axis()
          .radius(100)
          .width(1)
          .fill(null);
        axis
          .scale()
          .minimum(0)
          .maximum(100)
          .ticks({ interval: 1 })
          .minorTicks({ interval: 1 });
        axis.labels().enabled(false);
        axis.ticks().enabled(false);
        axis.minorTicks().enabled(false);
        makeBarWithBar(gauge, 100, 0, 17, true);
        makeBarWithBar(gauge, 80, 1, 17, true);
        makeBarWithBar(gauge, 60, 2, 17, true);
        makeBarWithBar(gauge, 40, 3, 17, true);
        // makeBarWithBar(gauge, 20, 4, 17, true);

        gauge.margin(50);
        gauge
          .title()
          .text(
            '<strong className="cust-hass-font" style="color:' +
              titleColor +
              ';">Non-Commercial Short</strong>' +
              '<br/><span className="cust-hass-font" style="color:' +
              titleColor +
              '; font-size: 12px;"><strong>' +
              noncom_short["name"] +
              " - " +
              noncom_short["ticker"] +
              "</strong></span>"
          )
          .useHtml(true);
        var self = this;
        gauge.title().listen("click", function(e) {
          self.OpenModal(noncom_short["ticker"]);
        });
        gauge
          .title()
          .enabled(true)
          .hAlign("center")
          .padding(0)
          .margin([0, 0, 20, 0]);
        newvar3 = (
          <div className="cust_bullet_chart">
            {
              <AnyChart
                id={"noncom_short"}
                width="100%"
                height={300}
                instance={gauge}
              />
            }
          </div>
        );
      }
      if (other_long != "") {
        var names = ["Tot. Long", "Com. Long", "N-Com Long", "N-Rep Long"];
        // var data = [23, 34, 67, 93, 56, 100];
        var data = [
          other_long["total_long"],
          other_long["com_long"],
          other_long["noncom_long"],
          other_long["other_long"],
        ];
        var dataSet = anychart.data.set(data);
        if (theme == "light") {
          var palette = anychart.palettes
            .distinctColors()
            .items([
              "#455a64",
              "#455a64",
              "#455a64",
              "#cf4140",
              "#64b5f6",
              "#1976d2",
              "#ef6c00",
              "#ffd54f",
              "#455a64",
              "#96a6a6",
              "#dd2c00",
              "#00838f",
              "#00bfa5",
              "#ffa000",
            ]);
        } else {
          var palette = anychart.palettes
            .distinctColors()
            .items([
              "#d9d9d9",
              "#d9d9d9",
              "#d9d9d9",
              "#cf4140",
              "#64b5f6",
              "#1976d2",
              "#ef6c00",
              "#ffd54f",
              "#455a64",
              "#96a6a6",
              "#dd2c00",
              "#00838f",
              "#00bfa5",
              "#ffa000",
            ]);
        }
        var makeBarWithBar = function(gauge, radius, i, width, without_stroke) {
          var stroke = "1 #e5e4e4";
          if (without_stroke) {
            stroke = null;
            gauge
              .label(i)
              .text(
                '<span style="color:' +
                  titleColor +
                  ';">' +
                  names[i] +
                  ", " +
                  data[i] +
                  "%</span>"
              ) // color: #7c868e
              .useHtml(true);
            gauge
              .label(i)
              .hAlign("center")
              .vAlign("middle")
              .anchor("right-center")
              .padding(0, 10)
              .height(width / 2 + "%")
              .offsetY(radius + "%")
              .offsetX(0);
          }

          gauge
            .bar(i)
            .dataIndex(i)
            .radius(radius)
            .width(width)
            .fill(palette.itemAt(i))
            .stroke(null)
            .zIndex(5);
          gauge
            .bar(i + 100)
            .dataIndex(5)
            .radius(radius)
            .width(width)
            .fill(bgcolor)
            .stroke(stroke)
            .zIndex(4);

          return gauge.bar(i);
        };
        var gauge = anychart.gauges.circular();
        gauge.data(dataSet);
        gauge
          .fill(bgcolor)
          .stroke(null)
          .padding(0)
          .margin(100)
          .startAngle(0)
          .sweepAngle(270);
        gauge.background().fill("#FFFFFF 0");
        var axis = gauge
          .axis()
          .radius(100)
          .width(1)
          .fill(null);
        axis
          .scale()
          .minimum(0)
          .maximum(100)
          .ticks({ interval: 1 })
          .minorTicks({ interval: 1 });
        axis.labels().enabled(false);
        axis.ticks().enabled(false);
        axis.minorTicks().enabled(false);
        makeBarWithBar(gauge, 100, 0, 17, true);
        makeBarWithBar(gauge, 80, 1, 17, true);
        makeBarWithBar(gauge, 60, 2, 17, true);
        makeBarWithBar(gauge, 40, 3, 17, true);
        // makeBarWithBar(gauge, 20, 4, 17, true);

        gauge.margin(50);
        gauge
          .title()
          .text(
            '<strong className="cust-hass-font" style="color:' +
              titleColor +
              ';">Non-Reportable Long</strong>' +
              '<br/><span className="cust-hass-font" style="color:' +
              titleColor +
              '; font-size: 12px;"><strong>' +
              other_long["name"] +
              " - " +
              other_long["ticker"] +
              "</strong></span>"
          )
          .useHtml(true);
        var self = this;
        gauge.title().listen("click", function(e) {
          self.OpenModal(other_long["ticker"]);
        });
        gauge
          .title()
          .enabled(true)
          .hAlign("center")
          .padding(0)
          .margin([0, 0, 20, 0]);
        newvar4 = (
          <div className="cust_bullet_chart">
            {
              <AnyChart
                id={"other_long"}
                width="100%"
                height={300}
                instance={gauge}
              />
            }
          </div>
        );
      }
      if (other_short != "") {
        var names = ["Tot. Short", "Com. Short", "N-Com Short", "N-Rep Short"];
        // var data = [23, 34, 67, 93, 56, 100];
        var data = [
          other_short["total_short"],
          other_short["com_short"],
          other_short["noncom_short"],
          other_short["other_short"],
        ];
        var dataSet = anychart.data.set(data);
        if (theme == "light") {
          var palette = anychart.palettes
            .distinctColors()
            .items([
              "#455a64",
              "#455a64",
              "#455a64",
              "#cf4140",
              "#64b5f6",
              "#1976d2",
              "#ef6c00",
              "#ffd54f",
              "#455a64",
              "#96a6a6",
              "#dd2c00",
              "#00838f",
              "#00bfa5",
              "#ffa000",
            ]);
        } else {
          var palette = anychart.palettes
            .distinctColors()
            .items([
              "#d9d9d9",
              "#d9d9d9",
              "#d9d9d9",
              "#cf4140",
              "#64b5f6",
              "#1976d2",
              "#ef6c00",
              "#ffd54f",
              "#455a64",
              "#96a6a6",
              "#dd2c00",
              "#00838f",
              "#00bfa5",
              "#ffa000",
            ]);
        }
        var makeBarWithBar = function(gauge, radius, i, width, without_stroke) {
          var stroke = "1 #e5e4e4";
          if (without_stroke) {
            stroke = null;
            gauge
              .label(i)
              .text(
                '<span style="color:' +
                  titleColor +
                  ';">' +
                  names[i] +
                  ", " +
                  data[i] +
                  "%</span>"
              ) // color: #7c868e
              .useHtml(true);
            gauge
              .label(i)
              .hAlign("center")
              .vAlign("middle")
              .anchor("right-center")
              .padding(0, 10)
              .height(width / 2 + "%")
              .offsetY(radius + "%")
              .offsetX(0);
          }

          gauge
            .bar(i)
            .dataIndex(i)
            .radius(radius)
            .width(width)
            .fill(palette.itemAt(i))
            .stroke(null)
            .zIndex(5);
          gauge
            .bar(i + 100)
            .dataIndex(5)
            .radius(radius)
            .width(width)
            .fill(bgcolor)
            .stroke(stroke)
            .zIndex(4);
          return gauge.bar(i);
        };
        var gauge = anychart.gauges.circular();
        gauge.data(dataSet);
        gauge
          .fill(bgcolor)
          .stroke(null)
          .padding(0)
          .margin(100)
          .startAngle(0)
          .sweepAngle(270);
        gauge.background().fill("#FFFFFF 0");
        var axis = gauge
          .axis()
          .radius(100)
          .width(1)
          .fill(null);
        axis
          .scale()
          .minimum(0)
          .maximum(100)
          .ticks({ interval: 1 })
          .minorTicks({ interval: 1 });
        axis.labels().enabled(false);
        axis.ticks().enabled(false);
        axis.minorTicks().enabled(false);
        makeBarWithBar(gauge, 100, 0, 17, true);
        makeBarWithBar(gauge, 80, 1, 17, true);
        makeBarWithBar(gauge, 60, 2, 17, true);
        makeBarWithBar(gauge, 40, 3, 17, true);
        // makeBarWithBar(gauge, 20, 4, 17, true);

        gauge.margin(50);
        gauge
          .title()
          .text(
            '<strong className="cust-hass-font" style="color:' +
              titleColor +
              ';">Non-Reportable Short</strong>' +
              '<br/><span className="cust-hass-font" style="color:' +
              titleColor +
              '; font-size: 12px;"><strong>' +
              other_short["name"] +
              " - " +
              other_short["ticker"] +
              "</span>"
          )
          .useHtml(true);
        var self = this;
        gauge.title().listen("click", function(e) {
          self.OpenModal(other_short["ticker"]);
        });
        gauge
          .title()
          .enabled(true)
          .hAlign("center")
          .padding(0)
          .margin([0, 0, 20, 0]);
        newvar5 = (
          <div className="cust_bullet_chart">
            {
              <AnyChart
                id={"other_short"}
                width="100%"
                height={300}
                instance={gauge}
              />
            }
          </div>
        );
      }

      // }
    }
    return (
      <div
        style={{ width: "100%" }}
        className="cust_bullet_chart cust_ecin_div cust-tab-font "
      >
        <span className="cust_desciption cust-hass-font">
          Higher OI % by group as per report dated {title_date}
        </span>
        <div className="cust_price_chart">
          <Widget title="" styleName="sector_tabs gx-card-tabs">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Commercial" key="1" className="">
                <Row>
                  <Col lg={12}>
                    {com_long != "" ? (
                      <span>{newvar}</span>
                    ) : (
                      <div className="nodata_div" align="center">
                        {theme == "light" ? (
                          <img
                            alt=""
                            src={require("assets/images/empty.png")}
                          />
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
                  </Col>
                  <Col lg={12}>
                    {com_short != "" ? (
                      <span>{newvar1}</span>
                    ) : (
                      <div className="nodata_div" align="center">
                        {theme == "light" ? (
                          <img
                            alt=""
                            src={require("assets/images/empty.png")}
                          />
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
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Non-Commercial" key="2" className="">
                <Row>
                  <Col lg={12}>
                    {noncom_long != "" ? (
                      <span>{newvar2}</span>
                    ) : (
                      <div className="nodata_div" align="center">
                        {theme == "light" ? (
                          <img
                            alt=""
                            src={require("assets/images/empty.png")}
                          />
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
                  </Col>
                  <Col lg={12}>
                    {noncom_short != "" ? (
                      <span>{newvar3}</span>
                    ) : (
                      <div className="nodata_div" align="center">
                        {theme == "light" ? (
                          <img
                            alt=""
                            src={require("assets/images/empty.png")}
                          />
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
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Non-Reportable" key="3" className="">
                <Row>
                  <Col lg={12}>
                    {other_long != "" ? (
                      <span>{newvar4}</span>
                    ) : (
                      <div className="nodata_div" align="center">
                        {theme == "light" ? (
                          <img
                            alt=""
                            src={require("assets/images/empty.png")}
                          />
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
                  </Col>
                  <Col lg={12}>
                    {other_short != "" ? (
                      <span>{newvar5}</span>
                    ) : (
                      <div className="nodata_div" align="center">
                        {theme == "light" ? (
                          <img
                            alt=""
                            src={require("assets/images/empty.png")}
                          />
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
                  </Col>
                </Row>
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
    legacyscan: Object.keys(state.Exchange.cotreportdata)
      .filter((priceDataIndex) => priceDataIndex == "legacyscan")
      .map((priceDataIndex) => {
        return state.Exchange.cotreportdata[priceDataIndex];
      }),
  };
};
export default connect(
  mapStateToProps,
  { getmoveDate, changeScroller, addClicked, tableData }
)(LegacyScan);
