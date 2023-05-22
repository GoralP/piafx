import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  EXCHANGE_LIST_LOADED,
  SEARCH_CODE,
  GET_PRICE_DATA,
  GET_PRICE_COT_DATA,
  GET_COT_DATA,
  GET_GRAPH_DATA,
  GET_ECIN_DATA,
  GET_ACCOUNT_DATA,
  MEKKO_DATA,
  SAVEONEOONETODB,
  GETANNOTATION1,
  GETCOTANNOTATION1,
  SAVENOTES,
  GETNOTES,
  GETTOPOIMOVERS,
  GETPRICESECTIONDATA,
  GETSNRBREAKOUTDATA,
  GETCOTREPORTDATA,
  GETSEASONALITYDATA,
  GETVARIOUSDATA,
  GETOIPERTICKER,
  SAVETABLE,
  GETMOSTVIEWEDTICKER,
  SAVESETTINGS,
  GETDACM,
  GETNEWS,
  GETTREND,
  GETGAUGE,
  GETTRENDAI,
  GETNEWSDATAMAIN,
  GETEQUITY,
  GETECINUNDERPRICE,
  GETSNRDATA,
  GETCORRELL,
  GETVIDEOS,
  GETEVENTS,
  GETPATTERNEVENTS,
  GETSNR2EVENTS,
  GETFALSEBREAKEVENTS,
  GETOOPSEVENTS,
} from "constants/ActionTypes";

import { baseURL, mlBaseURL } from "util/config";

import {
  getOopsEventsComplete,
  getFalseBreakEventsComplete,
  getSNR2EventsComplete,
  getPatternEventsComplete,
  getEventsComplete,
  getCorrellComplete,
  getnewsdatamaincomplete,
  getPriceCotdataComplete,
  gettrendAIcomplete,
  getgaugecomplete,
  gettrendcomplete,
  getnewscomplete,
  PutExchange,
  searchExchangerespo,
  selectedExchangerespo,
  selectedCotrespo,
  selectedEcinrespo,
  selectedGraphrespo,
  getAccountrespo,
  getmekkorespo,
  saveonoonecomplete,
  getannotationcomplete,
  getcotannotationcomplete,
  getnotescomplete,
  gettopoimoverscomplete,
  getoipertickercomplete,
  gettablecomplete,
  getmostviewedtickercomplete,
  getdacmcomplete,
  getequitycomplete,
  getEcinUnderPricedatacomplete,
  getSnRDataComplete,
  getVideosComplete,
  getpricesectiondatacomplete,
  getsnrbreakoutdatacomplete,
  getcotreportdatacomplete,
  getseasonalitydatacomplete,
  getvariousdatacomplete,
} from "../../appRedux/actions/Exchange";
import { getVideosCompleteSettings } from "../../appRedux/actions/Setting";
const getexchangefromapiRequest = async () =>
  await axios
    .get(baseURL + "api/v1/tickers")
    .then((result) => result)
    .catch((error) => error);

const searchexchangefromapiRequest = async (ticker_code) =>
  await axios
    .post(baseURL + "api/v1/tickersearch", { ticker_name: ticker_code })
    .then((result) => result)
    .catch((error) => error);

const selectexchangefromapiRequest = async (selectedExchange) =>
  await axios
    .post(baseURL + "api/v1/pricedata1", { ticker_code: selectedExchange })
    .then((result) => result)
    .catch((error) => error);

const selectexchangefromapiRequest1 = async (selectedExchange) =>
  await axios
    .post(baseURL + "api/v1/pricedata2", { ticker_code: selectedExchange })
    .then((result) => result.data)
    .catch((error) => error);

const selectgraphfromapiRequest = async (selectedGRAPHData) =>
  await axios
    .post(baseURL + "api/v1/cotgraphdetail", {
      id: selectedGRAPHData.selectedGRAPH,
      type: selectedGRAPHData.type,
      ticker_id: selectedGRAPHData.ticker_id,
      week: selectedGRAPHData.week,
      week1: selectedGRAPHData.week1,
      group: selectedGRAPHData.group,
      uniquename: selectedGRAPHData.uniquename,
    })
    .then((result) => result)
    .catch((error) => error);

const selectcotfromapiRequest = async (selectedCot) =>
  await axios
    .post(baseURL + "api/v1/cotdata", { cot_code: "D6__openinterest" })
    .then((result) => result)
    .catch((error) => error);

const selectecinfromapiRequest = async (selectedEcin, ticker_code) =>
  await axios
    .post(baseURL + "api/v1/ecindata", {
      ecin_code: selectedEcin,
      ticker_code: ticker_code,
    })
    .then((result) => result)
    .catch((error) => error);
