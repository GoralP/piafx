import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

const Dashboard = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/crm`}/>
  </Switch>
);

export default Dashboard;
