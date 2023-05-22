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
import isEqual from "lodash/isEqual";
var common_colors = require("../../../assets/theme-variable");
var theme = localStorage.getItem("theme");
var bgcolor = common_colors.default_back_color;
if (theme == "coffee") {
  anychart.theme(anychart.themes.coffee);
  bgcolor = common_colors.coffee_back_color;
}
const NUMBER_FORMAT = {
  scale: {
    factors: [1e9, 1e6, 1e3, 1],
    suffixes: ["B", "M", "K", ""],
  },
  decimalsCount: 0,
};

class PriceChartMain extends Component {
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
    annojson: "{}",
  };
  // shouldComponentUpdate(nextProps) {
  //   if (nextProps.priceData && !isEqual(nextProps.priceData,this.props.priceData)) {
  //       return true;
  //   } else {
  //       return false;
  //   }
  // }
  render() {
    var ticker_name = "";
    var eod_data = "";
    var cftc_market = "";
    var short_desc = "";
    var palette = anychart.palettes.defaultPalette;
    if (theme == "coffee") {
      anychart.theme(anychart.themes.coffee);
      palette = anychart.palettes.coffee;
    }
    if (this.props.tickerData[0]) {
      ticker_name = this.props.tickerData[0][0]["ticker_name"];
      eod_data = this.props.tickerData[0][0]["eod_data"];
      cftc_market = this.props.tickerData[0][0]["cftc_market"];
      short_desc = this.props.tickerData[0][0]["short_desc"];
    }
    var newvar = <div></div>;
    var Button = <div></div>;
    if (this.props.priceData.length > 0) {
      if (this.props.priceData[0].length > 0) {
        var priceData = this.props.priceData[0];
        var msftDataTable = anychart.data.table("date");
        msftDataTable.addData(priceData);

        var chart = anychart.stock();
        chart.interactivity("by-x");
        // if(theme == 'default')
        // {
        chart.background().fill("#FFFFFF 0");
        // }
        chart.scroller().enabled(false);
        chart.scroller().maxHeight(20);
        chart.scroller().orientation("top");

        var tooltip = chart.tooltip();
        tooltip.displayMode("union");
        tooltip.positionMode("chart");
        tooltip.anchor("right-top");
        tooltip.position("right-top");

        var firstPlot = chart.plot(0);
        firstPlot.height("40%");
        firstPlot.xAxis().labels(false);
        // firstPlot.legend(false);
        // firstPlot.yAxis().labels().position("inside");
        firstPlot
          .xAxis()
          .labels()
          .enabled(false);

        if (theme == "coffee") {
          firstPlot.palette(anychart.palettes.coffee);
        }

        // chart.listen("annotationDrawingFinish", () => {
        //   this.setState(
        //     {
        //       annojson: firstPlot.annotations().toJson(),
        //     });
        // });

        var mapping = msftDataTable.mapAs({
          open: "open",
          high: "high",
          low: "low",
          close: "close",
        });

        mapping.addField("value", 1);

        // var series = firstPlot.ohlc(msftDataTable.mapAs({'open':'open', 'high': 'high', 'low': 'low', 'close': 'close'}))
        var series = firstPlot.area(msftDataTable.mapAs({ value: "close" }));
        series.name(short_desc);
        // series.stroke('#64b5f6',2.5)
        series.stroke(palette[0], 2.5);
        // if(theme == 'coffee')
        // {
        //   series.fill(['0.5 '+palette[1], bgcolor],-90);
        // }
        // else{
        series.fill(["0.5 " + palette[1], "0.5 " + palette[1]], -90);
        // }
        mapping.seriesID = series.id();
        var sma20 = firstPlot
          .sma(msftDataTable.mapAs({ value: "close" }), 20)
          .series();
        // sma20.stroke('#bf360c',2);
        sma20.stroke(palette[6], 2);
        var openinterest = firstPlot.spline(
          msftDataTable.mapAs({ value: "openinterest" })
        );
        openinterest.name("OpenInterest");
        // openinterest.stroke('#d9d9d9',0.5)
        if (theme == "default") {
          // openinterest.stroke(palette[9], 0.5);
          openinterest.stroke("white");
        } else {
          openinterest.stroke("black", 0.5);
        }
        var customScale = anychart.scales.linear();
        // sets y-scale
        openinterest.yScale(customScale);
        firstPlot.yAxis(1).orientation("right");
        firstPlot.yAxis(1).scale(customScale);
        firstPlot
          .yAxis(1)
          .labels()
          .format(function() {
            return anychart.format.number(this.value, NUMBER_FORMAT);
          });
        // var volumePlot = chart.plot(1);
        // volumePlot.height('30%');
        // var s = volumePlot.line(msftDataTable.mapAs({'value':'openinterest'}))
        // s.name('OpenInterest');
        // volumePlot.yAxis().labels().format('{%Value}{scale:(1000)(1)|(k)}');
        // // set crosshair y-label formatter
        // volumePlot.crosshair().yLabel().format('{%Value}{scale:(1000)(1)|(k)}');
        // volumePlot.legend(false);
        // var labels1 = volumePlot.xAxis().labels();
        // labels1.enabled(false);
        // volumePlot.xAxis(false);

        // var movingplot = chart.plot(2);
        // movingplot.height('30%');
        // var sma20 = movingplot.sma(msftDataTable.mapAs({'value': 'close'}),20).series();
        // sma20.stroke('#bf360c');
        // // s.name('Moving Average');
        // movingplot.yAxis().labels().format('{%Value}{scale:(1000)(1)|(k)}');
        // // set crosshair y-label formatter
        // movingplot.crosshair().yLabel().format('{%Value}{scale:(1000)(1)|(k)}');
        // movingplot.legend(false);
        // var labels1 = movingplot.xAxis().labels();
        // labels1.enabled(false);
        // movingplot.xAxis(false);

        var watermark = chart.label();
        watermark.useHtml(true);

        // watermark.text(ticker_name+"<br><div class='watermark_bar' style='font-size: 16px'>"+cftc_market+" "+eod_data+"<br>1 Bar ="+barcount+ " " +barunit+"<br>PiaFx.com</div>");
        watermark.text(
          short_desc +
            "<br><div class='watermark_bar' style='font-size: 16px'>" +
            cftc_market +
            " " +
            eod_data +
            "<br>PiaFx.com</div>"
        );
        watermark
          .letterSpacing("2px")
          .fontColor("grey")
          .fontOpacity(0.3)
          .fontSize(25)
          .fontWeight(900);
        watermark
          .anchor("left")
          .offsetX("15%")
          .offsetY("15%");

        newvar = (
          <div className="cust_price_chart">
            {<AnyChart width="95%" height={250} instance={chart} />}
          </div>
        );
      }
    }
    return (
      <div
        style={{ width: "100%" }}
        className="cust_bullet_chart cust_main_chart "
      >
        <span className="cust_desciption cust-hass-font">
          Most Visited Ticker In 5 Days
        </span>
        {this.props.priceData.length > 0 ? (
          this.props.priceData.length > 0 ? (
            <span>
              {newvar}
              {Button}
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
          )
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
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
  };
};
export default connect(
  mapStateToProps,
  { getmoveDate, changeScroller, addClicked, tableData }
)(PriceChartMain);
