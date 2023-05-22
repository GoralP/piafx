import {
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
  EXCHANGE_LIST_LOADED,
  EXCHANGE_LIST_LOAD_COMPLETE,
  SEARCH_CODE,
  SEARCH_COMPLETE,
  GET_PRICE_DATA,
  GET_PRICE_DATA_COMPLETE,
  GET_COT_DATA,
  GET_GRAPH_DATA,
  GET_COT_DATA_COMPLETE,
  GET_ECIN_DATA,
  GET_ECIN_DATA_COMPLETE,
  GET_GRAPH_DATA_COMPLETE,
  GET_MOVE_DATE,
  CLEAR_DATA,
  GET_SCROLLER,
  ADD_CLICKED,
  TABLE_DATA,
  ECINCLICK_CLEAR,
  COTCLICK_CLEAR,
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
  GETOIPERTICKER,
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
  GETTRENDAI,
  GETTRENDAI_COMPLETE,
  GET_PRICE_COT_DATA,
  GET_PRICE_COT_DATA_COMPLETE,
  TSRMVISIBLE,
  TRENDMLVISIBLE,
  NEWSINDICATOR,
  ECINCLEAR_DATA,
  GETEQUITY,
  GETEQUITY_COMPLETE,
  GETECINUNDERPRICE,
  GETECINUNDERPRICE_COMPLETE,
  REMOVEECINUNDERPRICE,
  GETSNRDATA,
  GETSNRDATA_COMPLETE,
  GETCORRELL,
  GETCORRELL_COMPLETE,
  REMOVECORRELL,
  GETVIDEOS,
  GETVIDEOS_COMPLETE,
  GETEVENTS,
  GETEVENTS_COMPLETE,
  GETPATTERNEVENTS,
  GETPATTERNEVENTS_COMPLETE,
  GETSNR2EVENTS,
  GETSNR2EVENTS_COMPLETE,
  GETFALSEBREAKEVENTS,
  GETFALSEBREAKEVENTS_COMPLETE,
  GETOOPSEVENTS,
  GETOOPSEVENTS_COMPLETE,
  GET_FILTER_STATE,
  SET_COTS_TO_INITIAL,
  // MLSMA
} from "constants/ActionTypes";
// export const MLSMAindicator = (data) => {
//   return {
//       type: MLSMA,
//       payload : data
//   };
// };
export const setInitialCots = (data) => {
  return {
    type: SET_COTS_TO_INITIAL,
    payload: data,
  };
};
export const getOopsEventsComplete = (data) => {
  return {
    type: GETOOPSEVENTS_COMPLETE,
    payload: data,
  };
};
export const getOopsEvents = (data) => {
  return {
    type: GETOOPSEVENTS,
    payload: data,
  };
};
export const getFalseBreakEventsComplete = (data) => {
  return {
    type: GETFALSEBREAKEVENTS_COMPLETE,
    payload: data,
  };
};
export const getFalseBreakEvents = (data) => {
  return {
    type: GETFALSEBREAKEVENTS,
    payload: data,
  };
};
export const getSNR2EventsComplete = (data) => {
  return {
    type: GETSNR2EVENTS_COMPLETE,
    payload: data,
  };
};
export const getSNR2Events = (data) => {
  return {
    type: GETSNR2EVENTS,
    payload: data,
  };
};
export const getPatternEventsComplete = (data) => {
  return {
    type: GETPATTERNEVENTS_COMPLETE,
    payload: data,
  };
};
export const getPatternEvents = (data) => {
  return {
    type: GETPATTERNEVENTS,
    payload: data,
  };
};
export const getEventsComplete = (data) => {
  return {
    type: GETEVENTS_COMPLETE,
    payload: data,
  };
};
export const getEvents = (data) => {
  return {
    type: GETEVENTS,
    payload: data,
  };
};
export const getVideosComplete = (data) => {
  return {
    type: GETVIDEOS_COMPLETE,
    payload: data,
  };
};
export const getVideo = () => {
  return {
    type: GETVIDEOS,
  };
};
export const getCorrellComplete = (data) => {
  return {
    type: GETCORRELL_COMPLETE,
    payload: data,
  };
};
export const removeCorrell = () => {
  return {
    type: REMOVECORRELL,
  };
};
export const getCorrell = (data) => {
  return {
    type: GETCORRELL,
    payload: data,
  };
};
export const getSnRDataComplete = (data) => {
  return {
    type: GETSNRDATA_COMPLETE,
    payload: data,
  };
};
export const getSnRData = (data) => {
  return {
    type: GETSNRDATA,
    payload: data,
  };
};
export const removeEcinUnderPrice = (data) => {
  return {
    type: REMOVEECINUNDERPRICE,
    payload: data,
  };
};
export const getEcinUnderPricedata = (data) => {
  return {
    type: GETECINUNDERPRICE,
    payload: data,
  };
};
export const getEcinUnderPricedatacomplete = (data) => {
  return {
    type: GETECINUNDERPRICE_COMPLETE,
    payload: data,
  };
};
export const getequity = (data) => {
  return {
    type: GETEQUITY,
    payload: data,
  };
};
export const getequitycomplete = (data) => {
  return {
    type: GETEQUITY_COMPLETE,
    payload: data,
  };
};
export const newsindicator = (data) => {
  return {
    type: NEWSINDICATOR,
    payload: data,
  };
};
export const gettrendAIcomplete = (data) => {
  return {
    type: GETTRENDAI_COMPLETE,
    payload: data,
  };
};
export const gettrendAI = (data) => {
  return {
    type: GETTRENDAI,
    payload: data,
  };
};
export const getgaugecomplete = (data) => {
  return {
    type: GETGAUGE_COMPLETE,
    payload: data,
  };
};
export const getgauge = (data) => {
  return {
    type: GETGAUGE,
    payload: data,
  };
};
export const gettrendcomplete = (data) => {
  return {
    type: GETTREND_COMPLETE,
    payload: data,
  };
};
export const gettrend = (data) => {
  return {
    type: GETTREND,
    payload: data,
  };
};
export const trendmlvisible = (data) => {
  return {
    type: TRENDMLVISIBLE,
    payload: data,
  };
};
export const tsrmvisible = (data) => {
  return {
    type: TSRMVISIBLE,
    payload: data,
  };
};
export const priceforecast = (data) => {
  return {
    type: PRICEFORECAST,
    payload: data,
  };
};
export const cotforecast = (data) => {
  return {
    type: COTFORECAST,
    payload: data,
  };
};
export const getnewsdatamaincomplete = (data) => {
  // console.log('asplabc',data)
  return {
    type: GETNEWSDATAMAIN_COMPLETE,
    payload: data,
  };
};
export const getnewsdatamain = () => {
  return {
    type: GETNEWSDATAMAIN,
  };
};
export const exchangemodal = (data) => {
  return {
    type: EXCHANGEMODAL,
    payload: data,
  };
};
export const sectormodal = (data) => {
  return {
    type: SECTORMODAL,
    payload: data,
  };
};
export const getnewscomplete = (data) => {
  return {
    type: GETNEWS_COMPLETE,
    payload: data,
  };
};
export const getnews = (data) => {
  return {
    type: GETNEWS,
    payload: data,
  };
};
export const tableblank = (data) => {
  return {
    type: TABLE_BLANK,
    payload: data,
  };
};
export const responsestatus = (data) => {
  return {
    type: RESPONSESTATUS,
    payload: data,
  };
};
export const removedrawing = (data) => {
  return {
    type: REMOVEDRAWING,
    payload: data,
  };
};
export const savestatus = (data) => {
  return {
    type: SAVESTATUS,
    payload: data,
  };
};
export const calldacm = (data) => {
  return {
    type: CALLDACM,
    payload: data,
  };
};
export const getdacmcomplete = (data) => {
  return {
    type: GETDACM_COMPLETE,
    payload: data,
  };
};
export const getdacm = (data) => {
  return {
    type: GETDACM,
    payload: data,
  };
};
export const techindicator = (data) => {
  return {
    type: TECH_INDICATORS,
    payload: data,
  };
};
export const cottechindicator = (data) => {
  return {
    type: COT_TECH_INDICATORS,
    payload: data,
  };
};
export const testing = (data) => {
  return {
    type: PROGRESS,
    payload: data,
  };
};
export const saveSettings = (data) => {
  return {
    type: SAVESETTINGS,
    payload: data,
  };
};
export const absolute = (data) => {
  return {
    type: ABSOLUTE,
    payload: data,
  };
};
export const increaseheight = (data) => {
  return {
    type: INCREASEHEIGHT,
    payload: data,
  };
};
export const cotscale = (data) => {
  return {
    type: COTSCALE,
    payload: data,
  };
};
export const cotgrid = (data) => {
  return {
    type: COTGRID,
    payload: data,
  };
};
export const bigchart = (data) => {
  return {
    type: BIGCHART,
    payload: data,
  };
};
export const arrangegroup = (data) => {
  return {
    type: ARRANGEGROUP,
    payload: data,
  };
};
export const splitscreen = (data) => {
  return {
    type: SPLITSCREEN,
    payload: data,
  };
};
export const scalechanging = (data) => {
  return {
    type: SCALECHANGE,
    payload: data,
  };
};
export const getmostviewedtickercomplete = (data) => {
  return {
    type: GETMOSTVIEWEDTICKER_COMPLETE,
    payload: data,
  };
};
export const getmostviewedticker = (data) => {
  return {
    type: GETMOSTVIEWEDTICKER,
    payload: data,
  };
};
export const gettablecomplete = (data) => {
  return {
    type: GETTABLE_COMPLETE,
    payload: data,
  };
};
export const gettable = (data) => {
  return {
    type: GETTABLE,
    payload: data,
  };
};

