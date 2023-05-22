import React, { Component } from "react";
import AnyChart from "anychart-react";
import anychart from "anychart";
import { Switch, Col, Row, Progress, Popover, Menu } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { CirclePicker } from "react-color";
import {
  progressbar,
  scalechanging,
  arrangegroup,
  cotscale,
  cotgrid,
  absolute,
  increaseheight,
  getGraphData,
  loaderstatus,
  clearData,
  setInitialCots,
} from "appRedux/actions/Exchange";
import SubMenu from "antd/lib/menu/SubMenu";
import "styles/cotaccountancy.less";
import { ComposableMap } from "react-simple-maps";
import { first } from "lodash";
var cotdataArray = [];
var cotdataArrayOI = [];
var drawingArray_temp = [];
var drawingArray = [];
var openIntrstArr = [];
var ciname = "";
var cinameOi = "";
var globalMax = 0;
var globalOIMax = 0;
var globalMin = 0;
var charttext = "#e1e1e1";
// var chart1 = anychart.stock();

var grpmenu = "";
var ti = require("../../../assets/ti");
const NUMBER_FORMAT = {
  scale: {
    factors: [1e9, 1e6, 1e3, 1],
    suffixes: ["B", "M", "K", ""],
  },
  decimalsCount: 0,
};
const NUMBER_FORMAT1 = {
  scale: {
    factors: [1e9, 1e6, 1e3, 1],
    suffixes: ["B", "M", "K", ""],
  },
  decimalsCount: 1,
};
var newvar1 = <div></div>;
var ticker_name = "";
var ticker_id = "";
var cotmenu = [];
var seriesArray = [];
var verticalLine = false;
var index_array = [
  "LEG Commercial Index Future",
  "LEG Commercial Index Combined",
  "LEG Non-Commercial Index Future",
  "LEG Non-Commercial Index Combined",
  "LEG Non Reportable Index Future",
  "LEG Non Reportable Index Combined",
  "TFF Dealer Index Future",
  "TFF Dealer Index Combined",
  "TFF Asset Manager Index Future",
  "TFF Asset Manager Index Combined",
  "TFF Lev. Funds Index Future",
  "TFF Lev. Funds Index Combined",
  "TFF Others Index Future",
  "TFF Others Index Combined",
  "TFF Non-Reportable Index Future",
  "TFF Non-Reportable Index Combined",
  ,
  "Dis Swap Dealer Index Future",
  "Dis Swap Dealer Index Combined",
  "Dis Money Manager Index Future",
  "Dis Money Manager Index Combined",
  "Dis Producer Index Future",
  "Dis Producer Index Combined",
  "Dis Others Index Future",
  "Dis Others Index Combined",
  "Dis Non-Reportable Index Future",
  "Dis Non-Reportable Index Combined",
  "LEG Index Future",
  "LEG Index Combined",
  "TFF Index Future",
  "TFF Index Combined",
  "Dis Index Future",
  "Dis Index Combined",
];
var mov_index_array = [
  "LEG Commercial Mov Index Future",
  "LEG Commercial Mov Index Combined",
  "LEG Non-Commercial Mov Index Future",
  "LEG Non-Commercial Mov Index Combined",
  "LEG Non Reportable Mov Index Future",
  "LEG Non Reportable Mov Index Combined",
  "TFF Dealer Mov Index Future",
  "TFF Dealer Mov Index Combined",
  "TFF Asset Manager Mov Index Future",
  "TFF Asset Manager Mov Index Combined",
  "TFF Lev. Funds Mov Index Future",
  "TFF Lev. Funds Mov Index Combined",
  "TFF Others Mov Index Future",
  "TFF Others Mov Index Combined",
  "TFF Non-Reportable Mov Index Future",
  "TFF Non-Reportable Mov Index Combined",
  ,
  "Dis Swap Dealer Mov Index Future",
  "Dis Swap Dealer Mov Index Combined",
  "Dis Money Manager Mov Index Future",
  "Dis Money Manager Mov Index Combined",
  "Dis Producer Mov Index Future",
  "Dis Producer Mov Index Combined",
  "Dis Others Mov Index Future",
  "Dis Others Mov Index Combined",
  "Dis Non-Reportable Mov Index Future",
  "Dis Non-Reportable Mov Index Combined",
  "LEG Mov Index Future",
  "LEG Mov Index Combined",
  "TFF Mov Index Future",
  "TFF Mov Index Combined",
  "Dis Mov Index Future",
  "Dis Mov Index Combined",
];
var eod_data = "";
var cftc_market = "";
class CotChart extends Component {
  state = {
    switchname: "",
    switchvalue: false,
    statedate: "",
    statevalue: "",
    gridstate: true,
    crossstate: true,
    volumeState: true,
    waterfallVolume: false,
    crossnumber: 2,
    selectedOI: "",
  };

  onChangescale(event) {
    if (event) {
      this.props.scalechanging(true);
    } else {
      this.props.scalechanging(false);
    }
  }

  gridonoff(status) {
    this.setState({
      gridstate: status,
    });
  }

  volumeOff(status) {
    console.log("STATUS -=>", status);
    if (status) {
      this.setState({
        volumeState: status,
      });
    } else {
      this.props.absolute(false);
      this.setState({
        volumeState: status,
      });
    }
  }

  waterfallVolumeOff(status) {
    this.setState({
      waterfallVolume: status,
    });
  }

  crossonoff(status, number) {
    this.setState({
      crossstate: status,
      crossnumber: number,
    });
  }
  cotscale = (event) => {
    if (event) {
      this.props.cotscale(true);
    } else {
      this.props.cotscale(false);
    }
  };

  handleIncreaseHeight = (event) => {
    if (event) {
      this.props.increaseheight(true);
    } else {
      this.props.increaseheight(false);
    }
  };
  handleAbsolute = (event) => {
    if (event) {
      this.setState({
        volumeState: true,
      });
      this.props.absolute(true);
    } else {
      this.props.absolute(false);
    }
  };

  cotgrid = (event) => {
    if (event) {
      this.props.cotgrid(true);
    } else {
      this.props.cotgrid(false);
    }
  };

  // for open interest chart over waterfall ------>start

