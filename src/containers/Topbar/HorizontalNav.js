import React, {Component} from "react";
import {connect} from "react-redux";
import {Menu} from "antd";
import {Link} from "react-router-dom";
import IntlMessages from "../../util/IntlMessages";
import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL
} from "../../constants/ThemeSetting";


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HorizontalNav extends Component {

  getNavStyleSubMenuClass = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return "gx-menu-horizontal gx-submenu-popup-curve";
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve";
      case NAV_STYLE_BELOW_HEADER:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-below-submenu-popup-curve";
      case NAV_STYLE_ABOVE_HEADER:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-above-submenu-popup-curve";
      default:
        return "gx-menu-horizontal";

    }
  };

  render() {
    const {pathname, navStyle} = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys;
    // alert(defaultOpenKeys);
    return (

      <Menu
        defaultOpenKeys={[defaultOpenKeys]}
        selectedKeys={[selectedKeys]}
        mode="horizontal">

        <Menu.Item key="dashboard">
          <Link to="/dashboard">
            <IntlMessages id="sidebar.main"/></Link>
        </Menu.Item>

        <Menu.Item key="setupexplorer">
          <Link to="/setupexplorer">
            <IntlMessages id="sidebar.setupexplorer"/></Link>
        </Menu.Item>

        <Menu.Item key="101">
          <Link to="/101">
            <IntlMessages id="sidebar.101"/></Link>
        </Menu.Item>

        <Menu.Item key="tableanalyzer">
          <Link to="/tableanalyzer">
            <IntlMessages id="sidebar.tableanalyzer"/></Link>
        </Menu.Item>
        
        <Menu.Item key="cotaccountancy">
          <Link to="/cotaccountancy">
            <IntlMessages id="sidebar.cotaccountancy"/></Link>
        </Menu.Item>

        <Menu.Item key="crossfilters">
          <Link to="/crossfilters">
            <IntlMessages id="sidebar.crossfilters"/></Link>
        </Menu.Item>

        <Menu.Item key="currentcot">
          <Link to="/currentcot">
            <IntlMessages id="sidebar.currentcot"/></Link>
        </Menu.Item>

        <Menu.Item key="economicindicator">
          <Link to="/economicindicator">
            <IntlMessages id="sidebar.economicindicator"/></Link>
        </Menu.Item>



      </Menu>

    );
  }
}

HorizontalNav.propTypes = {};
const mapStateToProps = ({settings}) => {
  const {themeType, navStyle, pathname, locale} = settings;
  return {themeType, navStyle, pathname, locale}
};
export default connect(mapStateToProps)(HorizontalNav);

