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
import PropTypes from "prop-types";
import { Row, Col, Modal, Button } from "antd";
import isEqual from "lodash/isEqual";
var common_colors = require("../../../assets/theme-variable");
var theme = localStorage.getItem("theme");
var bgcolor = common_colors.default_main_color;
if (theme == "coffee") {
  anychart.theme(anychart.themes.coffee);
  bgcolor = common_colors.coffee_main_color;
}
class NZLC extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };
  constructor(props, context) {
    super(props, context);
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
  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };
  maintoSE() {
    this.context.router.history.push({
      pathname: "/dashboard",
      state: { ticker: this.state.ticker },
    });
    this.setState({ modalVisible: false });
  }
  closeModal() {
    this.setState({ modalVisible: false });
  }
  OpenModal = (ticker) => {
    this.setState({ modalVisible: true, ticker: ticker });
  };
  shouldComponentUpdate(nextProps) {
    if (nextProps.nzlc && !isEqual(nextProps.nzlc, this.props.nzlc)) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    var palette = anychart.palettes.defaultPalette;
    if (theme == "coffee") {
      anychart.theme(anychart.themes.coffee);
      palette = anychart.palettes.coffee;
    }
    var newvar = <div></div>;
    var newvar1 = <div></div>;
    var legends1 = <div></div>;
    var legends2 = <div></div>;
    var title_date = "";
    var com_nzlc = [];
    var non_nzlc = [];
    if (this.props.nzlc.length > 0) {
      // if(this.props.nzlc[0].length > 0){

      var bulletchart;
      var linechart;
      var j = 1;
      title_date = this.props.nzlc[0].date;
      com_nzlc = JSON.parse(this.props.nzlc[0].com_ticker);
      non_nzlc = JSON.parse(this.props.nzlc[0].non_ticker);
      // console.log(com_nzlc);
      var r = [];
      r[0] = 1;
      legends1 = (
        <div>
          {r.map((key) => {
            var stage = anychart.graphics.create();
            var legend = anychart.standalones.legend();
            var items = [
              {
                index: 0,
                text: "Actual",
                // 'iconType': 'area',
                iconTextSpacing: "1px",
                iconStroke: "none",
                iconFill: palette[0],
              },
              {
                index: 1,
                text: "Previous",
                // 'iconType': 'area',
                iconTextSpacing: "1px",
                iconStroke: "none",
                iconFill: "#828282",
              },
            ];
            legend
              .fontSize("14px")
              .fontFamily("'Verdana', Helvetica, Arial, sans-serif")
              .itemsLayout("horizontal")
              .fontColor("#7c8482")
              .iconTextSpacing(0)
              .align("right")
              .position("center-bottom")
              .padding(0)
              .margin(0, 0, 7, 0)
              .itemsSpacing(3)
              .title(false)
              .titleSeparator(false)
              .paginator(false)
              .background(false)
              .items(items);
            return (
              <AnyChart
                id={"legend1"}
                width="100%"
                height={30}
                key={"legend1"}
                instance={stage}
                charts={[legend]}
              />
            );
          })}
        </div>
      );
      legends2 = (
        <div>
          {r.map((key) => {
            var stage = anychart.graphics.create();
            var legend = anychart.standalones.legend();
            var items = [
              {
                index: 0,
                text: "Actual",
                // 'iconType': 'area',
                iconTextSpacing: "1px",
                iconStroke: "none",
                iconFill: palette[0],
              },
              {
                index: 1,
                text: "Previous",
                // 'iconType': 'area',
                iconTextSpacing: "1px",
                iconStroke: "none",
                iconFill: "#828282",
              },
            ];
            legend
              .fontSize("14px")
              .fontFamily("'Verdana', Helvetica, Arial, sans-serif")
              .itemsLayout("horizontal")
              .fontColor("#7c8482")
              .iconTextSpacing(0)
              .align("right")
              .position("center-bottom")
              .padding(0)
              .margin(0, 0, 7, 0)
              .itemsSpacing(3)
              .title(false)
              .titleSeparator(false)
              .paginator(false)
              .background(false)
              .items(items);
            return (
              <AnyChart
                id={"legend2"}
                width="100%"
                height={30}
                key={"legend2"}
                instance={stage}
                charts={[legend]}
              />
            );
          })}
        </div>
      );
      newvar = (
        <div className="cust_bullet_chart">
          <Row className="custom_main_chart_title cust-hass-font">
            <Col lg={7} align="center">
              <span>
                <strong>Last 12 Month</strong>
              </span>
            </Col>
            <Col lg={2} align="center">
              <span>
                <strong>Code</strong>
              </span>
            </Col>
            <Col lg={6} align="center">
              <span>
                <strong>Ticker</strong>
              </span>
            </Col>
            <Col lg={7} align="center">
              <span>
                <strong>O Crossover</strong>
              </span>
            </Col>
            <Col lg={2} align="center">
              <span>
                <strong>C.O.(%)</strong>
              </span>
            </Col>
          </Row>
          {Object.keys(com_nzlc).map((key) => {
            var overall_diff =
              com_nzlc[key]["current"] - com_nzlc[key]["previous"];
            // console.log('asplvalue',overall_diff);
            var close_diff = com_nzlc[key]["current"] - 0;
            // console.log('asplvalue1',close_diff);
            var value = 100 - (close_diff * 100) / overall_diff;
            // console.log('asplnzlc',value);
            if (com_nzlc[key]["value"] < 0) {
              bulletchart = anychart.bullet([
                {
                  value: 100,
                  type: "bar",
                  gap: 0.1,
                  fill: "#828282",
                  stroke: null,
                },
                {
                  value: value,
                  type: "bar",
                  gap: 0.1,
                  fill: palette[0],
                  stroke: null,
                },
                {
                  value: value,
                  type: "line",
                  gap: 0.5,
                  fill: "black",
                  stroke: {
                    thickness: 2,
                    color: "black",
                  },
                },
                // {value: value}
              ]);
            }
            if (com_nzlc[key]["value"] >= 0) {
              bulletchart = anychart.bullet([
                {
                  value: 100,
                  type: "bar",
                  gap: 0.1,
                  fill: palette[0],
                  stroke: null,
                },
                {
                  value: value,
                  type: "bar",
                  gap: 0.1,
                  fill: "#828282",
                  stroke: null,
                },
                {
                  value: value,
                  type: "line",
                  gap: 0.5,
                  fill: "black",
                  stroke: {
                    thickness: 2,
                    color: "black",
                  },
                },
                // {value: value}
              ]);
            }
            // Set bulletchart ranges
            // bulletchart.legend().enabled(true);
            bulletchart
              .range()
              .from(0)
              .to(100);
            bulletchart.background().fill("#FFFFFF 0");
            // Set bulletchart size and position settings
            bulletchart.bounds(0, 0, "100%", 125);

            // console.log('asplprice',com_nzlc[key]['pricedata'])
            linechart = anychart.sparkline();
            linechart.data(com_nzlc[key]["pricedata"]);
            linechart.background().fill("#FFFFFF 0");
            return (
              <div>
                <Row className="custom_main_chart">
                  <Col lg={7}>
                    <AnyChart
                      id={"sparkline_" + j++}
                      width="100%"
                      height={20}
                      key={"sparkline_" + j++}
                      instance={linechart}
                    />
                  </Col>
                  <Col lg={2}>
                    <span
                      className="cust-ticker-hover"
                      onClick={() => this.OpenModal(key)}
                    >
                      {key}
                    </span>
                  </Col>
                  <Col lg={6}>
                    <span>{com_nzlc[key]["name"]}</span>
                  </Col>
                  <Col lg={7}>
                    <AnyChart
                      id={"bullet_" + j++}
                      width="100%"
                      height={20}
                      key={"bullet_" + j++}
                      instance={bulletchart}
                    />
                  </Col>
                  <Col lg={2}>
                    <span>{com_nzlc[key]["value"] + "%"}</span>
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
      );

      // Non Commercial Charts
      newvar1 = (
        <div className="cust_bullet_chart">
          <Row></Row>
          <Row className="custom_main_chart_title cust-hass-font">
            <Col lg={7} align="center">
              <span>
                <strong>Last 12 Month</strong>
              </span>
            </Col>
            <Col lg={2} align="center">
              <span>
                <strong>Code</strong>
              </span>
            </Col>
            <Col lg={6} align="center">
              <span>
                <strong>Ticker</strong>
              </span>
            </Col>
            <Col lg={7} align="center">
              <span>
                <strong>O Crossover</strong>
              </span>
            </Col>
            <Col lg={2} align="center">
              <span>
                <strong>C.O.(%)</strong>
              </span>
            </Col>
          </Row>
          {Object.keys(non_nzlc).map((key) => {
            var overall_diff =
              non_nzlc[key]["current"] - non_nzlc[key]["previous"];
            var close_diff = non_nzlc[key]["current"] - 0;
            var value = 100 - (close_diff * 100) / overall_diff;
            if (non_nzlc[key]["value"] < 0) {
              bulletchart = anychart.bullet([
                {
                  value: 100,
                  type: "bar",
                  gap: 0.1,
                  fill: "#828282",
                  stroke: null,
                },
                {
                  value: value,
                  type: "bar",
                  gap: 0.1,
                  fill: palette[0],
                  stroke: null,
                },
                {
                  value: value,
                  type: "line",
                  gap: 0.5,
                  fill: "black",
                  stroke: {
                    thickness: 2,
                    color: "black",
                  },
                },
                // {value: value}
              ]);
            }
            if (non_nzlc[key]["value"] >= 0) {
              bulletchart = anychart.bullet([
                {
                  value: 100,
                  type: "bar",
                  gap: 0.1,
                  fill: palette[0],
                  stroke: null,
                },
                {
                  value: value,
                  type: "bar",
                  gap: 0.1,
                  fill: "#828282",
                  stroke: null,
                },
                {
                  value: value,
                  type: "line",
                  gap: 0.5,
                  fill: "black",
                  stroke: {
                    thickness: 2,
                    color: "black",
                  },
                },
                // {value: value}
              ]);
            }
            // Set bulletchart ranges
            // bulletchart.legend().enabled(true);
            bulletchart
              .range()
              .from(0)
              .to(100);
            bulletchart.background().fill("#FFFFFF 0");
            // Set bulletchart size and position settings
            bulletchart.bounds(0, 0, "100%", 125);

            // console.log('asplprice',non_nzlc[key]['pricedata'])
            linechart = anychart.sparkline();
            linechart.data(non_nzlc[key]["pricedata"]);
            linechart.background().fill("#FFFFFF 0");
            return (
              <div key={"div_" + non_nzlc[key]["name"]}>
                <Row className="custom_main_chart">
                  <Col lg={7}>
                    <AnyChart
                      id={"sparkline_" + j++}
                      width="100%"
                      height={20}
                      key={"sparkline_" + j++}
                      instance={linechart}
                    />
                  </Col>
                  <Col lg={2}>
                    <span
                      className="cust-ticker-hover"
                      onClick={() => this.OpenModal(key)}
                    >
                      {key}
                    </span>
                  </Col>
                  <Col lg={6}>
                    <span>{non_nzlc[key]["name"]}</span>
                  </Col>
                  <Col lg={7}>
                    <AnyChart
                      id={"bullet_" + j++}
                      width="100%"
                      height={20}
                      key={"bullet_" + j++}
                      instance={bulletchart}
                    />
                  </Col>
                  <Col lg={2}>
                    <span>{non_nzlc[key]["value"] + "%"}</span>
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
      );

      // }
    }
    return (
      <div style={{ width: "100%" }} className="cust_bullet_chart ">
        <span className="cust_desciption cust-hass-font">
          Commercial Net 0 Line Crossover as per report dated {title_date}
        </span>
        {com_nzlc.length || com_nzlc != "" ? (
          <div className="cust_price_chart">
            {legends1}
            {newvar}
          </div>
        ) : (
          <div className="cust_price_chart">
            <div className="nodata_div" align="center">
              {theme == "light" ? (
                <img alt="" src={require("assets/images/empty.png")} />
              ) : (
                <img alt="" src={require("assets/images/emptyWhite.png")} />
              )}
              <br />
              <span className="nodata_title">No Data</span>
            </div>
          </div>
        )}
        <span
          className="cust_desciption cust-hass-font"
          style={{ marginTop: "15px" }}
        >
          Non-Commercial Net 0 Line Crossover as per report dated {title_date}
        </span>
        {non_nzlc.length || non_nzlc != "" ? (
          <div className="cust_price_chart">
            {legends2}
            {newvar1}
          </div>
        ) : (
          <div className="cust_price_chart">
            <div className="nodata_div" align="center">
              {theme == "light" ? (
                <img alt="" src={require("assets/images/empty.png")} />
              ) : (
                <img alt="" src={require("assets/images/emptyWhite.png")} />
              )}
              <br />
              <span className="nodata_title">No Data</span>
            </div>
          </div>
        )}
        <Modal
          className="week_modal confirmation_modal"
          visible={this.state.modalVisible}
          onCancel={this.handleCancel}
        >
          {/* <form onSubmit={this.handleSubmit} method="post"> */}
          You have Clicked on ticker <strong>{this.state.ticker}</strong> and
          you will be redirect to Setup Explore if you click on Confirm button
          <div align="right">
            <Button type="danger" onClick={() => this.closeModal()}>
              Cancel
            </Button>
            <Button type="primary" onClick={() => this.maintoSE()}>
              Confirm
            </Button>
          </div>
          {/* </form> */}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nzlc: Object.keys(state.Exchange.cotreportdata)
      .filter((priceDataIndex) => priceDataIndex == "nzlc")
      .map((priceDataIndex) => {
        return state.Exchange.cotreportdata[priceDataIndex];
      }),
  };
};
export default connect(
  mapStateToProps,
  { getmoveDate, changeScroller, addClicked, tableData }
)(NZLC);
