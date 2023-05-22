import React, { Component, PureComponent } from "react";
import { Layout, Popover, Row, Col } from "antd";
import { Link } from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import languageData from "./languageData";
import {
  switchLanguage,
  toggleCollapsedSideNav,
} from "../../appRedux/actions/Setting";
import SearchBox from "components/SearchBox";
import UserInfo from "components/UserInfo";
import AppNotification from "components/AppNotification";
import MailNotification from "components/MailNotification";
import Auxiliary from "util/Auxiliary";
import {
  AutoComplete,
  Modal,
  Dropdown,
  Icon,
  Menu,
  DatePicker,
  Button,
  Progress,
  message,
  Select,
  Input,
  InputNumber,
  Radio,
} from "antd";

import Exchange from "components/Exchange";
import Sector from "components/Sector";
import moment from "moment";
import ModalVideo from "react-modal-video";
import CircularProgress from "components/CircularProgress";

import {
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI_SIDEBAR,
  TAB_SIZE,
} from "../../constants/ThemeSetting";
import { connect } from "react-redux";
import {
  Seachcode,
  gettrendAI,
  getPricedata,
  getPriceCotdata,
  newsindicator,
  trendmlvisible,
  getCotdata,
  tsrmvisible,
  getEcindata,
  savestatus,
  gettrend,
  getnews,
  exchangemodal,
  cotforecast,
  priceforecast,
  sectormodal,
  getGraphData,
  responsestatus,
  loaderstatus,
  getdacm,
  techindicator,
  calldacm,
  cotloaderstatus,
  changeScroller,
  getaccontdata,
  getnotes,
  gettable,
  getequity,
  getEcinUnderPricedata,
  getSnRData,
  getCorrell,
  getVideo,
  getmostviewedticker,
  splitscreen,
  clearData,
  setInitialCots,
} from "appRedux/actions/Exchange";
import IntlMessages from "../../util/IntlMessages";
import { exists } from "fs";
var ti = require("../../assets/ti");
// var ti = require('./ti');
// console.log('aspltest',test.test);
const SubMenu = Menu.SubMenu;
const Option = Select.Option;
const { Header } = Layout;
// var startdate1 = moment()
//   .subtract(38, "weeks")
//   .subtract(4, "days")
//   .format("DD-MM-YYYY");
var startdate1 = "";
var enddate1 = "";
var setinput = "";
// var enddate1 = moment().format("DD-MM-YYYY");
var month3 = new Date(); // add arguments as needed
month3.setMonth(month3.getMonth() - 3);
var yesterdayDate = new Date(); // add arguments as needed
yesterdayDate.setDate(yesterdayDate.getDate() - 1);
var sdate = moment(month3, "DD-MM-YYYY");
var edate = moment(yesterdayDate, "DD-MM-YYYY");
// console.log('yesterdayDate',yesterdayDate,sdate,edate)
const { RangePicker } = DatePicker;

var selectedTI = [];
var correllValue = (
  <select className="ti_modal_fields" value="" name="correllValue">
    <option key="default" value="">
      Please Select
    </option>
  </select>
);
var correllValueArray = [];
var cotdataArrayOI = [];
var openIntrstArr = [];
var ciname = "";
var cinameOi = "";
class Topbar extends PureComponent {
  state = {
    searchText: "",
    visible: false,
    sector: false,
    progress: false,
    percent: 10,
    cotfamily: "",
    sapratetechnicalindicator: [],
    showtechnicalindcatorpopup: false,
    showpopupcontent: <div></div>,
    recentindicator: "",
    cotweek: 10,
    cotweek1: 6,
    trendPeriod: 5,
    williamPeriod: 10,
    slopePeriod: 100,
    nclraPeriod: 3,
    showsnrindicatorpopup: false,
    showcorrellindicatorpopup: false,
    snrType: "",
    snrRadio: 1,
    checkValue: "radio",
    priceforecast: "",
    correllType: "",
    correllPeriod: 2,
    correllValue: "",
    correllValueArray: [],
    snrStartDate: moment(month3, "DD-MM-YYYY"),
    snrEndDate: moment(yesterdayDate, "DD-MM-YYYY"),
    videoURL: "",
    snrTimeFrame: "daily",
    Exchange1: "",
    exchangeVal: "",
    exchange: "",
    startDateVal: "",
    endDateVal: "",
  };

  handleSearch = (value) => {
    this.setState({ Exchange1: value });
    this.setState({ cotfamily: "" });
    localStorage.removeItem("family");
    var valueobj = { ticker_code: value };
    this.props.Seachcode(valueobj);
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    // this.setState({
    //   visible: false,
    // });
    this.props.exchangemodal(false);
  };

  showModal = () => {
    // this.setState({
    //   visible: true,
    // });
    this.props.exchangemodal(true);
  };

