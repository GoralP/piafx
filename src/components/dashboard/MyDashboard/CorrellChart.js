import React, { Component } from "react";
import AnyChart from "anychart-react";
import anychart from "anychart";
import { connect } from "react-redux";
import isEqual from "lodash/isEqual";
import { Row, Col, Button } from "antd";
import { getCorrellData } from "appRedux/actions/Exchange";

function getMenData() {
  return [
    ["CURRENCIES", 0, 2.0, 0],
    ["CURRENCIES", 1, 3.9, 0],
    ["CURRENCIES", 2, 6.2, 1],
    ["CURRENCIES", 3, 8.5, 1],
    ["CURRENCIES", 4, 10.5, 1],
    ["CURRENCIES", 5, 12.5, 1],
    ["CURRENCIES", 6, 14.3, 2],
    ["CURRENCIES", 7, 16.0, 2],
    ["CURRENCIES", 8, 17.5, 2],
    ["CURRENCIES", 9, 18.9, 2],
    ["CURRENCIES", 10, 20.2, 3],
    ["CURRENCIES", 11, 21.3, 3],
    ["CURRENCIES", 12, 22.3, 3],
    ["CURRENCIES", 13, 23.1, 3],
    ["CURRENCIES", 14, 23.8, 3],
    ["CURRENCIES", 15, 24.3, 3],
    ["CURRENCIES", 16, 24.9, 3],

    ["21-25", 0, 2.5, 0],
    ["21-25", 1, 4.9, 0],
    ["21-25", 2, 7.3, 1],
    ["21-25", 3, 9.5, 1],
    ["21-25", 4, 11.6, 1],
    ["21-25", 5, 13.6, 1],
    ["21-25", 6, 15.4, 2],
    ["21-25", 7, 17.0, 2],
    ["21-25", 8, 18.6, 2],
    ["21-25", 9, 20.0, 2],
    ["21-25", 10, 21.2, 2],
    ["21-25", 11, 22.3, 3],
    ["21-25", 12, 23.3, 3],
    ["21-25", 13, 24.2, 3],
    ["21-25", 14, 24.9, 3],
    ["21-25", 15, 25.4, 3],
    ["21-25", 16, 25.8, 3],

    ["26-30", 0, 3.5, 0],
    ["26-30", 1, 6.0, 0],
    ["26-30", 2, 8.4, 0],
    ["26-30", 3, 10.6, 1],
    ["26-30", 4, 12.7, 1],
    ["26-30", 5, 14.6, 1],
    ["26-30", 6, 16.4, 1],
    ["26-30", 7, 18.1, 2],
    ["26-30", 8, 19.6, 2],
    ["26-30", 9, 21.0, 2],
    ["26-30", 10, 22.3, 2],
    ["26-30", 11, 23.4, 3],
    ["26-30", 12, 24.4, 3],
    ["26-30", 13, 25.2, 3],
    ["26-30", 14, 25.6, 3],
    ["26-30", 15, 26.5, 3],
    ["26-30", 16, 26.9, 3],

    ["31-35", 0, 4.5, 0],
    ["31-35", 1, 7.1, 0],
    ["31-35", 2, 9.4, 0],
    ["31-35", 3, 11.7, 1],
    ["31-35", 4, 13.7, 1],
    ["31-35", 5, 15.7, 1],
    ["31-35", 6, 17.5, 1],
    ["31-35", 7, 19.2, 2],
    ["31-35", 8, 20.7, 2],
    ["31-35", 9, 22.1, 2],
    ["31-35", 10, 23.4, 2],
    ["31-35", 11, 24.5, 3],
    ["31-35", 12, 25.5, 3],
    ["31-35", 13, 26.3, 3],
    ["31-35", 14, 27.0, 3],
    ["31-35", 15, 27.5, 3],
    ["31-35", 16, 28.0, 3],

    ["36-40", 0, 5.6, 0],
    ["36-40", 1, 8.1, 0],
    ["36-40", 2, 10.5, 0],
    ["36-40", 3, 12.7, 1],
    ["36-40", 4, 14.8, 1],
    ["36-40", 5, 16.8, 1],
    ["36-40", 6, 18.6, 1],
    ["36-40", 7, 20.2, 2],
    ["36-40", 8, 21.8, 2],
    ["36-40", 9, 23.2, 2],
    ["36-40", 10, 24.4, 2],
    ["36-40", 11, 25.6, 3],
    ["36-40", 12, 26.5, 3],
    ["36-40", 13, 27.4, 3],
    ["36-40", 14, 28.1, 3],
    ["36-40", 15, 28.6, 3],
    ["36-40", 16, 29.0, 3],

    ["41-45", 0, 6.7, 0],
    ["41-45", 1, 9.2, 0],
    ["41-45", 2, 11.5, 0],
    ["41-45", 3, 13.8, 0],
    ["41-45", 4, 15.9, 1],
    ["41-45", 5, 17.8, 1],
    ["41-45", 6, 19.6, 1],
    ["41-45", 7, 21.3, 1],
    ["41-45", 8, 22.8, 2],
    ["41-45", 9, 24.7, 2],
    ["41-45", 10, 25.5, 2],
    ["41-45", 11, 26.6, 2],
    ["41-45", 12, 27.6, 3],
    ["41-45", 13, 28.4, 3],
    ["41-45", 14, 29.1, 3],
    ["41-45", 15, 29.7, 3],
    ["41-45", 16, 30.1, 3],

    ["46-50", 0, 7.7, 0],
    ["46-50", 1, 10.2, 0],
    ["46-50", 2, 12.6, 0],
    ["46-50", 3, 14.8, 0],
    ["46-50", 4, 16.9, 1],
    ["46-50", 5, 18.9, 1],
    ["46-50", 6, 20.7, 1],
    ["46-50", 7, 22.4, 1],
    ["46-50", 8, 23.9, 2],
    ["46-50", 9, 25.3, 2],
    ["46-50", 10, 26.6, 2],
    ["46-50", 11, 27.7, 2],
    ["46-50", 12, 28.7, 3],
    ["46-50", 13, 29.5, 3],
    ["46-50", 14, 30.2, 3],
    ["46-50", 15, 30.7, 3],
    ["46-50", 16, 31.2, 3],

    ["51-55", 0, 8.8, 0],
    ["51-55", 1, 11.3, 0],
    ["51-55", 2, 13.7, 0],
    ["51-55", 3, 15.9, 0],
    ["51-55", 4, 18.0, 1],
    ["51-55", 5, 20.0, 1],
    ["51-55", 6, 21.8, 1],
    ["51-55", 7, 23.4, 1],
    ["51-55", 8, 25.0, 2],
    ["51-55", 9, 26.4, 2],
    ["51-55", 10, 27.6, 2],
    ["51-55", 11, 28.7, 2],
    ["51-55", 12, 29.7, 3],
    ["51-55", 13, 30.6, 3],
    ["51-55", 14, 31.2, 3],
    ["51-55", 15, 31.8, 3],
    ["51-55", 16, 32.2, 3],

    ["56 & UP", 0, 9.9, 0],
    ["56 & UP", 1, 12.4, 0],
    ["56 & UP", 2, 14.7, 0],
    ["56 & UP", 3, 17.0, 0],
    ["56 & UP", 4, 19.1, 1],
    ["56 & UP", 5, 21.0, 1],
    ["56 & UP", 6, 22.8, 1],
    ["56 & UP", 7, 24.5, 1],
    ["56 & UP", 8, 26.0, 2],
    ["56 & UP", 9, 27.4, 2],
    ["56 & UP", 10, 28.7, 2],
    ["56 & UP", 11, 29.8, 2],
    ["56 & UP", 12, 30.8, 2],
    ["56 & UP", 13, 31.6, 3],
    ["56 & UP", 14, 32.3, 3],
    ["56 & UP", 15, 32.9, 3],
    ["56 & UP", 16, 33.3, 4],
    ["56 & UP", 17, 33.3, 4],
  ];
}

