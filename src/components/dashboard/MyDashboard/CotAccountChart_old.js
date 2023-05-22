import React, { Component } from "react";
import AnyChart from "anychart-react";
import anychart from "anychart";
import { Switch, Col, Row, Progress, Popover, Menu } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { progressbar, arrangegroup } from "appRedux/actions/Exchange";
import SubMenu from "antd/lib/menu/SubMenu";

// var cotdataArray = [];
// // var globalMax = 0;
// // var globalMin = 0;

// var globalMax = 0;
// var globalOIMax = 0;
// var globalMin = 0;
// const NUMBER_FORMAT = {
//   scale: {
//     factors: [1e9, 1e6, 1e3, 1],
//     suffixes: ["B", "M", "K", ""],
//   },
//   decimalsCount: 0,
// };

var cotdataArray = [];
var globalMax = 0;
var globalOIMax = 0;
var globalMin = 0;
var grpmenu = "";
const NUMBER_FORMAT = {
  scale: {
    factors: [1e9, 1e6, 1e3, 1],
    suffixes: ["B", "M", "K", ""],
  },
  decimalsCount: 0,
};
var newvar1 = <div></div>;
var ticker_name = "";
var ticker_id = "";
var eod_data = "";
var cftc_market = "";

class CotChart extends Component {
  state = {
    switchname: "",
    switchvalue: false,
    statedate: "",
    statevalue: "",
    gridstate: true,
  };

