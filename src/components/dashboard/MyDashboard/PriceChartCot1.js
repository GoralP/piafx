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
} from "appRedux/actions/Exchange";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Popover, Switch, Slider } from "antd";

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
    annojson: "{}",
  };

  create(plot) {
    var select = document.getElementById("typeSelect1");
    // console.log('aspldone',select.value);
    plot.annotations().startDrawing(select.value);
  }
  removeAll(plot) {
    plot.annotations().removeAllAnnotations();
    this.setState({
      annojson: "{}",
    });
  }
  technicalindicator(plot, mapping, chart, volumemapping) {
    var select = document.getElementById("technicalindicator");
    if (select.value == "adl") {
      plot.adl(mapping);
    } else if (select.value == "ama") {
      var amaFirst = plot.ama(mapping, 10, 2, 30).series();
      amaFirst.normal().stroke("1.5 #6E9C4E");
    } else if (select.value == "aroon") {
      var indicatorPlot = chart.plot(2);
      indicatorPlot.height("40%");
      indicatorPlot.yAxis(1).orientation("right");

      // create Aroon indicator with period 25
      var aroonIndicator = indicatorPlot.aroon(mapping);
      // set period
      aroonIndicator.period(25);

      // set high and low stroke settings for indicator's range series
      aroonIndicator.rangeSeries().highStroke("#64b5f6", 2);
      aroonIndicator.rangeSeries().lowStroke("#ff6d00", 2);
    } else if (select.value == "atr") {
      plot
        .atr(mapping, 1, "spline")
        .series()
        .stroke("1.5 #ff6d00");
    } else if (select.value == "ao") {
      // create second plot on the chart
      var indicatorPlot = chart.plot(2);

      // set second plot's height
      indicatorPlot.height("50%");

      // adding extra Y axis to the right side
      indicatorPlot.yAxis(1).orientation("right");

      // create awesome oscillator series
      var aoIndicator = indicatorPlot.ao(mapping);

      // set rising and falling stroke settings
      aoIndicator.series().risingStroke("green");
      aoIndicator.series().fallingStroke("red");
    } else if (select.value == "bbands") {
      // create BBands indicator with period 20
      var bBandsIndicator = plot.bbands(mapping);
      bBandsIndicator.upperSeries().stroke("1.5 #3C8AD8");
      bBandsIndicator.middleSeries().stroke("1.5 #3C8AD8");
      bBandsIndicator.lowerSeries().stroke("1.5 #3C8AD8");
    } else if (select.value == "cmf") {
      var indicatorPlot = chart.plot(2);
      // set plot height
      indicatorPlot.height("50%");
      // adding extra Y axis to the right side
      indicatorPlot.yAxis(1).orientation("right");
      // create CMF indicator with period - 14 and series type spline area
      indicatorPlot.cmf(mapping, 5, "spline-area");
    } else if (select.value == "cho") {
      var indicatorPlot = chart.plot(2);
      // set plot height
      indicatorPlot.height("40%");
      // adding extra Y axis to the right side
      indicatorPlot.yAxis(1).orientation("right");
      // create CHO indicator with fast period - 5, slow period - 12 and type of smoothing - SMA
      indicatorPlot.cho(mapping, 5, 12, "sma");
    } else if (select.value == "cci") {
      var indicatorPlot = chart.plot(2);
      // set plot height
      indicatorPlot.height("40%");
      // adding extra Y axis to the right side
      indicatorPlot.yAxis(1).orientation("right");
      // create CCI indicator with period - 20
      indicatorPlot.cci(mapping, 20);
    } else if (select.value == "cpi") {
      // create palette
      var palette = anychart.palettes.distinctColors();
      palette.items(["#ef6c00", "#64b5f6"]);

      // create first price indicator
      var firstPriceIndicator = plot.priceIndicator(0);
      // set value
      firstPriceIndicator
        .value("first-visible")
        // set failing stroke for indicator line
        .fallingStroke(palette.itemAt(0))
        // set rising stroke for indicator line
        .risingStroke(palette.itemAt(1));
      // set settings for indicator falling label
      firstPriceIndicator
        .fallingLabel()
        .background()
        .enabled(true)
        .fill(palette.itemAt(0))
        .stroke(null);
      // set settings for indicator rising label
      firstPriceIndicator
        .risingLabel()
        .background()
        .enabled(true)
        .fill(palette.itemAt(1))
        .stroke(null);

      // create second price indicator
      var secondPriceIndicator = plot.priceIndicator(1);
      // set value
      secondPriceIndicator
        .value("last-visible")
        // set failing stroke for indicator line
        .fallingStroke(palette.itemAt(0))
        // set rising stroke for indicator line
        .risingStroke(palette.itemAt(1));
      // set settings for indicator falling label
      secondPriceIndicator
        .fallingLabel()
        .background()
        .enabled(true)
        .fill(palette.itemAt(0))
        .stroke(null);
      // set settings for indicator rising label
      secondPriceIndicator
        .risingLabel()
        .background()
        .enabled(true)
        .fill(palette.itemAt(1))
        .stroke(null);
    } else if (select.value == "dmi") {
      var indicatorPlot = chart.plot(2);
      // set plot height
      indicatorPlot.height("40%");
      // adding extra Y axis to the right side
      indicatorPlot.yAxis(1).orientation("right");
      // create DMI indicator with period - 14, adxPeriod - 20
      indicatorPlot.dmi(mapping, 14, 20);
    } else if (select.value == "ei") {
      plot.env(mapping);
    } else if (select.value == "ema") {
      var ema50 = plot.ema(mapping, 30).series();
      ema50.stroke("#ffa000");
    } else if (select.value == "fso") {
      var indicatorPlot = chart.plot(2);
      indicatorPlot.height("40%");
      // adding extra Y axis to the right side
      indicatorPlot.yAxis(1).orientation("right");
      // create Fast Stochastic oscillator indicator with
      // kPeriod = 40, kMAPeriod = 10, dPeriod = 5, kMAType = EMA, dMAType = EMA
      var indicator = indicatorPlot.stochastic(
        mapping,
        40,
        10,
        5,
        "EMA",
        "EMA"
      );
      indicator.kSeries().stroke("1.5 #e24b26");
      indicator.dSeries().stroke("1.5 #6e9c4e");
    } else if (select.value == "fullso") {
      var indicatorPlot = chart.plot(2);
      indicatorPlot.height("40%");
      // adding extra Y axis to the right side
      indicatorPlot.yAxis(1).orientation("right");

      // create Full Stochastic oscillator indicator with kPeriod = 14, kMAPeriod = 3, dPeriod = 6
      var indicator = indicatorPlot.stochastic(mapping, 14, 3, 6);
      indicator.kSeries().stroke("1.5 #e24b26");
      indicator.dSeries().stroke("1.5 #6e9c4e");
    } else if (select.value == "hai") {
      chart.plot(0).ha(mapping);

      chart.plot(2).stochastic(mapping);

      chart.plot(2).height("40%");
    } else if (select.value == "ikhi") {
      var ikhIndicator = chart.plot().ikh(mapping);

      // set indicator's leading series color
      ikhIndicator.leadingSeries().color("#c3c3c3");

      // set indicator's leading series fill function
      ikhIndicator.leadingSeries().fill(function() {
        return this.getData("high") < this.getData("low")
          ? "#EE4237 .7"
          : "#2FA85A .7";
      });

      // set indicator's base series stroke color & thickness
      ikhIndicator.baseSeries().stroke("2 #EE4237");

      // create second plot
      chart.plot(2).height("40%");
      // create MACD indicator on the second plot
      chart.plot(2).macd(mapping);
    } else if (select.value == "kdj") {
      var indicatorPlot = chart.plot(2);
      indicatorPlot.height("40%");
      // adding extra Y axis to the right side
      indicatorPlot.yAxis(1).orientation("right");

      // create KDJ indicator with kPeriod = 20, kMAPeriod = 3, dPeriod = 12
      var indicator = indicatorPlot.kdj(mapping, 20, 3, 12);
      indicator.kSeries().stroke("1.5 #e24b26");
      indicator.dSeries().stroke("1.5 #6e9c4e");
      indicator.jSeries().stroke("1.5 #3c8ad8");
    } else if (select.value == "kc") {
      var kcIndicator = plot.keltnerChannels(mapping);

      // set indicator's range series high and low stroke settings
      kcIndicator.rangeSeries().highStroke("#3C8AD8", 2);
      kcIndicator.rangeSeries().lowStroke("orange", 2);

      // set indicator's MA series stroke settings
      kcIndicator.maSeries().stroke("green", 2, "5 2");
    } else if (select.value == "mma") {
      var mmaFirst = plot.mma(mapping, 20).series();
      mmaFirst.stroke("1.5 #9170CB");

      // create MMA indicator with period - 50
      var mmaSecond = plot.mma(mapping, 50).series();
      mmaSecond.stroke("1.5 #E96A26");
    } else if (select.value == "momentum") {
      var indicatorPlot = chart.plot(2);
      // set plot height
      indicatorPlot.height("40%");
      // adding extra Y axis to the right side
      indicatorPlot.yAxis(1).orientation("right");
      // create Momentum indicator with period 16
      indicatorPlot.momentum(mapping, 16);
    } else if (select.value == "mfi") {
      var indicatorPlot = chart.plot(2);
      // set plot height
      indicatorPlot.height("40%");
      // adding extra Y axis to the right side
      indicatorPlot.yAxis(1).orientation("right");
      // create MFI indicator with period 10 and Spline-Area type series
      indicatorPlot.mfi(mapping, 10, "spline-area");
    } else if (select.value == "macd") {
      var secondPlot = chart.plot(2);
      secondPlot.height("40%");
      secondPlot.yAxis(1).orientation("right");

      // create MACD indicator with fast period 12, slow period 26 and signal period 9
      var macd = secondPlot.macd(mapping, 12, 26, 9);
      macd.macdSeries().stroke("#bf360c");
      macd.signalSeries().stroke("#ff6d00");
      macd.histogramSeries().fill("#ffe082");
    } else if (select.value == "obv") {
      var obvPlot = chart.plot(2).height("40%");
      obvPlot
        .yAxis()
        .labels()
        .format("${%Value}{scale:(1000000)(1000)|(kk)(k)}");

      // create OBV indicator on the second plot
      var obv = obvPlot.obv(mapping);

      // set OBV indicator's stroke parameters
      obv.series().stroke({
        color: "#55f",
        thickness: 2,
      });
    } else if (select.value == "psar") {
      var indicator = plot.psar(mapping, 0.03, 0.03, 0.3).series();
      // set indicator settings
      indicator.type("square").size(1);
    } else if (select.value == "ppoi") {
      var p = chart.plot(2);
      var ppoIndicator = p.ppo(mapping);
      p.height("40%");
      // get histogram series of the price oscillator
      var histogram = ppoIndicator.histogramSeries();

      // setup color scale ranges
      var colorScale = anychart.scales.ordinalColor();
      colorScale.ranges([
        {
          less: 0,
          color: "#FC1F28",
        },
        {
          greater: 0,
          color: "#4ED1FC",
        },
      ]);

      // set color scale for the histogram series
      histogram.colorScale(colorScale);
    } else if (select.value == "pc") {
      var priceChannels = plot.priceChannels(mapping);

      // set indicator's range series high and low stroke settings
      priceChannels.rangeSeries().highStroke("navy");
      priceChannels.rangeSeries().lowStroke("orange");

      // set indicator's range series fill settings
      priceChannels.rangeSeries().fill("black .1");

      // set indicator's middle series stroke settings
      priceChannels.middleSeries().stroke("green", 2);
    } else if (select.value == "pli") {
      var indicatorPlot = chart.plot(2).height("40%");
      var psyIndicator = indicatorPlot.psy(mapping);
    } else if (select.value == "rcii") {
      var rciIndicator = chart
        .plot(2)
        .height("40%")
        .rci(mapping);
      // set RCI indicator series stroke settings
      rciIndicator.series().stroke("2 #1f73b4");
    } else if (select.value == "roc") {
      var secondPlot = chart.plot(2);
      secondPlot.height("40%");
      secondPlot.yAxis(1).orientation("right");

      // create ROC indicator with period 12
      var roc = secondPlot.roc(mapping, 12).series();
      roc.stroke("#64b5f6");
    } else if (select.value == "rsi") {
      var secondPlot = chart.plot(2);
      secondPlot.height("40%");
      secondPlot.yAxis(1).orientation("right");

      // create RSI indicator with period 14
      var rsi = secondPlot.rsi(mapping, 14).series();
      rsi.stroke("#64b5f6");
    } else if (select.value == "sma") {
      var sma20 = plot.sma(mapping, 20).series();
      sma20.name("SMA(20)").stroke("#bf360c");

      // create SMA indicator with period 20
      var sma50 = plot.sma(mapping, 50).series();
      sma50.name("SMA(50)").stroke("#ff6d00");
    } else if (select.value == "sso") {
      var indicatorPlot = chart.plot(2);
      indicatorPlot.height("40%");
      // adding extra Y axis to the right side
      indicatorPlot.yAxis(1).orientation("right");

      // create Slow Stochastic oscillator indicator with kPeriod = 12, kMAPeriod = 3, dPeriod = 3
      var indicator = indicatorPlot.stochastic(mapping, 12, 3, 3);
      indicator.kSeries().stroke("1.5 #e24b26");
      indicator.dSeries().stroke("1.5 #6e9c4e");
    } else if (select.value == "trix") {
      var indicatorPlot = chart.plot(2);
      indicatorPlot.height("40%");

      // create and setup line axis marker
      indicatorPlot
        .lineMarker(0)
        .value(0)
        .stroke("#666", 2, "5 2");

      // create TRIX indicator series on the second plot
      var indicator = indicatorPlot.trix(mapping);

      indicator
        .trixSeries()
        .normal()
        .stroke({
          color: "#f55",
          thickness: 2,
        });
    } else if (select.value == "vm") {
      var volumePlot = chart.plot(2);
      volumePlot.height("40%");
      volumePlot
        .yAxis()
        .labels()
        .format("${%Value}{scale:(1000000)(1000)|(kk)(k)}");

      // create and setup volume+MA indicator
      var volumeMaIndicator = volumePlot.volumeMa(
        volumemapping,
        20,
        "sma",
        "column",
        "splineArea"
      );
      var maSeries = volumeMaIndicator.maSeries();
      maSeries.stroke("red");
      maSeries.fill("red .2");
      volumeMaIndicator.volumeSeries("column");
    } else if (select.value == "wr") {
      var indicatorPlot = chart.plot(2);
      // set plot height
      indicatorPlot.height("40%");
      // adding extra Y axis to the right side
      indicatorPlot.yAxis(1).orientation("right");
      // create Williams %R indicator with period 12 and Spline type series
      indicatorPlot.williamsR(mapping, 12, "spline");
    }
  }
  render() {
    var pricedata = JSON.parse(localStorage.getItem("cotacntpricestate"));
    var newvar = <div></div>;
    var Button = <div></div>;
    if (pricedata.length > 0) {
      var priceData = pricedata[0];
      var msftDataTable = anychart.data.table("date");
      msftDataTable.addData(priceData);

      var chart = anychart.stock();
      chart.interactivity("by-x");
      chart.background().fill("#FFFFFF 0");
      chart.scroller().maxHeight(20);
      chart.scroller().orientation("top");

      var tooltip = chart.tooltip();
      tooltip.displayMode("union");
      tooltip.positionMode("chart");
      tooltip.anchor("right-top");
      tooltip.position("right-top");

      var firstPlot = chart.plot(0);
      firstPlot.height("80%");
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
      if (this.props.getcotannotation_respo.length > 0) {
        firstPlot
          .annotations()
          .fromJson(this.props.getcotannotation_respo[0].price_json);
      } else {
        firstPlot.annotations().fromJson(this.state.annojson);
      }
      chart.listen("annotationDrawingFinish", () => {
        this.setState({
          annojson: firstPlot.annotations().toJson(),
        });
      });
      if (this.props.cotoneoone) {
        this.props.oneJson.pricejson = firstPlot.annotations().toJson();
      }
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
      series.name("MSFT");
      mapping.seriesID = series.id();
      var volumemapping = msftDataTable.mapAs({ volume: 5 });
      var volumePlot = chart.plot(1);
      var s = volumePlot.line(msftDataTable.mapAs({ value: "openinterest" }));
      s.name("OpenInterest");
      volumePlot
        .yAxis()
        .labels()
        .format("{%Value}{scale:(1000)(1)|(k)}");
      // set crosshair y-label formatter
      volumePlot
        .crosshair()
        .yLabel()
        .format("{%Value}{scale:(1000)(1)|(k)}");
      volumePlot.legend(false);
      var labels1 = volumePlot.xAxis().labels();
      labels1.enabled(false);
      volumePlot.xAxis(false);
      // volumePlot.yAxis(false);
      // volumePlot.enabled(false);
      // var volumeSeries = volumePlot.column(mapping);
      // set series settings
      // volumeSeries.name('Volume');
      if (this.props.scrollData != "") {
        chart.selectRange(
          this.props.scrollData.start,
          this.props.scrollData.end
        );
        //chart.scroller().xAxis().setTo(this.props.scrollData.start, this.props.scrollData.end);
      }

      newvar = (
        <div className="cust_price_chart">
          <p></p>
          <div className="chart_head_cust">
            <select id="typeSelect1" onClick={() => this.create(firstPlot)}>
              <option value="default" selected disabled>
                Annotation Type
              </option>
              <option value="andrews-pitchfork">Andrews' Pitchfork</option>
              <option value="ellipse">Ellipse</option>
              <option value="fibonacci-arc">Fibonacci Arc</option>
              <option value="fibonacci-fan">Fibonacci Fan</option>
              <option value="fibonacci-retracement">
                Fibonacci Retracement
              </option>
              <option value="fibonacci-timezones">Fibonacci Time Zones</option>
              <option value="horizontal-line">Horizontal Line</option>
              <option value="infinite-line">Infinite Line</option>
              <option value="line">Line Segment</option>
              <option value="marker">Marker</option>
              <option value="ray">Ray</option>
              <option value="rectangle">Rectangle</option>
              <option value="trend-channel">Trend Channel</option>
              <option value="triangle">Triangle</option>
              <option value="vertical-line">Vertical Line</option>
            </select>
            <select
              id="technicalindicator"
              onChange={() =>
                this.technicalindicator(
                  firstPlot,
                  mapping,
                  chart,
                  volumemapping
                )
              }
            >
              <option value="default" selected disabled>
                Select Indicator
              </option>
              <option value="adl">Accumulation Distribution Line</option>
              <option value="ama">Adaptive Moving Average</option>
              <option value="aroon">Aroon Indicator</option>
              <option value="atr">Average True Range </option>
              <option value="ao">Awesome Oscillator</option>
              <option value="bbands">Bollinger Bands</option>
              <option value="cmf">Chaikin Money Flow</option>
              <option value="cho">Chaikin Oscillator</option>
              <option value="cci">Commodity Channel Index</option>
              <option value="cpi">Current Price Indicator </option>
              <option value="dmi">Directional Movement Index</option>
              {/* <option value="ci">Custom Indicator </option> */}
              <option value="ei">Envelope Indicator </option>
              <option value="ema">Exponential Moving Average</option>
              <option value="fso"> Fast Stochastic Oscillator</option>
              <option value="fullso">Full Stochastic Oscillator </option>
              <option value="ikhi">Ichimoku Kinko Hyo Indicator </option>
              <option value="hai">Heikin-Ashi Indicator </option>
              <option value="kdj">KDJ Indicator</option>
              <option value="kc">Keltner Channels </option>
              <option value="mma">Modified Moving Average</option>
              <option value="momentum">Momentum</option>
              <option value="mfi">Money Flow Index</option>
              <option value="macd">
                Moving Average Convergence Divergence
              </option>
              <option value="obv">On Balance Volume</option>
              <option value="psar"> Parabolic SAR</option>
              <option value="ppoi">
                {" "}
                Percentage Price Oscillator Indicator{" "}
              </option>
              <option value="pc"> Price Channels </option>
              <option value="pli"> Psychological Line Indicator </option>
              <option value="rcii">Rank Correlation Index Indicator </option>
              <option value="roc">Rate of Change</option>
              <option value="rsi">Relative Strength Index</option>
              <option value="sma">Simple Moving Average</option>
              <option value="sso">Slow Stochastic Oscillator </option>
              <option value="trix">TRIX Indicator </option>
              <option value="vm">Volume + MA </option>
              <option value="wr">Williams %R </option>
            </select>
            <button onClick={() => this.removeAll(firstPlot)}>
              Remove All
            </button>
          </div>

          {<AnyChart width="100%" height={400} instance={chart} />}
          {/* <Slider min={1} max={2000} onChange={this.onChange}  value={this.state.inputValue} /> */}

          <div
            id="rangeselectorContainer"
            className="rangeselectorContainer"
          ></div>
          <div id="rangepickerContainer" className="rangepickerContainer"></div>
        </div>
      );
    }
    return (
      <div style={{ width: "100%" }}>
        {newvar}
        {Button}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getcotannotation_respo: state.Exchange.getcotannotation_respo,
    oneJson: state.Exchange.oneJson,
    cotoneoone: state.Exchange.cotoneoone,
    moveDate: state.Exchange.moveDate,
    scrollData: state.Exchange.scrollData,
    addClick1: state.Exchange.addClicked1,
    graphdata: state.Exchange.graphdata,
    tableData1: state.Exchange.tableData,
    priceData: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "tickers_search")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
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
  { getmoveDate, changeScroller, addClicked, tableData }
)(PriceChart);