const selectcotaccountfromapiRequest = async (acntdata) =>
  await axios
    .post(baseURL + "api/v1/cotaccountancy_new", {
      ticker_code: acntdata["exchange"],
      family: acntdata["cotfamily"],
      start_date: acntdata["startdate"],
      end_date: acntdata["enddate"],
    })
    .then((result) => result)
    .catch((error) => error);
const selectmekkodatafromapiRequest = async (mekkodata) =>
  await axios
    .post(baseURL + "api/v1/data_by_date", {
      ticker_id: mekkodata["id"],
      date: mekkodata["date"],
    })
    .then((result) => result)
    .catch((error) => error);
const saveoneoonetodbapiRequest = async (data) =>
  await axios
    .post(baseURL + "api/v1/saveannotation", {
      user_id: data["user_id"],
      pricejson: JSON.stringify(data["json"]["pricejson"]),
      otherjson: JSON.stringify(data["json"]["otherjson"]),
      otherjson1: JSON.stringify(data["json"]["otherjson1"]),
      ticker_id: data["ticker_id"],
      family: data["family"],
      group: data["group"],
      notes: data["notes"],
      chart_id: data["chart_id"],
      page: data["page"],
    })
    .then((result) => result)
    .catch((error) => error);
const getannotationfromapiRequest = async (data) =>
  await axios
    .post(baseURL + "api/v1/getannotation", {
      user_id: data["user_id"],
      ticker_id: data["ticker_id"],
      chart_id: data["chart_id"],
    })
    .then((result) => result.data)
    .catch((error) => error);
const getcotannotationfromapiRequest = async (data) =>
  await axios
    .post(baseURL + "api/v1/getcotannotation", {
      user_id: data["user_id"],
      ticker_id: data["ticker_id"],
      family: data["family"],
      group: data["group"],
    })
    .then((result) => result.data)
    .catch((error) => error);
const savenotestoapiRequest = async (data) =>
  // await  axios.post(baseURL+'api/v1/savenotes',{user_id : data['user_id'],ticker_id: data['ticker_id'],notes: JSON.stringify(data['notes'])})
  await axios
    .post(baseURL + "api/v1/savedacm", {
      user_id: data["user_id"],
      ticker_id: data["ticker_id"],
      newsindicator: JSON.stringify(data["newsindicator"]),
      priceforecast: JSON.stringify(data["priceforecast"]),
      cotforecast: JSON.stringify(data["cotforecast"]),
      selectedTrend: JSON.stringify(data["selectedTrend"]),
      gaugePeriod: JSON.stringify(data["gaugePeriod"]),
      notes: JSON.stringify(data["notes"]),
      cot: JSON.stringify(data["cot"]),
      ecin: JSON.stringify(data["ecin"]),
      table: JSON.stringify(data["table"]),
      ti: JSON.stringify(data["ti"]),
      cti: JSON.stringify(data["cti"]),
      drawingArray: JSON.stringify(data["drawingArray"]),
      ecindrawingArray: JSON.stringify(data["ecindrawingArray"]),
      scrollData: JSON.stringify(data["scrollData"]),
      hNet: JSON.stringify(data["hNet"]),
      snrRequestData: JSON.stringify(data["snrRequestData"]),
    })
    .then((result) => result)
    .catch((error) => error);
const getnotesfromapiRequest = async (data) =>
  await axios
    .post(baseURL + "api/v1/getnotes", {
      user_id: data["user_id"],
      ticker_id: data["ticker_id"],
    })
    .then((result) => result.data)
    .catch((error) => error);
const savetabletoapiRequest = async (data) =>
  await axios
    .post(baseURL + "api/v1/savetableanalyzer", {
      user_id: data["user_id"],
      ticker_id: data["ticker_id"],
      table: JSON.stringify(data["table"]),
    })
    .then((result) => result)
    .catch((error) => error);

const gettopoimoversfromapiRequest = async () =>
  // await  axios.get('https://cors-anywhere.herokuapp.com/'+baseURL+'api/v1/get_top_oi_movers')
  await axios
    .get(baseURL + "api/v1/get_top_oi_movers")
    .then((result) => result.data)
    .catch((error) => error);

const getpricesectiondatafromapiRequest = async () =>
  // await  axios.get('https://cors-anywhere.herokuapp.com/'+baseURL+'api/v1/get_top_oi_movers')
  await axios
    .get(baseURL + "api/v1/get_price_section_data")
    .then((result) => result.data)
    .catch((error) => error);

