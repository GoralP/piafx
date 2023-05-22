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
  getdacm,
  getPriceCotdata,
  getgauge,
  getnotes,
  calldacm,
  gettable,
  loaderstatus,
  savestatus,
} from "appRedux/actions/Exchange";
import CircularProgress from "components/CircularProgress";
import PriceChart from "components/dashboard/MyDashboard/PriceChartExperiment";
import CotChart from "components/dashboard/MyDashboard/CotChart";
import EcinChart from "components/dashboard/MyDashboard/EcinChart";
import MekkoChart from "components/dashboard/MyDashboard/MekkoChart";
import PriceAI from "components/dashboard/MyDashboard/PriceAI";
import BubbleChartSE from "components/dashboard/MyDashboard/BubbleChartSE";
import Gauge from "components/dashboard/MyDashboard/Gauge";
import { CSVLink, CSVDownload } from "react-csv";
import ReactExport from "react-export-excel";
import Pdf from "react-to-pdf";
import { spawn } from "redux-saga/effects";
import Fullscreen from "react-full-screen";
import PropTypes from "prop-types";
var format = function(input) {
  var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
  var pattern1 = /(\d{2})\-(\d{2})\-(\d{4})/;
  if (!input) {
    return null;
  }
  if (input.match(pattern)) {
    return input.replace(pattern, "$3-$2-$1");
  }
  if (input.match(pattern1)) {
    return input.replace(pattern1, "$3-$2-$1");
    // return input;
  }
};
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
const snr2Columns = [
  {
    title: "Support Levels",
    dataIndex: "support",
  },
  {
    title: "Resistance Levels",
    dataIndex: "resistance",
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
  static contextTypes = {
    router: PropTypes.object,
  };
  constructor(props, context) {
    super(props, context);
  }

  state = {
    inputValue: 1,
    notesvisible: false,
    notes: [],
    isFull: false,
    gaugeModalVisible: false,
    williamPeriod: 10,
    slopePeriod: 63,
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
    var divContents = document.querySelector("#htmlpdf_div").innerHTML;
    var printWindow = window.open();
    printWindow.document.write("<html><head><title>DIV Contents</title>");
    // printWindow.document.write('<style>@page{size: A4 landscape;}</style>');
    printWindow.document.write("<style> @media print {}</style>");
    printWindow.document.write("</head><body >");
    printWindow.document.write(divContents);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  }
  reportExport = () => {
    this.props.calldacm(true);
    this.props.loaderstatus(true);
    setTimeout(() => {
      this.context.router.history.push({
        pathname: "/report",
        state: { ticker: localStorage.getItem("ticker_code") },
      });
    }, 500);
  };
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
      var newsindicator = this.props.newsindicator;
      var priceforecast = this.props.priceforecast;
      var cotforecast = this.props.cotforecast;
      var dacmdata = {
        newsindicator: newsindicator,
        priceforecast: priceforecast,
        cotforecast: cotforecast,
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
    var snr2data = [];
    if (this.props.SnR2.length > 0) {
      // if(this.props.SnR2[0].length>0)
      // {
      var low = this.props.SnR2[0]["low"];
      low.sort(function(a, b) {
        return b["value"] - a["value"];
      });
      low.forEach((element, key) => {
        // currentOI = this.props.scans[0][0]['currentOI']
        // currentPrice = this.props.scans[0][0]['currentPrice']
        var da = {
          support:
            parseFloat(element["value"]) > 1
              ? parseInt(element["value"])
              : parseFloat(element["value"]).toFixed(4),
        };
        snr2data.push(da);
      });
      var high = this.props.SnR2[0]["high"];
      high.sort(function(a, b) {
        return b["value"] - a["value"];
      });
      high.forEach((element, key) => {
        // currentOI = this.props.scans[0][0]['currentOI']
        // currentPrice = this.props.scans[0][0]['currentPrice']
        // var da =
        //   {
        //     resistance : element['value']
        //   }
        snr2data[key]["resistance"] =
          parseFloat(element["value"]) > 1
            ? parseInt(element["value"])
            : parseFloat(element["value"]).toFixed(4);
      });
      // }
    }
    // console.log('asplsnr',snr2data);
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
        if (this.props.news[0][i].source["title"]) {
          source = this.props.news[0][i].source["title"];
        }
        var da = {
          key:
            month_name(new Date(this.props.news[0][i]["date"])) +
            " " +
            this.props.news[0][i]["time"].substr(0, 5),
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
        <Menu.Item onClick={() => this.reportExport()}>Report Export</Menu.Item>
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
      // if(theme == 'coffee')
      // {
      bulletchart.background().fill("#FFFFFF 0");
      // }
      // Set bulletchart size and position settings
      bulletchart.bounds(0, 0, "100%", 125);
      // bulletchart title
      // bulletchart.title("Revenue");
      // Initiate bulletchart drawing
      // bulletchart.container("bulletchart");
      // bulletchart.draw();
    }
    var tablebody = <tbody></tbody>;
    // console.log('aspl',Math.max.apply(Math, this.props.tableData.map(function(o) { return o.y; })))
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
          style={{ overflow: "scroll" }}
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
            {/* <button onClick={()=>this.print()}>Print</button> */}
            <Card className="dash_background">
              {/* <div align="right">{this.props.savestatus?<Button onClick={() => this.saveDacm()}>Save</Button>:<Button type="primary" onClick={() => this.saveDacm()}>Save</Button>}</div> */}
              {/* <div ref={ref}> */}
              <Row className="custom_main_chart">
                <Col lg={14}>
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
                  <div>
                    <PriceChart />
                  </div>
                  {/* </Row> */}
                  {/* </Fullscreen> */}
                  {/* <Row>  */}
                  {/* <CotChart /> */}
                  {/* </Row>  */}
                </Col>
                <Col lg={10}>
                  <Card className="cust_ecin_div cust_new_css ">
                    {/* {console.log(new Date(format(this.props.moveDate.moveDate)).toDateString("dd-MM-yyyy"))} */}
                    <Row>
                      <Col lg={12}>
                        <span className="quote-title">Selected Date </span>
                        <span className="quote-date">
                          {new Date(
                            format(this.props.moveDate.moveDate)
                          ).toDateString()}
                        </span>
                      </Col>
                      <Col lg={12}>
                        <Popover
                          overlayClassName="gx-popover-horizantal chart_hamburger_menu "
                          placement="bottomRight"
                          content={changeOptions}
                          trigger="click"
                        >
                          <span className="gx-pointer gx-flex-row gx-align-items-center toggle_right">
                            <i
                              class="icon icon-menu"
                              style={{ fontSize: "20px" }}
                            ></i>
                          </span>
                        </Popover>
                      </Col>
                    </Row>
                    <Widget title="" styleName="gx-card-tabs">
                      <Tabs defaultActiveKey="1" className="se_tabs">
                        <TabPane
                          tab="Overview"
                          key="1"
                          className="price-overview"
                        >
                          <Gauge />
                          {this.props.overview.length > 0 ? (
                            <div>
                              <div className="tickername">
                                {this.props.overview[0].tickername}(
                                {this.props.overview[0].tickercode})
                              </div>
                              <div className="subtitle-price">
                                <span className="dark-text">
                                  {this.props.overview[0].close}
                                </span>{" "}
                                <span
                                  className={
                                    this.props.overview[0].point_change >= 0
                                      ? "custom-green-text"
                                      : "custom-red-text"
                                  }
                                >
                                  {this.props.overview[0].point_change}(
                                  {this.props.overview[0].per_change}%)
                                </span>
                              </div>
                              <div className="high-low-tag">
                                <span className="high-tag">
                                  {this.props.overview[0].high}
                                </span>{" "}
                                <span className="low-tag">
                                  {this.props.overview[0].low}
                                </span>
                              </div>
                              <div className="price-quote">
                                <span className="quote-title">
                                  Quote Overview for
                                </span>{" "}
                                <span className="quote-date">
                                  {this.props.overview[0].date}{" "}
                                </span>
                                <span className="quote-title">
                                  | Selected Date{" "}
                                </span>
                                <span className="quote-date">
                                  {new Date(
                                    format(this.props.moveDate.moveDate)
                                  ).toDateString()}
                                </span>
                              </div>
                              <hr />
                              <div className="bullet-chart-text">
                                <div className="common-text">
                                  <span>5D Low</span> <span>5D High</span>
                                </div>
                                <div className="common-text">
                                  <span>{this.props.overview[0].low5day}</span>{" "}
                                  <span>{this.props.overview[0].high5day}</span>
                                </div>
                              </div>
                              <div class="bulletchart_div">
                                <AnyChart
                                  id="bulletchart"
                                  width="100%"
                                  height={20}
                                  instance={bulletchart}
                                />
                              </div>
                              <hr />
                              <div className="common-text">
                                <span>Previous Close</span>{" "}
                                <span>
                                  {this.props.overview[0].previous_close}
                                </span>
                              </div>
                              <hr />
                              <div className="common-text">
                                <span>Volume</span>{" "}
                                <span>{this.props.overview[0].volume}</span>
                              </div>
                              <hr />
                              <div className="common-text">
                                <span>Openinterest</span>{" "}
                                <span>
                                  {this.props.overview[0].openinterest !=
                                  "0" ? (
                                    this.props.overview[0].openinterest
                                  ) : (
                                    <span>N.A.</span>
                                  )}
                                </span>
                              </div>
                              <hr />
                              <div className="common-text">
                                <span>Stochastic %K(14)</span>{" "}
                                <span>{this.props.overview[0].stocK}%</span>
                              </div>
                              <hr />
                              <div className="common-text">
                                <span>5-Day Change</span>{" "}
                                <span
                                  className={
                                    this.props.overview[0].point_change_5day >=
                                    0
                                      ? "custom-green-text"
                                      : "custom-red-text"
                                  }
                                >
                                  {this.props.overview[0].point_change_5day}(
                                  {this.props.overview[0].per_change_5day})
                                </span>
                              </div>
                              <hr />
                              <div className="common-text">
                                <span>52-Week Range</span>{" "}
                                <span>
                                  {this.props.overview[0].low52day} -{" "}
                                  {this.props.overview[0].high52day}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </TabPane>
                        <TabPane tab="Price/OI Scan" key="2" className="scan">
                          <Card className="cust_table">
                            <span style={{ color: "white" }}>
                              Current OI : {currentOI} Current Price :{" "}
                              {currentPrice}
                            </span>
                            <div className="table_analyzer_div">
                              <Table
                                className="gx-table-no-bordered cust_table_analyzer"
                                columns={scancolumns}
                                dataSource={oidata}
                                pagination={false}
                                bordered={false}
                                size="small"
                              />
                              <br />
                              <Table
                                className="gx-table-no-bordered cust_table_analyzer snr2"
                                columns={snr2Columns}
                                dataSource={snr2data}
                                pagination={false}
                                bordered={false}
                                size="small"
                              />
                            </div>
                          </Card>
                        </TabPane>
                        <TabPane tab="Table Analyzer" key="3">
                          {/* <Card className="cust_table">
                                    <div className="export_div" align="right">
                                    <span className="gx-pointer gx-flex-row gx-align-items-center ">
                                      <i class="icon icon-check-circle-o" style= {{'fontSize':'20px'}} onClick={this.savetabledata}></i> 
                                      </span>
                                      <Dropdown overlay={exportTable} >
                                        <Button size="small">
                                          Export As <Icon type="down"/>
                                        </Button>
                                      </Dropdown>
                                    </div>
                                    <Row>
                                        <Table className="gx-table-no-bordered table_analyzer" columns={columns} dataSource={data} pagination={false} bordered={false}
                                        size="small" />
                                    </Row>
                                </Card> */}
                          <div className="table_analyzer_div">
                            {table_analyzer}
                          </div>
                        </TabPane>
                        <TabPane tab="Notes" key="4">
                          <Card className="notes_card">
                            <Row>{sticky}</Row>
                          </Card>
                        </TabPane>

                        <TabPane
                          tab="Sun Burst"
                          className="first_tab"
                          id="first_tab"
                          key="5"
                        >
                          <MekkoChart />
                        </TabPane>
                        {/* <TabPane  tab="Mekko" className="second_tab" id="second_tab"  key="6" ></TabPane> */}
                        <TabPane tab="News" key="7">
                          <div className="news_table_title" align="center">
                            Relevant News For {ticker_name}
                          </div>
                          <div className="table_analyzer_div news_table">
                            <Table
                              className="gx-table-no-bordered cust_table_analyzer"
                              showHeader={false}
                              columns={newscolumns}
                              dataSource={news}
                              pagination={{ pageSize: 10 }}
                              bordered={false}
                              size="small"
                            />
                          </div>
                        </TabPane>
                        <TabPane tab="Seas." key="8">
                          {/* <PriceAI /> */}
                          <BubbleChartSE />
                        </TabPane>
                        {/* <TabPane  tab="Seas.1"   key="9" >
                                <PriceCycle />
                            </TabPane> */}
                        <TabPane
                          tab="Trend ML"
                          className="gauge_tab"
                          id="gauge_tab"
                          key="9"
                        ></TabPane>
                        {/* {grparray.includes("LEGACY")?<TabPane  tab="Legacy Charts" className="first_tab" id="first_tab"  key="4" ></TabPane>:<TabPane  tab="Legacy Charts" className="first_tab" id="first_tab"  key="4" disabled></TabPane>}
                            {grparray.includes("TFF")?<TabPane  tab="TFF Charts" className="second_tab" id="second_tab"  key="5" ></TabPane>:<TabPane  tab="TFF Charts" className="second_tab" id="second_tab"  key="5" disabled></TabPane>}
                            {grparray.includes("DISAGGREGATED")?<TabPane  tab="Disaggregated Charts" className="third_tab" id="third_tab"  key="6" ></TabPane>:<TabPane  tab="Disaggregated Charts" className="third_tab" id="third_tab"  key="6" disabled></TabPane>} */}
                      </Tabs>
                    </Widget>
                  </Card>

                  {/* <Card className="cust_table">
                        <Row>
                            <Table className="gx-table-no-bordered" columns={columns} dataSource={data} pagination={false} bordered={false}
                        size="small" />
                        </Row>
                      </Card> */}
                  <EcinChart />

                  {/* <Card className="cust_ecin_div mekko_tab_card">
                        <Widget title="Mekko Charts" styleName="gx-card-tabs">  
                          <Tabs class="mekko_chart_tabs" id="mekko_chart_tabs" defaultActiveKey="1">
                          {grparray.includes("LEGACY")?<TabPane  tab="Legacy Charts" className="first_tab" id="first_tab"  key="1" ></TabPane>:<TabPane  tab="Legacy Charts" className="first_tab" id="first_tab"  key="1" disabled></TabPane>}
                          {grparray.includes("TFF")?<TabPane  tab="TFF Charts" className="second_tab" id="second_tab"  key="2" ></TabPane>:<TabPane  tab="TFF Charts" className="second_tab" id="second_tab"  key="2" disabled></TabPane>}
                          {grparray.includes("DISAGGREGATED")?<TabPane  tab="Disaggregated Charts" className="third_tab" id="third_tab"  key="3" ></TabPane>:<TabPane  tab="Disaggregated Charts" className="third_tab" id="third_tab"  key="3" disabled></TabPane>}
                          </Tabs>
                        </Widget>
                        </Card> */}

                  <Row
                    className="ecin_chart"
                    style={{ paddingTop: "10px" }}
                  ></Row>
                </Col>
              </Row>
              {/* </div> */}
            </Card>
            <Modal
              className="technical_modal"
              visible={this.state.gaugeModalVisible}
              onCancel={this.handleCancelgauge}
              onOk={this.addgaugeindicator}
            >
              <div>
                <Row>
                  <Col lg={12}>
                    <lable>LRA Period</lable>
                    <select
                      className="ti_modal_fields"
                      name="slopePeriod"
                      value={this.props.gaugePeriod["slope"]}
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
                      value={this.props.gaugePeriod["williom"]}
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
                      value={this.props.gaugePeriod["slope"]}
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
          </Auxiliary>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedTrend: state.Exchange.selectedTrend,
    newsindicator: state.Exchange.newsindicator,
    priceforecast: state.Exchange.priceforecast,
    cotforecast: state.Exchange.cotforecast,
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
    SnR2: Object.keys(state.Exchange.priceData)
      .filter((priceDataIndex) => priceDataIndex == "SnR2")
      .map((priceDataIndex) => {
        return state.Exchange.priceData[priceDataIndex];
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
