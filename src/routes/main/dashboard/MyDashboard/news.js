import React, { Component } from "react";
import {
  Col,
  Row,
  Card,
  Tabs,
  Table,
  Slider,
  Modal,
  Button,
  Badge,
} from "antd";
import Widget from "components/Widget";
import Auxiliary from "util/Auxiliary";
import { connect } from "react-redux";
import { getnews } from "appRedux/actions/Exchange";
import PropTypes from "prop-types";
const TabPane = Tabs.TabPane;
var month_name = function(dt) {
  var mlist = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var result = dt.getDate("DD") + "-" + mlist[dt.getMonth()];
  return result;
};
class News extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };
  constructor(props, context) {
    super(props, context);
  }
  state = {
    article: 0,
  };
  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };
  leftPanel(key) {
    this.setState({
      article: key,
    });
    // console.log('asplclick',key);
    // console.log('aspldata',this.props.newsData[key])
  }
  maintoSE() {
    this.context.router.history.push({
      pathname: "/dashboard",
      state: { ticker: this.state.ticker },
    });
    this.setState({ modalVisible: false });
  }
  shorten(str, maxLen, separator = " ") {
    if (str.length <= maxLen) return str;
    return str.substr(0, str.lastIndexOf(separator, maxLen));
  }
  // componentWillMount()
  //   {
  //     this.props.getnews({ticker_code:'',news_code:'999'});
  //   }
  render() {
    const newscolumns = [
      // {
      //   title: '#',
      //   dataIndex: 'key',
      // },
      {
        title: "Date & Time",
        dataIndex: "date",
      },
      {
        title: "Sentiment",
        dataIndex: "sentiment",
        render: (text, record) => {
          var text = text.split("xxSPLITxx");
          if (text[1] === "db") {
            text = text[0];
            if (text > -1 && text < -0.5) {
              return (
                <span class="badge_span">
                  <Badge status="error" class="badge_cust" />
                  <Badge status="error" class="badge_cust" />
                  <Badge class="badge_cust" status="error" />
                </span>
              );
            } else if (text > -0.5 && text < -0.25) {
              return (
                <span class="badge_span">
                  <Badge status="error" class="badge_cust" />
                  <Badge status="error" class="badge_cust" />
                </span>
              );
            } else if (text > -0.25 && text < -0.1) {
              return (
                <span class="badge_span">
                  <Badge status="error" class="badge_cust" />
                </span>
              );
            } else if (text > -0.1 && text < 0.1) {
              return (
                <span class="badge_span">
                  <Badge status="default" class="badge_cust" />
                </span>
              );
            } else if (text > 0.1 && text < 0.25) {
              return (
                <span class="badge_span">
                  <Badge status="success" class="badge_cust" />
                </span>
              );
            } else if (text > 0.25 && text < 0.5) {
              return (
                <span class="badge_span">
                  <Badge status="success" class="badge_cust" />
                  <Badge status="success" class="badge_cust" />
                </span>
              );
            } else if (text > 0.5 && text < 1) {
              return (
                <span class="badge_span">
                  <Badge status="success" class="badge_cust" />
                  <Badge status="success" class="badge_cust" />
                  <Badge status="success" class="badge_cust" />
                </span>
              );
            }
          } else {
            return (
              <span class="badge_span">
                <Badge color="#A2868E" class="badge_cust" />
              </span>
            );
          }
        },
      },
      {
        title: "Title",
        dataIndex: "title",
        render: (text) => {
          var temp = text.split("xxSPLITxx");
          return (
            <span class="news_title" onClick={() => this.leftPanel(temp[1])}>
              {temp[0]}
              <br />
              <div align="right">
                <span style={{ fontSize: "10px" }}>{temp[2]}</span>
              </div>
            </span>
          );
        },
      },
    ];
    var news = [];
    if (this.props.newsData.length > 0) {
      var j = 1;
      for (var i = 0; i < this.props.newsData[0].length; i++) {
        // if(i==22)
        // {
        //   console.log(this.props.newsData[0][i]['image'].split("'")[0])
        // }
        var source = "";
        if (this.props.newsData[0][i]["media"]) {
          source = this.props.newsData[0][i]["media"];
        }
        var da = {
          // key:i,
          date: month_name(new Date(this.props.newsData[0][i]["date"])),
          // key:month_name(new Date(this.props.newsData[0][i]['date']))+ ' '+this.props.newsData[0][i]['time'].substr(0,5),
          sentiment:
            this.props.newsData[0][i]["sentiment"] +
            "xxSPLITxx" +
            this.props.newsData[0][i]["from"],
          title:
            this.props.newsData[0][i].title +
            "xxSPLITxx" +
            i +
            "xxSPLITxx" +
            source,
        };

        news.push(da);
        j++;
      }
    }
    var ticker_name = "";
    if (this.props.tickerData.length > 0) {
      if (this.props.tickerData[0].length > 0) {
        ticker_name = this.props.tickerData[0][0]["short_desc"];
      }
    }
    return (
      <div className="news_container">
        <div align="center" className="news_table_title">
          <strong>Relevant News For {ticker_name}</strong>
        </div>
        <Auxiliary>
          {localStorage.getItem("newsGridView") == true ||
          localStorage.getItem("newsGridView") == "true" ? (
            <Row>
              {this.props.newsData.length > 0
                ? this.props.newsData[0].map((item, index) => {
                    let imageUrl = item.image;
                    let bg_color = "bg_default";
                    // if(item.sentiment>0.10)
                    // {
                    //   bg_color = 'bg_green';
                    // }
                    // else if(item.sentiment<0.10 && item.sentiment> -0.10){
                    //   bg_color = 'bg_default';
                    // }
                    // else if(item.sentiment<-0.10){
                    //   bg_color = 'bg_red';
                    // }
                    let sentiment_badges = <span class="badge_span"></span>;
                    if (item.from === "db") {
                      if (item.sentiment > -1 && item.sentiment < -0.5) {
                        sentiment_badges = (
                          <span class="badge_span">
                            <Badge status="error" class="badge_cust" />
                            <Badge status="error" class="badge_cust" />
                            <Badge class="badge_cust" status="error" />
                          </span>
                        );
                      } else if (
                        item.sentiment > -0.5 &&
                        item.sentiment < -0.25
                      ) {
                        sentiment_badges = (
                          <span class="badge_span">
                            <Badge status="error" class="badge_cust" />
                            <Badge status="error" class="badge_cust" />
                          </span>
                        );
                      } else if (
                        item.sentiment > -0.25 &&
                        item.sentiment < -0.1
                      ) {
                        sentiment_badges = (
                          <span class="badge_span">
                            <Badge status="error" class="badge_cust" />
                          </span>
                        );
                      } else if (
                        item.sentiment > -0.1 &&
                        item.sentiment < 0.1
                      ) {
                        sentiment_badges = (
                          <span class="badge_span">
                            <Badge status="default" class="badge_cust" />
                          </span>
                        );
                      } else if (
                        item.sentiment > 0.1 &&
                        item.sentiment < 0.25
                      ) {
                        sentiment_badges = (
                          <span class="badge_span">
                            <Badge status="success" class="badge_cust" />
                          </span>
                        );
                      } else if (
                        item.sentiment > 0.25 &&
                        item.sentiment < 0.5
                      ) {
                        sentiment_badges = (
                          <span class="badge_span">
                            <Badge status="success" class="badge_cust" />
                            <Badge status="success" class="badge_cust" />
                          </span>
                        );
                      } else if (item.sentiment > 0.5 && item.sentiment < 1) {
                        sentiment_badges = (
                          <span class="badge_span">
                            <Badge status="success" class="badge_cust" />
                            <Badge status="success" class="badge_cust" />
                            <Badge status="success" class="badge_cust" />
                          </span>
                        );
                      }
                    } else {
                      sentiment_badges = (
                        <span class="badge_span">
                          <Badge color="#b3daff" class="badge_cust" />
                        </span>
                      );
                    }
                    if (item.relevance > 25) {
                      return (
                        <Col xl={4} lg={8} md={8} sm={12} xs={24}>
                          <a target="_blank" href={item.link}>
                            <Widget styleName="gx-card-full">
                              {item.image === "" ? (
                                ""
                              ) : (
                                <img
                                  className="gx-smart-img"
                                  alt="example"
                                  src={
                                    item.image === ""
                                      ? require("assets/images/PiaFxNewsPlacer.jpg")
                                      : imageUrl.split("'")[0]
                                  }
                                />
                              )}
                              <div className={`gx-p-3 ${bg_color}`}>
                                <p className="gx-mb-2">
                                  <div className="sentiment_badge">
                                    {sentiment_badges}
                                  </div>
                                  <br />
                                  <span className="news_title">
                                    {item.title}
                                  </span>
                                  <br />
                                  <div>
                                    <p className="gx-mb-1 gx-text-grey gx-fs-sm">
                                      {month_name(new Date(item.date))}
                                    </p>
                                    <div className="source">
                                      <p className="gx-mb-1 gx-text-grey gx-fs-sm">
                                        {item.media}
                                      </p>
                                    </div>
                                  </div>
                                </p>

                                {/* <span className="gx-text-primary gx-pointer gx-text-uppercase gx-fs-sm">Read More</span> */}
                              </div>
                            </Widget>
                          </a>
                        </Col>
                      );
                    } else {
                      return (
                        <Col lg={8} md={8} sm={12} xs={24}>
                          <a target="_blank" href={item.link}>
                            <Widget styleName="gx-card-full gx-dot-arrow-hover">
                              <div className="gx-user-wid-row">
                                {item.image === "" ? (
                                  ""
                                ) : (
                                  <div className="gx-user-wid gx-mr-3 news-image">
                                    <img
                                      className="gx-object-cover"
                                      alt="example"
                                      src={imageUrl.split("'")[0]}
                                    />
                                  </div>
                                )}
                                <div
                                  className={`gx-user-wid-body gx-py-3 gx-pr-3 ${bg_color}`}
                                >
                                  <div className="news_body">
                                    <div className="ant-row-flex">
                                      <h2 className="h4 gx-mr-1 gx-mb-1 news_title">
                                        {item.title}
                                      </h2>
                                    </div>
                                    <p className="gx-mb-1 gx-text-grey gx-fs-sm">
                                      {item.body}
                                    </p>
                                    <div>
                                      <p className="gx-mb-1 gx-text-grey gx-fs-sm">
                                        {month_name(new Date(item.date))}
                                      </p>
                                      <div className="source">
                                        <p className="gx-mb-1 gx-text-grey gx-fs-sm">
                                          {item.media}
                                        </p>
                                      </div>
                                      <p className="gx-mb-1 gx-text-grey gx-fs-sm">
                                        {sentiment_badges}
                                      </p>
                                    </div>
                                  </div>
                                  {/* <div className="gx-dot-arrow">
                                <div className="gx-bg-primary gx-hover-arrow">
                                  <i className="icon icon-long-arrow-right gx-text-white"/>
                                </div>
                                <div className="gx-dot">
                                  <i className="icon icon-ellipse-v gx-text-primary"/>
                                </div>
                              </div> */}
                                </div>
                              </div>
                            </Widget>
                          </a>
                        </Col>
                      );
                    }
                  })
                : null}
            </Row>
          ) : (
            <Card className="dash_background">
              <Row>
                <Col lg={12}>
                  <Card className="cust_ecin_div  cust_new_css news_div news_article">
                    {this.props.newsData.length > 0 ? (
                      this.props.newsData[0].length > 0 ? (
                        <div className="article_div">
                          <div className="article_title">
                            {this.props.newsData[0][this.state.article].title}
                          </div>
                          {this.props.newsData[0][this.state.article].image !=
                          null ? (
                            <img
                              className="article_image"
                              src={
                                this.props.newsData[0][this.state.article].image
                              }
                              height="300"
                            />
                          ) : (
                            <img
                              className="article_image"
                              src={require("assets/images/PiaFxNewsPlacer.jpg")}
                              height="300"
                            />
                          )}
                          <br />
                          <span className="article_source">
                            Published:{" "}
                            {month_name(
                              new Date(
                                this.props.newsData[0][this.state.article].date
                              )
                            )}
                          </span>
                          <div className="article_author">
                            By:{" "}
                            {this.props.newsData[0][this.state.article]["media"]
                              ? this.props.newsData[0][this.state.article][
                                  "media"
                                ]
                              : null}
                          </div>
                          <br />
                          <p className="article_body">
                            {this.shorten(
                              this.props.newsData[0][this.state.article].body,
                              400
                            )}{" "}
                            ....
                          </p>
                          <br />
                          <div align="right" className="news_article_bottom">
                            <a
                              target="_blank"
                              href={
                                this.props.newsData[0][this.state.article].link
                              }
                            >
                              <Button>Read Article</Button>
                            </a>
                          </div>
                        </div>
                      ) : null
                    ) : null}
                  </Card>
                </Col>
                <Col lg={12}>
                  <Card className="cust_ecin_div cust_price_chart cust_new_css news_list">
                    <div className="news_table_title" align="left">
                      Relevant News For {ticker_name}
                    </div>
                    <div className="table_analyzer_div news_table">
                      <Table
                        rowKey="table_news"
                        className="gx-table-no-bordered cust_table_analyzer newspage_table"
                        showHeader={false}
                        columns={newscolumns}
                        dataSource={news}
                        bordered={false}
                        pagination={false}
                        size="small"
                      />
                    </div>
                  </Card>
                </Col>
              </Row>
            </Card>
          )}
        </Auxiliary>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    newsData: Object.keys(state.Exchange.newsData)
      .filter((priceDataIndex) => priceDataIndex == "news")
      .map((priceDataIndex) => {
        return state.Exchange.newsData[priceDataIndex];
      }),
    tickerData: Object.keys(state.Exchange.newsData)
      .filter((priceDataIndex) => priceDataIndex == "tickers_details")
      .map((priceDataIndex) => {
        return state.Exchange.newsData[priceDataIndex];
      }),
  };
};
export default connect(
  mapStateToProps,
  { getnews }
)(News);
