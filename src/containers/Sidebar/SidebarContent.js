import React, { Component } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";

import Auxiliary from "util/Auxiliary";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE,
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import { connect } from "react-redux";
import { loaderstatus } from "appRedux/actions/Exchange";
import ModalVideo from "react-modal-video";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class SidebarContent extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    change: "",
    isOpen: false,
  };
  getNoHeaderClass = (navStyle) => {
    if (
      navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR ||
      navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR
    ) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };
  openModal = () => {
    this.setState({ isOpen: true });
  };
  goFull = () => {
    // if(!this.props.loader){
    // this.props.loaderstatus(true);
    //   }
    if (
      (document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
    // this.setState({ isFull: true });
  };

  render() {
    const { themeType, navStyle, pathname } = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split("/")[1];
    var multitab = localStorage.getItem("multitab");
    var allfunctions = this;
    document.addEventListener("fullscreenchange", function() {});
    /* Firefox */
    document.addEventListener("mozfullscreenchange", function() {});
    /* Chrome, Safari and Opera */
    document.addEventListener("webkitfullscreenchange", function(e) {
      allfunctions.setState({ change: e });
      // if(allfunctions.props.loader){
      // allfunctions.props.loaderstatus(false);
      // }
    });

    /* IE / Edge */
    document.addEventListener("msfullscreenchange", function() {});
    // console.log('asplmulti',this.props.videoLinks);
    return (
      <Auxiliary>
        {this.props.videoLinks.length > 0 ? (
          <ModalVideo
            channel="custom"
            isOpen={this.state.isOpen}
            url={this.props.videoLinks[0]["sidebar"]}
            onClose={() => this.setState({ isOpen: false })}
          />
        ) : null}
        <SidebarLogo />
        {window.location.pathname == "/cotaccountancy" && multitab == "true" ? (
          <div className="gx-sidebar-content "></div>
        ) : (
          <div className="gx-sidebar-content">
            {/* <div className={`gx-sidebar-notifications ${this.getNoHeaderClass(navStyle)}`}>
            <UserProfile/>
            <AppsNavigation/>
          </div> */}
            <CustomScrollbars className="gx-layout-sider-scrollbar cust_menu side_cust_navmenu">
              <Menu
                defaultOpenKeys={[defaultOpenKeys]}
                selectedKeys={[selectedKeys]}
                theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
                mode="inline"
              >
                {window.location.pathname != "/report" ? (
                  multitab == "true" ? (
                    <Menu.Item
                      key="main"
                      className="sidebar_menu"
                      style={{ marginTop: "30px" }}
                    >
                      <Link to="/main" target="_blank">
                        {/* <i class="icon icon-dasbhoard"></i> */}
                        <img
                          alt=""
                          src={require("assets/images/dark_icon/dashboard.png")}
                          className="sidebar_icon icon"
                        />
                        <IntlMessages id="sidebar.main" />
                      </Link>
                    </Menu.Item>
                  ) : (
                    <Menu.Item
                      key="main"
                      className="sidebar_menu"
                      style={{ marginTop: "30px" }}
                    >
                      <Link to="/main">
                        {/* <i class="icon icon-dasbhoard"></i> */}
                        <img
                          alt=""
                          src={require("assets/images/dark_icon/dashboard.png")}
                          className="sidebar_icon icon"
                        />
                        <IntlMessages id="sidebar.main" />
                      </Link>
                    </Menu.Item>
                  )
                ) : (
                  <Menu.Item
                    key="main"
                    className="sidebar_menu"
                    style={{ marginTop: "30px" }}
                  >
                    <Link to="/main">
                      {/* <i class="icon icon-dasbhoard"></i> */}
                      <img
                        alt=""
                        src={require("assets/images/dark_icon/dashboard.png")}
                        className="sidebar_icon icon"
                      />
                      <IntlMessages id="sidebar.main" />
                    </Link>
                  </Menu.Item>
                )}

                {window.location.pathname != "/report" ? (
                  multitab == "true" ? (
                    <Menu.Item key="charting" className="sidebar_menu">
                      <Link to="/charting" target="_blank">
                        {/* <i class="icon icon-chart-area"></i> */}
                        <img
                          alt=""
                          src={require("assets/images/dark_icon/chart.png")}
                          className="sidebar_icon icon"
                        />
                        <IntlMessages id="sidebar.charting" />
                      </Link>
                    </Menu.Item>
                  ) : (
                    <Menu.Item key="charting" className="sidebar_menu">
                      <Link to="/charting">
                        {/* <i class="icon icon-chart-area"></i> */}
                        <img
                          alt=""
                          src={require("assets/images/dark_icon/chart.png")}
                          className="sidebar_icon icon"
                        />
                        <IntlMessages id="sidebar.charting" />
                      </Link>
                    </Menu.Item>
                  )
                ) : (
                  <Menu.Item key="charting" className="sidebar_menu">
                    <Link to="/charting">
                      {/* <i class="icon icon-chart-area"></i> */}
                      <img
                        alt=""
                        src={require("assets/images/dark_icon/chart.png")}
                        className="sidebar_icon icon"
                      />
                      <IntlMessages id="sidebar.charting" />
                    </Link>
                  </Menu.Item>
                )}

                {/* <Menu.Item key="cotaccountancy">
                <Link to="/cotaccountancy">
                <i class="icon icon-dasbhoard"></i>
                <IntlMessages id="sidebar.main"/></Link>
              </Menu.Item> */}

                {window.location.pathname != "/report" ? (
                  multitab == "true" ? (
                    <Menu.Item key="dashboard" className="sidebar_menu">
                      <Link to="/dashboard" target="_blank">
                        {/* <i class="icon icon-navigation"></i> */}
                        <img
                          alt=""
                          src={require("assets/images/dark_icon/compass.png")}
                          className="sidebar_icon icon"
                        />
                        <IntlMessages id="sidebar.setupexplorer" />
                      </Link>
                    </Menu.Item>
                  ) : (
                    <Menu.Item key="dashboard" className="sidebar_menu">
                      <Link to="/dashboard">
                        {/* <i class="icon icon-navigation"></i> */}
                        <img
                          alt=""
                          src={require("assets/images/dark_icon/compass.png")}
                          className="sidebar_icon icon"
                        />
                        <IntlMessages id="sidebar.setupexplorer" />
                      </Link>
                    </Menu.Item>
                  )
                ) : (
                  <Menu.Item key="dashboard" className="sidebar_menu">
                    <Link to="/dashboard">
                      {/* <i class="icon icon-navigation"></i> */}
                      <img
                        alt=""
                        src={require("assets/images/dark_icon/compass.png")}
                        className="sidebar_icon icon"
                      />
                      <IntlMessages id="sidebar.setupexplorer" />
                    </Link>
                  </Menu.Item>
                )}

                <Menu.Item key="news" className="sidebar_menu">
                  <Link to="/news">
                    {/* <i class="icon icon-tree"></i> */}
                    <img
                      alt=""
                      src={require("assets/images/dark_icon/news.png")}
                      className="sidebar_icon icon"
                    />
                    <IntlMessages id="sidebar.news" />
                  </Link>
                </Menu.Item>

                {window.location.pathname != "/report" ? (
                  multitab == "true" ? (
                    <Menu.Item key="seasonality" className="sidebar_menu">
                      <Link to="/seasonality" target="_blank">
                        {/* <i class="icon icon-navigation"></i> */}
                        <img
                          alt=""
                          src={require("assets/images/dark_icon/Seasonality.png")}
                          className="sidebar_icon icon"
                        />
                        <IntlMessages id="sidebar.seasonality" />
                      </Link>
                    </Menu.Item>
                  ) : (
                    <Menu.Item key="seasonality" className="sidebar_menu">
                      <Link to="/seasonality">
                        {/* <i class="icon icon-navigation"></i> */}
                        <img
                          alt=""
                          src={require("assets/images/dark_icon/Seasonality.png")}
                          className="sidebar_icon icon"
                        />
                        <IntlMessages id="sidebar.seasonality" />
                      </Link>
                    </Menu.Item>
                  )
                ) : (
                  <Menu.Item key="seasonality" className="sidebar_menu">
                    <Link to="/seasonality">
                      {/* <i class="icon icon-navigation"></i> */}
                      <img
                        alt=""
                        src={require("assets/images/dark_icon/Seasonality.png")}
                        className="sidebar_icon icon"
                      />
                      <IntlMessages id="sidebar.seasonality" />
                    </Link>
                  </Menu.Item>
                )}

                {window.location.pathname != "/report" ? (
                  multitab == "true" ? (
                    <Menu.Item key="cotaccountancy" className="sidebar_menu">
                      <Link to="/cotaccountancy" target="_blank">
                        {/* <i class="icon icon-picker"></i> */}
                        <img
                          alt=""
                          src={require("assets/images/dark_icon/abacus(1).png")}
                          className="sidebar_icon icon"
                        />
                        <IntlMessages id="sidebar.cotaccountancy" />
                      </Link>
                    </Menu.Item>
                  ) : (
                    <Menu.Item key="cotaccountancy" className="sidebar_menu">
                      <Link to="/cotaccountancy">
                        {/* <i class="icon icon-picker"></i> */}
                        <img
                          alt=""
                          src={require("assets/images/dark_icon/abacus(1).png")}
                          className="sidebar_icon icon"
                        />
                        <IntlMessages id="sidebar.cotaccountancy" />
                      </Link>
                    </Menu.Item>
                  )
                ) : (
                  <Menu.Item key="cotaccountancy" className="sidebar_menu">
                    <Link to="/cotaccountancy">
                      {/* <i class="icon icon-picker"></i> */}
                      <img
                        alt=""
                        src={require("assets/images/dark_icon/abacus(1).png")}
                        className="sidebar_icon icon"
                      />
                      <IntlMessages id="sidebar.cotaccountancy" />
                    </Link>
                  </Menu.Item>
                )}

                {/* 
              <Menu.Item key="transactionhistory" className="sidebar_menu">
                <Link to="/transactionhistory">
                <img alt="" src={require("assets/images/dark_icon/user(1).png")} className="sidebar_icon"/>
                  <IntlMessages id="sidebar.transactionhistory"/></Link>
              </Menu.Item> */}

                {/* <Menu.Item key="referal" className="sidebar_menu">
                <Link to="/referal">
                <i class="icon icon-refer"></i>
                  <IntlMessages id="sidebar.referal"/></Link>
              </Menu.Item> */}

                {/* <Menu.Item key="feedback" className="sidebar_menu">
                <Link to="/feedback">
                <img alt="" src={require("assets/images/dark_icon/feedback_15.png")} className="sidebar_icon"/>
                  <IntlMessages id="sidebar.feedback"/></Link>
              </Menu.Item> */}
                <Menu.Item key="fullscreen" className="sidebar_menu">
                  {/* <Link to="/settings"> */}
                  {/* <i class="icon icon-expand" onClick = {()=>this.goFull()}></i> */}
                  <img
                    alt=""
                    onClick={() => this.goFull()}
                    src={require("assets/images/dark_icon/Fullscreen.png")}
                    className="sidebar_icon icon-expand icon"
                  />
                  <IntlMessages id="sidebar.fullscreen" />

                  {/* </Link> */}
                </Menu.Item>
                <Menu.Item key="settings" className="sidebar_menu">
                  <Link to="/settings">
                    <img
                      alt=""
                      onClick={() => this.goFull()}
                      src={require("assets/images/dark_icon/Settings.png")}
                      className="sidebar_icon icon"
                    />
                    {/* <i class="icon icon-setting"></i> */}
                    <IntlMessages id="sidebar.setting" />
                  </Link>
                </Menu.Item>
                <Menu.Item
                  onClick={this.openModal}
                  key="question"
                  className="sidebar_menu"
                >
                  <div className="video_span">
                    <img
                      alt=""
                      src={require("assets/images/dark_icon/QuestionIco.png")}
                      className="video sidebar_icon icon"
                    />
                    {/* <i class="icon icon-setting"></i> */}
                    <IntlMessages id="sidebar.setting" />
                  </div>
                </Menu.Item>

                {/* <Menu.Item key="economicindicator">
                <Link to="/economicindicator">
                  <i class="icon icon-ripple"></i>
                  <IntlMessages id="sidebar.economicindicator"/></Link>
              </Menu.Item>
              
              <Menu.Item key="users">
                <Link to="/users">
                <i class="icon icon-wall"></i>
                  <IntlMessages id="sidebar.users"/></Link>
              </Menu.Item>

              <Menu.Item key="setting">
                <Link to="/setting">
                <i class="icon icon-setting"></i>
                  <IntlMessages id="sidebar.setting"/></Link>
              </Menu.Item> */}
              </Menu>
            </CustomScrollbars>
          </div>
        )}
      </Auxiliary>
    );
  }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({ settings }) => {
  const { navStyle, themeType, locale, pathname, videoLinks } = settings;
  return { navStyle, themeType, locale, pathname, videoLinks };
};
export default connect(
  mapStateToProps,
  { loaderstatus }
)(SidebarContent);
