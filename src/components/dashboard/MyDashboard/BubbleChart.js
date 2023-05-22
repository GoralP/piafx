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
import { Tabs } from "antd";
import Widget from "components/Widget";
import isEqual from "lodash/isEqual";
const TabPane = Tabs.TabPane;
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

class BubbleChart extends Component {
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
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.bubbleData &&
      !isEqual(nextProps.bubbleData, this.props.bubbleData)
    ) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    var title_date = "";
    var palette = anychart.palettes.defaultPalette;
    if (theme == "coffee") {
      anychart.theme(anychart.themes.coffee);
      palette = anychart.palettes.coffee;
    }
    var Y5 = [];
    var Y10 = [];
    var Y15 = [];
    var Y20 = [];
    var newvar5 = <div></div>;
    var newvar10 = <div></div>;
    var newvar15 = <div></div>;
    var newvar20 = <div></div>;
    if (this.props.bubbleData.length > 0) {
      // console.log('asplbubble',this.props.bubbleData[0]);
      if (this.props.bubbleData[0] != "") {
        var bubbleData = this.props.bubbleData[0];
        // console.log("bubbleData", bubbleData);
        var title_date = bubbleData["date"];
        Y5 = bubbleData["5Y"];
        var dataSet5 = anychart.data.set(Y5);
        var mapping5 = dataSet5.mapAs({
          x: "weekly",
          value: "monthly",
          size: "size",
          daily: "daily",
          key: "key",
          name: "name",
        });
        var chart5 = anychart.bubble();
        chart5.xAxis().title("Weekly seasonality % of uptrend");
        chart5.yAxis().title("Monthly seasonality % of uptrend");
        var series5 = chart5.bubble(mapping5);
        series5.clip(false);
        chart5.background().fill("#FFFFFF 0");
        chart5.yScale().minimum(0);
        chart5.yScale().maximum(100);
        chart5.xScale().minimum(0);
        chart5.xScale().maximum(100);
        chart5.tooltip().titleFormat(function() {
          return this.getData("key") + " - " + this.getData("name");
        });
        chart5.minBubbleSize("2%");
        chart5.maxBubbleSize("8%");
        chart5.tooltip().useHtml(true);
        chart5.tooltip().format(function() {
          return (
            "Daily Seas : " +
            this.getData("daily") +
            "<br> Weekly Seas : " +
            this.getData("x") +
            "<br> Monthly Seas : " +
            this.getData("value")
          );
        });
        series5.fill(function() {
          if (this.value <= 25 && this.x <= 25) {
            return "red 0.1";
          } else if (this.value >= 75 && this.x >= 75) {
            return "green 0.1";
          } else {
            return this.sourceColor + " 0.1";
          }
        });
        series5.stroke(function() {
          if (this.value <= 25 && this.x <= 25) {
            return "red";
          } else if (this.value >= 75 && this.x >= 75) {
            return "green";
          } else {
            return this.sourceColor;
          }
        });
        newvar5 = (
          <div className="">
            {
              <AnyChart
                width="100%"
                height={400}
                instance={chart5}
                id="bubbleChart5"
              />
            }
          </div>
        );

        Y10 = bubbleData["10Y"];
        var dataSet10 = anychart.data.set(Y10);
        var mapping10 = dataSet10.mapAs({
          x: "weekly",
          value: "monthly",
          size: "size",
          daily: "daily",
          key: "key",
          name: "name",
        });
        var chart10 = anychart.bubble();
        chart10.xAxis().title("Weekly seasonality % of uptrend");
        chart10.yAxis().title("Monthly seasonality % of uptrend");
        var series10 = chart10.bubble(mapping10);
        series10.clip(false);
        chart10.background().fill("#FFFFFF 0");
        chart10.yScale().minimum(0);
        chart10.yScale().maximum(100);
        chart10.xScale().minimum(0);
        chart10.xScale().maximum(100);
        chart10.tooltip().titleFormat(function() {
          return this.getData("key") + " - " + this.getData("name");
        });
        chart10.minBubbleSize("2%");
        chart10.maxBubbleSize("8%");
        chart10.tooltip().useHtml(true);
        chart10.tooltip().format(function() {
          return (
            "Daily Seas : " +
            this.getData("daily") +
            "<br> Weekly Seas : " +
            this.getData("x") +
            "<br> Monthly Seas : " +
            this.getData("value")
          );
        });
        series10.fill(function() {
          if (this.value <= 25 && this.x <= 25) {
            return "red 0.1";
          } else if (this.value >= 75 && this.x >= 75) {
            return "green 0.1";
          } else {
            return this.sourceColor + " 0.1";
          }
        });
        series10.stroke(function() {
          if (this.value <= 25 && this.x <= 25) {
            return "red";
          } else if (this.value >= 75 && this.x >= 75) {
            return "green";
          } else {
            return this.sourceColor;
          }
        });
        newvar10 = (
          <div className="">
            {
              <AnyChart
                width="100%"
                height={400}
                instance={chart10}
                id="bubbleChart10"
              />
            }
          </div>
        );

        Y15 = bubbleData["15Y"];
        var dataSet15 = anychart.data.set(Y15);
        var mapping15 = dataSet15.mapAs({
          x: "weekly",
          value: "monthly",
          size: "size",
          daily: "daily",
          key: "key",
          name: "name",
        });
        var chart15 = anychart.bubble();
        chart15.xAxis().title("Weekly seasonality % of uptrend");
        chart15.yAxis().title("Monthly seasonality % of uptrend");
        var series15 = chart15.bubble(mapping15);
        series15.clip(false);
        chart15.background().fill("#FFFFFF 0");
        chart15.yScale().minimum(0);
        chart15.yScale().maximum(100);
        chart15.xScale().minimum(0);
        chart15.xScale().maximum(100);
        chart15.tooltip().titleFormat(function() {
          return this.getData("key") + " - " + this.getData("name");
        });
        chart15.minBubbleSize("2%");
        chart15.maxBubbleSize("8%");
        chart15.tooltip().useHtml(true);
        chart15.tooltip().format(function() {
          return (
            "Daily Seas : " +
            this.getData("daily") +
            "<br> Weekly Seas : " +
            this.getData("x") +
            "<br> Monthly Seas : " +
            this.getData("value")
          );
        });
        series15.fill(function() {
          if (this.value <= 25 && this.x <= 25) {
            return "red 0.1";
          } else if (this.value >= 75 && this.x >= 75) {
            return "green 0.1";
          } else {
            return this.sourceColor + " 0.1";
          }
        });
        series15.stroke(function() {
          if (this.value <= 25 && this.x <= 25) {
            return "red";
          } else if (this.value >= 75 && this.x >= 75) {
            return "green";
          } else {
            return this.sourceColor;
          }
        });
        newvar15 = (
          <div className="">
            {
              <AnyChart
                width="100%"
                height={400}
                instance={chart15}
                id="bubbleChart15"
              />
            }
          </div>
        );

        Y20 = bubbleData["20Y"];
        var dataSet20 = anychart.data.set(Y20);
        var mapping20 = dataSet20.mapAs({
          x: "weekly",
          value: "monthly",
          size: "size",
          daily: "daily",
          key: "key",
          name: "name",
        });
        var chart20 = anychart.bubble();
        chart20.xAxis().title("Weekly seasonality % of uptrend");
        chart20.yAxis().title("Monthly seasonality % of uptrend");
        var series20 = chart20.bubble(mapping20);
        series20.clip(false);
        chart20.background().fill("#FFFFFF 0");
        chart20.yScale().minimum(0);
        chart20.yScale().maximum(100);
        chart20.xScale().minimum(0);
        chart20.xScale().maximum(100);
        chart20.tooltip().titleFormat(function() {
          return this.getData("key") + " - " + this.getData("name");
        });
        chart20.minBubbleSize("2%");
        chart20.maxBubbleSize("8%");
        chart20.tooltip().useHtml(true);
        chart20.tooltip().format(function() {
          return (
            "Daily Seas : " +
            this.getData("daily") +
            "<br> Weekly Seas : " +
            this.getData("x") +
            "<br> Monthly Seas : " +
            this.getData("value")
          );
        });
        series20.fill(function() {
          if (this.value <= 25 && this.x <= 25) {
            return "red 0.1";
          } else if (this.value >= 75 && this.x >= 75) {
            return "green 0.1";
          } else {
            return this.sourceColor + " 0.1";
          }
        });
        series20.stroke(function() {
          if (this.value <= 25 && this.x <= 25) {
            return "red";
          } else if (this.value >= 75 && this.x >= 75) {
            return "green";
          } else {
            return this.sourceColor;
          }
        });
        newvar20 = (
          <div className="">
            {
              <AnyChart
                width="100%"
                height={400}
                instance={chart20}
                id="bubbleChart20"
              />
            }
          </div>
        );
      }
    }
    return (
      <div style={{ width: "100%" }}>
        <span className="cust_desciption cust-hass-font">
          Seasonality Bubble for day {title_date}
        </span>
        <div className="cust_bullet_chart cust_ecin_div cust-tab-font cust_price_chart">
          <Widget title="" styleName="sector_tabs gx-card-tabs">
            <Tabs defaultActiveKey="1">
              <TabPane tab="5Y" key="1" className="">
                {Y5.length > 0 ? (
                  <span>{newvar5}</span>
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
                {Y10.length > 0 ? (
                  <span>{newvar10}</span>
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
                {Y15.length > 0 ? (
                  <span>{newvar15}</span>
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
                {Y20.length > 0 ? (
                  <span>{newvar20}</span>
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
        {/* {Button} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bubbleData: Object.keys(state.Exchange.seasonalitydata)
      .filter((priceDataIndex) => priceDataIndex == "bubble")
      .map((priceDataIndex) => {
        return state.Exchange.seasonalitydata[priceDataIndex];
      }),
  };
};
export default connect(
  mapStateToProps,
  { getmoveDate, changeScroller, addClicked, tableData }
)(BubbleChart);
