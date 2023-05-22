import React, { Component } from "react";
import AnyChart from "anychart-react";
import anychart from "anychart";
import { Popover, Switch, Col, Row, Menu } from "antd";
import { connect } from "react-redux";
import {
  getmoveDate,
  changeScroller,
  addClicked,
  tableData,
  scrollDates,
  loaderstatus,
  splitscreen,
  bigchart,
  absolute,
  increaseheight,
  cotgrid,
  cotscale,
} from "appRedux/actions/Exchange";
import SubMenu from "antd/lib/menu/SubMenu";
import moment from "moment";
// var scrollermain = anychart.standalones.scroller();
var plotBounds;
var startdatetimestamp;
var enddatetimestamp;
class PriceChart extends Component {
  constructor(props) {
    super(props);
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
    pricevisible: false,
    tooltipvisible: true,
  };

  // componentDidMount(){
  //   if(this.props.loader)
  //   {
  //   this.props.loaderstatus(false);
  //   }
  // }
  createDrawing(plot, type, subtype = "") {
    if (type == "marker") {
      if (subtype == "arrowUp") {
        var color = "green";
        var size = 10;
      } else if (subtype == "arrowDown") {
        var color = "red";
        var size = 10;
      } else {
        var color = "yellow";
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
      plot.annotations().startDrawing({ type: type, color: "yellow" });
    }
  }
  removeDrawing(plot) {
    plot.annotations().removeAllAnnotations();
  }
  comparechart(event) {
    if (event) {
      document.getElementById("cust_price_chart").style.display = "none";
      // document.getElementById("cust_price_chart").style.display = "none";
      this.props.bigchart(true);
      this.setState({
        pricevisible: true,
      });
    } else {
      document.getElementById("cust_price_chart").style.display = "block";
      // document.getElementById("cust_price_chart").style.display = "block";
      this.props.bigchart(false);
      this.setState({
        pricevisible: false,
      });
    }
  }
  tooltip(status) {
    this.setState({
      tooltipvisible: status,
    });
  }
  splitscreen = (event) => {
    if (event) {
      this.props.splitscreen(true);
    } else {
      this.props.splitscreen(false);
    }
  };
  cotgrid = (event) => {
    if (event) {
      this.props.cotgrid(true);
    } else {
      this.props.cotgrid(false);
    }
  };
  cotscale = (event) => {
    if (event) {
      this.props.cotscale(true);
    } else {
      this.props.cotscale(false);
    }
  };
  increaseheight = (event) => {
    if (event) {
      this.props.increaseheight(true);
    } else {
      this.props.increaseheight(false);
    }
  };
  absolute = (event) => {
    if (event) {
      this.props.absolute(true);
    } else {
      this.props.absolute(false);
    }
  };
  render() {
    var height = 300;
    var newvar = <div></div>;
    var newvar2 = <div></div>;
    var ticker_id = "";
    var eod_data = "";
    var cftc_market = "";
    var enddate = "";
    var ticker_name = "";
    if (this.props.tickerData[0]) {
      ticker_name = this.props.tickerData[0][0]["ticker_name"];
      eod_data = this.props.tickerData[0][0]["eod_data"];
      cftc_market = this.props.tickerData[0][0]["cftc_market"];
      ticker_id = this.props.tickerData[0][0]["_id"];
    }
    // var Button = <div></div>
    var theme = localStorage.getItem("theme");
    var palette = anychart.palettes.defaultPalette;
    var fallingColor = palette[2];
    var risingColor = palette[0];
    var highlightColor = "white";
    var waterMarkColor = "#515F78";
    if (theme == "coffee") {
      anychart.theme(anychart.themes.coffee);
      palette = anychart.palettes.coffee;
      fallingColor = palette[1];
    } else if (theme == "light") {
      waterMarkColor = "#ACACAC";
      fallingColor = "#cf4140";
      risingColor = "green";
      highlightColor = "black";
    }
    if (this.props.priceData[0]) {
      var priceData = this.props.priceData[0];
      var msftDataTable = anychart.data.table("date");
      msftDataTable.addData(priceData);
      var chart = anychart.stock();
      chart.interactivity("by-x");
      chart.background().fill("#FFFFFF 0");
      var scrollermain = chart.scroller();
      chart.scroller().maxHeight(20);
      chart.scroller().orientation("top");
      chart.scroller().enabled(false);
      var xScale = chart.xScale();
      var marker;
      // scrollermain.listen('scrollerChange', (e) => {
      //   if (e.startRatio != 0 || e.endRatio != 1) {
      //     // alert('hi');
      //     // scroller.container('container').draw();
      //     var fullMin = xScale.getFullMinimum();
      //     var fullMax = xScale.getFullMaximum();
      //     var fullRange = fullMax - fullMin;
      //     // marker = firstPlot.rangeMarker(0);
      //     startdatetimestamp = fullMin + fullRange * e.startRatio;
      //     // marker.from(startdate);
      //     var startdate = new Date(startdatetimestamp);
      //     var startmonth = startdate.getMonth()+parseInt(1) > 9 ? startdate.getMonth()+parseInt(1) : "0" + (startdate.getMonth()+parseInt(1));
      //     var start_date = startdate.getDate() > 9 ? startdate.getDate() : "0" + startdate.getDate();
      //     startdate = startdate.getFullYear() + '-' + startmonth + '-' + start_date;
      //     enddatetimestamp = fullMin + fullRange * e.endRatio;
      //     // marker.to(enddate);
      //     var enddate = new Date(enddatetimestamp);
      //     var endmonth = (enddate.getMonth()+parseInt(1)) > 9 ? enddate.getMonth()+parseInt(1) : "0" + (enddate.getMonth()+parseInt(1));
      //     var end_date = enddate.getDate() > 9 ? enddate.getDate() : "0" + enddate.getDate();
      //     enddate = enddate.getFullYear() + '-' + endmonth + '-' + end_date;

      //     // marker.fill("#fcd8d7");
      //     // marker.axis(firstPlot.xAxis());
      //     //localStorage.setItem('startdate',startdate);
      //     //localStorage.setItem('enddate',enddate);
      //     // this.setState({d:1});
      //     var data = {startdate:startdate,enddate:enddate};
      //     this.props.scrollDates(data);
      //   }
      //   // else if (marker) {
      //   //   marker.dispose();
      //   // }
      // });

      chart.listen("selectedrangechangefinish", (e) => {
        var startRatio = anychart.format.dateTime(
          e.firstSelected,
          "dd MMM yyyy"
        );
        var endRatio = anychart.format.dateTime(e.lastSelected, "dd MMM yyyy");
        var data = { start: startRatio, end: endRatio };
        this.props.changeScroller(data);
      });

      var tooltip = chart.tooltip();
      tooltip.displayMode("union");
      tooltip.positionMode("chart");
      tooltip.anchor("right-top");
      tooltip.position("right-top");

      var firstPlot = chart.plot(0);
      firstPlot.height("100%");
      firstPlot.xAxis().labels(false);
      firstPlot.legend(false);
      firstPlot
        .yAxis()
        .labels()
        .position("inside");
      firstPlot
        .xAxis()
        .labels()
        .enabled(false);
      // create custom scroller

      var mapping = msftDataTable.mapAs({
        open: "open",
        high: "high",
        low: "low",
        close: "close",
      });
      mapping.addField("value", 1);
      var series = firstPlot.ohlc(
        msftDataTable.mapAs({
          open: "open",
          high: "high",
          low: "low",
          close: "close",
        })
      );
      // series.name('MSFT');
      mapping.seriesID = series.id();

      series.risingStroke(highlightColor);
      series.fallingStroke(highlightColor);
      series.risingFill(risingColor);
      series.fallingFill(fallingColor);

      var chart2 = anychart.stock();
      chart2.interactivity("by-x");
      chart2.background().fill("#FFFFFF 0");
      // var scrollermain = chart2.scroller()
      chart2.scroller().maxHeight(20);
      chart2.scroller().orientation("top");
      chart2.scroller().enabled(false);
      // var xScale = chart2.xScale()
      // var marker;

      chart2.listen("selectedrangechangefinish", (e) => {
        var startRatio = anychart.format.dateTime(
          e.firstSelected,
          "dd MMM yyyy"
        );
        var endRatio = anychart.format.dateTime(e.lastSelected, "dd MMM yyyy");
        var data = { start: startRatio, end: endRatio };
        this.props.changeScroller(data);
      });

      var tooltip2 = chart2.tooltip();
      tooltip2.displayMode("union");
      tooltip2.positionMode("chart");
      tooltip2.anchor("right-top");
      tooltip2.position("right-top");

      var firstPlot2 = chart2.plot(0);
      firstPlot2.height("100%");
      firstPlot2.xAxis().labels(false);
      firstPlot2.legend(false);
      firstPlot2
        .yAxis()
        .labels()
        .position("inside");
      firstPlot2
        .xAxis()
        .labels()
        .enabled(false);
      // create custom scroller

      var mapping2 = msftDataTable.mapAs({
        open: "open",
        high: "high",
        low: "low",
        close: "close",
      });
      mapping2.addField("value", 1);
      var series2 = firstPlot2.ohlc(
        msftDataTable.mapAs({
          open: "open",
          high: "high",
          low: "low",
          close: "close",
        })
      );
      series2.name(ticker_name);
      // mapping.seriesID = series.id();
      series2.risingStroke(highlightColor);
      series2.fallingStroke(highlightColor);
      series2.risingFill(risingColor);
      series2.fallingFill(fallingColor);
      if (this.props.scrollData != "") {
        chart.selectRange(
          this.props.scrollData.start,
          this.props.scrollData.end
        );
        chart2.selectRange(
          this.props.scrollData.start,
          this.props.scrollData.end
        );
      }

      let height = window.innerHeight - 110;
      newvar = (
        <div className="cust_price_chart">
          {
            // <AnyChart
            //   id="longchart"
            //   width="100%"
            //   height={height}
            //   instance={chart}
            // />
          }
        </div>
      );
      newvar2 = (
        <div className="cust_price_chart">
          {
            <AnyChart
              id="shortchart"
              width="100%"
              height={height}
              instance={chart2}
            />
          }
        </div>
      );
      var newvar1 = <div></div>;
      if (this.props.priceData[0].length > 0) {
        const NUMBER_FORMAT = {
          scale: {
            factors: [1e9, 1e6, 1e3, 1],
            suffixes: ["B", "M", "K", ""],
          },
          decimalsCount: 0,
        };
        var chart1 = anychart.stock();
        chart1.interactivity("by-x");
        chart1.background().fill("#FFFFFF 0");

        //var scrollermain = chart1.scroller()
        // chart1.scroller().allowRangeChange(false);

        chart1.scroller().maxHeight(20);
        chart1.scroller().orientation("top");
        chart1.scroller().enabled(true);

        var tooltip1 = chart1.tooltip();
        // tooltip1.displayMode("union");
        // tooltip1.positionMode("chart");
        tooltip1.enabled(this.state.tooltipvisible);
        // tooltip1.anchor("right-top");
        // tooltip1.position("right-top");

        var firstPlot1 = chart1.plot(0);
        firstPlot1.height("70%");
        // firstPlot1.xAxis().labels(false);
        firstPlot1.legend(false);
        // firstPlot1.yAxis().labels().position("inside");
        // firstPlot1.xAxis().labels().enabled(false);

        var series1 = firstPlot1.candlestick(
          msftDataTable.mapAs({
            open: "open",
            high: "high",
            low: "low",
            close: "close",
          })
        );
        // var series1 = firstPlot1.Waterfall(
        //   msftDataTable.mapAs({
        //     x: "open",
        //     y: "high",
        //   })
        // );

        // var map = msftDataTable.mapAs({'volumn':'volumn'})
        // chart1.scroller().column(map);
        series1.name(ticker_name);
        marker = firstPlot1.rangeMarker(0);

        series1.risingStroke(highlightColor);
        series1.fallingStroke(highlightColor);
        series1.risingFill(risingColor);
        series1.fallingFill(fallingColor);

        var volumePlot = chart1.plot(1);
        var s = volumePlot.line(msftDataTable.mapAs({ value: "openinterest" }));
        s.name("OpenInterest");
        var volume_series = volumePlot.column(
          msftDataTable.mapAs({ value: "volume" })
        );
        volume_series.name("Volume");
        var customScale = anychart.scales.linear();
        // sets y-scale
        volume_series.yScale(customScale);
        volumePlot.yAxis(1).orientation("right");
        volumePlot.yAxis(1).scale(customScale);
        volumePlot.legend(false);
        volumePlot
          .crosshair()
          .yLabel()
          .format(function() {
            return anychart.format.number(this.value, NUMBER_FORMAT);
          });
        volumePlot
          .yAxis()
          .labels()
          .format(function() {
            return anychart.format.number(this.value, NUMBER_FORMAT);
          });
        // volumePlot.yAxis().labels().position("inside");
        var labels1 = volumePlot.xAxis().labels();
        labels1.enabled(false);
        volumePlot.xAxis(false);
        var format = function(input) {
          // console.log('asplt',input);
          var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
          var pattern1 = /(\d{2})\-(\d{2})\-(\d{4})/;
          if (!input) {
            return null;
          }
          if (input.match(pattern)) {
            return input.replace(pattern, "$3-$2-$1");
          }
          if (input.match(pattern1)) {
            return input.replace(pattern1, "$3-$2-$1");
            // return input;
          }
        };

        //marker code by goral
        if (this.props.scrollData != "") {
          // console.log("marker startdate------>", this.props.scrollData);

          // var s = "";
          // // var s = localStorage.getItem("startDate1");
          // if (markerStartDate1) {
          //   // var s = format(this.props.scrollData.start);
          //   s = markerStartDate1.format("YYYY-MM-DD");
          //   console.log("test---->", s);
          // }

          var s = this.props.scrollData.start;
          // console.log("marker format date---->", s);
          s = new Date(s);
          s = s.getTime();

          // var e = localStorage.getItem("endDate1");
          var e = this.props.scrollData.end;
          e = new Date(e);
          e = e.getTime();
          marker.to(s);
          marker.from(e);
          //highlight background dark color code on chart for particular range
          // marker.fill("#373f4a");
          marker.axis(firstPlot1.xAxis());
        }
        //end by goral

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

        var interval = chart1.grouping();
        var barunit = "";
        var barcount = "";
        chart1.listenOnce("chartDraw", function() {
          chart1.selectRange("year", 5);
        });
        setTimeout(function() {
          barunit = interval.getCurrentDataInterval().unit;
          barcount = interval.getCurrentDataInterval().count;
          if (barunit == "month") {
            barunit = "Monthly Bars";
          }
          if (barunit == "year") {
            barunit = "Yearly Bars";
          }
          if (barunit == "week") {
            barunit = "Weekly Bars";
          }
          if (barunit == "day") {
            barunit = "Daily Bars";
          }
          ticker_name = ticker_name.split("-");
          if (ticker_name.length > 0) {
            ticker_name = ticker_name[0];
          } else {
            ticker_name = "";
          }
          var watermark = chart1.label();
          watermark.useHtml(true);
          watermark.text(
            ticker_name +
              "<br><div class='watermark_bar' style='font-size: 16px'>" +
              cftc_market +
              " " +
              eod_data +
              "<br>" +
              barunit +
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
            .offsetX("10%")
            .offsetY("10%");
        }, 300);
        const changeOptions = (
          <Menu className="chart_hamburger_ul">
            <SubMenu
              className="gx-menu-horizontal"
              title={<span>Drawing Tools</span>}
            >
              <Menu.Item
                onClick={() =>
                  this.createDrawing(firstPlot1, "horizontal-line")
                }
              >
                Horizontal Line
              </Menu.Item>
              <Menu.Item
                onClick={() => this.createDrawing(firstPlot1, "vertical-line")}
              >
                Vertical Line
              </Menu.Item>
              <Menu.Item onClick={() => this.createDrawing(firstPlot1, "line")}>
                Line Segment
              </Menu.Item>
              <Menu.Item
                onClick={() =>
                  this.createDrawing(firstPlot1, "marker", "arrowUp")
                }
              >
                Marker Up
              </Menu.Item>
              <Menu.Item
                onClick={() =>
                  this.createDrawing(firstPlot1, "marker", "arrowDown")
                }
              >
                Marker Down
              </Menu.Item>
              <Menu.Item
                onClick={() =>
                  this.createDrawing(firstPlot1, "marker", "diamond")
                }
              >
                Diamond
              </Menu.Item>
              <Menu.Item
                onClick={() =>
                  this.createDrawing(firstPlot1, "marker", "square")
                }
              >
                Square
              </Menu.Item>
              <Menu.Item
                onClick={() =>
                  this.createDrawing(firstPlot1, "marker", "circle")
                }
              >
                Circle
              </Menu.Item>
              <Menu.Item onClick={() => this.removeDrawing(firstPlot1)}>
                Remove All
              </Menu.Item>
            </SubMenu>
            <SubMenu
              className="gx-menu-horizontal"
              title={<span>Tooltip</span>}
            >
              <Menu.Item onClick={() => this.tooltip(true)}>ON</Menu.Item>
              <Menu.Item onClick={() => this.tooltip(false)}>OFF</Menu.Item>
            </SubMenu>
          </Menu>
        );
        newvar1 = (
          <div>
            <div className="switches_div">
              <span align="left">
                {/* {this.props.acntdatadone.length > 0 ? (
                  <span>
                    <span className="common_title">Grid</span>
                    <Switch
                      size="small"
                      name={"cotgrid"}
                      onChange={(e) => this.cotgrid(e)}
                    />
                  </span>
                ) : null} */}
                {/* {this.props.acntdatadone.length > 0 &&
                this.props.splitscreen_status ? (
                  <span>
                    <span className="common_title">Scale</span>
                    <Switch
                      size="small"
                      name={"cotscale"}
                      onChange={(e) => this.cotscale(e)}
                    />
                  </span>
                ) : null} */}
                {/* {this.props.acntdatadone.length > 0 &&
                this.props.splitscreen_status ? (
                  <span>
                    <span className="common_title">Increase Height</span>
                    <Switch
                      size="small"
                      name={"increaseheight"}
                      onChange={(e) => this.increaseheight(e)}
                    />
                  </span>
                ) : null} */}
              </span>
              {/* {this.props.acntdatadone.length > 0 ? (
                <span>
                  <span className="common_title">Absolute Net</span>
                  <Switch
                    size="small"
                    name={"absolute"}
                    onChange={(e) => this.absolute(e)}
                  />
                </span>
              ) : null} */}
              {/* <span style={{ display: "block", textAlign: "center" }}>
                hello
              </span> */}
              <span className="right_switches" align="right">
                {this.props.acntdatadone.length > 0 &&
                this.props.splitscreen_status == false ? (
                  this.state.pricevisible ? (
                    <span>
                      <span className="common_title">
                        Long term Price Chart Off
                      </span>
                      <Switch
                        size="small"
                        name={"comparechart"}
                        onChange={(e) => this.comparechart(e)}
                        defaultChecked
                      />
                    </span>
                  ) : (
                    <span>
                      <span className="common_title">
                        Long term Price Chart Off
                      </span>
                      <Switch
                        size="small"
                        name={"comparechart"}
                        onChange={(e) => this.comparechart(e)}
                      />
                    </span>
                  )
                ) : null}
                {/* {this.props.acntdatadone.length > 0 ? (
                  <span>
                    <span className="common_title">Split View</span>
                    <Switch
                      size="small"
                      name={"splitscreen"}
                      onChange={(e) => this.splitscreen(e)}
                    />
                  </span>
                ) : null} */}
              </span>
            </div>
            <div className="cust_price_chart" id="cust_price_chart">
              <p>
                <Popover
                  overlayClassName="gx-popover-horizantal chart_hamburger_menu"
                  placement="bottomRight"
                  content={changeOptions}
                  trigger="click"
                >
                  <span className="gx-pointer gx-flex-row gx-align-items-center">
                    <i
                      className="icon icon-menu"
                      style={{ fontSize: "20px" }}
                    ></i>
                  </span>
                </Popover>
              </p>
              {this.props.splitscreen_status == false ? (
                <AnyChart
                  type="waterfall"
                  id="markerchart"
                  width="100%"
                  height={
                    this.props.acntdatadone.length > 0
                      ? 400
                      : window.innerHeight - 110
                  }
                  instance={chart1}
                />
              ) : null}
            </div>
          </div>
        );
        // if(this.props.loader)
        //   {
        //   this.props.loaderstatus(false);
        //   }
      }
    }
    return (
      <div style={{ width: "100%" }}>
        {newvar1}
        {/* <div>
          <Row>
            <Col lg={24}> {newvar} </Col>
            <Col lg={12}> {newvar2} </Col>
          </Row>
        </div> */}
        {/* {Button} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // acntdatadone: state.Exchange.acntdatadone,
    splitscreen_status: state.Exchange.splitscreen_status,
    loader: state.Exchange.loader,
    moveDate: state.Exchange.moveDate,
    scrollData: state.Exchange.scrollData,
    addClick1: state.Exchange.addClicked1,
    graphdata: state.Exchange.graphdata,
    tableData1: state.Exchange.tableData,
    scrollerDates: state.Exchange.scrollerDates,
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
    tickerData: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "tickers_details")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
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
    scrollDates,
    absolute,
    increaseheight,
    cotgrid,
    cotscale,
    loaderstatus,
    splitscreen,
    bigchart,
  }
)(PriceChart);
