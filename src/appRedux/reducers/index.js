import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import Settings from "./Settings";
import Auth from "./Auth";
import Todo from "./Todo"
import Exchange from "./Exchange"


const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  auth: Auth,
  todos:Todo,
  Exchange:Exchange
});

export default reducers;
