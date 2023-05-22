import React, { Component } from "react";
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
import CircularProgress from "components/CircularProgress";

class SNRFB extends Component {
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
    if (nextProps.snrFB && !isEqual(nextProps.snrFB, this.props.snrFB)) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    var newvarFB = <div></div>;
    var title_date = "";
    if (
      this.props.snrFB.length > 0 &&
      this.props.snrFB[0].data
    ) {
      title_date = this.props.snrFB[0].date;
      const SNRFB = this.props.snrFB[0].data["dir"];
      newvarFB = (
        <div className="cust_bullet_chart">
          <Row className="custom_main_chart_title cust-hass-font">
            <Col lg={4} align="center">
              <span>
                <strong>Code</strong>
              </span>
            </Col>
            <Col lg={10} align="center">
              <span>
                <strong>Ticker</strong>
              </span>
            </Col>
            <Col lg={10} align="center">
              <span>
                <strong>Direction</strong>
              </span>
            </Col>
          </Row>
          {SNRFB.map((item, key) => {
            if (item["dir"] != "0") {
              return (
                <div key={"div_"+item["ticker_code"]}>
                  <Row className="custom_main_chart">
                    <Col lg={4} align="center">
                      <span
                        className="cust-ticker-hover"
                        onClick={() => this.OpenModal(item["ticker_code"])}
                      >
                        {item["ticker_code"]}
                      </span>
                    </Col>
                    <Col lg={10} align="center">
                      <span>{item["ticker_name"]}</span>
                    </Col>
                    <Col lg={10} align="center">
                      <span>
                        {item["dir"] === "down" ? (
                          <span>
                            <img
                              alt=""
                              src={require("assets/images/ArrowDown_m.png")}
                              className="arrow_icons"
                            />
                          </span>
                        ) : (
                          <span>
                            <img
                              alt=""
                              src={require("assets/images/ArrowUp_m.png")}
                              className="arrow_icons"
                            />
                          </span>
                        )}
                      </span>
                    </Col>
                  </Row>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      );
    }
    return (
      <div style={{ width: "100%" }} className="cust_bullet_chart cust_ecin_div cust-tab-font">
        <span className="cust_desciption cust-hass-font">False Break pattern on day {title_date}</span>
        <div className="cust_price_chart">
            {newvarFB}
        </div>
        {this.props.loader ? <div><CircularProgress className="gx-loader-view cot_loader"/></div> : ''}
        <Modal
          className="week_modal confirmation_modal"
          visible={this.state.modalVisible}
          onCancel={this.handleCancel}
        >
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
    loader: state.Exchange.loader,
    snrFB: Object.keys(state.Exchange.variousdata)
      .filter((priceDataIndex) => priceDataIndex == "snrfb")
      .map((priceDataIndex) => {
        return state.Exchange.variousdata[priceDataIndex];
      }),
  };
};
export default connect(
  mapStateToProps,
  { getmoveDate, changeScroller, addClicked, tableData }
)(SNRFB);
