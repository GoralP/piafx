import React from "react";
import {
  LoadExchange,
  getPricedata,
  getnews,
  getPriceCotdata,
  getGraphData,
  exchangemodal,
  sectormodal,
  getnotes,
  gettable,
  getdacm,
  loaderstatus,
} from "appRedux/actions/Exchange";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card, Tabs } from "antd";
import Widget from "components/Widget";

const TabPane = Tabs.TabPane;

class Sector extends React.Component {
  componentWillMount() {
    this.props.LoadExchange();
  }
  takeAction() {
    switch (this.props.state) {
      case "initial":
        console.log(
          "Looks like the products are not loaded yet, or we have to uptade them...."
        );
        this.props.LoadExchange();
      case "exchangesloaded":
      default:
        break;
    }
  }

  selectexchange(value) {
    localStorage.removeItem("family");
    localStorage.setItem("ticker_code", value);

    // alert("selected "+value);
    // this.setState({
    //   visible: false,
    // });
    if (window.location.pathname == "/news") {
      this.props.loaderstatus(true);
      this.props.getnews({ ticker_code: value, news_code: "" });
      localStorage.setItem("ticker_code", value);
      this.props.sectormodal(false);
    } else {
      this.props.loaderstatus(true);
      localStorage.setItem("ticker_code", value);
      this.props.sectormodal(false);
      var reqvar = { selectedExchange: value };
      this.props.getPricedata(reqvar);
      this.props.getPriceCotdata(reqvar);
      var user_id = localStorage.getItem("user_id");
      this.props.getnotes({ user_id: user_id, ticker_id: value });
      this.props.gettable({ user_id: user_id, ticker_id: value });
      this.props.getdacm({ user_id: user_id, ticker_id: value });
    }
  }

  render() {
    {
      this.takeAction();
    }

    return Object.keys(this.props.exchangeList).length > 0 ? (
      <div>
        <Widget title=" " styleName="gx-card-tabs sector_tabs exchange_widget">
          <Tabs defaultActiveKey="1">
            {Object.keys(this.props.exchangeList["Sector"]).map(
              (key, index) => {
                // console.log('asplexchange',this.props.exchangeList['Sector']);
                return (
                  <TabPane
                    tab={key}
                    key={index + 1}
                    className="price-overview exchange_tab"
                  >
                    <div className="main_data">
                      {/* <h3>{key}</h3> */}
                      {Object.keys(this.props.exchangeList["Sector"][key]).map(
                        (item) => {
                          return (
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                this.selectexchange(
                                  this.props.exchangeList["Sector"][key][item]
                                    .code
                                )
                              }
                            >
                              {
                                this.props.exchangeList["Sector"][key][item]
                                  .name
                              }{" "}
                              (
                              {
                                this.props.exchangeList["Sector"][key][item]
                                  .code
                              }
                              ) <br />{" "}
                            </span>
                          );
                        }
                      )}
                    </div>
                  </TabPane>
                );
              }
            )}
          </Tabs>
        </Widget>
      </div>
    ) : (
      <Card loading> Whatever content </Card>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("state1:",state.Exchange.exchangeList);
  return {
    exchangeList: state.Exchange.exchangeList,
    state: state.Exchange.state,
  };
};

Sector.propTypes = {
  state: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  {
    LoadExchange,
    getnews,
    getPricedata,
    getPriceCotdata,
    getGraphData,
    exchangemodal,
    sectormodal,
    loaderstatus,
    getdacm,
    gettable,
    getnotes,
  }
)(Sector);
