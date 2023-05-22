import React, { Component } from "react";
import AnyChart from "anychart-react";
import anychart from "anychart";
import { Switch, Col, Row, Progress, Popover, Menu } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { progressbar, scalechanging } from "appRedux/actions/Exchange";
import SubMenu from "antd/lib/menu/SubMenu";
import "styles/cotaccountancy.less";
var cotdataArray = [];
var globalMax = 0;
var globalOIMax = 0;
var globalMin = 0;
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

  onChangescale(event) {
    if (event) {
      // this.setState({
      //  scalechecked: true,
      // });
      //alert('hi');
      // this.props.scalechange.status = true;
      this.props.scalechanging(true);
    } else {
      // this.setState({
      //   scalechecked: false,
      //  });
      // this.props.scalechange.status = false;
      this.props.scalechanging(false);
    }
  }
  gridonoff(status) {
    this.setState({
      gridstate: status,
    });
  }
  progressbar_remove() {
    this.props.progressbar(false);
  }
  createDrawing(plot, type) {
    plot.annotations().startDrawing(type);
  }
  removeDrawing(plot) {
    plot.annotations().removeAllAnnotations();
  }
  render() {
    if (this.props.tickerData[0]) {
      ticker_name = this.props.tickerData[0][0]["ticker_name"];
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

        var firstPlot1 = chart1.plot(0);
        firstPlot1.xAxis().labels(false);
        firstPlot1.legend(true);
        firstPlot1.bounds(0, 0, "48%", "14%");
        firstPlot1
          .xAxis()
          .labels()
          .enabled(false);

        if (this.state.gridstate) {
          firstPlot1.yGrid().enabled(true);
          firstPlot1.yGrid().stroke({
            color: "#2F3C55",
            dash: "2 25",
          });
        }

        var firstPlot1_0 = chart1.plot(1);
        firstPlot1_0.xAxis().labels(false);
        firstPlot1_0.legend(true);
        firstPlot1_0.bounds("52%", 0, "48%", "14%");

        if (this.state.gridstate) {
          firstPlot1_0.yGrid().enabled(true);
          firstPlot1_0.yGrid().stroke({
            color: "#2F3C55",
            dash: "2 25",
          });
        }

        var mapping1 = msftDataTable.mapAs({
          open: "open",
          high: "high",
          low: "low",
          close: "close",
          openinterest: "openinterest",
          volume: "volumn",
          net_value: "net_value",
        });
        var map1 = msftDataTable.mapAs({ x: "date", value: "volume" });
        var openmap = msftDataTable.mapAs({ x: "date", value: "openinterest" });
        mapping1.addField("value", 1);
        var series1 = firstPlot1.candlestick(
          msftDataTable.mapAs({
            open: "open",
            high: "high",
            low: "low",
            close: "close",
            net_value: "net_value",
          })
        );

        series1.name("MSFT");
        var series1_0 = firstPlot1_0.candlestick(
          msftDataTable.mapAs({
            open: "open",
            high: "high",
            low: "low",
            close: "close",
            net_value: "net_value",
          })
        );

        series1_0.name("MSFT1");

        series1.tooltip(false);
        series1_0.tooltip(false);
        var tooltip1 = series1.tooltip();
        tooltip1.format(
          "{%seriesName} - Open : {%open} , Close : {%close} , High : {%high} , Low : {%low}  "
        );

        var tooltip1_0 = series1_0.tooltip();
        tooltip1_0.format(
          "{%seriesName} - Open : {%open} , Close : {%close} , High : {%high} , Low : {%low}  "
        );

        var volumePlot = chart1.plot(2);
        // volumePlot.height('30%');
        volumePlot.bounds(0, "14%", "48%", "11%");
        volumePlot
          .yAxis()
          .labels()
          .format(function() {
            return anychart.format.number(this.value, NUMBER_FORMAT);
          });
        volumePlot.title("Absolute Net");
        // //new added
        // var openseries = volumePlot.spline(msftDataTable.mapAs({x: 'date', value: 'openinterest'}));
        // openseries.name('OpenInterest');
        // openseries.tooltip(false);
        // var volseries = volumePlot.column(map1);
        // volseries.name('Volume');
        // volseries.tooltip(false);
        // // volumePlot.legend(false);
        var labels1 = volumePlot.xAxis().labels();
        labels1.enabled(false);
        volumePlot.xAxis(false);

        var volumePlot_1 = chart1.plot(3);
        volumePlot_1.title("Absolute Net");
        // volumePlot.height('30%');
        volumePlot_1.bounds("52%", "14%", "48%", "11%");
        volumePlot_1
          .yAxis()
          .labels()
          .format(function() {
            return anychart.format.number(this.value, NUMBER_FORMAT);
          });
        // var openseries = volumePlot_1.spline(msftDataTable.mapAs({x: 'date', value: 'openinterest'}));
        // openseries.name('OpenInterest');
        // openseries.tooltip(false);
        // var volseries_1 = volumePlot_1.column(map1);
        // volseries_1.name('Volume');
        // volseries_1.tooltip(false);
        // // volumePlot_1.legend(false);
        var labels1 = volumePlot_1.xAxis().labels();
        labels1.enabled(false);
        volumePlot_1.xAxis(false);
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
              <Menu.Item onClick={() => this.createDrawing(chart1, "marker")}>
                Marker
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
              title={<span> Scale </span>}
            >
              <Menu.Item onClick={() => this.onChangescale(true)}>ON</Menu.Item>
              <Menu.Item onClick={() => this.onChangescale(false)}>
                OFF
              </Menu.Item>
            </SubMenu>
          </Menu>
        );

        newvar1 = (
          <div className="cust_price_chart">
            {
              <AnyChart
                // type="waterfall"
                id="longchart"
                width="100%"
                height={1300}
                instance={chart1}
              />
            }
            <p>
              <Popover
                overlayClassName="gx-popover-horizantal chart_hamburger_menu"
                placement="bottomRight"
                content={changeOptions2}
                trigger="hover"
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
            if (item % 2 == 0) {
              var msftDataTable_candle = anychart.data.table("x");
              msftDataTable_candle.addData(key);
              var firstPlot3 = chart1.plot(4 + i++);
              var firstPlot4 = chart1.plot(4 + i++);
              firstPlot3.bounds(
                0,
                parseInt(26) + 18 * Math.floor(item / 2) + "%",
                "48%",
                "13%"
              );
              firstPlot4.bounds(
                0,
                parseInt(39) + 18 * Math.floor(item / 2) + "%",
                "48%",
                "5%"
              );
              firstPlot3.xAxis().labels(false);
              firstPlot3.legend(true);
              firstPlot3.legend().useHtml(true);
              // configure the format of legend items

              firstPlot3
                .xAxis()
                .labels()
                .enabled(false);
              firstPlot3.title(key[0].name);
              firstPlot3
                .yAxis()
                .labels()
                .format(function() {
                  return anychart.format.number(this.value, NUMBER_FORMAT);
                });
              var mapping = msftDataTable_candle.mapAs({
                open: "open",
                high: "high",
                low: "low",
                close: "close",
                net_value: "net_value",
                net_absolute: "net_absolute",
                absolute: "absolute",
                value: "value",
              });
              var series3 = firstPlot3.candlestick(mapping);

              series3.name(key[0].name);
              firstPlot3
                .legend()
                .itemsFormat(
                  "<span style='color:#455a64;font-weight:600'>{%seriesName}: </span>" +
                    "Value :  {%value} Absolute : {%absolute}"
                );
              var series5 = volumePlot.line(
                msftDataTable_candle.mapAs({ value: "net_absolute" })
              );
              var seriesname = key[0].name;
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
              var mapping1 = msftDataTable_candle.mapAs({
                value: "percentage",
              });
              var series4 = firstPlot4.column(mapping1);
              series4.name("openinterest %");
              // firstPlot4.legend(false);
              series4.tooltip(false);
              series3.tooltip(false);
              var labels1 = firstPlot4.xAxis().labels();
              labels1.enabled(false);
              firstPlot4.xAxis(false);
              var tooltip3 = series3.tooltip();
              tooltip3.format(
                "{%seriesName} - Net Value : {%net_value} ,  Net Absolute : {%net_absolute} , Absolute : {%absolute} , value : {%value} "
              );
              var zeroLine = firstPlot3.lineMarker();
              zeroLine.value(0);
              zeroLine.stroke("0.5 grey");
              if (this.state.gridstate) {
                firstPlot3.yGrid().enabled(true);
                firstPlot3.yGrid().stroke({
                  color: "#2F3C55",
                  dash: "2 25",
                });
              }
              if (!this.props.scalechange.status) {
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
              if (this.props.scalechange.status) {
                var yscale = series3.yScale();
                yscale.maximum(globalMax);
                yscale.minimum(globalMin);
                var yscale1 = series4.yScale();
                yscale1.maximum(globalOIMax);
                yscale1.minimum(0);
              }
            } else {
              var msftDataTable_candle = anychart.data.table("x");
              msftDataTable_candle.addData(key);
              var firstPlot3 = chart1.plot(4 + i++);
              var firstPlot4 = chart1.plot(4 + i++);
              // console.log('asplaspl1',parseInt(40) + 18*Math.floor(item/2));
              firstPlot3.bounds(
                "52%",
                parseInt(26) + 18 * Math.floor(item / 2) + "%",
                "48%",
                "13%"
              );

              firstPlot4.bounds(
                "52%",
                parseInt(39) + 18 * Math.floor(item / 2) + "%",
                "48%",
                "5%"
              );
              firstPlot3.xAxis().labels(false);
              firstPlot3.legend(true);
              firstPlot3.legend().useHtml(true);
              // configure the format of legend items
              firstPlot3
                .legend()
                .itemsFormat(
                  "<span style='color:#455a64;font-weight:600'>{%seriesName}: </span>" +
                    "Value :  {%value} Absolute : {%absolute}"
                );
              firstPlot3.title(key[0].name);
              firstPlot3
                .xAxis()
                .labels()
                .enabled(false);
              var mapping = msftDataTable_candle.mapAs({
                open: "open",
                high: "high",
                low: "low",
                close: "close",
                net_value: "net_value",
                net_absolute: "net_absolute",
                absolute: "absolute",
                value: "value",
              });
              var series3 = firstPlot3.candlestick(mapping);

              firstPlot3
                .yAxis()
                .labels()
                .format(function() {
                  return anychart.format.number(this.value, NUMBER_FORMAT);
                });
              series3.name(key[0].name);
              var series5 = volumePlot_1.line(
                msftDataTable_candle.mapAs({ value: "net_absolute" })
              );
              var seriesname = key[0].name;
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
              var mapping1 = msftDataTable_candle.mapAs({
                value: "percentage",
              });
              var series4 = firstPlot4.column(mapping1);
              series4.name("openinterest %");
              // firstPlot4.legend(false);
              series4.tooltip(false);
              series3.tooltip(false);
              var labels1 = firstPlot4.xAxis().labels();
              labels1.enabled(false);
              firstPlot4.xAxis(false);
              var zeroLine = firstPlot3.lineMarker();
              zeroLine.value(0);
              zeroLine.stroke("0.5 grey");
              var tooltip3 = series3.tooltip();
              tooltip3.format(
                "{%seriesName} - Net Value : {%net_value} ,  Net Absolute : {%net_absolute} , Absolute : {%absolute} , value : {%value} "
              );
              if (this.state.gridstate) {
                firstPlot3.yGrid().enabled(true);
                firstPlot3.yGrid().stroke({
                  color: "#2F3C55",
                  dash: "2 25",
                });
              }
              if (!this.props.scalechange.status) {
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
              if (this.props.scalechange.status) {
                var yscale = series3.yScale();
                yscale.maximum(globalMax);
                yscale.minimum(globalMin);
                var yscale1 = series4.yScale();
                yscale1.maximum(globalOIMax);
                yscale1.minimum(0);
              }
            }
          })}
        </div>
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
    progress: state.Exchange.progress,
    moveDate: state.Exchange.moveDate,
    scalechange: state.Exchange.scalechange,
    global: state.Exchange.global,
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
  { progressbar, scalechanging }
)(CotChart);
