import React, { Component } from "react";
import {
  Button,
  Dropdown,
  Icon,
  Layout,
  Menu,
  message,
  Popover,
  Select,
  Modal,
} from "antd";
import { connect } from "react-redux";
import CustomScrollbars from "util/CustomScrollbars";

import languageData from "../languageData";
import SearchBox from "components/SearchBox";
import UserInfo from "components/UserInfo";
import AppNotification from "components/AppNotification";
import MailNotification from "components/MailNotification";
import {
  switchLanguage,
  toggleCollapsedSideNav,
} from "../../../appRedux/actions/Setting";

import { TAB_SIZE } from "../../../constants/ThemeSetting";
import HorizontalNav from "../HorizontalNav";
import { Link } from "react-router-dom";
import IntlMessages from "../../../util/IntlMessages";
import Exchange from "components/Exchange";
import { AutoComplete } from "antd";
import { Seachcode } from "appRedux/actions/Exchange";

const { Header } = Layout;

const Option = Select.Option;

function handleMenuClick(e) {
  message.info("Click on menu item.");
}

function handleChange(value) {
  console.log(`selected ${value}`);
}

class AboveHeader extends Component {
  state = {
    searchText: "",
    dropdownvisible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    this.setState({
      visible: false,
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  handleVisibleChange = (flag) => {
    this.setState({ dropdownvisible: flag });
  };

  languageMenu = () => (
    <CustomScrollbars className="gx-popover-lang-scroll">
      <ul className="gx-sub-popover">
        {languageData.map((language) => (
          <li
            className="gx-media gx-pointer"
            key={JSON.stringify(language)}
            onClick={(e) => this.props.switchLanguage(language)}
          >
            <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`} />
            <span className="gx-language-text">{language.name}</span>
          </li>
        ))}
      </ul>
    </CustomScrollbars>
  );

  updateSearchChatUser = (evt) => {
    this.setState({
      searchText: evt.target.value,
    });
  };

  handleSearch = (value) => {
    var valueobj = { ticker_code: value };
    this.props.Seachcode(valueobj);
  };

  onSelect(value) {
    console.log("onSelect", value);
  }

  render() {
    const { width, locale, navCollapsed } = this.props;
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">option 1</Menu.Item>
      </Menu>
    );
    return (
      <div className="gx-header-horizontal gx-header-horizontal-dark gx-above-header-horizontal">
        <div className="gx-header-horizontal-nav gx-header-horizontal-nav-curve gx-d-none gx-d-lg-block">
          <div className="gx-container">
            <div className="gx-header-horizontal-nav-flex">
              <HorizontalNav />
              <ul className="gx-header-notifications gx-ml-auto">
                {/* <li><span className="gx-pointer gx-d-block"><i className="icon icon-menu-lines"/></span></li>
                <li><span className="gx-pointer gx-d-block"><i className="icon icon-setting"/></span></li>
                <li><span className="gx-pointer gx-d-block"><i className="icon icon-apps-new"/></span></li> */}
              </ul>
            </div>
          </div>
        </div>

        <div className="gx-header-horizontal-top">
          <div className="gx-container">
            <div className="gx-header-horizontal-top-flex">
              {/* <div className="gx-header-horizontal-top-left">
                <i className="icon icon-alert gx-mr-3"/>
                <p className="gx-mb-0 gx-text-truncate"><IntlMessages id="app.announced"/></p>
              </div> */}
              {/* <ul className="gx-login-list">
                <li><IntlMessages id="app.userAuth.login"/></li>
                <li><IntlMessages id="app.userAuth.signUp"/></li>
              </ul> */}
            </div>
          </div>
        </div>

        <Header className="gx-header-horizontal-main cust_topbar_header">
          <div className="gx-container">
            <div className="gx-header-horizontal-main-flex ">
              <div className="gx-d-block gx-d-lg-none gx-linebar gx-mr-xs-3">
                <i
                  className="gx-icon-btn icon icon-menu"
                  onClick={() => {
                    if (width <= TAB_SIZE) {
                      this.props.toggleCollapsedSideNav(!navCollapsed);
                    }
                  }}
                />
              </div>
              <Link
                to="/"
                className="gx-d-block gx-d-lg-none gx-pointer gx-mr-xs-3 gx-pt-xs-1 gx-w-logo"
              >
                <img alt="" src={require("assets/images/w-logo.png")} />
              </Link>
              <Link
                to="/"
                className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo"
              >
                <img alt="" src={require("assets/images/logo.png")} />
              </Link>
              <div className="gx-header-search gx-d-none gx-d-lg-flex">
                {/* <SearchBox styleName="gx-lt-icon-search-bar"
                           placeholder="Search code"
                           onChange={this.updateSearchChatUser.bind(this)}
                           value={this.state.searchText}
                           /> */}

                <AutoComplete
                  styleName="gx-lt-icon-search-bar"
                  dataSource={this.props.seachList}
                  onSelect={this.onSelect}
                  onSearch={this.handleSearch}
                  placeholder="Seach code Here"
                />

                {/* <Select defaultValue="lucy" style={{width: 90}} onChange={handleChange}>
                  <Option value="jack">Products</Option>
                  <Option value="lucy">Code</Option>
                  <Option value="Yiminghe">Blogs</Option>
                </Select> */}
                {/* <label> Code </label> */}

                <div className="gx-notify" style={{ marginLeft: "10px" }}>
                  {/* <span className="gx-pointer gx-d-block" onClick={this.showModal}>
                      Exchange
                    </span> */}
                  <Button ghost onClick={this.showModal}>
                    Exchange
                  </Button>
                  <Modal
                    title="Sector"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                  >
                    <Exchange />
                  </Modal>
                </div>

                <div className="gx-msg" style={{ marginLeft: "10px" }}>
                  <Button ghost onClick={this.showModal}>
                    Sector
                  </Button>
                  <Modal
                    title="Sector"
                    className="exchange_modal"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                  >
                    <Exchange />
                  </Modal>
                </div>
              </div>

              <ul className="gx-header-notifications gx-ml-auto">
                <li className="gx-notify gx-notify-search gx-d-inline-block gx-d-lg-none">
                  <Popover
                    overlayClassName="gx-popover-horizantal"
                    placement="bottomRight"
                    content={
                      <div className="gx-d-flex">
                        <Dropdown overlay={menu}>
                          <Button>
                            Category <Icon type="down" />
                          </Button>
                        </Dropdown>
                        <SearchBox
                          styleName="gx-popover-search-bar"
                          placeholder="Search in app..."
                          onChange={this.updateSearchChatUser.bind(this)}
                          value={this.state.searchText}
                        />
                      </div>
                    }
                    trigger="click"
                  >
                    <span className="gx-pointer gx-d-block">
                      <i className="icon icon-search-new" />
                    </span>
                  </Popover>
                </li>

                <li style={{ marginRight: "15px", fontSize: "15px" }}>
                  <Dropdown
                    overlay={menu}
                    onVisibleChange={this.handleVisibleChange}
                    visible={this.state.dropdownvisible}
                  >
                    <span className="gx-link ant-dropdown-link">
                      Cot <Icon type="down" />
                    </span>
                  </Dropdown>
                </li>
                <li style={{ marginRight: "15px", fontSize: "15px" }}>
                  <Dropdown overlay={menu}>
                    <span className="gx-link ant-dropdown-link">
                      Technical Indicators <Icon type="down" />
                    </span>
                  </Dropdown>
                </li>
                <li style={{ marginRight: "15px", fontSize: "15px" }}>
                  <Dropdown overlay={menu}>
                    <span className="gx-link ant-dropdown-link">
                      Economic Indicators <Icon type="down" />
                    </span>
                  </Dropdown>
                </li>

                {/* <li className="gx-msg">
                  <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight"
                           content={<MailNotification/>} trigger="click">
                <span className="gx-pointer gx-status-pos gx-d-block">
                <i className="icon icon-chat-new"/>
                <span className="gx-status gx-status-rtl gx-small gx-orange"/>
                </span>
                  </Popover>
                </li>
                <li className="gx-language">
                  <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight"
                           content={this.languageMenu()} trigger="click">
              <span className="gx-pointer gx-flex-row gx-align-items-center"><i
                className={`flag flag-24 flag-${locale.icon}`}/>
              </span>
                  </Popover>
                </li> */}
                <li>
                  <UserInfo />
                </li>
              </ul>
            </div>
          </div>
        </Header>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { locale, navCollapsed, width } = state.settings;
  return { locale, navCollapsed, seachList: state.Exchange.seachList };
};
export default connect(
  mapStateToProps,
  { toggleCollapsedSideNav, switchLanguage, Seachcode }
)(AboveHeader);