export const savetable = (data) => {
  return {
    type: SAVETABLE,
    payload: data,
  };
};
export const getoipertickercomplete = (data) => {
  return {
    type: GETOIPERTICKER_COMPLETE,
    payload: data,
  };
};
export const getoiperticker = () => {
  return {
    type: GETOIPERTICKER,
  };
};
export const getpricesectiondatacomplete = (data) => {
  return {
    type: GETPRICESECTIONDATA_COMPLETE,
    payload: data,
  };
};
export const getpricesectiondata = () => {
  return {
    type: GETPRICESECTIONDATA,
  };
};
export const getsnrbreakoutdatacomplete = (data) => {
  return {
    type: GETSNRBREAKOUTDATA_COMPLETE,
    payload: data,
  };
};
export const getsnrbreakoutdata = () => {
  return {
    type: GETSNRBREAKOUTDATA,
  };
};
export const getcotreportdatacomplete = (data) => {
  return {
    type: GETCOTREPORTDATA_COMPLETE,
    payload: data,
  };
};
export const getcotreportdata = () => {
  return {
    type: GETCOTREPORTDATA,
  };
};
export const getseasonalitydatacomplete = (data) => {
  return {
    type: GETSEASONALITYDATA_COMPLETE,
    payload: data,
  };
};
export const getseasonalitydata = () => {
  return {
    type: GETSEASONALITYDATA,
  };
};
export const getvariousdatacomplete = (data) => {
  return {
    type: GETVARIOUSDATA_COMPLETE,
    payload: data,
  };
};
export const getvariousdata = () => {
  return {
    type: GETVARIOUSDATA,
  };
};
export const gettopoimoverscomplete = (data) => {
  return {
    type: GETTOPOIMOVERS_COMPLETE,
    payload: data,
  };
};
export const gettopoimovers = () => {
  return {
    type: GETTOPOIMOVERS,
  };
};
export const confirmationModal1 = (data) => {
  return {
    type: CONFIRM_MODAL,
    payload: data,
  };
};
export const getnotescomplete = (data) => {
  return {
    type: GETNOTES_COMPLETE,
    payload: data,
  };
};
export const getnotes = (data) => {
  return {
    type: GETNOTES,
    payload: data,
  };
};
export const savenotes = (data) => {
  return {
    type: SAVENOTES,
    payload: data,
  };
};
export const getcotannotationcomplete = (data) => {
  return {
    type: GETCOTANNOTATION_COMPLETE,
    payload: data,
  };
};
export const getcotannotation = (data) => {
  return {
    type: GETCOTANNOTATION1,
    payload: data,
  };
};
export const savecotoneoone = (data) => {
  return {
    type: SAVECOTONEOONE,
    payload: data,
  };
};
export const getannotationcomplete = (data) => {
  return {
    type: GETANNOTATION_COMPLETE,
    payload: data,
  };
};
export const getannotation = (data) => {
  return {
    type: GETANNOTATION1,
    payload: data,
  };
};
export const saveonoonecomplete = (data) => {
  return {
    type: SAVEONEOONETODB_COMPLETE,
    payload: data,
  };
};
export const saveoneoonetodb = (data) => {
  return {
    type: SAVEONEOONETODB,
    payload: data,
  };
};
export const saveoneoone = (data) => {
  return {
    type: SAVEONEOONE,
    payload: data,
  };
};
export const loaderstatus = (data) => {
  return {
    type: LOADER,
    payload: data,
  };
};
export const cotloaderstatus = (data) => {
  return {
    type: COTLOADER,
    payload: data,
  };
};
export const progressbar = (data) => {
  return {
    type: PROGRESS,
    payload: data,
  };
};
export const mekkotype = (data) => {
  return {
    type: MEKKO_TYPE,
    payload: data,
  };
};
export const mekkoData = (data) => {
  return {
    type: MEKKO_DATA,
    payload: data,
  };
};
export const scrollDates = (data) => {
  return {
    type: SCROLLER_DATES,
    payload: data,
  };
};
export const getaccontdata = (data) => {
  return {
    type: GET_ACCOUNT_DATA,
    payload: data,
  };
};
export const LoadExchange = () => {
  return {
    type: EXCHANGE_LIST_LOADED,
  };
};
export const Seachcode = (data) => {
  return {
    type: SEARCH_CODE,
    payload: data,
  };
};
export const searchExchangerespo = (data) => {
  return {
    type: SEARCH_COMPLETE,
    payload: data.data,
  };
};
export const PutExchange = (data) => {
  return {
    type: EXCHANGE_LIST_LOAD_COMPLETE,
    payload: data.data,
  };
};
export const getPricedata = (data) => {
  return {
    type: GET_PRICE_DATA,
    payload: data,
  };
};
export const getPriceCotdata = (data) => {
  return {
    type: GET_PRICE_COT_DATA,
    payload: data,
  };
};
export const getPriceCotdataComplete = (data) => {
  return {
    type: GET_PRICE_COT_DATA_COMPLETE,
    payload: data,
  };
};
export const getmoveDate = (data) => {
  return {
    type: GET_MOVE_DATE,
    payload: data,
  };
};
export const changeScroller = (data) => {
  return {
    type: GET_SCROLLER,
    payload: data,
  };
};
export const addClicked = (data) => {
  // console.log('rohan',data)
  return {
    type: ADD_CLICKED,
    payload: data,
  };
};
export const tableData = (data) => {
  return {
    type: TABLE_DATA,
    payload: data,
  };
};
export const clearData = () => {
  return {
    type: CLEAR_DATA,
  };
};
export const trendclearData = () => {
  return {
    type: TRENDCLEAR_DATA,
  };
};
export const ecinclearData = () => {
  return {
    type: ECINCLEAR_DATA,
  };
};
export const cotclickclear = () => {
  return {
    type: COTCLICK_CLEAR,
  };
};
export const ecinclickclear = () => {
  return {
    type: ECINCLICK_CLEAR,
  };
};
export const selectedExchangerespo = (data) => {
  return {
    type: GET_PRICE_DATA_COMPLETE,
    payload: data.data,
  };
};
export const getCotdata = (data) => {
  return {
    type: GET_COT_DATA,
    payload: data,
  };
};
export const getGraphData = (data) => {
  return {
    type: GET_GRAPH_DATA,
    payload: data,
  };
};
export const selectedGraphrespo = (data) => {
  return {
    type: GET_GRAPH_DATA_COMPLETE,
    payload: data.data,
  };
};
export const selectedCotrespo = (data) => {
  return {
    type: GET_COT_DATA_COMPLETE,
    payload: data.data,
  };
};
export const getEcindata = (data) => {
  return {
    type: GET_ECIN_DATA,
    payload: data,
  };
};
export const selectedEcinrespo = (data) => {
  return {
    type: GET_ECIN_DATA_COMPLETE,
    payload: data.data,
  };
};
export const getAccountrespo = (data) => {
  return {
    type: GET_ACCOUNT_DATA_COMPLETE,
    payload: data.data,
  };
};
export const getmekkorespo = (data) => {
  return {
    type: MEKKO_DATA_COMPLETE,
    payload: data.data,
  };
};
export const getFilterState = (data) => {
  console.log(data);
  return {
    type: GET_FILTER_STATE,
    payload: data.data,
  };
};