  randomString(length) {
    var chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  getGraphData = (
    value,
    ticker_id,
    type,
    week,
    week1,
    group,
    uniquename,
    color = ""
  ) => {
    // if(!this.props.selectedGRAPH.includes(value)){
    // console.log('asplcot',value);
    var temp = this.props.selectedGRAPH;
    var test = temp.filter(function(temp) {
      return temp.uniquename == uniquename;
    });
    if (test.length == 0) {
      // console.log('asplvalue',value);
      this.props.loaderstatus(true);
      //this.props.cotloaderstatus(true);
      if (color != "") {
        var reqvar = {
          selectedGRAPH: value,
          ticker_id: ticker_id,
          type: type,
          week: week,
          week1: week1,
          group: group,
          uniquename: uniquename,
          color: color,
        };
      } else {
        var reqvar = {
          selectedGRAPH: value,
          ticker_id: ticker_id,
          type: type,
          week: week,
          week1: week1,
          group: group,
          uniquename: uniquename,
        };
      }
      this.props.getGraphData(reqvar);
    }
    // }
  };

  opencotmodal = (
    value,
    ticker_id,
    type,
    week,
    week1,
    name,
    group,
    uniquename,
    movindex
  ) => {
    // if(!this.props.selectedGRAPH.includes(value)){
    this.props.clearData();
    this.setState({ selectedOI: name });
    cotdataArrayOI = [];
    openIntrstArr = [];
    ciname = "";
    cinameOi = "";
    if (
      type == "static" ||
      type == "weighted" ||
      type == "spread" ||
      type == "pnetv" ||
      type == "funnell"
    ) {
      // console.log('asplopen',value);
      if (this.props.savestatus1) {
        this.props.savestatus(false);
      }
      // if (uniquename == "" && name === 'DIS OI Spread') {
      //   uniquename = 'DISSPREAD' + "_" + this.randomString(8);
      //   value = '5e3182db06935000e07106ed';
      // } else if (uniquename == "" && name === 'TFF OI Spread') {
      //   uniquename = 'TFFSPREAD' + "_" + this.randomString(8);
      //   value = '5e31745d06935000e07106dc';
      // } else if (uniquename == "") {
      //   uniquename = name + "_" + this.randomString(8);
      // }
      uniquename = name + "_" + this.randomString(8);
      this.getGraphData(value, ticker_id, type, week, week1, group, uniquename);
    } else {
      if (uniquename == "") {
        uniquename = name + "_" + this.randomString(8);
      }
      if (movindex) {
        this.setState({
          cotvalue: value,
          cotticker_id: ticker_id,
          cottype: type,
          cotweek: week,
          cotweek1: week1,
          cotgroup: group,
          uniquename: uniquename,
          showmovcotindicatorpopup: true,
        });
      } else {
        this.setState({
          cotvalue: value,
          cotticker_id: ticker_id,
          cottype: type,
          cotweek: week,
          cotweek1: week1,
          cotgroup: group,
          uniquename: uniquename,
          showcotindicatorpopup: true,
        });
      }
    }
    // }
  };

  removeOIChart = () => {
    // for OI remove class active/selected
    var eleOI = document.getElementById("open-interest");
    if (eleOI !== null) {
      // eleOI.classList.remove("ant-menu-submenu-active");
      eleOI.classList.remove("ant-menu-submenu-selected");
      eleOI.classList.add("my-style");
    }
    // for LEG OI remove class active/selected
    var eleLegOI = document.getElementById("LEG OI");
    if (eleLegOI !== null) {
      eleLegOI.classList.remove("ant-menu-item-active");
      eleLegOI.classList.remove("ant-menu-item-selected");
    }
    // for LEG Non Spread remove class active/selected
    var eleLegNS = document.getElementById("LEG OI non Spreading");
    if (eleLegNS !== null) {
      eleLegNS.classList.remove("ant-menu-item-active");
      eleLegNS.classList.remove("ant-menu-item-selected");
    }
    // for LEG Spread remove class active/selected
    var eleLegS = document.getElementById("LEGSPREAD");
    if (eleLegS !== null) {
      eleLegS.classList.remove("ant-menu-item-selected");
      eleLegS.classList.remove("ant-menu-item-active");
    }
    // for Disaggreagated OI remove class active/selected
    var eleDISOI = document.getElementById("DIS OI");
    if (eleDISOI !== null) {
      eleDISOI.classList.remove("ant-menu-item-active");
      eleDISOI.classList.remove("ant-menu-item-selected");
    }
    // for Disaggreagated Non Spread remove class active/selected
    var eleDISNS = document.getElementById("Dis OI non Spreading");
    if (eleDISNS !== null) {
      eleDISNS.classList.remove("ant-menu-item-active");
      eleDISNS.classList.remove("ant-menu-item-selected");
    }
    // for Disaggreagated Spread remove class active/selected
    var eleDISS = document.getElementById("DISSPREAD");
    if (eleDISS !== null) {
      eleDISS.classList.remove("ant-menu-item-active");
      eleDISS.classList.remove("ant-menu-item-selected");
    }
    // for TFF OI remove class active/selected
    var eleTFFOI = document.getElementById("TFF OI");
    if (eleTFFOI !== null) {
      eleTFFOI.classList.remove("ant-menu-item-active");
      eleTFFOI.classList.remove("ant-menu-item-selected");
    }
    // for TFF Non Spread remove class active/selected
    var eleTFFNS = document.getElementById("TFF OI non Spreading");
    if (eleTFFNS !== null) {
      eleTFFNS.classList.remove("ant-menu-item-active");
      eleTFFNS.classList.remove("ant-menu-item-selected");
    }
    // for TFF Spread remove class active/selected
    var eleTFFS = document.getElementById("TFFSPREAD");
    if (eleTFFS !== null) {
      eleTFFS.classList.remove("ant-menu-item-active");
      eleTFFS.classList.remove("ant-menu-item-selected");
    }
    // clearing the other data
    this.props.clearData();
    this.setState({ selectedOI: "" });
    cotdataArrayOI = [];
    openIntrstArr = [];
    ciname = "";
    cinameOi = "";
  };

  // iconReset = () => {
  //   var element = document.getElementById("verticalLine");
  //   element.classList.remove("active");
  //   var element = document.getElementById("horizontalLine");
  //   element.classList.remove("active");
  //   var element = document.getElementById("segmentLine");
  //   element.classList.remove("active");
  //   var element = document.getElementById("multipleLine");
  //   element.classList.remove("active");
  // };

  // addCotNet = (status, ticker_id) => {
  //   console.log("hello", status);
  //   console.log("tickerid", ticker_id);
  //   // this.iconReset();
  //   if (status) {
  //     var reqvar = {
  //       selectedGRAPH: "5eda27ee2e37d11194e78bf4",
  //       ticker_id: ticker_id,
  //       type: "static",
  //       week: 6,
  //       week1: 10,
  //       group: "Future",
  //       uniquename: "LEG Non-Commercial Net__" + this.randomString(8),
  //     };
  //     this.setState({
  //       cotnetkey: this.props.selectedGRAPH.length,
  //       cotnetstatus: true,
  //     });
  //     this.props.getGraphData(reqvar);
  //   } else {
  //     this.setState({ cotnetstatus: false });
  //     if (this.props.selectedGRAPH[this.state.cotnetkey]) {
  //       this.props.selectedGRAPH.splice(this.state.cotnetkey, 1);
  //     }
  //     if (cotdataArray[this.state.cotnetkey]) {
  //       cotdataArray.splice(this.state.cotnetkey, 1);
  //     }
  //     this.setState({ deletedchart: this.state.cotnetkey });
  //   }
  //   // this.getGraphData("5eda27ee2e37d11194e78bf4",ticker_id , 'static', 6,10,'Future','LEG Non-Commercial Net_3mo5X6LC')
  // };

  // for open interest chart over waterfall ------>end

  progressbar_remove() {
    this.props.progressbar(false);
  }
  createDrawing(plot, type) {
    plot.annotations().startDrawing(type);
  }
  createDrawing(plot, type, subtype = "") {
    if (type == "marker") {
      if (subtype == "arrowUp") {
        var color = "green";
        var size = 10;
      } else if (subtype == "arrowDown") {
        var color = "red";
        var size = 10;
      } else {
        var color = "black";
        var size = 5;
      }
      var typejson = {
        type: "marker",
        markerType: subtype,
        size: size,
        color: color,
      };
      plot.annotations().startDrawing(typejson);
    } else {
      plot.annotations().startDrawing({ type: type, color: "black" });
    }
  }

  removeDrawing(plot) {
    plot.annotations().removeAllAnnotations();
  }
  arrangegroup(index, status) {
    if (status) {
      this.props.arrangegroup(status);
      this.setState({
        visiblegroup: index,
      });
    } else {
      this.props.arrangegroup(status);
    }
  }

  showcottechnical = (key, plot, mapping, name) => {
    var joined1 = this.props.cottechnicalindicator;
    // console.log('asplas',name);
    if (joined1[name]) {
      var temp = joined1[name];

      if (key == "sma") {
        // console.log('asplaaa',temp.length);
        var test = temp.filter(function(temp) {
          return temp[0] == key;
        });
        if (test.length > 0) {
        } else {
          return false;
        }
      } else {
        if (joined1[name].length > 0) {
          return false;
        }
      }
    }
    var html = <div></div>;
    if (key == "oi" || key == "oicf" || key == "oisf") {
      // this.setState({recentname:name })
      this.addOIcottechnical(name, key);
    } else {
      if (ti[key]) {
        html = ti[key];
      }
      this.setState({
        recentcotindicator: key,
        recentplot: plot,
        recentmapping: mapping,
        recentname: name,
        showpopupcontent: html,
        showtechnicalindcatorpopup: true,
      });
    }
  };

  // addOIcottechnical = (name, key) => {
  //   //alert(this.state.recentindicator);
  //   var postData = [];
  //   postData[0] = key;
  //   postData[1] = "Open Interest";
  //   var joined1 = this.props.cottechnicalindicator;
  //   if (!joined1[name]) {
  //     joined1[name] = [];
  //   }
  //   joined1[name].push(postData);
  //   this.props.cottechindicator(joined1);
  //   if (this.props.savestatus1) {
  //     this.props.savestatus(false);
  //   }
  //   this.setState({ cottechnicalindicator: joined1 });
  // };

  getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => v === value && count++);
    return count;
  }

  changeCotColor = (color, key, color1) => {
    // this.setState({format: color.hex})
    if (this.props.selectedGRAPH[key]) {
      this.props.selectedGRAPH[key].color = color1.hex;
    }
    if (cotdataArray[key]) {
      cotdataArray[key].color = color1.hex;
    }
    this.setState({ changedColor: new Date() });
  };
  changedrawingcolor = (color) => {
    this.iconReset();
    this.setState({ drawingColor: color.hex, colorpanel: false });
    // console.log('asplaspl',color.hex)
  };

  render() {
    if (this.props.initialCot) {
      this.removeOIChart();
      this.props.setInitialCots(false);
    }
    // start get graphdata for open interest chart & assign it to blank array
    var family = localStorage.getItem("family");
    if (this.props.graphdata != "" || cotdataArrayOI.length > 0) {
      if (this.props.clearcotstatus.status) {
        cotdataArrayOI = [];
        this.props.clearcotstatus.status = false;
      }
      if (this.props.graphdata.length != "") {
        // cotdataArrayOI = [];
        cotdataArrayOI.push(this.props.graphdata);
        if (cotdataArrayOI.length > 0) {
          cotdataArrayOI.map((firstkey, mainitem) => {
            openIntrstArr.push(firstkey[0]);
            ciname = firstkey.ciname;
            cinameOi = ciname.substring(0, ciname.lastIndexOf(" "));
            if (cinameOi === "LEGSPREAD") {
              cinameOi = "LEG OI Spread";
            }
            if (cinameOi === "DISSPREAD") {
              cinameOi = "DIS OI Spread";
            }
            if (cinameOi === "TFFSPREAD") {
              cinameOi = "TFF OI Spread";
            }
          });
        }
        this.props.clearData();
      }
    } else {
      cotdataArrayOI = [];
      openIntrstArr = [];
      ciname = "";
      cinameOi = "";
    }
    // end get graphdata for open interest chart & assign it to blank array
    var grparray = [];
    var theme = localStorage.getItem("theme");
    var palette = anychart.palettes.defaultPalette;
    var fallingColor = palette[2];
    var risingColor = palette[0];
    var highlightColor = "white";
    var waterMarkColor = "#515F78";
    var gridColor = "#20314b";
    var pickerColors = [
      "#FFFFFF",
      "#FE5E9E",
      "#14C8FF",
      "#43F10D",
      "#FFFF00",
      "#FF8D2B",
    ];

    var cot_first_date = "";

    if (theme == "coffee") {
      anychart.theme(anychart.themes.coffee);
      palette = anychart.palettes.coffee;
      fallingColor = palette[1];
    } else if (theme == "light") {
      fallingColor = "#cf4140";
      risingColor = "green";
      highlightColor = "black";
      waterMarkColor = "#ACACAC";
    }
    if (this.props.tickerData[0]) {
      ticker_name = this.props.tickerData[0][0]["short_desc"];
      eod_data = this.props.tickerData[0][0]["eod_data"];
      cftc_market = this.props.tickerData[0][0]["cftc_market"];
      ticker_id = this.props.tickerData[0][0]["_id"];
    }

    if (this.props.acntdatadone.length > 0) {
      if (this.props.zoomdata[0].length > 0) {
        var priceData123 = this.props.zoomdata[0];
        var length = priceData123.length;
        var verticalline_date = priceData123[length - 1]["date"];
        var msftDataTable = anychart.data.table("date");
        msftDataTable.addData(priceData123);
        var chart1 = anychart.stock();
        // console.log("pricedata", msftDataTable);
        chart1.plotsManualBounds(true);
        chart1.interactivity("by-x");
        chart1.background().fill("#FFFFFF 0");

        chart1.title().fontSize(14);
        chart1.title().fontColor("#e06666");
        chart1.scroller().enabled(false);
        var xScale = chart1.xScale();

        // add items
        var xScale = chart1.xScale();
        var min = null;
        var max = null;
        var gap = null;
        chart1.contextMenu().itemsFormatter(function(items) {
          // starting index
          var index = items["zoom-marquee-start"].index;

          // add item with custom action
          items["zoomout"] = {
            text: "Zoom out",
            action: function() {
              max = xScale.getMaximum();
              min = xScale.getMinimum();
              gap = max - min;
              chart1.selectRange(min - gap * 0.1, max + gap * 0.1);
            },
            index: index + 0.01,
          };
          items["resize"] = {
            text: "Resize",
            action: function() {
              chart1.selectRange(
                xScale.getFullMinimum(),
                xScale.getFullMaximum()
              );
            },
            index: index + 0.02,
          };

          return items;
        });
        var mapping1 = msftDataTable.mapAs({
          open: "open",
          high: "high",
          low: "low",
          close: "close",
          openinterest: "openinterest",
          volume: "volumn",
          net_value: "net_value",
        });
        mapping1.addField("open", 1, "first");
        mapping1.addField("high", 2, "max");
        mapping1.addField("low", 3, "min");
        mapping1.addField("close", 4, "last");
        mapping1.addField("value", 4, "last");
        // chart1.plot(0).ha(mapping1);
        var map1 = msftDataTable.mapAs({ x: "date", value: "volumn" });
        var openmap = msftDataTable.mapAs({ x: "date", value: "openinterest" });
        mapping1.addField("value", 1);

        var firstPlot1 = chart1.plot(0);
        firstPlot1.yAxis().orientation("right");
        firstPlot1.xAxis().labels(false);
        firstPlot1.legend(true);
        if (this.props.splitscreen_status) {
          if (this.props.arrangegroup_status) {
            var height = 640;
            if (this.state.volumeState == true) {
              firstPlot1.bounds(0, 0, "46%", "50%");
            } else {
              firstPlot1.bounds(0, 0, "46%", "60%");
            }
          } else {
            if (this.props.increaseHeight) {
              var height = 2200;
            } else {
              var height = 1500;
              console.log("cot height----->", height);
            }
            if (this.state.volumeState == true) {
              firstPlot1.bounds(0, 0, "46%", "16%");
            } else {
              firstPlot1.bounds(0, 0, "46%", "22%");
            }
          }
        } else {
          if (this.props.bigchart) {
            var height = window.innerHeight - 110;
          } else {
            var height = 420;
          }
          firstPlot1.bounds(0, 0, "100%", "60%");
        }
        if (this.state.crossstate) {
          chart1.crosshair(this.state.crossstate);
          if (this.state.crossnumber == 1) {
            chart1.crosshair().yStroke(null);
          }
        } else {
          chart1.crosshair(this.state.crossstate);
        }
        firstPlot1.yAxis().orientation("right");
        firstPlot1
          .xAxis()
          .labels()
          .enabled(false);
        var series1 = firstPlot1.candlestick(
          msftDataTable.mapAs({
            high: "high",
            open: "open",
            low: "low",
            close: "close",
            net_value: "net_value",
          })
        );
        series1.name(ticker_name);
        series1.tooltip(false);
        series1.risingStroke(highlightColor);
        series1.fallingStroke(highlightColor);
        series1.risingFill(risingColor);
        series1.fallingFill(fallingColor);
        var tooltip1 = series1.tooltip();
        tooltip1.format(
          "{%seriesName} - Open : {%open} , Close : {%close} , High : {%high} , Low : {%low}  "
        );
        if (this.props.cotgridstatus) {
          firstPlot1.xGrid().enabled(true);
          firstPlot1.xGrid().stroke({
            // set stroke color
            color: "#2f3c55",
            // set dashes and gaps length
            dash: "2 5",
          });
          firstPlot1.yGrid().enabled(true);
          firstPlot1.yGrid().stroke({
            // set stroke color
            color: "#2f3c55",
            // set dashes and gaps length
            dash: "2 5",
          });
        }

        if (this.state.volumeState == true) {
          var volumePlot = chart1.plot(2);

          // volumePlot.height('30%');
          if (this.props.splitscreen_status && this.state.volumeState == true) {
            if (
              this.props.arrangegroup_status &&
              this.state.volumeState == true
            ) {
              volumePlot.bounds(0, "41%", "46%", "20%");
            } else {
              volumePlot.bounds(0, "16%", "46%", "7%");
            }
          }

          var watermark = chart1.label();
          watermark.useHtml(true);
          watermark.text(
            ticker_name +
              "<br><div class='watermark_bar' style='font-size: 16px'>" +
              cftc_market +
              " " +
              eod_data +
              "<br>PiaFx.com</div>"
          );
          watermark
            .letterSpacing("2px")
            .fontColor(waterMarkColor)
            // .fontOpacity(0.3)
            .fontSize(25)
            .disablePointerEvents(true)
            .fontWeight(900);
          watermark
            .anchor("left")
            .offsetX("5%")
            .offsetY("5%");

          volumePlot
            .yAxis()
            .labels()
            .format(function() {
              return anychart.format.number(this.value, NUMBER_FORMAT);
            });
          volumePlot
            .yAxis(1)
            .labels()
            .format(function() {
              return anychart.format.number(this.value, NUMBER_FORMAT);
            });
          if (this.props.absolute1 && this.state.volumeState == true) {
            volumePlot.title("Absolute Net & Volume");
          } else {
            volumePlot.title("Volume");
          }
          // //new added
          // var openseries = volumePlot.spline(msftDataTable.mapAs({x: 'date', value: 'openinterest'}));
          // openseries.name('OpenInterest');
          // openseries.tooltip(false);
          var volseries = volumePlot.column(map1);
          volseries.name("Volume");
          volseries.tooltip(false);
          var customScale = anychart.scales.linear();
          // sets y-scale
          volseries.yScale(customScale);
          volumePlot.yAxis(1).orientation("right");
          volumePlot.yAxis(1).scale(customScale);
          // // volumePlot.legend(false);
          var labels1 = volumePlot.xAxis().labels();
          labels1.enabled(false);
          volumePlot.xAxis(false);
        }

        // second Zoomed Chart
        if (this.props.splitscreen_status) {
          var firstPlot1_0 = chart1.plot(1);
          firstPlot1_0.yAxis().orientation("right");
          firstPlot1_0.xAxis().labels(false);
          firstPlot1_0.legend(true);

          if (this.props.arrangegroup_status) {
            if (this.state.volumeState == true) {
              console.log("test");
              firstPlot1_0.bounds("52%", 0, "46%", "50%");
            } else {
              console.log("test111");
              firstPlot1_0.bounds("52%", 0, "46%", "60%");
            }
          } else {
            if (this.state.volumeState == true) {
              firstPlot1_0.bounds("52%", 0, "46%", "16%");
            } else {
              firstPlot1_0.bounds("52%", 0, "46%", "22%");
            }
          }

          if (this.props.cotgridstatus) {
            firstPlot1_0.xGrid().enabled(true);
            firstPlot1_0.xGrid().stroke({
              // set stroke color
              color: "#2f3c55",
              // set dashes and gaps length
              dash: "2 5",
            });
            firstPlot1_0.yGrid().enabled(true);
            firstPlot1_0.yGrid().stroke({
              // set stroke color
              color: "#2f3c55",
              // set dashes and gaps length
              dash: "2 5",
            });
          }
          var series1_0 = firstPlot1_0.candlestick(
            msftDataTable.mapAs({
              high: "high",
              open: "open",
              low: "low",
              close: "close",
              net_value: "net_value",
            })
          );
          series1_0.name(ticker_name);
          series1_0.tooltip(false);
          series1_0.risingStroke(highlightColor);
          series1_0.fallingStroke(highlightColor);
          series1_0.risingFill(risingColor);
          series1_0.fallingFill(fallingColor);
          var tooltip1_0 = series1_0.tooltip();
          tooltip1_0.format(
            "{%seriesName} - Open : {%open} , Close : {%close} , High : {%high} , Low : {%low}  "
          );

          if (this.state.volumeState == true) {
            var volumePlot_1 = chart1.plot(3);

            if (this.props.absolute1 && this.state.volumeState == true) {
              volumePlot_1.title("Absolute Net & Volume");
            } else {
              volumePlot_1.title("Volume");
            }
            // volumePlot.height('30%');
            if (
              this.props.arrangegroup_status &&
              this.state.volumeState == true
            ) {
              volumePlot_1.bounds("52%", "41%", "46%", "20%");
            } else {
              volumePlot_1.bounds("52%", "16%", "46%", "7%");
            }

            volumePlot_1
              .yAxis()
              .labels()
              .format(function() {
                return anychart.format.number(this.value, NUMBER_FORMAT);
              });
            volumePlot_1
              .yAxis(1)
              .labels()
              .format(function() {
                return anychart.format.number(this.value, NUMBER_FORMAT);
              });
            // var openseries = volumePlot_1.spline(msftDataTable.mapAs({x: 'date', value: 'openinterest'}));
            // openseries.name('OpenInterest');
            // openseries.tooltip(false);
            var volseries_1 = volumePlot_1.column(map1);
            volseries_1.name("Volume");
            volseries_1.tooltip(false);
            volseries_1.yScale(customScale);
            volumePlot_1.yAxis(1).orientation("right");
            volumePlot_1.yAxis(1).scale(customScale);
            // // volumePlot_1.legend(false);
            var labels1 = volumePlot_1.xAxis().labels();
            labels1.enabled(false);
            volumePlot_1.xAxis(false);
          }
        }
        if (this.props.acntdatadone.length > 0) {
          this.props.acntdatadone[0].map((key, item) => {
            if (item % 2 == 0) {
            } else {
              var seriesname = key[0].name;
              var seriesshort =
                seriesname.split(" ").length <= 2
                  ? seriesname
                      .split(" ")
                      .slice(0, 1)
                      .join(" ")
                  : seriesname
                      .split(" ")
                      .slice(0, 2)
                      .join(" ");
              grparray.push({ key: item, group: seriesshort });
            }
          });
        }
        // var tooltip_vol= volseries_1.tooltip();
        // tooltip_vol.enabled(false);
        const changeOptions2 = (
          <Menu className="chart_hamburger_ul">
            <SubMenu
              className="gx-menu-horizontal"
              title={<span>Drawing Tools</span>}
            >
              <Menu.Item
                onClick={() => this.createDrawing(chart1, "horizontal-line")}
              >
                Horizontal Line
              </Menu.Item>
              <Menu.Item
                onClick={() => this.createDrawing(chart1, "vertical-line")}
              >
                Vertical Line
              </Menu.Item>
              <Menu.Item onClick={() => this.createDrawing(chart1, "line")}>
                Line Segment
              </Menu.Item>
              <Menu.Item
                onClick={() => this.createDrawing(chart1, "marker", "arrowUp")}
              >
                Marker Up
              </Menu.Item>
              <Menu.Item
                onClick={() =>
                  this.createDrawing(chart1, "marker", "arrowDown")
                }
              >
                Marker Down
              </Menu.Item>
              <Menu.Item
                onClick={() => this.createDrawing(chart1, "marker", "diamond")}
              >
                Diamond
              </Menu.Item>
              <Menu.Item
                onClick={() => this.createDrawing(chart1, "marker", "square")}
              >
                Square
              </Menu.Item>
              <Menu.Item
                onClick={() => this.createDrawing(chart1, "marker", "circle")}
              >
                Circle
              </Menu.Item>
              <Menu.Item onClick={() => this.removeDrawing(chart1)}>
                Remove All
              </Menu.Item>
            </SubMenu>
            {/* <SubMenu className="gx-menu-horizontal" title={<span> Grid</span>}>
              <Menu.Item onClick={() => this.gridonoff(true)}>ON</Menu.Item>
              <Menu.Item onClick={() => this.gridonoff(false)}>OFF</Menu.Item>
            </SubMenu> */}
            <SubMenu
              className="gx-menu-horizontal"
              title={<span> Cross Pointer</span>}
            >
              <Menu.Item onClick={() => this.crossonoff(true, 1)}>
                Vertical Cross
              </Menu.Item>
              <Menu.Item onClick={() => this.crossonoff(true, 2)}>
                Vertical & Horizontal Cross
              </Menu.Item>
              <Menu.Item onClick={() => this.crossonoff(false, 0)}>
                No Cross
              </Menu.Item>
            </SubMenu>
            {this.props.splitscreen_status ? (
              <SubMenu
                className="gx-menu-horizontal"
                title={<span> Scale </span>}
              >
                <Menu.Item onClick={(e) => this.cotscale(true)}>ON</Menu.Item>
                <Menu.Item onClick={(e) => this.cotscale(false)}>OFF</Menu.Item>
              </SubMenu>
            ) : null}
            {this.props.splitscreen_status ? (
              <SubMenu
                className="gx-menu-horizontal"
                title={<span> Grid </span>}
              >
                <Menu.Item onClick={(e) => this.cotgrid(true)}>ON</Menu.Item>
                <Menu.Item onClick={(e) => this.cotgrid(false)}>OFF</Menu.Item>
              </SubMenu>
            ) : null}
            {this.props.splitscreen_status ? (
              <SubMenu
                className="gx-menu-horizontal"
                title={<span> Absolute Net </span>}
              >
                <Menu.Item onClick={(e) => this.handleAbsolute(true)}>
                  ON
                </Menu.Item>
                <Menu.Item onClick={(e) => this.handleAbsolute(false)}>
                  OFF
                </Menu.Item>
              </SubMenu>
            ) : null}
            {this.props.splitscreen_status ? (
              <SubMenu
                className="gx-menu-horizontal"
                title={<span> Increase Height </span>}
              >
                <Menu.Item onClick={(e) => this.handleIncreaseHeight(true)}>
                  ON
                </Menu.Item>
                <Menu.Item onClick={(e) => this.handleIncreaseHeight(false)}>
                  OFF
                </Menu.Item>
              </SubMenu>
            ) : null}
            {this.props.splitscreen_status ? (
              <SubMenu
                className="gx-menu-horizontal"
                title={<span> Go Solo </span>}
              >
                {grparray.map((key, item) => {
                  return (
                    <Menu.Item onClick={() => this.arrangegroup(key.key, true)}>
                      {key.group}
                    </Menu.Item>
                  );
                })}
                <Menu.Item onClick={() => this.arrangegroup(0, false)}>
                  All Groups
                </Menu.Item>
              </SubMenu>
            ) : null}
            {this.props.splitscreen_status ? (
              <SubMenu
                className="gx-menu-horizontal"
                title={<span> Visualization </span>}
              >
                <Menu.Item onClick={() => this.onChangescale(true)}>
                  Up-Down
                </Menu.Item>
                <Menu.Item onClick={() => this.onChangescale(false)}>
                  Heikin-Ashi
                </Menu.Item>
              </SubMenu>
            ) : null}
            {this.props.splitscreen_status ? (
              <SubMenu
                className="gx-menu-horizontal"
                title={<span> Pricechart Volume </span>}
              >
                <Menu.Item onClick={() => this.volumeOff(true)}>ON</Menu.Item>
                <Menu.Item onClick={() => this.volumeOff(false)}>OFF</Menu.Item>
              </SubMenu>
            ) : null}
            {this.props.splitscreen_status ? (
              <SubMenu
                className="gx-menu-horizontal"
                title={<span> OI % </span>}
              >
                <Menu.Item onClick={() => this.waterfallVolumeOff(true)}>
                  ON
                </Menu.Item>
                <Menu.Item onClick={() => this.waterfallVolumeOff(false)}>
                  OFF
                </Menu.Item>
              </SubMenu>
            ) : null}
            {this.props.splitscreen_status
              ? this.props.cot_menulist.length > 0
                ? Object.keys(this.props.cot_menulist[0]).map((familyIndex) => {
                    var resFamily = family.split("_");
                    var whichFamily = resFamily[0].toUpperCase();
                    if (familyIndex === whichFamily) {
                      return (
                        <SubMenu
                          id="open-interest"
                          className="gx-menu-horizontal"
                          title={<span> Open Interest </span>}
                        >
                          {this.props.cot_menulist[0][familyIndex][
                            "Single Plot"
                          ]["Open Interest"].map((OImenu) => {
                            if (
                              OImenu["CoIn_Code"] != "LEGOISPRNET" &&
                              OImenu["CoIn_Code"] != "LEGOISPR" &&
                              OImenu["CoIn_Code"] != "DISOISPR" &&
                              OImenu["CoIn_Code"] != "TFFOISPR"
                            ) {
                              return (
                                <Menu.Item
                                  id={OImenu["Description"]}
                                  onClick={() => {
                                    OImenu["Description"] !==
                                    this.state.selectedOI
                                      ? family === "legacy_future_only" ||
                                        family === "tff_future_only" ||
                                        family ===
                                          "disaggregated_future_only_new"
                                        ? this.opencotmodal(
                                            OImenu["_id"].$oid,
                                            ticker_id,
                                            OImenu["type"],
                                            10,
                                            6,
                                            OImenu["Description"],
                                            "Future",
                                            "",
                                            true
                                          )
                                        : this.opencotmodal(
                                            OImenu["_id"].$oid,
                                            ticker_id,
                                            OImenu["type"],
                                            10,
                                            6,
                                            OImenu["Description"],
                                            "Combined",
                                            "",
                                            true
                                          )
                                      : this.removeOIChart();
                                  }}
                                >
                                  {OImenu["Description"] ===
                                  this.state.selectedOI
                                    ? "Remove " + OImenu["Description"]
                                    : OImenu["Description"]}
                                </Menu.Item>
                              );
                            }
                          })}
                          {this.props.cot_menulist[0][familyIndex][
                            "Multi Plot"
                          ].map((OImenu) => {
                            if (
                              OImenu["CoIn_Code"] == "LEGSPREAD" ||
                              OImenu["CoIn_Code"] == "DISSPREAD" ||
                              OImenu["CoIn_Code"] == "TFFSPREAD"
                            ) {
                              return (
                                <Menu.Item
                                  id={OImenu["Description"]}
                                  onClick={() => {
                                    OImenu["Description"] !==
                                    this.state.selectedOI
                                      ? family === "legacy_future_only" ||
                                        family === "tff_future_only" ||
                                        family ===
                                          "disaggregated_future_only_new"
                                        ? this.opencotmodal(
                                            OImenu["_id"].$oid,
                                            ticker_id,
                                            OImenu["type"],
                                            10,
                                            6,
                                            OImenu["Description"],
                                            "Future",
                                            "",
                                            true
                                          )
                                        : this.opencotmodal(
                                            OImenu["_id"].$oid,
                                            ticker_id,
                                            OImenu["type"],
                                            10,
                                            6,
                                            OImenu["Description"],
                                            "Combined",
                                            "",
                                            true
                                          )
                                      : this.removeOIChart();
                                  }}
                                >
                                  {OImenu["Description"] ===
                                  this.state.selectedOI
                                    ? "Remove " + OImenu["Description"]
                                    : OImenu["Description"]}
                                </Menu.Item>
                              );
                            }
                          })}
                        </SubMenu>
                      );
                    }
                  })
                : ""
              : null}
            ;
          </Menu>
        );

        newvar1 = (
          <div className="cust_price_chart">
            {
              <AnyChart
                // type="waterfall"
                id="longchart"
                width="100%"
                height={height}
                instance={chart1}
              />
            }
            <p>
              <Popover
                overlayClassName="gx-popover-horizantal chart_hamburger_menu"
                placement="bottomRight"
                content={changeOptions2}
                trigger="click"
              >
                <span className="gx-pointer gx-flex-row gx-align-items-center">
                  <i class="icon icon-menu" style={{ fontSize: "20px" }}></i>
                </span>
              </Popover>
            </p>
          </div>
        );
      }
    }
    var height = 0;
    var i = 1;

    var newvar = <div></div>;

    if (this.props.acntdatadone.length > 0) {
      height = cotdataArray.length * 300;

      // console.log("height", height);
      // var tooltip_str = "";
      newvar = (
        <>
          {/* switch for scalling */}
          <Row className={"scalechange"}>
            <Switch
              size="small"
              name={"scalechange"}
              onChange={(e) => this.onChangescale(e)}
            />
          </Row>
          {this.props.acntdatadone[0].map((key, item) => {
            if (item % 2 == 0) {
              var msftDataTable_candle = anychart.data.table("x");
              msftDataTable_candle.addData(key);
              if (this.props.absolute1) {
                var series5 = volumePlot.line(
                  msftDataTable_candle.mapAs({ value: "net_absolute" })
                );
                var seriesname = key[0].name;
                var r =
                  seriesname.split(" ").length <= 2
                    ? seriesname
                        .split(" ")
                        .slice(0, 1)
                        .join(" ")
                    : seriesname
                        .split(" ")
                        .slice(0, 2)
                        .join(" ");
                series5.name(
                  seriesname.split(" ").length <= 2
                    ? seriesname
                        .split(" ")
                        .slice(0, 1)
                        .join(" ")
                    : seriesname
                        .split(" ")
                        .slice(0, 2)
                        .join(" ")
                );
                series5.tooltip(false);
                if (
                  r == "Commercial Positions" ||
                  r == "Dealer" ||
                  r == "Producer/Merchant/Processor/User"
                ) {
                  series5.stroke("#ef6c00");
                }
                if (
                  r == "Noncommercial Positions" ||
                  r == "Leveraged Funds" ||
                  r == "Managed Money"
                ) {
                  series5.stroke("#64b5f6");
                }
                if (
                  r == "Nonreportable Positions" ||
                  r == "Non-Reportable" ||
                  r == "Non Reportables"
                ) {
                  series5.stroke("#455a64");
                }
                if (r == "Swap Dealers" || r == "Asset Manager") {
                  series5.stroke("#ffd54f");
                }
                if (r == "Other Reportables") {
                  series5.stroke("#1976d2");
                }
              }

              if (this.props.splitscreen_status) {
                if (this.props.arrangegroup_status) {
                  var tempitem = this.state.visiblegroup;
                  if (item == tempitem || item == tempitem - 1) {
                    var firstPlot3 = chart1.plot(4 + i++);
                    var mapping1 = msftDataTable_candle.mapAs({
                      value: "percentage",
                    });
                    // for fake waterfall volume ON and OFF ----> start

                    if (this.state.waterfallVolume == true) {
                      firstPlot3.bounds(0, "60%", "46%", "30%");
                    } else {
                      firstPlot3.bounds(0, "60%", "46%", "40%");
                    }
                    if (this.state.waterfallVolume == true) {
                      var firstPlot4 = chart1.plot(4 + i++);
                      firstPlot4.yAxis().orientation("right");

                      firstPlot4.bounds(0, "90%", "46%", "10%");

                      var series4 = firstPlot4.column(mapping1);
                      // series4.name("% of Tot OI");
                      series4.name("% of Side OI");

                      series4.tooltip(false);

                      var labels1 = firstPlot4.xAxis().labels();
                      labels1.enabled(false);
                      firstPlot4.xAxis(false);

                      var comp_series = firstPlot4.area(
                        msftDataTable_candle.mapAs({
                          value: "comp_percentage",
                        })
                      );
                      comp_series.tooltip(false);
                      // comp_series.name("% of Side OI");
                      comp_series.name("% of Tot OI");
                    }
                    // for fake waterfall volume ON and OFF ----> end

                    firstPlot3.xAxis().labels(false);
                    firstPlot3.legend(true);
                    firstPlot3.legend().useHtml(true);
                    firstPlot3.title().useHtml(true);
                    // configure the format of legend items

                    firstPlot3
                      .xAxis()
                      .labels()
                      .enabled(false);
                    firstPlot3
                      .title()
                      .fontFamily("Neue Haas Grotesk Display Pro");
                    firstPlot3.title(
                      "<span className='cust-hass-font'><strong>" +
                        key[0].name +
                        "</strong></span>"
                    );

                    // set right orientation start by goral
                    firstPlot3.yAxis().orientation("right");
                    firstPlot3
                      .yAxis()
                      .labels()
                      .format(function() {
                        return anychart.format.number(
                          this.value,
                          NUMBER_FORMAT
                        );
                      });
                    // set right orientation end by goral

                    var mapping = msftDataTable_candle.mapAs({
                      high: "high",
                      open: "open",
                      low: "low",
                      close: "close",
                      net_value: "net_value",
                      net_absolute: "net_absolute",
                      absolute: "absolute",
                      value: "value",
                    });

                    // chart1.plot(4 + i++).ha(mapping);
                    var series3 = firstPlot3.candlestick(mapping);
                    series3.name(key[0].name);
                    series3.risingStroke(highlightColor);
                    series3.fallingStroke(highlightColor);
                    series3.risingFill(risingColor);
                    series3.fallingFill(fallingColor);
                    var absolute_mapping = msftDataTable_candle.mapAs({
                      value: "net_absolute",
                    });
                    //start legacy open interest line chart for all long (go solo mode left side) chart by vasudev
                    if (openIntrstArr.length > 0) {
                      Object.keys(openIntrstArr[0]).map((item) => {
                        var lastIndex = key[0].name.lastIndexOf(" ");
                        var title = key[0].name.slice(0, lastIndex);
                        if (title === "Other Reportables") {
                          title = "Others";
                        }
                        if (title === "Asset Manager") {
                          title = "Asset Manager / Institutional";
                        }
                        if (title === "Dealer") {
                          title = "Dealer Intermediary";
                        }
                        if (title === "Noncommercial Positions") {
                          title = "Non-Commercial";
                        }
                        if (
                          item === title ||
                          item === "OI" ||
                          item === "OI Spread"
                        ) {
                          openIntrstArr[0][item].sort(function(a, b) {
                            return (
                              new Date(a["date"]).getTime() -
                              new Date(b["date"]).getTime()
                            );
                          });
                          var cotDataTable12 = anychart.data.table("date");
                          cotDataTable12.addData(openIntrstArr[0][item]);
                          //start line graph for OI
                          var cot_calculation = cotDataTable12.mapAs({
                            value: "calculation",
                          });
                          var series_cot = firstPlot3.spline(cot_calculation);
                          series_cot.connectMissingPoints(true);
                          //set time range for line chart by goral---->start
                          chart1.selectRange(
                            localStorage.getItem("startDate1"),
                            localStorage.getItem("endDate1")
                          );
                          //set time range for line chart by goral---->end
                          // series_cot.zIndex(10);
                          firstPlot3.yAxis(1).orientation("left");
                          firstPlot3
                            .yAxis(1)
                            .labels()
                            .format(function() {
                              return anychart.format.number(
                                this.value,
                                NUMBER_FORMAT
                              );
                            });
                          series_cot.tooltip(false);
                          series_cot.stroke("#e28026");
                          // series_cot.stroke("pink");
                          var customScale = anychart.scales.linear();
                          // sets y-scale
                          series_cot.yScale(customScale);
                          firstPlot3.yAxis(1).scale(customScale);
                          //end line graph for OI
                        }
                      });
                    }
                    //end legacy open interest line chart for all long (go solo mode side) chart by vasudev
                    // var absolute_series = firstPlot3.line(absolute_mapping);
                    // absolute_series.name(key[0].name);
                    // absolute_series.tooltip(false);
                    // var customScale = anychart.scales.linear();
                    // // sets y-scale
                    // absolute_series.yScale(customScale);
                    // firstPlot3.yAxis(1).orientation('right');
                    // firstPlot3.yAxis(1).scale(customScale);
                    // firstPlot3.yAxis(1).labels().format(function() {
                    //   return anychart.format.number(this.value, NUMBER_FORMAT);
                    // });

                    firstPlot3.legend().itemsFormat(function() {
                      var series = this.series;
                      if (series.getType() == "candlestick") {
                        return (
                          "<span style='color:#455a64;font-weight:600'>" +
                          series.name() +
                          ": </span>" +
                          "Value : " +
                          this.getData("value") +
                          " Absolute : " +
                          this.getData("absolute")
                        );
                      } else {
                        return cinameOi + ":" + this.value;
                      }
                    });

                    // var mapping1 = msftDataTable_candle.mapAs({
                    //   value: "percentage",
                    // });
                    // var series4 = firstPlot4.column(mapping1);
                    // series4.name("% of Tot OI");

                    // series4.tooltip(false);
                    series3.tooltip(false);
                    // var labels1 = firstPlot4.xAxis().labels();
                    // labels1.enabled(false);
                    // firstPlot4.xAxis(false);
                    var tooltip3 = series3.tooltip();
                    tooltip3.format(
                      "{%seriesName} - Net Value : {%net_value} ,  Net Absolute : {%net_absolute} , Absolute : {%absolute} , value : {%value} "
                    );

                    // var comp_series = firstPlot4.area(
                    //   msftDataTable_candle.mapAs({ value: "comp_percentage" })
                    // );
                    // comp_series.tooltip(false);
                    // comp_series.name("% of Side OI");
                    var zeroLine = firstPlot3.lineMarker();
                    zeroLine.value(0);
                    zeroLine.zIndex(1);
                    zeroLine.stroke("0.5 grey");
                    if (this.props.cotgridstatus) {
                      firstPlot3.xGrid().enabled(true);
                      firstPlot3.xGrid().stroke({
                        // set stroke color
                        color: "#2f3c55",
                        // set dashes and gaps length
                        dash: "2 5",
                      });
                      firstPlot3.yGrid().enabled(true);
                      firstPlot3.yGrid().stroke({
                        // set stroke color
                        color: "#2f3c55",
                        // set dashes and gaps length
                        dash: "2 5",
                      });
                    }
                    if (!this.props.cotscalestatus) {
                      var selectable = mapping.createSelectable();
                      selectable.selectAll();
                      var iterator = selectable.getIterator();

                      while (iterator.advance()) {
                        var high = iterator.get("high");

                        var close = iterator.get("close");
                        if (close > globalMax) {
                          globalMax = close;
                        }
                        if (high < globalMin) {
                          globalMin = high;
                        }
                      }
                      var selectable1 = mapping1.createSelectable();
                      selectable1.selectAll();
                      var iterator1 = selectable1.getIterator();

                      while (iterator1.advance()) {
                        var high1 = iterator1.get("value");
                        if (high1 > globalOIMax) {
                          globalOIMax = high1;
                        }
                      }
                    }
                    if (this.props.cotscalestatus) {
                      var yscale = series3.yScale();
                      yscale.maximum(globalMax);
                      yscale.minimum(globalMin);
                      if (this.state.waterfallVolume == true) {
                        var yscale1 = series4.yScale();
                        yscale1.maximum(globalOIMax);
                        yscale1.minimum(0);
                      }
                    }
                  }
                } else {
                  var firstPlot3 = chart1.plot(4 + i++);

                  var mapping1 = msftDataTable_candle.mapAs({
                    value: "percentage",
                  });

                  //start increase height of cot chart by goral
                  if (this.state.waterfallVolume == true) {
                    firstPlot3.bounds(
                      0,
                      parseInt(23) + 20 * Math.floor(item / 2) + "%",
                      "46%",
                      "15%"
                    );
                  } else {
                    firstPlot3.bounds(
                      0,
                      parseInt(23) + 15 * Math.floor(item / 2) + "%",
                      "46%",
                      "15%"
                    );
                  }

                  if (this.state.waterfallVolume == true) {
                    var firstPlot4 = chart1.plot(4 + i++);
                    firstPlot4.yAxis().orientation("right");

                    firstPlot4.bounds(
                      0,
                      parseInt(38) + 20 * Math.floor(item / 2) + "%",
                      "46%",
                      "4%"
                    );
                    //end increase height of cot chart by goral

                    var series4 = firstPlot4.column(mapping1);
                    // series4.name("% of Tot OI");
                    series4.name("% of Side OI");
                    series4.tooltip(false);
                    // series3.tooltip(false);
                    var labels1 = firstPlot4.xAxis().labels();
                    labels1.enabled(false);
                    firstPlot4.xAxis(false);
                    // var tooltip3 = series3.tooltip();
                    // tooltip3.format(
                    //   "{%seriesName} - Net Value : {%net_value} ,  Net Absolute : {%net_absolute} , Absolute : {%absolute} , value : {%value} "
                    // );
                    var comp_series = firstPlot4.area(
                      msftDataTable_candle.mapAs({ value: "comp_percentage" })
                    );
                    comp_series.tooltip(false);
                    // comp_series.name("% of Side OI");
                    comp_series.name("% of Tot OI");
                  }

                  firstPlot3.xAxis().labels(false);
                  firstPlot3.legend(true);
                  firstPlot3.legend().useHtml(true);
                  firstPlot3.title().useHtml(true);
                  // configure the format of legend items

                  firstPlot3
                    .xAxis()
                    .labels()
                    .enabled(false);
                  firstPlot3
                    .title()
                    .fontFamily("Neue Haas Grotesk Display Pro");
                  firstPlot3.title(
                    "<span className='cust-hass-font'><strong className='cust-hass-font'>" +
                      key[0].name +
                      "</strong></span>"
                  );
                  // set orientation right start by goral
                  firstPlot3.yAxis().orientation("right");
                  firstPlot3
                    .yAxis()
                    .labels()
                    .format(function() {
                      return anychart.format.number(this.value, NUMBER_FORMAT);
                    });
                  // set orientation right end by goral
                  var mapping = msftDataTable_candle.mapAs({
                    high: "high",
                    open: "open",
                    low: "low",
                    close: "close",
                    net_value: "net_value",
                    net_absolute: "net_absolute",
                    absolute: "absolute",
                    value: "value",
                  });
                  var series3 = firstPlot3.candlestick(mapping);
                  series3.name(key[0].name);
                  series3.risingStroke(highlightColor);
                  series3.fallingStroke(highlightColor);
                  series3.risingFill(risingColor);
                  series3.fallingFill(fallingColor);

                  //start legacy open interest line chart for all long (left side) chart by vasudev
                  if (openIntrstArr.length > 0) {
                    Object.keys(openIntrstArr[0]).map((item) => {
                      var lastIndex = key[0].name.lastIndexOf(" ");
                      var title = key[0].name.slice(0, lastIndex);
                      if (title === "Other Reportables") {
                        title = "Others";
                      }
                      if (title === "Asset Manager") {
                        title = "Asset Manager / Institutional";
                      }
                      if (title === "Dealer") {
                        title = "Dealer Intermediary";
                      }
                      if (title === "Noncommercial Positions") {
                        title = "Non-Commercial";
                      }
                      if (
                        item === title ||
                        item === "OI" ||
                        item === "OI Spread"
                      ) {
                        openIntrstArr[0][item].sort(function(a, b) {
                          return (
                            new Date(a["date"]).getTime() -
                            new Date(b["date"]).getTime()
                          );
                        });
                        var cotDataTable12 = anychart.data.table("date");
                        cotDataTable12.addData(openIntrstArr[0][item]);
                        //start line graph for OI
                        var cot_calculation = cotDataTable12.mapAs({
                          value: "calculation",
                        });
                        var series_cot = firstPlot3.spline(cot_calculation);
                        series_cot.connectMissingPoints(true);
                        //set time range for line chart by goral---->start
                        chart1.selectRange(
                          localStorage.getItem("startDate1"),
                          localStorage.getItem("endDate1")
                        );
                        //set time range for line chart by goral---->end
                        // series_cot.zIndex(10);
                        firstPlot3.yAxis(1).orientation("left");
                        firstPlot3
                          .yAxis(1)
                          .labels()
                          .format(function() {
                            return anychart.format.number(
                              this.value,
                              NUMBER_FORMAT
                            );
                          });
                        series_cot.tooltip(false);
                        series_cot.stroke("#e28026");
                        // series_cot.stroke("pink");
                        var customScale = anychart.scales.linear();
                        // sets y-scale
                        series_cot.yScale(customScale);
                        firstPlot3.yAxis(1).scale(customScale);
                        //end line graph for OI
                      }
                    });
                  }
                  //end legacy open interest line chart for all long (left side) chart by vasudev

                  firstPlot3.legend().itemsFormat(function() {
                    var series = this.series;
                    if (series.getType() == "candlestick") {
                      return (
                        "<span style='color:#455a64;font-weight:600'>" +
                        series.name() +
                        ": </span>" +
                        "Value :" +
                        this.getData("value") +
                        " Absolute : " +
                        this.getData("absolute")
                      );
                    } else {
                      return cinameOi + ":" + this.value;
                    }
                  });
                  // var mapping1 = msftDataTable_candle.mapAs({
                  //   value: "percentage",
                  // });
                  // var series4 = firstPlot4.column(mapping1);
                  // series4.name("% of Tot OI");

                  // series4.tooltip(false);
                  series3.tooltip(false);
                  // var labels1 = firstPlot4.xAxis().labels();
                  // labels1.enabled(false);
                  // firstPlot4.xAxis(false);
                  var tooltip3 = series3.tooltip();
                  tooltip3.format(
                    "{%seriesName} - Net Value : {%net_value} ,  Net Absolute : {%net_absolute} , Absolute : {%absolute} , value : {%value} "
                  );
                  // var comp_series = firstPlot4.area(
                  //   msftDataTable_candle.mapAs({ value: "comp_percentage" })
                  // );
                  // comp_series.tooltip(false);
                  // comp_series.name("% of Side OI");
                  var zeroLine = firstPlot3.lineMarker();
                  zeroLine.value(0);
                  zeroLine.stroke("0.5 grey");
                  if (this.props.cotgridstatus) {
                    firstPlot3.xGrid().enabled(true);
                    firstPlot3.xGrid().stroke({
                      // set stroke color
                      color: "#2f3c55",
                      // set dashes and gaps length
                      dash: "2 5",
                    });
                    firstPlot3.yGrid().enabled(true);
                    firstPlot3.yGrid().stroke({
                      // set stroke color
                      color: "#2f3c55",
                      // set dashes and gaps length
                      dash: "2 5",
                    });
                  }
                  if (!this.props.cotscalestatus) {
                    var selectable = mapping.createSelectable();
                    selectable.selectAll();
                    var iterator = selectable.getIterator();

                    while (iterator.advance()) {
                      var high = iterator.get("high");
                      var close = iterator.get("close");
                      if (high > globalMax) {
                        globalMax = high;
                      }
                      if (close < globalMin) {
                        globalMin = close;
                      }
                    }
                    var selectable1 = mapping1.createSelectable();
                    selectable1.selectAll();
                    var iterator1 = selectable1.getIterator();

                    while (iterator1.advance()) {
                      var high1 = iterator1.get("value");
                      if (high1 > globalOIMax) {
                        globalOIMax = high1;
                      }
                    }
                  }
                  if (this.props.cotscalestatus) {
                    var yscale = series3.yScale();
                    yscale.maximum(globalMax);
                    yscale.minimum(globalMin);
                    if (this.state.waterfallVolume == true) {
                      var yscale1 = series4.yScale();
                      yscale1.maximum(globalOIMax);
                      yscale1.minimum(0);
                    }
                  }
                }
              }
            } else {
              if (this.props.splitscreen_status) {
                var msftDataTable_candle = anychart.data.table("x");
                msftDataTable_candle.addData(key);
                if (this.props.absolute1) {
                  var series5 = volumePlot_1.line(
                    msftDataTable_candle.mapAs({ value: "net_absolute" })
                  );
                  var seriesname = key[0].name;
                  var seriesshort =
                    seriesname.split(" ").length <= 2
                      ? seriesname
                          .split(" ")
                          .slice(0, 1)
                          .join(" ")
                      : seriesname
                          .split(" ")
                          .slice(0, 2)
                          .join(" ");
                  series5.name(seriesshort);
                  series5.tooltip(false);
                  if (
                    seriesshort == "Commercial Positions" ||
                    seriesshort == "Dealer" ||
                    seriesshort == "Producer/Merchant/Processor/User"
                  ) {
                    series5.stroke("#ef6c00");
                  }
                  if (
                    seriesshort == "Noncommercial Positions" ||
                    seriesshort == "Leveraged Funds" ||
                    seriesshort == "Managed Money"
                  ) {
                    series5.stroke("#64b5f6");
                  }
                  if (
                    seriesshort == "Nonreportable Positions" ||
                    seriesshort == "Non-Reportable" ||
                    seriesshort == "Non Reportables"
                  ) {
                    series5.stroke("#455a64");
                  }
                  if (
                    seriesshort == "Swap Dealers" ||
                    seriesshort == "Asset Manager"
                  ) {
                    series5.stroke("#ffd54f");
                  }
                  if (seriesshort == "Other Reportables") {
                    series5.stroke("#1976d2");
                  }
                }
                if (this.props.arrangegroup_status) {
                  var tempitem = this.state.visiblegroup;
                  if (item == tempitem || item == tempitem - 1) {
                    var mapping1 = msftDataTable_candle.mapAs({
                      value: "percentage",
                    });
                    var firstPlot3 = chart1.plot(4 + i++);

                    // console.log('asplaspl1',parseInt(40) + 18*Math.floor(item/2));
                    if (this.state.waterfallVolume == true) {
                      firstPlot3.bounds("52%", "60%", "46%", "30%");
                    } else {
                      firstPlot3.bounds("52%", "60%", "46%", "40%");
                    }
                    if (this.state.waterfallVolume == true) {
                      var firstPlot4 = chart1.plot(4 + i++);

                      firstPlot4.yAxis().orientation("right");
                      firstPlot4.bounds("52%", "90%", "46%", "10%");
                      var mapping1 = msftDataTable_candle.mapAs({
                        value: "percentage",
                      });
                      var series4 = firstPlot4.column(mapping1);
                      series4.tooltip(false);
                      var labels1 = firstPlot4.xAxis().labels();
                      labels1.enabled(false);
                      firstPlot4.xAxis(false);
                      var comp_series = firstPlot4.area(
                        msftDataTable_candle.mapAs({ value: "comp_percentage" })
                      );
                      comp_series.tooltip(false);
                      // comp_series.name("% of Side OI");
                      comp_series.name("% of Tot OI");
                    }

                    firstPlot3.xAxis().labels(false);
                    firstPlot3.legend(true);
                    firstPlot3.legend().useHtml(true);
                    firstPlot3.title().useHtml(true);
                    // configure the format of legend items
                    var absolute_mapping = msftDataTable_candle.mapAs({
                      value: "net_absolute",
                    });
                    //start legacy open interest line chart for all long (go solo mode right side) chart by vasudev
                    if (openIntrstArr.length > 0) {
                      Object.keys(openIntrstArr[0]).map((item) => {
                        var lastIndex = key[0].name.lastIndexOf(" ");
                        var title = key[0].name.slice(0, lastIndex);
                        if (title === "Other Reportables") {
                          title = "Others";
                        }
                        if (title === "Asset Manager") {
                          title = "Asset Manager / Institutional";
                        }
                        if (title === "Dealer") {
                          title = "Dealer Intermediary";
                        }
                        if (title === "Noncommercial Positions") {
                          title = "Non-Commercial";
                        }
                        if (
                          item === title ||
                          item === "OI" ||
                          item === "OI Spread"
                        ) {
                          openIntrstArr[0][item].sort(function(a, b) {
                            return (
                              new Date(a["date"]).getTime() -
                              new Date(b["date"]).getTime()
                            );
                          });
                          var cotDataTable12 = anychart.data.table("date");
                          cotDataTable12.addData(openIntrstArr[0][item]);
                          //start line graph for OI
                          var cot_calculation = cotDataTable12.mapAs({
                            value: "calculation",
                          });
                          var series_cot = firstPlot3.spline(cot_calculation);
                          series_cot.connectMissingPoints(true);
                          //set time range for line chart by goral---->start
                          chart1.selectRange(
                            localStorage.getItem("startDate1"),
                            localStorage.getItem("endDate1")
                          );
                          //set time range for line chart by goral---->end
                          // series_cot.zIndex(10);
                          firstPlot3.yAxis(1).orientation("left");
                          firstPlot3
                            .yAxis(1)
                            .labels()
                            .format(function() {
                              return anychart.format.number(
                                this.value,
                                NUMBER_FORMAT
                              );
                            });
                          series_cot.tooltip(false);
                          series_cot.stroke("#e28026");
                          // series_cot.stroke("pink");
                          var customScale = anychart.scales.linear();
                          // sets y-scale
                          series_cot.yScale(customScale);
                          firstPlot3.yAxis(1).scale(customScale);
                          //end line graph for OI
                        }
                      });
                    }
                    //end legacy open interest line chart for all long (go solo mode right side) chart by vasudev
                    // var absolute_series = firstPlot3.line(absolute_mapping);
                    // absolute_series.name(key[0].name);
                    // absolute_series.tooltip(false);
                    // var customScale = anychart.scales.linear();
                    // // sets y-scale
                    // absolute_series.yScale(customScale);
                    // firstPlot3.yAxis(1).orientation('right');
                    // firstPlot3.yAxis(1).scale(customScale);
                    // firstPlot3.yAxis(1).labels().format(function() {
                    //   return anychart.format.number(this.value, NUMBER_FORMAT);
                    // });
                    firstPlot3.legend().itemsFormat(function() {
                      var series = this.series;
                      if (series.getType() == "candlestick") {
                        return (
                          "<span style='color:#455a64;font-weight:600'>" +
                          series.name() +
                          ": </span>" +
                          "Value : " +
                          this.getData("value") +
                          " Absolute : " +
                          this.getData("absolute")
                        );
                      } else {
                        return cinameOi + ":" + this.value;
                      }
                    });
                    firstPlot3
                      .title()
                      .fontFamily("Neue Haas Grotesk Display Pro");
                    firstPlot3.title(
                      "<span className='cust-hass-font'><strong>" +
                        key[0].name +
                        "</strong></span>"
                    );
                    firstPlot3
                      .xAxis()
                      .labels()
                      .enabled(false);
                    var mapping = msftDataTable_candle.mapAs({
                      high: "high",
                      open: "open",
                      low: "low",
                      close: "close",
                      net_value: "net_value",
                      net_absolute: "net_absolute",
                      absolute: "absolute",
                      value: "value",
                    });
                    var series3 = firstPlot3.candlestick(mapping);
                    series3.risingStroke(highlightColor);
                    series3.fallingStroke(highlightColor);
                    series3.risingFill(risingColor);
                    series3.fallingFill(fallingColor);
                    //set right orientation start by goral
                    firstPlot3.yAxis().orientation("right");
                    firstPlot3
                      .yAxis()
                      .labels()
                      .format(function() {
                        return anychart.format.number(
                          this.value,
                          NUMBER_FORMAT
                        );
                      });
                    //set right orientation end by goral
                    series3.name(key[0].name);
                    //grparray.push({key:item,group:seriesshort})
                    // var mapping1 = msftDataTable_candle.mapAs({
                    //   value: "percentage",
                    // });
                    // var series4 = firstPlot4.column(mapping1);
                    // series4.name("% of Tot OI");
                    // series4.tooltip(false);
                    series3.tooltip(false);
                    // var labels1 = firstPlot4.xAxis().labels();
                    // labels1.enabled(false);
                    // firstPlot4.xAxis(false);
                    // var comp_series = firstPlot4.area(
                    //   msftDataTable_candle.mapAs({ value: "comp_percentage" })
                    // );
                    // comp_series.tooltip(false);
                    // comp_series.name("% of Side OI");
                    var zeroLine = firstPlot3.lineMarker();
                    zeroLine.value(0);
                    zeroLine.stroke("0.5 grey");
                    var tooltip3 = series3.tooltip();
                    tooltip3.format(
                      "{%seriesName} - Net Value : {%net_value} ,  Net Absolute : {%net_absolute} , Absolute : {%absolute} , value : {%value} "
                    );
                    if (this.props.cotgridstatus) {
                      firstPlot3.xGrid().enabled(true);
                      firstPlot3.xGrid().stroke({
                        // set stroke color
                        color: "#2f3c55",
                        // set dashes and gaps length
                        dash: "2 5",
                      });
                      firstPlot3.yGrid().enabled(true);
                      firstPlot3.yGrid().stroke({
                        // set stroke color
                        color: "#2f3c55",
                        // set dashes and gaps length
                        dash: "2 5",
                      });
                    }
                    if (!this.props.cotscalestatus) {
                      var selectable = mapping.createSelectable();
                      selectable.selectAll();
                      var iterator = selectable.getIterator();
                      while (iterator.advance()) {
                        var high = iterator.get("high");
                        var close = iterator.get("close");
                        if (high > globalMax) {
                          globalMax = high;
                        }
                        if (close < globalMin) {
                          globalMin = close;
                        }
                      }
                      var selectable1 = mapping1.createSelectable();
                      selectable1.selectAll();
                      var iterator1 = selectable1.getIterator();
                      while (iterator1.advance()) {
                        var high1 = iterator1.get("value");
                        if (high1 > globalOIMax) {
                          globalOIMax = high1;
                        }
                      }
                    }
                    if (this.props.cotscalestatus) {
                      var yscale = series3.yScale();
                      yscale.maximum(globalMax);
                      yscale.minimum(globalMin);
                      if (this.state.waterfallVolume == true) {
                        var yscale1 = series4.yScale();
                        yscale1.maximum(globalOIMax);
                        yscale1.minimum(0);
                      }
                    }
                  }
                } else {
                  // var absolutearray = [];
                  // key.map((key1, item1) => {
                  //   absolutearray.push({x:key1['x'],net_absolute:(key1['net_absolute']*-1)})
                  // });
                  var msftDataTable_candle = anychart.data.table("x");
                  // var msftDataTable_candle1 = anychart.data.table('x');
                  msftDataTable_candle.addData(key);
                  // msftDataTable_candle1.addData(absolutearray);
                  var mapping1 = msftDataTable_candle.mapAs({
                    value: "percentage",
                  });
                  var firstPlot3 = chart1.plot(4 + i++);

                  // console.log('asplaspl1',parseInt(40) + 18*Math.floor(item/2));
                  if (this.state.waterfallVolume == true) {
                    firstPlot3.bounds(
                      "52%",
                      parseInt(23) + 20 * Math.floor(item / 2) + "%",
                      "46%",
                      "15%"
                    );
                  } else {
                    firstPlot3.bounds(
                      "52%",
                      parseInt(23) + 15 * Math.floor(item / 2) + "%",
                      "46%",
                      "15%"
                    );
                  }

                  if (this.state.waterfallVolume == true) {
                    var firstPlot4 = chart1.plot(4 + i++);
                    firstPlot4.yAxis().orientation("right");
                    firstPlot4.bounds(
                      "52%",
                      parseInt(38) + 20 * Math.floor(item / 2) + "%",
                      "46%",
                      "4%"
                    );

                    var series4 = firstPlot4.column(mapping1);
                    // series4.name("% of Tot OI");
                    series4.name("% of Side OI");
                    // firstPlot4.legend(false);
                    series4.tooltip(false);
                    // series3.tooltip(false);
                    var labels1 = firstPlot4.xAxis().labels();
                    labels1.enabled(false);
                    firstPlot4.xAxis(false);
                    var comp_series = firstPlot4.area(
                      msftDataTable_candle.mapAs({ value: "comp_percentage" })
                    );
                    comp_series.tooltip(false);
                    // comp_series.name("% of Side OI");
                    comp_series.name("% of Tot OI");
                    // var zeroLine = firstPlot3.lineMarker();
                    // zeroLine.value(0);
                    // zeroLine.stroke("0.5 grey");
                    // var tooltip3 = series3.tooltip();
                    // tooltip3.format(
                    //   "{%seriesName} - Net Value : {%net_value} ,  Net Absolute : {%net_absolute} , Absolute : {%absolute} , value : {%value} "
                    // );
                  }

                  firstPlot3.xAxis().labels(false);
                  firstPlot3.legend(true);
                  firstPlot3.legend().useHtml(true);
                  var title = firstPlot3.title();
                  title.useHtml(true);
                  title.enabled(true);
                  //start legacy open interest line chart for all long (right side) chart by vasudev
                  if (openIntrstArr.length > 0) {
                    Object.keys(openIntrstArr[0]).map((item) => {
                      var lastIndex = key[0].name.lastIndexOf(" ");
                      var title = key[0].name.slice(0, lastIndex);
                      if (title === "Other Reportables") {
                        title = "Others";
                      }
                      if (title === "Asset Manager") {
                        title = "Asset Manager / Institutional";
                      }
                      if (title === "Dealer") {
                        title = "Dealer Intermediary";
                      }
                      if (title === "Noncommercial Positions") {
                        title = "Non-Commercial";
                      }
                      if (
                        item === title ||
                        item === "OI" ||
                        item === "OI Spread"
                      ) {
                        openIntrstArr[0][item].sort(function(a, b) {
                          return (
                            new Date(a["date"]).getTime() -
                            new Date(b["date"]).getTime()
                          );
                        });
                        var cotDataTable12 = anychart.data.table("date");
                        cotDataTable12.addData(openIntrstArr[0][item]);
                        //start line graph for OI
                        var cot_calculation = cotDataTable12.mapAs({
                          value: "calculation",
                        });
                        var series_cot = firstPlot3.spline(cot_calculation);
                        series_cot.connectMissingPoints(true);
                        //set time range for line chart by goral---->start
                        chart1.selectRange(
                          localStorage.getItem("startDate1"),
                          localStorage.getItem("endDate1")
                        );
                        //set time range for line chart by goral---->end
                        // series_cot.zIndex(10);
                        firstPlot3.yAxis(1).orientation("left");
                        firstPlot3
                          .yAxis(1)
                          .labels()
                          .format(function() {
                            return anychart.format.number(
                              this.value,
                              NUMBER_FORMAT
                            );
                          });
                        series_cot.tooltip(false);
                        series_cot.stroke("#e28026");
                        // series_cot.stroke("pink");
                        var customScale = anychart.scales.linear();
                        // sets y-scale
                        series_cot.yScale(customScale);
                        firstPlot3.yAxis(1).scale(customScale);
                        //end line graph for OI
                      }
                    });
                  }
                  //end legacy open interest line chart for all long (right side) chart by vasudev
                  // var absolute_mapping = msftDataTable_candle1.mapAs({'value': 'net_absolute'});
                  // var absolute_series = firstPlot3.line(absolute_mapping);
                  // absolute_series.name(key[0].name);
                  // absolute_series.tooltip(false);
                  // var customScale = anychart.scales.linear();
                  // // sets y-scale
                  // absolute_series.yScale(customScale);
                  // firstPlot3.yAxis(1).orientation('right');
                  // firstPlot3.yAxis(1).scale(customScale);
                  // firstPlot3.yAxis(1).labels().format(function() {
                  //   return anychart.format.number(this.value, NUMBER_FORMAT);
                  // });
                  firstPlot3.legend().itemsFormat(function() {
                    var series = this.series;
                    if (series.getType() == "candlestick") {
                      return (
                        "<span style='color:#455a64;font-weight:600'>" +
                        series.name() +
                        ": </span>" +
                        "Value : " +
                        this.getData("value") +
                        " Absolute : " +
                        this.getData("absolute")
                      );
                    } else {
                      return cinameOi + ":" + this.value;
                    }
                  });
                  firstPlot3
                    .title()
                    .fontFamily("Neue Haas Grotesk Display Pro");
                  title.text(
                    "<span class='chart_title'><strong>" +
                      key[0].name +
                      "</strong></span>"
                  );

                  firstPlot3
                    .xAxis()
                    .labels()
                    .enabled(false);
                  var mapping = msftDataTable_candle.mapAs({
                    high: "high",
                    open: "open",
                    low: "low",
                    close: "close",
                    net_value: "net_value",
                    net_absolute: "net_absolute",
                    absolute: "absolute",
                    value: "value",
                  });

                  var series3 = firstPlot3.candlestick(mapping);
                  series3.risingStroke(highlightColor);
                  series3.fallingStroke(highlightColor);
                  series3.risingFill(risingColor);
                  series3.fallingFill(fallingColor);
                  // set orientation right start by goral
                  firstPlot3.yAxis().orientation("right");
                  firstPlot3
                    .yAxis()
                    .labels()
                    .format(function() {
                      return anychart.format.number(this.value, NUMBER_FORMAT);
                    });
                  // set orientation right end by goral
                  series3.name(key[0].name);
                  // var series5 = volumePlot_1.line(msftDataTable_candle.mapAs({ 'value': 'net_absolute'}));
                  // var seriesname = key[0].name;
                  // var seriesshort = seriesname.split(' ').length<=2?seriesname.split(' ').slice(0,1).join(' '):seriesname.split(' ').slice(0,2).join(' ');
                  // series5.name(seriesshort);
                  // series5.tooltip(false);
                  //grparray.push({key:item,group:seriesshort})

                  // var mapping1 = msftDataTable_candle.mapAs({
                  //   value: "percentage",
                  // });
                  // var series4 = firstPlot4.column(mapping1);
                  // series4.name("% of Tot OI");
                  // // firstPlot4.legend(false);
                  // series4.tooltip(false);
                  series3.tooltip(false);
                  // var labels1 = firstPlot4.xAxis().labels();
                  // labels1.enabled(false);
                  // firstPlot4.xAxis(false);
                  // var comp_series = firstPlot4.area(
                  //   msftDataTable_candle.mapAs({ value: "comp_percentage" })
                  // );
                  // comp_series.tooltip(false);
                  // comp_series.name("% of Side OI");
                  var zeroLine = firstPlot3.lineMarker();
                  zeroLine.value(0);
                  zeroLine.stroke("0.5 grey");
                  var tooltip3 = series3.tooltip();
                  tooltip3.format(
                    "{%seriesName} - Net Value : {%net_value} ,  Net Absolute : {%net_absolute} , Absolute : {%absolute} , value : {%value} "
                  );
                  if (this.props.cotgridstatus) {
                    firstPlot3.xGrid().enabled(true);
                    firstPlot3.xGrid().stroke({
                      // set stroke color
                      color: "#2f3c55",
                      // set dashes and gaps length
                      dash: "2 5",
                    });
                    firstPlot3.yGrid().enabled(true);
                    firstPlot3.yGrid().stroke({
                      // set stroke color
                      color: "#2f3c55",
                      // set dashes and gaps length
                      dash: "2 5",
                    });
                  }
                  if (!this.props.cotscalestatus) {
                    var selectable = mapping.createSelectable();
                    selectable.selectAll();
                    var iterator = selectable.getIterator();

                    while (iterator.advance()) {
                      var high = iterator.get("high");
                      var close = iterator.get("close");
                      if (high > globalMax) {
                        globalMax = high;
                      }
                      if (close < globalMin) {
                        globalMin = close;
                      }
                    }
                    var selectable1 = mapping1.createSelectable();
                    selectable1.selectAll();
                    var iterator1 = selectable1.getIterator();

                    while (iterator1.advance()) {
                      var high1 = iterator1.get("value");
                      if (high1 > globalOIMax) {
                        globalOIMax = high1;
                      }
                    }
                  }
                  if (this.props.cotscalestatus) {
                    var yscale = series3.yScale();
                    yscale.maximum(globalMax);
                    yscale.minimum(globalMin);
                    if (this.state.waterfallVolume == true) {
                      var yscale1 = series4.yScale();
                      yscale1.maximum(globalOIMax);
                      yscale1.minimum(0);
                    }
                  }
                }
              }
            }
          })}
        </>
      );
    }

    return (
      <div style={{ width: "100%" }}>
        <div>
          <Row>
            <Col lg={24}> {newvar1} </Col>
          </Row>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    initialCot: state.Exchange.setInitialCot,
    absolute1: state.Exchange.absolute,
    increaseHeight: state.Exchange.increaseheight,
    cotscalestatus: state.Exchange.cotscalestatus,
    cotgridstatus: state.Exchange.cotgridstatus,
    bigchart: state.Exchange.bigchart,
    splitscreen_status: state.Exchange.splitscreen_status,
    arrangegroup_status: state.Exchange.arrangegroup_status,
    progress: state.Exchange.progress,
    moveDate: state.Exchange.moveDate,
    scalechange: state.Exchange.scalechange,
    global: state.Exchange.global,
    cotData: state.Exchange.cotData,
    selectedGRAPH: state.Exchange.selectedGRAPH,
    graphdata: state.Exchange.graphdata,
    clearcotstatus: state.Exchange.clearcotstatus,
    cottechnicalindicator: state.Exchange.cottechnicalindicator,
    scrollData: state.Exchange.scrollData,
    cotforecast: state.Exchange.cotforecast,
    drawingArray: state.Exchange.drawingArray,
    priceData: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "tickers_search")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
      }),
    acntdatadone: Object.keys(state.Exchange.acntdatadone)
      .filter((acntdatadoneIndex) => acntdatadoneIndex == "cotdata")
      .map((acntdatadoneIndex) => {
        return state.Exchange.acntdatadone[acntdatadoneIndex];
      }),
    zoomdata: Object.keys(state.Exchange.acntdatadone)
      .filter((acntdatadoneIndex) => acntdatadoneIndex == "tickers_search")
      .map((acntdatadoneIndex) => {
        return state.Exchange.acntdatadone[acntdatadoneIndex];
      }),
    tickerData: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "tickers_details")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
      }),
    cot_menulist: Object.keys(state.Exchange.pricecotData)
      .filter((priceDataIndex) => priceDataIndex == "cot_data")
      .map((priceDataIndex) => {
        return state.Exchange.pricecotData[priceDataIndex];
      }),
  };
};
export default connect(
  mapStateToProps,
  {
    progressbar,
    scalechanging,
    arrangegroup,
    cotscale,
    cotgrid,
    getGraphData,
    loaderstatus,
    clearData,
    absolute,
    increaseheight,
    setInitialCots,
  }
)(CotChart);
