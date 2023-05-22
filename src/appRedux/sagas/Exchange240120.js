import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  EXCHANGE_LIST_LOADED,
  SEARCH_CODE,
  GET_PRICE_DATA,
  GET_COT_DATA,
  GET_GRAPH_DATA,
  GET_ECIN_DATA,
  GET_ACCOUNT_DATA,
  MEKKO_DATA,
} from "constants/ActionTypes";

import { baseURL } from "util/config";

import {
  PutExchange,
  searchExchangerespo,
  selectedExchangerespo,
  selectedCotrespo,
  selectedEcinrespo,
  selectedGraphrespo,
  getAccountrespo,
  getmekkorespo,
} from "../../appRedux/actions/Exchange";

const getexchangefromapiRequest = async () =>
  await axios
    .get(baseURL + "api/v1/tickers")
    .then((result) => result)
    .catch((error) => error);

const searchexchangefromapiRequest = async (ticker_code) =>
  await axios
    .post(baseURL + "api/v1/tickersearch/?ticker_name=" + ticker_code)
    .then((result) => result)
    .catch((error) => error);

const selectexchangefromapiRequest = async (selectedExchange) =>
  await axios
    .post(baseURL + "api/v1/pricedata/?ticker_code=" + selectedExchange)
    .then((result) => result)
    .catch((error) => error);

const selectgraphfromapiRequest = async (selectedGRAPHData) =>
  await axios
    .post(
      baseURL +
        "api/v1/cotgraphdetail/?id=" +
        selectedGRAPHData.selectedGRAPH +
        "&type=" +
        selectedGRAPHData.type +
        "&ticker_id=" +
        selectedGRAPHData.ticker_id
    )
    // await  axios.post(baseURL+'api/v1/cotgraphdetail/?id='+selectedGRAPHData.selectedGRAPH+'&type='+selectedGRAPHData.type+'&ticker_id='+selectedGRAPHData.ticker_id)
    .then((result) => result)
    .catch((error) => error);

const selectcotfromapiRequest = async (selectedCot) =>
  await axios
    .post(baseURL + "api/v1/cotdata/?cot_code=D6__openinterest")
    .then((result) => result)
    .catch((error) => error);

const selectecinfromapiRequest = async (selectedEcin) =>
  await axios
    .post(baseURL + "api/v1/ecindata/?ecin_code=" + selectedEcin)
    .then((result) => result)
    .catch((error) => error);
const selectcotaccountfromapiRequest = async (acntdata) =>
  await axios
    .post(
      baseURL +
        "api/v1/cotaccountancy/?ticker_code=" +
        acntdata["exchange"] +
        "&family=" +
        acntdata["cotfamily"] +
        "&start_date=" +
        acntdata["startdate"] +
        "&end_date=" +
        acntdata["enddate"]
    )
    .then((result) => result)
    .catch((error) => error);
const selectmekkodatafromapiRequest = async (mekkodata) =>
  await axios
    .post(
      baseURL +
        "api/v1/data_by_date/?ticker_id=" +
        mekkodata["id"] +
        "&date=" +
        mekkodata["date"]
    )
    .then((result) => result)
    .catch((error) => error);

function* searchexchangefromapi({ payload }) {
  const { ticker_code } = payload;
  try {
    const gettable = yield call(searchexchangefromapiRequest, ticker_code);

    if (gettable.status) {
      yield put(searchExchangerespo(gettable.data));
    }
  } catch (error) {
    console.log("Error");
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

    if (gettable.status) {
      yield put(selectedExchangerespo(gettable.data));
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
  const selectedGRAPH = payload;
  // console.log('asplsaga',payload);
  try {
    const gettable = yield call(selectgraphfromapiRequest, selectedGRAPH);

    if (gettable.status) {
      yield put(selectedGraphrespo(gettable.data));
    }
  } catch (error) {
    console.log("Error");
  }
}

function* selectecinfromapi({ payload }) {
  const { selectedEcin } = payload;
  try {
    const gettable = yield call(selectecinfromapiRequest, selectedEcin);

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

export function* firstLoadExchange() {
  yield takeEvery(EXCHANGE_LIST_LOADED, getexchangefromapi);
}

export function* searchExchange() {
  yield takeEvery(SEARCH_CODE, searchexchangefromapi);
}

export function* selectExchange() {
  yield takeEvery(GET_PRICE_DATA, selectexchangefromapi);
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

export default function* rootSaga() {
  yield all([
    fork(firstLoadExchange),
    fork(selectExchange),
    fork(searchExchange),
    fork(selectCot),
    fork(selectEcin),
    fork(selectGraph),
    fork(selectCotaccount),
    fork(selectMekko),
  ]);
}