const getsnrbreakoutdatafromapiRequest = async () =>
  // await  axios.get('https://cors-anywhere.herokuapp.com/'+baseURL+'api/v1/get_top_oi_movers')
  await axios
    .get(baseURL + "api/v1/get_snr_breakout_data")
    .then((result) => result.data)
    .catch((error) => error);

const getcotreportdatafromapiRequest = async () =>
  // await  axios.get('https://cors-anywhere.herokuapp.com/'+baseURL+'api/v1/get_top_oi_movers')
  await axios
    .get(baseURL + "api/v1/get_cot_report_data")
    .then((result) => result.data)
    .catch((error) => error);

const getseasonalitydatafromapiRequest = async () =>
  // await  axios.get('https://cors-anywhere.herokuapp.com/'+baseURL+'api/v1/get_top_oi_movers')
  await axios
    .get(baseURL + "api/v1/get_seasonality_data")
    .then((result) => result.data)
    .catch((error) => error);

const getvariousdatafromapiRequest = async () =>
  // await  axios.get('https://cors-anywhere.herokuapp.com/'+baseURL+'api/v1/get_top_oi_movers')
  await axios
    .get(baseURL + "api/v1/get_various_data")
    .then((result) => result.data)  
    .catch((error) => error);
    
const getoipertickerfromapiRequest = async () =>
  // await  axios.get('https://cors-anywhere.herokuapp.com/'+baseURL+'api/v1/get_oi_per_ticker')
  await axios
    .get(baseURL + "api/v1/get_oi_per_ticker")
    .then((result) => result.data)
    .catch((error) => error);
const gettablefromapiRequest = async (data) =>
  await axios
    .post(baseURL + "api/v1/gettabledata", {
      user_id: data["user_id"],
      ticker_id: data["ticker_id"],
    })
    .then((result) => result.data)
    .catch((error) => error);
const getdacmfromapiRequest = async (data) =>
  await axios
    .post(baseURL + "api/v1/getdacm", {
      user_id: data["user_id"],
      ticker_id: data["ticker_id"],
    })
    .then((result) => result.data)
    .catch((error) => error);
const getnewsfromapiRequest = async (data) =>
  // await  axios.post('https://cors-anywhere.herokuapp.com/'+baseURL+'api/v1/getnews',{news_code : data['news_code'],ticker_code: data['ticker_code']})
  await axios
    .post(baseURL + "api/v1/getnews", {
      news_code: data["news_code"],
      ticker_code: data["ticker_code"],
    })
    .then((result) => result.data)
    .catch((error) => error);
const gettrendfromapiRequest = async (data) =>
  await axios
    .post(baseURL + "api/v1/trend_ML", {
      period: data["period"],
      type: data["type"],
      ticker_code: data["ticker_code"],
    })
    .then((result) => result.data)
    .catch((error) => error);
const getgaugefromapiRequest = async (data) =>
  await axios
    .post(baseURL + "api/v1/gauge_ML", {
      william_period: data["william_period"],
      slope_period: data["slope_period"],
      nclra_period: data["nclra_period"],
      date: data["date"],
      ticker_code: data["ticker_code"],
    })
    .then((result) => result.data)
    .catch((error) => error);
const gettrendAIfromapiRequest = async (data) =>
  await axios
    .post(baseURL + "api/v1/price_background", {
      william_period: data["william_period"],
      slope_period: data["slope_period"],
      nclra_period: data["nclra_period"],
      ticker_code: data["ticker_code"],
    })
    .then((result) => result.data)
    .catch((error) => error);
const getequityfromapiRequest = async (data) =>
  await axios
    .post(baseURL + "api/v1/equity", {
      william_period: data["william_period"],
      slope_period: data["slope_period"],
      nclra_period: data["nclra_period"],
      ticker_code: data["ticker_code"],
    })
    .then((result) => result.data)
    .catch((error) => error);
const getmostviewedtickerfromapiRequest = async (data) =>
  // await  axios.post('https://cors-anywhere.herokuapp.com/'+baseURL+'api/v1/most_searched_ticker',{user_id : data['user_id']})
  await axios
    .post(baseURL + "api/v1/most_searched_ticker", {
      user_id: data["user_id"],
    })
    .then((result) => result.data)
    .catch((error) => error);
const savesettingstoapiRequest = async (data) =>
  await axios
    .post(baseURL + "api/v1/savesettings", {
      user_id: data["user_id"],
      multitab: data["multitab"],
      theme: data["theme"],
      startfrom: data["startfrom"],
      newsGridView: data["newsGridView"],
    })
    .then((result) => result.data)
    .catch((error) => error);
