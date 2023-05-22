import React, { Component } from "react";
import {
  Col,
  Row,
  Card,
  Tabs,
  Table,
  Slider,
  Switch,
  Button,
  Radio,
} from "antd";
import Widget from "components/Widget";
import Auxiliary from "util/Auxiliary";
import AnyChart from "anychart-react";
import anychart from "anychart";
import { connect } from "react-redux";
import { saveSettings } from "appRedux/actions/Exchange";
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
var user_id = localStorage.getItem("user_id");
class Settings extends Component {
  state = {
    inputValue: 1,
    multitab:
      localStorage.getItem("multitab") == true ||
      localStorage.getItem("multitab") == "true"
        ? true
        : false,
    themevalue: "default",
    startfrom: "main",
    newsGridView: true,
  };
  onChange = (value) => {
    this.setState({
      inputValue: value,
    });
  };
  multitab = (e) => {
    this.setState({
      multitab: e.target.value,
    });
  };
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  saveSettings() {
    // console('asplaspldone');
    var multitab = this.state.multitab ? "true" : "false";
    var data = {
      user_id: user_id,
      multitab: multitab,
      theme: this.state.themevalue,
      startfrom: this.state.startfrom,
      newsGridView: this.state.newsGridView,
    };
    this.props.saveSettings(data);
  }
  onThemeChange = (e) => {
    // console.log('radio checked', e.target.value);
    this.setState({
      themevalue: e.target.value,
    });
  };
  onStartChange = (e) => {
    // console.log('radio checked', e.target.value);
    this.setState({
      startfrom: e.target.value,
    });
  };
  onNewsChange = (e) => {
    this.setState({
      newsGridView: e.target.value,
    });
  };
  componentDidMount() {
    this.setState({
      multitab:
        localStorage.getItem("multitab") == true ||
        localStorage.getItem("multitab") == "true"
          ? true
          : false,
      themevalue: localStorage.getItem("theme"),
      startfrom: localStorage.getItem("startfrom"),
      newsGridView:
        localStorage.getItem("newsGridView") == true ||
        localStorage.getItem("newsGridView") == "true"
          ? true
          : false,
    });
  }
  render() {
    // console.log('asplsplitscreen',this.state.multitab);
    // console.log('asplsplitscreenlocal',localStorage.getItem('multitab'));
    return (
      <div>
        <Auxiliary>
          <Card className="dash_background">
            <div align="right">
              <Button onClick={() => this.saveSettings()}>Save</Button>
            </div>
            <Row>
              <Col lg={24} className="cust_ecin_div cust-tab-font">
                <Widget title="" styleName="Scan_tabs gx-card-tabs">
                  <Tabs defaultActiveKey="1" tabPosition="left">
                    <TabPane tab="Multi Tab" key="1">
                      <div>
                        {/* <span className= "common_title">Multiple Tab</span> */}
                        {/* {(this.state.multitab=='true' || this.state.multitab==true)?
                              <Switch size="small"  name={"multitab"}  onChange={(e)=>this.multitab(e)} defaultChecked />:
                              <Switch size="small"  name={"multitab"}  onChange={(e)=>this.multitab(e)} />
                             } */}
                        <RadioGroup
                          onChange={this.multitab}
                          value={this.state.multitab}
                        >
                          <Radio value={true}>
                            <span className="common_title">Yes</span>
                          </Radio>
                          <Radio value={false}>
                            <span className="common_title">No</span>
                          </Radio>
                        </RadioGroup>
                      </div>
                    </TabPane>
                    <TabPane tab="Themes" key="2">
                      <RadioGroup
                        onChange={this.onThemeChange}
                        value={this.state.themevalue}
                      >
                        <Radio value={"default"}>
                          <span className="common_title">Yacht</span>
                        </Radio>
                        <Radio value={"light"}>
                          <span className="common_title">Light</span>
                        </Radio>
                        {/* <Radio value={"coffee"}><span className= "common_title">Coffee</span></Radio> */}
                      </RadioGroup>
                    </TabPane>
                    <TabPane tab="Initial Page" key="3">
                      <RadioGroup
                        onChange={this.onStartChange}
                        value={this.state.startfrom}
                      >
                        <Radio value={"main"}>
                          <span className="common_title">
                            Opportunity Dashboard
                          </span>
                        </Radio>
                        <Radio value={"se"}>
                          <span className="common_title">Setup Explorer</span>
                        </Radio>
                        <Radio value={"charting"}>
                          <span className="common_title">Charting</span>
                        </Radio>
                        <Radio value={"ca"}>
                          <span className="common_title">Cot Accountancy</span>
                        </Radio>
                        <Radio value={"news"}>
                          <span className="common_title">News</span>
                        </Radio>
                      </RadioGroup>
                    </TabPane>
                    <TabPane tab="News" key="4">
                      <RadioGroup
                        onChange={this.onNewsChange}
                        value={this.state.newsGridView}
                      >
                        <Radio value={true}>
                          <span className="common_title">Grid View</span>
                        </Radio>
                        <Radio value={false}>
                          <span className="common_title">List View</span>
                        </Radio>
                      </RadioGroup>
                    </TabPane>
                  </Tabs>
                </Widget>
              </Col>
            </Row>
          </Card>
        </Auxiliary>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tableData: state.Exchange.tableData,
  };
};
export default connect(
  mapStateToProps,
  { saveSettings }
)(Settings);