  // onChangecolormain(chart, event, name) {
  //   if (event) {
  //     this.setState({
  //       [name]: true,
  //       switchvalue: true,
  //     });
  //     if (
  //       this.props.moveDate.moveDate != "" ||
  //       this.props.moveDate.moveDate != undefined
  //     ) {
  //       chart.background().fill("#ffffff");
  //     }
  //   } else {
  //     this.setState({
  //       [name]: false,
  //       switchvalue: false,
  //     });
  //     if (
  //       this.props.moveDate.moveDate != "" ||
  //       this.props.moveDate.moveDate != undefined
  //     ) {
  //       chart.background().fill("#FFFFFF 0");
  //     }
  //   }
  // }
  componentDidMount() {
    //this.props.progressbar(false);
    //window.addEventListener('load', this.progressbar_remove());
  }
  chartchange(series, value) {
    series.seriesType(value);
  }
  open1o1modal(i, group) {
    localStorage.setItem("group", group);
    localStorage.setItem("cotaccountancy", i);
    var array = [];
    array.push(this.props.acntdatadone[0][i - 2]);
    array.push(this.props.acntdatadone[0][i - 1]);
    localStorage.setItem("cotacntstate", JSON.stringify(array));
    localStorage.setItem(
      "cotacntpricestate",
      JSON.stringify(this.props.priceData)
    );
  }
  onChangescale(event) {
    if (event) {
      this.setState({
        scalechecked: true,
      });
    } else {
      this.setState({
        scalechecked: false,
      });
    }
  }
  gridonoff(firstPlot, status) {
    this.setState({
      gridstate: status,
    });
  }
  comparechart(event, i) {
    var a = i;
    var b = i - 1;

    if (event) {
      document.getElementById("cotchart_" + a).style.display = "none";
      document.getElementById("cotchart_" + b).style.display = "none";
    } else {
      document.getElementById("cotchart_" + a).style.display = "block";
      document.getElementById("cotchart_" + b).style.display = "block";
    }
  }
  progressbar_remove() {
    this.props.progressbar(false);
  }
  preprocess(key) {
    var previous;
    for (var i = 0; i < key.length; i++) {
      if (i) {
        previous += parseInt(key[i].value);
        key[i].absolute = previous;
      } else {
        previous = parseInt(key[i].value);
        key[i].absolute = previous;
      }
    }
  }
  createDrawing(plot, type) {
    plot.annotations().startDrawing(type);
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

  render() {
    // var grparray = [];
    // var newvar1 = <div></div>;
    // var newvar2 = <div></div>;
    // var ticker_name = "";
    // var ticker_id = "";
    // var eod_data = "";
    // var cftc_market = "";
    // var enddate = "";
    // var palette = anychart.palettes.defaultPalette;
    // var fallingColor = palette[2];
    // var risingColor = palette[0];
    // var highlightColor = "white";
    // var theme = localStorage.getItem("theme");

    // if (this.props.tickerData[0]) {
    //   ticker_name = this.props.tickerData[0][0]["ticker_name"];
    //   eod_data = this.props.tickerData[0][0]["eod_data"];
    //   cftc_market = this.props.tickerData[0][0]["cftc_market"];
    //   ticker_id = this.props.tickerData[0][0]["_id"];
    // }
    // if (this.props.acntdatadone.length > 0) {
    //   if (this.props.zoomdata[0].length > 0) {
    //     const NUMBER_FORMAT = {
    //       scale: {
    //         factors: [1e9, 1e6, 1e3, 1],
    //         suffixes: ["B", "M", "K", ""],
    //       },
    //       decimalsCount: 0,
    //     };
    //     var priceData = this.props.zoomdata[0];
    //     var length = priceData.length;
    //     var verticalline_date = priceData[length - 1]["date"];
    //     var msftDataTable = anychart.data.table("date");
    //     msftDataTable.addData(priceData);
    //     var chart1 = anychart.stock();
    //     chart1.interactivity("by-x");
    //     chart1.background().fill("#FFFFFF 0");
    //     chart1.title().fontSize(14);
    //     chart1.title().fontColor("#e06666");
    //     var scrollermain = chart1.scroller();
    //     // chart1.scroller().maxHeight(20);
    //     // chart1.scroller().orientation("top");
    //     chart1.scroller().enabled(false);
    //     var xScale = chart1.xScale();
    //     var marker;

    //     // add items
    //     var xScale = chart1.xScale();
    //     var min = null;
    //     var max = null;
    //     var gap = null;
    //     chart1.contextMenu().itemsFormatter(function(items) {
    //       // starting index
    //       var index = items["zoom-marquee-start"].index;

    //       // add item with custom action
    //       items["zoomout"] = {
    //         text: "Zoom out",
    //         action: function() {
    //           max = xScale.getMaximum();
    //           min = xScale.getMinimum();
    //           gap = max - min;
    //           chart1.selectRange(min - gap * 0.1, max + gap * 0.1);
    //         },
    //         index: index + 0.01,
    //       };
    //       items["resize"] = {
    //         text: "Resize",
    //         action: function() {
    //           chart1.selectRange(
    //             xScale.getFullMinimum(),
    //             xScale.getFullMaximum()
    //           );
    //         },
    //         index: index + 0.02,
    //       };

    //       return items;
    //     });
    //     // scrollermain.listen('scrollerChange', (e) => {
    //     //   if (e.startRatio != 0 || e.endRatio != 1) {
    //     //     // alert('hi');
    //     //     // scroller.container('container').draw();
    //     //     var fullMin = xScale.getFullMinimum();
    //     //     var fullMax = xScale.getFullMaximum();
    //     //     var fullRange = fullMax - fullMin;
    //     //     // marker = firstPlot.rangeMarker(0);
    //     //     startdatetimestamp = fullMin + fullRange * e.startRatio;
    //     //     // marker.from(startdate);
    //     //     var startdate = new Date(startdatetimestamp);
    //     //     var startmonth = startdate.getMonth()+parseInt(1) > 9 ? startdate.getMonth()+parseInt(1) : "0" + (startdate.getMonth()+parseInt(1));
    //     //     var start_date = startdate.getDate() > 9 ? startdate.getDate() : "0" + startdate.getDate();
    //     //     startdate = startdate.getFullYear() + '-' + startmonth + '-' + start_date;
    //     //     enddatetimestamp = fullMin + fullRange * e.endRatio;
    //     //     // marker.to(enddate);
    //     //     var enddate = new Date(enddatetimestamp);
    //     //     var endmonth = (enddate.getMonth()+parseInt(1)) > 9 ? enddate.getMonth()+parseInt(1) : "0" + (enddate.getMonth()+parseInt(1));
    //     //     var end_date = enddate.getDate() > 9 ? enddate.getDate() : "0" + enddate.getDate();
    //     //     enddate = enddate.getFullYear() + '-' + endmonth + '-' + end_date;

    //     //     // marker.fill("#fcd8d7");
    //     //     // marker.axis(firstPlot.xAxis());
    //     //     //localStorage.setItem('startdate',startdate);
    //     //     //localStorage.setItem('enddate',enddate);
    //     //     // this.setState({d:1});
    //     //     var data = {startdate:startdate,enddate:enddate};
    //     //     this.props.scrollDates(data);
    //     //   }
    //     //   // else if (marker) {
    //     //   //   marker.dispose();
    //     //   // }
    //     // });

    //     // chart1.listen("selectedrangechangefinish", (e)=>{

    //     //   var startRatio = anychart.format.dateTime(e.firstSelected, 'dd MMM yyyy');
    //     //   var endRatio = anychart.format.dateTime(e.lastSelected, 'dd MMM yyyy');
    //     //   var data = { start : startRatio, end : endRatio};
    //     //   this.props.changeScroller(data);

    //     // });
    //     // chart1.tooltip().useHtml(true);
    //     var tooltip1 = chart1.tooltip();
    //     tooltip1.displayMode("union");
    //     tooltip1.positionMode("chart");
    //     tooltip1.anchor("right-top");
    //     tooltip1.position("right-top");

    //     var firstPlot1 = chart1.plot(0);
    //     firstPlot1.height("70%");
    //     firstPlot1.xAxis().labels(false);
    //     firstPlot1.legend(false);
    //     // firstPlot1.yAxis().labels().position("inside");
    //     firstPlot1
    //       .xAxis()
    //       .labels()
    //       .enabled(false);

    //     var controller = firstPlot1.annotations();
    //     // create a Vertical Line annotation
    //     var date = "2016-07-12";
    //     var verticalLine2 = controller.verticalLine({
    //       xAnchor: this.state.linedate
    //         ? this.state.linedate
    //         : verticalline_date,
    //       // allowEdit: false,
    //     });

    //     var mapping1 = msftDataTable.mapAs({
    //       open: "open",
    //       high: "high",
    //       low: "low",
    //       close: "close",
    //       openinterest: "openinterest",
    //       volume: "volumn",
    //     });
    //     var map1 = msftDataTable.mapAs({ x: "date", value: "volumn" });
    //     var openmap = msftDataTable.mapAs({ x: "date", value: "openinterest" });
    //     mapping1.addField("value", 1);
    //     var series1 = firstPlot1.candlestick(
    //       msftDataTable.mapAs({
    //         open: "open",
    //         high: "high",
    //         low: "low",
    //         close: "close",
    //       })
    //     );
    //     var state1 = series1.normal();

    //     state1.fallingFill({
    //       keys: ["#CF4140"],
    //     });
    //     state1.risingFill({
    //       keys: ["#008000"],
    //     });
    //     state1.risingStroke({
    //       keys: ["#000000"],
    //     });
    //     state1.fallingStroke({
    //       keys: ["#000000"],
    //     });

    //     series1.name("MSFT");

    //     var volumePlot = chart1.plot(1);
    //     volumePlot.height("30%");
    //     var volseries = volumePlot.column(map1);
    //     volseries.name("Volume");
    //     volumePlot
    //       .crosshair()
    //       .yLabel()
    //       .format(function() {
    //         return anychart.format.number(this.value, NUMBER_FORMAT);
    //       });
    //     volumePlot
    //       .yAxis()
    //       .labels()
    //       .format(function() {
    //         return anychart.format.number(this.value, NUMBER_FORMAT);
    //       });
    //     var openseries = volumePlot.spline(
    //       msftDataTable.mapAs({ x: "date", value: "openinterest" })
    //     );
    //     openseries.name("OpenInterest");
    //     var customScale = anychart.scales.linear();
    //     // sets y-scale
    //     volseries.yScale(customScale);
    //     volumePlot.yAxis(1).orientation("right");
    //     volumePlot.yAxis(1).scale(customScale);

    //     chart1.listen("annotationChangefinish", (e) => {
    //       var selectable = mapping1.createSelectable();
    //       var interval = chart1.grouping().getCurrentDataInterval();
    //       selectable.selectAll(interval.unit, interval.count); //interval.count
    //       var select = selectable.search(e.annotation.xAnchor(), "nearest");
    //       //var value = select.get('value');
    //       var key = select.getKey();
    //       var pointDate = new Date(e.annotation.xAnchor());
    //       // var pointDate = new Date(key);
    //       var month =
    //         String(pointDate.getMonth() + 1) < 10
    //           ? "0" + String(pointDate.getMonth() + 1)
    //           : String(pointDate.getMonth() + 1);
    //       var pointDateString =
    //         String(
    //           pointDate.getDate() < 10
    //             ? "0" + pointDate.getDate()
    //             : pointDate.getDate()
    //         ) +
    //         "-" +
    //         month +
    //         "-" +
    //         String(pointDate.getFullYear());
    //       var pointDateString1 =
    //         String(pointDate.getFullYear()) +
    //         "-" +
    //         month +
    //         "-" +
    //         String(
    //           pointDate.getDate() < 10
    //             ? "0" + pointDate.getDate()
    //             : pointDate.getDate()
    //         );
    //       // value = select.Mf.values[0];
    //       //var reqvar = { moveDate : pointDateString }
    //       //this.props.getmoveDate(reqvar)

    //       this.setState({
    //         linedate: pointDateString1,
    //         // statevalue: value,
    //       });

    //       //chart1.title(' Date: ' + pointDateString + ', Value: ' + value);
    //       //series.tooltip().format(' Date: ' + pointDateString + ', Value: ' + value);
    //     });

    //     var chart2 = anychart.stock();
    //     chart2.interactivity("by-x");
    //     chart2.background().fill("#FFFFFF 0");
    //     chart2.title().fontSize(14);
    //     chart2.title().fontColor("#e06666");
    //     chart2.scroller().enabled(false);

    //     // add items
    //     var xScale = chart1.xScale();
    //     var min = null;
    //     var max = null;
    //     var gap = null;
    //     chart2.contextMenu().itemsFormatter(function(items) {
    //       // starting index
    //       var index = items["zoom-marquee-start"].index;

    //       // add item with custom action
    //       items["zoomout"] = {
    //         text: "Zoom out",
    //         action: function() {
    //           max = xScale.getMaximum();
    //           min = xScale.getMinimum();
    //           gap = max - min;
    //           chart2.selectRange(min - gap * 0.1, max + gap * 0.1);
    //         },
    //         index: index + 0.01,
    //       };
    //       items["resize"] = {
    //         text: "Resize",
    //         action: function() {
    //           chart2.selectRange(
    //             xScale.getFullMinimum(),
    //             xScale.getFullMaximum()
    //           );
    //         },
    //         index: index + 0.02,
    //       };

    //       return items;
    //     });

    //     var tooltip2 = chart2.tooltip();
    //     tooltip2.displayMode("union");
    //     tooltip2.positionMode("chart");
    //     tooltip2.anchor("right-top");
    //     tooltip2.position("right-top");

    //     var firstPlot2 = chart2.plot(0);
    //     firstPlot2.height("70%");
    //     firstPlot2.xAxis().labels(false);
    //     firstPlot2.legend(false);
    //     // firstPlot2.yAxis().labels().position("inside");
    //     firstPlot2
    //       .xAxis()
    //       .labels()
    //       .enabled(false);

    //     var mapping2 = msftDataTable.mapAs({
    //       open: "open",
    //       high: "high",
    //       low: "low",
    //       close: "close",
    //       openinterest: "openinterest",
    //       volume: "volumn",
    //     });
    //     var map2 = msftDataTable.mapAs({ x: "date", value: "volumn" });
    //     var series2 = firstPlot2.candlestick(mapping2);

    //     // series2.outline().width("10%");
    //     // series2.outline().fill("#000000");
    //     var state2 = series2.normal();

    //     state2.fallingFill({
    //       keys: ["#CF4140"],
    //     });
    //     state2.risingFill({
    //       keys: ["#008000"],
    //     });
    //     state2.risingStroke({
    //       keys: ["#000000"],
    //     });
    //     state2.fallingStroke({
    //       keys: ["#000000"],
    //     });
    //     series2.name("MSFT");

    //     var volumePlot1 = chart2.plot(1);
    //     volumePlot1.height("30%");
    //     // volumePlot1.yAxis().labels().format('${%Value}{scale:(1000000)(1000)|(kk)(k)}');

    //     // create and setup volume+MA indicator
    //     var volseries = volumePlot1.column(map2);
    //     volseries.name("volume");
    //     var openseries = volumePlot1.spline(
    //       msftDataTable.mapAs({ x: "date", value: "openinterest" })
    //     );
    //     openseries.name("OpenInterest");
    //     var customScale = anychart.scales.linear();
    //     // sets y-scale
    //     volseries.yScale(customScale);
    //     volumePlot1.yAxis(1).orientation("right");
    //     volumePlot1.yAxis(1).scale(customScale);
    //     volumePlot1
    //       .crosshair()
    //       .yLabel()
    //       .format(function() {
    //         return anychart.format.number(this.value, NUMBER_FORMAT);
    //       });
    //     volumePlot1
    //       .yAxis()
    //       .labels()
    //       .format(function() {
    //         return anychart.format.number(this.value, NUMBER_FORMAT);
    //       });

    //     var controller2 = firstPlot2.annotations();
    //     // create a Vertical Line annotation
    //     var date = "2016-07-12";
    //     var verticalLine1 = controller2.verticalLine({
    //       xAnchor: this.state.linedate
    //         ? this.state.linedate
    //         : verticalline_date,
    //       // allowEdit: false,
    //     });
    //     var selectable1 = mapping2.createSelectable();
    //     var interval1 = chart2.grouping().getCurrentDataInterval();
    //     selectable1.selectAll("day", 1); //interval.count
    //     var select1 = selectable1.search(
    //       controller2.getAnnotationAt(0).xAnchor(),
    //       "nearest"
    //     );
    //     // var value1 = select1.Mf.values[0];
    //     var open = select1.get("open");
    //     var high = select1.get("high");
    //     var low = select1.get("low");
    //     var close = select1.get("close");
    //     var oi = select1.get("openinterest");
    //     var volume = select1.get("volume");
    //     var pointDate = new Date(controller2.getAnnotationAt(0).xAnchor());
    //     var month =
    //       String(pointDate.getMonth() + 1) < 10
    //         ? "0" + String(pointDate.getMonth() + 1)
    //         : String(pointDate.getMonth() + 1);
    //     var pointDateString =
    //       String(
    //         pointDate.getDate() < 10
    //           ? "0" + pointDate.getDate()
    //           : pointDate.getDate()
    //       ) +
    //       "-" +
    //       month +
    //       "-" +
    //       String(pointDate.getFullYear());
    //     var pointDateString1 =
    //       String(pointDate.getFullYear()) +
    //       "-" +
    //       month +
    //       "-" +
    //       String(
    //         pointDate.getDate() < 10
    //           ? "0" + pointDate.getDate()
    //           : pointDate.getDate()
    //       );
    //     var tooltip_str =
    //       " Open: {%open}<br>High: {%high}<br>Low: {%low}<br>Close: {%close}";
    //     // tooltip_str += "<br>Line Date:"+pointDateString;
    //     // tooltip_str += "<br>value:"+value1;
    //     // var ohlc = priceData.filter(function (priceData) { return priceData.date == pointDateString });
    //     // console.log('asplohlc',ohlc)
    //     // if(ohlc.length>0)
    //     // {
    //     chart2.title(
    //       " Date: " +
    //         pointDateString +
    //         ", Open:" +
    //         open +
    //         ", Close:" +
    //         close +
    //         ", High:" +
    //         high +
    //         ", Low:" +
    //         low +
    //         ", OI:" +
    //         oi +
    //         ", Volume:" +
    //         volume
    //     );
    //     chart1.title(
    //       " Date: " +
    //         pointDateString +
    //         ", Open:" +
    //         open +
    //         ", Close:" +
    //         close +
    //         ", High:" +
    //         high +
    //         ", Low:" +
    //         low +
    //         ", OI:" +
    //         oi +
    //         ", Volume:" +
    //         volume
    //     );
    //     // }
    //     // chart1.title(' Date: ' + pointDateString + ', Open:'+ohlc[0].open+ ', Close:'+ohlc[0].close+ ', High:'+ohlc[0].high+ ', Low:'+ohlc[0].low);
    //     // chart1.title(' Date: ' + pointDateString + ', Value: ' + value1);
    //     // verticalLine1.normal().stroke("#006600", 1, "10 2");
    //     chart2.listen("annotationChangefinish", (e) => {
    //       var selectable = mapping2.createSelectable();
    //       var interval = chart2.grouping().getCurrentDataInterval();
    //       selectable.selectAll(interval.unit, interval.count); //interval.count
    //       var select = selectable.search(e.annotation.xAnchor(), "nearest");
    //       var value = select.Mf.values[0];
    //       var key = select.getKey();
    //       var pointDate = new Date(e.annotation.xAnchor());
    //       // var pointDate = new Date(key);
    //       var month =
    //         String(pointDate.getMonth() + 1) < 10
    //           ? "0" + String(pointDate.getMonth() + 1)
    //           : String(pointDate.getMonth() + 1);
    //       var pointDateString =
    //         String(
    //           pointDate.getDate() < 10
    //             ? "0" + pointDate.getDate()
    //             : pointDate.getDate()
    //         ) +
    //         "-" +
    //         month +
    //         "-" +
    //         String(pointDate.getFullYear());
    //       var pointDateString1 =
    //         String(pointDate.getFullYear()) +
    //         "-" +
    //         month +
    //         "-" +
    //         String(
    //           pointDate.getDate() < 10
    //             ? "0" + pointDate.getDate()
    //             : pointDate.getDate()
    //         );
    //       // tooltip_str += "<br>value:"+pointDateString;
    //       // tooltip_str += "<br>value:"+value;
    //       // value = select.Mf.values[0];
    //       //var reqvar = { moveDate : pointDateString }
    //       //this.props.getmoveDate(reqvar)

    //       this.setState({
    //         linedate: pointDateString1,
    //         // statevalue: value,
    //       });

    //       //  chart2.title(' Date: ' + pointDateString + ', Value: ' + value);
    //       //  chart1.title(' Date: ' + pointDateString + ', Value: ' + value);
    //       // series.tooltip().format(' Date: ' + pointDateString + ', Value: ' + value);
    //     });
    //     if (this.props.scrollData != "") {
    //       chart1.selectRange(
    //         this.props.scrollData.start,
    //         this.props.scrollData.end
    //       );
    //       chart2.selectRange(
    //         this.props.scrollData.start,
    //         this.props.scrollData.end
    //       );
    //       //chart.scroller().xAxis().setTo(this.props.scrollData.start, this.props.scrollData.end);
    //     }
    //     ticker_name = ticker_name.split("-");
    //     if (ticker_name.length > 0) {
    //       ticker_name = ticker_name[0];
    //     } else {
    //       ticker_name = "";
    //     }
    //     //watremark-- background text
    //     var watermark = chart2.label();
    //     watermark.useHtml(true);
    //     watermark.text(
    //       ticker_name +
    //         "<br><div class='watermark_bar' style='font-size: 16px'>" +
    //         cftc_market +
    //         " " +
    //         eod_data +
    //         "<br>Cot Report Bars<br>PiaFx.com</div>"
    //     );
    //     watermark
    //       .letterSpacing("2px")
    //       .fontColor("#ACACAC")
    //       .zIndex(1)
    //       // .fontOpacity(0.3)
    //       .fontSize(25)
    //       .fontWeight(900);
    //     watermark
    //       .anchor("left")
    //       .offsetX("15%")
    //       .offsetY("10%");
    //     var watermark = chart1.label();
    //     watermark.useHtml(true);
    //     watermark.text(
    //       ticker_name +
    //         "<br><div class='watermark_bar' style='font-size: 16px'>" +
    //         cftc_market +
    //         " " +
    //         eod_data +
    //         "<br>Cot Report Bars<br>PiaFx.com</div>"
    //     );
    //     watermark
    //       .letterSpacing("2px")
    //       .fontColor("#ACACAC")
    //       .zIndex(1)
    //       // .fontOpacity(0.3)
    //       .fontSize(25)
    //       .fontWeight(900);
    //     watermark
    //       .anchor("left")
    //       .offsetX("15%")
    //       .offsetY("10%");
    //     const changeOptions1 = (
    //       <Menu className="chart_hamburger_ul">
    //         <SubMenu
    //           className="gx-menu-horizontal"
    //           title={<span>Drawing Tools</span>}
    //         >
    //           <Menu.Item
    //             onClick={() =>
    //               this.createDrawing(firstPlot2, "horizontal-line")
    //             }
    //           >
    //             Horizontal Line
    //           </Menu.Item>
    //           <Menu.Item
    //             onClick={() => this.createDrawing(firstPlot2, "vertical-line")}
    //           >
    //             Vertical Line
    //           </Menu.Item>
    //           <Menu.Item onClick={() => this.createDrawing(firstPlot2, "line")}>
    //             Line Segment
    //           </Menu.Item>
    //           <Menu.Item
    //             onClick={() => this.createDrawing(firstPlot2, "marker")}
    //           >
    //             Marker
    //           </Menu.Item>
    //           <Menu.Item onClick={() => this.removeDrawing(firstPlot2)}>
    //             Remove All
    //           </Menu.Item>
    //         </SubMenu>
    //       </Menu>
    //     );
    //     const changeOptions2 = (
    //       <Menu className="chart_hamburger_ul">
    //         <SubMenu
    //           className="gx-menu-horizontal"
    //           title={<span>Drawing Tools</span>}
    //         >
    //           <Menu.Item
    //             onClick={() =>
    //               this.createDrawing(firstPlot1, "horizontal-line")
    //             }
    //           >
    //             Horizontal Line
    //           </Menu.Item>
    //           <Menu.Item
    //             onClick={() => this.createDrawing(firstPlot1, "vertical-line")}
    //           >
    //             Vertical Line
    //           </Menu.Item>
    //           <Menu.Item onClick={() => this.createDrawing(firstPlot1, "line")}>
    //             Line Segment
    //           </Menu.Item>
    //           <Menu.Item
    //             onClick={() => this.createDrawing(firstPlot1, "marker")}
    //           >
    //             Marker
    //           </Menu.Item>
    //           <Menu.Item onClick={() => this.removeDrawing(firstPlot1)}>
    //             Remove All
    //           </Menu.Item>
    //         </SubMenu>
    //       </Menu>
    //     );

    //     newvar1 = (
    //       <div className="cust_price_chart">
    //         {
    //           <AnyChart
    //             id="longchart"
    //             width="100%"
    //             height={400}
    //             instance={chart1}
    //           />
    //         }
    //         <p>
    //           <Popover
    //             overlayClassName="gx-popover-horizantal chart_hamburger_menu"
    //             placement="bottomRight"
    //             content={changeOptions1}
    //             trigger="hover"
    //           >
    //             <span className="gx-pointer gx-flex-row gx-align-items-center">
    //               <i class="icon icon-menu" style={{ fontSize: "20px" }}></i>
    //             </span>
    //           </Popover>
    //         </p>
    //       </div>
    //     );
    //     newvar2 = (
    //       <div className="cust_price_chart">
    //         {
    //           <AnyChart
    //             id="shortchart"
    //             width="100%"
    //             height={400}
    //             instance={chart2}
    //           />
    //         }
    //         <p>
    //           <Popover
    //             overlayClassName="gx-popover-horizantal chart_hamburger_menu"
    //             placement="bottomRight"
    //             content={changeOptions1}
    //             trigger="hover"
    //           >
    //             <span className="gx-pointer gx-flex-row gx-align-items-center">
    //               <i class="icon icon-menu" style={{ fontSize: "20px" }}></i>
    //             </span>
    //           </Popover>
    //         </p>
    //       </div>
    //     );
    //   }
    // }

    var grparray = [];
    var theme = localStorage.getItem("theme");
    var palette = anychart.palettes.defaultPalette;
    var fallingColor = palette[2];
    var risingColor = palette[0];
    var highlightColor = "white";
    if (theme == "coffee") {
      anychart.theme(anychart.themes.coffee);
      palette = anychart.palettes.coffee;
      fallingColor = palette[1];
    } else if (theme == "light") {
      fallingColor = "#cf4140";
      risingColor = "green";
      highlightColor = "black";
    }
    if (this.props.tickerData[0]) {
      ticker_name = this.props.tickerData[0][0]["short_desc"];
      eod_data = this.props.tickerData[0][0]["eod_data"];
      cftc_market = this.props.tickerData[0][0]["cftc_market"];
      ticker_id = this.props.tickerData[0][0]["_id"];
    }
    if (this.props.acntdatadone.length > 0) {
      if (this.props.zoomdata[0].length > 0) {
        var priceData = this.props.zoomdata[0];
        var length = priceData.length;
        var verticalline_date = priceData[length - 1]["date"];
        var msftDataTable = anychart.data.table("date");
        msftDataTable.addData(priceData);
        var chart1 = anychart.stock();
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
        var map1 = msftDataTable.mapAs({ x: "date", value: "volumn" });
        var openmap = msftDataTable.mapAs({ x: "date", value: "openinterest" });
        mapping1.addField("value", 1);

        var firstPlot1 = chart1.plot(0);
        firstPlot1.xAxis().labels(false);
        firstPlot1.legend(true);
        if (this.props.splitscreen_status) {
          if (this.props.arrangegroup_status) {
            var height = 650;
            firstPlot1.bounds(0, 0, "46%", "40%");
          } else {
            if (this.props.increaseheight) {
              var height = 2200;
            } else {
              var height = 1500;
            }

            firstPlot1.bounds(0, 0, "46%", "13%");
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
        firstPlot1
          .xAxis()
          .labels()
          .enabled(false);
        var series1 = firstPlot1.candlestick(
          msftDataTable.mapAs({
            open: "open",
            high: "high",
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
        var volumePlot = chart1.plot(2);
        // volumePlot.height('30%');
        if (this.props.splitscreen_status) {
          if (this.props.arrangegroup_status) {
            volumePlot.bounds(0, "41%", "46%", "20%");
          } else {
            volumePlot.bounds(0, "13%", "46%", "10%");
          }
        } else {
          volumePlot.bounds(0, "60%", "100%", "40%");
        }
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
        if (this.props.absolute) {
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

        // second Zoomed Chart
        if (this.props.splitscreen_status) {
          var firstPlot1_0 = chart1.plot(1);
          firstPlot1_0.xAxis().labels(false);
          firstPlot1_0.legend(true);
          if (this.props.arrangegroup_status) {
            firstPlot1_0.bounds("52%", 0, "46%", "40%");
          } else {
            firstPlot1_0.bounds("52%", 0, "46%", "13%");
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
              open: "open",
              high: "high",
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

          var volumePlot_1 = chart1.plot(3);
          if (this.props.absolute) {
            volumePlot_1.title("Absolute Net & Volume");
          } else {
            volumePlot_1.title("Volume");
          }
          // volumePlot.height('30%');
          if (this.props.arrangegroup_status) {
            volumePlot_1.bounds("52%", "41%", "46%", "20%");
          } else {
            volumePlot_1.bounds("52%", "13%", "46%", "10%");
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
            <SubMenu className="gx-menu-horizontal" title={<span> Grid</span>}>
              <Menu.Item onClick={() => this.gridonoff(true)}>ON</Menu.Item>
              <Menu.Item onClick={() => this.gridonoff(false)}>OFF</Menu.Item>
            </SubMenu>
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
                <Menu.Item onClick={() => this.onChangescale(true)}>
                  ON
                </Menu.Item>
                <Menu.Item onClick={() => this.onChangescale(false)}>
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
      var series;
      // var tooltip_str = "";
      newvar = (
        <div className="cotaccountacy_scroller">
          {/* switch for scalling */}
          <Row className={"scalechange"}>
            <Switch
              size="small"
              name={"scalechange"}
              onChange={(e) => this.onChangescale(e)}
            />
          </Row>
          {this.props.acntdatadone[0].map((key, item) => {
            const NUMBER_FORMAT = {
              scale: {
                factors: [1e9, 1e6, 1e3, 1],
                suffixes: ["B", "M", "K", ""],
              },
              decimalsCount: 0,
            };

            var length = key.length;
            var cot_verticalline_date = key[length - 1]["x"];
            // for waterfall chart
            var chart = anychart.waterfall();

            chart.crosshair(true);
            chart.tooltip().useHtml(true);
            var switchstate = "switch_" + i;

            //set the zero line by yAxis

            var zeroLine = chart.lineMarker();

            zeroLine.value(0);

            zeroLine.stroke("2 grey");

            //set tooltip on top-right corner --start
            var tooltip = chart.tooltip();
            tooltip.displayMode("union");
            tooltip.positionMode("chart");
            tooltip.anchor("right-top");
            tooltip.position("right-top");
            //set tooltip on top-right corner --end

            var cotDataTable = anychart.data.table("x");
            cotDataTable.addData(key);
            var mapping = cotDataTable.mapAs({ value: "value", date: "x" });
            // mapping.addField('value', 1);
            chart.labels().enabled(false);
            var controller3 = chart.annotations();
            var p = this.state.linedate
              ? this.state.linedate
              : cot_verticalline_date;
            controller3.verticalLine({
              xAnchor: p,
            });

            var selectable = mapping.createSelectable();
            // var interval = chart.grouping().getCurrentDataInterval();
            selectable.selectAll("day", 6); //interval.count
            var xValue = controller3.getAnnotationAt(0).xAnchor();
            var s = new Date(xValue);
            s = s.getTime();
            var select = selectable.search(s, "nearest");
            var value = select.get("value");
            // tooltip_str += "<br> "+key[0].name+":"+value;
            // series1.tooltip().format(tooltip_str);
            // series2.tooltip().format(tooltip_str);

            // var key1 = select.getKey();
            var pointDate = new Date(xValue);
            // var pointDate = new Date(key);
            var month =
              String(pointDate.getMonth() + 1) < 10
                ? "0" + String(pointDate.getMonth() + 1)
                : String(pointDate.getMonth() + 1);
            var pointDateString1 =
              String(pointDate.getFullYear()) +
              "-" +
              month +
              "-" +
              String(
                pointDate.getDate() < 10
                  ? "0" + pointDate.getDate()
                  : pointDate.getDate()
              );
            var pointDateString =
              String(
                pointDate.getDate() < 10
                  ? "0" + pointDate.getDate()
                  : pointDate.getDate()
              ) +
              "-" +
              month +
              "-" +
              String(pointDate.getFullYear());
            chart
              .tooltip()
              .format(
                "Absolute:{%absolute}<br>Difference:{%value}<br>Difference Net:{%net_value}<br>Absolute Net:{%net_absolute}"
              );
            chart.annotations().startDrawing("line");

            // this.preprocess(key);
            var msftSeries = chart.waterfall(key);
            var yscale = chart.yScale();
            var index = msftSeries.data().find("x", p);
            var initialAbsoluteValue = msftSeries.data().get(index, "absolute");
            var initialNetAbsoluteValue = msftSeries
              .data()
              .get(index, "net_absolute");
            var initialNetValue = msftSeries.data().get(index, "net_value");
            chart
              .xAxis()
              .labels()
              .format(function() {
                return anychart.format.dateTime(this.value, "dd-MM-yyyy");
              });
            chart.tooltip().titleFormat(function() {
              return anychart.format.dateTime(this.x, "dd-MM-yyyy");
            });
            chart
              .crosshair()
              .yLabel()
              .format(function() {
                return anychart.format.number(this.value, NUMBER_FORMAT);
              });
            chart
              .crosshair()
              .xLabel()
              .format(function() {
                return anychart.format.dateTime(this.value, "dd-MM-yyyy");
              });
            chart
              .yAxis()
              .labels()
              .format(function() {
                return anychart.format.number(this.value, NUMBER_FORMAT);
              });
            msftSeries.normal().fallingFill("#CF4140");
            msftSeries.normal().risingFill("#008000");

            var title = chart.title();
            title.enabled(true);
            title.useHtml(true);
            title.hAlign("center");
            // title.text(
            //   "<span style=\"color:#e06666; font-size: 14px; \">"+key[0].name+"</span>"+
            //   "<br><span style=\"color:#e06666; font-size: 12px;\">"+
            //   " Date: " + pointDateString + ", Value: " + value + "</span>"
            // );
            title.text(
              '<span style="color:#e06666; font-size: 14px;">' +
                "Axis Pointer Date: " +
                pointDateString +
                ", Value: " +
                value +
                ", Absolute: " +
                initialAbsoluteValue +
                ", Absolute Net: " +
                initialNetAbsoluteValue +
                ", Value Net: " +
                initialNetValue +
                "</span>"
            );

            //for same scaling on switch click --start
            var Max = chart.getStat("yScalesMax");
            var Min = chart.getStat("yScalesMin");
            if (!this.state.scalechecked) {
              if (Max > globalMax) {
                globalMax = Max;
              }
              if (Min < globalMin) {
                globalMin = Min;
              }
            }
            if (this.state.scalechecked) {
              var yscale = chart.yScale();
              yscale.maximum(globalMax);
              yscale.minimum(globalMin);
            }

            // if (!this.props.cotscalestatus) {
            //   var selectable = mapping.createSelectable();
            //   selectable.selectAll();
            //   var iterator = selectable.getIterator();

            //   while (iterator.advance()) {
            //     var high = iterator.get("high");
            //     var close = iterator.get("close");
            //     if (high > globalMax) {
            //       globalMax = high;
            //     }
            //     if (close < globalMin) {
            //       globalMin = close;
            //     }
            //   }
            //   var selectable1 = mapping1.createSelectable();
            //   selectable1.selectAll();
            //   var iterator1 = selectable1.getIterator();

            //   while (iterator1.advance()) {
            //     var high1 = iterator1.get("value");
            //     if (high1 > globalOIMax) {
            //       globalOIMax = high1;
            //     }
            //   }
            // }

            //for same scaling on switch click --end

            if (this.state.gridstate) {
              chart.xGrid().enabled(true);
              chart.xGrid().stroke({
                // set stroke color
                color: "#2f3c55",
                // set dashes and gaps length
                dash: "2 25",
              });
              chart.yGrid().enabled(true);
              chart.yGrid().stroke({
                // set stroke color
                color: "#2f3c55",
                // set dashes and gaps length
                dash: "2 25",
              });
            }

            ticker_name = ticker_name.split("-");
            if (ticker_name.length > 0) {
              ticker_name = ticker_name[0];
            } else {
              ticker_name = "";
            }
            setTimeout(function() {
              var watermark = chart.label();
              watermark.useHtml(true);
              watermark.text(
                ticker_name +
                  " - " +
                  key[0].name +
                  "<br><div class='watermark_bar' style='font-size: 16px'>Cot Accountancy © - PiaFx.com</div>"
              );
              watermark
                .letterSpacing("2px")
                .fontColor("#ACACAC")
                // .fontOpacity(0.3)
                .zIndex(1)
                .fontSize(20)
                .fontWeight(900);
              watermark
                .anchor("left")
                .offsetX("10%")
                .offsetY("20%");
            }, 100);

            msftSeries.name(item + "_" + i);

            var n = "switch_" + i;
            var chartname = "cot_" + i;
            var graphclick = i;

            var one = "";
            var two = "";
            const changeOptions = (
              <Menu className="chart_hamburger_ul">
                <SubMenu
                  className="gx-menu-horizontal"
                  title={<span>Drawing Tools</span>}
                >
                  <Menu.Item
                    onClick={() => this.createDrawing(chart, "horizontal-line")}
                  >
                    Horizontal Line
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => this.createDrawing(chart, "vertical-line")}
                  >
                    Vertical Line
                  </Menu.Item>
                  <Menu.Item onClick={() => this.createDrawing(chart, "line")}>
                    Line Segment
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => this.createDrawing(chart, "marker")}
                  >
                    Marker
                  </Menu.Item>
                  <Menu.Item onClick={() => this.removeDrawing(chart)}>
                    Remove All
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  className="gx-menu-horizontal"
                  title={<span>Grids</span>}
                >
                  <Menu.Item onClick={() => this.gridonoff(chart, true)}>
                    ON
                  </Menu.Item>
                  <Menu.Item onClick={() => this.gridonoff(chart, false)}>
                    OFF
                  </Menu.Item>
                </SubMenu>
              </Menu>
            );
            // if (i % 2) {
            //   one = "";
            //   two = "";
            //   //   document.getElementById(chartname).innerHTML ='';
            //   //  chart.container(chartname);
            //   //  chart.draw();
            // } else {
            //   one = (
            //     <Link to={"/cotoneoone"} target="_blank">
            //       <span className="gx-pointer gx-flex-row gx-align-items-center">
            //         <i
            //           class="icon icon-expand"
            //           style={{ fontSize: "20px" }}
            //           onClick={() => this.open1o1modal(graphclick, key[0].name)}
            //         ></i>
            //       </span>
            //     </Link>
            //   );

            //   two = (
            //     <div>
            //       <Switch
            //         size="small"
            //         name={"comparechart"}
            //         onChange={(e) => this.comparechart(e, graphclick)}
            //       />
            //     </div>
            //   );
            //   // document.getElementById(chartname).innerHTML ='';
            //   // document.getElementById(chartname).innerHTML +="<Link to={'/cotoneoone'} target='_blank'><span className='gx-pointer gx-flex-row gx-align-items-center'><i class='icon icon-expand' style={{'fontSize':'20px'}} onClick={() => this.open1o1modal(graphclick)} ></i></span></Link>";
            //   // document.getElementById(chartname).innerHTML ={one};
            //   // chart.container(chartname);
            //   // chart.draw();
            // }
            return (
              <div className={"chart_main_div"}>
                <div
                  className={"chart_box_design cust_price_chart cust_cot_chart"}
                >
                  <AnyChart
                    id={"cotchart_" + i++}
                    width="100%"
                    height={300}
                    instance={chart}
                  />
                  <p>
                    <Popover
                      overlayClassName="gx-popover-horizantal chart_hamburger_menu"
                      placement="bottomRight"
                      content={changeOptions}
                      trigger="hover"
                    >
                      <span className="gx-pointer gx-flex-row gx-align-items-center">
                        <i
                          class="icon icon-menu"
                          style={{ fontSize: "20px" }}
                        ></i>
                      </span>
                    </Popover>
                    {one}
                  </p>
                </div>
                <p>{two}</p>
              </div>
            );
          })}
        </div>
      );
      // if(this.props.progress)
      // {
      //   {this.progressbar_remove()} //  this.props.progressbar(false);
      // }
    }

    return (
      <div style={{ width: "100%" }}>
        <div>
          {/* <Row>
            <Col lg={12}> {newvar1} </Col>
            <Col lg={12}> {newvar2} </Col>
          </Row> */}
          {this.props.splitscreen_status == true ? (
            <Row>
              <Col lg={24}> {newvar1} </Col>
              {/* <Col lg={12}> {newvar2} </Col> */}
            </Row>
          ) : (
            <Row>
              <Col lg={24}> {newvar1} </Col>
            </Row>
          )}
        </div>
        {this.props.splitscreen_status == true ? newvar : ""}
        {/* {newvar} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    progress: state.Exchange.progress,
    moveDate: state.Exchange.moveDate,
    splitscreen_status: state.Exchange.splitscreen_status,
    arrangegroup_status: state.Exchange.arrangegroup_status,
    scrollData: state.Exchange.scrollData,
    cotData: state.Exchange.cotData,
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
  };
};
export default connect(
  mapStateToProps,
  { progressbar, arrangegroup }
)(CotChart);