const getnewsmainfromapiRequest = async () =>
  // await  axios.get('https://cors-anywhere.herokuapp.com/'+baseURL+'api/v1/newsdata')
  await axios
    .get(baseURL + "api/v1/newsdata")
    .then((result) => result.data)
    .catch((error) => error);
const getecinunderpricefromapiRequest = async (data) =>
  // await  axios.get('https://cors-anywhere.herokuapp.com/'+baseURL+'api/v1/newsdata')
  await axios
    .post(baseURL + "api/v1/ecin_under_price", { ticker_code: data })
    .then((result) => result.data)
    .catch((error) => error);
const getSnRDatafromapiRequest = async (data) =>
  // await  axios.get(mlBaseURL+data.snrType+'/?tickercode='+data.ticker_code+'&start_date='+data.start_date+'&end_date='+data.end_date)
  await axios
    .get(
      baseURL +
        "api/v1/snr?snrType=" +
        data.snrType +
        "&tickercode=" +
        data.ticker_code +
        "&start_date=" +
        data.start_date +
        "&end_date=" +
        data.end_date +
        "&type=" +
        data.type
    )
    .then((result) => result.data)
    .catch((error) => error);
const getCorrellfromapiRequest = async (data) =>
  // await  axios.get('https://cors-anywhere.herokuapp.com/'+baseURL+'api/v1/newsdata')
  await axios
    .get(
      baseURL +
        "api/v1/correlltype?ticker_code=" +
        data.ticker_code +
        "&correlltype=" +
        data.correlltype +
        "&correllgroup=" +
        data.correllgroup +
        "&period=" +
        data.period
    )
    .then((result) => result.data)
    .catch((error) => error);
const getVideosfromapiRequest = async (data) =>
  await axios
    .get(baseURL + "api/v1/getVideos")
    .then((result) => result.data)
    .catch((error) => error);
const getEventsfromapiRequest = async (data) =>
  await axios
    .post(baseURL + "api/v1/boPatternEvents", {
      ticker_code: data["ticker_code"],
      type: data["type"],
      dir: data["dir"],
      x: data["x"],
      y: data["y"],
      size: data["size"],
      compVar: data["compVar"],
      pattern: data["pattern"],
      co: data["co"],
      days: data["days"],
      bdco: data["bdco"],
      snr: data["snr"],
      maxX: data["maxX"],
      minX: data["minX"],
      compute_level: data['compute_level'],
      price_level: data['price_level'],
      percentage_ratio: data['percentage_ratio'],
    })
    .then((result) => result.data)
    .catch((error) => error);
    
function* searchexchangefromapi({ payload }) {
  const { ticker_code } = payload;
  try {
    const gettable = yield call(searchexchangefromapiRequest, ticker_code);

    if (gettable.status) {
      yield put(searchExchangerespo(gettable.data));
    }
  } catch (error) {
    // console.log("Error");
  }
}

function* getexchangefromapi() {
  try {
    const gettable = yield call(getexchangefromapiRequest);

    if (gettable.status) {
      yield put(PutExchange(gettable.data));
    }
  } catch (error) {
    console.log("Error");
  }
}

function* selectexchangefromapi({ payload }) {
  const { selectedExchange } = payload;
  try {
    const gettable = yield call(selectexchangefromapiRequest, selectedExchange);
    localStorage.removeItem("saved_ticker_id");
    if (gettable.status) {
      yield put(selectedExchangerespo(gettable.data));
    }
  } catch (error) {
    console.log("Error");
  }
}

function* selectexchangefromapi1({ payload }) {
  const { selectedExchange } = payload;
  try {
    const gettable = yield call(
      selectexchangefromapiRequest1,
      selectedExchange
    );
    if (gettable.status) {
      yield put(getPriceCotdataComplete(gettable.data));
    }
  } catch (error) {
    console.log("Error");
  }
}

function* selectcotfromapi({ payload }) {
  const { selectedCot } = payload;
  try {
    const gettable = yield call(selectcotfromapiRequest, selectedCot);

    if (gettable.status) {
      yield put(selectedCotrespo(gettable.data));
    }
  } catch (error) {
    console.log("Error");
  }
}

function* selectgraphfromapi({ payload }) {
  const selectedGRAPHData = payload;
  // console.log('asplsaga',payload);
  try {
    const gettable = yield call(selectgraphfromapiRequest, selectedGRAPHData);

    if (gettable.status) {
      yield put(selectedGraphrespo(gettable.data));
    }
  } catch (error) {
    console.log("Error");
  }
}

