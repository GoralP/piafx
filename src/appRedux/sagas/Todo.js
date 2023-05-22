import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import axios from 'axios';
import {
    LOADTODOTABLE
  } from "constants/ActionTypes";

  import { PutTodoTable } from "../../appRedux/actions/Todo";


  const gettablefromapiRequest = async () =>
  await  axios.get('https://jsonplaceholder.typicode.com/todos/')
      .then(result =>result)
      .catch(error => error)


  function* gettablefromapi() {
    try {
        const gettable = yield call(gettablefromapiRequest);
        if (gettable.status) {
            console.log("enter ", gettable.data);
            yield put(PutTodoTable(gettable.data));
        } 
    } catch (error) {
        console.log("Error");
    }
  }

  export function* firstLoadTodoTable() {
    yield takeEvery(LOADTODOTABLE, gettablefromapi);
  }

  export default function* rootSaga() {
    yield all([fork(firstLoadTodoTable)])}