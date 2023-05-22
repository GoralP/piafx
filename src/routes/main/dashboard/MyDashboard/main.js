import React, { Component } from "react";
import { Col, Row, Card, Tabs, Table, Slider, Modal, Button } from "antd";
import Widget from "components/Widget";
import Auxiliary from "util/Auxiliary";
import { connect } from "react-redux";
import CircularProgress from "components/CircularProgress";
import PriceChartMain from "components/dashboard/MyDashboard/PriceChartMain";
import NZLC from "components/dashboard/MyDashboard/NZLC";
import OiperTicker from "components/dashboard/MyDashboard/OiperTicker";
import PriceperTicker from "components/dashboard/MyDashboard/PriceperTicker";
import PriceperTickerMin from "components/dashboard/MyDashboard/PriceperTickerMin";
import NetMovement from "components/dashboard/MyDashboard/NetMovement";
// import Oimovers from "components/dashboard/MyDashboard/Oimovers";
import PriceMovers from "components/dashboard/MyDashboard/PriceMovers";
import LegacyScan from "components/dashboard/MyDashboard/LegacyScan";
import TopTickers from "components/dashboard/MyDashboard/TopTickers";
// import NewsMain from "components/dashboard/MyDashboard/NewsMain";
import TagsChart from "components/dashboard/MyDashboard/tagsChart";
import SentimentsChart from "components/dashboard/MyDashboard/SentimentsChart";
import PullbackScan from "components/dashboard/MyDashboard/PullbackScan";
import OneMinuteScan from "components/dashboard/MyDashboard/OneMinuteScan";
import BubbleChart from "components/dashboard/MyDashboard/BubbleChart";
import {
  gettopoimovers,
  getoiperticker,
  getpricesectiondata,
  getsnrbreakoutdata,
  getcotreportdata,
  getseasonalitydata,
  getvariousdata,
  getmostviewedticker,
  getnewsdatamain,
  loaderstatus,
} from "appRedux/actions/Exchange";
import PropTypes from "prop-types";
import ThreeWizard from "components/dashboard/MyDashboard/ThreeWizard";
import SeasonalMatch from "components/dashboard/MyDashboard/SeasonalMatch";
import TopMLForecast from "components/dashboard/MyDashboard/TopMLForecast";
import SNRExt from "components/dashboard/MyDashboard/SNRExt";
import SNRExt_W from "components/dashboard/MyDashboard/SNRExt_W";
import SNRExt_M from "components/dashboard/MyDashboard/SNRExt_M";
import SNR1 from "components/dashboard/MyDashboard/SNR1";
import SNR1_W from "components/dashboard/MyDashboard/SNR1_W";
import SNR1_M from "components/dashboard/MyDashboard/SNR1_M";
import SNR2 from "components/dashboard/MyDashboard/SNR2";
import SNR2_W from "components/dashboard/MyDashboard/SNR2_W";
import SNR2_M from "components/dashboard/MyDashboard/SNR2_M";
import ModalVideo from "react-modal-video";
import SNRSummary from "../../../../components/dashboard/MyDashboard/SNRSummary";
import SNRFB from "../../../../components/dashboard/MyDashboard/SNRFB";
import SNROOPS from "../../../../components/dashboard/MyDashboard/SNROOPS";
const TabPane = Tabs.TabPane;
class Main extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };
  constructor(props, context) {
    super(props, context);
  }
  state = {
    inputValue: 1,
    videoURL: "",
  };
  onChange = (value) => {
    this.setState({
      inputValue: value,
    });
  };
  openModal = (module) => {
    if (this.props.videoLinks.length > 0) {
      var url = this.props.videoLinks[0][module]
        ? this.props.videoLinks[0][module]
        : "";
      this.setState({ videoURL: url }, this.setState({ isOpen: true }));
    }
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
  componentWillMount() {
    this.props.loaderstatus(true);
    // var user_id = localStorage.getItem('user_id');
    // this.props.getmostviewedticker({'user_id':user_id})
    this.props.gettopoimovers();
    this.props.getoiperticker();
    this.props.getnewsdatamain();
    this.props.getpricesectiondata();
    this.props.getsnrbreakoutdata();
    this.props.getcotreportdata();
    this.props.getseasonalitydata();
    this.props.getvariousdata();
    // setTimeout(() =>{
    //   console.log('rohan');
    //   this.props.loaderstatus(false);
    // }, 10000);
  }
  componentDidMount() {
    console.log("didmount");
  }
  render() {
    const columns = [
      {
        title: "Rank",
        dataIndex: "rank",
      },
      {
        title: "Ticker Code",
        dataIndex: "ticker_code",
        render: (text) => {
          return (
            <span
              className="cust-ticker-hover"
              onClick={() => this.OpenModal(text)}
            >
              {text}
            </span>
          );
        },
      },
      {
        title: "Contract",
        dataIndex: "contract",
      },
      {
        title: "Value",
        dataIndex: "value",
        render: (text) => {
          return text > 250 ? (
            <span className="extreme-high">{text + "%"}</span>
          ) : (
            <span>{text + "%"}</span>
          );
        },
      },
    ];
    const patternColumns = [
      {
        title: "Code",
        dataIndex: "key",
      },
      {
        title: "Ticker Name",
        dataIndex: "name",
      },
      {
        title: "Description",
        dataIndex: "description",
      },
      {
        title: "Trend",
        dataIndex: "trend",
        render: (text, record) => {
          if (text == 1) {
            if (
              (record["performance"] > 60 || record["performance"] < 40) &&
              record["trend"] == 1
            ) {
              //Red arrow here
              return <span style={{ color: "green" }}>Bullish</span>;
            } else {
              return <span>Bullish</span>;
            }
          } else if (text == -1) {
            if (
              (record["performance"] > 60 || record["performance"] < 40) &&
              record["trend"] == -1
            ) {
              //Green color here

              return <span style={{ color: "red" }}>Bearish</span>;
            } else {
              return <span>Bearish</span>;
            }
          } else {
            return <span>{text}</span>;
          }
        },
      },
      {
        title: "Frequency",
        dataIndex: "frequency",
      },
      {
        title: "Performance",
        dataIndex: "performance",
      },
      {
        title: "Next Day Forecast",
        dataIndex: "forecast",
        render: (text, record) => {
          if (
            (text > 60 && record["trend"] == 1) ||
            (text < 40 && record["trend"] == -1)
          ) {
            //Green arrow here
            return (
              <span>
                <img
                  alt=""
                  src={require("assets/images/ArrowUp.png")}
                  className="arrow_icons"
                />
              </span>
            );
          } else if (
            (text < 40 && record["trend"] == 1) ||
            (text > 60 && record["trend"] == -1)
          ) {
            //Red arrow here
            return (
              <span>
                <img
                  alt=""
                  src={require("assets/images/ArrowDown.png")}
                  className="arrow_icons"
                />
              </span>
            );
          } else {
            return <span></span>;
          }
        },
      },
    ];

    // const pertickerdata = d
    var oidata = [];
    var oidate = "";
    if (this.props.getoimovers.length > 0) {
      // if(this.props.getoimovers[0].length>0)
      // {
      var j = 1;
      oidate = this.props.getoimovers[0].date;
      var tickerarray = JSON.parse(this.props.getoimovers[0].tickerarray);
      Object.keys(tickerarray).map((key) => {
        var da = {
          // rank: j,
          rank: j,
          ticker_code: key,
          contract: tickerarray[key]["name"],
          value: tickerarray[key]["value"],
        };

        oidata.push(da);
        j++;
      });
      // }
    }

    var patternData = [];
    var patternDate = "";
    if (this.props.pattern_main.length > 0) {
      // if(this.props.getoimovers[0].length>0)
      // {
      var j = 1;
      patternDate = this.props.pattern_main[0].date;
      var tickers = JSON.parse(this.props.pattern_main[0].tickers);
      tickers.sort(function(a, b) {
        return b["performance"] - a["performance"];
      });
      Object.keys(tickers).map((key) => {
        var da = {
          // rank: j,
          key: tickers[key]["ticker_code"],
          name: tickers[key]["short_desc"],
          description: tickers[key]["description"],
          trend: tickers[key]["trend"],
          frequency: tickers[key]["frequency"],
          performance: tickers[key]["performance"],
          forecast: tickers[key]["performance"],
        };
        patternData.push(da);
        j++;
      });
      // }
    }
    var title_date = "";
    if (this.props.oiperticker != "" && this.props.oiperticker.date) {
      title_date = this.props.oiperticker.date;
    }
    return (
      <div>
        <Auxiliary>
          {this.props.videoLinks.length > 0 ? (
            <ModalVideo
              channel="custom"
              isOpen={this.state.isOpen}
              url={this.state.videoURL}
              onClose={() => this.setState({ isOpen: false })}
            />
          ) : null}
          <Card className="dash_background">
            {this.props.loader ? (
              <div>
                <CircularProgress className="gx-loader-view cot_loader" />
              </div>
            ) : (
              ""
            )}
            <Row className="custom_main_chart">
              <Col lg={24} className="main_chart_container">
                <TopTickers />
              </Col>
            </Row>
            <hr />
            <div className="main_scan_group_title">
              Price{" "}
              <img
                alt=""
                src={require("assets/images/dark_icon/QuestionIco_m.png")}
                className="main video"
                onClick={() => this.openModal("price_m")}
              />
            </div>
            <hr />
            <Row className="custom_main_chart">
              <Col lg={12} className="main_chart_container ">
                <span className="cust_desciption main cust-hass-font">
                  Top OI Movers on days {oidate}
                </span>
                <Card
                  title=""
                  className="main_card cust-hass-font cust_price_chart"
                >
                  <Table
                    rowKey="table_main"
                    className="gx-table-no-bordered main_table"
                    columns={columns}
                    dataSource={oidata}
                    pagination={false}
                    bordered={false}
                    size="small"
                  />
                </Card>
              </Col>
              <Col lg={12} className="main_chart_container">
                <PriceChartMain />
              </Col>
            </Row>
            <hr />
            <Row className="custom_main_chart">
              <Col
                lg={12}
                className="cust_ecin_div cust-tab-font main_chart_container "
              >
                <span className="cust_desciption main cust-hass-font">
                  Range Overview updated until {title_date}
                </span>
                <div className="cust_price_chart">
                  <Widget title="" styleName="Scan_tabs gx-card-tabs">
                    <Tabs defaultActiveKey="1" className="cust-tab-margin">
                      <TabPane tab="OI Max" key="1" className="">
                        <OiperTicker />
                      </TabPane>
                      <TabPane tab="Price Max" key="2" className="">
                        <PriceperTicker />
                      </TabPane>
                      <TabPane tab="Price Min" key="3" className="">
                        <PriceperTickerMin />
                      </TabPane>
                    </Tabs>
                  </Widget>
                </div>
              </Col>
              <Col lg={12} className="main_chart_container">
                <PriceMovers />
              </Col>
            </Row>
            <hr />
            <div className="main_scan_group_title">
              BreakOut{" "}
              <img
                alt=""
                src={require("assets/images/dark_icon/QuestionIco_m.png")}
                className="main video"
                onClick={() => this.openModal("price_m")}
              />
            </div>
            <hr />
            <Row className="custom_main_chart">
              <Col lg={12}>
                <Col
                  lg={24}
                  className="cust_ecin_div cust-tab-font main_chart_container "
                >
                  <span className="cust_desciption main cust-hass-font">
                    S&R Machine Learning Breakout on day{" "}
                    {this.props.snr1.length > 0 ? this.props.snr1[0].date : ""}
                  </span>
                  <div className="cust_price_chart">
                    <Widget
                      title=""
                      styleName="Scan_tabs gx-card-tabs"
                      style={{ marginBottom: "0px" }}
                    >
                      <Tabs defaultActiveKey="1" className="cust-tab-margin">
                        <TabPane tab="Daily" key="1" className="">
                          <SNR1 />
                        </TabPane>
                        <TabPane tab="Weekly" key="2" className="">
                          <SNR1_W />
                        </TabPane>
                        <TabPane tab="Monthly" key="3" className="">
                          <SNR1_M />
                        </TabPane>
                      </Tabs>
                    </Widget>
                  </div>
                </Col>
                <Col
                  lg={24}
                  className="cust_ecin_div cust-tab-font main_chart_container "
                >
                  <span
                    className="cust_desciption main cust-hass-font"
                    style={{ marginTop: "10px" }}
                  >
                    S&R Vector Quantization Breakout on day
                    {this.props.snr2.length > 0 ? this.props.snr2[0].date : ""}
                  </span>
                  <div className="cust_price_chart">
                    <Widget title="" styleName="Scan_tabs gx-card-tabs">
                      <Tabs defaultActiveKey="1" className="cust-tab-margin">
                        <TabPane tab="Daily" key="1" className="">
                          <SNR2 />
                        </TabPane>
                        <TabPane tab="Weekly" key="2" className="">
                          <SNR2_W />
                        </TabPane>
                        <TabPane tab="Monthly" key="3" className="">
                          <SNR2_M />
                        </TabPane>
                      </Tabs>
                    </Widget>
                  </div>
                </Col>
                <Col
                  lg={24}
                  className="cust_ecin_div cust-tab-font main_chart_container "
                >
                  <span
                    className="cust_desciption main cust-hass-font"
                    style={{ marginTop: "10px" }}
                  >
                    S&R AI Ext. Breakout on day{" "}
                    {this.props.snrExt.length > 0
                      ? this.props.snrExt[0].date
                      : ""}
                  </span>
                  <div className="cust_price_chart">
                    <Widget title="" styleName="Scan_tabs gx-card-tabs">
                      <Tabs defaultActiveKey="1" className="cust-tab-margin">
                        <TabPane tab="Daily" key="1" className="">
                          <SNRExt />
                        </TabPane>
                        <TabPane tab="Weekly" key="2" className="">
                          <SNRExt_W />
                        </TabPane>
                        <TabPane tab="Monthly" key="3" className="">
                          <SNRExt_M />
                        </TabPane>
                      </Tabs>
                    </Widget>
                  </div>
                </Col>
              </Col>
              {/* </Row>
                  <Row className="custom_main_chart"> */}
              <Col lg={12} className="main_chart_container">
                <SNRSummary />
              </Col>
            </Row>
            <div className="main_scan_group_title">
              COT Report{" "}
              <img
                alt=""
                src={require("assets/images/dark_icon/QuestionIco_m.png")}
                className="main video"
                onClick={() => this.openModal("cot_m")}
              />
            </div>
            <hr />
            <Row className="custom_main_chart">
              <Col lg={12} className="main_chart_container">
                <NetMovement />
              </Col>
              <Col lg={12} className="main_chart_container">
                <LegacyScan />
              </Col>
            </Row>
            <hr />
            <Row className="custom_main_chart">
              <Col lg={12} className="main_chart_container">
                <NZLC />
              </Col>

              <Col lg={12} className="main_chart_container">
                <PullbackScan />
              </Col>
            </Row>
            <hr />
            <Row className="custom_main_chart">
              <Col
                lg={12}
                className="cust_ecin_div cust-tab-font main_chart_container "
              >
                <OneMinuteScan />
              </Col>
            </Row>
            <hr />
            <div className="main_scan_group_title">
              News
              <img
                alt=""
                src={require("assets/images/dark_icon/QuestionIco_m.png")}
                className="main video"
                onClick={() => this.openModal("news_m")}
              />
            </div>
            <hr />
            <Row className="custom_main_chart">
              <Col lg={12} className="main_chart_container">
                <TagsChart />
              </Col>
              <Col lg={12} className="main_chart_container">
                <SentimentsChart />
              </Col>
            </Row>
            <hr />
            {/* <Row className="custom_main_chart">
                    <Col lg={12} className="main_chart_container">
                      <NewsMain />
                    </Col>
                </Row>
                <hr /> */}
            <div className="main_scan_group_title">
              Seasonality{" "}
              <img
                alt=""
                src={require("assets/images/dark_icon/QuestionIco_m.png")}
                className="main video"
                onClick={() => this.openModal("seasonality_m")}
              />
            </div>
            <hr />
            <Row className="custom_main_chart">
              <Col lg={12} className="main_chart_container">
                <SeasonalMatch />
              </Col>
              <Col lg={12}>
                <ThreeWizard />
              </Col>
            </Row>
            <hr />
            <Row className="custom_main_chart">
              {/* <Col lg={12} className="main_chart_container">
                      <PullbackScan />
                    </Col> */}
              <Col lg={12}>
                <BubbleChart />
              </Col>
            </Row>
            <hr />
            <div className="main_scan_group_title">
              Various
              <img
                alt=""
                src={require("assets/images/dark_icon/QuestionIco_m.png")}
                className="main video"
                onClick={() => this.openModal("seasonality_m")}
              />
            </div>
            <hr />
            <Row className="custom_main_chart">
              <Col lg={12} className="main_chart_container ">
                <span className="cust_desciption main cust-hass-font">
                  Relevant candlestick pattern on {patternDate}
                </span>
                <Card
                  title=""
                  className="main_card cust-hass-font cust_price_chart"
                >
                  <Table
                    rowKey="tableone_main"
                    className="gx-table-no-bordered main_table"
                    columns={patternColumns}
                    dataSource={patternData}
                    pagination={false}
                    bordered={false}
                    size="small"
                  />
                </Card>
              </Col>
              <Col lg={12}>
                {/* <Col lg={24} className="cust_ecin_div cust-tab-font main_chart_container ">
                        <TopMLForecast />
                      </Col> */}
                <Col
                  lg={24}
                  className="cust_ecin_div cust-tab-font main_chart_container "
                >
                  <SNRFB />
                </Col>
                <Col
                  lg={24}
                  className="cust_ecin_div cust-tab-font main_chart_container "
                >
                  <SNROOPS />
                </Col>
              </Col>
            </Row>
            <hr />
            <Modal
              className="week_modal confirmation_modal"
              visible={this.state.modalVisible}
              onCancel={this.handleCancel}
            >
              {/* <form onSubmit={this.handleSubmit} method="post"> */}
              You have Clicked on ticker <strong>{this.state.ticker}</strong>
              and you will be redirect to Setup Explore if you click on Confirm
              button
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
          </Card>
        </Auxiliary>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    snr1: Object.keys(state.Exchange.snrbreakoutdata)
      .filter((priceDataIndex) => priceDataIndex == "snr1")
      .map((priceDataIndex) => {
        return state.Exchange.snrbreakoutdata[priceDataIndex];
      }),
    snr2: Object.keys(state.Exchange.snrbreakoutdata)
      .filter((priceDataIndex) => priceDataIndex == "snr2")
      .map((priceDataIndex) => {
        return state.Exchange.snrbreakoutdata[priceDataIndex];
      }),
    snrExt: Object.keys(state.Exchange.snrbreakoutdata)
      .filter((priceDataIndex) => priceDataIndex == "snrExt")
      .map((priceDataIndex) => {
        return state.Exchange.snrbreakoutdata[priceDataIndex];
      }),
    videoLinks: state.Exchange.videoLinks,
    loader: state.Exchange.loader,
    oiperticker: state.Exchange.getoiperticker,
    getoimovers: Object.keys(state.Exchange.pricesection)
      .filter((priceDataIndex) => priceDataIndex == "top_oi_movers")
      .map((priceDataIndex) => {
        return state.Exchange.pricesection[priceDataIndex];
      }),
    pattern_main: Object.keys(state.Exchange.variousdata)
      .filter((priceDataIndex) => priceDataIndex == "pattern_main")
      .map((priceDataIndex) => {
        return state.Exchange.variousdata[priceDataIndex];
      }),
  };
};
export default connect(
  mapStateToProps,
  {
    gettopoimovers,
    getoiperticker,
    getpricesectiondata,
    getsnrbreakoutdata,
    getcotreportdata,
    getseasonalitydata,
    getvariousdata,
    getmostviewedticker,
    getnewsdatamain,
    loaderstatus,
  }
)(Main);