function* selectecinfromapi({ payload }) {
  const { selectedEcin, ticker_code } = payload;
  try {
    const gettable = yield call(
      selectecinfromapiRequest,
      selectedEcin,
      ticker_code
    );

    if (gettable.status) {
      yield put(selectedEcinrespo(gettable.data));
    }
  } catch (error) {
    console.log("Error");
  }
}

function* selectcotaccountfromapi({ payload }) {
  // console.log("asplsaga1",payload);
  const acntdata = payload;
  // console.log("asplsaga",acntdata);
  try {
    const getaccountdata = yield call(selectcotaccountfromapiRequest, acntdata);

    if (getaccountdata.status) {
      yield put(getAccountrespo(getaccountdata.data));
    }
  } catch (error) {
    console.log("Error");
  }
}

function* selectmekkodatafromapi({ payload }) {
  const mekkodata = payload;

  try {
    const getmekkodata = yield call(selectmekkodatafromapiRequest, mekkodata);

    if (getmekkodata.status) {
      yield put(getmekkorespo(getmekkodata.data));
    }
  } catch (error) {
    console.log("Error");
  }
}

function* saveoneoonetodbapi({ payload }) {
  const data = payload;
  try {
    const getannodata = yield call(saveoneoonetodbapiRequest, data);

    if (getannodata.status) {
      yield put(saveonoonecomplete(getannodata.data));
    }
  } catch (error) {
    console.log("Error");
  }
}