class CorrellChart extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    days: "3",
  };
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.correllsData &&
      !isEqual(nextProps.correllsData, this.props.correllsData)
    ) {
      return true;
    } else {
      return false;
    }
  }
  handleCorrellChartSubmit = () => {
    this.props.getCorrellData({
      ticker_code: localStorage.getItem("ticker_code"),
      days: this.state.days ? this.state.days : "3",
    });
  };
  render() {
    var i = 1;
    var j = 1;
    var k = 1;
    var visible = false;
    var newvar = <div></div>;
    var theme = localStorage.getItem("theme");
    var correllArr = [];
    if (theme == "coffee") {
      anychart.theme(anychart.themes.coffee);
    }

    if (
      this.props.correllsData !== undefined &&
      this.props.correllsData.correll !== undefined
    ) {
      {
        Object.keys(this.props.correllsData.correll).map((sector, key) => {
          {
            Object.values(this.props.correllsData.correll[sector]).map(
              (data, index) => {
                if (data) {
                  if (
                    parseFloat(data.value) >= 0.15 &&
                    parseFloat(data.value) <= 0.5
                  ) {
                    correllArr.push({
                      y: sector,
                      x: index,
                      value: data.code + " (" + data.value + ")",
                      heat: 0,
                    });
                  } else if (
                    parseFloat(data.value) >= 0.5 &&
                    parseFloat(data.value) <= 1
                  ) {
                    correllArr.push({
                      y: sector,
                      x: index,
                      value: data.code + " (" + data.value + ")",
                      heat: 1,
                    });
                  } else if (
                    parseFloat(data.value) >= -0.5 &&
                    parseFloat(data.value) <= -0.15
                  ) {
                    correllArr.push({
                      y: sector,
                      x: index,
                      value: data.code + " (" + data.value + ")",
                      heat: 2,
                    });
                  } else if (
                    parseFloat(data.value) >= -1 &&
                    parseFloat(data.value) <= -0.5
                  ) {
                    correllArr.push({
                      y: sector,
                      x: index,
                      value: data.code + " (" + data.value + ")",
                      heat: 3,
                    });
                  } else if (
                    parseFloat(data.value) >= -0.15 &&
                    parseFloat(data.value) <= 0.15
                  ) {
                    correllArr.push({
                      y: sector,
                      x: index,
                      value: data.code + " (" + data.value + ")",
                      heat: 4,
                    });
                  }
                }
                // {Object.values(this.props.correllsData.correll[sector][data]).map((correll, i) => {
                // correllArr.push({'y':sector, 'x':index, 'value': parseFloat(data.value)});
                // corrl = correllArr.sort(
                //   (p1, p2) => (p1.heat < p2.heat && p1.x < p2.x) ? 1 : (p1.heat > p2.heat && p1.x > p2.x) ? -1 : 0);
                // corrl = correllArr.sort((a, b)=> {
                //   if (a.x === b.x){
                //     return a.heat < b.heat ? -1 : 1
                //   } else {
                //     return a.x < b.x ? -1 : 1
                //   }
                // })
                // })};
                // console.log("CORRELL DATA =>", correllArr);
              }
            );
          }
        });
      }
      visible = true;
    }

    var data = anychart.data.set(correllArr);
    var correll_mapping = data.mapAs({
      y: 0,
      x: 1,
      value: 2,
      heat: 3,
    });

    var correll_chart = anychart.heatMap(correll_mapping);
    if (this.props.overview.length > 0) {
      correll_chart.title(
        this.props.overview[0].tickername +
          " (" +
          this.props.overview[0].tickercode +
          ")" +
          " correlation with other contracts"
      );
    }
    // helper function to setup same settings for all six charts
    //var setupChartSettings = function (chart) {

    correll_chart
      .container("container")
      .padding([5, 10, 5, 10])
      .margin(0)
      .background("#F3F5F7")
      .xAxis(false)
      .interactivity({ selectionMode: "none" });
    if (theme == "default") {
      correll_chart
        .container("container")
        .padding(0)
        .margin(0)
        .background("#0D1C32")
        .xAxis(false)
        .interactivity({ selectionMode: "none" });
    }
    correll_chart
      .yAxis()
      .stroke("#fff")
      .ticks(false);
    // correll_chart.yAxis().title().enabled(true).text('Age').padding(0).margin(0);

    // Sets title setting
    // correll_chart
    //   .title()
    //   .enabled(true)
    //   .padding([0, 0, 5, 75])
    //   .fontColor("#212121")
    //   .align("left");

    // Sets labels
    correll_chart.labelsDisplayMode("drop");
    correll_chart
      .labels()
      .enabled(true)
      .maxFontSize(12)
      .format(function() {
        return this.getData("value");
      });

    // Sets correll_chart settings and hover correll_chart settings
    correll_chart.stroke("#fff");

    correll_chart
      .hovered()
      .stroke("4 #fff")
      .fill("#545f69")
      .labels({ fontColor: "#fff" });

    // Sets range for colorScale
    var colorScale = correll_chart.colorScale();

    // Sets colors for all points
    colorScale.ranges([
      { equal: 0, color: "#3085be 0.8", name: "Fair correlated" },
      { equal: 1, color: "#69bce8 0.8", name: "Direct Correlated" },
      { equal: 2, color: "#ffa000 0.8", name: "Fair Inverse Correlated" },
      { equal: 3, color: "#ff6d00 0.8", name: "Inverse Correlated" },
      { equal: 4, color: "#a09d9d 0.8", name: "Not correlated" },
    ]);
    correll_chart.colorScale(colorScale);
    // Sets legend
    correll_chart
      .legend()
      .enabled(true)
      .align("left")
      .position("center-top")
      .itemsLayout("horizontal")
      .padding([0, 0, 8, 75]);

    // Turns tooltips off
    correll_chart.tooltip(false);
    // };

    // Creates Heat Map for Men
    // var menChart = anychart.heatMap(correll_mapping);
    // menChart.title('Body Fat Percentage Chart for Men');
    // menChart.bounds(0, 0, '100%', '50%');
    // setupChartSettings(menChart);
    // menChart.draw();

    newvar = (
      <div className="">
        {
          <AnyChart
            width="100%"
            height={400}
            instance={correll_chart}
            id="CorrellChart"
          />
        }
      </div>
    );

    // // Creates Heat Map for Women
    // var womenChart = anychart.heatMap(heatMapWomenData);
    // womenChart.title('Body Fat Percentage Chart for Women');
    // womenChart.bounds(0, '50%', '100%', '50%');
    // setupChartSettings(womenChart);
    // womenChart.draw();

    // var credits = womenChart.credits();
    // credits.enabled(true);
    // credits.url('http://www.bodyfatcharts.com/');
    // credits.text('Data source: http://www.bodyfatcharts.com/');

    return (
      <div style={{ width: "100%" }}>
        <>
          <div>
            <Row>
              <Col lg={24}>
                <Row className="EventInputs" align="center">
                  <Col
                    lg={4}
                    align="center"
                    className={theme == "default" ? "eventColDays" : "eventCol"}
                  >
                    <lable>Days</lable>
                    <select
                      className="ti_modal_fields Events"
                      name="days"
                      defaultValue={this.state.days}
                      onChange={this.handleChange}
                    >
                      <option key="day3" value="3">
                        3
                      </option>
                      <option key="day4" value="4">
                        4
                      </option>
                      <option key="day5" value="5">
                        5
                      </option>
                      <option key="day6" value="6">
                        6
                      </option>
                      <option key="day7" value="7">
                        7
                      </option>
                    </select>
                  </Col>
                  <Col lg={4}>
                    <Button
                      // type="primary"
                      style={{ marginTop: "19px" }}
                      onClick={() => this.handleCorrellChartSubmit()}
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
                {/* {visible ? ( */}
                {newvar}
                {/* ):(
                    <div className="nodata_div" align="center">
                      {theme == "light" ? (
                        <img alt="" src={require("assets/images/empty.png")} />
                      ) : (
                        <img alt="" src={require("assets/images/emptyWhite.png")} />
                      )}
                      <br />
                      <span className="nodata_title">No Data</span>
                    </div>
                  )} */}
              </Col>
            </Row>
          </div>
        </>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    correllsData: state.Exchange.correllsData,
    overview: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "overview")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
      }),
  };
};
export default connect(
  mapStateToProps,
  { getCorrellData }
)(CorrellChart);
