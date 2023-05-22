import React, { Component, PureComponent } from "react";
import AnyChart from "anychart-react";
import anychart from "anychart";
import { connect } from "react-redux";
import { CirclePicker } from "react-color";
import {
  tsrmvisible,
  newsindicator,
  clearData,
  getmoveDate,
  trendclearData,
  changeScroller,
  addClicked,
  tableData,
  mekkoData,
  savestatus,
  removedrawing,
  cotclickclear,
  loaderstatus,
  getGraphData,
  techindicator,
  cottechindicator,
} from "appRedux/actions/Exchange";
import {
  Popover,
  Switch,
  Slider,
  Menu,
  Modal,
  Input,
  Button,
  Col,
  Row,
} from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import moment from "moment";
import Fullscreen from "react-full-screen";
var ti = require("../../../assets/ti");
var common_colors = require("../../../assets/theme-variable");
var theme = localStorage.getItem("theme");
var bgcolor = common_colors.default_back_color;
var charttext = "#e1e1e1";
var defaultdrawingColor = "white";
if (theme == "coffee") {
  // anychart.theme(anychart.themes.coffee);
  bgcolor = common_colors.coffee_back_color;
}
if (theme == "light") {
  charttext = "#37474f";
  defaultdrawingColor = "black";
}
var cotdataArray = [];
var cotmenu = [];
var drawingArray = [];
var seriesArray = [];
var verticalLine = false;
var vertical_anchor = "";
var removeselected = false;
var drawingArray_temp = [];
var selectedDrawing = "";
var aimenu = [];
var aidataArray = [];
var activeDrawing = "";
const NUMBER_FORMAT = {
  scale: {
    factors: [1e9, 1e6, 1e3, 1e2, 1],
    suffixes: ["B", "M", "K", "H", ""],
  },
  decimalsCount: 0,
};
const NUMBER_FORMAT_italic = {
  scale: {
    factors: [1e9, 1e6, 1e3, 1e2, 1],
    suffixes: ["𝘣", "𝘮", "𝘬", "𝘩", ""],
  },
  decimalsCount: 0,
};
const NUMBER_FORMAT1 = {
  scale: {
    factors: [1e9, 1e6, 1e3, 1],
    suffixes: ["B", "M", "K", ""],
  },
  decimalsCount: 1,
};
const NUMBER_FORMAT1_italic = {
  scale: {
    factors: [1e9, 1e6, 1e3, 1],
    suffixes: ["𝒃", "𝒎", "𝒌", ""],
  },
  decimalsCount: 1,
};
var index_array = [
  "LEG Commercial Index Future",
  "LEG Commercial Index Combined",
  "LEG Non-Commercial Index Future",
  "LEG Non-Commercial Index Combined",
  "LEG Non Reportable Index Future",
  "LEG Non Reportable Index Combined",
  "TFF Dealer Index Future",
  "TFF Dealer Index Combined",
  "TFF Asset Manager Index Future",
  "TFF Asset Manager Index Combined",
  "TFF Lev. Funds Index Future",
  "TFF Lev. Funds Index Combined",
  "TFF Others Index Future",
  "TFF Others Index Combined",
  "TFF Non-Reportable Index Future",
  "TFF Non-Reportable Index Combined",
  ,
  "Dis Swap Dealer Index Future",
  "Dis Swap Dealer Index Combined",
  "Dis Money Manager Index Future",
  "Dis Money Manager Index Combined",
  "Dis Producer Index Future",
  "Dis Producer Index Combined",
  "Dis Others Index Future",
  "Dis Others Index Combined",
  "Dis Non-Reportable Index Future",
  "Dis Non-Reportable Index Combined",
  "LEG Index Future",
  "LEG Index Combined",
  "TFF Index Future",
  "TFF Index Combined",
  "Dis Index Future",
  "Dis Index Combined",
];
var mov_index_array = [
  "LEG Commercial Mov Index Future",
  "LEG Commercial Mov Index Combined",
  "LEG Non-Commercial Mov Index Future",
  "LEG Non-Commercial Mov Index Combined",
  "LEG Non Reportable Mov Index Future",
  "LEG Non Reportable Mov Index Combined",
  "TFF Dealer Mov Index Future",
  "TFF Dealer Mov Index Combined",
  "TFF Asset Manager Mov Index Future",
  "TFF Asset Manager Mov Index Combined",
  "TFF Lev. Funds Mov Index Future",
  "TFF Lev. Funds Mov Index Combined",
  "TFF Others Mov Index Future",
  "TFF Others Mov Index Combined",
  "TFF Non-Reportable Mov Index Future",
  "TFF Non-Reportable Mov Index Combined",
  ,
  "Dis Swap Dealer Mov Index Future",
  "Dis Swap Dealer Mov Index Combined",
  "Dis Money Manager Mov Index Future",
  "Dis Money Manager Mov Index Combined",
  "Dis Producer Mov Index Future",
  "Dis Producer Mov Index Combined",
  "Dis Others Mov Index Future",
  "Dis Others Mov Index Combined",
  "Dis Non-Reportable Mov Index Future",
  "Dis Non-Reportable Mov Index Combined",
  "LEG Mov Index Future",
  "LEG Mov Index Combined",
  "TFF Mov Index Future",
  "TFF Mov Index Combined",
  "Dis Mov Index Future",
  "Dis Mov Index Combined",
];
var format = function(input) {
  var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
  var pattern1 = /(\d{2})\-(\d{2})\-(\d{4})/;
  if (!input) {
    return null;
  }
  if (input.match(pattern)) {
    // console.log('aspl1');
    return input.replace(pattern, "$3-$2-$1");
  }
  if (input.match(pattern1)) {
    // console.log('aspl2');
    return input.replace(pattern1, "$3-$2-$1");
    // return input;
  }
};

