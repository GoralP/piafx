import React, { Component } from "react";
import { push } from "react-router-redux";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { Redirect, Route, Switch } from "react-router-dom";
import { baseURL } from "util/config";
import createHistory from "history/createBrowserHistory";

import {
  SIGNIN_FACEBOOK_USER,
  SIGNIN_GITHUB_USER,
  SIGNIN_GOOGLE_USER,
  SIGNIN_TWITTER_USER,
  SIGNIN_USER,
  SIGNIN_USER_WP,
  SIGNOUT_USER,
  SIGNUP_USER,
  PRICING,
} from "constants/ActionTypes";
import {
  showAuthMessage,
  userSignInSuccess,
  userSignInSuccessWP,
  userSignOutSuccess,
  userSignUpSuccess,
  pricingSuccess,
} from "../../appRedux/actions/Auth";
import {
  userFacebookSignInSuccess,
  userGithubSignInSuccess,
  userGoogleSignInSuccess,
  userTwitterSignInSuccess,
} from "../actions/Auth";
const history = createHistory();
const pricingRequestFromApi = async () =>
  await axios
    .get(baseURL + "api/v1/pricing")
    // await  auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => authUser.data)
    .catch((error) => error);
const createUserWithEmailPasswordRequest = async (
  email,
  password,
  first_name,
  last_name,
  phone,
  confirm,
  affiliate,
  affiliateCode
) =>
  await axios
    .post(baseURL + "api/v1/signup", {
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      confirm: confirm,
      affiliate: affiliate,
      affiliateCode: affiliateCode,
    })
    // await  auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => authUser.data)
    .catch((error) => error);

const signInUserWithEmailPasswordRequest = async (email, password) =>
  await axios
    .post(baseURL + "api/v1/login", { email: email, password: password })
    //await  auth.signInWithEmailAndPassword(email, password)
    .then((authUser) => authUser.data)
    .catch((error) => error);

const signInUserWithEmailPasswordRequestWP = async (email, password, from) =>
  await axios
    .post(
      baseURL + "api/v1/loginwithWP",
      { email: email, password: password, from: from }
      // {
      //   headers:
      //   {"Access-Control-Allow-Origin": "true",
      //     "Access-Control-Allow-Credentials": "true",
      //     "Access-Control-Allow-Methods": "OPTIONS, GET, POST"
      //   }
      // }
    )
    //await  auth.signInWithEmailAndPassword(email, password)
    .then((authUser) => authUser.data)
    .catch((error) => error);

const signOutWithAPI = async (userId) =>
  await axios
    .post(baseURL + "api/v1/logout", { user_id: userId })
    //await  auth.signInWithEmailAndPassword(email, password)
    .then((authUser) => authUser.data)
    .catch((error) => error);

function* pricingRequest() {
  try {
    const pricing = yield call(pricingRequestFromApi);
    if (pricing.status) {
      yield put(pricingSuccess(pricing.data));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}
function* createUserWithEmailPassword({ payload }) {
  const {
    email,
    password,
    first_name,
    last_name,
    phone,
    confirm,
    affiliate,
    affiliateCode,
  } = payload;
  try {
    const signUpUser = yield call(
      createUserWithEmailPasswordRequest,
      email,
      password,
      first_name,
      last_name,
      phone,
      confirm,
      affiliate,
      affiliateCode
    );
    // console.log('asplsaga',signUpUser.message);
    if (!signUpUser.status) {
      // console.log('asplrohan');
      yield put(showAuthMessage(signUpUser.message));
    } else {
      // history.push('/signin');
      // return ( <Redirect to={'/signin'}/> );
      // localStorage.setItem('user_id', signUpUser.user.uid);
      // yield put(showAuthMessage(signUpUser.message));
      yield put(push("/main"));
      yield put(userSignUpSuccess());
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* signInUserWithEmailPassword({ payload }) {
  // console.log("unique stp: 4");
  const { email, password } = payload;
  // console.log('asplsaga', payload);
  try {
    const signInUser = yield call(
      signInUserWithEmailPasswordRequest,
      email,
      password
    );
    if (!signInUser.status) {
      yield put(showAuthMessage(signInUser.message));
    } else {
      if (signInUser.settings.length > 0) {
        localStorage.setItem(
          "multitab",
          signInUser.settings[0].multitab == "true" ? true : false
        );
        localStorage.setItem("theme", signInUser.settings[0].theme);
        localStorage.setItem("startfrom", signInUser.settings[0].startfrom);
      }
      localStorage.setItem("user_id", signInUser.data.id);
      localStorage.setItem("email", signInUser.data.email);
      localStorage.setItem("first_name", signInUser.data.first_name);
      localStorage.setItem("last_name", signInUser.data.last_name);
      yield put(userSignInSuccess(signInUser.data));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* signInUserWithEmailPasswordWP({ payload }) {
  // console.log("unique stp: 4");
  const { email, password, from } = payload;
  // console.log('asplsaga', payload);
  try {
    const signInUser = yield call(
      signInUserWithEmailPasswordRequestWP,
      email,
      password,
      from
    );
    if (!signInUser.status) {
      yield put(showAuthMessage(signInUser.message));
    } else {
      if (signInUser.settings.length > 0) {
        localStorage.setItem(
          "multitab",
          signInUser.settings[0].multitab == "true" ? true : false
        );
        localStorage.setItem("theme", signInUser.settings[0].theme);
        localStorage.setItem("startfrom", signInUser.settings[0].startfrom);
        localStorage.setItem(
          "newsGridView",
          signInUser.settings[0].newsGridView
        );
      }
      localStorage.setItem("user_id", signInUser.data.id);
      localStorage.setItem("email", signInUser.data.email);
      localStorage.setItem("first_name", signInUser.data.first_name);
      localStorage.setItem("last_name", signInUser.data.last_name);
      localStorage.setItem("profile_url", signInUser.data.profile_url);
      console.log(signInUser.data.profile_url);
      yield put(push("/dashboard"));
      yield put(userSignInSuccessWP(signInUser.data));
      // window.location.reload();
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* signOut({ payload }) {
  // console.log(payload);
  const userId = payload;
  try {
    const signOutUser = yield call(signOutWithAPI, userId);
    // console.log(signOutUser.status);
    if (signOutUser.status) {
      localStorage.removeItem("user_id");
      localStorage.removeItem("email");
      localStorage.removeItem("first_name");
      localStorage.removeItem("last_name");
      localStorage.removeItem("multitab");
      localStorage.removeItem("theme");
      localStorage.removeItem("startfrom");
      localStorage.removeItem("ticker_code");
      yield put(userSignOutSuccess());
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

export function* createUserAccount() {
  yield takeEvery(SIGNUP_USER, createUserWithEmailPassword);
}

export function* signInUser() {
  // console.log("unique stp: 3");
  yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword);
}
export function* signInUserWP() {
  // console.log("unique stp: 3wp");
  yield takeEvery(SIGNIN_USER_WP, signInUserWithEmailPasswordWP);
}

export function* signOutUser() {
  yield takeEvery(SIGNOUT_USER, signOut);
}
export function* pricing() {
  yield takeEvery(PRICING, pricingRequest);
}

export default function* rootSaga() {
  yield all([
    fork(signInUser),
    fork(signInUserWP),
    fork(createUserAccount),
    fork(signOutUser),
    fork(pricing),
  ]);
}
