import React, { Component } from "react";
import {
  Col,
  Row,
  Tabs,
  Button,
  Switch,
  Radio,
  Modal,
  Input,
  message,
} from "antd";
import AnyChart from "anychart-react";
import anychart from "anychart";
import { connect } from "react-redux";
import { getPatternEvents } from "appRedux/actions/Exchange";
var common_colors = require("../../../assets/theme-variable");
var theme = localStorage.getItem("theme");
var bgcolor = common_colors.default_back_color;
var charttext = "#e1e1e1";
let switchClass = "GreenSwitch";
const RadioGroup = Radio.Group;
const { TabPane } = Tabs;
const { TextArea } = Input;

if (theme == "coffee") {
  anychart.theme(anychart.themes.coffee);
  bgcolor = common_colors.coffee_back_color;
}
if (theme == "light") {
  charttext = "#37474f";
}

// const NUMBER_FORMAT = {
//   scale: {
//     factors: [1e9, 1e6, 1e3, 1e2, 1],
//     suffixes: ["B", "M", "K", "H", ""],
//   },
//   decimalsCount: 0,
// };

class PatternEvents extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    boX: "vol_diff",
    boY: "co",
    boSize: "fixed",
    copositive: true,
    days: "1",
    colorAsCO: true,
    filterStats: false,
    minX: "",
    maxX: "",
    maxInputVal: "",
    minInputVal: "",
    calcPrice: 0,
    calcRadio: 95,
    statLabelY: "Close-Open",
    compute_level: false,
    exportModal: false,
    pinceChartCode: "",
    cAlgoCode: "",
    exportActiveTab: "1",
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.eventsData !== this.props.eventsData ||
      nextState.minX !== this.state.minX ||
      nextState.maxX !== this.state.maxX ||
      nextState.calcPrice !== this.state.calcPrice ||
      nextState.calcRadio !== this.state.calcRadio ||
      nextState.minInputVal !== this.state.minInputVal ||
      nextState.maxInputVal !== this.state.maxInputVal ||
      nextState.exportModal != this.state.exportModal ||
      nextState.boX != this.state.boX ||
      nextState.boY != this.state.boY ||
      nextState.boSize != this.state.boSize ||
      nextState.copositive != this.state.copositive ||
      nextState.days != this.state.days ||
      nextState.colorAsCO != this.state.colorAsCO ||
      nextState.filterStats != this.state.filterStats ||
      nextState.statLabelY != this.state.statLabelY ||
      nextState.pinceChartCode != this.state.pinceChartCode ||
      nextState.cAlgoCode != this.state.cAlgoCode ||
      nextState.exportActiveTab != this.state.exportActiveTab
    ) {
      return true;
    } else {
      return false;
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.eventsData.maxX &&
      nextProps.eventsData.minX &&
      nextProps.eventsData.PriceLevel &&
      (nextProps.eventsData.maxX !== this.state.maxX ||
        nextProps.eventsData.minX !== this.state.minX ||
        nextProps.eventsData.PriceLevel !== this.state.calcPrice)
    ) {
      this.setState({
        maxX: nextProps.eventsData.maxX,
        minX: nextProps.eventsData.minX,
        maxInputVal: nextProps.eventsData.maxX,
        minInputVal: nextProps.eventsData.minX,
        calcPrice: nextProps.eventsData.PriceLevel,
      });
    }
    if (
      nextProps.priceData &&
      nextProps.priceData.length > 0 &&
      nextProps.priceData[0].length > 0
    ) {
      // this.setState({
      //   calcPrice:
      //     nextProps.priceData[0][nextProps.priceData[0].length - 1]["close"],
      // });
    }
  }

  handleChange = (event) => {
    // get label for statistic title by vasudev
    let index = event.nativeEvent.target.selectedIndex;
    let label = event.nativeEvent.target[index].text;
    this.setState({ statLabelY: label });
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChange1 = (event) => {
    if (
      /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/.test(event.target.value) ||
      event.target.value === ""
    ) {
      this.setState({ [event.target.name]: event.target.value });
    }
  };
  handleChangePriceLevel = (event) => {
    if (
      /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/.test(event.target.value) ||
      event.target.value === ""
    ) {
      this.setState({ calcPrice: event.target.value });
    }
  };
  handleLineChange = () => {
    this.setState({
      maxInputVal: this.state.maxX,
      minInputVal: this.state.minX,
    });
  };

  // for submit button ----start
  handleBOEventSubmit = () => {
    if (
      this.props.patternData &&
      this.props.patternData.length > 0 &&
      this.props.patternData[0].length > 0 &&
      this.props.priceData &&
      this.props.priceData.length > 0 &&
      this.props.priceData[0].length > 0
    ) {
      this.setState({ filterStats: false });
      let dir = this.props.patternData[0][0]["trend"] == 1 ? "up" : "down";
      this.props.getPatternEvents({
        ticker_code: localStorage.getItem("ticker_code"),
        type: "pattern",
        dir: dir,
        x: this.state.boX,
        y: this.state.boY,
        size: this.state.boSize,
        pattern: this.props.patternData[0][0]["name"],
        compVar: this.state.compVar,
        co: this.state.copositive ? "positive" : "negative",
        days: this.state.days,
        bdco: this.state.colorAsCO ? "co" : "bd",
        snr: "snr1",
        minX: "",
        maxX: "",
        compute_level: false,
        price_level: "",
        percentage_ratio: this.state.calcRadio,
      });
    }
  };

  handleEventLevelSubmit = () => {
    if (
      this.props.patternData &&
      this.props.patternData.length > 0 &&
      this.props.patternData[0].length > 0 &&
      this.props.priceData &&
      this.props.priceData.length > 0 &&
      this.props.priceData[0].length > 0
    ) {
      let dir = this.props.patternData[0][0]["trend"] == 1 ? "up" : "down";
      this.props.getPatternEvents({
        ticker_code: localStorage.getItem("ticker_code"),
        type: "pattern",
        dir: dir,
        x: this.state.boX,
        y: this.state.boY,
        size: this.state.boSize,
        pattern: this.props.patternData[0][0]["name"],
        compVar: this.state.compVar,
        co: this.state.copositive ? "positive" : "negative",
        days: this.state.days,
        bdco: this.state.colorAsCO ? "co" : "bd",
        snr: "snr1",
        minX: this.state.filterStats ? this.state.minX : "",
        maxX: this.state.filterStats ? this.state.maxX : "",
        compute_level: true,
        price_level: this.state.calcPrice,
        percentage_ratio: this.state.calcRadio,
      });
    }
  };
  // submit button ----end

  coPositive = (event) => {
    if (event) {
      this.setState({ copositive: true });
    } else {
      this.setState({ copositive: false });
    }
    if (
      this.props.patternData[0][0]["date"] ==
      this.props.priceData[0][this.props.priceData[0].length - 1]["date"]
    ) {
      let dir = this.props.patternData[0][0]["trend"] == 1 ? "up" : "down";
      this.props.getPatternEvents({
        ticker_code: localStorage.getItem("ticker_code"),
        type: "pattern",
        dir: dir,
        x: this.state.boX,
        y: this.state.boY,
        size: this.state.boSize,
        pattern: this.props.patternData[0][0]["name"],
        compVar: this.state.compVar,
        co: event ? "positive" : "negative",
        days: this.state.days,
        bdco: this.state.colorAsCO ? "co" : "bd",
        snr: "snr1",
        minX: this.state.filterStats ? this.state.minX : "",
        maxX: this.state.filterStats ? this.state.maxX : "",
        compute_level: false,
        price_level: "",
        percentage_ratio: this.state.calcRadio,
      });
    }
  };

  filterStats = (event) => {
    if (event) {
      this.setState({ filterStats: true });
      if (
        this.props.patternData[0][0]["date"] ==
        this.props.priceData[0][this.props.priceData[0].length - 1]["date"]
      ) {
        let dir = this.props.patternData[0][0]["trend"] == 1 ? "up" : "down";
        this.props.getPatternEvents({
          ticker_code: localStorage.getItem("ticker_code"),
          type: "pattern",
          dir: dir,
          x: this.state.boX,
          y: this.state.boY,
          size: this.state.boSize,
          pattern: this.props.patternData[0][0]["name"],
          compVar: this.state.compVar,
          co: this.state.copositive ? "positive" : "negative",
          days: this.state.days,
          bdco: this.state.colorAsCO ? "co" : "bd",
          snr: "snr1",
          minX: this.state.minX,
          maxX: this.state.maxX,
          compute_level: false,
          price_level: "",
          percentage_ratio: this.state.calcRadio,
        });
      }
    } else {
      this.setState({ filterStats: false });
      if (
        this.props.patternData[0][0]["date"] ==
        this.props.priceData[0][this.props.priceData[0].length - 1]["date"]
      ) {
        let dir = this.props.patternData[0][0]["trend"] == 1 ? "up" : "down";
        this.props.getPatternEvents({
          ticker_code: localStorage.getItem("ticker_code"),
          type: "pattern",
          dir: dir,
          x: this.state.boX,
          y: this.state.boY,
          size: this.state.boSize,
          pattern: this.props.patternData[0][0]["name"],
          compVar: this.state.compVar,
          co: this.state.copositive ? "positive" : "negative",
          days: this.state.days,
          bdco: this.state.colorAsCO ? "co" : "bd",
          snr: "snr1",
          minX: "",
          maxX: "",
          compute_level: false,
          price_level: "",
          percentage_ratio: this.state.calcRadio,
        });
      }
    }

    this.forceUpdate();
  };

  colorAsCO = (event) => {
    if (event) {
      this.setState({ colorAsCO: true });
    } else {
      this.setState({ colorAsCO: false });
    }
    if (
      this.props.patternData[0][0]["date"] ==
      this.props.priceData[0][this.props.priceData[0].length - 1]["date"]
    ) {
      let dir = this.props.patternData[0][0]["trend"] == 1 ? "up" : "down";
      this.props.getPatternEvents({
        ticker_code: localStorage.getItem("ticker_code"),
        type: "pattern",
        dir: dir,
        x: this.state.boX,
        y: this.state.boY,
        size: this.state.boSize,
        pattern: this.props.patternData[0][0]["name"],
        compVar: this.state.compVar,
        co: this.state.copositive ? "positive" : "negative",
        days: this.state.days,
        bdco: event ? "co" : "bd",
        snr: "snr1",
        minX: this.state.filterStats ? this.state.minX : "",
        maxX: this.state.filterStats ? this.state.maxX : "",
        compute_level: false,
        price_level: "",
        percentage_ratio: this.state.calcRadio,
      });
    }
  };

  onCalcRadioChange = (e) => {
    this.setState({ calcRadio: e.target.value });
  };

  // Open export code modal & assign dynamic code handle by vasudev
  handleExportCode = () => {
    var pineCode = "";
    var cAlgoCode = "";
    this.setState({ exportModal: true });
    if (
      this.props.eventsData !== undefined &&
      this.props.eventsData.computeSeries &&
      Object.keys(this.props.eventsData.computeSeries).length > 0
    ) {
      pineCode =
        '// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/\r\n// © PiaFx\r\n// Data provided for academic analysis, you trade at your own risk.\r\n// Futures, foreign currency, CFDs and options trading contains substantial risk\r\n// and is not for every investor. An investor could potentially lose all or\r\n// more than the initial investment. Risk capital is money that can be lost\r\n// without jeopardizing ones financial security or lifestyle.\r\n// Only risk capital should be used for trading and only those with sufficient\r\n// risk capital should consider trading. Past performance is not necessarily\r\n// indicative of future results.\r\n//@version=5\r\n\r\nindicator("`plot()`", "", true)\r\nR3 = ' +
        this.props.eventsData.computeSeries.computeR3 +
        "\r\nR2 = " +
        this.props.eventsData.computeSeries.computeR2 +
        "\r\nR1 = " +
        this.props.eventsData.computeSeries.computeR1 +
        "\r\nPL = " +
        this.props.eventsData.PriceLevel +
        "\r\nS1 = " +
        this.props.eventsData.computeSeries.computeS1 +
        "\r\nS2 = " +
        this.props.eventsData.computeSeries.computeS2 +
        "\r\nS3 = " +
        this.props.eventsData.computeSeries.computeS3 +
        '\r\n\r\nplot( R3,  "' +
        this.props.eventsData.percentageRatio +
        '% R3", ' +
        this.props.eventsData.computeSeries.colorR3 +
        ', 3, trackprice = true, show_last = 1)\r\nplot( R2,  "' +
        this.props.eventsData.percentageRatio +
        '% R2", ' +
        this.props.eventsData.computeSeries.colorR2 +
        ', 3, trackprice = true, show_last = 1)\r\nplot( R1,  "' +
        this.props.eventsData.percentageRatio +
        '% R1", ' +
        this.props.eventsData.computeSeries.colorR1 +
        ', 3, trackprice = true, show_last = 1)\r\nplot( PL,  "' +
        this.props.eventsData.percentageRatio +
        '% PL", #9fa5a5, 1,trackprice = true, show_last = 1)\r\nplot( S1,  "' +
        this.props.eventsData.percentageRatio +
        '% S1", ' +
        this.props.eventsData.computeSeries.colorS1 +
        ', 3, trackprice = true, show_last = 1)\r\nplot( S2,  "' +
        this.props.eventsData.percentageRatio +
        '% S2", ' +
        this.props.eventsData.computeSeries.colorS2 +
        ', 3, trackprice = true, show_last = 1)\r\nplot( S3,  "' +
        this.props.eventsData.percentageRatio +
        '% S3", ' +
        this.props.eventsData.computeSeries.colorS3 +
        ", 3, trackprice = true, show_last = 1)\r\n";

      cAlgoCode =
        '// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/\r\n// © PiaFx\r\n// Data provided for academic analysis, you trade at your own risk.\r\n// Futures, foreign currency, CFDs and options trading contains substantial risk\r\n// and is not for every investor. An investor could potentially lose all or\r\n// more than the initial investment. Risk capital is money that can be lost\r\n// without jeopardizing ones financial security or lifestyle.\r\n// Only risk capital should be used for trading and only those with sufficient\r\n// risk capital should consider trading. Past performance is not necessarily\r\n// indicative of future results.\r\n//@version=5\r\n\r\nindicator("`plot()`", "", true)\r\nR3 = ' +
        this.props.eventsData.computeSeries.computeR3 +
        "\r\nR2 = " +
        this.props.eventsData.computeSeries.computeR2 +
        "\r\nR1 = " +
        this.props.eventsData.computeSeries.computeR1 +
        "\r\nPL = " +
        this.props.eventsData.PriceLevel +
        "\r\nS1 = " +
        this.props.eventsData.computeSeries.computeS1 +
        "\r\nS2 = " +
        this.props.eventsData.computeSeries.computeS2 +
        "\r\nS3 = " +
        this.props.eventsData.computeSeries.computeS3 +
        '\r\n\r\nplot( R3,  "' +
        this.props.eventsData.percentageRatio +
        '% R3", ' +
        this.props.eventsData.computeSeries.colorR3 +
        ', 3, trackprice = true, show_last = 1)\r\nplot( R2,  "' +
        this.props.eventsData.percentageRatio +
        '% R2", ' +
        this.props.eventsData.computeSeries.colorR2 +
        ', 3, trackprice = true, show_last = 1)\r\nplot( R1,  "' +
        this.props.eventsData.percentageRatio +
        '% R1", ' +
        this.props.eventsData.computeSeries.colorR1 +
        ', 3, trackprice = true, show_last = 1)\r\nplot( PL,  "' +
        this.props.eventsData.percentageRatio +
        '% PL", #9fa5a5, 1,trackprice = true, show_last = 1)\r\nplot( S1,  "' +
        this.props.eventsData.percentageRatio +
        '% S1", ' +
        this.props.eventsData.computeSeries.colorS1 +
        ', 3, trackprice = true, show_last = 1)\r\nplot( S2,  "' +
        this.props.eventsData.percentageRatio +
        '% S2", ' +
        this.props.eventsData.computeSeries.colorS2 +
        ', 3, trackprice = true, show_last = 1)\r\nplot( S3,  "' +
        this.props.eventsData.percentageRatio +
        '% S3", ' +
        this.props.eventsData.computeSeries.colorS3 +
        ", 3, trackprice = true, show_last = 1)\r\n";

      this.setState({ pinceChartCode: pineCode, cAlgoCode: cAlgoCode });
    }
  };
  // Close export code handle
  handleExportModalClose = () => {
    this.setState({ exportModal: false, pinceChartCode: "", cAlgoCode: "" });
  };
  // Copy to clipboard handle
  handleCopyToClipboard = () => {
    if (this.state.exportActiveTab === "1") {
      navigator.clipboard.writeText(this.state.pinceChartCode);
    } else {
      navigator.clipboard.writeText(this.state.cAlgoCode);
    }
    message.success("Copied to clipboard");
  };
  // On tab change set active key to state
  handleTabChange = (key) => {
    this.setState({ exportActiveTab: key });
  };

  render() {
    var title_date = "";
    var palette = anychart.palettes.defaultPalette;
    if (theme == "coffee") {
      anychart.theme(anychart.themes.coffee);
      palette = anychart.palettes.coffee;
    }
    var textColor = "#CCCCCC";
    let purple = "#eb82ca";
    let blue = "#6384f4";
    if (theme == "light") {
      textColor = "#262626";
      purple = "#B24C94";
      blue = "#1C52BA";
    }
    let patternOccered = false;
    if (
      this.props.patternData &&
      this.props.patternData.length > 0 &&
      this.props.patternData[0].length > 0 &&
      this.props.priceData &&
      this.props.priceData.length > 0 &&
      this.props.priceData[0].length > 0
    ) {
      if (
        this.props.priceData.length > 0 &&
        this.props.priceData[0].length > 0
      ) {
        const date1 = new Date(this.props.patternData[0][0]["date"]);
        const date2 = new Date(
          this.props.priceData[0][this.props.priceData[0].length - 1]["date"]
        );
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 5) {
          patternOccered = true;
        }
      }
    }
    var newvar = <div></div>;
    if (
      this.props.eventsData !== undefined &&
      this.props.eventsData.bubble &&
      this.props.eventsData.bubble.length > 0
    ) {
      let markervalue = this.props.eventsData.bubble[
        this.props.eventsData.bubble.length - 1
      ];
      switchClass = this.props.eventsData.switchClass;
      var maxyValue = Math.max(...this.props.eventsData.bubble.map((o) => o.y));
      var maxRound = Math.round(maxyValue);
      // console.log("maxvalue--->", maxRound);
      // let markervalue = this.props.eventsData.bubble.find(x => x.date === this.props.priceData[0][this.props.priceData[0].length-1]['date'])
      // let markervalue = this.props.eventsData.bubble.find(x => x.date === '2021-12-06')
      // if(this.props.daily.length > 0 && this.props.weekly.length > 0 && this.props.monthly.length > 0){

      //   if(this.props.daily[0].length > 0 && this.props.weekly[0].length > 0 && this.props.monthly[0].length > 0){
      // var daily = this.props.daily[0][0];
      // var weekly = this.props.weekly[0][0];
      // var monthly = this.props.monthly[0][0];
      // var title_date = daily['date'];
      var chart5 = anychart.bubble();
      chart5.title().useHtml(true);
      // chart5.title('<h1 style="color:'+textColor +';font-size:20px">Referring Date: '+getNextBusinessDay(new Date(this.props.daily[0][0]['date'])).toDateString()+'</h1>');
      chart5.xAxis().title(this.props.eventsData.xName);
      chart5.yAxis().title(this.props.eventsData.yName);

      // if(daily['value5'])
      // {
      // console.log('asplasplaspl',daily['value5']);
      // var Y5 = [{'x':weekly['value5'],'size':daily['value5'],'value':monthly['value5'],'key':'5Y'}];
      // var dataSet5 = anychart.data.set(this.props.eventsData.bubble);
      // var mapping5 = dataSet5.mapAs({'x': 'x', 'value': 'y','size':'size','date':'date','co':'co'});
      // var series5 = chart5.bubble(mapping5);
      // series5.name(this.props.patternData[0][0]['description']);
      // series5.clip(false);
      // Start vasudev changes for separate the series by color
      var redArray = [];
      var greenArray = [];
      var skyBlueArray = [];
      var purpleArray = [];
      var blueArray = [];
      this.props.eventsData.bubble.forEach((bubbleCO, key) => {
        if (this.state.colorAsCO) {
          if (this.props.eventsData.dir == "up") {
            if (bubbleCO.co < 0) {
              redArray.push(bubbleCO);
            } else if (bubbleCO.co >= 0) {
              greenArray.push(bubbleCO);
            } else {
              skyBlueArray.push(bubbleCO);
              // return "#64b5f6 0.5";
            }
          } else {
            if (bubbleCO.co > 0) {
              redArray.push(bubbleCO);
            } else if (bubbleCO.co <= 0) {
              greenArray.push(bubbleCO);
            } else {
              skyBlueArray.push(bubbleCO);
              // return "#64b5f6 0.5";
            }
          }
        } else {
          if (this.props.eventsData.dir == "up") {
            if (this.props.eventsData.BD > bubbleCO.co && bubbleCO.co < 0) {
              if (bubbleCO.co < 0) {
                purpleArray.push(bubbleCO);
                // return purple + " 0.75";
              } else if (bubbleCO.co >= 0) {
                blueArray.push(bubbleCO);
                // return blue + " 0.75";
              } else {
                skyBlueArray.push(bubbleCO);
                // return "#64b5f6 0.75";
              }
            } else {
              if (bubbleCO.co < this.props.eventsData.BD) {
                purpleArray.push(bubbleCO);
                // return purple + " 0.75";
              } else if (bubbleCO.co >= this.props.eventsData.BD) {
                blueArray.push(bubbleCO);
                // return "#1C52BA 0.75";
              } else {
                blueArray.push(bubbleCO);
                // return blue + " 0.75";
              }
            }
          } else {
            if (this.props.eventsData.BD > bubbleCO.co && bubbleCO.co < 0) {
              if (bubbleCO.co > 0) {
                purpleArray.push(bubbleCO);
                // return purple + " 0.75";
              } else if (bubbleCO.co <= 0) {
                blueArray.push(bubbleCO);
                // return blue + " 0.75";
              } else {
                skyBlueArray.push(bubbleCO);
                // return "#64b5f6 0.75";
              }
            } else {
              if (bubbleCO.co > this.props.eventsData.BD) {
                purpleArray.push(bubbleCO);
                // return purple + " 0.75";
              } else if (bubbleCO.co <= this.props.eventsData.BD) {
                blueArray.push(bubbleCO);
                // return blue + " 0.75";
              } else {
                skyBlueArray.push(bubbleCO);
                // return "#64b5f6 0.75";
              }
            }
          }
        }
      });
      // End vasudev changes for separate the series by color

      // for red array
      if (redArray.length > 0) {
        var dataSetRed5 = anychart.data.set(redArray);

        var mappingRed5 = dataSetRed5.mapAs({
          x: "x",
          value: "y",
          size: "size",
          date: "date",
          co: "co",
        });

        var seriesRed5 = chart5.bubble(mappingRed5);
        seriesRed5.name("Unfavourable");
        seriesRed5.clip(false);
        seriesRed5.fill("red 0.5");
        seriesRed5.stroke("red");
      }

      // for green array by vasudev
      if (greenArray.length > 0) {
        var dataSetGreen5 = anychart.data.set(greenArray);
        var mappingGreen5 = dataSetGreen5.mapAs({
          x: "x",
          value: "y",
          size: "size",
          date: "date",
          co: "co",
        });
        var seriesGreen5 = chart5.bubble(mappingGreen5);
        seriesGreen5.name("Favourable");
        seriesGreen5.clip(false);
        seriesGreen5.fill("green 0.5");
        seriesGreen5.stroke("green");
      }

      // for skyBlue array by vasudev
      if (skyBlueArray.length > 0) {
        var dataSetSkyBlue5 = anychart.data.set(skyBlueArray);
        var mappingSkyBlue5 = dataSetSkyBlue5.mapAs({
          x: "x",
          value: "y",
          size: "size",
          date: "date",
          co: "co",
        });
        var seriesSkyBlue5 = chart5.bubble(mappingSkyBlue5);
        seriesSkyBlue5.name("Sky Blue");
        seriesSkyBlue5.clip(false);
        if (this.state.colorAsCO) {
          seriesSkyBlue5.fill("#64b5f6 0.5");
        } else {
          seriesSkyBlue5.fill("#64b5f6 0.75");
        }
        seriesSkyBlue5.stroke("#64b5f6");
      }

      // for Purple array by vasudev
      if (purpleArray.length > 0) {
        var dataSetPurple5 = anychart.data.set(purpleArray);
        var mappingPurple5 = dataSetPurple5.mapAs({
          x: "x",
          value: "y",
          size: "size",
          date: "date",
          co: "co",
        });
        var seriesPurple5 = chart5.bubble(mappingPurple5);
        seriesPurple5.name("Purple");
        seriesPurple5.clip(false);
        seriesPurple5.fill(purple + " 0.75");
        seriesPurple5.stroke(purple);
      }

      // for Blue array by vasudev
      if (blueArray.length > 0) {
        var dataSetBlue5 = anychart.data.set(blueArray);
        var mappingBlue5 = dataSetBlue5.mapAs({
          x: "x",
          value: "y",
          size: "size",
          date: "date",
          co: "co",
        });
        var seriesBlue5 = chart5.bubble(mappingBlue5);
        seriesBlue5.name("Blue");
        seriesBlue5.clip(false);
        seriesBlue5.fill(blue + " 0.75");
        seriesBlue5.stroke(blue);
      }
      var marker = chart5.lineMarker(1);
      marker.layout("vertical");
      marker.value(this.state.maxInputVal);
      marker.scale(chart5.xScale());
      if (theme == "default") {
        marker.stroke({
          color: "white",
          dash: "2 2",
        });
      } else {
        marker.stroke({
          color: "black",
          dash: "2 2",
        });
      }

      var marker = chart5.lineMarker(2);
      marker.layout("vertical");
      marker.value(this.state.minInputVal);
      marker.scale(chart5.xScale());

      if (theme == "default") {
        marker.stroke({
          color: "white",
          dash: "2 2",
        });
      } else {
        marker.stroke({
          color: "black",
          dash: "2 2",
        });
      }

      if (markervalue !== undefined) {
        var marker = chart5.lineMarker();
        marker.layout("vertical");
        marker.value(markervalue.x);
        marker.scale(chart5.xScale());

        var textMarker1 = chart5.textMarker();
        textMarker1.axis(chart5.xAxis());
        textMarker1.value(markervalue.x);
        textMarker1.align("bottom");
        textMarker1.anchor("top-center");
        // textMarker1.fontSize(13);
        textMarker1.padding(5);
        textMarker1.text(markervalue.x);
        textMarker1.fontColor("white");
        textMarker1.fontSize(11);
        // textMarker1.textDirection('rtl');
        textMarker1
          .background()
          .enabled(true)
          .fill("black");
        textMarker1.rotation(0);
      }
      // this.props.eventsData.bubble.sort(function (a, b) {
      //     return a.x - b.x
      // })
      chart5.xScale().minimum(this.props.eventsData.min);
      chart5.xScale().maximum(this.props.eventsData.max);

      // if(this.state.colorAsCO)
      // {
      //     if(this.props.eventsData.dir == 'up')
      //     {
      //         series5.fill(function() {
      //             console.log(this.getData('co'));
      //             if(this.getData('co') < 0)
      //             {
      //                 return 'red 0.5';
      //             }
      //             else if(this.getData('co') >= 0)
      //             {
      //                 return 'green 0.5';
      //             }
      //             else{return '#64b5f6 0.5'}
      //             // return '#64b5f6 0.5'
      //         })
      //         series5.stroke(function() {
      //             if(this.getData('co') < 0)
      //             {
      //                 return 'red';
      //             }
      //             else if(this.getData('co') >= 0)
      //             {
      //                 return 'green';
      //             }
      //             else{return "#64b5f6"}
      //         })
      //     }
      //     else
      //     {
      //         series5.fill(function() {
      //             if(this.getData('co') > 0)
      //             {
      //                 return 'red 0.5';
      //             }
      //             else if(this.getData('co') <= 0)
      //             {
      //                 return 'green 0.5';
      //             }
      //             else{return '#64b5f6 0.5'}
      //             // return '#64b5f6 0.5'
      //         })
      //         series5.stroke(function() {
      //             if(this.getData('co') > 0)
      //             {
      //                 return 'red';
      //             }
      //             else if(this.getData('co') <= 0)
      //             {
      //                 return 'green';
      //             }
      //             else{return "#64b5f6"}
      //         })
      //     }
      // }
      // else{
      //     if(this.props.eventsData.dir == 'up')
      //     {
      //         series5.fill(function() {
      //             console.log(this.getData('co'));
      //             if(temp.props.eventsData.BD>this.getData('co') && this.getData('co')<0)
      //             {
      //                 if(this.getData('co') < 0)
      //                 {
      //                     return purple+' 0.75';
      //                 }
      //                 else if(this.getData('co') >= 0)
      //                 {
      //                     return blue+' 0.75';
      //                 }
      //                 else{return '#64b5f6 0.75'}
      //             }
      //             else{
      //                 if(this.getData('co') < temp.props.eventsData.BD)
      //                 {
      //                     return purple+' 0.75';
      //                 }
      //                 else if(this.getData('co') >= temp.props.eventsData.BD)
      //                 {
      //                     return '#1C52BA 0.75';
      //                 }
      //                 else{return blue+' 0.75'}
      //             }
      //             // return '#64b5f6 0.75'
      //         })
      //         series5.stroke(function() {
      //             if(temp.props.eventsData.BD>this.getData('co') && this.getData('co')<0)
      //             {
      //                 if(this.getData('co') < temp.props.eventsData.BD)
      //                 {
      //                     return purple;
      //                 }
      //                 else if(this.getData('co') >= temp.props.eventsData.BD)
      //                 {
      //                     return blue;
      //                 }
      //                 else{return "#64b5f6"}
      //             }
      //             else{
      //                 if(this.getData('oo') < temp.props.eventsData.BD)
      //                 {
      //                     return purple;
      //                 }
      //                 else if(this.getData('co') >= temp.props.eventsData.BD)
      //                 {
      //                     return blue;
      //                 }
      //                 else{return "#64b5f6"}
      //             }
      //         })
      //     }
      //     else
      //     {
      //         series5.fill(function() {
      //             if(temp.props.eventsData.BD>this.getData('co') && this.getData('co')<0)
      //             {
      //                 console.log(this.getData('co'));
      //                 if(this.getData('co') > 0)
      //                 {
      //                     return purple+' 0.75';
      //                 }
      //                 else if(this.getData('co') <= 0)
      //                 {
      //                     return blue+' 0.75';
      //                 }
      //                 else{return '#64b5f6 0.75'}
      //             }else{
      //                 if(this.getData('co') > temp.props.eventsData.BD)
      //                 {
      //                     return purple+' 0.75';
      //                 }
      //                 else if(this.getData('co') <= temp.props.eventsData.BD)
      //                 {
      //                     return blue+' 0.75';
      //                 }
      //                 else{return '#64b5f6 0.75'}
      //             }
      //             // return '#64b5f6 0.75'
      //         })
      //         series5.stroke(function() {
      //             if(temp.props.eventsData.BD>this.getData('co') && this.getData('co')<0)
      //             {
      //                 if(this.getData('co') > 0)
      //                 {
      //                     return purple;
      //                 }
      //                 else if(this.getData('co') <= 0)
      //                 {
      //                     return blue;
      //                 }
      //                 else{return "#64b5f6"}
      //             }
      //             else{
      //                 if(this.getData('co') > temp.props.eventsData.BD)
      //                 {
      //                     return purple;
      //                 }
      //                 else if(this.getData('co') <= temp.props.eventsData.BD)
      //                 {
      //                     return blue;
      //                 }
      //                 else{return "#64b5f6"}
      //             }
      //         })
      //     }
      // }
      // }
      chart5.background().fill("#FFFFFF 0");
      chart5.yScale().minimum(0);
      chart5.yScale().maximum(maxRound + 20);
      // chart5.xScale().minimum(0);
      // chart5.xScale().maximum(100);
      // chart5.tooltip().titleFormat(function() {
      //     return  this.getData('key');
      // });
      chart5.minBubbleSize("0.5%");
      chart5.maxBubbleSize("3%");
      chart5.legend(true);
      chart5.tooltip().useHtml(true);
      // var customScale = anychart.scales.linear();
      // chart5.yAxis().scale(customScale);
      chart5
        .yAxis()
        .labels()
        .fontColor(charttext);
      chart5.legend().fontColor(charttext);
      chart5
        .xAxis()
        .minorLabels()
        .fontColor(charttext);
      chart5
        .xAxis()
        .labels()
        .fontColor(charttext);
      chart5
        .xAxis()
        .title()
        .fontColor(charttext);
      chart5
        .yAxis()
        .title()
        .fontColor(charttext);

      let temp = this;
      chart5.tooltip().format(function() {
        return (
          "Date : " +
          this.getData("date") +
          "<br> " +
          temp.props.eventsData.sizeName +
          " : " +
          this.getData("size") +
          "<br> " +
          temp.props.eventsData.xName +
          " : " +
          this.getData("x") +
          "<br> " +
          temp.props.eventsData.yName +
          " : " +
          this.getData("value")
        );
      });

      newvar = (
        <div className="">
          {patternOccered ? (
            <div align="center">
              <h2 style={{ color: charttext }}>
                Event scatter chart for{" "}
                {this.props.patternData[0][0]["description"]}{" "}
                {this.props.patternData[0][0]["trend"] === -1
                  ? "Bearish"
                  : "Bullish"}{" "}
                of the {this.props.patternData[0][0]["date"]}
              </h2>
            </div>
          ) : null}
          {
            <AnyChart
              width="100%"
              height={400}
              instance={chart5}
              id="bubbleChartPattern5"
            />
          }
          {/* <Row className="EventMainRowInputs">
            <Col lg={8}>
              <lable>Min </lable>
              <input
                type="number"
                name="minX"
                min={this.state.minVal}
                max={this.state.maxVal}
                value={this.state.minX}
                onChange={this.handleChange1}
                onBlur={this.handleLineChange}
              ></input>
            </Col>
            <Col lg={8}>
              <lable>Max </lable>
              <input
                type="number"
                name="maxX"
                min={this.state.minVal}
                max={this.state.maxVal}
                value={this.state.maxX}
                onChange={this.handleChange1}
                onBlur={this.handleLineChange}
              ></input>
            </Col>
            <Col lg={8}>
              <Button
                type="primary"
                onClick={() => this.handleBOEventSubmit1()}
              >
                Stats
              </Button>
            </Col>
          </Row> */}
        </div>
      );
      //   }
    }
    return (
      <div style={{ width: "100%" }}>
        {patternOccered ? (
          <>
            <div align="center">
              <h2 style={{ color: charttext }}>
                {this.props.patternData[0][0]["description"]}{" "}
                {this.props.patternData[0][0]["trend"] === -1
                  ? "Bearish"
                  : "Bullish"}{" "}
                of the {this.props.patternData[0][0]["date"]}
              </h2>
            </div>
            <div className="cust_bullet_chart cust_ecin_div cust-tab-font">
              <Row className="EventMainRow">
                <Col lg={24}>
                  <Row className="EventInputs" align="center">
                    <Col lg={5} align="center" className="eventCol">
                      <lable>X - Event</lable>
                      <select
                        className="ti_modal_fields Events x"
                        name="boX"
                        defaultValue={this.state.boX}
                        onChange={this.handleChange}
                      >
                        <option key="co" value="co">
                          Close-Open
                        </option>
                        <option key="ol" value="ol">
                          Open-low
                        </option>
                        <option key="ho" value="ho">
                          High-Open
                        </option>
                        <option key="cl" value="cl">
                          Close-Low
                        </option>
                        <option key="hc" value="hc">
                          High-Close
                        </option>
                        <option key="bodyRangePerc" value="bodyRangePerc">
                          BodyRangePerc
                        </option>
                        <option key="closePerc" value="closePerc">
                          ClosePerc
                        </option>
                        <option key="range" value="range">
                          Range
                        </option>
                        <option key="body" value="body">
                          Body
                        </option>
                        <option key="vol_diff" value="vol_diff">
                          VolDiff
                        </option>
                        <option key="willR" value="willR">
                          WillR
                        </option>
                        <option key="sDev" value="sDev">
                          Std Dev
                        </option>
                        <option key="macd" value="macd">
                          MACD
                        </option>
                        <option key="correll_vol" value="correll_vol">
                          Correl Volume
                        </option>
                      </select>
                    </Col>
                    <Col lg={5} align="center" className="eventCol">
                      <lable>Y - Next</lable>
                      <select
                        className="ti_modal_fields Events"
                        name="boY"
                        defaultValue={this.state.boY}
                        onChange={this.handleChange}
                      >
                        <option key="co" value="co">
                          Close-Open
                        </option>
                        <option key="ol" value="ol">
                          Open-low
                        </option>
                        <option key="ho" value="ho">
                          High-Open
                        </option>
                        <option key="cl" value="cl">
                          Close-Low
                        </option>
                        <option key="hc" value="hc">
                          High-Close
                        </option>
                        <option key="bodyRangePerc" value="bodyRangePerc">
                          BodyRangePerc
                        </option>
                        <option key="closePerc" value="closePerc">
                          ClosePerc
                        </option>
                        <option key="range" value="range">
                          Range
                        </option>
                        <option key="body" value="body">
                          Body
                        </option>
                        {/* <option key="vol_diff" value="vol_diff">VolDiff</option>
                                        <option key="willR" value="willR">WillR</option>
                                        <option key="sDev" value="sDev">Std Dev</option>
                                        <option key="macd" value="macd">MACD</option> */}
                      </select>
                    </Col>
                    <Col lg={5} align="center" className="eventCol">
                      <lable>Bubble Size</lable>
                      <select
                        className="ti_modal_fields Events"
                        name="boSize"
                        defaultValue={this.state.boSize}
                        onChange={this.handleChange}
                      >
                        <option key="fixed" value="fixed">
                          Fixed
                        </option>
                        <option key="co" value="co">
                          Close-Open
                        </option>
                        <option key="ol" value="ol">
                          Open-low
                        </option>
                        <option key="ho" value="ho">
                          High-Open
                        </option>
                        <option key="cl" value="cl">
                          Close-Low
                        </option>
                        <option key="hc" value="hc">
                          High-Close
                        </option>
                        <option key="bodyRangePerc" value="bodyRangePerc">
                          BodyRangePerc
                        </option>
                        <option key="closePerc" value="closePerc">
                          ClosePerc
                        </option>
                        <option key="range" value="range">
                          Range
                        </option>
                        <option key="body" value="body">
                          Body
                        </option>
                        {/* <option key="vol_diff" value="vol_diff">VolDiff</option>
                                        <option key="willR" value="willR">WillR</option>
                                        <option key="sDev" value="sDev">Std Dev</option>
                                        <option key="macd" value="macd">MACD</option> */}
                      </select>
                    </Col>
                    <Col lg={3} align="center" className="eventCol">
                      <lable>Days</lable>
                      <select
                        className="ti_modal_fields Events"
                        name="days"
                        defaultValue={this.state.days}
                        onChange={this.handleChange}
                      >
                        <option key="day1" value="1">
                          1
                        </option>
                        <option key="day2" value="2">
                          2
                        </option>
                        <option key="day3" value="3">
                          3
                        </option>
                        <option key="day4" value="4">
                          4
                        </option>
                        <option key="day5" value="5">
                          5
                        </option>
                      </select>
                    </Col>
                    {/* <Col lg={3} align ="center" className="eventCol">
                                    <lable>BD   CO</lable><br />
                                    <Switch size="small" name={"colorAsCO"} onChange={(e)=>this.colorAsCO(e)} defaultChecked={this.state.colorAsCO}/>
                                </Col> */}
                    <Col lg={4} className="EventSubmit eventCol">
                      <Button onClick={() => this.handleBOEventSubmit()}>
                        Submit
                      </Button>
                    </Col>
                  </Row>
                  {newvar}
                </Col>

                {this.props.eventsData !== undefined &&
                  this.props.eventsData.bubble &&
                  Object.keys(this.props.eventsData.bubble).length > 0 && (
                    <Row
                      className="EventMainRowInputsborder "
                      style={{
                        paddingLeft: "15px",
                        paddingRight: "5px",
                        paddingBottom: "8px",
                      }}
                    >
                      <Col lg={1}></Col>

                      <Col lg={7} className="text-center ">
                        <lable id="minmax">Min </lable>
                        {theme == "default" ? (
                          <input
                            type="number"
                            name="minX"
                            style={{ color: "black" }}
                            value={this.state.minX}
                            onChange={this.handleChange1}
                            onBlur={this.handleLineChange}
                          ></input>
                        ) : (
                          <input
                            type="number"
                            name="minX"
                            value={this.state.minX}
                            onChange={this.handleChange1}
                            onBlur={this.handleLineChange}
                          ></input>
                        )}
                      </Col>
                      <Col lg={7} className="text-center">
                        <lable id="minmax">Max </lable>
                        {theme == "default" ? (
                          <input
                            type="number"
                            name="maxX"
                            style={{ color: "black" }}
                            value={this.state.maxX}
                            onChange={this.handleChange1}
                            onBlur={this.handleLineChange}
                          ></input>
                        ) : (
                          <input
                            type="number"
                            name="maxX"
                            value={this.state.maxX}
                            onChange={this.handleChange1}
                            onBlur={this.handleLineChange}
                          ></input>
                        )}
                      </Col>
                      <Col lg={2}></Col>
                      {/* <Col lg={3}>
                        <lable style={{ whiteSpace: "nowrap" }}>BD CO</lable>
                        <br />
                        <Switch
                          size="small"
                          name={"colorAsCO"}
                          onChange={(e) => this.colorAsCO(e)}
                          defaultChecked={this.state.colorAsCO}
                        />
                      </Col> */}
                      <Col lg={3}>
                        <lable>
                          {this.state.filterStats === false ? (
                            <span className="filter-switch-color">Filter</span>
                          ) : (
                            <span className="">Filter</span>
                          )}
                        </lable>
                        <br />
                        <Switch
                          size="small"
                          name={"filterStats"}
                          onChange={(e) => this.filterStats(e)}
                          checked={this.state.filterStats}
                        />
                      </Col>
                      {/* <Col lg={4}>
                      <Button
                        type="primary"
                        style={{ whiteSpace: nowrap; }}
                        onClick={() => this.handleBOEventSubmit()}
                      >
                        Submit
                      </Button>
                    </Col> */}
                      <Col lg={4}></Col>
                    </Row>
                  )}
              </Row>

              <Row
                className="event-row"
                style={{
                  paddingLeft: "10px",
                  paddingRight: "15px",
                }}
              >
                <Col lg={24} className="">
                  {this.props.eventsData !== undefined &&
                    this.props.eventsData.calculatedArray &&
                    Object.keys(this.props.eventsData.calculatedArray).length >
                      0 && (
                      <>
                        <span className="stats_header" align="center">
                          <h2 style={{ color: charttext }}>
                            {/* set statistics title by vasudev */}
                            {this.props.eventsData.statLabel}{" "}
                            {this.state.statLabelY} Candle For{" "}
                            {this.state.filterStats ? "Filtered" : "All"}
                          </h2>
                        </span>
                        <Row className="" style={{ marginBottom: "-20px" }}>
                          <Col lg={6} align="center">
                            Stats
                          </Col>
                          <Col lg={12} align="center">
                            <div>Percentile</div>
                          </Col>
                          <Col lg={6} align="center">
                            Group
                          </Col>
                        </Row>
                        <Row className="CalculatedText ">
                          <Col
                            lg={3}
                            align="left"
                            style={{
                              paddingLeft: "15px",
                            }}
                          >
                            <div>
                              <strong>Mean</strong>
                            </div>
                            <div>STD</div>
                            <div>Min</div>
                            <div>Max</div>
                          </Col>
                          <Col
                            lg={3}
                            align="left"
                            style={{
                              paddingLeft: "15px",
                              borderRight: "1px solid #E4E5E7",
                            }}
                          >
                            <div>
                              <strong>
                                {this.props.eventsData.calculatedArray.mean}
                              </strong>
                            </div>
                            <div>
                              {this.props.eventsData.calculatedArray.std}
                            </div>
                            <div>
                              {this.props.eventsData.calculatedArray.min}
                            </div>
                            <div>
                              {this.props.eventsData.calculatedArray.max}
                            </div>
                          </Col>
                          <Col
                            lg={3}
                            align="left"
                            style={{ paddingLeft: "15px" }}
                          >
                            {/* <hr /> */}

                            <div>
                              <strong>25%</strong>
                            </div>
                            <div>50%</div>
                            <div>
                              <strong>75%</strong>
                            </div>
                            <div>80%</div>
                          </Col>
                          <Col
                            lg={3}
                            align="left"
                            style={{
                              paddingLeft: "15px",
                              borderRight: "1px solid #E4E5E7",
                            }}
                          >
                            <div>
                              <strong>
                                {this.props.eventsData.calculatedArray.per25}
                              </strong>
                            </div>
                            <div>
                              {this.props.eventsData.calculatedArray.per50}
                            </div>
                            <div>
                              <strong>
                                {this.props.eventsData.calculatedArray.per75}
                              </strong>
                            </div>
                            <div>
                              {this.props.eventsData.calculatedArray.per80}
                            </div>
                          </Col>
                          <Col
                            lg={3}
                            align="left"
                            style={{ paddingLeft: "15px" }}
                          >
                            <div>90%</div>
                            <div>
                              <strong>95%</strong>
                            </div>
                            <div>99%</div>
                            {/* <hr /> */}
                          </Col>
                          <Col
                            lg={3}
                            align="left"
                            style={{
                              paddingLeft: "15px",
                              borderRight: "1px solid #E4E5E7",
                            }}
                          >
                            <div>
                              {this.props.eventsData.calculatedArray.per90}
                            </div>
                            <div>
                              <strong>
                                {this.props.eventsData.calculatedArray.per95}
                              </strong>
                            </div>
                            <div>
                              {this.props.eventsData.calculatedArray.per99}
                            </div>
                          </Col>
                          <Col
                            lg={3}
                            align="left"
                            style={{ paddingLeft: "15px" }}
                          >
                            <div>{this.props.eventsData.upLabel}:</div>
                            <div>{this.props.eventsData.downLabel}:</div>
                          </Col>
                          <Col
                            lg={3}
                            align="left"
                            style={{ paddingLeft: "15px" }}
                          >
                            <div>
                              {this.props.eventsData.calculatedArray.upCount}/
                              {
                                this.props.eventsData.calculatedArray
                                  .upCountPerc
                              }
                              %
                            </div>
                            <div>
                              {this.props.eventsData.calculatedArray.downCount}/
                              {
                                this.props.eventsData.calculatedArray
                                  .downCountPerc
                              }
                              %
                            </div>
                          </Col>
                          <Col
                            lg={3}
                            align="right"
                            style={{ paddingRight: "25px", paddingLeft: "0px" }}
                          >
                            {/* <div>
                              <strong>
                                {this.props.eventsData.calculatedArray.mean}
                              </strong>
                            </div>
                            <div>
                              {this.props.eventsData.calculatedArray.std}
                            </div>
                            <div>
                              {this.props.eventsData.calculatedArray.min}
                            </div>
                            <div>
                              {this.props.eventsData.calculatedArray.max}
                            </div> */}
                            {/* <hr />
                            <br /> */}
                            {/* <div>
                              <strong>
                                {this.props.eventsData.calculatedArray.per25}
                              </strong>
                            </div>
                            <div>
                              {this.props.eventsData.calculatedArray.per50}
                            </div>
                            <div>
                              <strong>
                                {this.props.eventsData.calculatedArray.per75}
                              </strong>
                            </div>
                            <div>
                              {this.props.eventsData.calculatedArray.per80}
                            </div> */}
                            {/* <div>
                              {this.props.eventsData.calculatedArray.per90}
                            </div>
                            <div>
                              <strong>
                                {this.props.eventsData.calculatedArray.per95}
                              </strong>
                            </div>
                            <div>
                              {this.props.eventsData.calculatedArray.per99}
                            </div>
                            <hr /> */}
                            {/* <div>
                              {this.props.eventsData.calculatedArray.upCount}/
                              {
                                this.props.eventsData.calculatedArray
                                  .upCountPerc
                              }
                              %
                            </div>
                            <div>
                              {this.props.eventsData.calculatedArray.downCount}/
                              {
                                this.props.eventsData.calculatedArray
                                  .downCountPerc
                              }
                              %
                            </div> */}
                          </Col>
                        </Row>
                      </>
                    )}
                  {/* </Row> */}
                  {this.props.eventsData !== undefined &&
                    this.props.eventsData.bubble &&
                    Object.keys(this.props.eventsData.bubble).length > 0 && (
                      <Row>
                        {/* <Col lg={12} align="center" className="eventCol">
                        <lable>Ref. Value</lable>
                        <select
                          className="ti_modal_fields Events"
                          name="compVar"
                          defaultValue={this.state.compVar}
                          onChange={this.handleChange}
                        >
                          <option key="co" value="co">
                            Close-Open
                          </option>
                          <option key="ol" value="ol">
                            Open-low
                          </option>
                          <option key="ho" value="ho">
                            High-Open
                          </option>
                          <option key="cl" value="cl">
                            Close-Low
                          </option>
                          <option key="hc" value="hc">
                            High-Close
                          </option>
                          <option key="bodyRangePerc" value="bodyRangePerc">
                            BodyRangePerc
                          </option>
                          <option key="closePerc" value="closePerc">
                            ClosePerc
                          </option>
                          <option key="range" value="range">
                            Range
                          </option>
                          <option key="body" value="body">
                            Body
                          </option>
                        </select>
                      </Col> */}

                        <Col
                          lg={24}
                          align="right"
                          className="eventCol"
                          style={{ paddingRight: "10px", paddingBottom: "5px" }}
                        >
                          <lable>Group</lable>
                          <br />
                          <Switch
                            size="small"
                            name={"copositive"}
                            className={switchClass}
                            onChange={(e) => this.coPositive(e)}
                            defaultChecked={this.state.copositive}
                          />
                        </Col>
                      </Row>
                    )}
                </Col>
              </Row>

              {/* Computation level added by vasudev */}
              <Row
                className="event-row"
                style={{
                  paddingLeft: "10px",
                  paddingRight: "15px",
                }}
              >
                <Col lg={24} className="">
                  {this.props.eventsData !== undefined &&
                    this.props.eventsData.computeSeries &&
                    Object.keys(this.props.eventsData.computeSeries).length >
                      0 && (
                      <>
                        <span className="stats_header" align="center">
                          <h2 style={{ color: charttext }}>
                            Levels for {this.props.eventsData.percentageRatio}%
                            of{" "}
                            {this.props.boAvailable[0][0]["3M"] === "down"
                              ? "Bearish"
                              : "Bullish"}{" "}
                            event
                          </h2>
                        </span>
                        <Row className="" style={{ marginBottom: "-20px" }}>
                          <Col lg={12} align="center">
                            Levels
                          </Col>
                          <Col lg={12} align="center">
                            Value
                          </Col>
                        </Row>
                        <Row className="CalculatedText" align="center">
                          <Col
                            lg={12}
                            align="center"
                            style={{ paddingLeft: "15px" }}
                          >
                            <div>R3</div>
                            <div>R2</div>
                            <div>R1</div>
                            <div>
                              <strong>Price</strong>
                            </div>
                            <div>S1</div>
                            <div>S2</div>
                            <div>S3</div>
                          </Col>
                          <Col
                            lg={12}
                            align="center"
                            style={{
                              paddingLeft: "15px",
                              borderRight: "1px solid #E4E5E7",
                            }}
                          >
                            <div>
                              {this.props.eventsData.computeSeries.computeR3}
                            </div>
                            <div>
                              {this.props.eventsData.computeSeries.computeR2}
                            </div>
                            <div>
                              {this.props.eventsData.computeSeries.computeR1}
                            </div>
                            <div>
                              <strong>
                                {this.props.eventsData.PriceLevel}
                              </strong>
                            </div>
                            <div>
                              {this.props.eventsData.computeSeries.computeS1}
                            </div>
                            <div>
                              {this.props.eventsData.computeSeries.computeS2}
                            </div>
                            <div>
                              {this.props.eventsData.computeSeries.computeS3}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col
                            lg={24}
                            align="right"
                            className="eventCol"
                            style={{
                              paddingRight: "10px",
                              paddingBottom: "5px",
                            }}
                          >
                            <Button
                              // type="primary"
                              onClick={() => this.handleExportCode()}
                            >
                              Export
                            </Button>
                          </Col>
                        </Row>
                      </>
                    )}
                </Col>
              </Row>

              {this.props.eventsData !== undefined &&
                this.props.eventsData.bubble &&
                Object.keys(this.props.eventsData.bubble).length > 0 && (
                  <Row className="CalcRowInputs event-row">
                    <Col lg={14}>
                      {theme == "default" ? (
                        <RadioGroup
                          onChange={this.onCalcRadioChange}
                          value={this.state.calcRadio}
                        >
                          <Radio key="75" value={75} style={{ color: "white" }}>
                            75%
                          </Radio>
                          <Radio key="80" value={80} style={{ color: "white" }}>
                            80%
                          </Radio>
                          <Radio key="90" value={90} style={{ color: "white" }}>
                            90%
                          </Radio>
                          <Radio key="95" value={95} style={{ color: "white" }}>
                            95%
                          </Radio>
                          <Radio key="99" value={99} style={{ color: "white" }}>
                            99%
                          </Radio>
                        </RadioGroup>
                      ) : (
                        <RadioGroup
                          onChange={this.onCalcRadioChange}
                          value={this.state.calcRadio}
                        >
                          <Radio key="75" value={75}>
                            75%
                          </Radio>
                          <Radio key="80" value={80}>
                            80%
                          </Radio>
                          <Radio key="90" value={90}>
                            90%
                          </Radio>
                          <Radio key="95" value={95}>
                            95%
                          </Radio>
                          <Radio key="99" value={99}>
                            99%
                          </Radio>
                        </RadioGroup>
                      )}
                    </Col>
                    <Col lg={6} className="calcPrice">
                      <lable>Price Level</lable>
                      {theme == "default" ? (
                        <input
                          type="number"
                          id="calcPrice"
                          name="calcPrice"
                          style={{ color: "black" }}
                          value={this.state.calcPrice}
                          onChange={this.handleChangePriceLevel}
                        ></input>
                      ) : (
                        <input
                          type="number"
                          id="calcPrice"
                          name="calcPrice"
                          value={this.state.calcPrice}
                          onChange={this.handleChangePriceLevel}
                        ></input>
                      )}
                    </Col>
                    <Col lg={4}>
                      <Button
                        // type="primary"
                        onClick={() => this.handleEventLevelSubmit()}
                      >
                        Levels
                      </Button>
                    </Col>
                  </Row>
                )}
            </div>
          </>
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
        {/* Export code with pinechart & cAlgo modal by vasudev */}
        <Modal
          title="Export Code"
          centered
          visible={this.state.exportModal}
          onCancel={this.handleExportModalClose}
          width={1000}
          footer={[
            <Button
              key="submit"
              // type="primary"
              onClick={this.handleCopyToClipboard}
            >
              Copy To Clipborad
            </Button>,
          ]}
        >
          <Tabs defaultActiveKey="1" onChange={this.handleTabChange}>
            <TabPane tab="Pine Chart" key="1">
              <TextArea
                rows={20}
                value={this.state.pinceChartCode}
                onChange={(e) =>
                  this.setState({ pinceChartCode: e.target.value })
                }
              />
            </TabPane>
            <TabPane tab="cAlgo" key="2">
              <TextArea
                rows={20}
                value={this.state.cAlgoCode}
                onChange={(e) => this.setState({ cAlgoCode: e.target.value })}
              />
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    eventsData: state.Exchange.patternEventsData,
    boAvailable: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "boAvailable")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
      }),
    patternData: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "pattern")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
      }),
    priceData: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "tickers_search")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
      }),
  };
};
export default connect(
  mapStateToProps,
  { getPatternEvents }
)(PatternEvents);