function* getannotationfromapi({ payload }) {
  const data = payload;
  try {
    const getannodata = yield call(getannotationfromapiRequest, data);

    if (getannodata.status) {
      yield put(getannotationcomplete(getannodata.data));
    }
  } catch (error) {
    console.log("Error");
  }
}
function* getcotannotationfromapi({ payload }) {
  const data = payload;
  try {
    const getannodata = yield call(getcotannotationfromapiRequest, data);

    if (getannodata.status) {
      yield put(getcotannotationcomplete(getannodata.data));
    }
  } catch (error) {
    console.log("Error");
  }
}
function* savenotestoapi({ payload }) {
  const data = payload;
  // console.log('asplsaga',JSON.stringify(data['cti']))
  try {
    const notes = yield call(savenotestoapiRequest, data);

    if (notes.status) {
      localStorage.setItem("saved_ticker_id", data.ticker_id);
      yield put(saveonoonecomplete(notes.data));
      window.location.reload();
    }
  } catch (error) {
    console.log("Error", error);
  }
}
function* getnotesfromapi({ payload }) {
  const data = payload;
  try {
    const getnotesdata = yield call(getnotesfromapiRequest, data);

    if (getnotesdata.status) {
      yield put(getnotescomplete(getnotesdata.data));
    }
  } catch (error) {
    console.log("Error");
  }
}
function* gettopoimoversfromapi() {
  // const data = payload;
  try {
    const getoimoversdata = yield call(gettopoimoversfromapiRequest);

    if (getoimoversdata.status) {
      yield put(gettopoimoverscomplete(getoimoversdata.data));
    }
  } catch (error) {
    console.log("Error");
  }
}
function* getpricesectiondatafromapi() {
  // const data = payload;
  try {
    const getpricerecords = yield call(getpricesectiondatafromapiRequest);

    if (getpricerecords.status) {
      yield put(getpricesectiondatacomplete(getpricerecords.data));
    }
  } catch (error) {
    console.log("Error");
  }
}
function* getsnrbreakoutdatafromapi() {
  // const data = payload;
  try {
    const getsnrbreakoutrecords = yield call(getsnrbreakoutdatafromapiRequest);

    if (getsnrbreakoutrecords.status) {
      yield put(getsnrbreakoutdatacomplete(getsnrbreakoutrecords.data));
    }
  } catch (error) {
    console.log("Error");
  }
}
function* getcotreportdatafromapi() {
  // const data = payload;
  try {
    const getcotreportrecords = yield call(getcotreportdatafromapiRequest);

    if (getcotreportrecords.status) {
      yield put(getcotreportdatacomplete(getcotreportrecords.data));
    }
  } catch (error) {
    console.log("Error");
  }
}
function* getseasonalitydatafromapi() {
  // const data = payload;
  try {
    const getseasonalityrecords = yield call(getseasonalitydatafromapiRequest);

    if (getseasonalityrecords.status) {
      yield put(getseasonalitydatacomplete(getseasonalityrecords.data));
    }
  } catch (error) {
    console.log("Error");
  }
}
function* getvariousdatafromapi() {
  // const data = payload;
  try {
    const getvariousrecords = yield call(getvariousdatafromapiRequest);

    if (getvariousrecords.status) {
      yield put(getvariousdatacomplete(getvariousrecords.data));
    }
  } catch (error) {
    console.log("Error");
  }
}
function* getoipertickerfromapi() {
  // const data = payload;
  try {
    const getoimoversdata = yield call(getoipertickerfromapiRequest);

    if (getoimoversdata.status) {
      yield put(getoipertickercomplete(getoimoversdata.data));
    }
  } catch (error) {
    console.log("Error");
  }
}
function* savetabletoapi({ payload }) {
  const data = payload;
  try {
    const table = yield call(savetabletoapiRequest, data);

    if (table.status) {
      yield put(saveonoonecomplete(table.data));
    }
  } catch (error) {
    console.log("Error");
  }
}
function* gettablefromapi({ payload }) {
  const data = payload;
  try {
    const gettabledata = yield call(gettablefromapiRequest, data);

    if (gettabledata.status) {
      yield put(gettablecomplete(gettabledata.data));
    }
  } catch (error) {
    console.log("Error");
  }
}
function* getdacmfromapi({ payload }) {
  const data = payload;
  try {
    const getdacmdata = yield call(getdacmfromapiRequest, data);

    if (getdacmdata.status) {
      yield put(getdacmcomplete(getdacmdata.data));
    }
  } catch (error) {
    console.log("Error");
  }
}
function* getnewsfromapi({ payload }) {
  const data = payload;
  try {
    const getnewsdata = yield call(getnewsfromapiRequest, data);

    if (getnewsdata.status) {
      yield put(getnewscomplete(getnewsdata.data));
    }
  } catch (error) {
    console.log("Error");
  }
}
function* gettrendfromapi({ payload }) {
  const data = payload;
  try {
    const gettrenddata = yield call(gettrendfromapiRequest, data);

    if (gettrenddata.status) {
      yield put(gettrendcomplete(gettrenddata.data));
    }
  } catch (error) {
    console.log("Error");
  }
}
function* getgaugefromapi({ payload }) {
  const data = payload;
  try {
    const getgaugedata = yield call(getgaugefromapiRequest, data);

    if (getgaugedata.status) {
      yield put(getgaugecomplete(getgaugedata.data));
    }
  } catch (error) {
    console.log("Error");
  }
}
function* gettrendAIfromapi({ payload }) {
  const data = payload;
  try {
    const gettrendAIdata = yield call(gettrendAIfromapiRequest, data);

    if (gettrendAIdata.status) {
      yield put(gettrendAIcomplete(gettrendAIdata.data));
    }
  } catch (error) {
    console.log("Error");
  }
}
function* getequityfromapi({ payload }) {
  const data = payload;
  try {
    const getequitydata = yield call(getequityfromapiRequest, data);

    if (getequitydata.status) {
      yield put(getequitycomplete(getequitydata.data));
    }
  } catch (error) {
    console.log("Error");
  }
}
function* getmostviewedtickerfromapi({ payload }) {
  const data = payload;
  try {
    const gettickerdata = yield call(getmostviewedtickerfromapiRequest, data);

    if (gettickerdata.status) {
      yield put(getmostviewedtickercomplete(gettickerdata.data));
    }
  } catch (error) {
    console.log("Error");
  }
}
function* savesettingstoapi({ payload }) {
  const data = payload;
  try {
    const table = yield call(savesettingstoapiRequest, data);
    // console.log('asplsetting',table.status)
    if (table.status) {
      if (table.data.length > 0) {
        // console.log('asplsetting',table.data.length)
        localStorage.setItem("theme", table.data[0].theme);
        localStorage.setItem("startfrom", table.data[0].startfrom);
        localStorage.setItem(
          "multitab",
          table.data[0].multitab == "true" ? true : false
        );
        localStorage.setItem("newsGridView", table.data[0].newsGridView);
        window.location.reload();
      }
      // yield put(saveonoonecomplete(table.data));
    }
  } catch (error) {
    console.log("Error");
  }
}
function* getnewsmainfromapi({ payload }) {
  // const data = payload;
  try {
    const getnewsdata = yield call(getnewsmainfromapiRequest);

    if (getnewsdata.status) {
      // console.log()
      yield put(getnewsdatamaincomplete(getnewsdata.data));
    }
  } catch (error) {
    console.log("Error");
  }
}
function* getecinunderpricefromapi({ payload }) {
  const data = payload;
  try {
    const getecinunderprice = yield call(getecinunderpricefromapiRequest, data);

    if (getecinunderprice.status) {
      // console.log()
      yield put(getEcinUnderPricedatacomplete(getecinunderprice.data));
    }
  } catch (error) {
    console.log("Error");
  }
}
function* getSnRDatafromapi({ payload }) {
  const data = payload;
  try {
    const getsnrdata = yield call(getSnRDatafromapiRequest, data);
    if ("data" in getsnrdata) {
      yield put(getSnRDataComplete(getsnrdata.data));
    } else if ("high" in getsnrdata) {
      yield put(
        getSnRDataComplete({ low: getsnrdata.low, high: getsnrdata.high })
      );
    }
  } catch (error) {
    console.log("Error");
  }
}
function* getCorrellfromapi({ payload }) {
  const data = payload;
  try {
    const getcorrelldata = yield call(getCorrellfromapiRequest, data);
    // if ('data' in getcorrelldata) {
    yield put(getCorrellComplete(getcorrelldata.data));
    // }
    // else if ('high' in getcorrelldata) {
    //   yield put(getCorrellComplete({low:getcorrelldata.low,high:getcorrelldata.high}));
    // }
  } catch (error) {
    console.log("Error");
  }
}
function* getVideosfromapi() {
  try {
    const getVideos = yield call(getVideosfromapiRequest);
    // console.log("asplresponse", getVideos);
    if (getVideos.status) {
      yield put(getVideosComplete(getVideos.data));
      yield put(getVideosCompleteSettings(getVideos.data));
    }
  } catch (error) {
    console.log("Error");
  }
}
function* getEventsfromapi({ payload }) {
  try {
    const getEvents = yield call(getEventsfromapiRequest, payload);
    // console.log("asplresponse", getEvents);
    if (getEvents.status) {
      yield put(getEventsComplete(getEvents.data));
    }
  } catch (error) {
    console.log("Error");
  }
}
function* getSNR2Eventsfromapi({ payload }) {
  try {
    // console.log("asplsaga", payload);
    const getEvents = yield call(getEventsfromapiRequest, payload);
    // console.log("asplresponse", getEvents);
    if (getEvents.status) {
      yield put(getSNR2EventsComplete(getEvents.data));
    }
  } catch (error) {
    console.log("Error");
  }
}
function* getPatternEventsfromapi({ payload }) {
  try {
    // console.log("asplsaga", payload);
    const getEvents = yield call(getEventsfromapiRequest, payload);
    if (getEvents.status) {
      yield put(getPatternEventsComplete(getEvents.data));
    }
  } catch (error) {
    console.log("Error");
  }
}

