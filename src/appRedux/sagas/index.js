import {all} from "redux-saga/effects";
import authSagas from "./Auth";
import todoSagas from "./Todo";
import ExchangeSagas from "./Exchange";

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    todoSagas(),
    ExchangeSagas()
  ]);
}
