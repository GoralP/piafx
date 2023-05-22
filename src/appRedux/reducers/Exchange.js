import ExchangeState from "../states/Exchange";
import {
  EXCHANGE_LIST_LOAD_COMPLETE,
  SEARCH_COMPLETE,
  GET_PRICE_DATA,
  GET_PRICE_DATA_COMPLETE,
  GET_COT_DATA_COMPLETE,
  GET_ECIN_DATA_COMPLETE,
  GET_ECIN_DATA,
  GET_GRAPH_DATA,
  GET_MOVE_DATE,
  GET_GRAPH_DATA_COMPLETE,
  CLEAR_DATA,
  GET_SCROLLER,
  ADD_CLICKED,
  TABLE_DATA,
  COTCLICK_CLEAR,
  ECINCLICK_CLEAR,
  GET_ACCOUNT_DATA,
  GET_ACCOUNT_DATA_COMPLETE,
  SCROLLER_DATES,
  MEKKO_DATA,
  MEKKO_DATA_COMPLETE,
  MEKKO_TYPE,
  PROGRESS,
  LOADER,
  COTLOADER,
  SAVEONEOONE,
  SAVEONEOONETODB,
  SAVEONEOONETODB_COMPLETE,
  GETANNOTATION1,
  GETANNOTATION_COMPLETE,
  GETCOTANNOTATION1,
  GETCOTANNOTATION_COMPLETE,
  SAVECOTONEOONE,
  SAVENOTES,
  GETNOTES,
  GETNOTES_COMPLETE,
  GETTOPOIMOVERS,
  GETTOPOIMOVERS_COMPLETE,
  GETPRICESECTIONDATA,
  GETPRICESECTIONDATA_COMPLETE,
  GETSNRBREAKOUTDATA,
  GETSNRBREAKOUTDATA_COMPLETE,
  GETCOTREPORTDATA,
  GETCOTREPORTDATA_COMPLETE,
  GETSEASONALITYDATA,
  GETSEASONALITYDATA_COMPLETE,
  GETVARIOUSDATA,
  GETVARIOUSDATA_COMPLETE,
  GETOIPERTICKER_COMPLETE,
  SAVETABLE,
  GETTABLE,
  GETTABLE_COMPLETE,
  GETMOSTVIEWEDTICKER,
  GETMOSTVIEWEDTICKER_COMPLETE,
  SCALECHANGE,
  SPLITSCREEN,
  ARRANGEGROUP,
  SAVESETTINGS,
  CONFIRM_MODAL,
  TEST,
  BIGCHART,
  COTGRID,
  COTSCALE,
  INCREASEHEIGHT,
  ABSOLUTE,
  TECH_INDICATORS,
  COT_TECH_INDICATORS,
  GETDACM,
  GETDACM_COMPLETE,
  CALLDACM,
  SAVESTATUS,
  REMOVEDRAWING,
  RESPONSESTATUS,
  TABLE_BLANK,
  GETNEWS,
  GETNEWS_COMPLETE,
  SECTORMODAL,
  EXCHANGEMODAL,
  GETNEWSDATAMAIN,
  GETNEWSDATAMAIN_COMPLETE,
  PRICEFORECAST,
  COTFORECAST,
  GETTREND,
  GETTREND_COMPLETE,
  TRENDCLEAR_DATA,
  GETGAUGE,
  GETGAUGE_COMPLETE,
  GET_PRICE_COT_DATA,
  GET_PRICE_COT_DATA_COMPLETE,
  GETTRENDAI,
  GETTRENDAI_COMPLETE,
  TSRMVISIBLE,
  TRENDMLVISIBLE,
  NEWSINDICATOR,
  ECINCLEAR_DATA,
  GETEQUITY,
  GETEQUITY_COMPLETE,
  GETECINUNDERPRICE,
  GETECINUNDERPRICE_COMPLETE,
  REMOVEECINUNDERPRICE,
  GETSNRDATA_COMPLETE,
  GETSNRDATA,
  GETCORRELL_COMPLETE,
  REMOVECORRELL,
  GETVIDEOS,
  GETVIDEOS_COMPLETE,
  GETEVENTS,
  GETEVENTS_COMPLETE,
  GETSNR2EVENTS,
  GETSNR2EVENTS_COMPLETE,
  GETPATTERNEVENTS,
  GETPATTERNEVENTS_COMPLETE,
  GETFALSEBREAKEVENTS,
  GETFALSEBREAKEVENTS_COMPLETE,
  GETOOPSEVENTS,
  GETOOPSEVENTS_COMPLETE,
  GET_FILTER_STATE,
  SET_COTS_TO_INITIAL,
  GET_CORRELL_DATA,
  GET_CORRELL_DATA_COMPLETE
  // MLSMA,
} from "constants/ActionTypes";
import Exchange from "components/Exchange";
import { DEFAULT_VERSION } from "redux-persist";
const Exchanges = (state, action) => {
  if (state === undefined) {
    return new ExchangeState();
  }
  var selectedCotsarray = state.selectedCots;
  var selectedGraphsarray = state.selectedGRAPH;
  var selectedTrendsarray = state.selectedTrend;
  var selectedEcinarray = state.selectedEcin;
  // var tableDataarray = state.tableData;

  switch (action.type) {
    // case MLSMA:
    //   return {
    //     ...state,
    //     mlsma: action.payload,
    //     state: "mlsmadata"
    //   };
    case GET_CORRELL_DATA:
      return {
        ...state,
        loader: true,
        state: "get_correll_data",
      };
    case GET_CORRELL_DATA_COMPLETE:
      return {
        ...state,
        correllsData: action.payload,
        loader: false,
        state: "get_correll_data_complete",
      };
    case GETOOPSEVENTS:
      return {
        ...state,
        loader: true,
        state: "getoopsevents",
      };
    case GETOOPSEVENTS_COMPLETE:
      return {
        ...state,
        eventsOopsData: action.payload,
        loader: false,
        state: "getoopseventscomplete",
      };
    case GETFALSEBREAKEVENTS:
      return {
        ...state,
        loader: true,
        state: "getfalsebreakevents",
      };
    case GETFALSEBREAKEVENTS_COMPLETE:
      return {
        ...state,
        eventsFBData: action.payload,
        loader: false,
        state: "getfalsebreakeventscomplete",
      };
    case GETSNR2EVENTS:
      return {
        ...state,
        loader: true,
        state: "getsnr2events",
      };
    case GETSNR2EVENTS_COMPLETE:
      return {
        ...state,
        eventsSNR2Data: action.payload,
        loader: false,
        state: "getsnr2eventscomplete",
      };
    case GETPATTERNEVENTS:
      return {
        ...state,
        loader: true,
        state: "getpatternevents",
      };
    case GETPATTERNEVENTS_COMPLETE:
      return {
        ...state,
        patternEventsData: action.payload,
        loader: false,
        state: "getpatterneventscomplete",
      };
    case GETEVENTS:
      return {
        ...state,
        loader: true,
        state: "getevents",
      };
    case GETEVENTS_COMPLETE:
      return {
        ...state,
        eventsData: action.payload,
        loader: false,
        state: "geteventscomplete",
      };
    case GETVIDEOS_COMPLETE:
      return {
        ...state,
        videoLinks: action.payload,
        state: "getvideoscomplete",
      };
    case REMOVECORRELL:
      return {
        ...state,
        correllData: [],
        state: "removecorrelldata",
      };
    case GETCORRELL_COMPLETE:
      return {
        ...state,
        correllData: action.payload,
        state: "getcorrelldatacomplete",
      };
    case GETSNRDATA:
      return {
        ...state,
        snrData: [],
        snrRequestData: action.payload,
        snrSavedStatus: false,
        state: "getsnrdata",
      };
    case GETSNRDATA_COMPLETE:
      return {
        ...state,
        loader: false,
        snrData: action.payload,
        state: "getsnrdatacomplete",
      };
    case REMOVEECINUNDERPRICE:
      return {
        ...state,
        ecinunderpriceData: [],
        state: "removeecinunderprice",
      };
    case GETECINUNDERPRICE:
      return {
        ...state,
        getecinunderprice: action.payload,
        state: "getecinunderprice",
      };
    case GETECINUNDERPRICE_COMPLETE:
      return {
        ...state,
        loader: false,
        ecinunderpriceData: action.payload,
        state: "getecinunderpricecomplete",
      };
    case GETEQUITY:
      return {
        ...state,
        getequity: action.payload,
        state: "getequity",
      };
    case GETEQUITY_COMPLETE:
      return {
        ...state,
        loader: false,
        equityData: action.payload,
        state: "getequitycomplete",
      };
    case NEWSINDICATOR:
      return {
        ...state,
        newsindicator: action.payload,
        state: "newsindicator",
      };
    case TRENDMLVISIBLE:
      return {
        ...state,
        trendmlvisible: action.payload,
        state: "trendmlvisible",
      };
    case TSRMVISIBLE:
      return {
        ...state,
        tsrmvisible: action.payload,
        state: "tsrmvisible",
      };
    case GETTRENDAI:
      return {
        ...state,
        gettrendAI: action.payload,
        state: "gettrend",
      };
    case GETTRENDAI_COMPLETE:
      return {
        ...state,
        loader: false,
        trendAIData: action.payload,
        state: "gettrenAIcomplete",
      };
    case GETGAUGE:
      // console.log('asplaspltrend1',action.payload);
      return {
        ...state,
        getgauge: action.payload,
        state: "getgauge",
      };
    case GETGAUGE_COMPLETE:
      return {
        ...state,
        loader: false,
        gaugeData: action.payload,
        state: "getgaugecomplete",
      };
    case GETTREND:
      selectedTrendsarray.push(action.payload);
      return {
        ...state,
        selectedTrend: selectedTrendsarray,
        gettrend: action.payload,
        state: "gettrend",
      };
    case GETTREND_COMPLETE:
      return {
        ...state,
        // loader : false,
        trendData: action.payload,
        state: "gettrendcomplete",
      };
    case COTFORECAST:
      return {
        ...state,
        cotforecast: action.payload,
        state: "cotforecast",
      };
    case PRICEFORECAST:
      return {
        ...state,
        priceforecast: action.payload,
        state: "priceforecast",
      };
    // case GETNEWSDATAMAIN:
    //   return {
    //     ...state,
    //     // getnews: action.payload,
    //     state: "getnewsmain"
    //   };
    case GETNEWSDATAMAIN_COMPLETE:
      // console.log('asplaspl',action.payload);
      return {
        ...state,
        // loader : false,
        newsDataMain: action.payload,
        state: "getnewsmaincomplete",
      };
    case EXCHANGEMODAL:
      return {
        ...state,
        exchangeModal: action.payload,
        state: "exchangemodal",
      };
    case SECTORMODAL:
      return {
        ...state,
        sectorModal: action.payload,
        state: "sectormodal",
      };
    case GETNEWS:
      return {
        ...state,
        getnews: action.payload,
        state: "getnews",
      };
    case GETNEWS_COMPLETE:
      return {
        ...state,
        loader: false,
        newsData: action.payload,
        state: "getnewscomplete",
      };
    case TABLE_BLANK:
      return {
        ...state,
        tableData: [],
        state: "tableblank",
      };
    case RESPONSESTATUS:
      return {
        ...state,
        response_status: action.payload,
        state: "responsestatus",
      };
    case REMOVEDRAWING:
      return {
        ...state,
        drawingArray: {},
        state: "removedrawing",
      };
    case SAVESTATUS:
      return {
        ...state,
        savestatus: action.payload,
        state: "savestatus",
      };
    case CALLDACM:
      return {
        ...state,
        calldacm: action.payload,
        state: "calldacm",
      };
    case GETDACM:
      return {
        ...state,
        // notesstatus: {status:true},
        getdacm: action.payload,
        state: "getdacm",
      };
    case GETDACM_COMPLETE:
      if (action.payload.length > 0) {
        var ti = JSON.parse(action.payload[0].ti);
        var cti = JSON.parse(action.payload[0].cti);
        var drawingArray = JSON.parse(action.payload[0].drawingArray);
        var ecindrawingArray = JSON.parse(action.payload[0].ecindrawingArray);
        var cotdacm = JSON.parse(action.payload[0].cot);
        var ecindacm = JSON.parse(action.payload[0].ecin);
        var scrollData = JSON.parse(action.payload[0].scrollData);
        var hNet = JSON.parse(action.payload[0].hNet);
        var gaugePeriod = JSON.parse(action.payload[0].gaugePeriod);
        var selectedTrend = JSON.parse(action.payload[0].selectedTrend);
        var newsindicator = JSON.parse(action.payload[0].newsindicator);
        var priceforecast = JSON.parse(action.payload[0].priceforecast);
        var cotforecast = JSON.parse(action.payload[0].cotforecast);
        var snrRequestData = JSON.parse(action.payload[0].snrRequestData);
        var snrSavedstatus = true;
        if (
          Object.keys(snrRequestData).length === 0 &&
          snrRequestData.constructor === Object
        ) {
          snrSavedstatus = false;
        }
      } else {
        var ti = [];
        var cti = {};
        var cotdacm = [];
        var ecindacm = [];
        var drawingArray = {};
        var ecindrawingArray = {};
        var scrollData = [];
        var hNet = { status: false, netgroup: "", nettype: "combined" };
        var selectedTrend = [];
        var gaugePeriod = { slope: 63, william: 10, nclra: 3 };
        var newsindicator = [];
        var priceforecast = { status: false, type: "" };
        var cotforecast = { status: false, type: "" };
        var snrRequestData = {};
        var snrSavedstatus = false;
      }
      // console.log('asplr',selectedTrend);
      return {
        ...state,
        newsindicator: newsindicator,
        priceforecast: priceforecast,
        cotforecast: cotforecast,
        cottechnicalindicator: cti,
        sapratetechnicalindicator: ti,
        cotdacm: { cot: cotdacm, ecin: ecindacm, ai: selectedTrend },
        drawingArray: drawingArray,
        ecindrawingArray: ecindrawingArray,
        savestatus: true,
        scrollData: scrollData,
        hNet: hNet,
        getdacm_respo: action.payload,
        gaugePeriod: gaugePeriod,
        snrRequestData: snrRequestData,
        snrSavedStatus: snrSavedstatus,
        state: "getdacmcomplete",
      };
    case TABLE_BLANK:
      return {
        ...state,
        sapratetechnicalindicator: action.payload,
        state: "techindicators",
      };
    case TECH_INDICATORS:
      return {
        ...state,
        sapratetechnicalindicator: action.payload,
        state: "techindicators",
      };
    case COT_TECH_INDICATORS:
      return {
        ...state,
        cottechnicalindicator: action.payload,
        state: "cottechindicators",
      };
    case ABSOLUTE:
      return {
        ...state,
        absolute: action.payload,
        state: "absolute",
      };
    case INCREASEHEIGHT:
      return {
        ...state,
        increaseheight: action.payload,
        state: "increaseheight",
      };
    case COTSCALE:
      return {
        ...state,
        cotscalestatus: action.payload,
        state: "cotscale",
      };
    case COTGRID:
      return {
        ...state,
        cotgridstatus: action.payload,
        state: "cotgrid",
      };
    case BIGCHART:
      return {
        ...state,
        bigchart: action.payload,
        state: "bigchart",
      };
    case SAVESETTINGS:
      return {
        ...state,
        savesettings: action.payload,
        state: "savesettings",
      };
    case CONFIRM_MODAL:
      return {
        ...state,
        cnfrmmodal: action.payload,
        state: "confirmmodal",
      };
    case ARRANGEGROUP:
      return {
        ...state,
        arrangegroup_status: action.payload,
        state: "splitscreen",
      };
    case SPLITSCREEN:
      return {
        ...state,
        splitscreen_status: action.payload,
        state: "splitscreen",
      };
    case SCALECHANGE:
      return {
        ...state,
        scalechange: { status: action.payload },
        state: "scalechange",
      };
    case GETMOSTVIEWEDTICKER:
      return {
        ...state,
        mostviewedticker: action.payload,
        state: "getmostviewedticker",
      };
    case GETMOSTVIEWEDTICKER_COMPLETE:
      return {
        ...state,
        mostviewedticker_respo: action.payload,
        state: "getmostviewedtickercomplete",
      };
    case SAVETABLE:
      return {
        ...state,
        savetable: action.payload,
        state: "savetable",
      };
    case GETTABLE:
      return {
        ...state,
        gettable: action.payload,
        state: "gettable",
      };
    case GETTABLE_COMPLETE:
      if (action.payload.length > 0) {
        var tabledata = JSON.parse(action.payload[0].tabledata);
      } else {
        var tabledata = [];
      }
      return {
        ...state,
        tableData: tabledata,
        //tablestatus: {status:true},
        //gettable_respo: action.payload,
        state: "gettablecomplete",
      };
    case GETOIPERTICKER_COMPLETE:
      return {
        ...state,
        getoiperticker: action.payload,
        state: "getoipertickercomplete",
      };
    case GETTOPOIMOVERS:
      return {
        ...state,
        loader: true,
        state: "getoimovers",
      };
    case GETTOPOIMOVERS_COMPLETE:
      return {
        ...state,
        getoimovers: action.payload,
        loader: false,
        state: "getoimoverscomplete",
      };
    case GETPRICESECTIONDATA:
      return {
        ...state,
        loader: true,
        state: "getpricesection",
      };
    case GETPRICESECTIONDATA_COMPLETE:
      return {
        ...state,
        pricesection: action.payload,
        loader: false,
        state: "getpricesectioncomplete",
      };
    case GETSNRBREAKOUTDATA:
      return {
        ...state,
        loader: true,
        state: "getsnrbreakout",
      };
    case GETSNRBREAKOUTDATA_COMPLETE:
      return {
        ...state,
        snrbreakoutdata: action.payload,
        loader: false,
        state: "getsnrbreakoutcomplete",
      };
    case GETCOTREPORTDATA:
      return {
        ...state,
        loader: true,
        state: "getcotreport",
      };
    case GETCOTREPORTDATA_COMPLETE:
      return {
        ...state,
        cotreportdata: action.payload,
        loader: false,
        state: "getcotreportcomplete",
      };
    case GETSEASONALITYDATA:
      return {
        ...state,
        loader: true,
        state: "getseasonality",
      };
    case GETSEASONALITYDATA_COMPLETE:
      return {
        ...state,
        seasonalitydata: action.payload,
        loader: false,
        state: "getseasonalitycomplete",
      };
    case GETVARIOUSDATA:
      return {
        ...state,
        loader: true,
        state: "getvarious",
      };
    case GETVARIOUSDATA_COMPLETE:
      return {
        ...state,
        variousdata: action.payload,
        loader: false,
        state: "getvariouscomplete",
      };
    case GETNOTES:
      return {
        ...state,
        // notesstatus: {status:true},
        getnotes_respo: [],
        getnotes: action.payload,
        state: "getnotes",
      };
    case GETNOTES_COMPLETE:
      return {
        ...state,
        notesstatus: { status: true },
        getnotes_respo: action.payload,
        state: "getnotescomplete",
      };
    case SAVENOTES:
      return {
        ...state,
        savenotes: action.payload,
        state: "savenotes",
      };
    case GETCOTANNOTATION1:
      return {
        ...state,
        getcotannotation: action.payload,
        state: "getcotannotations",
      };
    case GETCOTANNOTATION_COMPLETE:
      return {
        ...state,
        getcotannotation_respo: action.payload,
        state: "getcotannotation",
      };
    case SAVECOTONEOONE:
      return {
        ...state,
        cotoneoone: action.payload,
        state: "cotoneoone",
      };
    case GETANNOTATION1:
      return {
        ...state,
        getannotation: action.payload,
        state: "getannotations",
      };
    case GETANNOTATION_COMPLETE:
      return {
        ...state,
        getannotation_respo: action.payload,
        state: "getannotation",
      };

    case SAVEONEOONETODB_COMPLETE:
      return {
        ...state,
        response_array: {
          status: action.payload.status,
          message: action.payload.message,
        },
        response_status: true,
        loader: false,
        oneoonetodb_respo: action.payload,
        state: "oneoonetodb_complete",
      };
    case SAVEONEOONETODB:
      return {
        ...state,
        oneoonetodb: action.payload,
        state: "oneoonetodb",
      };
    case SAVEONEOONE:
      return {
        ...state,
        oneoone: action.payload,
        state: "oneoone",
      };
    case LOADER:
      return {
        ...state,
        loader: action.payload,
        state: "loader",
      };
    case COTLOADER:
      return {
        ...state,
        cotloader: action.payload,
        state: "cotloader",
      };
    // case PROGRESS:
    //   return {
    //     ...state,
    //     progress: action.payload,
    //     state: "progress"
    //   };
    case MEKKO_TYPE:
      return {
        ...state,
        mekkotype: action.payload,
        state: "mekkotype",
      };
    case MEKKO_DATA:
      return {
        ...state,
        mekkoData: action.payload,
        state: "mekkoData",
      };
    case SCROLLER_DATES:
      return {
        ...state,
        scrollerDates: action.payload,
        state: "scrollerDates",
      };
    case GET_ACCOUNT_DATA:
      return {
        ...state,
        acntdata: action.payload,
        state: "acntdata",
      };
    case GET_MOVE_DATE:
      return {
        ...state,
        moveDate: action.payload,
        state: "movedataloaded",
      };
    case GET_SCROLLER:
      return {
        ...state,
        scrollData: action.payload,
        state: "movedataloaded",
      };
    case ADD_CLICKED:
      return {
        ...state,
        addClicked1: action.payload,
        state: "clickedloaded",
      };
    case TABLE_DATA:
      return {
        ...state,
        addClicked1: "",
        cotclicked: { clicked: "yes" },
        ecinclicked: { clicked: "yes" },
        tableData: [...state.tableData, action.payload], //tableDataarray,
        state: "tableloaded",
      };
    case EXCHANGE_LIST_LOAD_COMPLETE:
      return {
        ...state,
        exchangeList: action.payload,
        state: "exchangesloaded",
      };
    case SEARCH_COMPLETE:
      return {
        ...state,
        seachList: action.payload,
        state: "seachloaded",
      };
    case GET_PRICE_DATA_COMPLETE:
      // selectedGraphsarray = [];
      return {
        ...state,
        loader: false,
        cotscalestatus: false,
        scalechange: { status: false },
        clearcotstatus: { status: true },
        clearecinstatus: { status: true },
        acntdatadone: [],
        splitscreen_status: false,
        arrangegroup_status: false,
        priceData: action.payload,
        state: "pricedataloaded",
      };
    case GET_COT_DATA_COMPLETE:
      //  var latestcotdata = action.payload;
      //  selectedCotdatasarray.push(latestcotdata)
      return {
        ...state,
        cotData: action.payload,
        state: "cotdataloaded",
      };
    case GET_ECIN_DATA:
      var latestcot = action.payload.selectedEcin;
      // fruits.includes("Mango")
      selectedEcinarray.push(latestcot);
      return {
        ...state,
        selectedEcin: selectedEcinarray,
        state: "cotdataloaded",
      };
    case SET_COTS_TO_INITIAL:
      return {
        ...state,
        setInitialCot: action.payload,
      };
    case CLEAR_DATA:
      return {
        ...state,
        //  ecinData:[],
        graphdata: [],
        // clearcotstatus: { status: true },
      };
    case TRENDCLEAR_DATA:
      return {
        ...state,
        trendData: [],
      };
    case ECINCLEAR_DATA:
      return {
        ...state,
        ecinData: [],
      };
    case ECINCLICK_CLEAR:
      return {
        ...state,
        ecinclicked: "",
      };
    case COTCLICK_CLEAR:
      return {
        ...state,
        cotclicked: "",
      };

    case GET_GRAPH_DATA:
      // var latestgraph = action.payload.selectedGRAPH;
      var latestgraph = action.payload.selectedGRAPH;
      // selectedGraphsarray.push(latestgraph)
      selectedGraphsarray.push(action.payload);
      // var latestcot = action.payload.selectedCOT;
      // selectedCotsarray.push(latestcot)
      return {
        ...state,
        // selectedGRAPHData: action.payload,
        selectedGRAPH: selectedGraphsarray,
        state: "graphdataloaded",
      };
    case GET_GRAPH_DATA_COMPLETE:
      return {
        ...state,
        loader: false,
        graphdata: action.payload,
        state: "graphdataloaded",
      };
    case GET_ECIN_DATA_COMPLETE:
      return {
        ...state,
        loader: false,
        ecinData: action.payload,
        state: "ecindataloaded",
      };
    case GET_ACCOUNT_DATA_COMPLETE:
      return {
        ...state,
        loader: false,
        cotscalestatus: false,
        scalechange: { status: false },
        arrangegroup_status: false,
        acntdatadone: action.payload,
        state: "accountdataloaded",
      };
    case MEKKO_DATA_COMPLETE:
      return {
        ...state,
        mekkodatadone: action.payload,
        state: "mekkodataloaded",
      };
    case GET_PRICE_COT_DATA:
      return {
        ...state,
        getpricecot: action.payload,
        state: "getpricecot",
      };
    case GET_PRICE_COT_DATA_COMPLETE:
      return {
        ...state,
        pricecotData: action.payload,
        state: "getpricecotcomplete",
      };
    case GET_FILTER_STATE:
      return {
        ...state,
        filterState: action.payload,
      };
    case GET_PRICE_DATA:
      return {
        ...state,
        setInitialCot: false,
        eventsOopsData: [],
        eventsFBData: [],
        eventsData: [],
        filterState: false,
        patternEventsData: [],
        seachList: [],
        correllData: [],
        correllsData: [],
        ecinData: [],
        trendData: [],
        priceData: [],
        graphdata: [],
        selectedGRAPH: [],
        selectedEcin: [],
        moveDate: "",
        scrollData: [],
        addClicked1: "",
        tableData: [],
        cotclicked: "",
        ecinclicked: "",
        acntdata: [],
        acntdatadone: [],
        scrollerDates: [],
        mekkoData: [],
        mekkodatadone: [],
        mekkotype: 1,
        savenotes: [],
        getnotes: [],
        getnotes_respo: [],
        getoimovers: [],
        pricesection: [],
        snrbreakoutdata: [],
        cotreportdata: [],
        seasonalitydata: [],
        variousdata: [],
        getoiperticker: [],
        notesstatus: { status: false },
        clearcotstatus: { status: false },
        clearecinstatus: { status: false },
        savetable: [],
        gettable: [],
        gettable_respo: [],
        tablestatus: { status: false },
        mostviewedticker: [],
        // mostviewedticker_respo : [],
        scalechange: { status: false },
        splitscreen_status: false,
        arrangegroup_status: false,
        savesettings: [],
        cnfrmmodal: { ticker: "", status: false },
        test: false,
        bigchart: false,
        cotgridstatus: false,
        cotscalestatus: false,
        increaseheight: false,
        absolute: false,
        sapratetechnicalindicator: [],
        cottechnicalindicator: {},
        drawingArray: {},
        ecindrawingArray: {},
        getdacm: [],
        getdacm_respo: [],
        cotdacm: { cot: [], ecin: [], ai: [] },
        ecindacm: [],
        savestatus: true,
        calldacm: false,
        cotnameArray: [],
        getnews: [],
        // newsData : [],
        exchangeModal: false,
        sectorModal: false,
        newsDataMain: [],
        hNet: { status: false, netgroup: "", nettype: "combined" },
        priceforecast: { status: false, type: "" },
        cotforecast: { status: false, type: "" },
        newsindicator: [],
        gettrend: [],
        trendData: [],
        getgauge: [],
        gaugeData: [],
        selectedTrend: [],
        gaugePeriod: { slope: 63, william: 10, nclra: 3 },
        trendmlvisible: { status: false, type: "" },
        ecinunderpriceData: [],
        state: "pricedata",
      };
    default:
      return state;
  }
};

const mapStateToProps = (state) => {
  return {
    ecinData: state.Exchange.ecinData,
  };
};
export default Exchanges;