// var rohantest = '';
// var chart1 = null;
class PriceCharting extends PureComponent {
  constructor(props) {
    super(props);
    // this.state = {

    // };
    this.state = {
      mekkocall: true,
      mekkocall1: true,
      inputValue: 1,
      symbol: "A",
      timerange: true,
      addvisible: false,
      minmax: false,
      gridstate: true,
      enddate: "",
      startdate: "",
      statedate: "",
      series: "candlestick",
      seriescot: "spline",
      recessionstatus: false,
      recessionkey: "",
      sapratetechnicalindicator: [],
      showtechnicalindcatorpopup: false,
      showpopupcontent: <div></div>,
      recentindicator: "",
      isFull: false,
      highlightshow: true,
      volumetype: 2,
      colorpanel: false,
      drawingColor: defaultdrawingColor,
      netgroup: "",
      nettype: "combined",
      oivisible: false,
      oigroup: "",
      oitype: "combined",
      crossstate: true,
      crossnumber: 2,
      tooltipvisible: false,
      grouping: false,
      verticalLine: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    switchvalue: false,
    statedate: "",
    statevalue: "",
    visible: false,
    range1: true,
    symbol: "A",
    highlight: false,
  };
  addVerticalLine(chart) {
    // console.log('asplclicked');
    verticalLine = true;
    chart.annotations().startDrawing({
      type: "vertical-line",
      allowEdit: false,
      stroke: "2 " + this.state.drawingColor + " 0.5",
    });
  }
  addVerticalLine1(chart) {
    if (verticalLine == false) {
      var element = document.getElementById("multipleLine");
      element.classList.add("active");
      verticalLine = true;
      chart.annotations().startDrawing({
        type: "vertical-line",
        allowEdit: false,
        stroke: "2 " + this.state.drawingColor + " 0.5",
      });
    } else {
      var element = document.getElementById("multipleLine");
      element.classList.remove("active");
      verticalLine = false;
      chart.annotations().cancelDrawing();
    }
  }
  stopVerticalLine() {
    verticalLine = false;
    // chart.annotations().startDrawing({'type':'vertical-line','allowEdit':false,'stroke':"1.5 "+this.state.drawingColor+" 0.5"});
  }
  getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => v === value && count++);
    return count;
  }
  // goFull = () => {
  //   this.setState({ isFull: true });
  // }
  createGrouping(chart) {
    if (this.state.grouping) {
      this.setState({ grouping: false });
    } else {
      chart.selectRange("points", 100, "last-date", true);
      this.setState({ grouping: true });
    }
  }
  changeVolume = (type) => {
    this.setState({ volumetype: type });
  };
  chartchange(series, value) {
    if (value == "area" || value == "line") {
      this.setState({
        highlight: false,
        highlightshow: false,
      });
    } else {
      this.setState({
        highlightshow: true,
      });
    }
    this.setState({
      series: value,
    });
  }
  chartchangecot(series_cot, value, seriesstate) {
    this.setState({
      [seriesstate]: value,
    });
  }
  changedrawingcolor = (color) => {
    this.setState({ drawingColor: color.hex, colorpanel: false });
    // console.log('asplaspl',color.hex)
  };
  changeVolume = (type) => {
    this.setState({ volumetype: type });
  };

  addPointer() {
    var reqvar1 = { addClick: "yes" };
    if (this.props.savestatus1) {
      this.props.savestatus(false);
    }
    this.props.addClicked(reqvar1);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.addPointer();
    this.setState({
      visible: false,
    });
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  showModalcot(graph_id, type, ticker_id) {
    this.setState({
      graph_idcot: graph_id,
      type_cot: type,
      ticker_id_cot: ticker_id,
      weekvisible: true,
    });
  }
  handleCancelcot = () => {
    this.setState({
      weekvisible: false,
    });
  };
  handleSubmitcot = (event) => {
    event.preventDefault();
    var reqvar = {
      selectedGRAPH: this.state.graph_idcot,
      ticker_id: this.state.ticker_id_cot,
      type: this.state.type_cot,
      week: this.state.weekcount,
    };
    this.props.getGraphData(reqvar);
    this.setState({
      weekvisible: false,
    });
  };
  onChange = (value) => {
    this.setState({
      inputValue: value,
    });
  };
  handleChange1 = (color) => {
    this.setState({ format: color.hex });
  };
  open1o1modal() {
    localStorage.setItem("cot", 0);
    localStorage.setItem("ecin", 0);
    this.setState({
      visible1o1: true,
    });
  }
  close1o1modal() {
    this.setState({
      visible1o1: false,
    });
  }
  gridonoff() {
    if (this.state.gridstate) {
      this.setState({ gridstate: false });
    } else {
      this.setState({ gridstate: true });
    }
  }
  sniper(enddate) {
    enddate = moment(enddate, "YYYY/MM/DD").subtract(1, "days");
    var reqvar = { moveDate: enddate };
    this.props.getmoveDate(reqvar);
  }
  addPriceOI(status, oigroup = "", oitype = "combined") {
    this.setState({
      oivisible: status,
      oigroup: oigroup,
      oitype: oitype,
    });
  }
  highlight(status, netgroup = "", nettype = "combined") {
    this.setState({
      highlight: status,
      netgroup: netgroup,
      nettype: nettype,
    });
    if (this.props.hNet !== null) {
      this.props.hNet["status"] = status;
      this.props.hNet["netgroup"] = netgroup;
      this.props.hNet["nettype"] = nettype;
    }
  }
  // highlight(){
  //   if(this.state.highlight)
  //   { this.setState({ highlight: false })
  //   }
  //   else{ this.setState({ highlight: true })}
  // }
  increaseheight() {
    if (this.state.increaseheight) {
      this.setState({ increaseheight: false });
    } else {
      this.setState({ increaseheight: true });
    }
  }
  minmax() {
    if (this.state.minmax) {
      this.setState({ minmax: false });
    } else {
      this.setState({ minmax: true });
    }
  }
  deactivateDrawing() {
    if (activeDrawing == "horizontalLine") {
      var element = document.getElementById("horizontalLine");
      element.classList.remove("active");
      activeDrawing = "";
    } else if (activeDrawing == "verticalLine") {
      var element = document.getElementById("verticalLine");
      element.classList.remove("active");
      activeDrawing = "";
    } else if (activeDrawing == "segmentLine") {
      var element = document.getElementById("segmentLine");
      element.classList.remove("active");
      activeDrawing = "";
    }
  }
  createDrawing(plot, type, subtype = "") {
    if (type == "horizontal-line") {
      var element = document.getElementById("horizontalLine");
      element.classList.add("active");
      activeDrawing = "horizontalLine";
    } else if (type == "vertical-line") {
      var element = document.getElementById("verticalLine");
      element.classList.add("active");
      activeDrawing = "verticalLine";
    } else if (type == "line") {
      var element = document.getElementById("segmentLine");
      element.classList.add("active");
      activeDrawing = "segmentLine";
    }
    verticalLine = false;
    var statecolor = this.state.drawingColor;
    if (type == "marker") {
      if (subtype == "arrowUp") {
        var color = "green";
        var size = 10;
      } else if (subtype == "arrowDown") {
        var color = "red";
        var size = 10;
      } else {
        var color = statecolor;
        var size = 5;
      }
      var typejson = {
        type: "marker",
        markerType: subtype,
        size: size,
        color: color,
      };
      plot.annotations().startDrawing(typejson);
    } else {
      if (type == "rectangle" || type == "ellipse") {
        plot
          .annotations()
          .startDrawing({ type: type, stroke: statecolor, fill: "#fff 0" });
      } else {
        plot
          .annotations()
          .startDrawing({ type: type, color: "2 " + statecolor });
      }
    }
  }
  showColorPanel = () => {
    if (this.state.colorpanel) {
      this.setState({ colorpanel: false });
    } else {
      this.setState({ colorpanel: true });
    }
  };
  removeDrawing(plot, pricejson) {
    var element = document.getElementById("multiRubber");
    element.classList.add("active");
    plot.annotations().removeAllAnnotations();
    this.props.removedrawing();
    if (this.props.savestatus1) {
      this.props.savestatus(false);
    }
    setTimeout(function() {
      element.classList.remove("active");
    }, 400);
    // this.setState({
    //   pricejson: '',
    // });
  }
  removeSelectedDrawing = (chart) => {
    var element = document.getElementById("Rubber");
    element.classList.add("active");
    if (selectedDrawing != "") {
      chart.annotations().removeAnnotation(selectedDrawing);
      removeselected = true;
      // console.log('asasas',chart.plot(0).annotations().toJson());
      // console.log('asasas123',drawingArray_temp);
      var count = chart.getPlotsCount();
      for (var i = 0; i < count; i++) {
        // if(chart.plot(i))
        // {
        // console.log('asasas123132',chart.plot(i).annotations().toJson());
        drawingArray[drawingArray_temp[i]] = chart
          .plot(i)
          .annotations()
          .toJson();
        this.props.drawingArray[drawingArray_temp[i]] = chart
          .plot(i)
          .annotations()
          .toJson();
        // }
        selectedDrawing = "";
      }
    }
    setTimeout(function() {
      element.classList.remove("active");
    }, 400);
    // this.setState({
    //   removeselected: true,
    // });
  };
  removeCI(key, uniquename) {
    if (this.props.selectedGRAPH[key]) {
      this.props.selectedGRAPH.splice(key, 1);
    }
    if (cotdataArray[key]) {
      cotdataArray.splice(key, 1);
      if (this.props.savestatus1) {
        this.props.savestatus(false);
      }
    }
    this.setState({ deletedchart: uniquename });
  }
  removeAI(key, uniquename) {
    if (this.props.selectedTrend[key]) {
      this.props.selectedTrend.splice(key, 1);
    }
    if (aidataArray[key]) {
      aidataArray.splice(key, 1);
      if (this.props.savestatus1) {
        this.props.savestatus(false);
      }
    }
    this.setState({ deletedchart: moment() });
  }
  removeTI(key) {
    var data = this.props.sapratetechnicalindicator;
    if (data[key]) {
      // delete data[key];
      data.splice(key, 1);
      this.props.techindicator(data);
      if (this.props.savestatus1) {
        this.props.savestatus(false);
      }
    }
  }
  removeCTI(uniquename, key) {
    var data = this.props.cottechnicalindicator;
    if (data[uniquename]) {
      // delete data[uniquename][key];
      data[uniquename].splice(key, 1);
      if (data[uniquename].length == 0) {
        delete data[uniquename];
        // data.splice(uniquename, 1);
      }
      this.props.cottechindicator(data);
      if (this.props.savestatus1) {
        this.props.savestatus(false);
      }
    }
  }
  showrecession(key, status) {
    this.setState({
      recessionstatus: status,
      recessionkey: key,
    });
  }
  showsapratetechnical = (key) => {
    var html = <div></div>;
    this.setState({
      recentindicator: key,
      showpopupcontent: html,
      showtechnicalindcatorpopup: true,
    });
  };
  showcottechnical = (key, plot, mapping, name) => {
    var joined1 = this.props.cottechnicalindicator;
    // console.log('asplas',joined1);
    if (joined1[name]) {
      var temp = joined1[name];
      if (key == "sma") {
        // console.log('asplaaa',temp.length);
        var test = temp.filter(function(temp) {
          return temp[0] == key;
        });
        if (test.length > 0) {
        } else {
          return false;
        }
      } else {
        if (joined1[name].length > 0) {
          return false;
        }
      }
    }
    var html = <div></div>;
    if (key == "oi" || key == "oicf" || key == "oisf") {
      // this.setState({recentname:name })
      this.addOIcottechnical(name, key);
    } else {
      if (ti[key]) {
        html = ti[key];
      }
      this.setState({
        recentcotindicator: key,
        recentplot: plot,
        recentmapping: mapping,
        recentname: name,
        showpopupcontent: html,
        showtechnicalindcatorpopup: true,
      });
    }
  };
  handleCanceltechnical = () => {
    this.setState({ showtechnicalindcatorpopup: false });
  };
  addsapratetechnical = () => {
    //alert(this.state.recentindicator);
    var formElements = document.getElementById("indicator_form").elements;
    var postData = [];
    for (var i = 0; i < formElements.length; i++)
      if (formElements[i].type != "submit")
        //we dont want to include the submit-buttom
        // postData[formElements[i].name]=formElements[i].value;
        postData.push(formElements[i].value);
    var joined1 = this.state.sapratetechnicalindicator;
    joined1[this.state.recentindicator] = postData;
    this.setState({
      sapratetechnicalindicator: joined1,
      showtechnicalindcatorpopup: false,
    });
  };
  addOIcottechnical = (name, key) => {
    //alert(this.state.recentindicator);
    var postData = [];
    postData[0] = key;
    postData[1] = "Open Interest";
    var joined1 = this.props.cottechnicalindicator;
    if (!joined1[name]) {
      joined1[name] = [];
    }
    joined1[name].push(postData);
    this.props.cottechindicator(joined1);
    if (this.props.savestatus1) {
      this.props.savestatus(false);
    }
    this.setState({ cottechnicalindicator: joined1 });
  };
  addcottechnical = () => {
    //alert(this.state.recentindicator);
    var formElements = document.getElementById("indicator_form").elements;
    var postData = [];
    postData[0] = this.state.recentcotindicator;
    // postData[1]=this.state.recentplot;
    // postData[2]=this.state.recentmapping;
    for (var i = 0; i < formElements.length; i++)
      if (formElements[i].type != "submit")
        //we dont want to include the submit-buttom
        // postData[formElements[i].name]=formElements[i].value;
        postData.push(formElements[i].value);
    var joined1 = this.props.cottechnicalindicator;
    if (!joined1[this.state.recentname]) {
      joined1[this.state.recentname] = [];
    }
    joined1[this.state.recentname].push(postData);
    this.props.cottechindicator(joined1);
    if (this.props.savestatus1) {
      this.props.savestatus(false);
    }
    this.setState({
      cottechnicalindicator: joined1,
      showtechnicalindcatorpopup: false,
    });
  };
  componentDidUpdate() {}
  crossonoff(status, number) {
    this.setState({
      crossstate: status,
      crossnumber: number,
    });
  }
  tooltip(status) {
    this.setState({
      tooltipvisible: status,
    });
  }
  removeTSRM = () => {
    var data = { status: false, type: "" };
    this.props.tsrmvisible(data);
  };
  removeNI(key) {
    var data = this.props.newsindicator1;
    if (data[key]) {
      // delete data[key];
      data.splice(key, 1);
      this.props.newsindicator(data);
      if (this.props.savestatus1) {
        this.props.savestatus(false);
      }
    }
  }
  calculateHeight(j_cot) {
    var height = 800;
    if (window.innerHeight == window.screen.height) {
      if (j_cot - 1 == 0) {
        // height = (window.screen.height*80)/100;
        height = window.screen.height - 160;
        // height = window.screen.height;
        // height = window.screen.height-200;
        // if(this.props.selectedEcin.length>0){
        //   height = 600;
        // }
      } else {
        if (j_cot - 1 <= 2) {
          // height = window.screen.height-200;
          // height = (window.screen.height*80)/100;
          height = window.screen.height - 160;
        } else {
          // height = ((j_cot-2)*240)+320;
          // height = (window.screen.height-200)+((j_cot-3)*200);
          height = window.screen.height - 160 + (j_cot - 3) * 165;
        }
      }
      if (this.state.increaseheight) {
        height += (window.screen.height * 50) / 100;
        // if((j_cot-1) == 0)
        // {
        //   height = 560;
        //   if(this.props.selectedEcin.length>0){
        //     height = 840;
        //   }
        // }
        // else
        // {
        //   height = ((j_cot-1)*288)+448;
        // }
      }
    } else {
      if (j_cot - 1 == 0) {
        height = window.innerHeight - 150;
        // height = (window.innerHeight*77)/100;
      } else {
        if (j_cot - 1 <= 2) {
          height = window.innerHeight - 150;
        } else {
          height = window.innerHeight - 150 + (j_cot - 3) * 150;
        }
      }
    }

    return height;
  }
  render() {
    var theme = localStorage.getItem("theme");
    var palette = anychart.palettes.defaultPalette;
    var fallingColor = palette[2];
    var risingColor = palette[0];
    var highlightColor = "white";
    var resistanceColor = "#91e519";
    var gridColor = "grey";
    var waterMarkColor = "#515F78";
    var pickerColors = [
      "#FFFFFF",
      "#FE5E9E",
      "#14C8FF",
      "#43F10D",
      "#FFFF00",
      "#FF8D2B",
    ];
    if (theme == "coffee") {
      anychart.theme(anychart.themes.coffee);
      palette = anychart.palettes.coffee;
      fallingColor = palette[1];
    } else if (theme == "light") {
      // palette = anychart.palettes.morning;
      fallingColor = "#cf4140";
      waterMarkColor = "#ACACAC";
      risingColor = "green";
      highlightColor = "black";
      resistanceColor = "#0D783F";
      gridColor = "#9D9D9D";
      pickerColors = [
        "#000000",
        "#D80000",
        "#1C52BA",
        "#379F17",
        "#B24C94",
        "#E28026",
      ];
    }
    var verticalline_date = "";
    var ticker_name = "";
    var ticker_group = "";
    var short_desc = "";
    var ticker_id = "";
    var eod_data = "";
    var cftc_market = "";
    var enddate = "";
    var first_date = "";
    var height = 0;
    var cot_first_date = "";
    anychart.format.locales.default.numberLocale.decimalsCount = 4;
    var chart = anychart.stock();
    var hnet_label = "";
    if (this.state.highlightshow) {
      if (this.props.hNet !== null) {
        if (this.props.hNet.status) {
          var temp_hnet = this.props.hNet.netgroup;
          if (temp_hnet == 10) {
            hnet_label = "Com Net Contracts";
          }
          if (temp_hnet == 1) {
            hnet_label = "Non-Com Net Contracts";
          }
          if (temp_hnet == 2) {
            hnet_label = "Non-Rep. Contracts";
          }
          if (temp_hnet == 3) {
            hnet_label = "Com Net Weighted";
          }
          if (temp_hnet == 4) {
            hnet_label = "Non-Com Net Weighted";
          }
          if (temp_hnet == 5) {
            hnet_label = "Non-Rep. Weighted";
          }
        }
      }
    }
    if (this.props.tickerData[0]) {
      ticker_group = this.props.tickerData[0][0]["group"];
      ticker_name = this.props.tickerData[0][0]["ticker_name"];
      short_desc = this.props.tickerData[0][0]["short_desc"];
      eod_data = this.props.tickerData[0][0]["eod_data"];
      cftc_market = this.props.tickerData[0][0]["cftc_market"];
      ticker_id = this.props.tickerData[0][0]["_id"];
    }

    var height = 800;
    var newvar = <div></div>;
    if (this.props.priceData.length > 0) {
      if (this.props.priceData[0].length > 0) {
        var priceData = this.props.priceData[0];
        var length = priceData.length;
        first_date = priceData[0]["date"];
        verticalline_date = priceData[length - 1]["date"];
        var msftDataTable = anychart.data.table("date");
        msftDataTable.addData(priceData);

        chart.interactivity("by-x");
        chart.background().fill("#FFFFFF 0");

        chart.scroller().maxHeight(20);
        chart.scroller().orientation("top");
        chart.contextMenu(true);
        var rangeSelector = anychart.ui.rangeSelector();
        var rangePicker = anychart.ui.rangePicker();
        var customRanges = rangeSelector.ranges();

        customRanges[0].type = "unit";
        customRanges[0].unit = "Month";
        customRanges[0].count = 3;
        customRanges[0].text = "3M";

        customRanges[1].type = "unit";
        customRanges[1].unit = "Month";
        customRanges[1].count = 6;
        customRanges[1].text = "6M";

        customRanges[2].type = "unit";
        customRanges[2].unit = "Month";
        customRanges[2].count = 9;
        customRanges[2].text = "9M";
        chart.crosshair(true);

        var tooltip = chart.tooltip();
        // tooltip.displayMode("union");
        // tooltip.positionMode("chart");
        // tooltip.anchor("right-top");
        // tooltip.position("right-top");
        tooltip.enabled(this.state.tooltipvisible);

        // define the grouping
        var grouping = chart.grouping();

        // set the levels of grouping
        grouping.levels([
          { unit: "day", count: 1 },
          { unit: "week", count: 1 },
          { unit: "month", count: 1 },
        ]);

        chart
          .crosshair()
          .yLabel()
          .fontColor("#E3E4E8");
        chart
          .crosshair()
          .yLabel()
          .background({
            fill: bgcolor,
            stroke: palette[0],
          });
        chart
          .crosshair()
          .xLabel()
          .fontColor("#E3E4E8");
        chart
          .crosshair()
          .xLabel()
          .background({
            fill: bgcolor,
            stroke: palette[0],
          });
        if (this.state.crossstate) {
          chart.crosshair(this.state.crossstate);
          if (this.state.crossnumber == 1) {
            chart.crosshair().yStroke(null);
          }
        } else {
          chart.crosshair().yStroke(null);
          chart.crosshair().xStroke(null);
          // chart.crosshair(this.state.crossstate)
        }

        var firstPlot = chart.plot(0);
        drawingArray_temp[0] = "price";
        firstPlot.height("320px");
        if (this.state.increaseheight) {
          firstPlot.height("448px");
        }

        firstPlot.xAxis().labels(false);
        firstPlot
          .xAxis()
          .labels()
          .enabled(false);
        var mapping = msftDataTable.mapAs({
          open: "open",
          high: "high",
          low: "low",
          close: "close",
          value: "close",
          volume: "volume",
        });

        var series = firstPlot.candlestick(
          msftDataTable.mapAs({
            open: "open",
            high: "high",
            low: "low",
            close: "close",
            value: "close",
          })
        );
        series.name(short_desc);
        series.connectMissingPoints(true);
        if (this.state.volumetype == 0 || this.state.volumetype == 1) {
          var volume_mapping = msftDataTable.mapAs({ value: "volume" });
          var volumeSeries = firstPlot.column(volume_mapping);
          volumeSeries.name("Volume");
          var customScale = anychart.scales.linear();
          // sets y-scale
          volumeSeries.yScale(customScale);
          volumeSeries
            .name("Volume")
            .zIndex(100)
            .maxHeight("20%")
            .bottom(0);
          if (this.state.volumetype == 1) {
            volumeSeries.risingStroke("#64b5f6");
            volumeSeries.fallingStroke("#ef6c00");
            volumeSeries.risingFill("#64b5f6 .5");
            volumeSeries.fallingFill("#ef6c00 .5");
          }
        }
        if (this.state.volumetype == 2) {
          var customScale = anychart.scales.linear();
          var volumeMa = firstPlot.volumeMa(
            mapping,
            10,
            "ema",
            "column",
            "step-line"
          );
          volumeMa
            .maSeries()
            .height("20%")
            .zIndex(100)
            .bottom(0);
          volumeMa
            .volumeSeries()
            .height("20%")
            .zIndex(100)
            .bottom(0);
          volumeMa.maSeries().yScale(customScale);
          volumeMa.volumeSeries().yScale(customScale);
        }

        var oi_mapping = msftDataTable.mapAs({ value: "openinterest" });
        if (this.state.oivisible) {
          //   var msftDataTable = anychart.data.table('date');
          // msftDataTable.addData(priceData);
          var oiname = "Open Interest";
          if (this.state.oigroup == 1) {
            oi_mapping = msftDataTable.mapAs({ value: "openinterest" });
          } else {
            if (this.props.oiData.length > 0) {
              if (this.props.oiData[0] != "") {
                var oiDataTable = anychart.data.table("date");
                oiDataTable.addData(this.props.oiData[0][this.state.oitype]);
                if (this.state.oigroup == 2 || this.state.oigroup == 3) {
                  oi_mapping = oiDataTable.mapAs({ value: "cot_oi" });
                  oiname = "OI COT";
                } else if (this.state.oigroup == 4 || this.state.oigroup == 5) {
                  oi_mapping = oiDataTable.mapAs({ value: "spread" });
                  oiname = "OI Spread";
                }
              }
            }
          }
          // console.log('asplmap',oi_mapping);
          var oiSeries = firstPlot.line(oi_mapping);
          var customScale1 = anychart.scales.linear();
          // sets y-scale
          oiSeries.yScale(customScale1);
          oiSeries.connectMissingPoints(true);
          oiSeries
            .name(oiname)
            .zIndex(2000)
            .maxHeight("20%")
            .bottom(0);
          oiSeries.stroke("#E1C699", 1.5);
          oiSeries.stroke(palette[9], 1.5);
        }
        if (this.props.drawingArray["price"]) {
          firstPlot.annotations().fromJson(this.props.drawingArray["price"]);
        }
        if (this.props.trendmlvisible.status) {
          if (this.props.trendmlvisible.type == 1) {
            if (this.props.TSRM.length > 0) {
              if (this.props.TSRM[0].length > 0) {
                var trendmlTable = anychart.data.table("date");
                trendmlTable.addData(this.props.TSRM[0]);
                var trendml_mapping = trendmlTable.mapAs({ value: "trend" });
                // var priceFSeries = firstPlot.rangeStepArea(priceF_mapping);
                var trendmlLineSeries = firstPlot.line(trendml_mapping);
                var customScale1 = anychart.scales.linear();
                trendmlLineSeries.yScale(customScale1);
                trendmlLineSeries.name("trend ML");
                // priceFLineSeries.stroke({'thickness':2});
              }
            }
          } else if (this.props.trendmlvisible.type == 2) {
            if (this.props.TSRM.length > 0) {
              if (this.props.TSRM[0].length > 0) {
                var trendmlTable = anychart.data.table("date");
                trendmlTable.addData(this.props.TSRM[0]);
                var trendml_mapping = trendmlTable.mapAs({
                  value: "meanStockValue",
                });
                var trendmlLineSeries = firstPlot.line(trendml_mapping);
                // var customScale = anychart.scales.linear();
                // trendmlLineSeries.yScale(customScale);
                trendmlLineSeries.connectMissingPoints(true);
                trendmlLineSeries.name("MeanStock");
                var trendml_mapping1 = trendmlTable.mapAs({
                  value: "movingAvg",
                });
                var trendmlLineSeries1 = firstPlot.line(trendml_mapping1);
                // var customScale1 = anychart.scales.linear();
                // trendmlLineSeries1.yScale(customScale1);
                trendmlLineSeries1.connectMissingPoints(true);
                trendmlLineSeries1.name("Moving Average");
                var trendml_mapping2 = trendmlTable.mapAs({
                  value: "windowAvg",
                });
                var trendmlLineSeries2 = firstPlot.line(trendml_mapping2);
                // var customScale2 = anychart.scales.linear();
                // trendmlLineSeries2.yScale(customScale2);
                trendmlLineSeries2.connectMissingPoints(true);
                trendmlLineSeries2.name("Window Average");
                // priceFLineSeries.stroke({'thickness':2});
                // var series_cot = trendPlot.spline(trendDataTable.mapAs({'value': 'meanStockValue'}));
                //   series_cot.connectMissingPoints(true);
                //   series_cot.name('MeanStock');
                //   series_cot.stroke(palette[1]);
                //   var series_cot1 = trendPlot.spline(trendDataTable.mapAs({'value': 'movingAvg'}));
                //   series_cot1.connectMissingPoints(true);
                //   series_cot1.name('Moving Average');
                //   series_cot1.stroke(palette[5]);
                //   // var customScale1 = anychart.scales.linear();
                //   // series_cot1.yScale(customScale1);
                //   var series_cot2 = trendPlot.spline(trendDataTable.mapAs({'value': 'windowAvg'}));
                //   series_cot2.connectMissingPoints(true);
                //   series_cot2.name('Window Average');
                //   series_cot2.stroke(palette[7]);
                //   TSRMName = 'SWM';
              }
            }
          }
        }
        if (this.props.drawingArray["price"]) {
          firstPlot.annotations().fromJson(this.props.drawingArray["price"]);
        }
        if (this.props.priceforecast.status) {
          if (this.props.priceforecast.type == 1) {
            if (this.props.priceF.length > 0) {
              if (this.props.priceF[0].length > 0) {
                var priceFTable = anychart.data.table("date");
                priceFTable.addData(this.props.priceF[0]);
                var priceF_mapping = priceFTable.mapAs({
                  low: "Lo_95",
                  high: "Hi_95",
                  value: "price",
                });
                var priceFSeries = firstPlot.rangeStepArea(priceF_mapping);
                var priceFLineSeries = firstPlot.line(priceF_mapping);
                priceFLineSeries.stroke({ thickness: 2 });
              }
            }
          }
          if (this.props.priceforecast.type == 6) {
            if (this.props.priceF2.length > 0) {
              if (this.props.priceF2[0].length > 0) {
                var priceFTable = anychart.data.table("date");
                priceFTable.addData(this.props.priceF2[0]);
                var priceF_mapping = priceFTable.mapAs({ value: "price" });
                // var priceF_mapping = priceFTable.mapAs({'low': 'Lo_95','high': 'Hi_95','value':'price'});
                // var priceFSeries = firstPlot.rangeStepArea(priceF_mapping);
                var priceFLineSeries = firstPlot.line(priceF_mapping);
                priceFLineSeries.stroke({ thickness: 2, color: palette[1] });
                priceFLineSeries.name("Price Forecast");
              }
            }
          }
          if (this.props.priceforecast.type == 2) {
            if (this.props.SnR1.length > 0) {
              if (this.props.SnR1[0].length > 0) {
                this.props.SnR1[0].forEach((element, key) => {
                  var controller = firstPlot.annotations();
                  var line1 = controller.line({
                    xAnchor: element["date"],
                    valueAnchor: element["value"],
                    secondXAnchor: verticalline_date,
                    allowEdit: false,
                    secondValueAnchor: element["value"],
                  });
                  line1.normal().stroke("#7c848b", 1);
                  line1.hovered().stroke("#7c848b", 2);
                  line1.selected().stroke("#7c848b", 3);
                  firstPlot
                    .textMarker(key)
                    .value(element["value"])
                    .text(element["value"])
                    .anchor("right-center")
                    .offsetX(10)
                    .offsetY(-10)
                    .align("right")
                    .zIndex(100)
                    .fontSize(12)
                    .fontColor("#7c848b")
                    .axis(firstPlot.yAxis());
                });
              }
            }
          }
          if (this.props.priceforecast.type == 3) {
            if (this.props.SnR2.length > 0) {
              // if(this.props.SnR2[0].length>0)
              // {
              var controller = firstPlot.annotations();
              // console.log('asplaspl',this.props.SnR2);
              var textkey = 0;
              this.props.SnR2[0]["high"].forEach((element, key) => {
                // console.log('asplaspl',element);
                var line2 = controller.line({
                  xAnchor: element["date"],
                  valueAnchor: element["value"],
                  secondXAnchor: verticalline_date,
                  allowEdit: false,
                  secondValueAnchor: element["value"],
                });
                line2.normal().stroke("blue", 1, "10 2");
                line2.normal().stroke("blue", 2, "10 2");
                line2.selected().stroke("blue", 3, "10 2");
                firstPlot
                  .textMarker(textkey)
                  .value(element["value"])
                  .text(
                    parseFloat(element["value"]) > 1
                      ? parseInt(element["value"])
                      : parseFloat(element["value"]).toFixed(4)
                  )
                  .anchor("right-center")
                  .offsetX(10)
                  .align("right")
                  .zIndex(100)
                  .fontSize(12)
                  .offsetY(-10)
                  .fontColor("blue")
                  .axis(firstPlot.yAxis());
                textkey = textkey + 1;
                // var upperBandTextMarker = firstPlot
                //   .textMarker(key)
                //   .value(element['value'])
                //   .text('Upper band');
                // this.textMarkerSettings(upperBandTextMarker, 'red');
                // var qwerty = this;
                // var upperBandPointer;
                // chart.listenOnce('chartDraw', function() {
                // upperBandPointer = qwerty.addsnr1Pointer(
                //   upperBandTextMarker,
                //   chart.container()
                // );
                // chart.container().listen('stageresize', function () {
                //   // dispose pointer
                //   upperBandPointer.dispose();
                //   // lowerBandPointer.dispose();
                //   // create pointer with new parameters
                //   upperBandPointer = qwerty.addsnr1Pointer(upperBandTextMarker, this);
                //   // lowerBandPointer = addPointer(lowerBandTextMarker, this);
                // });
                // });
              });
              this.props.SnR2[0]["low"].forEach((element, key) => {
                // console.log('asplaspl',element);
                // var controller = firstPlot.annotations();
                var line2 = controller.line({
                  xAnchor: element["date"],
                  valueAnchor: element["value"],
                  secondXAnchor: verticalline_date,
                  allowEdit: false,
                  secondValueAnchor: element["value"],
                });
                line2.normal().stroke("red", 1, "10 2");
                line2.hovered().stroke("red", 2, "10 2");
                line2.selected().stroke("red", 3, "10 2");
                firstPlot
                  .textMarker(textkey)
                  .value(element["value"])
                  .text(
                    parseFloat(element["value"]) > 1
                      ? parseInt(element["value"])
                      : parseFloat(element["value"]).toFixed(4)
                  )
                  .anchor("right-center")
                  .offsetX(10)
                  .align("right")
                  .zIndex(100)
                  .fontSize(12)
                  .offsetY(-10)
                  .fontColor("red")
                  .axis(firstPlot.yAxis());
                textkey = textkey + 1;
              });
              // }
            }
          }
          if (this.props.priceforecast.type == 4) {
            if (this.props.trend1.length > 0) {
              // console.log('asplaspl',this.props.trend1);
              if (this.props.trend1[0].length > 0) {
                var temp = 0;
                this.props.trend1[0].forEach((element, key) => {
                  var controller = firstPlot.annotations();
                  var trendline = controller.line({
                    xAnchor: element["x0"],
                    valueAnchor: element["y0"],
                    secondXAnchor: element["x1"],
                    secondValueAnchor: element["y1"],
                    allowEdit: false,
                  });
                  var color = "grey";
                  if (element["lable"] == "Support") {
                    trendline.normal().stroke("red", 1, "10 2");
                    color = "red";
                  } else if (element["lable"] == "Avg. Support") {
                    trendline.normal().stroke("#605ac1", 3, "10 2");
                    color = "#605ac1";
                  } else if (element["lable"] == "Resistance") {
                    trendline.normal().stroke(resistanceColor, 1, "10 2");
                    color = resistanceColor;
                  } else if (element["lable"] == "Avg. Resistance") {
                    trendline.normal().stroke("green", 3, "10 2");
                    color = "green";
                  }
                  if (element["x1"] == verticalline_date) {
                    firstPlot
                      .textMarker(temp)
                      .value(element["y1"])
                      .text(
                        parseFloat(element["y1"]) > 1
                          ? parseInt(element["y1"])
                          : parseFloat(element["y1"]).toFixed(4)
                      )
                      .anchor("right-center")
                      .offsetX(10)
                      .align("right")
                      .zIndex(100)
                      .fontSize(12)
                      .offsetY(-10)
                      .fontColor(color)
                      .axis(firstPlot.yAxis());
                    temp = temp + 1;
                  }
                });
              }
            }
          }
          if (this.props.priceforecast.type == 5) {
            if (this.props.trend1.length > 0) {
              // console.log('asplaspl',this.props.trend1);
              if (this.props.trend1[0].length > 0) {
                var temp = 0;
                this.props.trend1[0].forEach((element, key) => {
                  var controller = firstPlot.annotations();
                  var trendline = controller.ray({
                    xAnchor: element["x0"],
                    valueAnchor: element["y0"],
                    secondXAnchor: element["x1"],
                    secondValueAnchor: element["y1"],
                    allowEdit: false,
                  });
                  var color = "grey";
                  if (element["lable"] == "Support") {
                    trendline.normal().stroke("red", 1, "10 2");
                    trendline.hovered().stroke("red", 2, "10 2");
                    trendline.selected().stroke("red", 3, "10 2");
                    color = "red";
                  } else if (element["lable"] == "Avg. Support") {
                    trendline.normal().stroke("#605ac1", 3, "10 2");
                    trendline.hovered().stroke("#605ac1", 4, "10 2");
                    trendline.selected().stroke("#605ac1", 4.5, "10 2");
                    color = "#605ac1";
                  } else if (element["lable"] == "Resistance") {
                    trendline.normal().stroke("blue", 1, "10 2");
                    trendline.hovered().stroke("blue", 2, "10 2");
                    trendline.selected().stroke("blue", 3, "10 2");
                    color = "blue";
                  } else if (element["lable"] == "Avg. Resistance") {
                    trendline.normal().stroke("green", 3, "10 2");
                    trendline.hovered().stroke("green", 4, "10 2");
                    trendline.selected().stroke("green", 4.5, "10 2");
                    color = "green";
                  }
                  if (element["x1"] == verticalline_date) {
                    firstPlot
                      .textMarker(temp)
                      .value(element["y1"])
                      .text(
                        parseFloat(element["y1"]) > 1
                          ? parseInt(element["y1"])
                          : parseFloat(element["y1"]).toFixed(4)
                      )
                      .anchor("right-center")
                      .offsetX(10)
                      .align("right")
                      .zIndex(100)
                      .fontSize(12)
                      .offsetY(-10)
                      .fontColor(color)
                      .axis(firstPlot.yAxis());
                  }
                });
              }
            }
          }
        }
        if (this.props.trendAIData.length > 0) {
          var xAxis = firstPlot.xAxis();
          // console.log('asplaspl',this.props.trendAIData);
          var markerkey = 0;
          this.props.trendAIData.forEach((element) => {
            // console.log('asplaspl',markerkey);
            // create range marker
            var marker = firstPlot.rangeMarker(markerkey);
            // set start point of the marker
            marker.from(element["date"]);
            // set end point of the marker
            marker.to(
              this.props.trendAIData[markerkey + 1]
                ? this.props.trendAIData[markerkey + 1]["date"]
                : element["date"]
            );
            // set marker inner color
            marker.fill(element["color"]);
            // set axis
            marker.axis(xAxis);
            markerkey = markerkey + 1;
          });
        }

        var yScale_1 = chart.plot(0).yScale();
        yScale_1.maximumGap(0);
        if (this.state.grouping) {
          grouping.levels([{ unit: "day", count: 1 }]);
          chart.scroller().allowRangeChange(false);
          // chart.selectRange('day', 20, 'last-date',true)
          // grouping.maxVisiblePoints(10);
          grouping.forced(true);
        }
        if (this.state.minmax) {
          series
            .maxLabels()
            .enabled(true)
            .position("high")
            .fontWeight("bold")
            .fontColor("#6da632")
            .useHtml(true)
            .format("<span>\u02C4</span>");

          // set min labels settings
          series
            .minLabels()
            .enabled(true)
            .position("low")
            .fontWeight("bold")
            .fontColor("#d81e05")
            .useHtml(true)
            .format("<span>\u02C5</span>");
        }
        series.seriesType(this.state.series);
        if (this.state.series == "area") {
          series.fill(["0.5 #395B82", "#0E233C"], -90);
          series.stroke({ thickness: 2, color: palette[0] });
        }
        if (this.state.series == "line") {
          series.stroke({ thickness: 2, color: palette[0] });
        }
        var temp_this = this;
        if (this.state.highlightshow) {
          var greydate =
            this.state.statedate != ""
              ? this.state.statedate
              : verticalline_date;
          series.risingStroke(function() {
            if (this.x) {
              var pointDate = new Date(this.x);
              var month =
                String(pointDate.getMonth() + 1) < 10
                  ? "0" + String(pointDate.getMonth() + 1)
                  : String(pointDate.getMonth() + 1);
              var pointDateString =
                String(pointDate.getFullYear()) +
                "-" +
                month +
                "-" +
                String(
                  pointDate.getDate() < 10
                    ? "0" + pointDate.getDate()
                    : pointDate.getDate()
                );
              var pointDateString1 =
                String(
                  pointDate.getDate() < 10
                    ? "0" + pointDate.getDate()
                    : pointDate.getDate()
                ) +
                "-" +
                month +
                "-" +
                String(pointDate.getFullYear());
              // if (greydate == pointDateString || greydate == pointDateString1) {
              //   return '#D546A6'
              // }
            }
            if (temp_this.state.series == "ohlc") {
              return "2 " + risingColor;
            }
            if (temp_this.state.series == "candlestick") {
              return "1 " + highlightColor;
            }
            // return '#64b5f6'
            return risingColor;
          });
          series.risingFill(function() {
            if (this.x) {
              var pointDate = new Date(this.x);
              var month =
                String(pointDate.getMonth() + 1) < 10
                  ? "0" + String(pointDate.getMonth() + 1)
                  : String(pointDate.getMonth() + 1);
              var pointDateString =
                String(pointDate.getFullYear()) +
                "-" +
                month +
                "-" +
                String(
                  pointDate.getDate() < 10
                    ? "0" + pointDate.getDate()
                    : pointDate.getDate()
                );
              var pointDateString1 =
                String(
                  pointDate.getDate() < 10
                    ? "0" + pointDate.getDate()
                    : pointDate.getDate()
                ) +
                "-" +
                month +
                "-" +
                String(pointDate.getFullYear());
              // if (greydate == pointDateString || greydate == pointDateString1) {
              //   return '#D546A6'
              // }
            }
            return risingColor;
          });

          series.fallingStroke(function() {
            if (this.x) {
              var pointDate = new Date(this.x);
              var month =
                String(pointDate.getMonth() + 1) < 10
                  ? "0" + String(pointDate.getMonth() + 1)
                  : String(pointDate.getMonth() + 1);
              var pointDateString =
                String(pointDate.getFullYear()) +
                "-" +
                month +
                "-" +
                String(
                  pointDate.getDate() < 10
                    ? "0" + pointDate.getDate()
                    : pointDate.getDate()
                );
              var pointDateString1 =
                String(
                  pointDate.getDate() < 10
                    ? "0" + pointDate.getDate()
                    : pointDate.getDate()
                ) +
                "-" +
                month +
                "-" +
                String(pointDate.getFullYear());
              // if (greydate == pointDateString || greydate == pointDateString1) {
              //   return '#D546A6'
              // }
            }
            if (temp_this.state.series == "ohlc") {
              return "2 " + fallingColor;
            }
            if (temp_this.state.series == "candlestick") {
              return "1 " + highlightColor;
            }
            return fallingColor;
          });
          series.fallingFill(function() {
            if (this.x) {
              var pointDate = new Date(this.x);
              var month =
                String(pointDate.getMonth() + 1) < 10
                  ? "0" + String(pointDate.getMonth() + 1)
                  : String(pointDate.getMonth() + 1);
              var pointDateString =
                String(pointDate.getFullYear()) +
                "-" +
                month +
                "-" +
                String(
                  pointDate.getDate() < 10
                    ? "0" + pointDate.getDate()
                    : pointDate.getDate()
                );
              var pointDateString1 =
                String(
                  pointDate.getDate() < 10
                    ? "0" + pointDate.getDate()
                    : pointDate.getDate()
                ) +
                "-" +
                month +
                "-" +
                String(pointDate.getFullYear());
              // if (greydate == pointDateString || greydate == pointDateString1) {
              //   return '#D546A6'
              // }
            }
            return fallingColor;
          });
        }
        if (this.props.hNet !== null) {
          if (this.props.hNet.status) {
            if (
              this.props.exitData[0] != "" &&
              this.props.exitData[0] !== undefined
            ) {
              var greydate =
                this.state.statedate != ""
                  ? this.state.statedate
                  : verticalline_date;
              var temp_netgroup = this.props.hNet.netgroup;
              var datesarray = this.props.exitData[0][this.state.nettype];
              if (temp_netgroup != "") {
                series.labels().useHtml(true);
                series
                  .labels()
                  .enabled(true)
                  .format(function() {
                    if (this.x) {
                      var pointDate = new Date(this.x);
                      var month =
                        String(pointDate.getMonth() + 1) < 10
                          ? "0" + String(pointDate.getMonth() + 1)
                          : String(pointDate.getMonth() + 1);
                      var pointDateString =
                        String(pointDate.getFullYear()) +
                        "-" +
                        month +
                        "-" +
                        String(
                          pointDate.getDate() < 10
                            ? "0" + pointDate.getDate()
                            : pointDate.getDate()
                        );
                      var pointDateString1 =
                        String(
                          pointDate.getDate() < 10
                            ? "0" + pointDate.getDate()
                            : pointDate.getDate()
                        ) +
                        "-" +
                        month +
                        "-" +
                        String(pointDate.getFullYear());
                      // if (datesarray.includes(pointDateString)) {
                      if (datesarray[pointDateString]) {
                        if (temp_netgroup == 10) {
                          return (
                            '<span style="color:#E07D3B">' +
                            anychart.format.number(
                              datesarray[pointDateString]["comm_current"],
                              NUMBER_FORMAT_italic
                            ) +
                            "</span>"
                          );
                        } else if (temp_netgroup == 1) {
                          return (
                            '<span style="color:#89BCF1">' +
                            anychart.format.number(
                              datesarray[pointDateString]["noncomm_current"],
                              NUMBER_FORMAT_italic
                            ) +
                            "</span>"
                          );
                        } else if (temp_netgroup == 2) {
                          return (
                            '<span style="color:#9eb0ba">' +
                            anychart.format.number(
                              datesarray[pointDateString]["nonrep_current"],
                              NUMBER_FORMAT_italic
                            ) +
                            "</span>"
                          );
                        } else if (temp_netgroup == 3) {
                          return (
                            '<span style="color:#E07D3B">' +
                            anychart.format.number(
                              datesarray[pointDateString]["comm_current_w"],
                              NUMBER_FORMAT1_italic
                            ) +
                            "</span>"
                          );
                        } else if (temp_netgroup == 4) {
                          return (
                            '<span style="color:#89BCF1">' +
                            anychart.format.number(
                              datesarray[pointDateString]["noncomm_current_w"],
                              NUMBER_FORMAT1_italic
                            ) +
                            "</span>"
                          );
                        } else if (temp_netgroup == 5) {
                          return (
                            '<span style="color:#9eb0ba">' +
                            anychart.format.number(
                              datesarray[pointDateString]["nonrep_current_w"],
                              NUMBER_FORMAT1_italic
                            ) +
                            "</span>"
                          );
                        } else {
                          return "";
                        }
                      } else {
                        return "";
                      }
                    }
                  });
                series.labels().zIndex(99999999);
              }
              series.risingStroke(function() {
                if (this.x) {
                  var pointDate = new Date(this.x);
                  var month =
                    String(pointDate.getMonth() + 1) < 10
                      ? "0" + String(pointDate.getMonth() + 1)
                      : String(pointDate.getMonth() + 1);
                  var pointDateString =
                    String(pointDate.getFullYear()) +
                    "-" +
                    month +
                    "-" +
                    String(
                      pointDate.getDate() < 10
                        ? "0" + pointDate.getDate()
                        : pointDate.getDate()
                    );
                  var pointDateString1 =
                    String(
                      pointDate.getDate() < 10
                        ? "0" + pointDate.getDate()
                        : pointDate.getDate()
                    ) +
                    "-" +
                    month +
                    "-" +
                    String(pointDate.getFullYear());
                  var tempcolor = "";
                  if (datesarray[pointDateString]) {
                    tempcolor = highlightColor;
                  }
                  if (tempcolor != "") {
                    return tempcolor;
                  }
                  // if (greydate == pointDateString || greydate == pointDateString1) {
                  //   return '#D546A6'
                  // }
                }
                if (temp_this.state.series == "ohlc") {
                  return "2 " + risingColor;
                }
                if (temp_this.state.series == "candlestick") {
                  return "1 " + highlightColor;
                }
                return risingColor;
                // return '#64b5f6'
              });
              series.risingFill(function() {
                if (this.x) {
                  var pointDate = new Date(this.x);
                  var month =
                    String(pointDate.getMonth() + 1) < 10
                      ? "0" + String(pointDate.getMonth() + 1)
                      : String(pointDate.getMonth() + 1);
                  var pointDateString =
                    String(pointDate.getFullYear()) +
                    "-" +
                    month +
                    "-" +
                    String(
                      pointDate.getDate() < 10
                        ? "0" + pointDate.getDate()
                        : pointDate.getDate()
                    );
                  var pointDateString1 =
                    String(
                      pointDate.getDate() < 10
                        ? "0" + pointDate.getDate()
                        : pointDate.getDate()
                    ) +
                    "-" +
                    month +
                    "-" +
                    String(pointDate.getFullYear());
                  if (datesarray[pointDateString]) {
                    return highlightColor;
                  }
                  // if (greydate == pointDateString || greydate == pointDateString1) {
                  //   return '#D546A6'
                  // }
                }
                return risingColor;
                // return '#64b5f6'
              });

              series.fallingStroke(function() {
                if (this.x) {
                  var pointDate = new Date(this.x);
                  var month =
                    String(pointDate.getMonth() + 1) < 10
                      ? "0" + String(pointDate.getMonth() + 1)
                      : String(pointDate.getMonth() + 1);
                  var pointDateString =
                    String(pointDate.getFullYear()) +
                    "-" +
                    month +
                    "-" +
                    String(
                      pointDate.getDate() < 10
                        ? "0" + pointDate.getDate()
                        : pointDate.getDate()
                    );
                  var pointDateString1 =
                    String(
                      pointDate.getDate() < 10
                        ? "0" + pointDate.getDate()
                        : pointDate.getDate()
                    ) +
                    "-" +
                    month +
                    "-" +
                    String(pointDate.getFullYear());
                  if (datesarray[pointDateString]) {
                    return highlightColor;
                  }
                  // if (greydate == pointDateString || greydate == pointDateString1) {
                  //   return '#D546A6'
                  // }
                }
                if (temp_this.state.series == "ohlc") {
                  return "2 " + fallingColor;
                }
                if (temp_this.state.series == "candlestick") {
                  return "1 " + highlightColor;
                }
                return fallingColor;
                // return '#ef6c00'
              });
              series.fallingFill(function() {
                if (this.x) {
                  var pointDate = new Date(this.x);
                  var month =
                    String(pointDate.getMonth() + 1) < 10
                      ? "0" + String(pointDate.getMonth() + 1)
                      : String(pointDate.getMonth() + 1);
                  var pointDateString =
                    String(pointDate.getFullYear()) +
                    "-" +
                    month +
                    "-" +
                    String(
                      pointDate.getDate() < 10
                        ? "0" + pointDate.getDate()
                        : pointDate.getDate()
                    );
                  var pointDateString1 =
                    String(
                      pointDate.getDate() < 10
                        ? "0" + pointDate.getDate()
                        : pointDate.getDate()
                    ) +
                    "-" +
                    month +
                    "-" +
                    String(pointDate.getFullYear());
                  if (datesarray[pointDateString]) {
                    return highlightColor;
                  }
                  // if (greydate == pointDateString || greydate == pointDateString1) {
                  //   return '#D546A6'
                  // }
                }
                return fallingColor;
                // return '#ef6c00'
              });
              // }
            }
          }
        }
        firstPlot
          .yAxis()
          .labels()
          .fontColor(charttext);
        firstPlot.legend().fontColor(charttext);
        chart
          .scroller()
          .xAxis()
          .labels()
          .fontColor(charttext);
        chart
          .scroller()
          .xAxis()
          .minorLabels()
          .fontColor(charttext);
        firstPlot
          .xAxis()
          .minorLabels()
          .fontColor(charttext);
        firstPlot
          .xAxis()
          .labels()
          .fontColor(charttext);
        var controller = firstPlot.annotations();

        chart.listen("annotationSelect", function(e) {
          console.log("asplchange", e.annotation);
          selectedDrawing = e.annotation;
        });
        chart.listen("annotationDrawingFinish", (e) => {
          // console.log('asplv1',verticalLine);
          if (verticalLine == true) {
            vertical_anchor = e.annotation.xAnchor();
            // console.log('aspl1',vertical_anchor);
            // console.log('aspllll',e);
            var dynamic_line = controller.verticalLine({
              xAnchor: vertical_anchor,
              allowEdit: false,
              color: "2 " + this.state.drawingColor,
            });
            // dynamic_line.normal().stroke(this.state.drawingColor,1.5,0.5);
            dynamic_line
              .normal()
              .stroke("2 " + this.state.drawingColor + " 0.5");
            dynamic_line.zIndex(0);
            if (
              cotdataArray.length == 0 &&
              this.props.sapratetechnicalindicator.length == 0
            ) {
              // console.log('aspll1');
              // verticalLine = false;
              this.addVerticalLine(chart);
            }
          }
          drawingArray["price"] = firstPlot.annotations().toJson();
          this.props.drawingArray["price"] = firstPlot.annotations().toJson();
          if (this.props.savestatus1) {
            this.props.savestatus(false);
          }
          this.deactivateDrawing();
        });
        chart.listen("annotationChangeFinish", (e) => {
          drawingArray["price"] = firstPlot.annotations().toJson();
          this.props.drawingArray["price"] = firstPlot.annotations().toJson();
          if (this.props.savestatus1) {
            this.props.savestatus(false);
          }
          // console.log('asplrohan',drawingArray);
        });
        chart.listen("selectedrangechangefinish", (e) => {
          var startRatio = anychart.format.dateTime(
            e.firstSelected,
            "dd MMM yyyy"
          );
          var startdate = anychart.format.dateTime(
            e.firstSelected,
            "yyyy-MM-dd"
          );
          var endRatio = anychart.format.dateTime(
            e.lastSelected,
            "dd MMM yyyy"
          );
          enddate = anychart.format.dateTime(e.lastSelected, "yyyy-MM-dd");
          this.setState({
            enddate: enddate,
            startdate: startdate,
          });
          // this.props.scrollData.start = startRatio;
          // this.props.scrollData.end = endRatio;
          var data = { start: startdate, end: enddate };
          // var data = { start : startRatio, end : endRatio};
          this.props.changeScroller(data);
        });
        chart.listen("selectedrangechange", (e) => {
          // console.log('asplsc',e.source);
          if (e.source == "select-range") {
            // console.log('asplsource',e.source);
            var startRatio = anychart.format.dateTime(
              e.firstSelected,
              "dd MMM yyyy"
            );
            var startdate = anychart.format.dateTime(
              e.firstSelected,
              "yyyy-MM-dd"
            );
            var endRatio = anychart.format.dateTime(
              e.lastSelected,
              "dd MMM yyyy"
            );
            enddate = anychart.format.dateTime(e.lastSelected, "yyyy-MM-dd");
            // console.log('asplendratio',endRatio);
            // console.log('asplenddate',enddate);

            this.setState({
              enddate: enddate,
              startdate: startdate,
            });
            // var data = { start : startRatio, end : endRatio};
            var data = { start: startdate, end: enddate };
            // this.props.scrollData.start = startRatio;
            // this.props.scrollData.end = endRatio;
            this.props.changeScroller(data);
          }
        });
        firstPlot.legend().listen("legendItemClick", function(e) {
          var series = firstPlot.getSeriesAt(e.itemIndex);
          var sname = series.name();
          var isEnabled = series.enabled();
          if (seriesArray["price"]) {
            if (seriesArray["price"].includes(sname)) {
              var temp_index = seriesArray["price"].indexOf(sname);
              if (temp_index !== -1) seriesArray["price"].splice(temp_index, 1);
            } else {
              seriesArray["price"].push(sname);
            }
          } else {
            seriesArray["price"] = [];
            seriesArray["price"].push(sname);
          }
          console.log("asplseries", seriesArray);
        });
        if (seriesArray["price"]) {
          if (seriesArray["price"].includes(short_desc)) {
            series.enabled(false);
          }
          if (seriesArray["price"].includes("Volume")) {
            volumeSeries.enabled(false);
          }
        }
        enddate =
          this.state.enddate != "" ? this.state.enddate : verticalline_date;

        if (this.state.gridstate) {
          firstPlot.xGrid().enabled(true);
          firstPlot.xMinorGrid().enabled(true);
          firstPlot.xMinorGrid().stroke({
            // set stroke color
            color: gridColor,
            // set dashes and gaps length
            dash: "2 5",
          });
          firstPlot.xGrid().stroke({
            // set stroke color
            color: gridColor,
            // set dashes and gaps length
            dash: "2 5",
          });
          firstPlot.yGrid().enabled(true);
          firstPlot.yGrid().stroke({
            // set stroke color
            color: gridColor,
            // set dashes and gaps length
            dash: "2 5",
          });
        }
        // chart.crosshair(false);
        if (this.state.addvisible) {
          // volumePlot.enabled(true);
          //chart.background().fill("#ffffff");
        }
        if (theme == "coffee") {
          firstPlot.palette(anychart.palettes.coffee);
        }
        if (this.props.scrollData != "") {
          chart.selectRange(
            this.props.scrollData.start,
            this.props.scrollData.end
          );
          // chart.selectRange(this.state.startdate, this.state.enddate);
        } else {
          chart.listenOnce("chartDraw", function() {
            chart.selectRange("month", 6, "last-date", true);
          });
        }
        chart.listenOnce("chartDraw", function() {
          if (
            document.getElementById("rangeselectorContainer") != null ||
            document.getElementById("rangepickerContainer") != null
          ) {
            var isEmpty =
              document.getElementById("rangeselectorContainer").innerHTML ===
              "";
            if (isEmpty) {
              rangeSelector.target(chart);
              rangePicker.target(chart);
              rangeSelector.render(
                document.getElementById("rangeselectorContainer")
              );
              rangePicker.render(
                document.getElementById("rangepickerContainer")
              );
            }
          }
        });
        var pointDateString = "";
        var value = "";

        var xScale = chart.xScale();

        var j_cot = 1;
        if (this.props.graphdata != "" || cotdataArray.length > 0) {
          if (this.props.clearcotstatus.status) {
            cotdataArray = [];
            this.props.clearcotstatus.status = false;
          }
          if (this.props.graphdata.length != "") {
            // cotdataArray = [];
            cotdataArray.push(this.props.graphdata);
            this.props.clearData();
          }
          // height = cotdataArray.length * 180;
          var series;
          cotmenu = [];
          var ctimenu = [];
          var i = 1;
          var type_cot = "";
          var chart_id_cot = "";
          var ticker_id_cot = "";
          var cotnameArray = [];
          var cotLength = cotdataArray.length;
          cotdataArray.map((firstkey, mainitem) => {
            // console.log('asplrohan',firstkey);
            // console.log('asplrohan1',mainitem);
            var seriesstate = "series_" + i;
            var series_cot;
            var secondPlot = chart.plot(j_cot);
            var cot_mapping = "";
            var test = 1;
            cotnameArray.push(firstkey["ciname"]);
            var cot_count = this.getOccurrence(
              cotnameArray,
              firstkey["ciname"]
            );
            type_cot = firstkey["type"];
            if (type_cot == "dynamic") {
              var plot_name =
                firstkey["ciname"] +
                "(" +
                firstkey["week"] +
                ")" +
                " #" +
                cot_count;
            } else {
              var plot_name = firstkey["ciname"] + " #" + cot_count;
            }
            var series_count = Object.keys(firstkey[0]).length;
            Object.keys(firstkey[0]).map((item, key) => {
              firstkey[0][item].sort(function(a, b) {
                return (
                  new Date(a["date"]).getTime() - new Date(b["date"]).getTime()
                );
              });
              var length = firstkey[0][item].length;
              var last_date = firstkey[0][item][length - 1]["date"];
              cot_first_date = firstkey[0][item][0]["date"];
              type_cot = firstkey["type"];
              chart_id_cot = firstkey[0][item][0]["graphid"];
              ticker_id_cot = firstkey[0][item][0]["ticker_id"];
              var cotDataTable12 = anychart.data.table("date");
              cotDataTable12.addData(firstkey[0][item]);

              var zeroLine = secondPlot.lineMarker();
              zeroLine.value(0);
              zeroLine.stroke("1.5 grey");
              secondPlot.title(plot_name);
              // secondPlot.height(parseInt(60)/parseInt(parseInt(cotdataArray.length) + parseInt(this.state.sapratetechnicalindicator.length))+'%');
              secondPlot.height("240px");
              if (this.state.increaseheight) {
                secondPlot.height("288px");
              }
              secondPlot
                .yAxis()
                .labels()
                .fontColor(charttext);
              secondPlot.legend().fontColor(charttext);
              secondPlot
                .xAxis()
                .minorLabels()
                .fontColor(charttext);
              secondPlot
                .xAxis()
                .labels()
                .fontColor(charttext);
              var series_cot = secondPlot.spline(
                cotDataTable12.mapAs({ value: "calculation" })
              );
              series_cot.connectMissingPoints(true);
              series_cot.zIndex(10);
              cot_mapping = cotDataTable12.mapAs({ value: "calculation" });
              var selectable1 = cot_mapping.createSelectable();
              series_cot.name(item);
              if (type_cot == "spread") {
                var w_mapping = cotDataTable12.mapAs({ value: "w" });
                var wSeries = secondPlot.line(w_mapping);
                var customScale1 = anychart.scales.linear();
                // sets y-scale
                wSeries.yScale(customScale1);
                wSeries.name("W " + item);
                // wSeries.stroke('#E1C699',1.5);
                wSeries.connectMissingPoints(true);
              }
              secondPlot
                .yAxis()
                .labels()
                .format(function() {
                  return anychart.format.number(this.value, NUMBER_FORMAT);
                });
              ctimenu = [];
              drawingArray_temp[j_cot] = firstkey["unique_ciname"];
              if (this.props.cottechnicalindicator[firstkey["unique_ciname"]]) {
                this.props.cottechnicalindicator[firstkey["unique_ciname"]].map(
                  (item1, index) => {
                    if (item1 != null) {
                      var arg_data = item1;
                      var ctiname = "";
                      if (arg_data[0] == "oi") {
                        console.log("oi");
                        var oiSeries = secondPlot.line(oi_mapping);
                        var customScale1 = anychart.scales.linear();
                        // sets y-scale
                        oiSeries.yScale(customScale1);
                        oiSeries.name("Open Interest");
                        oiSeries.stroke(palette[9], 1.5);
                        oiSeries.connectMissingPoints(true);
                        ctiname = arg_data[1];
                        secondPlot.yAxis(1).orientation("right");
                        secondPlot.yAxis(1).scale(customScale1);
                        secondPlot
                          .yAxis(1)
                          .labels()
                          .format(function() {
                            return anychart.format.number(
                              this.value,
                              NUMBER_FORMAT
                            );
                          });
                        secondPlot
                          .yAxis(1)
                          .labels()
                          .fontColor(charttext);
                        // secondPlot.bbands(mapping);
                      }
                      if (arg_data[0] == "oicf") {
                        console.log("oicf");
                        if (this.props.oiData.length > 0) {
                          if (this.props.oiData[0] != "") {
                            var oiDataTable1 = anychart.data.table("date");
                            oiDataTable1.addData(
                              this.props.oiData[0]["future"]
                            );
                            oi_mapping1 = oiDataTable1.mapAs({
                              value: "cot_oi",
                            });
                            // oiname = "OI COT";
                            var oiSeries = secondPlot.line(oi_mapping1);
                            var customScale1 = anychart.scales.linear();
                            // sets y-scale
                            oiSeries.yScale(customScale1);
                            oiSeries.name("Open Interest Cot Future");
                            oiSeries.stroke(palette[9], 1.5);
                            oiSeries.connectMissingPoints(true);
                            ctiname = arg_data[1];
                            secondPlot.yAxis(1).orientation("right");
                            secondPlot.yAxis(1).scale(customScale1);
                            secondPlot
                              .yAxis(1)
                              .labels()
                              .format(function() {
                                return anychart.format.number(
                                  this.value,
                                  NUMBER_FORMAT
                                );
                              });
                            secondPlot
                              .yAxis(1)
                              .labels()
                              .fontColor(charttext);
                            // secondPlot.bbands(mapping);
                          }
                        }
                      }
                      if (arg_data[0] == "oisf") {
                        console.log("oisf");
                        if (this.props.oiData.length > 0) {
                          if (this.props.oiData[0] != "") {
                            var oiDataTable1 = anychart.data.table("date");
                            oiDataTable1.addData(
                              this.props.oiData[0]["future"]
                            );
                            var oi_mapping1 = oiDataTable1.mapAs({
                              value: "spread",
                            });
                            // oiname = "OI COT";
                            var oiSeries = secondPlot.line(oi_mapping1);
                            var customScale1 = anychart.scales.linear();
                            // sets y-scale
                            oiSeries.yScale(customScale1);
                            oiSeries.name("Open Interest Spread Future");
                            oiSeries.stroke(palette[9], 1.5);
                            oiSeries.connectMissingPoints(true);
                            ctiname = arg_data[1];
                            secondPlot.yAxis(1).orientation("right");
                            secondPlot.yAxis(1).scale(customScale1);
                            secondPlot
                              .yAxis(1)
                              .labels()
                              .format(function() {
                                return anychart.format.number(
                                  this.value,
                                  NUMBER_FORMAT
                                );
                              });
                            secondPlot
                              .yAxis(1)
                              .labels()
                              .fontColor(charttext);
                            // secondPlot.bbands(mapping);
                          }
                        }
                      }
                      if (arg_data[0] == "bbands") {
                        var bBandsIndicator = secondPlot.bbands(
                          cot_mapping,
                          arg_data[1],
                          arg_data[2],
                          arg_data[3],
                          arg_data[4],
                          arg_data[5]
                        );
                        bBandsIndicator.upperSeries().stroke("1.5 #e5a919");
                        bBandsIndicator.middleSeries().stroke("1.5 #e5a919");
                        bBandsIndicator.lowerSeries().stroke("1.5 #e5a919");
                        bBandsIndicator.rangeSeries().fill("white 0");

                        bBandsIndicator
                          .lowerSeries()
                          .connectMissingPoints(true);
                        bBandsIndicator
                          .middleSeries()
                          .connectMissingPoints(true);
                        bBandsIndicator
                          .upperSeries()
                          .connectMissingPoints(true);
                        bBandsIndicator
                          .rangeSeries()
                          .connectMissingPoints(true);
                        ctiname = arg_data[6];
                        var customScale = anychart.scales.linear();
                        bBandsIndicator.lowerSeries().yScale(customScale);
                        bBandsIndicator.middleSeries().yScale(customScale);
                        bBandsIndicator.upperSeries().yScale(customScale);
                        bBandsIndicator.rangeSeries().yScale(customScale);
                        secondPlot.yAxis(1).orientation("right");
                        secondPlot.yAxis(1).scale(customScale);
                        secondPlot
                          .yAxis(1)
                          .labels()
                          .format(function() {
                            return anychart.format.number(
                              this.value,
                              NUMBER_FORMAT
                            );
                          });
                        secondPlot
                          .yAxis(1)
                          .labels()
                          .fontColor(charttext);
                        // secondPlot.bbands(mapping);
                      }
                      if (arg_data[0] == "stochastic") {
                        // console.log('asplaa',)
                        var stochastic = secondPlot.stochastic(
                          cotDataTable12.mapAs({
                            high: "calculation",
                            low: "calculation",
                            close: "calculation",
                          }),
                          arg_data[1],
                          arg_data[2],
                          arg_data[3],
                          arg_data[4],
                          arg_data[5],
                          arg_data[6],
                          arg_data[7]
                        );
                        stochastic.kSeries().connectMissingPoints(true);
                        stochastic.dSeries().connectMissingPoints(true);
                        ctiname = arg_data[8];
                        var customScale = anychart.scales.linear();
                        stochastic.kSeries().yScale(customScale);
                        stochastic.dSeries().yScale(customScale);
                        secondPlot.yAxis(1).orientation("right");
                        secondPlot.yAxis(1).scale(customScale);
                        secondPlot
                          .yAxis(1)
                          .labels()
                          .format(function() {
                            return anychart.format.number(
                              this.value,
                              NUMBER_FORMAT
                            );
                          });
                        secondPlot
                          .yAxis(1)
                          .labels()
                          .fontColor(charttext);
                      }
                      if (arg_data[0] == "macd") {
                        var macd = secondPlot.macd(
                          cot_mapping,
                          arg_data[1],
                          arg_data[2],
                          arg_data[3],
                          arg_data[4],
                          arg_data[5],
                          arg_data[6]
                        );
                        macd.macdSeries().stroke("#bf360c");
                        macd.signalSeries().stroke("#ff6d00");
                        macd.histogramSeries().fill("#ffe082");

                        macd.macdSeries().connectMissingPoints(true);
                        macd.signalSeries().connectMissingPoints(true);
                        macd.histogramSeries().connectMissingPoints(true);
                        ctiname = arg_data[7];
                        var customScale = anychart.scales.linear();
                        macd.macdSeries().yScale(customScale);
                        macd.signalSeries().yScale(customScale);
                        macd.histogramSeries().yScale(customScale);
                        secondPlot.yAxis(1).orientation("right");
                        secondPlot.yAxis(1).scale(customScale);
                        secondPlot
                          .yAxis(1)
                          .labels()
                          .format(function() {
                            return anychart.format.number(
                              this.value,
                              NUMBER_FORMAT
                            );
                          });
                        secondPlot
                          .yAxis(1)
                          .labels()
                          .fontColor(charttext);
                        // if(seriesArray[firstkey['unique_ciname']])
                        // {
                        //   seriesArray[firstkey['unique_ciname']].push(item);
                        // }
                        // else{
                        //   seriesArray[firstkey['unique_ciname']] = [];
                        //   seriesArray[firstkey['unique_ciname']].push(item);
                        // }
                      }
                      if (
                        arg_data[0] == "rsi" ||
                        arg_data[0] == "sma" ||
                        arg_data[0] == "roc"
                      ) {
                        var indicator = secondPlot[arg_data[0]](
                          cot_mapping,
                          arg_data[1],
                          arg_data[2]
                        );
                        indicator.series().connectMissingPoints(true);
                        indicator.series().stroke("#ac4317");
                        ctiname = arg_data[3];
                        var customScale = anychart.scales.linear();
                        indicator.series().yScale(customScale);
                        secondPlot.yAxis(1).orientation("right");
                        secondPlot.yAxis(1).scale(customScale);
                        secondPlot
                          .yAxis(1)
                          .labels()
                          .format(function() {
                            return anychart.format.number(
                              this.value,
                              NUMBER_FORMAT
                            );
                          });
                      }
                      if (arg_data[0] == "sDev") {
                        if (this.props.sDev.length > 0) {
                          var sDevDataTable12 = anychart.data.table("date");
                          sDevDataTable12.addData(this.props.sDev[0]);
                          var sDevmap = sDevDataTable12.mapAs({
                            value: "value",
                          });
                          var sDevSeries = secondPlot.line(sDevmap);
                          sDevSeries.seriesType(arg_data[1]);
                          sDevSeries.stroke("2 #ce93d8");
                          sDevSeries.name("Standard Deviation");
                          var customScale1 = anychart.scales.linear();
                          secondPlot.yAxis(1).orientation("right");
                          secondPlot.yAxis(1).scale(customScale1);
                          sDevSeries.yScale(customScale1);
                          ctiname = arg_data[2];
                        }
                      }
                      if (arg_data[0] == "adx") {
                        if (this.props.adx.length > 0) {
                          var adxDataTable12 = anychart.data.table("date");
                          adxDataTable12.addData(this.props.adx[0]);
                          var adxmap = adxDataTable12.mapAs({ value: "value" });
                          var adxSeries = secondPlot.line(adxmap);
                          adxSeries.seriesType(arg_data[1]);
                          adxSeries.stroke("2 #96246a");
                          adxSeries.name("Average Directional Movement Index");
                          var customScale1 = anychart.scales.linear();
                          secondPlot.yAxis(1).orientation("right");
                          secondPlot.yAxis(1).scale(customScale1);
                          adxSeries.yScale(customScale1);
                          ctiname = arg_data[2];
                        }
                      }
                      ctimenu.push(
                        <Menu.Item
                          onClick={() =>
                            this.removeCTI(firstkey["unique_ciname"], index)
                          }
                        >
                          {ctiname}
                        </Menu.Item>
                      );
                    }
                  }
                );
              }
              // series_cot.enabled(false);
              var strokeColor = "";
              var positiveColor = "";
              var negativeColor = "";
              if (
                item == "Commercial" ||
                item == "Dealer Intermediary" ||
                item == "Producer"
              ) {
                // series_cot.stroke("#ef6c00");
                series_cot.stroke("2 " + palette[2]);
                strokeColor = palette[2];
                positiveColor = "#E07D3B";
                negativeColor = "#D46820";
              }
              if (
                item == "Non-Commercial" ||
                item == "Leveraged Funds" ||
                item == "Managed Money"
              ) {
                // series_cot.stroke("#64b5f6");
                series_cot.stroke("2 " + palette[0]);
                strokeColor = palette[0];
                positiveColor = "#89BCF1";
                negativeColor = "#62A6ED";
              }
              if (
                item == "Non Reportable" ||
                item == "Non-Reportable" ||
                item == "Non-Reportable"
              ) {
                // series_cot.stroke("#455a64");
                series_cot.stroke("2 " + palette[5]);
                strokeColor = palette[5];
                positiveColor = "#536570";
                negativeColor = "#404E56";
              }
              if (
                item == "Swap Dealers" ||
                item == "Asset Manager / Institutional"
              ) {
                // series_cot.stroke("#ffd54f");
                series_cot.stroke("2 " + palette[8]);
                strokeColor = palette[8];
                positiveColor = "#FAE397";
                negativeColor = "#F5C936";
              }
              if (item == "Others") {
                // series_cot.stroke("#9EDDA5");
                series_cot.stroke("2 " + palette[4]);
                strokeColor = palette[4];
                positiveColor = "#BAE1C5";
                negativeColor = "#5FA868";
              }
              if (item == "OI" || item == "OI NON SPREADING") {
                series_cot.stroke("2 " + palette[9]);
                // series_cot.stroke("#E1C699");
                strokeColor = palette[9];
                positiveColor = "#BAE1C5";
                negativeColor = "#5FA868";
              }
              if (this.props.scrollData != "") {
                chart.selectRange(
                  this.props.scrollData.start,
                  this.props.scrollData.end
                );
                // chart.selectRange(this.state.startdate, this.state.enddate);
              }

              if (this.props.cotforecast.status) {
                if (this.props.cotforecast.type == 1) {
                  if (firstkey["ciname"] == "LEG Net Position Future") {
                    if (firstkey["CF_NET1"] && firstkey["CF_NET1"].length > 0) {
                      var cotFDataTable12 = anychart.data.table("date");
                      cotFDataTable12.addData(firstkey["CF_NET1"]);
                      if (item == "Commercial") {
                        var CFseries = secondPlot.stepLine(
                          cotFDataTable12.mapAs({ value: "comm_net" })
                        );
                        CFseries.name("Commercial Forecast");
                      }
                      if (item == "Non-Commercial") {
                        var CFseries = secondPlot.stepLine(
                          cotFDataTable12.mapAs({ value: "non_comm_net" })
                        );
                        CFseries.name("Non-Commercial Forecast");
                      }
                      if (item == "Non Reportable") {
                        var CFseries = secondPlot.stepLine(
                          cotFDataTable12.mapAs({ value: "nonrep_net" })
                        );
                        CFseries.name("Non Reportable Forecast");
                      }
                      CFseries.stroke({ color: strokeColor, thickness: 3 });
                      // CFseries.stroke({'color':strokeColor,'thickness':4,'dash':'5 3'});
                      CFseries.connectMissingPoints(true);
                    }
                  }
                }
                if (this.props.cotforecast.type == 2) {
                  if (firstkey["ciname"] == "LEG Net Position Future") {
                    if (firstkey["CF_NET2"] && firstkey["CF_NET2"].length > 0) {
                      // console.log('asplcot2',firstkey['CF_NET2']);
                      var cotFDataTable12 = anychart.data.table("date");
                      cotFDataTable12.addData(firstkey["CF_NET2"]);
                      if (item == "Commercial") {
                        var CFseries = secondPlot.stepLine(
                          cotFDataTable12.mapAs({ value: "comm_net" })
                        );
                        CFseries.name("Commercial Forecast");
                      }
                      if (item == "Non-Commercial") {
                        var CFseries = secondPlot.stepLine(
                          cotFDataTable12.mapAs({ value: "non_comm_net" })
                        );
                        CFseries.name("Non-Commercial Forecast");
                      }
                      if (item == "Non Reportable") {
                        var CFseries = secondPlot.stepLine(
                          cotFDataTable12.mapAs({ value: "nonrep_net" })
                        );
                        CFseries.name("Non Reportable Forecast");
                      }
                      // CFseries.stroke({'color':strokeColor,'thickness':3});
                      CFseries.stroke({ thickness: 3 });
                      // CFseries.stroke({'color':strokeColor,'thickness':4,'dash':'5 3'});
                      CFseries.connectMissingPoints(true);
                    }
                  }
                }
              }
              var controller2 = secondPlot.annotations();
              chart.listen("annotationDrawingFinish", (e) => {
                // console.log('asplv2',verticalLine);
                if (verticalLine == true) {
                  var vertical_anchor1 = e.annotation.xAnchor();
                  // console.log('asplr',vertical_anchor);
                  var dynamic_line = controller2.verticalLine({
                    xAnchor: vertical_anchor1,
                    allowEdit: false,
                    color: "2 " + this.state.drawingColor,
                  });
                  // dynamic_line.normal().stroke(this.state.drawingColor,1.5,0.5);
                  dynamic_line
                    .normal()
                    .stroke("2 " + this.state.drawingColor + " 0.5");
                  dynamic_line.zIndex(0);
                  // console.log('asplv2',cotLength);
                  // console.log('asplv2',mainitem+1);
                  // console.log('asplv21',this.props.sapratetechnicalindicator.length);
                  if (cotLength == mainitem + 1) {
                    // console.log('asplasplasplaspl');
                    this.addVerticalLine(chart);
                    // verticalLine = false;
                    // chart.annotations().startDrawing({'type':'vertical-line','allowEdit':false,'stroke':"1.5 "+this.state.drawingColor+" 0.5"});
                  }
                  // console.log('aspllll1',e);
                }
                drawingArray[
                  firstkey["unique_ciname"]
                ] = secondPlot.annotations().toJson();
                this.props.drawingArray[
                  firstkey["unique_ciname"]
                ] = secondPlot.annotations().toJson();
                if (this.props.savestatus1) {
                  this.props.savestatus(false);
                }
              });
              chart.listen("annotationChangeFinish", (e) => {
                drawingArray[
                  firstkey["unique_ciname"]
                ] = secondPlot.annotations().toJson();
                this.props.drawingArray[
                  firstkey["unique_ciname"]
                ] = secondPlot.annotations().toJson();
                if (this.props.savestatus1) {
                  this.props.savestatus(false);
                }
                // console.log('asplrohan',drawingArray);
              });
              if (this.props.drawingArray[firstkey["unique_ciname"]]) {
                secondPlot
                  .annotations()
                  .fromJson(this.props.drawingArray[firstkey["unique_ciname"]]);
              }
              if (index_array.includes(firstkey["ciname"])) {
                // series_cot.seriesType('column');
                // secondPlot.baseline(50);
                secondPlot.yScale().maximum(100);
                // secondPlot.yScale().minimum(0);
                secondPlot
                  .yAxis()
                  .labels()
                  .format(function() {
                    return this.value + "%";
                  });
                // series_cot.normal().stroke({'color':palette[7],'dash':'2 2','thickness':'2'});
                var zeroLine = secondPlot.lineMarker();
                zeroLine.value(75);
                zeroLine.stroke("1.5 grey");
                var zeroLine1 = secondPlot.lineMarker(1);
                zeroLine1.value(25);
                zeroLine1.stroke("1.5 grey");
                series_cot.stroke(function() {
                  if (this.value >= 75) {
                    return { color: "green", thickness: "2" };
                  } else if (this.value <= 25) {
                    return { color: "red", thickness: "2" };
                  } else {
                    return { color: strokeColor, thickness: "2" };
                  }
                });
                // series_cot.negativeFill(negativeColor+' .3');
                // series_cot.negativeStroke(strokeColor);
                // series_cot.stroke(strokeColor);
                // series_cot.fill(positiveColor+' .3');

                // var annotation = secondPlot.annotations();
                // console.log('asplf',first_date);
                // console.log('asplf1',cot_first_date);
                // controller2.trendChannel({
                //   xAnchor: cot_first_date,
                //   valueAnchor: 75,
                //   secondXAnchor: verticalline_date,
                //   secondValueAnchor: 75,
                //   thirdXAnchor: verticalline_date,
                //   thirdValueAnchor: 25,
                //   stroke: '1 '+strokeColor,
                //   fill: strokeColor+' 0.10',
                //   zIndex: 0
                // }).allowEdit(false);
                // controller2.zIndex(0);
              }
              if (mov_index_array.includes(firstkey["ciname"])) {
                // series_cot.seriesType('column');
                // secondPlot.baseline(50);
                secondPlot.yScale().minimum(-100);
                secondPlot.yScale().maximum(100);
                secondPlot
                  .yAxis()
                  .labels()
                  .format(function() {
                    return this.value + "%";
                  });
                // series_cot.negativeFill(negativeColor+' .3');
                // series_cot.negativeStroke(strokeColor);
                // series_cot.stroke(strokeColor);
                // series_cot.fill(positiveColor+' .3');
                var zeroLine = secondPlot.lineMarker();
                zeroLine.value(75);
                zeroLine.stroke("1.5 grey");
                var zeroLine1 = secondPlot.lineMarker(1);
                zeroLine1.value(-75);
                zeroLine1.stroke("1.5 grey");
                series_cot.stroke(function() {
                  if (this.value >= 75) {
                    return { color: "green", thickness: "2" };
                  } else if (this.value <= -75) {
                    return { color: "red", thickness: "2" };
                  } else {
                    return { color: strokeColor, thickness: "2" };
                  }
                });
                // var annotation = secondPlot.annotations();
                // // console.log('asplf',first_date);
                // // console.log('asplf1',cot_first_date);
                // annotation.trendChannel({
                //   xAnchor: cot_first_date,
                //   valueAnchor: 50,
                //   secondXAnchor: verticalline_date,
                //   secondValueAnchor: 50,
                //   thirdXAnchor: verticalline_date,
                //   thirdValueAnchor: -50,
                //   stroke: '1 '+strokeColor,
                //   fill: strokeColor+' 0.10',
                //   zIndex: 0
                // }).allowEdit(false);
                // annotation.zIndex(0);
              }
              if (type_cot == "spread") {
                wSeries.stroke({ color: strokeColor, dash: "2 2" });
              }
              if (type_cot == "spread" || type_cot == "weighted") {
                secondPlot
                  .crosshair()
                  .yLabel()
                  .format(function() {
                    // return Math.round(this.value) + " $";
                    return anychart.format.number(this.value, NUMBER_FORMAT1);
                  });
              }
              if (item == "OI NON SPREADING") {
                series_cot.stroke({ color: "2 #c47b01" });
              }
              if (item == "OI Spread") {
                series_cot.stroke({ color: "2 #c47b01" });
              }
              if (this.state[seriesstate]) {
                // var series =  this.state[seriesstate];
                series_cot.seriesType(this.state[seriesstate]);
                if (this.state[seriesstate] == "stepLine") {
                  // series_cot.stepDirection("forward");
                  if (type_cot == "spread") {
                    wSeries.stepDirection("backward");
                  }
                }
                if (this.state[seriesstate] == "column") {
                  series_cot.fill(strokeColor);
                }
                if (index_array.includes(firstkey["ciname"])) {
                  series_cot.seriesType(this.state[seriesstate]);
                  // secondPlot.baseline(50);
                  secondPlot.yScale().maximum(100);
                  secondPlot
                    .yAxis()
                    .labels()
                    .format(function() {
                      return this.value + "%";
                    });
                  var zeroLine = secondPlot.lineMarker();
                  zeroLine.value(75);
                  zeroLine.stroke("1.5 grey");
                  var zeroLine1 = secondPlot.lineMarker(1);
                  zeroLine1.value(25);
                  zeroLine1.stroke("1.5 grey");
                  series_cot.stroke(function() {
                    if (this.value >= 75) {
                      return { color: "green", thickness: "2" };
                    } else if (this.value <= 25) {
                      return { color: "red", thickness: "2" };
                    } else {
                      return { color: strokeColor, thickness: "2" };
                    }
                  });
                }
                if (mov_index_array.includes(firstkey["ciname"])) {
                  series_cot.seriesType(this.state[seriesstate]);
                  // secondPlot.baseline(50);
                  secondPlot.yScale().minimum(-100);
                  secondPlot.yScale().maximum(100);
                  secondPlot
                    .yAxis()
                    .labels()
                    .format(function() {
                      return this.value + "%";
                    });
                  var zeroLine = secondPlot.lineMarker();
                  zeroLine.value(75);
                  zeroLine.stroke("1.5 grey");
                  var zeroLine1 = secondPlot.lineMarker(1);
                  zeroLine1.value(-75);
                  zeroLine1.stroke("1.5 grey");
                  series_cot.stroke(function() {
                    if (this.value >= 75) {
                      return { color: "green", thickness: "2" };
                    } else if (this.value <= -75) {
                      return { color: "red", thickness: "2" };
                    } else {
                      return { color: strokeColor, thickness: "2" };
                    }
                  });
                }
              }
              if (this.state.gridstate) {
                secondPlot.xMinorGrid().enabled(true);
                secondPlot.xMinorGrid().stroke({
                  // set stroke color
                  color: gridColor,
                  // set dashes and gaps length
                  dash: "2 5",
                });
                secondPlot.xMinorGrid().zIndex(0);
                secondPlot.xGrid().enabled(true);
                secondPlot.xGrid().stroke({
                  // set stroke color
                  color: gridColor,
                  // set dashes and gaps length
                  dash: "2 5",
                });
                secondPlot.xGrid().zIndex(0);
                secondPlot.yGrid().enabled(true);
                secondPlot.yGrid().stroke({
                  // set stroke color
                  color: gridColor,
                  // set dashes and gaps length
                  dash: "2 5",
                });
                secondPlot.yGrid().zIndex(0);
              }
              secondPlot.legend().listen("legendItemClick", function(e) {
                if (e.itemIndex != 0) {
                  var series = secondPlot.getSeriesAt(e.itemIndex);
                  var sname = series.name();
                  var isEnabled = series.enabled();
                  if (seriesArray[firstkey["unique_ciname"]]) {
                    if (
                      seriesArray[firstkey["unique_ciname"]].includes(sname)
                    ) {
                      var temp_index = seriesArray[
                        firstkey["unique_ciname"]
                      ].indexOf(sname);
                      if (temp_index !== -1)
                        seriesArray[firstkey["unique_ciname"]].splice(
                          temp_index,
                          1
                        );
                    } else {
                      seriesArray[firstkey["unique_ciname"]].push(sname);
                    }
                  } else {
                    seriesArray[firstkey["unique_ciname"]] = [];
                    seriesArray[firstkey["unique_ciname"]].push(sname);
                  }
                  // console.log('asplseries',seriesArray);
                }
              });
              if (seriesArray[firstkey["unique_ciname"]]) {
                if (seriesArray[firstkey["unique_ciname"]].includes(item)) {
                  // console.log('aspls',item)
                  series_cot.enabled(false);
                }
              }
              // chart.plot(j_cot).momentum(cotDataTable12.mapAs({'value': 'calculation'}));

              test++;
            });

            cotmenu.push(
              <SubMenu title={<span> {plot_name} </span>}>
                <SubMenu
                  className="gx-menu-horizontal"
                  title={<span>Chart Type</span>}
                >
                  <Menu.Item
                    onClick={() =>
                      this.chartchangecot(series_cot, "stepLine", seriesstate)
                    }
                  >
                    Step Line
                  </Menu.Item>
                  <Menu.Item
                    onClick={() =>
                      this.chartchangecot(series_cot, "line", seriesstate)
                    }
                  >
                    Line
                  </Menu.Item>
                  <Menu.Item
                    onClick={() =>
                      this.chartchangecot(series_cot, "spline", seriesstate)
                    }
                  >
                    Spline
                  </Menu.Item>
                  {/* {index_array.includes(firstkey['ciname'])?
                      <Menu.Item onClick={() => this.chartchangecot(series_cot,'area',seriesstate)}>Area</Menu.Item>:null}
                      {series_count==1?<Menu.Item onClick={() => this.chartchangecot(series_cot,'column',seriesstate)}>Column</Menu.Item>:null} */}
                </SubMenu>
                {series_count == 1 ? (
                  <SubMenu
                    className="gx-menu-horizontal"
                    title={<span>Technical Indicators</span>}
                  >
                    <Menu.Item
                      key="adx"
                      onClick={() =>
                        this.showcottechnical(
                          "adx",
                          secondPlot,
                          cot_mapping,
                          firstkey["unique_ciname"]
                        )
                      }
                    >
                      Average Directional Movement Index (ADX)
                    </Menu.Item>
                    <Menu.Item
                      key="bbands"
                      onClick={() =>
                        this.showcottechnical(
                          "bbands",
                          secondPlot,
                          cot_mapping,
                          firstkey["unique_ciname"]
                        )
                      }
                    >
                      Bollinger Bands (BBands)
                    </Menu.Item>
                    <Menu.Item
                      key="macd"
                      onClick={() =>
                        this.showcottechnical(
                          "macd",
                          secondPlot,
                          cot_mapping,
                          firstkey["unique_ciname"]
                        )
                      }
                    >
                      Moving Average Convergence/Divergence (MACD){" "}
                    </Menu.Item>
                    <Menu.Item
                      key="oi"
                      onClick={() =>
                        this.showcottechnical(
                          "oi",
                          secondPlot,
                          cot_mapping,
                          firstkey["unique_ciname"]
                        )
                      }
                    >
                      Open Interest(OI){" "}
                    </Menu.Item>
                    {/* <Menu.Item key="roc" onClick={()=> this.showcottechnical('roc',secondPlot,cot_mapping,firstkey['unique_ciname'])}>Rate of Change (ROC) </Menu.Item> */}
                    <Menu.Item
                      key="rsi"
                      onClick={() =>
                        this.showcottechnical(
                          "rsi",
                          secondPlot,
                          cot_mapping,
                          firstkey["unique_ciname"]
                        )
                      }
                    >
                      Relative Strength Index (RSI){" "}
                    </Menu.Item>
                    <Menu.Item
                      key="sma"
                      onClick={() =>
                        this.showcottechnical(
                          "sma",
                          secondPlot,
                          cot_mapping,
                          firstkey["unique_ciname"]
                        )
                      }
                    >
                      Simple Moving Average (SMA){" "}
                    </Menu.Item>
                    <Menu.Item
                      key="sDev"
                      onClick={() =>
                        this.showcottechnical(
                          "sDev",
                          secondPlot,
                          cot_mapping,
                          firstkey["unique_ciname"]
                        )
                      }
                    >
                      Standard Deviation{" "}
                    </Menu.Item>
                    <Menu.Item
                      key="stochastic"
                      onClick={() =>
                        this.showcottechnical(
                          "stochastic",
                          secondPlot,
                          cot_mapping,
                          firstkey["unique_ciname"]
                        )
                      }
                    >
                      Stochastic Oscillator{" "}
                    </Menu.Item>
                  </SubMenu>
                ) : null}
                {this.props.cottechnicalindicator[firstkey["unique_ciname"]] ? (
                  <SubMenu
                    className="gx-menu-horizontal"
                    title={<span>Remove TI</span>}
                  >
                    {ctimenu.map((item, key) => {
                      return item;
                    })}
                  </SubMenu>
                ) : null}
                {/* {type_cot=='dynamic'?<Menu.Item onClick={() => this.showModalcot(chart_id_cot,type_cot,ticker_id_cot)}>Select weeks</Menu.Item>:''} */}
                <Menu.Item
                  onClick={() =>
                    this.removeCI(mainitem, firstkey["unique_ciname"])
                  }
                >
                  Remove
                </Menu.Item>
              </SubMenu>
            );
            j_cot = j_cot + parseInt(1);
            i = i + parseInt(1);
          });
        }
        var timenu = [];
        var tinameArray = [];
        var tiLength = this.props.sapratetechnicalindicator.length;
        if (this.props.sapratetechnicalindicator.length > 0) {
          var selectable2 = mapping.createSelectable();
          // Object.keys(this.props.sapratetechnicalindicator).map((item,key) => {
          this.props.sapratetechnicalindicator.map((item, index) => {
            if (item != null) {
              var ti_name = "";
              // console.log('asplhii',item);
              // var arg_data = this.props.sapratetechnicalindicator[item];
              var arg_data = item;
              if (
                arg_data[0] == "cci" ||
                arg_data[0] == "rsi" ||
                arg_data[0] == "obv" ||
                arg_data[0] == "macd" ||
                arg_data[0] == "poiv" ||
                arg_data[0] == "obo" ||
                arg_data[0] == "atr" ||
                arg_data[0] == "williamsR" ||
                arg_data[0] == "adl" ||
                arg_data[0] == "bbandsB" ||
                arg_data[0] == "bbandsWidth" ||
                arg_data[0] == "momentum"
              ) {
                var indicatorPlot = chart.plot(j_cot);
                // indicatorPlot.height(parseInt(60)/parseInt(parseInt(cotdataArray.length) + parseInt(this.props.sapratetechnicalindicator.length))+'%');
                indicatorPlot.height("240px");

                if (this.props.drawingArray[arg_data[0]]) {
                  indicatorPlot
                    .annotations()
                    .fromJson(this.props.drawingArray[arg_data[0]]);
                }
                var controller3 = indicatorPlot.annotations();
                drawingArray_temp[j_cot] = arg_data[0];
                chart.listen("annotationDrawingFinish", (e) => {
                  console.log("asplv3", verticalLine);
                  if (verticalLine == true) {
                    var vertical_anchor2 = e.annotation.xAnchor();
                    var dynamic_line = controller3.verticalLine({
                      xAnchor: vertical_anchor2,
                      allowEdit: false,
                      color: "2 " + this.state.drawingColor,
                    });
                    // dynamic_line.normal().stroke(this.state.drawingColor,1.5,0.5);
                    dynamic_line
                      .normal()
                      .stroke("2 " + this.state.drawingColor + " 0.5");
                    dynamic_line.zIndex(0);
                    if (tiLength == index + 1 && aidataArray.length == 0) {
                      // console.log('asplrohan');
                      // verticalLine = false;
                      this.addVerticalLine(chart);
                    }
                  }
                  drawingArray[
                    arg_data[0]
                  ] = indicatorPlot.annotations().toJson();
                  this.props.drawingArray[
                    arg_data[0]
                  ] = indicatorPlot.annotations().toJson();
                  if (this.props.savestatus1) {
                    this.props.savestatus(false);
                  }
                  // console.log('asplrohan',drawingArray);
                });
                chart.listen("annotationChangeFinish", (e) => {
                  drawingArray[
                    arg_data[0]
                  ] = indicatorPlot.annotations().toJson();
                  this.props.drawingArray[
                    arg_data[0]
                  ] = indicatorPlot.annotations().toJson();
                  if (this.props.savestatus1) {
                    this.props.savestatus(false);
                  }
                  // console.log('asplrohan',drawingArray);
                });
                if (this.state.increaseheight) {
                  indicatorPlot.height("288px");
                }
                indicatorPlot
                  .yAxis()
                  .labels()
                  .fontColor(charttext);
                indicatorPlot.legend().fontColor(charttext);
                indicatorPlot
                  .xAxis()
                  .minorLabels()
                  .fontColor(charttext);
                indicatorPlot
                  .xAxis()
                  .labels()
                  .fontColor(charttext);
                if (arg_data[0] == "cci") {
                  indicatorPlot[arg_data[0]](
                    mapping,
                    arg_data[1],
                    arg_data[2]
                  ).series();
                  j_cot = j_cot + parseInt(1);
                  ti_name = arg_data[3];
                  var annotation = indicatorPlot.annotations();
                  // console.log('asplf',first_date);
                  // console.log('asplf1',cot_first_date);
                  annotation
                    .trendChannel({
                      xAnchor: cot_first_date,
                      valueAnchor: 100,
                      secondXAnchor: verticalline_date,
                      secondValueAnchor: 100,
                      thirdXAnchor: verticalline_date,
                      thirdValueAnchor: -100,
                      stroke: "1 #64b5f6",
                      fill: "#64b5f6 0.10",
                    })
                    .allowEdit(false);
                }
                if (
                  arg_data[0] == "williamsR" ||
                  arg_data[0] == "momentum" ||
                  arg_data[0] == "rsi" ||
                  arg_data[0] == "atr"
                ) {
                  indicatorPlot[arg_data[0]](mapping, arg_data[1], arg_data[2]);
                  j_cot = j_cot + parseInt(1);
                  ti_name = arg_data[3];
                }
                if (arg_data[0] == "adl" || arg_data[0] == "obv") {
                  indicatorPlot[arg_data[0]](mapping, arg_data[1]);
                  j_cot = j_cot + parseInt(1);
                  ti_name = arg_data[2];
                }
                if (arg_data[0] == "bbandsB" || arg_data[0] == "bbandsWidth") {
                  var bbandSeries = indicatorPlot[arg_data[0]](
                    mapping,
                    arg_data[1],
                    arg_data[2],
                    arg_data[3]
                  );
                  j_cot = j_cot + parseInt(1);
                  bbandSeries.series().stroke("#e5a919");
                  ti_name = arg_data[4];
                }
                if (arg_data[0] == "macd") {
                  // firstPlot[item](mapping,this.props.sapratetechnicalindicator[item]);
                  var macd = indicatorPlot[arg_data[0]](
                    mapping,
                    arg_data[1],
                    arg_data[2],
                    arg_data[3],
                    arg_data[4],
                    arg_data[5],
                    arg_data[6]
                  );
                  macd.macdSeries().stroke("2 #bf360c");
                  macd.signalSeries().stroke("2 #ff6d00");
                  macd.histogramSeries().fill("#ffe082");
                  j_cot = j_cot + parseInt(1);
                  ti_name = arg_data[7];
                }
                if (arg_data[0] == "poiv") {
                  // console.log('asplrohan')
                  // console.log('asplpoiv',this.props.poiv)
                  // firstPlot[item](mapping,this.props.sapratetechnicalindicator[item]);
                  if (this.props.poiv.length > 0) {
                    // if(this.props.poiv[0].length > 0){
                    var poivDataTable12 = anychart.data.table("date");
                    poivDataTable12.addData(this.props.poiv[0]);
                    var poivmap = poivDataTable12.mapAs({ value: "value" });
                    var poivSeries = indicatorPlot.line(poivmap);
                    poivSeries.name("POIV");
                    poivSeries.seriesType(arg_data[1]);
                    indicatorPlot
                      .crosshair()
                      .yLabel()
                      .format(function() {
                        // return Math.round(this.value) + " $";
                        return anychart.format.number(
                          this.value,
                          NUMBER_FORMAT1
                        );
                      });
                    indicatorPlot
                      .yAxis()
                      .labels()
                      .format(function() {
                        return anychart.format.number(
                          this.value,
                          NUMBER_FORMAT1
                        );
                      });
                    j_cot = j_cot + parseInt(1);
                    ti_name = arg_data[2];
                  }
                  // }
                }
                if (arg_data[0] == "obo") {
                  // console.log('asplrohan')
                  // console.log('asplobo',this.props.obo)
                  // firstPlot[item](mapping,this.props.sapratetechnicalindicator[item]);
                  if (this.props.obo.length > 0) {
                    // if(this.props.obo[0].length > 0){
                    var oboDataTable12 = anychart.data.table("date");
                    oboDataTable12.addData(this.props.obo[0]);
                    var obomap = oboDataTable12.mapAs({ value: "value" });
                    var oboSeries = indicatorPlot.line(obomap);
                    oboSeries.name("OBO");
                    oboSeries.seriesType(arg_data[1]);
                    indicatorPlot
                      .crosshair()
                      .yLabel()
                      .format(function() {
                        // return Math.round(this.value) + " $";
                        return anychart.format.number(
                          this.value,
                          NUMBER_FORMAT1
                        );
                      });
                    indicatorPlot
                      .yAxis()
                      .labels()
                      .format(function() {
                        return anychart.format.number(
                          this.value,
                          NUMBER_FORMAT1
                        );
                      });
                    j_cot = j_cot + parseInt(1);
                    ti_name = arg_data[2];
                  }
                  // }
                }
                tinameArray.push(ti_name);
                var ti_count = this.getOccurrence(tinameArray, ti_name);
                ti_name = ti_name + " #" + ti_count;
                indicatorPlot.title(ti_name);
                if (this.state.gridstate) {
                  indicatorPlot.xMinorGrid().enabled(true);
                  indicatorPlot.xMinorGrid().stroke({
                    // set stroke color
                    color: gridColor,
                    // set dashes and gaps length
                    dash: "2 5",
                  });
                  indicatorPlot.xMinorGrid().zIndex(0);
                  indicatorPlot.xGrid().enabled(true);
                  indicatorPlot.xGrid().stroke({
                    // set stroke color
                    color: gridColor,
                    // set dashes and gaps length
                    dash: "2 5",
                  });
                  indicatorPlot.xGrid().zIndex(0);
                  indicatorPlot.yGrid().enabled(true);
                  indicatorPlot.yGrid().stroke({
                    // set stroke color
                    color: gridColor,
                    // set dashes and gaps length
                    dash: "2 5",
                  });
                  indicatorPlot.yGrid().zIndex(0);
                }
              } else {
                if (arg_data[0] == "sDev") {
                  if (this.props.sDev.length > 0) {
                    var sDevDataTable12 = anychart.data.table("date");
                    sDevDataTable12.addData(this.props.sDev[0]);
                    var sDevmap = sDevDataTable12.mapAs({ value: "value" });
                    var sDevSeries = firstPlot.line(sDevmap);
                    sDevSeries.seriesType(arg_data[1]);
                    sDevSeries.stroke("2 #ce93d8");
                    sDevSeries.name("Standard Deviation");
                    var customScale1 = anychart.scales.linear();
                    firstPlot.yAxis(1).orientation("right");
                    firstPlot.yAxis(1).scale(customScale1);
                    sDevSeries.yScale(customScale1);
                    ti_name = arg_data[2];
                  }
                }
                if (arg_data[0] == "adx") {
                  if (this.props.adx.length > 0) {
                    var adxDataTable12 = anychart.data.table("date");
                    adxDataTable12.addData(this.props.adx[0]);
                    var adxmap = adxDataTable12.mapAs({ value: "value" });
                    var adxSeries = firstPlot.line(adxmap);
                    adxSeries.seriesType(arg_data[1]);
                    adxSeries.stroke("2 #96246a");
                    adxSeries.name("Average Directional Movement Index");
                    var customScale1 = anychart.scales.linear();
                    firstPlot.yAxis(1).orientation("right");
                    firstPlot.yAxis(1).scale(customScale1);
                    adxSeries.yScale(customScale1);
                    ti_name = arg_data[2];
                  }
                }
                if (
                  arg_data[0] == "sma" ||
                  arg_data[0] == "ema" ||
                  arg_data[0] == "mma"
                ) {
                  var seriessma = firstPlot[arg_data[0]](
                    mapping,
                    arg_data[1],
                    arg_data[2]
                  );
                  seriessma.series().stroke("#ac4317");
                  ti_name = arg_data[3];
                }
                if (arg_data[0] == "ama" || arg_data[0] == "psar") {
                  firstPlot[arg_data[0]](
                    mapping,
                    arg_data[1],
                    arg_data[2],
                    arg_data[3],
                    arg_data[4]
                  );
                  ti_name = arg_data[5];
                }
                if (arg_data[0] == "bbands") {
                  // firstPlot[item](mapping,this.props.sapratetechnicalindicator[item]);
                  var bBandsIndicator = firstPlot.bbands(
                    mapping,
                    arg_data[1],
                    arg_data[2],
                    arg_data[3],
                    arg_data[4],
                    arg_data[5]
                  );
                  bBandsIndicator.upperSeries().stroke("1.5 #e5a919");
                  bBandsIndicator.middleSeries().stroke("1.5 #e5a919");
                  bBandsIndicator.lowerSeries().stroke("1.5 #e5a919");
                  bBandsIndicator.rangeSeries().fill("white 0");
                  ti_name = arg_data[6];
                }
                tinameArray.push(ti_name);
                var ti_count = this.getOccurrence(tinameArray, ti_name);
                ti_name = ti_name + " #" + ti_count;
              }
              timenu.push(
                <SubMenu title={<span> {ti_name} </span>}>
                  <Menu.Item onClick={() => this.removeTI(index)}>
                    Remove
                  </Menu.Item>
                </SubMenu>
              );
              if (this.props.scrollData != "") {
                chart.selectRange(
                  this.props.scrollData.start,
                  this.props.scrollData.end
                );
                // chart.selectRange(this.state.startdate, this.state.enddate);
              }
            }
          });
        }
        chart.splitters().enabled(false);
        aimenu = [];
        var ainameArray = [];
        var aiLength = this.props.trendData.length;
        // console.log('asplpoiv',this.props.trendData);
        if (this.props.trendData.length > 0 || aidataArray.length > 0) {
          if (this.props.clearcotstatus.status) {
            aidataArray = [];
            this.props.clearcotstatus.status = false;
          }
          if (this.props.trendData.length > 0) {
            var trendData = this.props.trendData[0];
            aidataArray.push(trendData);
            this.props.trendclearData();
          }
          aidataArray.map((firstkey, mainitem) => {
            if (firstkey["indicator"]) {
              var trendPlot = chart.plot(j_cot);
              trendPlot
                .yAxis()
                .labels()
                .fontColor(charttext);
              trendPlot.legend().fontColor(charttext);
              trendPlot
                .xAxis()
                .minorLabels()
                .fontColor(charttext);
              trendPlot
                .xAxis()
                .labels()
                .fontColor(charttext);
              trendPlot
                .legend()
                .title()
                .useHtml(true);
              trendPlot
                .legend()
                .titleFormat(
                  "<span style='color:" +
                    charttext +
                    ";font-size:14px;font-weight:600'>" +
                    "{%value}{dateTimeFormat: dd MMM yyyy}</span>"
                );
              if (theme == "coffee") {
                trendPlot.palette(anychart.palettes.coffee);
              }
              firstkey["indicator"].map((secondkey, mainitem) => {
                // console.log('asplpoiv',firstkey['indicator']);
                var trendDataTable = anychart.data.table("date");
                trendDataTable.addData(secondkey);
                var cot_mapping = trendDataTable.mapAs({ value: "value" });
                var selectable1 = cot_mapping.createSelectable();
                // var zeroLine = trendPlot.lineMarker();
                // zeroLine.value(0);
                // zeroLine.stroke("0.5 grey");
                trendPlot.title(firstkey["type"]);
                trendPlot.height("240px");
                if (this.state.increaseheight) {
                  trendPlot.height("288px");
                }

                var series_cot = trendPlot.spline(
                  trendDataTable.mapAs({ value: "value" })
                );
                series_cot.connectMissingPoints(true);

                var zeroLine = trendPlot.lineMarker();
                zeroLine.value(0);
                zeroLine.stroke("1.5 grey");
                if (firstkey["type"] == "NCLRA") {
                  if (mainitem == 0) {
                    series_cot.name("NCLRA Combined");
                    series_cot.stroke({ color: "#64b5f6" });
                  }
                  if (mainitem == 1) {
                    series_cot.name("NCLRA Future");
                    series_cot.stroke({ color: "green", dash: "2 2" });
                  }
                }
                if (this.state.gridstate) {
                  trendPlot.xMinorGrid().enabled(true);
                  trendPlot.xMinorGrid().stroke({
                    // set stroke color
                    color: gridColor,
                    // set dashes and gaps length
                    dash: "2 5",
                  });
                  trendPlot.xMinorGrid().zIndex(0);
                  trendPlot.xGrid().enabled(true);
                  trendPlot.xGrid().stroke({
                    // set stroke color
                    color: gridColor,
                    // set dashes and gaps length
                    dash: "2 5",
                  });
                  trendPlot.xGrid().zIndex(0);
                  trendPlot.yGrid().enabled(true);
                  trendPlot.yGrid().stroke({
                    // set stroke color
                    color: gridColor,
                    // set dashes and gaps length
                    dash: "2 5",
                  });
                  trendPlot.yGrid().zIndex(0);
                }
                trendPlot.legend().listen("legendItemClick", function(e) {
                  if (e.itemIndex != 0) {
                    var series = trendPlot.getSeriesAt(e.itemIndex);
                    var sname = series.name();
                    var isEnabled = series.enabled();
                    if (seriesArray[firstkey["type"]]) {
                      if (seriesArray[firstkey["type"]].includes(sname)) {
                        var temp_index = seriesArray[firstkey["type"]].indexOf(
                          sname
                        );
                        if (temp_index !== -1)
                          seriesArray[firstkey["type"]].splice(temp_index, 1);
                      } else {
                        seriesArray[firstkey["type"]].push(sname);
                      }
                    } else {
                      seriesArray[firstkey["type"]] = [];
                      seriesArray[firstkey["type"]].push(sname);
                    }
                    // console.log('asplseries',seriesArray);
                  }
                });
                // if(seriesArray[firstkey['type']])
                // {
                //   if(seriesArray[firstkey['type']].includes(item))
                //     {
                //       // console.log('aspls',item)
                //       series_cot.enabled(false);
                //     }
                // }
                // chart.plot(j_cot).momentum(cotDataTable12.mapAs({'value': 'calculation'}));

                // test++;
                var controller2 = trendPlot.annotations();
                drawingArray_temp[j_cot] = firstkey["type"];
                j_cot = j_cot + parseInt(1);
                chart.listen("annotationDrawingFinish", (e) => {
                  if (verticalLine == true) {
                    var vertical_anchor1 = e.annotation.xAnchor();
                    // console.log('asplr',vertical_anchor);
                    var dynamic_line = controller2.verticalLine({
                      xAnchor: vertical_anchor1,
                      allowEdit: false,
                      color: "2 " + this.state.drawingColor,
                    });
                    // dynamic_line.normal().stroke(this.state.drawingColor,1.5,0.5);
                    dynamic_line
                      .normal()
                      .stroke("2 " + this.state.drawingColor + " 0.5");
                    dynamic_line.zIndex(0);
                    if (aidataArray.length == mainitem + 1) {
                      // console.log('asplasplasplaspl');
                      this.addVerticalLine(chart);
                      //verticalLine = false;
                    }
                    // console.log('aspllll1',e);
                  }
                  drawingArray[
                    firstkey["type"]
                  ] = trendPlot.annotations().toJson();
                  this.props.drawingArray[
                    firstkey["type"]
                  ] = trendPlot.annotations().toJson();
                  if (this.props.savestatus1) {
                    this.props.savestatus(false);
                  }
                  // console.log('asplrohan',drawingArray);
                });
                chart.listen("annotationChangeFinish", (e) => {
                  drawingArray[
                    firstkey["type"]
                  ] = trendPlot.annotations().toJson();
                  this.props.drawingArray[
                    firstkey["type"]
                  ] = trendPlot.annotations().toJson();
                  if (this.props.savestatus1) {
                    this.props.savestatus(false);
                  }
                  // console.log('asplrohan',drawingArray);
                });
                if (this.props.drawingArray[firstkey["type"]]) {
                  trendPlot
                    .annotations()
                    .fromJson(this.props.drawingArray[firstkey["type"]]);
                }
              });
              aimenu.push(
                <SubMenu title={<span> {firstkey["type"]} </span>}>
                  <Menu.Item
                    onClick={() => this.removeAI(mainitem, firstkey["type"])}
                  >
                    Remove
                  </Menu.Item>
                </SubMenu>
              );
            }
          });
        }
        if (this.props.tsrmvisible1.status) {
          if (this.props.TSRM.length > 0) {
            if (this.props.TSRM[0].length > 0) {
              // console.log('aspltsrm',this.props.TSRM[0]);
              var trendData = this.props.TSRM[0];
              var TSRMName = "Seasonal";
              // aidataArray.push(trendData);
              // this.props.trendclearData();
              // }
              // aidataArray.map((firstkey,mainitem)=>{
              // if(firstkey['indicator'])
              // {
              var trendPlot = chart.plot(j_cot);
              trendPlot
                .yAxis()
                .labels()
                .fontColor(charttext);
              trendPlot.legend().fontColor(charttext);
              trendPlot
                .xAxis()
                .minorLabels()
                .fontColor(charttext);
              trendPlot
                .xAxis()
                .labels()
                .fontColor(charttext);
              if (theme == "coffee") {
                trendPlot.palette(anychart.palettes.coffee);
              }
              // firstkey['indicator'].map((secondkey,mainitem)=>{
              // console.log('asplpoiv',firstkey['indicator']);
              var trendDataTable = anychart.data.table("date");
              trendDataTable.addData(trendData);
              var cot_mapping = trendDataTable.mapAs({ value: "seasonal" });
              var selectable1 = cot_mapping.createSelectable();
              // var zeroLine = trendPlot.lineMarker();
              // zeroLine.value(0);
              // zeroLine.stroke("0.5 grey");
              trendPlot.title(TSRMName);
              trendPlot.height("240px");
              // console.log('asplseasonal',trendDataTable);
              // console.log('asplseasonal1',this.props.tsrmvisible1);
              if (this.state.increaseheight) {
                trendPlot.height("288px");
              }
              if (this.props.tsrmvisible1.type == 1) {
                var series_cot = trendPlot.spline(
                  trendDataTable.mapAs({ value: "seasonal" })
                );
                series_cot.connectMissingPoints(true);
                series_cot.name("Seasonal");
                series_cot.stroke("2 " + palette[1]);
                TSRMName = "Seasonal";
              }
              if (this.props.tsrmvisible1.type == 2) {
                var series_cot = trendPlot.spline(
                  trendDataTable.mapAs({ value: "seasonal" })
                );
                series_cot.connectMissingPoints(true);
                series_cot.name("Seasonal");
                series_cot.stroke("3 " + palette[1]);
                var series_cot1 = trendPlot.spline(
                  trendDataTable.mapAs({ value: "residual" })
                );
                series_cot1.connectMissingPoints(true);
                series_cot1.name("Residual");
                series_cot1.stroke("2 " + palette[5]);
                var customScale1 = anychart.scales.linear();
                series_cot1.yScale(customScale1);
                TSRMName = "Seasonal & Residual";
              }
              trendPlot.title(TSRMName);
              var zeroLine = trendPlot.lineMarker();
              zeroLine.value(0);
              zeroLine.stroke("1.5 grey");
              if (this.state.gridstate) {
                trendPlot.xMinorGrid().enabled(true);
                trendPlot.xMinorGrid().stroke({
                  // set stroke color
                  color: gridColor,
                  // set dashes and gaps length
                  dash: "2 5",
                });
                trendPlot.xMinorGrid().zIndex(0);
                trendPlot.xGrid().enabled(true);
                trendPlot.xGrid().stroke({
                  // set stroke color
                  color: gridColor,
                  // set dashes and gaps length
                  dash: "2 5",
                });
                trendPlot.xGrid().zIndex(0);
                trendPlot.yGrid().enabled(true);
                trendPlot.yGrid().stroke({
                  // set stroke color
                  color: gridColor,
                  // set dashes and gaps length
                  dash: "2 5",
                });
                trendPlot.yGrid().zIndex(0);
              }
              if (this.props.tableData1.length > 0) {
                var change = false;
                var table = this.props.tableData1;
                var markers = [];
                this.props.tableData1.map((item, key) => {
                  if (item[TSRMName]) {
                    // console.log('asplnot');
                  } else {
                    // console.log('asplkey',table[key]['price']);
                    var datestamp = item["datestamp"];
                    var select1 = selectable1.search(datestamp, "nearest");
                    var key = select1.getKey();
                    var pointDate = new Date(key);
                    // console.log('aspldate1',pointDate);
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
                    var pointDateString1 =
                      String(pointDate.getFullYear()) +
                      "-" +
                      month +
                      "-" +
                      String(
                        pointDate.getDate() < 10
                          ? "0" + pointDate.getDate()
                          : pointDate.getDate()
                      );
                    // value = select.Mf.values[0];
                    var value = select1.get("value");
                    // item[TSRMName]] = [];
                    item[TSRMName] = value;
                    // console.log('asplitem',item)
                    change = true;
                    // this.props.cotclickclear();
                    // this.setState({change:TSRMName]});
                  }
                  if (item.format == "#ffd54f" || item.format == "#9EDDA5") {
                    var fontColor = "black";
                  } else {
                    var fontColor = "white";
                  }
                  var marker_objects = {
                    format: item.symbol,
                    data: [
                      {
                        date: format(item.date),
                        description: item.description,
                      },
                    ],
                    normal: { fill: item.format, fontColor: fontColor },
                  };
                  markers.push(marker_objects);
                });
                // console.log('aspla',markers);
                trendPlot.eventMarkers({ groups: markers });
                trendPlot.eventMarkers().position("series");
                trendPlot.eventMarkers().seriesId(0);
              }
              trendPlot.legend().listen("legendItemClick", function(e) {
                if (e.itemIndex != 0) {
                  var series = trendPlot.getSeriesAt(e.itemIndex);
                  var sname = series.name();
                  var isEnabled = series.enabled();
                  if (seriesArray[TSRMName]) {
                    if (seriesArray[TSRMName].includes(sname)) {
                      var temp_index = seriesArray[TSRMName].indexOf(sname);
                      if (temp_index !== -1)
                        seriesArray[TSRMName].splice(temp_index, 1);
                    } else {
                      seriesArray[TSRMName].push(sname);
                    }
                  } else {
                    seriesArray[TSRMName] = [];
                    seriesArray[TSRMName].push(sname);
                  }
                  // console.log('asplseries',seriesArray);
                }
              });
              // if(seriesArray[TSRMName]])
              // {
              //   if(seriesArray[TSRMName]].includes(item))
              //     {
              //       // console.log('aspls',item)
              //       series_cot.enabled(false);
              //     }
              // }
              // chart.plot(j_cot).momentum(cotDataTable12.mapAs({'value': 'calculation'}));

              // test++;
              var controller2 = trendPlot.annotations();
              drawingArray_temp[j_cot] = TSRMName;
              j_cot = j_cot + parseInt(1);
              chart.listen("annotationDrawingFinish", (e) => {
                if (verticalLine == true) {
                  var vertical_anchor1 = e.annotation.xAnchor();
                  // console.log('asplr',vertical_anchor);
                  var dynamic_line = controller2.verticalLine({
                    xAnchor: vertical_anchor1,
                    allowEdit: false,
                    color: "2 " + this.state.drawingColor,
                  });
                  // dynamic_line.normal().stroke(this.state.drawingColor,1.5,0.5);
                  dynamic_line
                    .normal()
                    .stroke("2 " + this.state.drawingColor + " 0.5");
                  dynamic_line.zIndex(0);
                  // if(aidataArray.length == (mainitem+1))
                  // {
                  // console.log('asplasplasplaspl');
                  //verticalLine = false;
                  this.addVerticalLine(chart);
                  // }
                  // console.log('aspllll1',e);
                }
                drawingArray[TSRMName] = trendPlot.annotations().toJson();
                this.props.drawingArray[
                  TSRMName
                ] = trendPlot.annotations().toJson();
                if (this.props.savestatus1) {
                  this.props.savestatus(false);
                }
                // console.log('asplrohan',drawingArray);
              });
              chart.listen("annotationChangeFinish", (e) => {
                drawingArray[TSRMName] = trendPlot.annotations().toJson();
                this.props.drawingArray[
                  TSRMName
                ] = trendPlot.annotations().toJson();
                if (this.props.savestatus1) {
                  this.props.savestatus(false);
                }
                // console.log('asplrohan',drawingArray);
              });
              if (this.props.drawingArray[TSRMName]) {
                trendPlot
                  .annotations()
                  .fromJson(this.props.drawingArray[TSRMName]);
              }
              // });
              aimenu.push(
                <SubMenu title={<span> {TSRMName} </span>}>
                  <Menu.Item onClick={() => this.removeTSRM()}>
                    Remove
                  </Menu.Item>
                </SubMenu>
              );
              // }
              // });
            }
          }
        }
        // console.log('aspltest',this.props.newsindicator);
        if (this.props.newsindicator1.length > 0) {
          // console.log('aspltest',this.props.newsH);
          this.props.newsindicator1.forEach((element, key) => {
            if (this.props.newsH.length > 0) {
              if (this.props.newsH[0].length > 0) {
                // console.log('aspltsrm',this.props.TSRM[0]);
                var trendData = this.props.newsH[0];
                var TSRMName = "Sentiment";
                // aidataArray.push(trendData);
                // this.props.trendclearData();
                // }
                // aidataArray.map((firstkey,mainitem)=>{
                // if(firstkey['indicator'])
                // {
                var trendPlot = chart.plot(j_cot);
                trendPlot
                  .yAxis()
                  .labels()
                  .fontColor(charttext);
                trendPlot.legend().fontColor(charttext);
                trendPlot
                  .xAxis()
                  .minorLabels()
                  .fontColor(charttext);
                trendPlot
                  .xAxis()
                  .labels()
                  .fontColor(charttext);
                trendPlot
                  .legend()
                  .title()
                  .useHtml(true);
                trendPlot
                  .legend()
                  .titleFormat(
                    "<span style='color:" +
                      charttext +
                      ";font-size:14px;font-weight:600'>" +
                      "{%value}{dateTimeFormat: dd MMM yyyy}</span>"
                  );
                if (theme == "coffee") {
                  trendPlot.palette(anychart.palettes.coffee);
                }
                // firstkey['indicator'].map((secondkey,mainitem)=>{
                // console.log('asplpoiv',firstkey['indicator']);
                var trendDataTable = anychart.data.table("date");
                trendDataTable.addData(trendData);
                var cot_mapping = trendDataTable.mapAs({ value: "positive" });
                var selectable1 = cot_mapping.createSelectable();
                // var zeroLine = trendPlot.lineMarker();
                // zeroLine.value(0);
                // zeroLine.stroke("0.5 grey");

                trendPlot.height("240px");
                console.log("asplseasonalcharting", trendData);
                // console.log('asplseasonal1',this.props.tsrmvisible1);
                if (this.state.increaseheight) {
                  trendPlot.height("288px");
                }
                if (element == 1) {
                  var series_cot = trendPlot.area(
                    trendDataTable.mapAs({ value: "total" })
                  );
                  series_cot.connectMissingPoints(true);
                  series_cot.name("Stories");
                  series_cot.stroke("3 " + palette[4]);
                  series_cot.fill(palette[5]);
                  TSRMName = "Stories over time";
                }
                // else if(element == 2)
                // {
                //   var series_cot = trendPlot.spline(trendDataTable.mapAs({'value': 'positive'}));
                //   series_cot.connectMissingPoints(true);
                //   series_cot.name('Positive');
                //   series_cot.stroke('2 '+palette[8]);
                //   var series_cot1 = trendPlot.spline(trendDataTable.mapAs({'value': 'negative'}));
                //   series_cot1.connectMissingPoints(true);
                //   series_cot1.name('Negative');
                //   series_cot1.stroke('2 '+palette[6]);
                //   var series_cot2 = trendPlot.spline(trendDataTable.mapAs({'value': 'neutral'}));
                //   series_cot2.connectMissingPoints(true);
                //   series_cot2.name('Neutral');
                //   series_cot2.stroke({'color':palette[9],'thickness':'2'});
                //   TSRMName = 'Sentiment over time';
                // }
                // else if(element == 4)
                // {
                //   // console.log('aspl',palette);
                //   var series_cot = trendPlot.spline(trendDataTable.mapAs({'value': 'd_fear'}));
                //   series_cot.connectMissingPoints(true);
                //   series_cot.name('News Fear');
                //   series_cot.stroke('2 '+palette[6]);
                //   var series_cot1 = trendPlot.spline(trendDataTable.mapAs({'value': 'e_fear'}));
                //   series_cot1.connectMissingPoints(true);
                //   var customScale = anychart.scales.linear();
                //   // sets y-scale
                //   series_cot1.yScale(customScale)
                //   series_cot1.name('Social Fear');
                //   series_cot1.stroke('2 '+palette[9]);
                //   // var series_cot2 = trendPlot.spline(trendDataTable.mapAs({'value': 'neutral'}));
                //   // series_cot2.connectMissingPoints(true);
                //   // series_cot2.name('Neutral');
                //   TSRMName = 'Fear Factor';
                // }
                // else if(element == 3)
                // {
                //   var series_cot = trendPlot.spline(trendDataTable.mapAs({'value': 'average'}));
                //   series_cot.connectMissingPoints(true);
                //   series_cot.name('Sentiment Average');
                //   series_cot.normal().stroke({'color':palette[7],'dash':'2 2','thickness':'2'});
                //   series_cot.normal().negativeStroke({'color':palette[9],'dash':'2 2','thickness':'2'});
                //   var series_cot1 = trendPlot.spline(trendDataTable.mapAs({'value': 'average1'}));
                //   series_cot1.connectMissingPoints(true);
                //   series_cot1.name('Sentiment Average Binary');
                //   TSRMName = 'Sentiment Average';
                //   series_cot1.normal().stroke('2 '+palette[8]);
                //   series_cot1.normal().negativeStroke('2 '+palette[6]);
                // }
                // else if(element == 5)
                // {
                //   var series_cot = trendPlot.spline(trendDataTable.mapAs({'value': 'index'}));
                //   series_cot.connectMissingPoints(true);
                //   series_cot.name('Sentiment Index');
                //   series_cot.normal().stroke({'color':palette[7],'dash':'2 2','thickness':'2'});
                //   series_cot.normal().negativeStroke({'color':palette[9],'dash':'2 2','thickness':'2'});
                //   var series_cot1 = trendPlot.spline(trendDataTable.mapAs({'value': 'index1'}));
                //   series_cot1.connectMissingPoints(true);
                //   series_cot1.name('Sentiment Index Binary');
                //   series_cot1.normal().stroke('2 '+palette[8]);
                //   series_cot1.normal().negativeStroke('2 '+palette[6]);
                //   TSRMName = 'Sentiment Index';
                // }
                trendPlot.title(TSRMName);
                var zeroLine = trendPlot.lineMarker();
                zeroLine.value(0);
                zeroLine.stroke("1.5 grey");
                zeroLine.zIndex(1);
                if (this.state.gridstate) {
                  trendPlot.xMinorGrid().enabled(true);
                  trendPlot.xMinorGrid().stroke({
                    // set stroke color
                    color: gridColor,
                    // set dashes and gaps length
                    dash: "2 5",
                  });
                  trendPlot.xMinorGrid().zIndex(0);
                  trendPlot.xGrid().enabled(true);
                  trendPlot.xGrid().stroke({
                    // set stroke color
                    color: gridColor,
                    // set dashes and gaps length
                    dash: "2 5",
                  });
                  trendPlot.xGrid().zIndex(0);
                  trendPlot.yGrid().enabled(true);
                  trendPlot.yGrid().stroke({
                    // set stroke color
                    color: gridColor,
                    // set dashes and gaps length
                    dash: "2 5",
                  });
                  trendPlot.yGrid().zIndex(0);
                }

                trendPlot.legend().listen("legendItemClick", function(e) {
                  if (e.itemIndex != 0) {
                    var series = trendPlot.getSeriesAt(e.itemIndex);
                    var sname = series.name();
                    var isEnabled = series.enabled();
                    if (seriesArray[TSRMName]) {
                      if (seriesArray[TSRMName].includes(sname)) {
                        var temp_index = seriesArray[TSRMName].indexOf(sname);
                        if (temp_index !== -1)
                          seriesArray[TSRMName].splice(temp_index, 1);
                      } else {
                        seriesArray[TSRMName].push(sname);
                      }
                    } else {
                      seriesArray[TSRMName] = [];
                      seriesArray[TSRMName].push(sname);
                    }
                    // console.log('asplseries',seriesArray);
                  }
                });
                // if(seriesArray[TSRMName]])
                // {
                //   if(seriesArray[TSRMName]].includes(item))
                //     {
                //       // console.log('aspls',item)
                //       series_cot.enabled(false);
                //     }
                // }
                // chart.plot(j_cot).momentum(cotDataTable12.mapAs({'value': 'calculation'}));

                // test++;
                var controller2 = trendPlot.annotations();
                drawingArray_temp[j_cot] = TSRMName;
                j_cot = j_cot + parseInt(1);
                chart.listen("annotationDrawingFinish", (e) => {
                  if (verticalLine == true) {
                    var vertical_anchor1 = e.annotation.xAnchor();
                    // console.log('asplr',vertical_anchor);
                    var dynamic_line = controller2.verticalLine({
                      xAnchor: vertical_anchor1,
                      allowEdit: false,
                      color: "2 " + this.state.drawingColor,
                    });
                    // dynamic_line.normal().stroke(this.state.drawingColor,1.5,0.5);
                    dynamic_line
                      .normal()
                      .stroke("2 " + this.state.drawingColor + " 0.5");
                    dynamic_line.zIndex(0);
                    // if(aidataArray.length == (mainitem+1))
                    // {
                    // console.log('asplasplasplaspl');
                    //verticalLine = false;
                    this.addVerticalLine(chart);
                    // }
                    // console.log('aspllll1',e);
                  }
                  drawingArray[TSRMName] = trendPlot.annotations().toJson();
                  this.props.drawingArray[
                    TSRMName
                  ] = trendPlot.annotations().toJson();
                  if (this.props.savestatus1) {
                    this.props.savestatus(false);
                  }
                  // console.log('asplrohan',drawingArray);
                });
                chart.listen("annotationChangeFinish", (e) => {
                  drawingArray[TSRMName] = trendPlot.annotations().toJson();
                  this.props.drawingArray[
                    TSRMName
                  ] = trendPlot.annotations().toJson();
                  if (this.props.savestatus1) {
                    this.props.savestatus(false);
                  }
                  // console.log('asplrohan',drawingArray);
                });
                if (this.props.drawingArray[TSRMName]) {
                  trendPlot
                    .annotations()
                    .fromJson(this.props.drawingArray[TSRMName]);
                }
                // });
                aimenu.push(
                  <SubMenu title={<span> {TSRMName} </span>}>
                    <Menu.Item onClick={() => this.removeNI(key)}>
                      Remove
                    </Menu.Item>
                  </SubMenu>
                );
                // }
                // });
              }
            }
          });
        }
        var allfunctions = this;
        height = this.calculateHeight(j_cot);
        document.addEventListener("fullscreenchange", function() {
          // console.log('okkkkkkk');
          height = allfunctions.calculateHeight(j_cot);
          // allfunctions.settate({height : height})
        });
        /* Firefox */
        document.addEventListener("mozfullscreenchange", function() {
          // console.log('okkkkkkk');
          height = allfunctions.calculateHeight(j_cot);
          // allfunctions.settate({height : height})
        });

        /* Chrome, Safari and Opera */
        document.addEventListener("webkitfullscreenchange", function() {
          // console.log('okkkkkkk');
          height = allfunctions.calculateHeight(j_cot);
          if (allfunctions.props.loader) {
            allfunctions.props.loaderstatus(false);
          }
          // allfunctions.settate({height : height})
        });

        /* IE / Edge */
        document.addEventListener("msfullscreenchange", function() {
          // console.log('okkkkkkk');
          height = allfunctions.calculateHeight(j_cot);
          // allfunctions.settate({height : height})
        });
        var drawingfunctions = this;
        chart.contextMenu().itemsFormatter(function(items) {
          // console.log('asplitem',items);
          delete items["save-data-as"];
          items["drawings"] = {
            text: "Drawings",
            iconClass: "ac-ruler-paint-brush",
            subMenu: [
              {
                text: "Ellipse",
                iconClass: "ac-ellipse",
                action: function() {
                  drawingfunctions.createDrawing(chart, "ellipse");
                },
                index: 1000,
              },
              {
                text: "Rectangle",
                iconClass: "ac-rectangle",
                action: function() {
                  drawingfunctions.createDrawing(chart, "rectangle");
                },
                index: 1001,
              },
              {
                text: "Marker Up",
                iconClass: "ac-arrow-up",
                action: function() {
                  drawingfunctions.createDrawing(chart, "marker", "arrowUp");
                },
                index: 1002,
              },
              {
                text: "Marker Down",
                iconClass: "ac-arrow-down",
                action: function() {
                  drawingfunctions.createDrawing(chart, "marker", "arrowDown");
                },
                index: 1003,
              },
              {
                text: "Diamond",
                iconClass: "ac-diamond",
                action: function() {
                  drawingfunctions.createDrawing(chart, "marker", "diamond");
                },
                index: 1004,
              },
              {
                text: "Circle",
                iconClass: "ac-ellipse-thin",
                action: function() {
                  drawingfunctions.createDrawing(chart, "marker", "circle");
                },
                index: 1005,
              },
              {
                text: "Square",
                iconClass: "ac-square",
                action: function() {
                  drawingfunctions.createDrawing(chart, "marker", "square");
                },
                index: 1006,
              },
            ],
            index: 9,
          };
          // items['save-chart-as-jpg'] ={
          //   'text': '.jpg',
          //   'iconClass': 'ac ac-file-image-o',
          //   'action': function() {
          //     chart.saveAsJpg({"width": 360,
          //     "height": 500,
          //     "quality": 0.3,
          //     "forceTransparentWhite": true,
          //     "filename": "My Chart JPG"});
          //     },
          //   'index': 20
          // };

          return items;
        });

        var watermark = chart.label();
        watermark.useHtml(true);
        ticker_name = short_desc;
        // watermark.text(ticker_name+"<br><div class='watermark_bar' style='font-size: 16px'>"+cftc_market+" "+eod_data+"<br>1 Bar ="+barcount+ " " +barunit+"<br>PiaFx.com</div>");
        watermark.text(
          ticker_name +
            "   " +
            hnet_label +
            "<br><div class='watermark_bar' style='font-size: 16px'>" +
            cftc_market +
            " " +
            eod_data +
            "<br>PiaFx.com</div>"
        );
        watermark
          .letterSpacing("2px")
          .fontColor(waterMarkColor)
          // .fontOpacity(0.3)
          .fontSize(25)
          .fontWeight(900);
        watermark
          .anchor("left")
          .offsetX("75px")
          .offsetY("75px");
        // }, 100);
        // });
        var marker = firstPlot.rangeMarker(0);
        if (this.state.recessionstatus) {
          if (this.state.recessionkey != "") {
            if (this.props.recession.length > 0) {
              Object.keys(this.props.recession[0]).map((key) => {
                if (this.state.recessionkey == key) {
                  this.props.recession[0][key].map((value, index) => {
                    firstPlot.rangeMarker(index).to(value["end"]);
                    firstPlot.rangeMarker(index).from(value["start"]);
                    if (theme == "light") {
                      firstPlot.rangeMarker(index).fill("#caced2");
                    } else {
                      firstPlot.rangeMarker(index).fill("#373f4a");
                    }
                    firstPlot.rangeMarker(index).axis(firstPlot.xAxis());
                  });
                }
              });
            }
          }
        }

        const changeOptions = (
          <Menu
            className="chart_hamburger_ul"
            mode="vertical"
            triggerSubMenuAction="click"
          >
            {/* <SubMenu className="gx-menu-horizontal" title={<span>Grids</span>}>
                  <Menu.Item onClick={() => this.gridonoff(firstPlot,true)}>ON</Menu.Item>
                  <Menu.Item onClick={() => this.gridonoff(firstPlot,false)}>OFF</Menu.Item>
                </SubMenu> */}
            {/* <SubMenu className="gx-menu-horizontal" title={<span>Drawing Tools</span>}>
                  <Menu.Item onClick={() => this.createDrawing(chart,"marker","arrowUp")}>Marker Up</Menu.Item>
                  <Menu.Item onClick={() => this.createDrawing(chart,"marker","arrowDown")}>Marker Down</Menu.Item>
                  <Menu.Item onClick={() => this.createDrawing(chart,"marker","diamond")}>Diamond</Menu.Item>
                  <Menu.Item onClick={() => this.createDrawing(chart,"marker","square")}>Square</Menu.Item>
                  <Menu.Item onClick={() => this.createDrawing(chart,"marker","circle")}>Circle</Menu.Item>
                  <Menu.Item onClick={() => this.removeDrawing(chart)}>Remove All</Menu.Item>
                </SubMenu> */}
            <SubMenu key="sub2" title={<span>Main Price Chart</span>}>
              <SubMenu
                className="gx-menu-horizontal"
                title={<span>Chart Type</span>}
              >
                <Menu.Item onClick={() => this.chartchange(series, "ohlc")}>
                  OHLC
                </Menu.Item>
                <Menu.Item
                  onClick={() => this.chartchange(series, "candlestick")}
                >
                  Candle Stick Chart
                </Menu.Item>
                <Menu.Item onClick={() => this.chartchange(series, "line")}>
                  Line Chart
                </Menu.Item>
                <Menu.Item onClick={() => this.chartchange(series, "area")}>
                  Area Chart
                </Menu.Item>
              </SubMenu>

              {/* <SubMenu className="gx-menu-horizontal" title={<span>Highlight Exits</span>}>
                      <Menu.Item onClick={() => this.highlight(true)}>ON</Menu.Item>
                      <Menu.Item onClick={() => this.highlight(false)}>OFF</Menu.Item>
                    </SubMenu> */}

              {this.props.recession.length > 0 ? (
                <SubMenu
                  className="gx-menu-horizontal"
                  title={<span>Recession</span>}
                >
                  {Object.keys(this.props.recession[0]).map((key) => {
                    return (
                      <SubMenu
                        className="ant-menu-submenu-vertical gx-menu-horizontal"
                        title={<span>{key}</span>}
                      >
                        <Menu.Item
                          onClick={() => this.showrecession(key, true)}
                        >
                          ON
                        </Menu.Item>
                        <Menu.Item
                          onClick={() => this.showrecession(key, false)}
                        >
                          OFF
                        </Menu.Item>
                      </SubMenu>
                    );
                  })}
                </SubMenu>
              ) : null}
            </SubMenu>
            {cotmenu.map((item, key) => {
              return item;
            })}
            {timenu.map((item, key) => {
              return item;
            })}
            {aimenu.map((item, key) => {
              return item;
            })}
          </Menu>
        );
        const viewtasks = (
          <Menu
            className="chart_hamburger_ul"
            mode="vertical"
            triggerSubMenuAction="click"
          >
            <SubMenu className="gx-menu-horizontal" title={<span>Volume</span>}>
              <Menu.Item onClick={() => this.changeVolume(1)}>
                Rising-Falling
              </Menu.Item>
              <Menu.Item onClick={() => this.changeVolume(2)}>
                Volume + Ma
              </Menu.Item>
              <Menu.Item onClick={() => this.changeVolume(0)}>
                Default
              </Menu.Item>
            </SubMenu>
            {/* <Menu.Item onClick={() => this.highlight()}>Highlight Cot Exits</Menu.Item> */}
            {this.state.highlightshow ? (
              // ticker_group == 'CURRENCIES'?
              <SubMenu
                className="gx-menu-horizontal"
                title={<span>Highlight Cot Exits</span>}
              >
                <Menu.Item onClick={() => this.highlight(true, "", "combined")}>
                  Default
                </Menu.Item>
                <SubMenu
                  className="gx-menu-horizontal"
                  title={<span>Combined</span>}
                >
                  {/* <Menu.Item onClick={() => this.highlight(true,'','combined')}>Default</Menu.Item> */}
                  <Menu.Item
                    onClick={() => this.highlight(true, 10, "combined")}
                  >
                    Commerical Net
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => this.highlight(true, 1, "combined")}
                  >
                    Non-Commercial Net
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => this.highlight(true, 2, "combined")}
                  >
                    Non-Reportable Net
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => this.highlight(true, 3, "combined")}
                  >
                    Commerical W Net
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => this.highlight(true, 4, "combined")}
                  >
                    Non-Commercial W Net
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => this.highlight(true, 5, "combined")}
                  >
                    Non-Reportable W Net
                  </Menu.Item>
                  <Menu.Item onClick={() => this.highlight(false)}>
                    OFF
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  className="gx-menu-horizontal"
                  title={<span>Future</span>}
                >
                  {/* <Menu.Item onClick={() => this.highlight(true,'','future')}>Default</Menu.Item> */}
                  <Menu.Item onClick={() => this.highlight(true, 10, "future")}>
                    Commerical Net
                  </Menu.Item>
                  <Menu.Item onClick={() => this.highlight(true, 1, "future")}>
                    Non-Commercial Net
                  </Menu.Item>
                  <Menu.Item onClick={() => this.highlight(true, 2, "future")}>
                    Non-Reportable Net
                  </Menu.Item>
                  <Menu.Item onClick={() => this.highlight(true, 3, "future")}>
                    Commerical W Net
                  </Menu.Item>
                  <Menu.Item onClick={() => this.highlight(true, 4, "future")}>
                    Non-Commercial W Net
                  </Menu.Item>
                  <Menu.Item onClick={() => this.highlight(true, 5, "future")}>
                    Non-Reportable W Net
                  </Menu.Item>
                  <Menu.Item onClick={() => this.highlight(false)}>
                    OFF
                  </Menu.Item>
                </SubMenu>
              </SubMenu>
            ) : // :
            // <SubMenu className="gx-menu-horizontal" title={<span>Highlight Cot Exits</span>}>
            //   <SubMenu className="gx-menu-horizontal" title={<span>Combined</span>}>
            //     <Menu.Item onClick={() => this.highlight(true,'','combined')}>Default</Menu.Item>
            //     <Menu.Item onClick={() => this.highlight(true,10,'combined')}>Commerical Net</Menu.Item>
            //     <Menu.Item onClick={() => this.highlight(true,1,'combined')}>Non-Commercial Net</Menu.Item>
            //     <Menu.Item onClick={() => this.highlight(true,2,'combined')}>Non-Reportable Net</Menu.Item>
            //     <Menu.Item onClick={() => this.highlight(false)}>OFF</Menu.Item>
            //   </SubMenu>
            //   <SubMenu className="gx-menu-horizontal" title={<span>Future</span>}>
            //     <Menu.Item onClick={() => this.highlight(true,'','future')}>Default</Menu.Item>
            //     <Menu.Item onClick={() => this.highlight(true,10,'future')}>Commerical Net</Menu.Item>
            //     <Menu.Item onClick={() => this.highlight(true,1,'future')}>Non-Commercial Net</Menu.Item>
            //     <Menu.Item onClick={() => this.highlight(true,2,'future')}>Non-Reportable Net</Menu.Item>
            //     <Menu.Item onClick={() => this.highlight(false)}>OFF</Menu.Item>
            //   </SubMenu>
            // </SubMenu>
            null}
            <SubMenu
              className="gx-menu-horizontal"
              title={<span>Open Interest</span>}
            >
              <Menu.Item onClick={() => this.addPriceOI(true, 1, "daily")}>
                OI Daily
              </Menu.Item>
              <Menu.Item onClick={() => this.addPriceOI(true, 2, "future")}>
                OI Cot Future
              </Menu.Item>
              <Menu.Item onClick={() => this.addPriceOI(true, 4, "future")}>
                OI Spread Future
              </Menu.Item>
              <Menu.Item onClick={() => this.addPriceOI(true, 3, "combined")}>
                OI Cot Combined
              </Menu.Item>
              <Menu.Item onClick={() => this.addPriceOI(true, 5, "combined")}>
                OI Spread Combined
              </Menu.Item>
              <Menu.Item onClick={() => this.addPriceOI(false)}>
                Remove
              </Menu.Item>
            </SubMenu>
            <SubMenu
              className="gx-menu-horizontal"
              title={<span> Cross Pointer</span>}
            >
              <Menu.Item onClick={() => this.crossonoff(true, 1)}>
                Vertical
              </Menu.Item>
              <Menu.Item onClick={() => this.crossonoff(true, 2)}>
                Vertical & Horizontal Cross
              </Menu.Item>
              <Menu.Item onClick={() => this.crossonoff(false, 0)}>
                No Cross
              </Menu.Item>
            </SubMenu>
            <SubMenu
              className="gx-menu-horizontal"
              title={<span>Tooltip</span>}
            >
              <Menu.Item onClick={() => this.tooltip(true)}>ON</Menu.Item>
              <Menu.Item onClick={() => this.tooltip(false)}>OFF</Menu.Item>
            </SubMenu>
            <Menu.Item onClick={() => this.gridonoff()}>Grids</Menu.Item>
            <Menu.Item onClick={() => this.minmax()}>Min/Max Label</Menu.Item>
            <Menu.Item onClick={() => this.increaseheight()}>
              Increase/Reset Height
            </Menu.Item>
          </Menu>
        );
        const colorData = (
          <CirclePicker
            className="add_circle"
            onChange={this.changedrawingcolor.bind(this)}
            colors={pickerColors}
            circleSize={20}
            circleSpacing={5}
          />
        );
        newvar = (
          <div
            className={
              this.state.addvisible
                ? "cust_price_chart container_white"
                : "cust_price_chart"
            }
          >
            <p>
              <span
                style={{ float: "right", display: "inline-block" }}
                className="subtitle_class"
              >
                <Popover
                  overlayClassName="gx-popover-horizantal chart_hamburger_menu"
                  placement="bottomRight"
                  content={changeOptions}
                  trigger="click"
                >
                  <span className="gx-pointer gx-flex-row gx-align-items-center mainIcon">
                    {/* <i class="icon icon-menu" style={{'fontSize':'20px'}}></i>  */}
                    {/* <div className="menu_icons "  ></div> */}
                  </span>
                </Popover>
                <Popover
                  overlayClassName="gx-popover-horizantal chart_hamburger_menu"
                  placement="bottomRight"
                  content={viewtasks}
                  trigger="click"
                >
                  <span
                    className="gx-pointer gx-flex-row gx-align-items-center eyeIcon"
                    style={{ marginTop: "5px" }}
                  >
                    {/* <i class="icon icon-menu" style={{'fontSize':'20px'}}></i>  */}
                    {/* <img alt="" src={require("assets/images/dark_icon/Eye.png")} className="menu_icons"  /> */}
                  </span>
                </Popover>
                {/* <span className="gx-pointer gx-flex-row gx-align-items-center">
                      <i class="icon icon-chart-composed" style={this.state.addvisible ? {'fontSize':'20px'} : { display: 'none' }} onClick={() => this.sniper(enddate)} ></i> 
                  </span>                        */}

                {/* <span className="gx-pointer gx-flex-row gx-align-items-center">
                      <i class="icon icon-table-general" style={{'fontSize':'20px'}} onClick={() => this.gridonoff()} title="Grids"></i> 
                  </span> */}
                <Popover
                  overlayClassName="gx-popover-horizantal"
                  placement="bottomRight"
                  visible={this.state.colorpanel}
                  content={colorData}
                  trigger="click"
                  onCancel={this.handleCancel}
                >
                  <span
                    className="gx-pointer gx-flex-row gx-align-items-center colorIcon"
                    onClick={() => this.showColorPanel()}
                    style={{ marginTop: "5px" }}
                  ></span>
                  {/* <i class="icon icon-divider" style={{'fontSize':'20px'}} onClick={() => this.createDrawing(chart,"horizontal-line")} title="Horizontal Line"></i>  */}
                  {/* <img alt="" src={require("assets/images/dark_icon/ColorPicker.png")} style={{'marginTop':'5px'}}  title="Drawing Colors" onClick={()=>this.showColorPanel()} /> */}
                </Popover>
                {theme == "light" ? (
                  this.state.grouping ? (
                    <span className="gx-pointer gx-flex-row gx-align-items-center">
                      <img
                        alt=""
                        src={require("assets/images/dark_icon/DiconOn.jpeg")}
                        style={{ marginTop: "5px" }}
                        onClick={() => this.createGrouping(chart)}
                        title="Daily Bars Only"
                      />
                    </span>
                  ) : (
                    <span className="gx-pointer gx-flex-row gx-align-items-center">
                      <img
                        alt=""
                        src={require("assets/images/dark_icon/Dicon.jpeg")}
                        style={{ marginTop: "5px" }}
                        onClick={() => this.createGrouping(chart)}
                        title="Daily Bars Only"
                      />
                    </span>
                  )
                ) : this.state.grouping ? (
                  <span className="gx-pointer gx-flex-row gx-align-items-center">
                    <img
                      alt=""
                      src={require("assets/images/light_icon/DiconOn.jpeg")}
                      style={{ marginTop: "5px" }}
                      onClick={() => this.createGrouping(chart)}
                      title="Daily Bars Only"
                    />
                  </span>
                ) : (
                  <span className="gx-pointer gx-flex-row gx-align-items-center">
                    <img
                      alt=""
                      src={require("assets/images/light_icon/Dicon.png")}
                      style={{ marginTop: "5px" }}
                      onClick={() => this.createGrouping(chart)}
                      title="Daily Bars Only"
                    />
                  </span>
                )}
                <span
                  className="gx-pointer gx-flex-row gx-align-items-center menu_icons horizontalLine"
                  id="horizontalLine"
                  style={{ marginTop: "5px" }}
                  onClick={() => this.createDrawing(chart, "horizontal-line")}
                  title="Horizontal Line"
                ></span>
                <span
                  className="gx-pointer gx-flex-row gx-align-items-center menu_icons verticalLine"
                  id="verticalLine"
                  style={{ marginTop: "5px" }}
                  onClick={() => this.createDrawing(chart, "vertical-line")}
                  title="Vertical Line"
                ></span>
                <span
                  className="gx-pointer gx-flex-row gx-align-items-center menu_icons segmentLine"
                  id="segmentLine"
                  style={{ marginTop: "5px" }}
                  onClick={() => this.createDrawing(chart, "line")}
                  title="Segment Line"
                ></span>
                <span
                  className="gx-pointer gx-flex-row gx-align-items-center menu_icons multipleLine"
                  id="multipleLine"
                  style={{ marginTop: "5px" }}
                  onClick={() => this.addVerticalLine1(chart)}
                  title="Multiple Vertical Line"
                ></span>
                <span
                  className="gx-pointer gx-flex-row gx-align-items-center menu_icons Rubber"
                  id="Rubber"
                  onClick={() => this.removeSelectedDrawing(chart)}
                  style={{ marginTop: "5px" }}
                  title="Erase"
                ></span>
                <span
                  className="gx-pointer gx-flex-row gx-align-items-center menu_icons multiRubber"
                  id="multiRubber"
                  onClick={() => this.removeDrawing(chart)}
                  title="Erase All"
                  style={{ marginTop: "5px" }}
                ></span>
                {/* <span className="gx-pointer gx-flex-row gx-align-items-center">
                      <img alt="" src={require("assets/images/dark_icon/ellipse.png")}  className="menu_icons" onClick={() => this.createDrawing(chart,"ellipse")} title="Ellipse" />
                  </span>
                  <span className="gx-pointer gx-flex-row gx-align-items-center">
                      <img alt="" src={require("assets/images/dark_icon/rectangle.png")}  className="menu_icons" onClick={() => this.createDrawing(chart,"rectangle")} title="Rectangle" />
                  </span>
                  <span className="gx-pointer gx-flex-row gx-align-items-center">
                      <img alt="" src={require("assets/images/dark_icon/arrow_up.png")}  className="menu_icons" onClick={() => this.createDrawing(chart,"marker","arrowUp")} title="Marker Up" />
                  </span>
                  <span className="gx-pointer gx-flex-row gx-align-items-center">
                      <img alt="" src={require("assets/images/dark_icon/arrow_down.png")}  className="menu_icons" onClick={() => this.createDrawing(chart,"marker","arrowDown")} title="Marker Down" />
                  </span>
                  <span className="gx-pointer gx-flex-row gx-align-items-center">
                      <img alt="" src={require("assets/images/dark_icon/diamond_ii.png")}  className="menu_icons" onClick={() => this.createDrawing(chart,"marker","diamond")} title="Diamond" />
                  </span>
                  <span className="gx-pointer gx-flex-row gx-align-items-center">
                      <img alt="" src={require("assets/images/dark_icon/circle.png")}  className="menu_icons" onClick={() => this.createDrawing(chart,"marker","circle")} title="Circle" />
                  </span>
                  <span className="gx-pointer gx-flex-row gx-align-items-center">
                      <img alt="" src={require("assets/images/dark_icon/square.png")}  className="menu_icons" onClick={() => this.createDrawing(chart,"marker","square")} title="Square" />
                  </span>
                  <span className="gx-pointer gx-flex-row gx-align-items-center">
                      <img alt="" src={require("assets/images/dark_icon/Rubber.png")}  className="menu_icons" onClick={() => this.removeDrawing(chart)} title="Erase" />
                  </span>
                  <span className="gx-pointer gx-flex-row gx-align-items-center">
                      <img alt="" src={require("assets/images/dark_icon/Rubber.png")}  className="menu_icons" onClick={() => this.removeSelectedDrawing(chart)} title="Erase" />
                  </span>
                  <span className="gx-pointer gx-flex-row gx-align-items-center">
                      <img alt="" src={require("assets/images/dark_icon/VLine.png")}  className="menu_icons" onClick={() => this.addVerticalLine(chart)} title="Multiple Vertical Line" />
                  </span> */}
              </span>
            </p>
            {
              <AnyChart
                width="100%"
                height={height}
                instance={chart}
                isAsync={true}
                style={{ marginLeft: "0px" }}
              />
            }
          </div>
        );
      }
    }
    // if(this.props.loader)
    //   {
    //   this.props.loaderstatus(false);
    //   }
    return (
      <Fullscreen
        enabled={this.state.isFull}
        onChange={(isFull) => this.setState({ isFull })}
      >
        <div style={{ width: "100%" }} className="full-screenable-node">
          <Row>
            <Col lg={12}>
              <span id="rangeselectorContainer"></span>
            </Col>
            <Col lg={12} align="right">
              <span id="rangepickerContainer"></span>
            </Col>
          </Row>
          <Modal
            className="week_modal"
            visible={this.state.weekvisible}
            onCancel={this.handleCancelcot}
          >
            <form onSubmit={this.handleSubmitcot} method="post">
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
          <Modal
            className="technical_modal"
            visible={this.state.showtechnicalindcatorpopup}
            onCancel={this.handleCanceltechnical}
            onOk={this.addcottechnical}
          >
            {this.state.showpopupcontent}
          </Modal>
          {newvar}
        </div>
      </Fullscreen>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    newsindicator1: state.Exchange.newsindicator,
    tsrmvisible1: state.Exchange.tsrmvisible,
    trendmlvisible: state.Exchange.trendmlvisible,
    selectedTrend: state.Exchange.selectedTrend,
    trendData: state.Exchange.trendData,
    trendAIData: state.Exchange.trendAIData,
    cotforecast: state.Exchange.cotforecast,
    priceforecast: state.Exchange.priceforecast,
    hNet: state.Exchange.hNet,
    cotnameArray: state.Exchange.cotnameArray,
    cottechnicalindicator: state.Exchange.cottechnicalindicator,
    sapratetechnicalindicator: state.Exchange.sapratetechnicalindicator,
    savestatus1: state.Exchange.savestatus,
    selectedEcin: state.Exchange.selectedEcin,
    drawingArray: state.Exchange.drawingArray,
    selectedGRAPH: state.Exchange.selectedGRAPH,
    clearcotstatus: state.Exchange.clearcotstatus,
    loader: state.Exchange.loader,
    moveDate: state.Exchange.moveDate,
    scrollData: state.Exchange.scrollData,
    addClick1: state.Exchange.addClicked1,
    graphdata: state.Exchange.graphdata,
    tableData1: state.Exchange.tableData,
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
    exitData: Object.keys(state.Exchange.pricecotData)
      .filter((priceDataIndex) => priceDataIndex == "exit_dates")
      .map((priceDataIndex) => {
        return state.Exchange.pricecotData[priceDataIndex];
      }),
    recession: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "recession")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
      }),
    obo: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "obo")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
      }),
    sDev: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "sDev")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
      }),
    adx: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "adx")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
      }),
    oiData: Object.keys(state.Exchange.pricecotData)
      .filter((priceDataIndex) => priceDataIndex == "oiData")
      .map((priceDataIndex) => {
        return state.Exchange.pricecotData[priceDataIndex];
      }),
    poiv: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "poiv")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
      }),
    priceF: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "priceF")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
      }),
    priceF2: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "priceF2")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
      }),
    SnR1: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "SnR1")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
      }),
    SnR2: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "SnR2")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
      }),
    trend1: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "trend1")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
      }),
    TSRM: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "TSRM")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
      }),
    newsH: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "newsH")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
      }),
  };
};
export default connect(
  mapStateToProps,
  {
    tsrmvisible,
    newsindicator,
    cottechindicator,
    trendclearData,
    getGraphData,
    clearData,
    getmoveDate,
    removedrawing,
    savestatus,
    changeScroller,
    cotclickclear,
    addClicked,
    techindicator,
    tableData,
    mekkoData,
    loaderstatus,
  }
)(PriceCharting);
