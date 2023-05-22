import React from "react";
import {Route, Switch} from "react-router-dom";
import Main from "./main/index";
import MyDashboard from "./main/dashboard/MyDashboard/index"
import OneoOne from "./main/dashboard/MyDashboard/oneoone"
import CotOneoOne from "./main/dashboard/MyDashboard/cotoneoone"
import cotaccountancy from "./main/dashboard/MyDashboard/cotaccountancy"
import main from "./main/dashboard/MyDashboard/main"
import news from "./main/dashboard/MyDashboard/news"
import settings from "./main/dashboard/MyDashboard/settings"
import charting from "./main/dashboard/MyDashboard/charting"
import Htmlpdf from "./main/dashboard/MyDashboard/Htmlpdf"
import experiments from "./main/dashboard/MyDashboard/experiments"
import seasonality from "./main/dashboard/MyDashboard/seasonality"

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}dashboard`} component={MyDashboard}/>
      <Route path={`${match.url}oneoone`} component={OneoOne}/>
      <Route path={`${match.url}cotoneoone`} component={CotOneoOne}/>
      <Route path={`${match.url}cotaccountancy`} component={cotaccountancy}/>
      <Route path={`${match.url}main`} component={main}/>
      <Route path={`${match.url}news`} component={news}/>
      <Route path={`${match.url}charting`} component={charting}/>
      <Route path={`${match.url}settings`} component={settings}/>
      <Route path={`${match.url}report`} component={Htmlpdf}/>
      <Route path={`${match.url}experiments`} component={experiments}/>
      <Route path={`${match.url}main`} component={Main}/>
      <Route path={`${match.url}seasonality`} component={seasonality}/>
    </Switch>
  </div>
);

export default App;
