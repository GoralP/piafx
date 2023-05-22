import React, { Component } from "react";
import { connect } from "react-redux";
import URLSearchParams from "url-search-params";
import { Redirect, Route, Switch } from "react-router-dom";
import { LocaleProvider } from "antd";
import { IntlProvider } from "react-intl";

import AppLocale from "lngProvider";
import MainApp from "./MainApp";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import Authentication from "../Authentication";
import SignUp1 from "../SignUp1";
import SignUp2 from "../SignUp2";
// import Htmlpdf from "../Htmlpdf";
import { setInitUrl } from "appRedux/actions/Auth";
import {
  onLayoutTypeChange,
  onNavStyleChange,
  setThemeType,
} from "appRedux/actions/Setting";

import {
  LAYOUT_TYPE_BOXED,
  LAYOUT_TYPE_FRAMED,
  LAYOUT_TYPE_FULL,
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  TAB_SIZE,
} from "../../constants/ThemeSetting";

const RestrictedRoute = ({ component: Component, authUser, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authUser ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
var startfrom = localStorage.getItem("startfrom");

class App extends Component {
  setLayoutType = (layoutType) => {
    if (layoutType === LAYOUT_TYPE_FULL) {
      document.body.classList.remove("boxed-layout");
      document.body.classList.remove("framed-layout");
      document.body.classList.add("full-layout");
    } else if (layoutType === LAYOUT_TYPE_BOXED) {
      document.body.classList.remove("full-layout");
      document.body.classList.remove("framed-layout");
      document.body.classList.add("boxed-layout");
    } else if (layoutType === LAYOUT_TYPE_FRAMED) {
      document.body.classList.remove("boxed-layout");
      document.body.classList.remove("full-layout");
      document.body.classList.add("framed-layout");
    }
  };

  setNavStyle = (navStyle) => {
    if (
      navStyle === NAV_STYLE_DEFAULT_HORIZONTAL ||
      navStyle === NAV_STYLE_DARK_HORIZONTAL ||
      navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL ||
      navStyle === NAV_STYLE_ABOVE_HEADER ||
      navStyle === NAV_STYLE_BELOW_HEADER
    ) {
      document.body.classList.add("full-scroll");
      document.body.classList.add("horizontal-layout");
    } else {
      document.body.classList.remove("full-scroll");
      document.body.classList.remove("horizontal-layout");
    }
  };

  componentWillMount() {
    if (this.props.initURL === "") {
      this.props.setInitUrl(this.props.history.location.pathname);
    }
    const params = new URLSearchParams(this.props.location.search);

    if (params.has("theme")) {
      this.props.setThemeType(params.get("theme"));
    }
    if (params.has("nav-style")) {
      this.props.onNavStyleChange(params.get("nav-style"));
    }
    if (params.has("layout-type")) {
      this.props.onLayoutTypeChange(params.get("layout-type"));
    }
    if (localStorage.getItem("theme") == "coffee") {
      document.body.classList.add("coffee-theme");
      document.body.classList.remove("default-theme");
      document.body.classList.remove("light-theme");
    }
    if (localStorage.getItem("theme") == "light") {
      document.body.classList.add("light-theme");
      document.body.classList.remove("default-theme");
      document.body.classList.remove("coffee-theme");
    } else {
      document.body.classList.add("default-theme");
      document.body.classList.remove("coffee-theme");
      document.body.classList.remove("light-theme");
    }
  }

  render() {
    const {
      match,
      location,
      layoutType,
      navStyle,
      locale,
      authUser,
      initURL,
      width,
    } = this.props;

    if (location.pathname === "/") {
      if (authUser === null) {
        return <Redirect to={"/signin"} />;
      } else if (initURL === "" || initURL === "/" || initURL === "/signin") {
        if (startfrom == "se") {
          return <Redirect to={"dashboard"} />;
        } else if (startfrom == "charting") {
          return <Redirect to={"charting"} />;
        } else if (startfrom == "ca") {
          return <Redirect to={"cotaccountancy"} />;
        } else if (startfrom == "news") {
          return <Redirect to={"news"} />;
        } else {
          return <Redirect to={"main"} />;
        }
      } else {
        return <Redirect to={initURL} />;
      }
    }
    this.setLayoutType(layoutType);

    this.setNavStyle(navStyle);

    const currentAppLocale = AppLocale[locale.locale];
    return (
      <LocaleProvider locale={currentAppLocale.antd}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <Switch>
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route
              exact
              path="/authentication/:email/:pwd"
              component={Authentication}
            />
            {/* <Route exact path='/htmlpdf' component={Htmlpdf}/> */}
            {/* <Route exact path='/signup1' component={SignUp1}/> */}
            {/* <Route exact path='/signup2' component={SignUp2}/> */}
            <RestrictedRoute
              path={`${match.url}`}
              authUser={authUser}
              component={MainApp}
            />
          </Switch>
        </IntlProvider>
      </LocaleProvider>

      // <LocaleProvider locale={currentAppLocale.antd}>
      //   <IntlProvider
      //     locale={currentAppLocale.locale}
      //     messages={currentAppLocale.messages}
      //   >
      //     <Switch>
      //       <Route exact path="/signin" component={SignIn} />
      //       <Route exact path="/signup" component={SignUp} />
      //       <Route
      //         exact
      //         path="/authentication/:email/:pwd"
      //         component={Authentication}
      //       />
      //       {/* <Route exact path='/htmlpdf' component={Htmlpdf}/> */}
      //       {/* <Route exact path='/signup1' component={SignUp1}/> */}
      //       {/* <Route exact path='/signup2' component={SignUp2}/> */}
      //       <RestrictedRoute
      //         path={`${match.url}`}
      //         authUser={authUser}
      //         component={MainApp}
      //       />
      //     </Switch>
      //   </IntlProvider>
      // </LocaleProvider>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => {
  const { locale, navStyle, layoutType, width } = settings;
  const { authUser, initURL } = auth;
  return { locale, navStyle, layoutType, authUser, initURL, width };
};
export default connect(
  mapStateToProps,
  { setInitUrl, setThemeType, onNavStyleChange, onLayoutTypeChange }
)(App);
