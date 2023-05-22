import React, { Component, PureComponent } from "react";
import {
  Col,
  Row,
  Card,
  Tabs,
  Table,
  Modal,
  Menu,
  Popover,
  Dropdown,
  Button,
  Icon,
  Badge,
} from "antd";
import Widget from "components/Widget";
import ReactStickies from "react-stickies";
import Auxiliary from "util/Auxiliary";
import AnyChart from "anychart-react";
import anychart from "anychart";
import { connect } from "react-redux";
import SubMenu from "antd/lib/menu/SubMenu";
import {
  tableblank,
  mekkotype,
  savenotes,
  savetable,
  getPricedata,
  getPriceCotdata,
  getdacm,
  getgauge,
  getnotes,
  calldacm,
  gettable,
  loaderstatus,
  savestatus,
} from "appRedux/actions/Exchange";
import CircularProgress from "components/CircularProgress";
import PriceChart from "components/dashboard/MyDashboard/PriceCharthtml";
import CotChart from "components/dashboard/MyDashboard/CotChart";
import EcinChart from "components/dashboard/MyDashboard/EcinCharthtml";
import MekkoChart from "components/dashboard/MyDashboard/MekkoChart";
import PriceAI from "components/dashboard/MyDashboard/PriceAI";
import Gauge from "components/dashboard/MyDashboard/Gauge";
import { CSVLink, CSVDownload } from "react-csv";
import ReactExport from "react-export-excel";
import Pdf from "react-to-pdf";
import { spawn } from "redux-saga/effects";
import Fullscreen from "react-full-screen";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const ref = React.createRef();
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
const dynamicSNRColumns = [
  {
    title: "Support Levels",
    dataIndex: "support",
    align: "center",
  },
  {
    title: "Resistance Levels",
    dataIndex: "resistance",
    align: "center",
  },
];
const columns = [
  {
    title: "Label",
    dataIndex: "lable",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "COT",
    dataIndex: "cot",
  },
  {
    title: "Ec. In.",
    dataIndex: "ecin",
  },
];
const scancolumns = [
  {
    title: "Duration",
    dataIndex: "duration",
  },
  {
    title: "OI Max",
    dataIndex: "max",
  },
  {
    title: "OI Min",
    dataIndex: "min",
  },
  {
    title: "OI Max Index",
    dataIndex: "index",
  },
  {
    title: "Price Max",
    dataIndex: "pricemax",
  },
  {
    title: "Price Min",
    dataIndex: "pricemin",
  },
  {
    title: "Price Max Index",
    dataIndex: "priceindex",
  },
];
const newscolumns = [
  {
    title: "Date & Time",
    dataIndex: "key",
  },
  {
    title: "Sentiment",
    dataIndex: "sentiment",
    render: (text) => {
      // console.log('asplaspl',text);
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
    },
  },
  {
    title: "Title",
    dataIndex: "title",
    render: (text) => {
      var temp = text.split("xxSPLITxx");
      return (
        <a class="news_title" target="_blank" href={temp[1]}>
          {temp[0]}
          <br />
          <span style={{ fontSize: "10px" }}>{temp[2]}</span>
        </a>
      );
    },
  },
];
class MyDashboard extends PureComponent {
  state = {
    inputValue: 1,
    notesvisible: false,
    notes: [],
    isFull: false,
    gaugeModalVisible: false,
    williamPeriod: 10,
    slopePeriod: 100,
    nclraPeriod: 3,
  };
  componentWillMount() {
    if (this.props.location.state) {
      let ticker_id = this.props.location.state.ticker;
      //  console.log('asplticker',ticker_id);
      if (ticker_id == "undefined" || ticker_id == "" || ticker_id == null) {
        // alert('Hi');
      } else {
        this.props.loaderstatus(true);
        localStorage.setItem("ticker_code", ticker_id);
        this.setState({
          exchange: ticker_id,
        });
        var reqvar = { selectedExchange: ticker_id };
        this.props.getPricedata(reqvar);
        this.props.getPriceCotdata(reqvar);
        var user_id = localStorage.getItem("user_id");
        this.props.getnotes({ user_id: user_id, ticker_id: ticker_id });
        this.props.gettable({ user_id: user_id, ticker_id: ticker_id });
        this.props.getdacm({ user_id: user_id, ticker_id: ticker_id });
      }
    }
  }
  onChange = (value) => {
    this.setState({
      inputValue: value,
    });
  };
  onnoteChange = (notes) => {
    // console.log('asplnotes',notes);
    this.setState({
      // Update the notes state
      notes,
    });
  };
  notesdisplay = () => {
    this.setState({
      // Update the notes state
      notesvisible: true,
    });
  };
  noteshide = () => {
    const note = this.state.notes;
    note.map((note) => {
      delete note.editorState;
    });
    var user_id = localStorage.getItem("user_id");
    var ticker_code = localStorage.getItem("ticker_code");
    var data = { user_id: user_id, ticker_id: ticker_code, notes: note };
    this.props.savenotes(data);
  };
  savetabledata = () => {
    var user_id = localStorage.getItem("user_id");
    var ticker_code = localStorage.getItem("ticker_code");
    var data = {
      user_id: user_id,
      ticker_id: ticker_code,
      table: this.props.tableData,
    };
    this.props.savetable(data);
  };
  // saveDacm = () => {
  //   const note = this.state.notes;
  //   note.map(note => {
  //     delete note.editorState;
  //   })
  //   var user_id = localStorage.getItem('user_id');
  //   var ticker_code = localStorage.getItem('ticker_code');
  //   var ecin = this.props.selectedEcin;
  //   var cot = this.props.selectedGRAPH;
  //   var ti = this.props.sapratetechnicalindicator;
  //   var table = this.props.tableData;
  //   var drawingArray = this.props.drawingArray;
  //   var ecindrawingArray = this.props.ecindrawingArray;
  //   var data={ecindrawingArray:ecindrawingArray,user_id:user_id,ticker_id:ticker_code,notes:note,ecin:ecin,cot:cot,ti:ti,table:table,drawingArray:drawingArray};
  //   console.log('aspldata',data);
  //   this.props.savenotes(data)
  //   this.props.calldacm(false)
  // }
  handleChange = (event) => {
    // console.log('asplrrr',[event.target.name]);
    if ([event.target.name] == "williamPeriod") {
      this.props.gaugePeriod["william"] = event.target.value;
    }
    if ([event.target.name] == "slopePeriod") {
      this.props.gaugePeriod["slope"] = event.target.value;
    }
    if ([event.target.name] == "nclraPeriod") {
      this.props.gaugePeriod["nclra"] = event.target.value;
    }
    this.setState({ [event.target.name]: event.target.value });
  };
  goFull = () => {
    this.setState({ isFull: true });
  };
  deletetableRow = (key) => {
    // console.log('asplkey',key)
    this.props.tableData.splice(key, 1);
    // this.setState({deletedrow:key});
    this.props.savestatus(false);
  };
  deleteTableAnalyzer = () => {
    this.props.tableblank();
    this.props.savestatus(false);
  };
  gaugeModal = () => {
    this.setState({ gaugeModalVisible: true });
  };
  handleCancelgauge = () => {
    this.setState({ gaugeModalVisible: false });
  };
  addgaugeindicator = () => {
    this.props.gaugePeriod["slope"] = this.state.slopePeriod;
    this.props.gaugePeriod["william"] = this.state.williamPeriod;
    this.props.gaugePeriod["nclra"] = this.state.nclraPeriod;
    this.props.loaderstatus(true);
    var date = this.props.moveDate.moveDate;
    // console.log('asplaspl',date);
    this.props.getgauge({
      ticker_code: localStorage.getItem("ticker_code"),
      date: date,
      william_period: this.state.williamPeriod,
      slope_period: this.state.slopePeriod,
      nclra_period: this.state.nclraPeriod,
    });
    this.setState({ gaugeModalVisible: false });
  };
  print() {
    // window.print()
    //   html2canvas(document.querySelector("#htmlpdf_div")).then(canvas => {
    //     document.body.appendChild(canvas);  // if you want see your screenshot in body.
    //     const imgData = canvas.toDataURL('image/png');
    //     const pdf = new jsPDF();
    //     pdf.addImage(imgData, 'PNG', 0, 0, 0, 0);
    //     pdf.save("download.pdf");
    // });

    // var printWindow = window.open('?','_self');
    var printWindow = window.open();

    printWindow.document.write("<html><head><title>Piafx Report</title>");
    printWindow.document.write("<style>@page{size: A4 landscape;}</style>");

    printWindow.document.write(
      "<style> @media print { .cust_price_chart.cust_chart_box.pdf { width: 100%; } .ecin_flag { height: 17px; width: 25px; margin-right: 10px; display: inline-block; float: left; } table{width:100%},aside.note-wrap.note { background: #fff !important; }}</style>"
    );
    printWindow.document.write(
      "<script>window.onafterprint = function () { window.close(); }</script>"
    );

    printWindow.document.write("</head><body>");
    var divContents = document.querySelector("#htmlpdf_div").innerHTML;
    console.log("divContents--->", divContents);
    printWindow.document.write(divContents);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  }
  render() {
    // console.log('asplnews',this.props.gaugePeriod);
    if (this.props.calldacm1) {
      const note = this.state.notes;
      note.map((note) => {
        delete note.editorState;
      });
      var user_id = localStorage.getItem("user_id");
      var ticker_code = localStorage.getItem("ticker_code");
      var ecin = this.props.selectedEcin;
      var cot = this.props.selectedGRAPH;
      var ti = this.props.sapratetechnicalindicator;
      var cti = this.props.cottechnicalindicator;
      var table = this.props.tableData;
      var drawingArray = this.props.drawingArray;
      var ecindrawingArray = this.props.ecindrawingArray;
      var scrollData = this.props.scrollData;
      var hNet = this.props.hNet;
      var selectedTrend = this.props.selectedTrend;
      var gaugePeriod = this.props.gaugePeriod;
      var dacmdata = {
        gaugePeriod: gaugePeriod,
        selectedTrend: selectedTrend,
        ecindrawingArray: ecindrawingArray,
        user_id: user_id,
        ticker_id: ticker_code,
        notes: note,
        ecin: ecin,
        cot: cot,
        ti: ti,
        table: table,
        drawingArray: drawingArray,
        scrollData: scrollData,
        cti: cti,
        hNet: hNet,
      };
      this.props.savenotes(dacmdata);
      this.props.calldacm(false);
    }
    var dynamicSNRdata = [];
    if (this.props.priceforecast.status && this.props.overview.length > 0) {
      if (this.props.priceforecast.type == 2) {
        var supportKey = 0;
        var resistanceKey = 0;
        if ("data" in this.props.snrData) {
          this.props.snrData["data"].sort(function(a, b) {
            return b["level"] - a["level"];
          });
          this.props.snrData["data"].forEach((element, key) => {
            if (this.props.snrData["openValue"] < element["level"]) {
              if (!dynamicSNRdata[resistanceKey]) {
                dynamicSNRdata[resistanceKey] = [];
              }
              dynamicSNRdata[resistanceKey]["resistance"] = element["level"];
              resistanceKey++;
            }
            if (this.props.snrData["openValue"] > element["level"]) {
              if (!dynamicSNRdata[supportKey]) {
                dynamicSNRdata[supportKey] = [];
              }
              dynamicSNRdata[supportKey]["support"] = element["level"];
              supportKey++;
            }
          });
        }
      } else if (
        this.props.priceforecast.type == 3 &&
        "data" in this.props.snrData
      ) {
        console.log("this.props.snrData", this.props.snrData);
        if (
          this.props.snrData["data"]["low"] &&
          this.props.snrData["data"]["high"]
        ) {
          const tempArray = this.props.snrData["data"]["low"].concat(
            this.props.snrData["data"]["high"]
          );
          // var low = this.props.snrData['low']
          let supportKey = 0;
          let resistanceKey = 0;
          tempArray.sort(function(a, b) {
            return b - a;
          });
          tempArray.forEach((element, key) => {
            // currentOI = this.props.scans[0][0]['currentOI']
            // currentPrice = this.props.scans[0][0]['currentPrice']

            if (this.props.snrData["openValue"] > element) {
              if (!dynamicSNRdata[supportKey]) {
                dynamicSNRdata[supportKey] = [];
              }
              dynamicSNRdata[supportKey]["support"] = parseFloat(
                element
              ).toFixed(4);
              supportKey++;
            }
            if (this.props.snrData["openValue"] < element) {
              if (!dynamicSNRdata[resistanceKey]) {
                dynamicSNRdata[resistanceKey] = [];
              }
              dynamicSNRdata[resistanceKey]["resistance"] = parseFloat(
                element
              ).toFixed(4);
              resistanceKey++;
            }
          });
        }
        // if(this.props.snrData['high'])
        // {
        //   var high = this.props.snrData['high']
        //   high.sort(function(a, b){return b-a})
        //   high.forEach((element,key) => {
        //   // currentOI = this.props.scans[0][0]['currentOI']
        //   // currentPrice = this.props.scans[0][0]['currentPrice']
        //   // var da =
        //   //   {
        //   //     resistance : element
        //   //   }
        //   if(this.props.overview[0]['close']>element)
        //   {
        //     dynamicSNRdata[key]['support'] = parseFloat(element).toFixed(4);
        //   }
        //   if(this.props.overview[0]['close']<element)
        //   {
        //     dynamicSNRdata[key]['resistance'] = parseFloat(element).toFixed(4);
        //   }
        // });
        // }
      } else if (
        this.props.priceforecast.type == 4 &&
        "data" in this.props.snrData
      ) {
        if (
          this.props.priceData.length > 0 &&
          this.props.priceData[0].length > 0
        ) {
          var last_date = this.props.priceData[0][
            this.props.priceData[0].length - 1
          ]["date"];
          var supportKey = 0;
          var resistanceKey = 0;
          this.props.snrData["data"].sort(function(a, b) {
            return b["Y1"] - a["Y1"];
          });
          this.props.snrData["data"].forEach((element, key) => {
            if (last_date == element["X1"]) {
              if (this.props.snrData["openValue"] < element["Y1"]) {
                if (!dynamicSNRdata[resistanceKey]) {
                  dynamicSNRdata[resistanceKey] = [];
                }
                dynamicSNRdata[resistanceKey]["resistance"] = parseFloat(
                  element["Y1"]
                ).toFixed(4);
                resistanceKey++;
              }
              if (this.props.snrData["openValue"] > element["Y1"]) {
                if (!dynamicSNRdata[supportKey]) {
                  dynamicSNRdata[supportKey] = [];
                }
                dynamicSNRdata[supportKey]["support"] = parseFloat(
                  element["Y1"]
                ).toFixed(4);
                supportKey++;
              }
            }
          });
        }
        // console.log('this.props.snrData',this.props.snrData);
        // this.props.snrData.forEach((element,key) => {
        //   var controller = firstPlot.annotations();
        //   var trendline = controller.line({
        //     xAnchor: element['X0'],
        //     valueAnchor: element['Y0'],
        //     secondXAnchor: element['X1'],
        //     // allowEdit: false,
        //     secondValueAnchor: element['Y1']
        //   });

        //   if(element['X1'] == verticalline_date)
        //   {
        //     // console.log('asplkey',temp);
        //     // console.log('asplval',element['y1']);
        //     firstPlot
        //     .textMarker(temp)
        //     .value(element['Y1'])
        //     .text(parseFloat(element['Y1'])>1?parseInt(element['Y1']):parseFloat(element['Y1']).toFixed(4))
        //     .anchor('right-center')
        //     .offsetX(10)
        //     .align('right')
        //     .zIndex(100)
        //     .fontSize(12)
        //     .offsetY(-10)
        //     .fontColor(color)
        //     .axis(firstPlot.yAxis());
        //     temp = temp + 1;
        //   }
        // })
      } else if (
        this.props.priceforecast.type == 5 &&
        "data" in this.props.snrData
      ) {
        if (
          this.props.priceData.length > 0 &&
          this.props.priceData[0].length > 0
        ) {
          var last_date = this.props.priceData[0][
            this.props.priceData[0].length - 1
          ]["date"];
          var supportKey = 0;
          var resistanceKey = 0;
          console.log("newdate11", this.props.snrData);
          this.props.snrData["data"].sort(function(a, b) {
            return b["Y1"] - a["Y1"];
          });
          this.props.snrData["data"].forEach((element, key) => {
            var endpoint =
              ((element["Y1"] - element["Y0"]) /
                (new Date(element["X1"]).getTime() -
                  new Date(element["X0"]).getTime())) *
                (new Date(last_date).getTime() -
                  new Date(element["X0"]).getTime()) +
              element["Y0"];
            if (endpoint > 0) {
              console.log("newdate132", endpoint);
              // if(element['Lable'] == 'Avg. Resistance' || (this.props.snrData[key+1] && this.props.snrData[key+1]['Lable'] == 'Avg. Resistance') || (this.props.snrData[key+2] && this.props.snrData[key+2]['Lable'] == 'Avg. Resistance'))
              // {
              // if((element['Lable'] == 'Resistance' || element['Lable'] == 'Avg. Resistance') && this.props.overview[0]['close']<element['Y1'])
              if (this.props.snrData["openValue"] < element["Y1"]) {
                if (!dynamicSNRdata[resistanceKey]) {
                  dynamicSNRdata[resistanceKey] = [];
                }
                dynamicSNRdata[resistanceKey]["resistance"] = parseFloat(
                  endpoint
                ).toFixed(4);
                resistanceKey++;
              }
              // }
              // if(element['Lable'] == 'Avg. Support' || (this.props.snrData[key+1] && this.props.snrData[key+1]['Lable'] == 'Avg. Support') || (this.props.snrData[key+2] && this.props.snrData[key+2]['Lable'] == 'Avg. Support'))
              // {
              // if((element['Lable'] == 'Support' || element['Lable'] == 'Avg. Support') && this.props.overview[0]['close']>element['Y1'])
              if (this.props.snrData["openValue"] > element["Y1"]) {
                if (!dynamicSNRdata[supportKey]) {
                  dynamicSNRdata[supportKey] = [];
                }
                dynamicSNRdata[supportKey]["support"] = parseFloat(
                  endpoint
                ).toFixed(4);
                supportKey++;
              }
              // }
            }
          });
        }
      }
    }
    var oidata = [];
    var currentOI = "";
    var currentPrice = "";
    if (this.props.scans.length > 0) {
      if (this.props.scans[0].length > 0) {
        currentOI = this.props.scans[0][0]["currentOI"];
        currentPrice = this.props.scans[0][0]["currentPrice"];
        oidata = [
          {
            duration: "20 Years",
            max: this.props.scans[0][0]["year_20_max"],
            min: this.props.scans[0][0]["year_20_min"],
            index: this.props.scans[0][0]["year_20_index"],
            pricemax: this.props.scans[0][0]["year_20_price_max"],
            pricemin: this.props.scans[0][0]["year_20_price_min"],
            priceindex: this.props.scans[0][0]["year_20_price_index"],
          },
          {
            duration: "10 Years",
            max: this.props.scans[0][0]["year_10_max"],
            min: this.props.scans[0][0]["year_10_min"],
            index: this.props.scans[0][0]["year_10_index"],
            pricemax: this.props.scans[0][0]["year_10_price_max"],
            pricemin: this.props.scans[0][0]["year_10_price_min"],
            priceindex: this.props.scans[0][0]["year_10_price_index"],
          },
          {
            duration: "5 Years",
            max: this.props.scans[0][0]["year_5_max"],
            min: this.props.scans[0][0]["year_5_min"],
            index: this.props.scans[0][0]["year_5_index"],
            pricemax: this.props.scans[0][0]["year_5_price_max"],
            pricemin: this.props.scans[0][0]["year_5_price_min"],
            priceindex: this.props.scans[0][0]["year_5_price_index"],
          },
          {
            duration: "3 Years",
            max: this.props.scans[0][0]["year_3_max"],
            min: this.props.scans[0][0]["year_3_min"],
            index: this.props.scans[0][0]["year_3_index"],
            pricemax: this.props.scans[0][0]["year_3_price_max"],
            pricemin: this.props.scans[0][0]["year_3_price_min"],
            priceindex: this.props.scans[0][0]["year_3_price_index"],
          },
          {
            duration: "1 Years",
            max: this.props.scans[0][0]["year_1_max"],
            min: this.props.scans[0][0]["year_1_min"],
            index: this.props.scans[0][0]["year_1_index"],
            pricemax: this.props.scans[0][0]["year_1_price_max"],
            pricemin: this.props.scans[0][0]["year_1_price_min"],
            priceindex: this.props.scans[0][0]["year_1_price_index"],
          },
          {
            duration: "6 Months",
            max: this.props.scans[0][0]["month_6_max"],
            min: this.props.scans[0][0]["month_6_min"],
            index: this.props.scans[0][0]["month_6_index"],
            pricemax: this.props.scans[0][0]["month_6_price_max"],
            pricemin: this.props.scans[0][0]["month_6_price_min"],
            priceindex: this.props.scans[0][0]["month_6_price_index"],
          },
        ];
      }
    }
    var news = [];
    if (this.props.news.length > 0) {
      var j = 1;
      for (var i = 0; i < this.props.news[0].length; i++) {
        var source = "";
        if (this.props.news[0][i].media) {
          source = this.props.news[0][i].media;
        }
        var da = {
          key: month_name(new Date(this.props.news[0][i]["date"])),
          sentiment: this.props.news[0][i]["sentiment"],
          title:
            this.props.news[0][i].title +
            "xxSPLITxx" +
            this.props.news[0][i].url +
            "xxSPLITxx" +
            source,
        };

        news.push(da);
        j++;
      }
    }
    // console.log('asplrohan',news);
    var d = [];
    // console.log('asplrohan',this.props.tableData);
    // if(this.props.tableData.length>0)
    //   {
    //     var j = 1;
    //     for(var i=0;i<this.props.tableData.length;i++)
    //      {
    //        var da =
    //         {
    //         key : '1',
    //         lable : this.props.tableData[i].symbol,
    //         date : this.props.tableData[i].date,
    //         price : this.props.tableData[i].price,
    //         cot : this.props.tableData[i]['LEG OI non Spreading'],
    //         ecin : this.props.tableData[i].ecin,
    //         }

    //        d.push(da);
    //        j++;
    //      }
    //   }
    const data = d;

    const TabPane = Tabs.TabPane;

    // const changeOptions = (
    //   <Menu className="chart_hamburger_ul">
    //     <SubMenu className="gx-menu-horizontal" title={<span>Chart</span>}>
    //       <Menu.Item onClick={() => this.props.mekkotype(true)}>Combined</Menu.Item>
    //       <Menu.Item onClick={() => this.props.mekkotype(false)}>Future</Menu.Item>
    //     </SubMenu>
    //   </Menu>
    // );
    var grparray = [];
    if (this.props.cot_menulist.length > 0) {
      Object.keys(this.props.cot_menulist[0]).map((familyIndex) => {
        grparray.push(familyIndex);
      });
    }
    // console.log('asplcot',grparray);
    const changeOptions = (
      <Menu className="chart_hamburger_ul">
        <SubMenu
          className="gx-menu-horizontal"
          title={<span>Report Chart Types</span>}
        >
          {grparray.includes("LEGACY") ? (
            <SubMenu className="gx-menu-horizontal" title={<span>LEGACY</span>}>
              <Menu.Item onClick={() => this.props.mekkotype(1)}>
                Combined
              </Menu.Item>
              <Menu.Item onClick={() => this.props.mekkotype(2)}>
                Future
              </Menu.Item>
            </SubMenu>
          ) : null}
          {grparray.includes("TFF") ? (
            <SubMenu className="gx-menu-horizontal" title={<span>TFF</span>}>
              <Menu.Item onClick={() => this.props.mekkotype(3)}>
                Combined
              </Menu.Item>
              <Menu.Item onClick={() => this.props.mekkotype(4)}>
                Future
              </Menu.Item>
            </SubMenu>
          ) : null}
          {grparray.includes("DISAGGREGATED") ? (
            <SubMenu
              className="gx-menu-horizontal"
              title={<span>DISAGGREGATED</span>}
            >
              <Menu.Item onClick={() => this.props.mekkotype(5)}>
                Combined
              </Menu.Item>
              <Menu.Item onClick={() => this.props.mekkotype(6)}>
                Future
              </Menu.Item>
            </SubMenu>
          ) : null}
        </SubMenu>
        {this.props.tableData.length > 0 ? (
          <Menu.Item onClick={() => this.deleteTableAnalyzer()}>
            Delete Table Content
          </Menu.Item>
        ) : null}
        <Menu.Item onClick={() => this.gaugeModal()}>Gauge Input</Menu.Item>
      </Menu>
    );
    // console.log('asplcot1',changeOptions);
    function handleMenuClick(e) {
      console.log("click", e);
    }
    const exportTable = (
      <Menu onClick={handleMenuClick}>
        <ExcelFile element={<Menu.Item key="1"> .xlsx</Menu.Item>}>
          <ExcelSheet data={data} name="Employees">
            <ExcelColumn label="Key" value="key" />
            <ExcelColumn label="Label" value="lable" />
            <ExcelColumn label="Date" value="date" />
            <ExcelColumn label="Price" value="price" />
            <ExcelColumn label="Cot" value="cot" />
            <ExcelColumn label="ECIN" value="ecin" />
          </ExcelSheet>
        </ExcelFile>
        <Menu.Item key="2">
          <CSVLink data={data}>.csv</CSVLink>
        </Menu.Item>
      </Menu>
    );

    // if(this.props.priceData.length>0 )
    //   {
    //     localStorage.setItem('prestate',JSON.stringify(this.props));
    //   }
    if (this.props.notesstatus.status) {
      if (this.props.getnotes_respo.length > 0) {
        var notes = JSON.parse(this.props.getnotes_respo[0].notes);
        this.setState({
          notes,
        });
        this.props.notesstatus.status = false;
      } else {
        this.props.notesstatus.status = false;
        var r = [
          {
            grid: {
              w: 2,
              h: 2,
              x: 0,
              y: null,
              i: "d2074d82-d836-169a-b744-3e95fb25c5b3",
              moved: false,
              static: false,
            },
            id: "d2074d82-d836-169a-b744-3e95fb25c5b3",
            title: "Title",
            color: "#FBE4BE",
            degree: "-1deg",
            timeStamp: "",
            contentEditable: true,
          },
        ];
        this.onnoteChange(r);
      }
    }
    const sticky = (
      <ReactStickies notes={this.state.notes} onChange={this.onnoteChange} />
    );
    var bulletchart;
    var theme = localStorage.getItem("theme");
    if (theme == "coffee") {
      anychart.theme(anychart.themes.coffee);
    }
    if (this.props.overview.length > 0) {
      var overall_diff =
        this.props.overview[0].high5day - this.props.overview[0].low5day;
      var close_diff =
        this.props.overview[0].high5day - this.props.overview[0].close;
      var value = 100 - (close_diff * 100) / overall_diff;
      bulletchart = anychart.bullet([
        {
          value: 100,
          type: "bar",
          gap: 0.1,
          fill: "#cf4140",
          stroke: null,
        },
        {
          value: value,
          type: "bar",
          gap: 0.1,
          fill: "green",
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
      // Set bulletchart ranges
      bulletchart
        .range()
        .from(0)
        .to(100);
      if (theme == "coffee") {
        bulletchart.background().fill("#FFFFFF 0");
      }
      // Set bulletchart size and position settings
      bulletchart.bounds(0, 0, "100%", 125);
      // bulletchart title
      // bulletchart.title("Revenue");
      // Initiate bulletchart drawing
      // bulletchart.container("bulletchart");
      // bulletchart.draw();
    }
    var tablebody = <tbody></tbody>;
    if (this.props.tableData.length > 0) {
      tablebody = (
        <tbody>
          {this.props.tableData.map((item, key) => {
            return (
              <tr>
                {Object.keys(item).map((subitem, subkey) => {
                  if (
                    subitem == "cot" ||
                    subitem == "ecin" ||
                    subitem == "description" ||
                    subitem == "format" ||
                    subitem == "datestamp"
                  ) {
                    // return()
                  } else {
                    return <td align="center">{item[subitem]}</td>;
                  }
                })}
                <td align="center">
                  <span className="gx-pointer gx-flex-row gx-align-items-center">
                    <i
                      class="icon icon-trash"
                      style={{ fontSize: "15px" }}
                      onClick={() => this.deletetableRow(key)}
                      title="Delete"
                    ></i>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      );
    }
    var table_analyzer = <table className="cust_table_analyzer"></table>;
    if (this.props.tableData.length > 0) {
      var count = 1;
      table_analyzer = (
        <table
          border={1}
          className="cust_table_analyzer"
          style={{
            overflow: "scroll",
            margin: "15px 0 20px",
            border: "none",
            borderSpacing: "0",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            {this.props.tableData.map((item, key) => {
              if (key == 0) {
                return Object.keys(item).map((subitem, subkey) => {
                  if (
                    subitem == "cot" ||
                    subitem == "ecin" ||
                    subitem == "description" ||
                    subitem == "format" ||
                    subitem == "datestamp"
                  ) {
                    // return()
                  } else {
                    return <th align="center">{subitem.toUpperCase()}</th>;
                  }
                });
              }
            })}
            <th align="center">DELETE</th>
          </thead>
          {tablebody}
        </table>
      );
    }
    var ticker_name = "";
    if (this.props.tickerData[0]) {
      ticker_name = this.props.tickerData[0][0]["short_desc"];
    } else {
      ticker_name = localStorage.getItem("ticker_code");
    }
    return (
      <div>
        <div align="right">
          <Button className="print_button" onClick={() => this.print()}>
            Print
          </Button>
        </div>
        <div id="htmlpdf_div">
          {this.props.loader ? (
            <div>
              <CircularProgress className="gx-loader-view cot_loader" />
            </div>
          ) : (
            ""
          )}
          {this.props.cotloader ? (
            <div>
              <CircularProgress className="gx-loader-view cot_loader" />
            </div>
          ) : (
            ""
          )}
          {this.props.priceData.length > 0 ? (
            <Auxiliary>
              <Card className="dash_background">
                {/* <div align="right">{this.props.savestatus?<Button onClick={() => this.saveDacm()}>Save</Button>:<Button type="primary" onClick={() => this.saveDacm()}>Save</Button>}</div> */}
                {/* <div ref={ref}> */}
                <Row className="custom_main_chart">
                  <Col lg={14}>
                    <table style={{ width: "100%", tableLayout: "fixed" }}>
                      <tr>
                        <td></td>
                        <td
                          style={{ textAlign: "right", paddingRight: "20px" }}
                        >
                          User name
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            verticalAlign: "middle",
                            paddingLeft: "60px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "35px",
                              fontWeight: "bold",
                              fontFamily: "Neue Haas Grotesk Display Pro",
                              display: "inline-block",
                            }}
                          >
                            {localStorage.getItem("ticker_code")}
                          </span>
                          <span
                            style={{
                              fontSize: "25px",
                              fontWeight: "100",
                              fontFamily: "Neue Haas Grotesk Display Pro",
                              display: "inline-block",
                              margin: "0 10px",
                            }}
                          >
                            CME
                          </span>
                          <span
                            style={{
                              fontSize: "20px",
                              fontWeight: "300",
                              fontStyle: "italic",
                              fontFamily: "Neue Haas Grotesk Display Pro",
                              display: "inline-block",
                            }}
                          >
                            20/10/2020
                          </span>
                        </td>

                        {/* <span style={{fontSize:"24px",fontFamily: 'Neue Haas Grotesk Display Pro',fontWeight:"bold",margin:"0",verticalAlign:"middle",display:"inline-block"}}>Piafx</span> */}
                        <td
                          style={{
                            textAlign: "right",
                            verticalAlign: "middle",
                            paddingRight: "20px",
                          }}
                        >
                          <img
                            alt=""
                            src={require("assets/images/LogoHeimdallr.png")}
                            className="sidebar_head_logo"
                            style={{
                              width: "auto",
                              height: "60px",
                              display: "inline",
                              margin: "0 0 0 15px",
                            }}
                          />
                        </td>
                      </tr>
                    </table>
                    {/* <Pdf targetRef={ref} filename="code-example.pdf">
                      {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
                    </Pdf> 
                    <div ref={ref} visible={false}>
                    <PriceChart visible={false} />
                    <EcinChart />
                    </div> */}
                    {/* <Fullscreen enabled={this.state.isFull} onChange={isFull => this.setState({isFull})}> */}
                    {/* <Row className="full-screenable-node"> */}
                    {/* <div id="container"></div>*/}
                    {/* <div > */}

                    <PriceChart />

                    {/* </div> */}
                    {/* </Row> */}
                    {/* </Fullscreen> */}
                    {/* <Row>  */}
                    {/* <CotChart /> */}
                    {/* </Row>  */}
                    {/* </Col>
                      </Row><Row>
                      <Col lg={10} > */}

                    {/* <span style={{fontSize:"24px",fontWeight:"bold",fontFamily: 'Neue Haas Grotesk Display Pro',display:"block",textAlign:"center"}}>Economic Indicator</span>
                        <EcinChart /> */}
                    <span
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        fontFamily: "Neue Haas Grotesk Display Pro",
                        display: "block",
                        textAlign: "center",
                      }}
                    >
                      Table Analyzer
                    </span>
                    <div className="table_analyzer_div">
                      {table_analyzer}
                      {this.props.priceforecast.status &&
                      "snrName" in this.props.snrRequestData ? (
                        <>
                          <span
                            style={{
                              fontSize: "24px",
                              fontWeight: "bold",
                              fontFamily: "Neue Haas Grotesk Display Pro",
                              display: "block",
                              textAlign: "center",
                            }}
                          >
                            {this.props.snrRequestData.snrName}
                          </span>
                          <div align="center">
                            <span>
                              {this.props.snrRequestData.type
                                .charAt(0)
                                .toUpperCase() +
                                this.props.snrRequestData.type.slice(1)}
                              -Start Date:{this.props.snrRequestData.start_date}
                              -End Date:{this.props.snrRequestData.end_date}
                            </span>
                          </div>
                        </>
                      ) : null}
                      <Table
                        rowKey="table_htmlpdf"
                        className="gx-table-no-bordered cust_table_analyzer snr2"
                        columns={dynamicSNRColumns}
                        dataSource={dynamicSNRdata}
                        pagination={false}
                        bordered={false}
                        size="small"
                      />
                    </div>
                    <span
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        fontFamily: "Neue Haas Grotesk Display Pro",
                        display: "block",
                        textAlign: "center",
                      }}
                    >
                      Notes
                    </span>
                    <Row>{sticky}</Row>

                    <Row
                      className="ecin_chart"
                      style={{ paddingTop: "10px" }}
                    ></Row>
                  </Col>
                </Row>
                {/* </div> */}
              </Card>
            </Auxiliary>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    snrRequestData: state.Exchange.snrRequestData,
    snrData: state.Exchange.snrData,
    priceforecast: state.Exchange.priceforecast,
    selectedTrend: state.Exchange.selectedTrend,
    gaugePeriod: state.Exchange.gaugePeriod,
    hNet: state.Exchange.hNet,
    moveDate: state.Exchange.moveDate,
    cottechnicalindicator: state.Exchange.cottechnicalindicator,
    sapratetechnicalindicator: state.Exchange.sapratetechnicalindicator,
    notesstatus: state.Exchange.notesstatus,
    savestatus: state.Exchange.savestatus,
    calldacm1: state.Exchange.calldacm,
    getnotes_respo: state.Exchange.getnotes_respo,
    loader: state.Exchange.loader,
    cotloader: state.Exchange.cotloader,
    tableData: state.Exchange.tableData,
    selectedEcin: state.Exchange.selectedEcin,
    selectedGRAPH: state.Exchange.selectedGRAPH,
    drawingArray: state.Exchange.drawingArray,
    ecindrawingArray: state.Exchange.ecindrawingArray,
    scrollData: state.Exchange.scrollData,
    priceData: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "tickers_search")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
      }),
    overview: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "overview")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
      }),
    scans: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "scans")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
      }),
    tickerData: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "tickers_details")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
      }),
    cot_menulist: Object.keys(state.Exchange.pricecotData)
      .filter((priceDataIndex) => priceDataIndex == "cot_data")
      .map((priceDataIndex) => {
        return state.Exchange.pricecotData[priceDataIndex];
      }),
    news: Object.keys(state.Exchange.pricecotData)
      .filter((priceDataIndex) => priceDataIndex == "news")
      .map((priceDataIndex) => {
        return state.Exchange.pricecotData[priceDataIndex];
      }),
    graphdata: state.Exchange.graphdata,
    ecinData: state.Exchange.ecinData,
  };
};
export default connect(
  mapStateToProps,
  {
    tableblank,
    getPriceCotdata,
    getdacm,
    mekkotype,
    getgauge,
    savenotes,
    savetable,
    savestatus,
    getPricedata,
    calldacm,
    getnotes,
    gettable,
    loaderstatus,
  }
)(MyDashboard);
