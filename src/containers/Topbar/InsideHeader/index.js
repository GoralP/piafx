import React, {Component} from "react";
import {Layout, Menu, message, Popover} from 'antd';
import {connect} from "react-redux";
import CustomScrollbars from "util/CustomScrollbars";
import {Button,Modal} from "antd";
import languageData from "../languageData";
import UserInfo from "components/UserInfo";
import HorizontalNav from "../HorizontalNav";
import {Link} from "react-router-dom";
import {switchLanguage, toggleCollapsedSideNav} from "../../../appRedux/actions/Setting";
import Exchange from "components/Exchange";
import {AutoComplete} from "antd";
import {Seachcode} from "appRedux/actions/Exchange";


const {Header} = Layout;

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">Products</Menu.Item>
    <Menu.Item key="2">Apps</Menu.Item>
    <Menu.Item key="3">Blogs</Menu.Item>
  </Menu>
);

function handleMenuClick(e) {
  message.info('Click on menu item.');
}

class InsideHeader extends Component {

  state = {
    searchText: '',
    visible: false,
  };

  languageMenu = () => (
    <CustomScrollbars className="gx-popover-lang-scroll">
      <ul className="gx-sub-popover">
        {languageData.map(language =>
          <li className="gx-media gx-pointer" key={JSON.stringify(language)} onClick={(e) =>
            this.props.switchLanguage(language)
          }>
            <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`}/>
            <span className="gx-language-text">{language.name}</span>
          </li>
        )}
      </ul>
    </CustomScrollbars>);

  updateSearchChatUser = (evt) => {
    this.setState({
      searchText: evt.target.value,
    });
  };

  handleSearch = (value) => {
    var valueobj = {'ticker_code':value};
    this.props.Seachcode(valueobj);
  }

  onSelect(value) {
    console.log('onSelect', value);
  }
  
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

  render() {
    const {locale, navCollapsed} = this.props;
    const {dataSource} = this.state;

    return (
      <div className="gx-header-horizontal gx-header-horizontal-dark gx-inside-header-horizontal">
        <div className="gx-header-horizontal-top">
          <div className="gx-container">
            <div className="gx-header-horizontal-top-flex">
              {/* <div className="gx-header-horizontal-top-left">
                <i className="icon icon-alert gx-mr-3"/>
                <p className="gx-mb-0 gx-text-truncate"><IntlMessages id="app.announced"/></p>
              </div> */}
              {/* <ul className="gx-login-list">
                <li>Login</li>
                <li>Signup</li>
              </ul> */}
              <div style={{'paddingLeft':'10px'}}>

              <Link to="/" className="gx-d-block gx-d-lg-none gx-pointer gx-mr-xs-3 gx-pt-xs-1 gx-w-logo">
                <img alt="" src={require("assets/images/w-logo.png")}/></Link>
              <Link to="/" className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo">
                <img alt="" src={require("assets/images/logo.png")}/></Link>

              </div>
            </div>
          </div>
        </div>


        <Header
          className="gx-header-horizontal-main">
          <div className="gx-container">
            <div className="gx-header-horizontal-main-flex">
              <div className="gx-d-block gx-d-lg-none gx-linebar gx-mr-xs-3 6e">
                <i className="gx-icon-btn icon icon-menu"
                   onClick={() => {
                     this.props.toggleCollapsedSideNav(!navCollapsed);
                   }}
                />
              </div>
              

              <div className="gx-header-horizontal-nav gx-header-horizontal-nav-curve gx-d-none gx-d-lg-block">
                <HorizontalNav/>
              </div>
              <ul className="gx-header-notifications gx-ml-auto">
                <li className="gx-notify gx-notify-search">
                  <div className="gx-d-flex">
                        {/* <span className="gx-pointer gx-status-pos gx-d-block">Code</span> */}
                        {/* <SearchBox styleName="gx-popover-search-bar"
                                  placeholder="Search code"
                                  onChange={this.updateSearchChatUser.bind(this)}
                                  value={this.state.searchText}
                                  style={{"color":'#fa8c16'}}
                                  /> */}

                        <AutoComplete
                              dataSource={this.props.seachList}
                              onSelect={this.onSelect}
                              onSearch={this.handleSearch}
                              style={{width: 150}}
                              placeholder="Seach code Here"
                            />
                                  
                  </div>
                </li>

                <li className="gx-notify">
                    <span className="gx-pointer gx-d-block" onClick={this.showModal}>
                      Exchange
                    </span>
                    <Modal title="Sector"
                              visible={this.state.visible}
                              onOk={this.handleOk}
                              onCancel={this.handleCancel}
                        >
                        <Exchange/>
                      </Modal>
                </li>

                <li className="gx-msg">
                  <span className="gx-pointer gx-d-block" onClick={this.showModal}>
                    Sector
                  </span>
                  <Modal className="exchange_modal"
                              visible={this.state.visible}
                              
                              onCancel={this.handleCancel}
                        >
                        <Exchange/>
                      </Modal>
                </li>

                {/* <li className="gx-language">
                  <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight"
                           content={this.languageMenu()} trigger="click">
              <span className="gx-pointer gx-flex-row gx-align-items-center"><i
                className={`flag flag-24 flag-${locale.icon}`}/>
              </span>
                  </Popover>
                </li> */}
                <li className="gx-user-nav"><UserInfo/></li>
              </ul>
            </div>
          </div>
        </Header>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {locale, navCollapsed} = state.settings;
  return {locale, navCollapsed,
    seachList: state.Exchange.seachList
  }
};
export default connect(mapStateToProps, {toggleCollapsedSideNav, switchLanguage,Seachcode})(InsideHeader);
