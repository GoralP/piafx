import React, { Component } from "react";
import {
  AutoComplete,
  Col,
  Row,
  Card,
  Tabs,
  Table,
  Slider,
  DatePicker,
  Button,
  Progress,
} from "antd";
import Auxiliary from "util/Auxiliary";
import { connect } from "react-redux";
import {
  Seachcode,
  getaccontdata,
  getPricedata,
  changeScroller,
  progressbar,
  loaderstatus,
} from "appRedux/actions/Exchange";
import PriceChart from "components/dashboard/MyDashboard/PriceChartCot";
import CotChart from "components/dashboard/MyDashboard/CotAccountChart";
import CircularProgress from "components/CircularProgress";
import moment from "moment";
import AnyChart from "anychart-react";
import anychart from "anychart";

var startdate1 = moment()
  .subtract(52, "weeks")
  .format("DD-MM-YYYY");
var enddate1 = moment().format("DD-MM-YYYY");

class MyDashboard extends Component {
  state = {
    inputValue: 1,
    percent: 10,
    progress: false,
  };
  onChange = (value) => {
    this.setState({
      inputValue: value,
    });
  };
  handleSearch = (value) => {
    var valueobj = { ticker_code: value };
    this.props.Seachcode(valueobj);
  };
  onSelect = (value) => {
    this.props.loaderstatus(true);
    this.setState({
      exchange: value,
    });
    var reqvar = { selectedExchange: value };
    this.props.getPricedata(reqvar);
  };
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidMount() {}

  handleSubmit() {
    var data = {
      exchange: this.state.exchange,
      cotfamily: this.state.cotfamily,
      startdate: startdate1,
      enddate: enddate1,
    };
    this.setState({
      progress: true,
    });
    // this.props.progressbar(true);
    this.props.getaccontdata(data);
    // if(this.props.progress)
    // {
    // setInterval(() => {
    //   if(this.state.percent<100)
    //   {
    //     this.setState({
    //       percent: this.state.percent+10,
    //     });

    //   }
    //   // if(this.state.percent==100 && this.props.progress)
    //   if(this.state.percent==100 && this.state.progress)
    //     {
    //       // this.props.progressbar(false);
    //       this.setState({
    //         progress: false,
    //       });
    //     }
    // }, 1000);
    // }
  }
  cotchange() {
    var select = document.getElementById("cotfamily");
    this.setState({
      cotfamily: select.value,
    });
  }
  startdate = (date, dateString) => {
    startdate1 = dateString;
    var data = { start: startdate1, end: enddate1 };
    this.props.changeScroller(data);
  };
  enddate = (date, dateString) => {
    enddate1 = dateString;
    var data = { start: startdate1, end: enddate1 };
    this.props.changeScroller(data);
  };
  render() {
    if (typeof this.props.scrollerDates.startdate != "undefined") {
      startdate1 = this.props.scrollerDates.startdate;
      enddate1 = this.props.scrollerDates.enddate;
    }
    var grparray = [];
    if (this.props.cot_menulist.length > 0) {
      Object.keys(this.props.cot_menulist[0]).map((familyIndex) => {
        grparray.push(familyIndex);
      });
    }
    //  var data = [
    //   {x: "10-02-2017", value: 20},
    //   {x: "10-02-2018", value: 30},
    //   {x: "10-02-2019", value: 100},
    //   {x: "10-02-2020", value: 40}
    // ];
    //  var chart = anychart.barmekko(data);
    return (
      <div>
        {/* <AnyChart
                  id={"mekkochart1_"}
                  width="100%"
                  height={300}
                  instance={chart}
              /> */}
        <Auxiliary>
          <Card className="dash_background">
            {/* <Row>
                  <Col lg={9}>
                        <AutoComplete
                          dataSource={this.props.seachList}
                          onSelect={this.onSelect}
                          onSearch={this.handleSearch}
                          style={{width: 150,'marginLeft': '15px'}}
                          className="topbarsearch"
                          placeholder="Seach code here"
                        />
                     
                    </Col>
                    <Col lg={4} className="col_cust_padding">
                      <select class="form-control" id="cotfamily" onClick={() =>this.cotchange()} style={{'marginLeft': '15px'}}>
                        <option value="select cot" selected disabled>Select COT</option>
                        {grparray.includes('LEGACY')?<option value="legacy_future_only">Legacy Future Only</option>:''}
                        {grparray.includes('LEGACY')?<option value="legacy_future_and_option">Legacy COMBINED</option>:''}
                        {grparray.includes('TFF')?<option value="tff_future_only">TFF Future Only</option>:''}
                        {grparray.includes('TFF')?<option value="tff_future_and_option">TFF COMBINED</option>:''}
                        {grparray.includes('DISAGGREGATED')?<option value="disaggregated_future_only_new">Disaggregated Future Only</option>:''}
                        {grparray.includes('DISAGGREGATED')?<option value="disaggregated_future_and_option">Disaggregated COMBINED</option>:''}
                      </select>  
                    </Col>
                    <Col lg={4} className="col_cust_padding">
                      <DatePicker className="gx-mb-3 gx-w-100" onChange={this.startdate} value={moment(startdate1, 'DD-MM-YYYY')} format='DD-MM-YYYY' placeholder="Select Start date"/>
                    </Col>
                    <Col lg={4} className="col_cust_padding">
                      <DatePicker className="gx-mb-3 gx-w-100" onChange={this.enddate} value={moment(enddate1,'DD-MM-YYYY')} format='DD-MM-YYYY' placeholder="Select End date"/>
                      {/* <DatePicker className="gx-mb-3 gx-w-100" defaultValue={enddate1} format='YYYY-MM-DD' placeholder="Select End date"/> */}
            {/* </Col>
                    <Button name="submit" onClick={()=>this.handleSubmit()} >Submit</Button>
                    </Row> */}
            {this.state.progress ? (
              <Progress type="circle" percent={this.state.percent} />
            ) : (
              ""
            )}
            {this.props.loader ? (
              <div>
                <CircularProgress className="gx-loader-view cot_loader" />
              </div>
            ) : (
              ""
            )}
            {this.props.priceData.length > 0 ? (
              <Row className="custom_main_chart">
                <Col lg={24}>
                  <Row>
                    <PriceChart />
                  </Row>
                  <Row>
                    {localStorage.getItem("family") ? <CotChart /> : ""}
                  </Row>
                </Col>
              </Row>
            ) : (
              <div></div>
            )}
          </Card>
        </Auxiliary>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    progress: state.Exchange.progress,
    loader: state.Exchange.loader,
    seachList: state.Exchange.seachList,
    scrollerDates: state.Exchange.scrollerDates,
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
    cot_menulist: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "cot_data")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
      }),
  };
};
export default connect(
  mapStateToProps,
  {
    Seachcode,
    getaccontdata,
    getPricedata,
    changeScroller,
    progressbar,
    loaderstatus,
  }
)(MyDashboard);