function* getFBEventsfromapi({ payload }) {
  try {
    const getFBEvents = yield call(getEventsfromapiRequest, payload);
    if (getFBEvents.status) {
      yield put(getFalseBreakEventsComplete(getFBEvents.data));
    }
  } catch (error) {
    console.log("Error");
  }
}

function* getOopsEventsfromapi({ payload }) {
  try {
    const getOopsEvents = yield call(getEventsfromapiRequest, payload);
    if (getOopsEvents.status) {
      yield put(getOopsEventsComplete(getOopsEvents.data));
    }
  } catch (error) {
    console.log("Error");
  }
}

export function* firstLoadExchange() {
  yield takeEvery(EXCHANGE_LIST_LOADED, getexchangefromapi);
}

export function* searchExchange() {
  yield takeEvery(SEARCH_CODE, searchexchangefromapi);
}

export function* selectExchange() {
  yield takeEvery(GET_PRICE_DATA, selectexchangefromapi);
}

export function* selectExchange1() {
  yield takeEvery(GET_PRICE_COT_DATA, selectexchangefromapi1);
}

export function* selectCot() {
  yield takeEvery(GET_COT_DATA, selectcotfromapi);
}
export function* selectGraph() {
  yield takeEvery(GET_GRAPH_DATA, selectgraphfromapi);
}
export function* selectEcin() {
  yield takeEvery(GET_ECIN_DATA, selectecinfromapi);
}
export function* selectCotaccount() {
  yield takeEvery(GET_ACCOUNT_DATA, selectcotaccountfromapi);
}
export function* selectMekko() {
  yield takeEvery(MEKKO_DATA, selectmekkodatafromapi);
}
export function* saveoneoonetodb() {
  yield takeEvery(SAVEONEOONETODB, saveoneoonetodbapi);
}
export function* getannotation() {
  yield takeEvery(GETANNOTATION1, getannotationfromapi);
}
export function* getcotannotation() {
  yield takeEvery(GETCOTANNOTATION1, getcotannotationfromapi);
}
export function* savenotes() {
  yield takeEvery(SAVENOTES, savenotestoapi);
}
export function* getnotes() {
  yield takeEvery(GETNOTES, getnotesfromapi);
}
export function* gettopoimovers() {
  yield takeEvery(GETTOPOIMOVERS, gettopoimoversfromapi);
}
export function* getpricesection() {
  yield takeEvery(GETPRICESECTIONDATA, getpricesectiondatafromapi);
}
export function* getsnrbreakoutsection() {
  yield takeEvery(GETSNRBREAKOUTDATA, getsnrbreakoutdatafromapi);
}
export function* getcotreportsection() {
  yield takeEvery(GETCOTREPORTDATA, getcotreportdatafromapi);
}
export function* getseasonalitysection() {
  yield takeEvery(GETSEASONALITYDATA, getseasonalitydatafromapi);
}
export function* getvarioussection() {
  yield takeEvery(GETVARIOUSDATA, getvariousdatafromapi);
}
export function* getoiperticker() {
  yield takeEvery(GETOIPERTICKER, getoipertickerfromapi);
}
export function* savetable() {
  yield takeEvery(SAVETABLE, savetabletoapi);
}
export function* gettable() {
  yield takeEvery(GETNOTES, gettablefromapi);
}
export function* getdacm() {
  yield takeEvery(GETDACM, getdacmfromapi);
}
export function* getnews() {
  yield takeEvery(GETNEWS, getnewsfromapi);
}
export function* gettrend() {
  yield takeEvery(GETTREND, gettrendfromapi);
}
export function* getgauge() {
  yield takeEvery(GETGAUGE, getgaugefromapi);
}
export function* gettrendAI() {
  yield takeEvery(GETTRENDAI, gettrendAIfromapi);
}
export function* getnewsmain() {
  yield takeEvery(GETNEWSDATAMAIN, getnewsmainfromapi);
}
export function* getmostviewedticker() {
  yield takeEvery(GETMOSTVIEWEDTICKER, getmostviewedtickerfromapi);
}
export function* savesettings() {
  yield takeEvery(SAVESETTINGS, savesettingstoapi);
}
export function* getequity() {
  yield takeEvery(GETEQUITY, getequityfromapi);
}
export function* getecinunderprice() {
  yield takeEvery(GETECINUNDERPRICE, getecinunderpricefromapi);
}
export function* getSnRData() {
  yield takeEvery(GETSNRDATA, getSnRDatafromapi);
}
export function* getCorrell() {
  yield takeEvery(GETCORRELL, getCorrellfromapi);
}
export function* getVideos() {
  yield takeEvery(GETVIDEOS, getVideosfromapi);
}
export function* getEvents() {
  yield takeEvery(GETEVENTS, getEventsfromapi);
}
export function* getSNR2Events() {
  yield takeEvery(GETSNR2EVENTS, getSNR2Eventsfromapi);
}
export function* getPatternEvents() {
  yield takeEvery(GETPATTERNEVENTS, getPatternEventsfromapi);
}
export function* getFBEvents() {
  yield takeEvery(GETFALSEBREAKEVENTS, getFBEventsfromapi);
}
export function* getOopsEvents() {
  yield takeEvery(GETOOPSEVENTS, getOopsEventsfromapi);
}

export default function* rootSaga() {
  yield all([
    fork(firstLoadExchange),
    fork(selectExchange),
    fork(selectExchange1),
    fork(searchExchange),
    fork(selectCot),
    fork(selectEcin),
    fork(selectGraph),
    fork(selectCotaccount),
    fork(selectMekko),
    fork(saveoneoonetodb),
    fork(getannotation),
    fork(getcotannotation),
    fork(savenotes),
    fork(savetable),
    fork(savesettings),
    fork(getnotes),
    fork(gettable),
    fork(getdacm),
    fork(getnews),
    fork(gettrend),
    fork(getgauge),
    fork(gettrendAI),
    fork(getequity),
    fork(getnewsmain),
    fork(gettopoimovers),
    fork(getpricesection),
    fork(getsnrbreakoutsection),
    fork(getcotreportsection),
    fork(getseasonalitysection),
    fork(getvarioussection),
    fork(getoiperticker),
    fork(getmostviewedticker),
    fork(getecinunderprice),
    fork(getSnRData),
    fork(getCorrell),
    fork(getVideos),
    fork(getEvents),
    fork(getSNR2Events),
    fork(getPatternEvents),
    fork(getFBEvents),
    fork(getOopsEvents),
  ]);
}