  handleSectorOk = () => {
    this.setState({
      sector: false,
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
  handleSectorCancel = () => {
    // this.setState({
    //   sector: false,
    // });
    this.props.sectormodal(false);
  };

  showSectorModal = () => {
    // this.setState({
    //   sector: true,
    // });
    this.props.sectormodal(true);
  };
  onSelect = (value) => {
    this.props.loaderstatus(true);
    localStorage.setItem("ticker_code", value);
    if (
      document.getElementById("rangeselectorContainer") != null ||
      document.getElementById("rangepickerContainer") != null
    ) {
      document.getElementById("rangeselectorContainer").innerHTML = "";
      document.getElementById("rangepickerContainer").innerHTML = "";
    }
    this.setState({
      exchange: value,
    });
    var reqvar = { selectedExchange: value };
    this.props.getPricedata(reqvar);
    this.props.getPriceCotdata(reqvar);
    var user_id = localStorage.getItem("user_id");
    this.props.getnotes({ user_id: user_id, ticker_id: value });
    this.props.gettable({ user_id: user_id, ticker_id: value });
    this.props.getdacm({ user_id: user_id, ticker_id: value });
    this.setState({ Exchange1: "" });
    if (window.location.pathname == "/experiments") {
      this.props.getequity({
        ticker_code: "E6",
        slope_period: 50,
        william_period: 5,
        nclra_period: 3,
      });
    }

    selectedTI = [];
  };
  onSelectNews = (value) => {
    this.props.loaderstatus(true);
    this.props.getnews({ ticker_code: value, news_code: "" });
  };

  languageMenu = () => (
    <CustomScrollbars className="gx-popover-lang-scroll">
      <ul className="gx-sub-popover">
        {languageData.map((language) => (
          <li
            className="gx-media gx-pointer"
            key={JSON.stringify(language)}
            onClick={(e) => this.props.switchLanguage(language)}
          >
            <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`} />
            <span className="gx-language-text">{language.name}</span>
          </li>
        ))}
      </ul>
    </CustomScrollbars>
  );

  updateSearchChatUser = (evt) => {
    this.setState({
      searchText: evt.target.value,
    });
  };
  randomString(length) {
    var chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  getCotdata = (value) => {
    if (!this.props.selectedCots.includes(value)) {
      var reqvar = { selectedCOT: value };
      this.props.getCotdata(reqvar);
    }
  };
  opencotmodal = (
    value,
    ticker_id,
    type,
    week,
    week1,
    name,
    group,
    uniquename,
    movindex
  ) => {
    // if(!this.props.selectedGRAPH.includes(value)){

    if (
      type == "static" ||
      type == "weighted" ||
      type == "spread" ||
      type == "pnetv" ||
      type == "funnell"
    ) {
      // console.log('asplopen',value);
      if (this.props.savestatus1) {
        this.props.savestatus(false);
      }
      if (uniquename == "") {
        uniquename = name + "_" + this.randomString(8);
      }
      this.getGraphData(value, ticker_id, type, week, week1, group, uniquename);
    } else {
      if (uniquename == "") {
        uniquename = name + "_" + this.randomString(8);
      }
      if (movindex) {
        this.setState({
          cotvalue: value,
          cotticker_id: ticker_id,
          cottype: type,
          cotweek: week,
          cotweek1: week1,
          cotgroup: group,
          uniquename: uniquename,
          showmovcotindicatorpopup: true,
        });
      } else {
        this.setState({
          cotvalue: value,
          cotticker_id: ticker_id,
          cottype: type,
          cotweek: week,
          cotweek1: week1,
          cotgroup: group,
          uniquename: uniquename,
          showcotindicatorpopup: true,
        });
      }
    }
    // }
  };

  addcotchart = () => {
    this.setState({
      showcotindicatorpopup: false,
      showmovcotindicatorpopup: false,
    });
    if (this.props.savestatus1) {
      this.props.savestatus(false);
    }
    this.getGraphData(
      this.state.cotvalue,
      this.state.cotticker_id,
      this.state.cottype,
      this.state.cotweek,
      this.state.cotweek1,
      this.state.cotgroup,
      this.state.uniquename
    );
  };
  getGraphData = (
    value,
    ticker_id,
    type,
    week,
    week1,
    group,
    uniquename,
    color = ""
  ) => {
    // if(!this.props.selectedGRAPH.includes(value)){
    // console.log('asplcot',value);
    var temp = this.props.selectedGRAPH;
    var test = temp.filter(function(temp) {
      return temp.uniquename == uniquename;
    });
    if (test.length == 0) {
      // console.log('asplvalue',value);
      this.props.loaderstatus(true);
      //this.props.cotloaderstatus(true);
      if (color != "") {
        var reqvar = {
          selectedGRAPH: value,
          ticker_id: ticker_id,
          type: type,
          week: week,
          week1: week1,
          group: group,
          uniquename: uniquename,
          color: color,
        };
      } else {
        var reqvar = {
          selectedGRAPH: value,
          ticker_id: ticker_id,
          type: type,
          week: week,
          week1: week1,
          group: group,
          uniquename: uniquename,
        };
      }
      this.props.getGraphData(reqvar);
    }
    // }
  };

  getEcindata = (value) => {
    if (!this.props.selectedEcin.includes(value)) {
      this.props.loaderstatus(true);
      var reqvar = {
        selectedEcin: value,
        ticker_code: localStorage.getItem("ticker_code"),
      };
      this.props.getEcindata(reqvar);
      if (this.props.savestatus1) {
        this.props.savestatus(false);
      }
    }
  };
  handleChange = (event) => {
    if ([event.target.name] == "williamPeriod") {
      this.props.trendAIPeriod["william"] = event.target.value;
    }
    if ([event.target.name] == "slopePeriod") {
      this.props.trendAIPeriod["slope"] = event.target.value;
    }
    if ([event.target.name] == "nclraPeriod") {
      this.props.trendAIPeriod["nclra"] = event.target.value;
    }
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSNRTimeFrame = (event) => {
    if (event.target.value === "daily") {
      sdate = moment(month3, "DD-MM-YYYY");
      this.setState({
        [event.target.name]: event.target.value,
        snrStartDate: moment(month3, "DD-MM-YYYY"),
        snrRadio: 1,
      });
    }
    if (event.target.value === "weekly") {
      var month12 = new Date();
      month12.setMonth(month12.getMonth() - 12);
      sdate = moment(month12, "DD-MM-YYYY");
      this.setState({
        [event.target.name]: event.target.value,
        snrStartDate: moment(month12, "DD-MM-YYYY"),
        snrRadio: 3,
      });
    }
    if (event.target.value === "monthly") {
      var month60 = new Date();
      month60.setMonth(month60.getMonth() - 60);
      sdate = moment(month60, "DD-MM-YYYY");
      this.setState({
        [event.target.name]: event.target.value,
        snrStartDate: moment(month60, "DD-MM-YYYY"),
        snrRadio: 6,
      });
    }
  };
  handleCorreleValue = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  calldacm = () => {
    this.props.calldacm(true);
    this.props.loaderstatus(true);
  };
  handleChange1 = (key) => {
    // if(key=='')
    // {
    //   this.props.techindicator([]);
    // }
    // else
    // {
    key = String(key);
    var keyArray = key.split(",");
    keyArray.map((item, key1) => {
      var html = <div></div>;
      if (ti[item]) {
        html = ti[item];
      }
      this.setState({
        recentindicator: item,
        showpopupcontent: html,
        showtechnicalindcatorpopup: true,
      });
      // }
    });
    // }
  };
  handleCanceltechnical = () => {
    this.setState({
      showtechnicalindcatorpopup: false,
      showcotindicatorpopup: false,
      showmovcotindicatorpopup: false,
    });
  };
  addsapratetechnical = () => {
    //alert(this.state.recentindicator);
    var formElements = document.getElementById("indicator_form").elements;
    var postData = [];
    postData[0] = this.state.recentindicator;
    for (var i = 0; i < formElements.length; i++)
      if (formElements[i].type != "submit")
        //we dont want to include the submit-buttom
        // postData[formElements[i].name]=formElements[i].value;
        postData.push(formElements[i].value);
    var joined = this.state.sapratetechnicalindicator.concat(
      this.state.recentindicator
    );
    var joined1 = this.props.sapratetechnicalindicator;
    joined1.push(postData);
    // joined1[this.state.recentindicator] = postData;
    // selectedTI.push(this.state.recentindicator);
    // console.log('asplti',joined1);
    this.props.techindicator(joined1);
    if (this.props.savestatus1) {
      this.props.savestatus(false);
    }
    this.setState({
      sapratetechnicalindicator: joined1,
      showtechnicalindcatorpopup: false,
    });
  };
  componentWillMount() {
    if (localStorage.getItem("ticker_code")) {
      this.setState({ exchange: localStorage.getItem("ticker_code") });
    }
    this.props.getVideo();
    var user_id = localStorage.getItem("user_id");
    if (localStorage.getItem("saved_ticker_id")) {
      this.onSelect(localStorage.getItem("saved_ticker_id"));
    } else {
      this.props.getmostviewedticker({ user_id: user_id });
      this.setState({
        callMostViewedTicker: true,
        callMostViewedTickerNews: true,
      });
    }
    // if(this.state.exchange)
    // {
    //   this.setState({exchange:localStorage.getItem('ticker_code')})
    // }
  }
  componentDidUpdate() {
    // console.log('rohan');
    // console.log('rohan',window.location.pathname);
    // console.log('rohan',this.state.callMostViewedTickerNews);
    // console.log('rohan',this.state.mostViewedTickerData);
    if (
      window.location.pathname == "/news" &&
      this.state.callMostViewedTickerNews &&
      this.props.mostViewedTickerData.length > 0
    ) {
      // console.log('rohannews');
      this.onSelectNews(this.props.mostViewedTickerData[0][0]["eod_data"]);
      this.setState({ callMostViewedTickerNews: false });
    }
    if (
      (window.location.pathname == "/charting" ||
        window.location.pathname == "/dashboard") &&
      this.state.callMostViewedTicker &&
      this.props.mostViewedTickerData.length > 0 &&
      this.props.mostViewedTickerData[0].length > 0
    ) {
      this.onSelect(this.props.mostViewedTickerData[0][0]["eod_data"]);
      this.setState({ callMostViewedTicker: false });
    }
  }
  onSnRRadioChange = (e) => {
    // console.log('radio checked', e.target.value);
    this.setState({ snrRadio: e.target.value, checkValue: "radio" });
  };
  onSnrStartDateChange = (dates, dateStrings) => {
    this.setState({ snrStartDate: dateStrings, checkValue: "rangepicker" });
  };
  onSnrEndDateChange = (dates, dateStrings) => {
    this.setState({ snrEndDate: dateStrings, checkValue: "rangepicker" });
  };
  disabledDate = (current) => {
    return current.isAfter(moment());
  };
  handleSubmit() {
    this.props.setInitialCots(true);
    localStorage.setItem("family", this.state.cotfamily);

    if (this.state.cotfamily !== "") {
      // var setStartDate = moment(startdate1, "DD-MM-YYYY");
      // var setendDate = moment(enddate1, "DD-MM-YYYY");
      // localStorage.setItem("startDate1", setStartDate.format("YYYY-MM-DD"));
      // localStorage.setItem("endDate1", setendDate.format("YYYY-MM-DD"));

      localStorage.setItem("startDate1", startdate1);
      localStorage.setItem("endDate1", enddate1);

      //Set split view true on submit //by vasudev
      this.props.splitscreen(true);

      if (localStorage.getItem("ticker_code")) {
        // this.setState({ exchange: localStorage.getItem("exchangeValue") });
        var data = {
          exchange: localStorage.getItem("ticker_code"),
          cotfamily: this.state.cotfamily,
          startdate: startdate1,
          enddate: enddate1,
        };
        this.props.loaderstatus(true);
        this.props.getaccontdata(data);
      }

      // this.setState({
      //   progress: true,
      // });
      // this.props.progressbar(true);

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
      //         // percent : 0,
      //       });
      //     }
      // }, 1000);
      // }
    } else {
      // set message on COT not select by vasudev
      message.error("Please select COT");
    }
  }
  cotchange() {
    var select = document.getElementById("cotfamily");
    this.setState({
      cotfamily: select.value,
    });
    this.props.clearData();
  }

  startdate = (date, dateString) => {
    startdate1 = dateString;
    var data = { start: startdate1, end: enddate1 };
    this.props.changeScroller(data);
    // console.log("data---->", data);
  };
  enddate = (date, dateString) => {
    enddate1 = dateString;
    var data = { start: startdate1, end: enddate1 };
    this.props.changeScroller(data);
  };
  priceforecast = (status, type) => {
    if (!status) {
      this.props.loaderstatus(true);
      const temp = this;
      setTimeout(function() {
        temp.props.loaderstatus(false);
      }, 1000);
    }
    var data = { status: status, type: type };
    this.props.priceforecast(data);
  };
  cotforecast = (status, type) => {
    var data = { status: status, type: type };
    // console.log('asplcot',this.props.selectedGRAPH);
    var temp = this.props.selectedGRAPH;
    var test = temp.filter(function(temp) {
      return temp.selectedGRAPH == "5e28248771deb027d45b06f9";
    });
    var ticker_id = "";
    if (this.props.tickerData[0]) {
      ticker_id = this.props.tickerData[0][0]["_id"];
    }
    if (test.length == 0) {
      // console.log('aspllllll');
      this.opencotmodal(
        "5e28248771deb027d45b06f9",
        ticker_id,
        "static",
        10,
        6,
        "LEG Net Position",
        "Future",
        "",
        true
      );
    }
    // else{
    //   console.log('asplplpl');
    // }
    this.props.cotforecast(data);
  };
  snrindicator = (status, type, priceforecast) => {
    let snrName = "";
    if (priceforecast == 2) {
      snrName = "S&R ML";
    } else if (priceforecast == 3) {
      snrName = "S&R Vector Quantization";
    } else if (priceforecast == 4) {
      snrName = "S&R AI";
    } else if (priceforecast == 5) {
      snrName = "S&R AI Extension";
    }
    this.setState({
      showsnrindicatorpopup: true,
      snrType: type,
      priceforecast: priceforecast,
      snrName: snrName,
    });
  };
  trendindicator = (status, type) => {
    this.setState({
      showtrendindicatorpopup: true,
      trentType: type,
    });
  };
  correllindicator = (status) => {
    this.setState({
      showcorrellindicatorpopup: status,
    });
  };
  trendnclraindicator = (status, type) => {
    var data = {
      period: 3,
      type: "NCLRA",
      ticker_code: localStorage.getItem("ticker_code"),
    };
    var data1 = { status: status, type: type };
    this.props.priceforecast(data1);
    this.props.gettrend(data);
    // this.setState(
    // {
    //   showtrendindicatorpopup: false,
    // });
  };
  tsrmvisible = (status, type) => {
    var data = { status: status, type: type };
    this.props.tsrmvisible(data);
  };
  trendmlvisible = (status, type) => {
    var data = { status: status, type: type };
    this.props.trendmlvisible(data);
  };
  newsindicator = (status, type) => {
    var newsArray = this.props.newsindicator1;
    if (!newsArray.includes(type)) {
      newsArray.push(type);
      this.props.newsindicator(newsArray);
    }
  };
  getEcinUnderPricedata = (ticker_code) => {
    this.props.getEcinUnderPricedata(ticker_code);
  };
  handleCancelSnR = () => {
    this.setState({ showsnrindicatorpopup: false });
  };
  handleCanceltrend = () => {
    this.setState({
      showtrendindicatorpopup: false,
    });
  };
  addtrendindicator = () => {
    var data = {
      period: this.state.trendPeriod,
      type: this.state.trentType,
      ticker_code: localStorage.getItem("ticker_code"),
    };
    this.props.gettrend(data);
    this.setState({
      showtrendindicatorpopup: false,
    });
  };
  addsnrindicator = () => {
    var endDate = "";
    var startDate = "";
    var error = false;
    if (this.state.checkValue == "radio") {
      if (this.state.snrRadio === 1) {
        endDate = moment().format("YYYY-MM-DD");
        startDate = moment()
          .subtract(3, "months")
          .format("YYYY-MM-DD");
      } else if (this.state.snrRadio === 2) {
        endDate = moment().format("YYYY-MM-DD");
        startDate = moment()
          .subtract(6, "months")
          .format("YYYY-MM-DD");
      } else if (this.state.snrRadio === 3) {
        endDate = moment().format("YYYY-MM-DD");
        startDate = moment()
          .subtract(12, "months")
          .format("YYYY-MM-DD");
      } else if (this.state.snrRadio === 4) {
        endDate = moment().format("YYYY-MM-DD");
        startDate = moment()
          .startOf("year")
          .format("YYYY-MM-DD");
      } else if (this.state.snrRadio === 5) {
        endDate = moment().format("YYYY-MM-DD");
        startDate = moment()
          .subtract(24, "months")
          .format("YYYY-MM-DD");
      } else if (this.state.snrRadio === 6) {
        endDate = moment().format("YYYY-MM-DD");
        startDate = moment()
          .subtract(60, "months")
          .format("YYYY-MM-DD");
      } else if (this.state.snrRadio === 7) {
        endDate = moment().format("YYYY-MM-DD");
        startDate = moment()
          .subtract(120, "months")
          .format("YYYY-MM-DD");
      } else if (this.state.snrRadio === 8) {
        endDate = moment().format("YYYY-MM-DD");
        startDate = moment()
          .subtract(240, "months")
          .format("YYYY-MM-DD");
      }
    } else {
      // console.log('addsnrStartDate',this.state.snrStartDate)
      // console.log('addsnrEndDate',this.state.snrEndDate)
      // console.log('addsnrStartDate',typeof this.state.snrStartDate)
      // console.log('addsnrEndDate',typeof this.state.snrEndDate)
      startDate = this.state.snrStartDate;
      if (typeof this.state.snrStartDate === "object") {
        startDate = moment(this.state.snrStartDate).format("YYYY-MM-DD");
      }
      endDate = this.state.snrEndDate;
      if (typeof this.state.snrEndDate === "object") {
        endDate = moment(this.state.snrEndDate).format("YYYY-MM-DD");
      }
      // console.log('addstartDate',startDate)
      // console.log('addendDate',endDate)
      const date1 = new Date(startDate);
      const date2 = new Date(endDate);
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      // console.log('aspldate',endDate,startDate,this.state.snrType,diffDays)
      if (typeof startDate === "undefined" || typeof endDate === "undefined") {
        // console.log("Start date and End Date is required");
        message.error("Start date and End Date is required");
        error = true;
      } else if (startDate > endDate) {
        // console.log("End date must be greter than Start date");
        message.error("End date must be greter than Start date");
        error = true;
      }
      // else if(this.state.snrType == 'snr1' && diffDays < '90')
      else if (this.state.snrTimeFrame == "daily" && diffDays < "90") {
        // console.log("Range can not be less than 90 days");
        message.error("Range can not be less than 90 days");
        error = true;
      }
      // else if(this.state.snrType == 'snr2' && diffDays < '365')
      else if (this.state.snrTimeFrame == "weekly" && diffDays < "365") {
        console.log("Range can not be less than 1 year");
        message.error("Range can not be less than 1 year");
        error = true;
      }
      // else if(this.state.snrType == 'snr3' && diffDays < '1826')
      else if (this.state.snrTimeFrame == "monthly" && diffDays < "1826") {
        // console.log("Range can not be less than 5 years");
        message.error("Range can not be less than 5 years");
        error = true;
      }
    }
    if (!error) {
      let snrName = "";
      if (this.state.priceforecast == 2) {
        snrName = "S&R ML";
      } else if (this.state.priceforecast == 3) {
        snrName = "S&R Vector Quantization";
      } else if (this.state.priceforecast == 4) {
        snrName = "S&R AI";
      } else if (this.state.priceforecast == 5) {
        snrName = "S&R AI Extension";
      }
      // console.log('asplenddate',endDate)
      this.setState({ showsnrindicatorpopup: false });
      var data = { status: true, type: this.state.priceforecast };
      this.props.loaderstatus(true);
      this.props.priceforecast(data);
      this.props.getSnRData({
        ticker_code: localStorage.getItem("ticker_code"),
        start_date: startDate,
        end_date: endDate,
        snrType: this.state.snrType,
        type: this.state.snrTimeFrame,
        snrName: snrName,
      });
      // console.log('aspl5',startDate);
      // console.log('aspl6',endDate);
    }
  };
  trendAI = () => {
    this.setState({ gaugeModalVisible: true });
  };
  handleCancelgauge = () => {
    this.setState({ gaugeModalVisible: false });
  };
  handleCorrellType = (event) => {
    // console.log('aspl',this.state.correllType,event.target.value);
    correllValue = "";
    correllValueArray = [];
    this.setState({ correllType: event.target.value });
    if (event.target.value == "ticker") {
      // console.log('aspla',this.props.ticker_list);
      if (this.props.ticker_list.length > 0) {
        if (this.props.ticker_list[0].length > 0) {
          // correllValue = <select className="ti_modal_fields" name="correllValue" value={this.state.correllValue} onChange={this.handleCorreleValue} >
          //   <option key="default" value="">Please Select</option>
          {
            this.props.ticker_list[0].map((item) => {
              //  return ( <option key={item.eod_data} value={item.eod_data}>{item.short_desc}</option>)
              correllValueArray.push({
                key: item.eod_data,
                value: item.short_desc,
                display: item.short_desc,
              });
              // console.log('asplaspl',item.short_desc)
            });
          }
          // </select>
        }
      }
    } else if (event.target.value == "cot") {
      // correllValue = <select className="ti_modal_fields" name="correllValue" value={this.state.correllValue} onChange={this.handleCorreleValue} >
      //   <option key="default" value="">Please Select</option>
      //   <option key="LEG Commercial Net" value="LEG Commercial Net">LEG Commercial Net</option>
      //   <option key="LEG Non-Commercial Net" value="LEG Non-Commercial Net">LEG Non-Commercial Net</option>
      //   <option key="LEG Non Reportable Net" value="LEG Non Reportable Net">LEG Non Reportable Net</option>
      //   <option key="LEG OI" value="LEG OI">LEG OI</option>
      // </select>
      correllValueArray.push({
        key: "LEG Commercial Net",
        value: "LEG Commercial Net",
        display: "Commercial Net",
      });
      correllValueArray.push({
        key: "LEG Non-Commercial Net",
        value: "LEG Non-Commercial Net",
        display: "Non-Commercial Net",
      });
      correllValueArray.push({
        key: "LEG Non Reportable Net",
        value: "LEG Non Reportable Net",
        display: "Non-Reportable Net",
      });
      correllValueArray.push({ key: "LEG OI", value: "LEG OI", display: "OI" });
    } else if (event.target.value == "ecin") {
      if (this.props.ecin_menulist.length > 0) {
        // correllValue = <select className="ti_modal_fields" name="correllValue" value={this.state.correllValue} onChange={this.handleCorreleValue} >
        // <option key="default" value="">Please Select</option>
        {
          Object.keys(this.props.ecin_menulist[0]).map((ecinIndex) => {
            if (
              this.props.ecin_menulist[0][ecinIndex]["countries"]["id"] == "16"
            ) {
              return Object.keys(
                this.props.ecin_menulist[0][ecinIndex]["ecin"]
              ).map((ecincountryIndex) => {
                // console.log('asplasplecin',this.props.ecin_menulist[0][ecinIndex]['ecin'][ecincountryIndex]['short_desc']);
                correllValueArray.push({
                  key: this.props.ecin_menulist[0][ecinIndex]["ecin"][
                    ecincountryIndex
                  ]["_id"].$oid,
                  value: this.props.ecin_menulist[0][ecinIndex]["ecin"][
                    ecincountryIndex
                  ]["short_desc"],
                  display: this.props.ecin_menulist[0][ecinIndex]["ecin"][
                    ecincountryIndex
                  ]["short_desc"],
                });
                // return (<option key={this.props.ecin_menulist[0][ecinIndex]['ecin'][ecincountryIndex]['_id'].$oid} value={this.props.ecin_menulist[0][ecinIndex]['ecin'][ecincountryIndex]['_id'].$oid}>{this.props.ecin_menulist[0][ecinIndex]['ecin'][ecincountryIndex]['short_desc']}</option>)
              });
            }
          });
        }
        // </select>
      }
    }
    this.setState({ correllType: event.target.value, correllValue: "" });
  };
  addCorrell = () => {
    // console.log('aspla',this.state.correllPeriod);
    // console.log('asplb',this.state.correllValue);
    // console.log('asplc',this.state.correllType);
    if (
      this.state.correllPeriod != "" &&
      (this.state.correllValue != "" || this.state.correllType === "volume") &&
      this.state.correllType != ""
    ) {
      this.setState({ showcorrellindicatorpopup: false });
      this.props.getCorrell({
        period: this.state.correllPeriod,
        correllgroup: this.state.correllValue,
        correlltype: this.state.correllType,
        ticker_code: localStorage.getItem("ticker_code"),
      });
      // var postData=[];
      // postData[0]='correll';
      // postData[1]='Line';
      // postData[2]='Correll';
      // var joined1 = this.props.sapratetechnicalindicator;
      // joined1.push(postData);
      // console.log('asplti',joined1);
      // this.props.techindicator(joined1);
      // if(this.props.savestatus1)
      // {
      // this.props.savestatus(false);
      // }
      // this.setState({ sapratetechnicalindicator: joined1})
    } else {
      message.error("All Fields Required");
    }
  };
  addtrendAI = () => {
    this.props.trendAIPeriod["slope"] = this.state.slopePeriod;
    this.props.trendAIPeriod["william"] = this.state.williamPeriod;
    this.props.trendAIPeriod["nclra"] = this.state.nclraPeriod;
    this.props.loaderstatus(true);
    // var date = this.props.moveDate.moveDate;
    // console.log('asplaspl',date);
    this.props.gettrendAI({
      ticker_code: localStorage.getItem("ticker_code"),
      william_period: this.state.williamPeriod,
      slope_period: this.state.slopePeriod,
      nclra_period: this.state.nclraPeriod,
    });
    this.setState({ gaugeModalVisible: false });
  };

  render() {
    var ticker_id = "";
    var ticker_code = "";
    var tickerecinArray = [];
    var ticker_sector = "";

    //set scrolldata date by goral
    if (this.props.scrollData != "") {
      startdate1 = this.props.scrollData.start;
      enddate1 = this.props.scrollData.end;
    } else {
      enddate1 = moment().format("YYYY-MM-DD");
      startdate1 = moment()
        .subtract(6, "months")
        .format("YYYY-MM-DD");
    }

    if (this.props.snrSavedStatus) {
      this.props.getSnRData(this.props.snrRequestData);
    }
    if (this.props.tickerData[0]) {
      ticker_id = this.props.tickerData[0][0]["_id"];
      ticker_code = this.props.tickerData[0][0]["eod_data"];
      var ecin_code = this.props.tickerData[0][0]["ecin_code"];
      var ticker_sector = this.props.tickerData[0][0]["group"];
      if (ecin_code != "") {
        tickerecinArray = ecin_code.split(",");
      }
    }
    const { locale, width, navCollapsed, navStyle } = this.props;
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <SubMenu
          className="gx-menu-horizontal"
          key="dashboard"
          title={
            <span>
              <IntlMessages id="Legacy" />
            </span>
          }
        >
          <Menu.Item key="1" onClick={() => this.getCotdata("LEGOI")}>
            {" "}
            Open123 Interest{" "}
          </Menu.Item>
          <Menu.Item key="1" onClick={() => this.getCotdata("LEGCOM")}>
            {" "}
            Commercials{" "}
          </Menu.Item>
        </SubMenu>
      </Menu>
    );

    var menu1 = (
      <Menu onClick={this.handleMenuClick}>
        <div className="blank_menu">Please select ticker</div>
      </Menu>
    );

    if (this.props.ecin_menulist.length > 0) {
      menu1 = (
        <Menu onClick={this.handleMenuClick}>
          {Object.keys(this.props.ecin_menulist[0]).map((ecinIndex) => {
            return (
              <SubMenu
                className="gx-menu-horizontal"
                key={
                  this.props.ecin_menulist[0][ecinIndex]["countries"]["name"]
                }
                title={
                  <span>
                    <IntlMessages
                      id={
                        this.props.ecin_menulist[0][ecinIndex]["countries"][
                          "name"
                        ]
                      }
                    />
                  </span>
                }
              >
                {Object.keys(
                  this.props.ecin_menulist[0][ecinIndex]["ecin"]
                ).map((ecincountryIndex) => {
                  return (
                    <Menu.Item
                      key={
                        this.props.ecin_menulist[0][ecinIndex]["ecin"][
                          ecincountryIndex
                        ]["ecIn_code"]
                      }
                      onClick={() =>
                        this.getEcindata(
                          this.props.ecin_menulist[0][ecinIndex]["ecin"][
                            ecincountryIndex
                          ]["_id"].$oid
                        )
                      }
                    >
                      {" "}
                      {
                        this.props.ecin_menulist[0][ecinIndex]["ecin"][
                          ecincountryIndex
                        ]["short_desc"]
                      }{" "}
                    </Menu.Item>
                  );
                })}
                {this.props.ecin_menulist[0][ecinIndex]["countries"]["id"] ==
                  "16" && ticker_sector == "CURRENCIES" ? (
                  <Menu.Item
                    key={"IR Spread"}
                    onClick={() => this.getEcinUnderPricedata(ticker_code)}
                  >
                    {" "}
                    IR Spread{" "}
                  </Menu.Item>
                ) : null}
              </SubMenu>
            );
          })}

          {/* { Object.keys(this.props.ecin_menulist[0]).map((ecinIndex)=>{
        return ( 
              <SubMenu className="gx-menu-horizontal" key={this.props.ecin_menulist[0][ecinIndex]['ecin'][0]['name']}
                   title={<span>
                         <IntlMessages id={this.props.ecin_menulist[0][ecinIndex]['ecin'][0]['name']}/></span>}>
                  {Object.keys(this.props.ecin_menulist[0][ecinIndex]['countries']).map((ecincountryIndex)=>{
                    return (
                      <Menu.Item  key={this.props.ecin_menulist[0][ecinIndex]['countries'][ecincountryIndex][0]['name']} onClick={()=> this.getEcindata(this.props.ecin_menulist[0][ecinIndex]['countries'][ecincountryIndex]['id']) } > {this.props.ecin_menulist[0][ecinIndex]['countries'][ecincountryIndex][0]['name']} </Menu.Item>
                    );
                  })}
                  
              </SubMenu>
           
        ); 
        
      })} */}
          <Menu.Item
            key="videoIcon"
            align="right"
            onClick={() => this.openModal("ecin")}
          >
            <img
              alt=""
              src={require("assets/images/dark_icon/QuestionIco.png")}
              className="video"
            />
          </Menu.Item>
        </Menu>
      );
    }
    // console.log("asplcorrell", this.props.correllData);
    var menu3 = (
      <Menu onClick={this.handleMenuClick} className="blank_menu_cot">
        <div>Please select ticker</div>
      </Menu>
    );
    if (this.props.cot_menulist.length > 0) {
      menu3 = (
        <Menu onClick={this.handleMenuClick} triggerSubMenuAction="click">
          <SubMenu
            className="gx-menu-horizontal"
            key={"Futures Only"}
            title="Futures Only"
          >
            {Object.keys(this.props.cot_menulist[0]).map((familyIndex) => {
              return (
                <SubMenu
                  className="gx-menu-horizontal"
                  key={familyIndex}
                  title={<span>{familyIndex}</span>}
                >
                  {Object.keys(this.props.cot_menulist[0][familyIndex]).map(
                    (plotIndex) => {
                      if (plotIndex == "Single Plot") {
                        return (
                          <SubMenu
                            className="gx-menu-horizontal"
                            key={plotIndex + "_" + familyIndex}
                            title={plotIndex}
                          >
                            {Object.keys(
                              this.props.cot_menulist[0][familyIndex][plotIndex]
                            ).map((descIndex) => {
                              return (
                                <SubMenu
                                  className="gx-menu-horizontal"
                                  key={descIndex + "_" + familyIndex}
                                  title={descIndex}
                                >
                                  {Object.keys(
                                    this.props.cot_menulist[0][familyIndex][
                                      plotIndex
                                    ][descIndex]
                                  ).map((groupIndex) => {
                                    if (
                                      this.props.cot_menulist[0][familyIndex][
                                        plotIndex
                                      ][descIndex][groupIndex]["CoIn_Code"] ==
                                        "LEGMOVIND" ||
                                      this.props.cot_menulist[0][familyIndex][
                                        plotIndex
                                      ][descIndex][groupIndex]["CoIn_Code"] ==
                                        "TFFMOVIND" ||
                                      this.props.cot_menulist[0][familyIndex][
                                        plotIndex
                                      ][descIndex][groupIndex]["CoIn_Code"] ==
                                        "DISMOVIND"
                                    ) {
                                      // console.log(
                                      //   "test11111------>",
                                      //   this.props.cot_menulist[0][familyIndex][
                                      //     plotIndex
                                      //   ][descIndex][groupIndex]["Description"]
                                      // );
                                      return (
                                        <Menu.Item
                                          key={
                                            this.props.cot_menulist[0][
                                              familyIndex
                                            ][plotIndex][descIndex][groupIndex][
                                              "Description"
                                            ] +
                                            "_" +
                                            familyIndex
                                          }
                                          onClick={() =>
                                            this.opencotmodal(
                                              this.props.cot_menulist[0][
                                                familyIndex
                                              ][plotIndex][descIndex][
                                                groupIndex
                                              ]["_id"].$oid,
                                              ticker_id,
                                              this.props.cot_menulist[0][
                                                familyIndex
                                              ][plotIndex][descIndex][
                                                groupIndex
                                              ]["type"],
                                              10,
                                              6,
                                              this.props.cot_menulist[0][
                                                familyIndex
                                              ][plotIndex][descIndex][
                                                groupIndex
                                              ]["Description"],
                                              "Future",
                                              "",
                                              true
                                            )
                                          }
                                        >
                                          {
                                            this.props.cot_menulist[0][
                                              familyIndex
                                            ][plotIndex][descIndex][groupIndex][
                                              "Description"
                                            ]
                                          }
                                        </Menu.Item>
                                      );
                                    } else {
                                      if (
                                        this.props.cot_menulist[0][familyIndex][
                                          plotIndex
                                        ][descIndex][groupIndex]["CoIn_Code"] !=
                                        "LEGOISPRNET"
                                      ) {
                                        // console.log(
                                        //   "test",
                                        //   this.props.cot_menulist[0][
                                        //     familyIndex
                                        //   ][plotIndex][descIndex][groupIndex][
                                        //     "Description"
                                        //   ]
                                        // );

                                        return (
                                          <Menu.Item
                                            key={
                                              this.props.cot_menulist[0][
                                                familyIndex
                                              ][plotIndex][descIndex][
                                                groupIndex
                                              ]["Description"] +
                                              "_" +
                                              familyIndex
                                            }
                                            onClick={() =>
                                              this.opencotmodal(
                                                this.props.cot_menulist[0][
                                                  familyIndex
                                                ][plotIndex][descIndex][
                                                  groupIndex
                                                ]["_id"].$oid,
                                                ticker_id,
                                                this.props.cot_menulist[0][
                                                  familyIndex
                                                ][plotIndex][descIndex][
                                                  groupIndex
                                                ]["type"],
                                                10,
                                                6,
                                                this.props.cot_menulist[0][
                                                  familyIndex
                                                ][plotIndex][descIndex][
                                                  groupIndex
                                                ]["Description"],
                                                "Future",
                                                "",
                                                false
                                              )
                                            }
                                          >
                                            {/* {console.log(
                                              "test11111------>",
                                              this.props.cot_menulist[0][
                                                familyIndex
                                              ][plotIndex][descIndex][
                                                groupIndex
                                              ]["Description"]
                                            )} */}
                                            {
                                              this.props.cot_menulist[0][
                                                familyIndex
                                              ][plotIndex][descIndex][
                                                groupIndex
                                              ]["Description"]
                                            }{" "}
                                          </Menu.Item>
                                        );
                                      }
                                    }
                                  })}
                                </SubMenu>
                              );
                            })}
                          </SubMenu>
                        );
                      } else {
                        return (
                          <SubMenu
                            className="gx-menu-horizontal"
                            key={plotIndex}
                            title={plotIndex}
                          >
                            {Object.keys(
                              this.props.cot_menulist[0][familyIndex][plotIndex]
                            ).map((descIndex) => {
                              if (
                                this.props.cot_menulist[0][familyIndex][
                                  plotIndex
                                ][descIndex]["CoIn_Code"] == "LEGMOVIND" ||
                                this.props.cot_menulist[0][familyIndex][
                                  plotIndex
                                ][descIndex]["CoIn_Code"] == "TFFMOVIND" ||
                                this.props.cot_menulist[0][familyIndex][
                                  plotIndex
                                ][descIndex]["CoIn_Code"] == "DISMOVIND"
                              ) {
                                return (
                                  <Menu.Item
                                    key={
                                      this.props.cot_menulist[0][familyIndex][
                                        plotIndex
                                      ][descIndex]["Description"] + "_12"
                                    }
                                    onClick={() =>
                                      this.opencotmodal(
                                        this.props.cot_menulist[0][familyIndex][
                                          plotIndex
                                        ][descIndex]["_id"].$oid,
                                        ticker_id,
                                        this.props.cot_menulist[0][familyIndex][
                                          plotIndex
                                        ][descIndex]["type"],
                                        10,
                                        6,
                                        this.props.cot_menulist[0][familyIndex][
                                          plotIndex
                                        ][descIndex]["Description"],
                                        "Future",
                                        "",
                                        true
                                      )
                                    }
                                  >
                                    {" "}
                                    {
                                      this.props.cot_menulist[0][familyIndex][
                                        plotIndex
                                      ][descIndex]["Description"]
                                    }{" "}
                                  </Menu.Item>
                                );
                              } else {
                                if (
                                  this.props.cot_menulist[0][familyIndex][
                                    plotIndex
                                  ][descIndex]["CoIn_Code"] != "LEGOISPRNET"
                                ) {
                                  return (
                                    <Menu.Item
                                      key={
                                        this.props.cot_menulist[0][familyIndex][
                                          plotIndex
                                        ][descIndex]["Description"] + "_123"
                                      }
                                      onClick={() =>
                                        this.opencotmodal(
                                          this.props.cot_menulist[0][
                                            familyIndex
                                          ][plotIndex][descIndex]["_id"].$oid,
                                          ticker_id,
                                          this.props.cot_menulist[0][
                                            familyIndex
                                          ][plotIndex][descIndex]["type"],
                                          10,
                                          6,
                                          this.props.cot_menulist[0][
                                            familyIndex
                                          ][plotIndex][descIndex][
                                            "Description"
                                          ],
                                          "Future",
                                          "",
                                          false
                                        )
                                      }
                                    >
                                      {" "}
                                      {
                                        this.props.cot_menulist[0][familyIndex][
                                          plotIndex
                                        ][descIndex]["Description"]
                                      }{" "}
                                    </Menu.Item>
                                  );
                                }
                              }
                            })}
                          </SubMenu>
                        );
                      }
                    }
                  )}
                </SubMenu>
              );
            })}
          </SubMenu>
          <SubMenu
            className="gx-menu-horizontal"
            key={"Combined_1"}
            title="Combined"
          >
            {Object.keys(this.props.cot_menulist[0]).map((familyIndex) => {
              return (
                <SubMenu
                  className="gx-menu-horizontal"
                  key={familyIndex + "_1"}
                  title={<span>{familyIndex}</span>}
                >
                  {Object.keys(this.props.cot_menulist[0][familyIndex]).map(
                    (plotIndex) => {
                      if (plotIndex == "Single Plot") {
                        return (
                          <SubMenu
                            className="gx-menu-horizontal"
                            key={plotIndex + "_" + familyIndex + "_1"}
                            title={plotIndex}
                          >
                            {Object.keys(
                              this.props.cot_menulist[0][familyIndex][plotIndex]
                            ).map((descIndex) => {
                              // console.log(this.props.cot_menulist[0][familyIndex][plotIndex][descIndex]);
                              return (
                                <SubMenu
                                  className="gx-menu-horizontal"
                                  key={descIndex + "_" + familyIndex + "_1"}
                                  title={descIndex}
                                >
                                  {Object.keys(
                                    this.props.cot_menulist[0][familyIndex][
                                      plotIndex
                                    ][descIndex]
                                  ).map((groupIndex) => {
                                    if (
                                      this.props.cot_menulist[0][familyIndex][
                                        plotIndex
                                      ][descIndex][groupIndex]["CoIn_Code"] ==
                                        "LEGMOVIND" ||
                                      this.props.cot_menulist[0][familyIndex][
                                        plotIndex
                                      ][descIndex][groupIndex]["CoIn_Code"] ==
                                        "TFFMOVIND" ||
                                      this.props.cot_menulist[0][familyIndex][
                                        plotIndex
                                      ][descIndex][groupIndex]["CoIn_Code"] ==
                                        "DISMOVIND"
                                    ) {
                                      return (
                                        <Menu.Item
                                          key={
                                            this.props.cot_menulist[0][
                                              familyIndex
                                            ][plotIndex][descIndex][groupIndex][
                                              "Description"
                                            ] +
                                            "_" +
                                            familyIndex +
                                            "_1"
                                          }
                                          onClick={() =>
                                            this.opencotmodal(
                                              this.props.cot_menulist[0][
                                                familyIndex
                                              ][plotIndex][descIndex][
                                                groupIndex
                                              ]["_id"].$oid,
                                              ticker_id,
                                              this.props.cot_menulist[0][
                                                familyIndex
                                              ][plotIndex][descIndex][
                                                groupIndex
                                              ]["type"],
                                              10,
                                              6,
                                              this.props.cot_menulist[0][
                                                familyIndex
                                              ][plotIndex][descIndex][
                                                groupIndex
                                              ]["Description"],
                                              "Combined",
                                              "",
                                              true
                                            )
                                          }
                                        >
                                          {" "}
                                          {
                                            this.props.cot_menulist[0][
                                              familyIndex
                                            ][plotIndex][descIndex][groupIndex][
                                              "Description"
                                            ]
                                          }{" "}
                                        </Menu.Item>
                                      );
                                    } else {
                                      return (
                                        <Menu.Item
                                          key={
                                            this.props.cot_menulist[0][
                                              familyIndex
                                            ][plotIndex][descIndex][groupIndex][
                                              "Description"
                                            ] +
                                            "_" +
                                            familyIndex +
                                            "_1"
                                          }
                                          onClick={() =>
                                            this.opencotmodal(
                                              this.props.cot_menulist[0][
                                                familyIndex
                                              ][plotIndex][descIndex][
                                                groupIndex
                                              ]["_id"].$oid,
                                              ticker_id,
                                              this.props.cot_menulist[0][
                                                familyIndex
                                              ][plotIndex][descIndex][
                                                groupIndex
                                              ]["type"],
                                              10,
                                              6,
                                              this.props.cot_menulist[0][
                                                familyIndex
                                              ][plotIndex][descIndex][
                                                groupIndex
                                              ]["Description"],
                                              "Combined",
                                              "",
                                              false
                                            )
                                          }
                                        >
                                          {" "}
                                          {
                                            this.props.cot_menulist[0][
                                              familyIndex
                                            ][plotIndex][descIndex][groupIndex][
                                              "Description"
                                            ]
                                          }{" "}
                                        </Menu.Item>
                                      );
                                    }
                                  })}
                                </SubMenu>
                              );
                            })}
                          </SubMenu>
                        );
                      } else {
                        return (
                          <SubMenu
                            className="gx-menu-horizontal"
                            key={plotIndex + "_1"}
                            title={plotIndex}
                          >
                            {Object.keys(
                              this.props.cot_menulist[0][familyIndex][plotIndex]
                            ).map((descIndex) => {
                              if (
                                this.props.cot_menulist[0][familyIndex][
                                  plotIndex
                                ][descIndex]["CoIn_Code"] == "LEGMOVIND" ||
                                this.props.cot_menulist[0][familyIndex][
                                  plotIndex
                                ][descIndex]["CoIn_Code"] == "TFFMOVIND" ||
                                this.props.cot_menulist[0][familyIndex][
                                  plotIndex
                                ][descIndex]["CoIn_Code"] == "DISMOVIND"
                              ) {
                                return (
                                  <Menu.Item
                                    key={
                                      this.props.cot_menulist[0][familyIndex][
                                        plotIndex
                                      ][descIndex]["Description"] + "_11"
                                    }
                                    onClick={() =>
                                      this.opencotmodal(
                                        this.props.cot_menulist[0][familyIndex][
                                          plotIndex
                                        ][descIndex]["_id"].$oid,
                                        ticker_id,
                                        this.props.cot_menulist[0][familyIndex][
                                          plotIndex
                                        ][descIndex]["type"],
                                        10,
                                        6,
                                        this.props.cot_menulist[0][familyIndex][
                                          plotIndex
                                        ][descIndex]["Description"],
                                        "Combined",
                                        "",
                                        true
                                      )
                                    }
                                  >
                                    {" "}
                                    {
                                      this.props.cot_menulist[0][familyIndex][
                                        plotIndex
                                      ][descIndex]["Description"]
                                    }{" "}
                                  </Menu.Item>
                                );
                              } else {
                                return (
                                  <Menu.Item
                                    key={
                                      this.props.cot_menulist[0][familyIndex][
                                        plotIndex
                                      ][descIndex]["Description"] + "_112"
                                    }
                                    onClick={() =>
                                      this.opencotmodal(
                                        this.props.cot_menulist[0][familyIndex][
                                          plotIndex
                                        ][descIndex]["_id"].$oid,
                                        ticker_id,
                                        this.props.cot_menulist[0][familyIndex][
                                          plotIndex
                                        ][descIndex]["type"],
                                        10,
                                        6,
                                        this.props.cot_menulist[0][familyIndex][
                                          plotIndex
                                        ][descIndex]["Description"],
                                        "Combined",
                                        "",
                                        false
                                      )
                                    }
                                  >
                                    {" "}
                                    {
                                      this.props.cot_menulist[0][familyIndex][
                                        plotIndex
                                      ][descIndex]["Description"]
                                    }{" "}
                                  </Menu.Item>
                                );
                              }
                            })}
                          </SubMenu>
                        );
                      }
                    }
                  )}
                </SubMenu>
              );
            })}
          </SubMenu>
          <Menu.Item
            key="videoIcon"
            align="right"
            onClick={() => this.openModal("ci")}
          >
            <img
              alt=""
              src={require("assets/images/dark_icon/QuestionIco.png")}
              className="video"
            />
          </Menu.Item>
        </Menu>
      );
    }
    // <Menu.Item  key={this.props.cot_menulist[0][familyIndex][plotIndex][descIndex]['Description']+'_1'} onClick={()=> this.opencotmodal(this.props.cot_menulist[0][familyIndex][plotIndex][descIndex]['_id'].$oid,ticker_id,this.props.cot_menulist[0][familyIndex][plotIndex][descIndex]['type'],10,6,this.props.cot_menulist[0][familyIndex][plotIndex][descIndex]['Description'],'Combined','',true) } > {this.props.cot_menulist[0][familyIndex][plotIndex][descIndex]['Description']} </Menu.Item>
    // <Menu.Item  key={this.props.cot_menulist[0][familyIndex][plotIndex][descIndex]['Description']+'_1'} onClick={()=> this.opencotmodal(this.props.cot_menulist[0][familyIndex][plotIndex][descIndex]['_id'].$oid,ticker_id,this.props.cot_menulist[0][familyIndex][plotIndex][descIndex]['type'],10,6,this.props.cot_menulist[0][familyIndex][plotIndex][descIndex]['Description'],'Combined','',false) } > {this.props.cot_menulist[0][familyIndex][plotIndex][descIndex]['Description']} </Menu.Item>
    var menu4 = (
      <Menu onClick={this.handleMenuClick} className="blank_menu_cot">
        <div>Please select ticker</div>
      </Menu>
    );
    if (this.props.tickerData[0]) {
      menu4 = (
        <Menu onClick={this.handleMenuClick}>
          {/* <Menu.Item key="bbands" onClick={()=> this.handleChange1('bbands')} >Bollinger Bands (BBands) {selectedTI.includes('bbands')?<i className="icon icon-check" style={{'fontSize':'15px','marginLeft':'5px'}}></i>:null}</Menu.Item> */}
          <Menu.Item key="sma" onClick={() => this.handleChange1("sma")}>
            Simple Moving Average (SMA){" "}
          </Menu.Item>
          <Menu.Item key="adl" onClick={() => this.handleChange1("adl")}>
            Accumulation Distribution Line (ADL)
          </Menu.Item>
          <Menu.Item key="adx" onClick={() => this.handleChange1("adx")}>
            Average Directional Movement Index (ADX)
          </Menu.Item>
          <Menu.Item key="ama" onClick={() => this.handleChange1("ama")}>
            Adaptive Moving Average (AMA)
          </Menu.Item>
          <Menu.Item key="atr" onClick={() => this.handleChange1("atr")}>
            Average True Range (ATR)
          </Menu.Item>
          <Menu.Item key="bbands" onClick={() => this.handleChange1("bbands")}>
            Bollinger Bands (BBands)
          </Menu.Item>
          <Menu.Item
            key="bbandsB"
            onClick={() => this.handleChange1("bbandsB")}
          >
            Bollinger Bands %B(BBands B)
          </Menu.Item>

          <Menu.Item
            key="bbandsWidth"
            onClick={() => this.handleChange1("bbandsWidth")}
          >
            Bollinger Bands Width (BBands Width)
          </Menu.Item>
          <Menu.Item key="cci" onClick={() => this.handleChange1("cci")}>
            Commodity Channel Index (CCI){" "}
          </Menu.Item>
          <Menu.Item key="ema" onClick={() => this.handleChange1("ema")}>
            Exponential moving average (EMA){" "}
          </Menu.Item>
          <Menu.Item
            key="momentum"
            onClick={() => this.handleChange1("momentum")}
          >
            Momentum{" "}
          </Menu.Item>
          <Menu.Item key="macd" onClick={() => this.handleChange1("macd")}>
            Moving Average Convergence/Divergence (MACD){" "}
          </Menu.Item>
          <Menu.Item key="mma" onClick={() => this.handleChange1("mma")}>
            Modified Moving Average (MMA){" "}
          </Menu.Item>
          <Menu.Item key="obo" onClick={() => this.handleChange1("obo")}>
            OBO
          </Menu.Item>
          <Menu.Item key="obv" onClick={() => this.handleChange1("obv")}>
            On Balance Volume (OBV){" "}
          </Menu.Item>
          <Menu.Item key="psar" onClick={() => this.handleChange1("psar")}>
            Parabolic SAR (PSAR){" "}
          </Menu.Item>
          <Menu.Item key="poiv" onClick={() => this.handleChange1("poiv")}>
            POIV
          </Menu.Item>
          <Menu.Item key="rsi" onClick={() => this.handleChange1("rsi")}>
            Relative Strength Index (RSI){" "}
          </Menu.Item>

          <Menu.Item key="sDev" onClick={() => this.handleChange1("sDev")}>
            Standard Deviation{" "}
          </Menu.Item>
          <Menu.Item
            key="williamsR"
            onClick={() => this.handleChange1("williamsR")}
          >
            Williams %R{" "}
          </Menu.Item>
          <Menu.Item
            key="correll"
            onClick={() => this.correllindicator(true, 5)}
          >
            <span>Correll</span>
          </Menu.Item>
          <Menu.Item
            key="videoIcon"
            align="right"
            onClick={() => this.openModal("ti")}
          >
            <img
              alt=""
              src={require("assets/images/dark_icon/QuestionIco.png")}
              className="video"
            />
          </Menu.Item>
        </Menu>
      );
    }
    var menu5 = (
      <Menu onClick={this.handleMenuClick} className="blank_menu_cot">
        <div>Please select ticker</div>
      </Menu>
    );
    if (this.props.tickerData[0]) {
      menu5 = (
        <Menu onClick={this.handleMenuClick} triggerSubMenuAction="click">
          {/* <Menu.Item key="pf1" onClick={()=> `${this.props.priceforecast1.status && this.props.priceforecast1.type==1?this.priceforecast(false,1):this.priceforecast(true,1)}`} >{this.props.priceforecast1.status && this.props.priceforecast1.type==1?<span style={{color:'#000',fontWeight:600}}>Price Forecast 1</span>:<span>Price Forecast 1</span>}</Menu.Item>
        <Menu.Item key="pf2" onClick={()=> `${this.props.priceforecast1.status && this.props.priceforecast1.type==6?this.priceforecast(false,6):this.priceforecast(true,6)}`} >{this.props.priceforecast1.status && this.props.priceforecast1.type==6?<span style={{color:'#000',fontWeight:600}}>Price Forecast 2</span>:<span>Price Forecast 2</span>}</Menu.Item> */}

          {/* <Menu.Item key="snr1" onClick={()=> `${this.props.priceforecast1.status && this.props.priceforecast1.type==2?this.priceforecast(false,2):this.priceforecast(true,2)}`} >{this.props.priceforecast1.status && this.props.priceforecast1.type==2?<span style={{color:'#000',fontWeight:600}}>S&R ML</span>:<span>S&R ML</span>}</Menu.Item> */}
          <Menu.Item
            key="snr1"
            onClick={() =>
              `${
                this.props.priceforecast1.status &&
                this.props.priceforecast1.type == 2
                  ? this.priceforecast(false, 2)
                  : this.snrindicator(true, "snr1", 2)
              }`
            }
          >
            {this.props.priceforecast1.status &&
            this.props.priceforecast1.type == 2 ? (
              <span style={{ color: "#000", fontWeight: 600 }}>S&R ML</span>
            ) : (
              <span>S&R ML</span>
            )}
          </Menu.Item>
          {/* <Menu.Item key="snr2" onClick={()=> `${this.props.priceforecast1.status && this.props.priceforecast1.type==3?this.priceforecast(false,3):this.priceforecast(true,3)}`} >{this.props.priceforecast1.status && this.props.priceforecast1.type==3?<span style={{color:'#000',fontWeight:600}}>S&R Vector Quantization</span>:<span>S&R Vector Quantization</span>}</Menu.Item> */}
          {/* <Menu.Item key="snr2" onClick={()=> this.snrindicator(true,'snr2',3)}><span>S&R Vector Quantization</span></Menu.Item> */}
          <Menu.Item
            key="snr2"
            onClick={() =>
              `${
                this.props.priceforecast1.status &&
                this.props.priceforecast1.type == 3
                  ? this.priceforecast(false, 3)
                  : this.snrindicator(true, "snr2", 3)
              }`
            }
          >
            {this.props.priceforecast1.status &&
            this.props.priceforecast1.type == 3 ? (
              <span style={{ color: "#000", fontWeight: 600 }}>
                S&R Vector Quantization
              </span>
            ) : (
              <span>S&R Vector Quantization</span>
            )}
          </Menu.Item>
          {/* <Menu.Item key="trend1" onClick={()=> `${this.props.priceforecast1.status && this.props.priceforecast1.type==4?this.priceforecast(false,4):this.priceforecast(true,4)}`} >{this.props.priceforecast1.status && this.props.priceforecast1.type==4?<span style={{color:'#000',fontWeight:600}}>S&R AI</span>:<span>S&R AI</span>}</Menu.Item> */}
          {/* <Menu.Item key="snr3" onClick={()=> this.snrindicator(true,'snr3',4)}><span>S&R AI</span></Menu.Item> */}
          <Menu.Item
            key="snr3"
            onClick={() =>
              `${
                this.props.priceforecast1.status &&
                this.props.priceforecast1.type == 4
                  ? this.priceforecast(false, 4)
                  : this.snrindicator(true, "snr3", 4)
              }`
            }
          >
            {this.props.priceforecast1.status &&
            this.props.priceforecast1.type == 4 ? (
              <span style={{ color: "#000", fontWeight: 600 }}>S&R AI</span>
            ) : (
              <span>S&R AI</span>
            )}
          </Menu.Item>
          {/* <Menu.Item key="trend2" onClick={()=> `${this.props.priceforecast1.status && this.props.priceforecast1.type==5?this.priceforecast(false,5):this.priceforecast(true,5)}`} >{this.props.priceforecast1.status && this.props.priceforecast1.type==5?<span style={{color:'#000',fontWeight:600}}>S&R AI Extension</span>:<span>S&R AI Extension</span>}</Menu.Item> */}
          {/* <Menu.Item key="snr3E" onClick={()=> this.snrindicator(true,'snr3',5)}><span>S&R AI Extension</span></Menu.Item> */}
          <Menu.Item
            key="snr3E"
            onClick={() =>
              `${
                this.props.priceforecast1.status &&
                this.props.priceforecast1.type == 5
                  ? this.priceforecast(false, 5)
                  : this.snrindicator(true, "snr3", 5)
              }`
            }
          >
            {this.props.priceforecast1.status &&
            this.props.priceforecast1.type == 5 ? (
              <span style={{ color: "#000", fontWeight: 600 }}>
                S&R AI Extension
              </span>
            ) : (
              <span>S&R AI Extension</span>
            )}
          </Menu.Item>
          {/* <Menu.Item key="cf1" onClick={()=> `${this.props.cotforecast1.status && this.props.cotforecast1.type==1?this.cotforecast(false,1):this.cotforecast(true,1)}`} >{this.props.cotforecast1.status && this.props.cotforecast1.type==1?<span style={{color:'#000',fontWeight:600}}>Cot Forecast 1</span>:<span>Cot Forecast 1</span>}</Menu.Item>
        <Menu.Item key="cf2" onClick={()=> `${this.props.cotforecast1.status && this.props.cotforecast1.type==2?this.cotforecast(false,2):this.cotforecast(true,2)}`} >{this.props.cotforecast1.status && this.props.cotforecast1.type==2?<span style={{color:'#000',fontWeight:600}}>Cot Forecast 2</span>:<span>Cot Forecast 2</span>}</Menu.Item> */}
          {/* <Menu.Item key="trendAI" onClick={()=> this.trendAI(true,'TrendAI')}><span>MRK Phase</span></Menu.Item> */}
          <Menu.Item key="lra" onClick={() => this.trendindicator(true, "LRA")}>
            <span>LRA</span>
          </Menu.Item>
          <Menu.Item key="lmr" onClick={() => this.trendindicator(true, "LMR")}>
            <span>LMR</span>
          </Menu.Item>
          <Menu.Item
            key="nclra"
            onClick={() => this.trendnclraindicator(true, "NCLRA")}
          >
            <span>NCLRA</span>
          </Menu.Item>
          <Menu.Item key="sea" onClick={() => this.tsrmvisible(true, 1)}>
            <span>Cycle</span>
          </Menu.Item>
          <Menu.Item key="res" onClick={() => this.tsrmvisible(true, 2)}>
            <span>Cycle & Residual</span>
          </Menu.Item>
          {window.location.pathname == "/experiments" ? (
            <Menu.Item
              key="equity"
              onClick={() => this.trendindicator(true, "Equity")}
            >
              <span>Equity</span>
            </Menu.Item>
          ) : null}
          {/* <Menu.Item key="swm" onClick={()=> this.tsrmvisible(true,3)}><span>SWM</span></Menu.Item> */}
          {/* <Menu.Item key="trendML" onClick={()=> this.trendmlvisible(true,1)}><span>Trend ML</span></Menu.Item> */}
          <Menu.Item
            key="trendML"
            onClick={() =>
              `${
                this.props.trendmlvisible1.status &&
                this.props.trendmlvisible1.type == 1
                  ? this.trendmlvisible(false, 1)
                  : this.trendmlvisible(true, 1)
              }`
            }
          >
            {this.props.trendmlvisible1.status &&
            this.props.trendmlvisible1.type == 1 ? (
              <span style={{ color: "#000", fontWeight: 600 }}>AI Trend</span>
            ) : (
              <span>AI Trend</span>
            )}
          </Menu.Item>
          <Menu.Item
            key="swm"
            onClick={() =>
              `${
                this.props.trendmlvisible1.status &&
                this.props.trendmlvisible1.type == 2
                  ? this.trendmlvisible(false, 2)
                  : this.trendmlvisible(true, 2)
              }`
            }
          >
            {this.props.trendmlvisible1.status &&
            this.props.trendmlvisible1.type == 2 ? (
              <span style={{ color: "#000", fontWeight: 600 }}>Trend ML</span>
            ) : (
              <span>Trend ML</span>
            )}
          </Menu.Item>
          <Menu.Item
            key="videoIcon"
            align="right"
            onClick={() => this.openModal("AIML")}
          >
            <img
              alt=""
              src={require("assets/images/dark_icon/QuestionIco.png")}
              className="video"
            />
          </Menu.Item>
        </Menu>
      );
    }
    var menuNews = (
      <Menu onClick={this.handleMenuClick} className="blank_menu_cot">
        <div>Please select ticker</div>
      </Menu>
    );
    if (this.props.tickerData[0]) {
      menuNews = (
        <Menu onClick={this.handleMenuClick} triggerSubMenuAction="click">
          <Menu.Item key="news1" onClick={() => this.newsindicator(true, 1)}>
            <span>Stories over time</span>
          </Menu.Item>
          <Menu.Item key="news2" onClick={() => this.newsindicator(true, 2)}>
            <span>Sentiment over time</span>
          </Menu.Item>
          <Menu.Item key="news3" onClick={() => this.newsindicator(true, 3)}>
            <span>Sentiment Average</span>
          </Menu.Item>
          <Menu.Item key="news3" onClick={() => this.newsindicator(true, 5)}>
            <span>Sentiment Index</span>
          </Menu.Item>
          <Menu.Item
            key="videoIcon"
            align="right"
            onClick={() => this.openModal("news")}
          >
            <img
              alt=""
              src={require("assets/images/dark_icon/QuestionIco.png")}
              className="video"
            />
          </Menu.Item>
          {/* <Menu.Item key="news4" onClick={()=> this.newsindicator(true,4)}><span>Fear Factor</span></Menu.Item> */}
        </Menu>
      );
    }
    var grparray = [];
    if (this.props.cot_menulist.length > 0) {
      Object.keys(this.props.cot_menulist[0]).map((familyIndex) => {
        grparray.push(familyIndex);
      });
    }
    // console.log('asplcot',grparray);
    // console.log('asplcot',this.props.cotdacm);
    if (this.props.cotdacm.cot.length > 0) {
      if (this.props.cot_menulist.length > 0) {
        Object.keys(this.props.cot_menulist[0]).map((familyIndex) => {
          // grparray.push(familyIndex);
          Object.keys(this.props.cot_menulist[0][familyIndex]).map(
            (plotIndex) => {
              if (plotIndex == "Single Plot") {
                Object.keys(
                  this.props.cot_menulist[0][familyIndex][plotIndex]
                ).map((descIndex) => {
                  Object.keys(
                    this.props.cot_menulist[0][familyIndex][plotIndex][
                      descIndex
                    ]
                  ).map((groupIndex) => {
                    var temp = this.props.cotdacm.cot;
                    var temp_menu = this.props.cot_menulist[0][familyIndex][
                      plotIndex
                    ][descIndex][groupIndex];
                    var test = temp.filter(function(temp) {
                      return temp.selectedGRAPH == temp_menu["_id"].$oid;
                    });
                    test.map((item, key) => {
                      // console.log('aspld',test);
                      this.getGraphData(
                        temp_menu["_id"].$oid,
                        item["ticker_id"],
                        temp_menu["type"],
                        item["week"],
                        item["week1"],
                        item["group"],
                        item["uniquename"],
                        item["color"] ? item["color"] : ""
                      );
                    });
                  });
                });
              } else {
                Object.keys(
                  this.props.cot_menulist[0][familyIndex][plotIndex]
                ).map((descIndex) => {
                  // console.log('asplcot',this.props.cotdacm.cot);
                  var temp = this.props.cotdacm.cot;
                  var temp_menu = this.props.cot_menulist[0][familyIndex][
                    plotIndex
                  ][descIndex];
                  var test = temp.filter(function(temp) {
                    return temp.selectedGRAPH == temp_menu["_id"].$oid;
                  });
                  test.map((item, key) => {
                    // console.log('aspld',test);
                    this.getGraphData(
                      temp_menu["_id"].$oid,
                      item["ticker_id"],
                      temp_menu["type"],
                      item["week"],
                      item["week1"],
                      item["group"],
                      item["uniquename"]
                    );
                  });
                });
              }
              // if(this.props.cotdacm.cot.includes(this.props.cot_menulist[0][familyIndex][descIndex]['_id'].$oid))
              // {
              //   // console.log('asplcount');
              // this.getGraphData(this.props.cot_menulist[0][familyIndex][descIndex]['_id'].$oid,ticker_id,this.props.cot_menulist[0][familyIndex][descIndex]['type'],10)
              // }
              // });
            }
          );
        });
        setTimeout(() => {
          this.props.cotdacm.cot = [];
        }, 500);
      }
    }
    // console.log('asplcotdacm',this.props.cotdacm.ecin);
    // console.log('asplcotecin',this.props.ecin_menulist);
    // console.log('asplcotecin',this.props.selectedEcin);
    if (this.props.cotdacm.ecin.length > 0) {
      if (this.props.ecin_menulist.length > 0) {
        // var count = 1;
        Object.keys(this.props.ecin_menulist[0]).map((ecinIndex) => {
          Object.keys(this.props.ecin_menulist[0][ecinIndex]["ecin"]).map(
            (ecincountryIndex) => {
              if (
                this.props.cotdacm.ecin.includes(
                  this.props.ecin_menulist[0][ecinIndex]["ecin"][
                    ecincountryIndex
                  ]["_id"].$oid
                )
              ) {
                this.getEcindata(
                  this.props.ecin_menulist[0][ecinIndex]["ecin"][
                    ecincountryIndex
                  ]["_id"].$oid
                );
                // count++;
              }
            }
          );
        });
        setTimeout(() => {
          this.props.cotdacm.ecin = [];
        }, 500);
      }
    }
    // else
    // {
    //   if(this.props.ecin_menulist.length>0 && this.props.selectedEcin.length==0){
    //     // var count = 1;
    //     Object.keys(this.props.ecin_menulist[0]).map((ecinIndex)=>{
    //       Object.keys(this.props.ecin_menulist[0][ecinIndex]['ecin']).map((ecincountryIndex)=>{
    //       if(tickerecinArray.includes(this.props.ecin_menulist[0][ecinIndex]['ecin'][ecincountryIndex]['ecIn_code']))
    //       {
    //         this.getEcindata(this.props.ecin_menulist[0][ecinIndex]['ecin'][ecincountryIndex]['_id'].$oid)
    //       // count++;
    //       }
    //     });
    //     })
    //   }
    // }
    // console.log('asplaaa',this.props.cotdacm.ai);
    if (this.props.cotdacm.ai.length > 0) {
      this.props.cotdacm.ai.forEach((element, key) => {
        // console.log('asplkey',key);
        // console.log('asplelement',element);
        this.props.gettrend(element);
      });
      this.props.cotdacm.ai = [];
      // setTimeout(() =>{ this.props.cotdacm.ai =[]; }, 10);
    }

    if (this.props.response_status) {
      if (this.props.response_array.status) {
        message.success(this.props.response_array.message);
        this.props.responsestatus(false);
      } else {
        message.error(this.props.response_array.message);
        this.props.responsestatus(false);
      }
    }
    var multitab = localStorage.getItem("multitab");
    var page_title = "";
    if (window.location.pathname == "/main") {
      page_title = "Opportunity Dashboard";
    } else if (window.location.pathname == "/charting") {
      page_title = "Charting";
    } else if (window.location.pathname == "/news") {
      page_title = "News";
    } else if (window.location.pathname == "/report") {
      page_title = "Report";
    } else if (window.location.pathname == "/experiments") {
      page_title = "Experiment";
    } else if (window.location.pathname == "/seasonality") {
      page_title = "Seasonality";
    } else if (window.location.pathname == "/settings") {
      page_title = "Settings";
    } else {
      page_title = "Setup Explorer";
    }
    // console.log('asplstatedate',moment(this.state.snrStartDate));
    // console.log('asplstatedate',moment(this.state.snrEndDate));
    // console.log('asplsdate',moment(sdate));
    // console.log('asplsdate',moment(edate));
    return (
      <Auxiliary>
        {/*video modal*/}
        {this.props.videoLinks.length > 0 ? (
          <ModalVideo
            channel="custom"
            isOpen={this.state.isOpen}
            url={this.state.videoURL}
            onClose={() => this.setState({ isOpen: false })}
          />
        ) : null}
        <Header
          className={` ${
            window.location.pathname == "/cotaccountancy" && multitab == "true"
              ? "ca_header"
              : null
          }`}
        >
          {navStyle === NAV_STYLE_DRAWER ||
          ((navStyle === NAV_STYLE_FIXED ||
            navStyle === NAV_STYLE_MINI_SIDEBAR) &&
            width < TAB_SIZE) ? (
            <div className="gx-linebar gx-mr-3">
              <i
                className="gx-icon-btn icon icon-menu"
                onClick={() => {
                  this.props.toggleCollapsedSideNav(!navCollapsed);
                }}
              />
            </div>
          ) : null}
          {/* <Link to="/" className="gx-d-block gx-d-lg-none gx-pointer">
            <img alt="" src={require("assets/images/w-logo.png")}/></Link> */}

          {this.state.progress ? (
            <Progress type="circle" percent={this.state.percent} />
          ) : (
            ""
          )}
          {window.location.pathname == "/cotaccountancy" ? (
            <div className="cst_head_layout home_head">
              <ul className="gx-header-notifications gx-ml-auto custm_header">
                <li className="gx-notify gx-notify-search">
                  <div className="gx-d-flex cust_ticker_search">
                    <AutoComplete
                      dataSource={this.props.seachList}
                      onSelect={this.onSelect}
                      onSearch={this.handleSearch}
                      style={{ width: 75 }}
                      className="topbarsearch"
                      placeholder="Search"
                      maxLength={3}
                    />
                  </div>
                </li>
                {/* <li className="topbarmenu">
                  <span
                    className="gx-pointer gx-d-block"
                    onClick={this.showModal}
                  >
                    Exchange
                  </span>
                  <Modal
                    className="exchange_modal"
                    footer={null}
                    visible={this.props.exchangeModal}
                    onCancel={this.handleCancel}
                  >
                    <Exchange />
                  </Modal>
                </li> */}

                <li className="topbarmenu">
                  <span
                    className="gx-pointer gx-d-block sector_video"
                    onClick={this.showSectorModal}
                  >
                    Sector
                  </span>
                </li>
                <li className="sector_video">
                  <span className="sector_video">
                    <img
                      alt=""
                      src={require("assets/images/dark_icon/QuestionIco.png")}
                      className="video sidebar_icon sector_video"
                      onClick={() => this.openModal("sector")}
                    />
                  </span>
                  <Modal
                    className="exchange_modal"
                    footer={null}
                    visible={this.props.sectorModal}
                    onCancel={this.handleSectorCancel}
                  >
                    <Sector />
                  </Modal>
                </li>
              </ul>
              {/* <div align ="right" className="cot_page_title"> <strong>Cot Accountancy</strong></div> */}
              <div align="right" className="page_title cust-hass-font">
                <strong>Cot Accountancy</strong>
              </div>

              <ul className="gx-header-notifications gx-ml-auto custm_header">
                <li>
                  <select
                    className="form-control"
                    id="cotfamily"
                    onClick={() => this.cotchange()}
                    style={{ marginLeft: "15px" }}
                  >
                    <option value="" selected disabled>
                      Select COT
                    </option>
                    {grparray.includes("LEGACY") ? (
                      <option value="legacy_future_only">
                        Legacy Future Only
                      </option>
                    ) : (
                      ""
                    )}
                    {grparray.includes("LEGACY") ? (
                      <option value="legacy_future_and_option">
                        Legacy COMBINED
                      </option>
                    ) : (
                      ""
                    )}
                    {grparray.includes("TFF") ? (
                      <option value="tff_future_only">TFF Future Only</option>
                    ) : (
                      ""
                    )}
                    {grparray.includes("TFF") ? (
                      <option value="tff_future_and_option">
                        TFF COMBINED
                      </option>
                    ) : (
                      ""
                    )}
                    {grparray.includes("DISAGGREGATED") ? (
                      <option value="disaggregated_future_only_new">
                        Disaggregated Future Only
                      </option>
                    ) : (
                      ""
                    )}
                    {grparray.includes("DISAGGREGATED") ? (
                      <option value="disaggregated_future_and_option">
                        Disaggregated COMBINED
                      </option>
                    ) : (
                      ""
                    )}
                  </select>
                </li>
                <li>
                  <DatePicker
                    className="gx-mb-3 gx-w-100"
                    onChange={this.startdate}
                    defaultValue={moment(startdate1, "YYYY-MM-DD")}
                    format="YYYY-MM-DD"
                    placeholder="Select Start date"
                  />
                </li>
                <li>
                  <DatePicker
                    className="gx-mb-3 gx-w-100"
                    onChange={this.enddate}
                    defaultValue={moment(enddate1, "YYYY-MM-DD")}
                    format="YYYY-MM-DD"
                    placeholder="Select End date"
                  />
                </li>
                <li>
                  {/* {this.state.cotfamily != "" ? ( */}
                  <Button name="submit" onClick={() => this.handleSubmit()}>
                    Submit
                  </Button>
                  {/* ) : (
                    <Button
                      name="submit"
                      onClick={() => this.handleSubmit()}
                      disabled
                    >
                      Submit
                    </Button>
                  )} */}
                </li>
              </ul>
            </div>
          ) : window.location.pathname == "/news" ? (
            <div className="cst_head_layout">
              <ul className="gx-header-notifications gx-ml-auto custm_header">
                <li className="gx-notify gx-notify-search">
                  <div className="gx-d-flex cust_ticker_search">
                    <AutoComplete
                      dataSource={this.props.seachList}
                      onSelect={this.onSelectNews}
                      onSearch={this.handleSearch}
                      style={{ width: 75 }}
                      className="topbarsearch"
                      placeholder="Search"
                      maxLength={3}
                    />
                  </div>
                </li>

                {/* <li className="topbarmenu">
                  <span
                    className="gx-pointer gx-d-block"
                    onClick={this.showModal}
                  >
                    Exchange
                  </span>
                  <Modal
                    className="exchange_modal"
                    footer={null}
                    visible={this.props.exchangeModal}
                    onCancel={this.handleCancel}
                  >
                    <Exchange />
                  </Modal>
                </li> */}

                <li className="topbarmenu">
                  <span
                    className="gx-pointer gx-d-block"
                    onClick={this.showSectorModal}
                  >
                    Sector
                  </span>
                </li>
                <li className="sector_video">
                  <span className="sector_video">
                    <img
                      alt=""
                      src={require("assets/images/dark_icon/QuestionIco.png")}
                      className="video sidebar_icon sector_video"
                      onClick={() => this.openModal("sector")}
                    />
                  </span>
                  <Modal
                    className="exchange_modal"
                    footer={null}
                    visible={this.props.sectorModal}
                    onCancel={this.handleSectorCancel}
                  >
                    <Sector />
                  </Modal>
                </li>
              </ul>
              <div className="page_title news cust-hass-font">
                <strong>{page_title}</strong>
              </div>

              {width >= TAB_SIZE ? null : (
                <Auxiliary>
                  <li className="gx-user-nav">
                    <UserInfo />
                  </li>
                </Auxiliary>
              )}
            </div>
          ) : (
            <div className="cst_head_layout">
              <ul className="gx-header-notifications gx-ml-auto custm_header">
                {window.location.pathname == "/report" ||
                window.location.pathname == "/main" ||
                window.location.pathname == "/settings" ? null : (
                  <li className="gx-notify gx-notify-search">
                    <div className="gx-d-flex cust_ticker_search">
                      <AutoComplete
                        value={this.state.Exchange1}
                        dataSource={this.props.seachList}
                        onSelect={this.onSelect}
                        onSearch={this.handleSearch}
                        style={{ width: 75 }}
                        className="topbarsearch"
                        placeholder="Search"
                        maxLength={3}
                      />
                    </div>
                  </li>
                )}

                {/* {window.location.pathname == "/report" ||
                window.location.pathname == "/main" ||
                window.location.pathname == "/settings" ? null : (
                  <li className="topbarmenu">
                    <span
                      className="gx-pointer gx-d-block"
                      onClick={this.showModal}
                    >
                      Exchange
                    </span>
                    <Modal
                      className="exchange_modal"
                      footer={null}
                      visible={this.props.exchangeModal}
                      onCancel={this.handleCancel}
                    >
                      <Exchange />
                    </Modal>
                  </li>
                )} */}

                {window.location.pathname == "/report" ||
                window.location.pathname == "/main" ||
                window.location.pathname == "/settings" ? null : (
                  <>
                    <li className="topbarmenu">
                      <span
                        className="gx-pointer gx-d-block sector_video"
                        onClick={this.showSectorModal}
                      >
                        Sector
                      </span>
                    </li>
                    <li className="sector_video">
                      <span className="sector_video">
                        <img
                          alt=""
                          src={require("assets/images/dark_icon/QuestionIco.png")}
                          className="video sidebar_icon sector_video"
                          onClick={() => this.openModal("sector")}
                        />
                      </span>
                      <Modal
                        className="exchange_modal"
                        footer={null}
                        visible={this.props.sectorModal}
                        onCancel={this.handleSectorCancel}
                      >
                        <Sector />
                      </Modal>
                    </li>
                  </>
                )}
                {window.location.pathname == "/main" ||
                window.location.pathname == "/seasonality" ||
                window.location.pathname == "/settings" ? null : window.location
                    .pathname == "/report" ? null : (
                  <li
                    className="rightside_menu"
                    style={{ marginRight: "15px", fontSize: "15px" }}
                  >
                    <Dropdown overlay={menu4} trigger="click">
                      <span className="gx-link ant-dropdown-link">
                        Technical Indicators <Icon type="down" />
                      </span>
                    </Dropdown>
                    {/* <img alt="" src={require("assets/images/dark_icon/QuestionIco.png")} className="video" onClick={() => this.openModal("ti")}/> */}
                  </li>
                )}
                {window.location.pathname == "/main" ||
                window.location.pathname == "/seasonality" ||
                window.location.pathname == "/settings" ? null : window.location
                    .pathname == "/report" ? null : (
                  <li style={{ marginRight: "15px", fontSize: "15px" }}>
                    <Dropdown overlay={menu3} trigger="click">
                      <span className="gx-link ant-dropdown-link">
                        Cot <Icon type="down" />
                      </span>
                    </Dropdown>
                    {/* <img alt="" src={require("assets/images/dark_icon/QuestionIco.png")} className="video" onClick={() => this.openModal("ci")}/> */}
                  </li>
                )}
                {window.location.pathname == "/main" ||
                window.location.pathname == "/seasonality" ||
                window.location.pathname == "/settings" ? null : window.location
                    .pathname == "/report" ? null : (
                  <li style={{ marginRight: "15px", fontSize: "15px" }}>
                    <Dropdown overlay={menu1} trigger="click">
                      <span className="gx-link ant-dropdown-link">
                        Economic Indicators <Icon type="down" />
                      </span>
                    </Dropdown>
                    {/* <img alt="" src={require("assets/images/dark_icon/QuestionIco.png")} className="video" onClick={() => this.openModal("ecin")}/> */}
                  </li>
                )}
                {window.location.pathname == "/main" ||
                window.location.pathname == "/seasonality" ||
                window.location.pathname == "/settings" ? null : window.location
                    .pathname == "/report" ? null : (
                  <li
                    className="rightside_menu"
                    style={{ marginRight: "15px", fontSize: "15px" }}
                  >
                    <Dropdown overlay={menu5} trigger="click">
                      <span className="gx-link ant-dropdown-link">
                        AI & ML <Icon type="down" />
                      </span>
                    </Dropdown>
                    {/* <img alt="" src={require("assets/images/dark_icon/QuestionIco.png")} className="video" onClick={() => this.openModal("AIML")}/> */}
                  </li>
                )}
                {window.location.pathname == "/main" ||
                window.location.pathname == "/seasonality" ||
                window.location.pathname == "/settings" ? null : window.location
                    .pathname == "/report" ? null : (
                  <li
                    className="rightside_menu"
                    style={{ marginRight: "15px", fontSize: "15px" }}
                  >
                    <Dropdown overlay={menuNews} trigger="click">
                      <span className="gx-link ant-dropdown-link">
                        News <Icon type="down" />
                      </span>
                    </Dropdown>
                    {/* <img alt="" src={require("assets/images/dark_icon/QuestionIco.png")} className="video" onClick={() => this.openModal("news")}/> */}
                  </li>
                )}
              </ul>
              <div align="center" className="page_title cust-hass-font">
                <strong>{page_title}</strong>
              </div>
              <ul className="gx-header-notifications gx-ml-auto custm_header">
                {/* <li className="rightside_menu" style={{'marginRight': '15px','fontSize': '15px'}}>
              {/* {this.props.tickerData[0]?
                <Select
                  mode="multiple"
                  className="gx-mr-3 gx-mb-3" 
                  style={{width: '250px',height:"35px"}}
                  placeholder="Technical Indicator"
                  onChange={this.handleChange1}
                >
                  <Option value="bbands" >Bollinger Bands (BBands)</Option>
                  <Option  value="cci" >Commodity Channel Index (CCI)</Option>
                </Select>:null} */}
                {/* <Dropdown overlay={menu4} trigger="click">
                  <span className="gx-link ant-dropdown-link">
                    Technical Indicators <Icon type="down"/>
                  </span>
                </Dropdown>
                </li>            
              <li  style={{'marginRight': '15px','fontSize': '15px'}}>
                <Dropdown overlay={menu3} trigger="click">
                  <span className="gx-link ant-dropdown-link">
                    Cot <Icon type="down"/>
                  </span>
                </Dropdown>
                </li>
                {window.location.pathname=='/charting'?null:<li style={{'marginRight': '15px','fontSize': '15px'}}>
                <Dropdown overlay={menu1} trigger="click">
                  <span className="gx-link ant-dropdown-link">
                    Economic Indicators <Icon type="down"/>
                  </span>
                </Dropdown>
              </li>}  */}

                {window.location.pathname == "/main" ||
                window.location.pathname == "/report" ||
                window.location.pathname == "/seasonality" ||
                window.location.pathname == "/settings" ||
                window.location.pathname == "/news" ? null : (
                  <li style={{ marginRight: "15px", fontSize: "15px" }}>
                    {(window.location.pathname == "/dashboard" ||
                      window.location.pathname == "/charting") &&
                    this.props.tickerData[0] ? (
                      this.props.savestatus1 ? (
                        <Button
                          className="greybutton"
                          onClick={() => this.calldacm()}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button type="primary" onClick={() => this.calldacm()}>
                          Save
                        </Button>
                      )
                    ) : (
                      <Button
                        className="greybutton"
                        onClick={() => this.calldacm()}
                        disabled
                      >
                        Save
                      </Button>
                    )}
                  </li>
                )}
                <li className="gx-user-nav">
                  <UserInfo />
                  <img
                    alt=""
                    src={require("assets/images/dark_icon/QuestionIco.png")}
                    className="video user_video"
                    onClick={() => this.openModal("save")}
                  />
                </li>

                <li className="gx-notify gx-notify-search gx-d-inline-block gx-d-lg-none">
                  <Popover
                    overlayClassName="gx-popover-horizantal"
                    placement="bottomRight"
                    content={
                      <SearchBox
                        styleName="gx-popover-search-bar"
                        placeholder="Search in app..."
                        onChange={this.updateSearchChatUser.bind(this)}
                        value={this.state.searchText}
                      />
                    }
                    trigger="click"
                  >
                    <span className="gx-pointer gx-d-block">
                      <i className="icon icon-search-new" />
                    </span>
                  </Popover>
                </li>
                {width >= TAB_SIZE ? null : (
                  <Auxiliary>
                    <li className="gx-notify">
                      <Popover
                        overlayClassName="gx-popover-horizantal"
                        placement="bottomRight"
                        content={<AppNotification />}
                        trigger="click"
                      >
                        <span className="gx-pointer gx-d-block">
                          <i className="icon icon-notification" />
                        </span>
                      </Popover>
                    </li>

                    <li className="gx-msg">
                      <Popover
                        overlayClassName="gx-popover-horizantal"
                        placement="bottomRight"
                        content={<MailNotification />}
                        trigger="click"
                      >
                        <span className="gx-pointer gx-status-pos gx-d-block">
                          <i className="icon icon-chat-new" />
                          <span className="gx-status gx-status-rtl gx-small gx-orange" />
                        </span>
                      </Popover>
                    </li>
                  </Auxiliary>
                )}
                {/* <li className="gx-language">
              <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={this.languageMenu()}
                       trigger="click">
                <span className="gx-pointer gx-flex-row gx-align-items-center">
                  <i className={`flag flag-24 flag-${locale.icon}`}/>
                  <span className="gx-pl-2 gx-language-name">{locale.name}</span>
                  <i className="icon icon-chevron-down gx-pl-2"/>
                </span>
              </Popover>
            </li> */}
                {width >= TAB_SIZE ? null : (
                  <Auxiliary>
                    <li className="gx-user-nav">
                      <UserInfo />
                    </li>
                  </Auxiliary>
                )}
              </ul>
            </div>
          )}
        </Header>
        <Modal
          className="technical_modal"
          visible={this.state.showtechnicalindcatorpopup}
          onCancel={this.handleCanceltechnical}
          onOk={this.addsapratetechnical}
          footer={[
            <Button onClick={this.handleCanceltechnical}>Cancel</Button>,
            <Button onClick={this.addsapratetechnical}>OK</Button>,
          ]}
        >
          {this.state.showpopupcontent}
        </Modal>
        <Modal
          className="technical_modal"
          visible={this.state.showcotindicatorpopup}
          onCancel={this.handleCanceltechnical}
          onOk={this.addcotchart}
        >
          {/* {this.state.showcotpopupcontent} */}
          <div>
            <form id="cot_indicator_form">
              <Row>
                <Col lg={24}>
                  <lable>Weeks</lable>
                  <input
                    className="ti_modal_fields"
                    type="number"
                    name="cotweek"
                    value={this.state.cotweek}
                    onChange={this.handleChange}
                  />
                </Col>
              </Row>
            </form>
          </div>
        </Modal>
        <Modal
          title={this.state.snrName}
          className="technical_modal"
          visible={this.state.showsnrindicatorpopup}
          onCancel={this.handleCancelSnR}
          onOk={this.addsnrindicator}
          closeOnDimmerClick={false}
        >
          <div>
            <Row>
              <Col lg={24}>
                {/* <Col lg={24}> */}
                <h3>Time Frame</h3>
                <lable>Time Frame</lable>
                <select
                  className="ti_modal_fields"
                  name="snrTimeFrame"
                  value={this.state.snrTimeFrame}
                  onChange={this.handleSNRTimeFrame}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
                {/* </Col> */}
                <hr />
                <h3>Range Selection</h3>
                {this.state.snrTimeFrame === "daily" ? (
                  <Radio.Group
                    onChange={this.onSnRRadioChange}
                    value={this.state.snrRadio}
                  >
                    <Radio value={1}>3 Months</Radio>
                    <Radio value={2}>6 Months</Radio>
                    <Radio value={3}>1 Year</Radio>
                    <Radio value={4}>YTD</Radio>
                    <Radio value={5}>2 Years</Radio>
                    <Radio value={6}>5 Years</Radio>
                  </Radio.Group>
                ) : this.state.snrTimeFrame === "weekly" ? (
                  <Radio.Group
                    onChange={this.onSnRRadioChange}
                    value={this.state.snrRadio}
                  >
                    <Radio value={3}>1 Year</Radio>
                    <Radio value={5}>2 Years</Radio>
                    <Radio value={6}>5 Years</Radio>
                    <Radio value={7}>10 Years</Radio>
                  </Radio.Group>
                ) : this.state.snrTimeFrame === "monthly" ? (
                  <Radio.Group
                    onChange={this.onSnRRadioChange}
                    value={this.state.snrRadio}
                  >
                    <Radio value={6}>5 Years</Radio>
                    <Radio value={7}>10 Years</Radio>
                    <Radio value={8}>20 Years</Radio>
                  </Radio.Group>
                ) : null}
                <hr />
                <h3>Custom Range</h3>
                {/* <DatePicker/> */}
                <Row>
                  {/* <RangePicker  disabledDate={this.disabledDate} defaultValue={[moment(sdate),moment(edate,'DD-MM-YYYY')]} className="snr_rangepciker" onChange={this.onSnrDateChange} /> */}
                  <Col lg={12}>
                    <lable>Start Date</lable>
                    <DatePicker
                      onChange={this.onSnrStartDateChange}
                      disabledDate={this.disabledDate}
                      defaultValue={moment(this.state.snrStartDate)}
                      value={moment(this.state.snrStartDate)}
                      className="snr_rangepciker"
                    />
                  </Col>
                  <Col lg={12}>
                    <lable>End Date</lable>
                    <DatePicker
                      onChange={this.onSnrEndDateChange}
                      disabledDate={this.disabledDate}
                      defaultValue={moment(this.state.snrEndDate)}
                      value={moment(this.state.snrEndDate)}
                      className="snr_rangepciker"
                    />
                  </Col>
                </Row>
                {/* <lable>Time Period</lable>
                <select className="ti_modal_fields" name="trendPeriod" value={this.state.trendPeriod} onChange={this.handleChange} >
                  <option>5</option>
                  <option>14</option>
                  <option>21</option>
                  <option>50</option>
                  <option>100</option>
                  <option>180</option>
                </select> */}
              </Col>
            </Row>
          </div>
        </Modal>
        <Modal
          className="technical_modal"
          visible={this.state.showtrendindicatorpopup}
          onCancel={this.handleCanceltrend}
          onOk={this.addtrendindicator}
        >
          <div>
            <Row>
              <Col lg={24}>
                <lable>Time Period</lable>
                <select
                  className="ti_modal_fields"
                  name="trendPeriod"
                  value={this.state.trendPeriod}
                  onChange={this.handleChange}
                >
                  <option>5</option>
                  <option>14</option>
                  <option>21</option>
                  <option>50</option>
                  <option>100</option>
                  <option>180</option>
                </select>
              </Col>
            </Row>
          </div>
        </Modal>
        <Modal
          className="technical_modal"
          visible={this.state.showmovcotindicatorpopup}
          onCancel={this.handleCanceltechnical}
          onOk={this.addcotchart}
        >
          {/* {this.state.showcotpopupcontent} */}
          <div>
            <form id="cot_indicator_form1">
              <Row>
                <Col lg={12}>
                  <lable>Index Weeks</lable>
                  <input
                    className="ti_modal_fields"
                    type="number"
                    name="cotweek"
                    value={this.state.cotweek}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col lg={12}>
                  <lable>Mov Index Weeks</lable>
                  <input
                    className="ti_modal_fields"
                    type="number"
                    name="cotweek1"
                    value={this.state.cotweek1}
                    onChange={this.handleChange}
                  />
                </Col>
              </Row>
            </form>
          </div>
        </Modal>
        <Modal
          className="technical_modal"
          visible={this.state.gaugeModalVisible}
          onCancel={this.handleCancelgauge}
          onOk={this.addtrendAI}
        >
          <div>
            <Row>
              <Col lg={12}>
                <lable>LRA Period</lable>
                <select
                  className="ti_modal_fields"
                  name="slopePeriod"
                  value={this.props.trendAIPeriod["slope"]}
                  onChange={this.handleChange}
                >
                  {/* <option>5</option> */}
                  <option>14</option>
                  {/* <option>21</option> */}
                  <option>63</option>
                  <option>100</option>
                  <option>180</option>
                  <option>270</option>
                </select>
              </Col>
              <Col lg={12}>
                <lable>Over buy/sell oscillator Period</lable>
                <select
                  className="ti_modal_fields"
                  name="williamPeriod"
                  value={this.props.trendAIPeriod["williom"]}
                  onChange={this.handleChange}
                >
                  <option>5</option>
                  <option>10</option>
                  <option>24</option>
                  {/* <option>50</option>
                        <option>100</option>
                        <option>180</option> */}
                </select>
              </Col>
              <Col lg={12}>
                <lable>NCLRA Period</lable>
                <select
                  className="ti_modal_fields"
                  name="nclraPeriod"
                  value={this.props.trendAIPeriod["slope"]}
                  onChange={this.handleChange}
                >
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>10</option>
                  {/* <option>50</option>
                        <option>100</option>
                        <option>180</option> */}
                </select>
              </Col>
            </Row>
          </div>
        </Modal>
        <Modal
          className="technical_modal"
          visible={this.state.showcorrellindicatorpopup}
          onCancel={() => this.correllindicator(false)}
          onOk={this.addCorrell}
        >
          <div>
            <Row>
              <Col lg={12}>
                <lable>Compare with</lable>
                <select
                  className="ti_modal_fields"
                  name="slopePeriod"
                  value={this.props.correllType}
                  onChange={this.handleCorrellType}
                >
                  <option key="default" value="">
                    Please Select
                  </option>
                  <option key="ticker" value="ticker">
                    Ticker
                  </option>
                  <option key="cot" value="cot">
                    Cot
                  </option>
                  <option key="ecin" value="ecin">
                    Ecin
                  </option>
                  <option key="volume" value="volume">
                    Volume
                  </option>
                </select>
              </Col>
              {this.state.correllType !== "volume" && (
                <Col lg={12}>
                  <lable>Element</lable>
                  {/* {correllValue==''?
                        <select className="ti_modal_fields" name="williamPeriod">
                        </select>: */}
                  {/* {correllValue} */}
                  {/* } */}

                  <select
                    className="ti_modal_fields"
                    name="correllValue"
                    value={this.state.correllValue}
                    onChange={this.handleCorreleValue}
                  >
                    <option key="default" value="">
                      Please Select
                    </option>
                    {correllValueArray.map((item) => {
                      return (
                        <option key={item.key} value={item.key}>
                          {item.display}
                        </option>
                      );
                    })}
                    {/* <option value="option1">option1</option>
                          <option value="option2">option2</option>
                          <option value="option3">option3</option> */}
                  </select>
                </Col>
              )}
              <Col lg={12}>
                <lable>Time Period</lable>
                <Input
                  className="ti_modal_fields"
                  type="number"
                  name="correllPeriod"
                  min="2"
                  max="2000"
                  value={this.state.correllPeriod}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          </div>
        </Modal>
      </Auxiliary>
    );
  }
}

const mapStateToProps = (state) => {
  const { locale, navStyle, navCollapsed, width } = state.settings;
  return {
    locale,
    navStyle,
    navCollapsed,
    width,
    videoLinks: state.Exchange.videoLinks,
    correllData: state.Exchange.correllData,
    snrRequestData: state.Exchange.snrRequestData,
    snrSavedStatus: state.Exchange.snrSavedStatus,
    snrData: state.Exchange.snrData,
    newsindicator1: state.Exchange.newsindicator,
    trendAIPeriod: state.Exchange.trendAIPeriod,
    trendmlvisible1: state.Exchange.trendmlvisible,
    cotforecast1: state.Exchange.cotforecast,
    priceforecast1: state.Exchange.priceforecast,
    sectorModal: state.Exchange.sectorModal,
    exchangeModal: state.Exchange.exchangeModal,
    scrollData: state.Exchange.scrollData,
    savestatus1: state.Exchange.savestatus,
    cotdacm: state.Exchange.cotdacm,
    ecindacm: state.Exchange.ecindacm,
    sapratetechnicalindicator: state.Exchange.sapratetechnicalindicator,
    response_array: state.Exchange.response_array,
    response_status: state.Exchange.response_status,
    seachList: state.Exchange.seachList,
    moveDate: state.Exchange.moveDate,
    selectedEcin: state.Exchange.selectedEcin,
    selectedGRAPH: state.Exchange.selectedGRAPH,
    tickerData: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "tickers_details")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
      }),
    ecin_menulist: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "ecin_details")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
      }),
    cot_menulist: Object.keys(state.Exchange.pricecotData)
      .filter((priceDataIndex) => priceDataIndex == "cot_data")
      .map((priceDataIndex) => {
        return state.Exchange.pricecotData[priceDataIndex];
      }),
    ticker_list: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "ticker_list")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
      }),
    mostViewedTickerData: Object.keys(state.Exchange.mostviewedticker_respo)
      .filter((priceDataIndex) => priceDataIndex == "tickers_details")
      .map((priceDataIndex) => {
        return state.Exchange.mostviewedticker_respo[priceDataIndex];
      }),
  };
};

export default connect(
  mapStateToProps,
  {
    toggleCollapsedSideNav,
    switchLanguage,
    getequity,
    newsindicator,
    trendmlvisible,
    tsrmvisible,
    gettrendAI,
    getPriceCotdata,
    cotforecast,
    sectormodal,
    gettrend,
    priceforecast,
    exchangemodal,
    getnews,
    savestatus,
    responsestatus,
    Seachcode,
    getdacm,
    getPricedata,
    calldacm,
    getaccontdata,
    getCotdata,
    changeScroller,
    techindicator,
    getGraphData,
    getEcindata,
    loaderstatus,
    cotloaderstatus,
    getnotes,
    gettable,
    getEcinUnderPricedata,
    getSnRData,
    getCorrell,
    getVideo,
    getmostviewedticker,
    splitscreen,
    clearData,
    setInitialCots,
  }
)(Topbar);
