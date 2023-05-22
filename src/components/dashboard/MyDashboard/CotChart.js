import React, { Component } from "react";
import AnyChart from "anychart-react";
import anychart from "anychart";
import { Popover, Switch, Menu, Modal, Input, Button } from "antd";
import { connect } from "react-redux";
import {
  clearData,
  cotclickclear,
  changeScroller,
  getGraphData,
  cotloaderstatus,
} from "appRedux/actions/Exchange";
import { Link } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";

var cotdataArray = [];
// const SubMenu = Menu.SubMenu;
class CotChart extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    switchname: "",
    switchvalue: false,
    statedate: "",
    gridstate: true,
    statevalue: "",
    series: "stepLine",
    // seriesname:'',
  };
  componentDidMount() {}
  onChangecolormain(chart, event, name) {
    if (event) {
      this.setState({
        [name]: true,
        switchvalue: true,
      });
      if (
        this.props.moveDate.moveDate != "" ||
        this.props.moveDate.moveDate != undefined
      ) {
        chart.background().fill("#ffffff");
      }
    } else {
      this.setState({
        [name]: false,
        switchvalue: false,
      });
      if (
        this.props.moveDate.moveDate != "" ||
        this.props.moveDate.moveDate != undefined
      ) {
        chart.background().fill("#FFFFFF 0");
      }
    }
  }
  chartchange(series, value, seriesstate) {
    //series.seriesType(value);
    this.setState({
      [seriesstate]: value,
      // seriesname:series,
    });
  }
  open1o1modal(i, cotdataArray) {
    var prestate = JSON.parse(localStorage.getItem("prestate"));
    prestate.graphdata = [cotdataArray[i - 1]];
    if (this.props.selectedGRAPH.length > 0) {
      {
        localStorage.setItem("chart_id", this.props.selectedGRAPH[i - 1]);
      }
    }
    localStorage.setItem("prestate", JSON.stringify(prestate));
    localStorage.setItem("cot", i);
    localStorage.setItem("ecin", 0);
    this.setState({
      visible1o1: true,
    });
  }
  showModal(graph_id, type, ticker_id) {
    this.setState({
      graph_id: graph_id,
      type: type,
      ticker_id: ticker_id,
      weekvisible: true,
    });
  }
  handleCancel = () => {
    this.setState({
      weekvisible: false,
    });
  };
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    var reqvar = {
      selectedGRAPH: this.state.graph_id,
      ticker_id: this.state.ticker_id,
      type: this.state.type,
      week: this.state.weekcount,
    };
    this.props.getGraphData(reqvar);
    this.setState({
      weekvisible: false,
    });
  };
  gridonoff(firstPlot, status) {
    this.setState({
      gridstate: status,
    });
  }
  createDrawing(plot, type) {
    plot.annotations().startDrawing(type);
  }
  removeDrawing(plot) {
    plot.annotations().removeAllAnnotations();
  }
  removeChart(chart) {
    chart.dispose();
    chart = null;
  }

  render() {
    var height = 0;
    var i = 1;
    var type = "";
    var chart_id = "";
    var ticker_id = "";
    var newvar = <div></div>;
    if (this.props.graphdata != "" || cotdataArray.length > 0) {
      const NUMBER_FORMAT = {
        scale: {
          factors: [1e9, 1e6, 1e3, 1],
          suffixes: ["B", "M", "K", ""],
        },
        decimalsCount: 0,
      };
      if (this.props.clearcotstatus.status) {
        cotdataArray = [];
        this.props.clearcotstatus.status = false;
      }
      if (this.props.graphdata.length != "") {
        cotdataArray.push(this.props.graphdata);
        this.props.clearData();
      }

      height = cotdataArray.length * 180;
      var series;
      newvar = (
        <div>
          {cotdataArray.map((firstkey, item) => {
            // console.log('asplaspl',firstkey.ciname);
            // var length = key.length
            // var verticalline_date = key[length-1]['date'];
            var verticalline_date;
            var chart = anychart.stock();
            chart.background().fill("#FFFFFF 0");
            chart.scroller().enabled(false);
            var switchstate = "switch_" + i;
            var seriesstate = "series_" + i;
            var tooltip = chart.tooltip();
            tooltip.displayMode("union");
            tooltip.positionMode("chart");
            tooltip.anchor("right-top");
            tooltip.position("right-top");
            // console.log("firstkey");
            chart.title(firstkey.ciname);
            chart.title().fontSize(12);
            chart.title().fontColor("#e06666");
            // //enables HTML tags
            // title.useHtml(true);
            // title.text(
            //     "<span style=\"color:#e06666; font-size: 12px;\">"
            //     +firstkey.ciname+"</span>"
            // );

            chart.tooltip().format(function() {
              var str = this.seriesName + ": ";
              str += anychart.format.number(this.value, NUMBER_FORMAT);
              return str;
            });
            chart
              .crosshair()
              .yLabel()
              .format(function() {
                return anychart.format.number(this.value, NUMBER_FORMAT);
              });

            var firstPlot = chart.plot(0);
            firstPlot
              .yAxis()
              .labels()
              .format(function() {
                return anychart.format.number(this.value, NUMBER_FORMAT);
              });
            // firstPlot.legend(false);
            // firstPlot.yAxis().labels().position("inside");
            var mapping;
            var msftSeries;
            Object.keys(firstkey[0]).map((item, key) => {
              // anychart.format.inputDateTimeFormat('yyyy-MM-dd');
              // firstkey=firstkey[0];
              var cotDataTable = anychart.data.table("date");
              cotDataTable.addData(firstkey[0][item]);
              type = firstkey[0][item][0]["type"];
              chart_id = firstkey[0][item][0]["graphid"];
              ticker_id = firstkey[0][item][0]["ticker_id"];
              mapping = cotDataTable.mapAs({ value: "calculation" });
              // mapping.addField('value', 1);
              msftSeries = firstPlot.stepLine(
                cotDataTable.mapAs({ value: "calculation" })
              );
              msftSeries.stepDirection("backward");
              msftSeries.name(item);
              if (this.state[seriesstate]) {
                // var series =  this.state[seriesstate];
                msftSeries.seriesType(this.state[seriesstate]);
                if (this.state[seriesstate] == "stepLine") {
                  msftSeries.stepDirection("backward");
                }
              }
              // else
              // {
              //   msftSeries.seriesType(this.state.series);
              // }
              // var formatter = "{%seriesName}: {%value}{scale:(1)(1000)(1000)(1000)|( )( K)( M)( B)}";
              // var columnTooltip = msftSeries.tooltip();
              // columnTooltip.format(formatter);
            });

            chart.listen("selectedrangechangefinish", (e) => {
              var startRatio = anychart.format.dateTime(
                e.firstSelected,
                "dd MMM yyyy"
              );
              var endRatio = anychart.format.dateTime(
                e.lastSelected,
                "dd MMM yyyy"
              );
              var data = { start: startRatio, end: endRatio };
              this.props.changeScroller(data);
            });
            if (this.state.gridstate) {
              firstPlot.xGrid().enabled(true);
              firstPlot.xGrid().stroke({
                // set stroke color
                color: "#2f3c55",
                // set dashes and gaps length
                dash: "2 5",
              });
              firstPlot.yGrid().enabled(true);
              firstPlot.yGrid().stroke({
                // set stroke color
                color: "#2f3c55",
                // set dashes and gaps length
                dash: "2 5",
              });
            }
            if (this.props.scrollData != "") {
              chart.selectRange(
                this.props.scrollData.start,
                this.props.scrollData.end
              );
            }

            // add items
            var xScale = chart.xScale();
            var min = null;
            var max = null;
            var gap = null;
            chart.contextMenu().itemsFormatter(function(items) {
              // starting index
              var index = items["zoom-marquee-start"].index;

              // add item with custom action
              items["zoomout"] = {
                text: "Zoom out",
                action: function() {
                  max = xScale.getMaximum();
                  min = xScale.getMinimum();
                  gap = max - min;
                  chart.selectRange(min - gap * 0.1, max + gap * 0.1);
                },
                index: index + 0.01,
              };
              items["resize"] = {
                text: "Resize",
                action: function() {
                  chart.selectRange(
                    xScale.getFullMinimum(),
                    xScale.getFullMaximum()
                  );
                },
                index: index + 0.02,
              };
              return items;
            });
            if (this.props.moveDate.moveDate != "" && this.state[switchstate]) {
              chart.crosshair(false);
              if (this.state[switchstate]) {
                chart.background().fill("#ffffff");
              }
              var controller = firstPlot.annotations();

              // create a Vertical Line annotation
              var date =
                this.props.moveDate != ""
                  ? this.props.moveDate.moveDate
                  : verticalline_date;
              var verticalLine2 = controller.verticalLine({
                xAnchor: date,
                allowEdit: false,
              });
              verticalLine2.normal().stroke("#006600", 1, "10 2");
              var xValue = controller.getAnnotationAt(0).xAnchor();
              //get data from clicked point
              var selectable = mapping.createSelectable();
              var interval = chart.grouping().getCurrentDataInterval();
              selectable.selectAll("day", 1);
              var select = selectable.search(xValue, "nearest");
              //get point value
              //var value = select.Mf.values[0];
              var value = select.get("value");
              // //get point date (in milliseconds)
              var key = select.getKey();
              // //format date and parse to string
              var pointDate = new Date(key);
              var month =
                String(pointDate.getMonth() + 1) < 10
                  ? "0" + String(pointDate.getMonth() + 1)
                  : String(pointDate.getMonth() + 1);
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
              // chart.title(' Date: ' + pointDateString + ', Value: ' + value);
              msftSeries
                .tooltip()
                .format(" Date: " + pointDateString + ", Value: " + value);
              if (this.props.tableData.length > 0) {
                var markers = [];
                this.props.tableData.map((key, item) => {
                  var marker_objects = {
                    format: key.symbol,
                    data: [
                      {
                        date: key.date,
                        description: key.description,
                      },
                    ],
                    normal: { fill: key.format },
                  };
                  markers.push(marker_objects);
                });
                firstPlot.eventMarkers({ groups: markers });
                firstPlot.eventMarkers().position("series");
                firstPlot.eventMarkers().seriesId(0);
              }
              if (this.props.cotclicked != "") {
                selectable.selectAll("day", 1);
                var select = selectable.search(xValue, "nearest");
                //get point value
                //var value = select.Mf.values[0];
                var value = select.get("value");
                var key = select.getKey();
                // //format date and parse to string
                var pointDate = new Date(key);
                var month =
                  String(pointDate.getMonth() + 1) < 10
                    ? "0" + String(pointDate.getMonth() + 1)
                    : String(pointDate.getMonth() + 1);
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
                // chart.title(' Date: ' + pointDateString + ', Value: ' + value);
                msftSeries
                  .tooltip()
                  .format(" Date: " + pointDateString + ", Value: " + value);
                if (this.props.tableData.length > 0) {
                  var length1 = this.props.tableData.length - 1;
                  this.props.tableData[length1]["cot"] = value;
                  this.props.tableData[length1]["ecin"] = "";
                }
                this.props.cotclickclear();
              }
            } else {
              chart.crosshair(true);
              chart.background().fill("#FFFFFF 0");
            }
            const changeOptions = (
              <Menu className="chart_hamburger_ul">
                <SubMenu
                  className="gx-menu-horizontal"
                  title={<span>Chart Type</span>}
                >
                  <Menu.Item
                    onClick={() =>
                      this.chartchange(msftSeries, "line", seriesstate)
                    }
                  >
                    Line
                  </Menu.Item>
                  <Menu.Item
                    onClick={() =>
                      this.chartchange(msftSeries, "spline", seriesstate)
                    }
                  >
                    Spline
                  </Menu.Item>
                  <Menu.Item
                    onClick={() =>
                      this.chartchange(msftSeries, "stepLine", seriesstate)
                    }
                  >
                    Step Line
                  </Menu.Item>
                </SubMenu>
                {type == "dynamic" ? (
                  <Menu.Item
                    onClick={() => this.showModal(chart_id, type, ticker_id)}
                  >
                    Select weeks
                  </Menu.Item>
                ) : (
                  ""
                )}
                <SubMenu
                  className="gx-menu-horizontal"
                  title={<span>Grids</span>}
                >
                  <Menu.Item onClick={() => this.gridonoff(firstPlot, true)}>
                    ON
                  </Menu.Item>
                  <Menu.Item onClick={() => this.gridonoff(firstPlot, false)}>
                    OFF
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  className="gx-menu-horizontal"
                  title={<span>Drawing Tools</span>}
                >
                  <Menu.Item
                    onClick={() =>
                      this.createDrawing(firstPlot, "horizontal-line")
                    }
                  >
                    Horizontal Line
                  </Menu.Item>
                  <Menu.Item
                    onClick={() =>
                      this.createDrawing(firstPlot, "vertical-line")
                    }
                  >
                    Vertical Line
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => this.createDrawing(firstPlot, "line")}
                  >
                    Line Segment
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => this.createDrawing(firstPlot, "marker")}
                  >
                    Marker
                  </Menu.Item>
                  <Menu.Item onClick={() => this.removeDrawing(firstPlot)}>
                    Remove All
                  </Menu.Item>
                </SubMenu>
              </Menu>
            );
            // msftSeries.name(item+"_"+i);
            // const changeOptions = (
            //   <ul className="gx-user-popover">
            //     <li
            //      onClick={() => this.chartchange(msftSeries,'line')}
            //     >Line</li>
            //     <li
            //     onClick={() => this.chartchange(msftSeries,'spline')}
            //     >Spline</li>
            //   </ul>
            // );
            var n = "switch_" + i;
            var graphclick = i;
            return (
              <div
                className={
                  this.state[switchstate] && this.props.moveDate.moveDate != ""
                    ? "chart_box_design cust_price_chart container_white"
                    : "chart_box_design cust_price_chart"
                }
              >
                <p>
                  {/* <span style={{'float':"left",'display':'inline-block'}}>
                      <span className='title_class'>{ticker_name}</span><br />
                      <span className='subtitle_class'><b>{cftc_market} {eod_data}</b></span>
                    </span> */}
                  <Modal
                    className="week_modal"
                    visible={this.state.weekvisible}
                    onCancel={this.handleCancel}
                  >
                    <form onSubmit={this.handleSubmit} method="post">
                      Number of Weeks:{" "}
                      <Input
                        name="weekcount"
                        type="number"
                        placeholder="Weeks"
                        value={this.state.weekcount}
                        onChange={this.handleChange}
                      />
                      <div align="center">
                        <Button className="week_btn" htmlType="submit">
                          Submit
                        </Button>
                      </div>
                    </form>
                  </Modal>
                  <span
                    style={{ float: "right", display: "inline-block" }}
                    className="subtitle_class"
                  >
                    <Switch
                      size="small"
                      name={"switch_" + i}
                      onChange={(e) => this.onChangecolormain(chart, e, n)}
                    />
                    <Popover
                      overlayClassName="gx-popover-horizantal chart_hamburger_menu "
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
                    <Link to={"/oneoone"} target="_blank">
                      <span className="gx-pointer gx-flex-row gx-align-items-center">
                        <i
                          class="icon icon-expand"
                          style={{ fontSize: "20px" }}
                          onClick={() =>
                            this.open1o1modal(graphclick, cotdataArray)
                          }
                        ></i>
                      </span>
                    </Link>
                    {/* <span className="gx-pointer gx-flex-row gx-align-items-center">
                          <i class="icon icon-close" style={{'fontSize':'20px'}} onClick={() => this.removeChart(chart)} ></i> 
                        </span>  */}
                  </span>
                </p>

                <AnyChart
                  id={"cotchart_" + i++}
                  width="100%"
                  height={180}
                  instance={chart}
                />
              </div>
            );
            // }
          })}
        </div>
      );
      // if(this.props.cotloader)
      // {
      //   this.props.cotloaderstatus(false);
      // }
    }

    return <div style={{ width: "100%" }}>{newvar}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    clearcotstatus: state.Exchange.clearcotstatus,
    selectedGRAPH: state.Exchange.selectedGRAPH,
    cotloader: state.Exchange.cotloader,
    moveDate: state.Exchange.moveDate,
    scrollData: state.Exchange.scrollData,
    cotData: state.Exchange.cotData,
    graphdata: state.Exchange.graphdata,
    addClicked1: state.Exchange.addClicked1,
    cotclicked: state.Exchange.cotclicked,
    tableData: state.Exchange.tableData,
  };
};
export default connect(
  mapStateToProps,
  { clearData, cotclickclear, changeScroller, getGraphData, cotloaderstatus }
)(CotChart);
