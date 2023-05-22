import React, { Component } from "react";
import { connect } from "react-redux";
import { Avatar, Popover } from "antd";
import { userSignOut } from "appRedux/actions/Auth";
import Avatar1 from "react-avatar";
class UserInfo extends Component {
  render() {
    var email = localStorage.getItem("email");
    var fname = localStorage.getItem("first_name");
    var lname = localStorage.getItem("last_name");
    var user_id = localStorage.getItem("user_id");
    var profile_url = localStorage.getItem("profile_url");
    var href =
      "mailto:inappsupport@piafx.com?subject=" +
      email +
      "|Name: " +
      fname +
      " " +
      lname;
    if (this.props.profile_url != "") {
      profile_url = this.props.profile_url.profile_url;
    }
    profile_url = "https://piafx.com/my-account";
    const userMenuOptions = (
      <ul className="gx-user-popover">
        <li>
          <a href={profile_url} target="_blank">
            My Account
          </a>
        </li>
        {/* <li>Connections</li> */}
        <li>
          <a href={href}>Support</a>
        </li>
        <li onClick={() => this.props.userSignOut(user_id)}>Logout</li>
      </ul>
    );

    return (
      <Popover
        overlayClassName="gx-popover-horizantal"
        placement="bottomRight"
        content={userMenuOptions}
        trigger="click"
      >
        {/* <Avatar src='https://via.placeholder.com/150x150'
                className="gx-avatar gx-pointer" alt=""/> */}
        <Avatar1
          color={Avatar1.getRandomColor("sitebase", ["red", "green", "blue"])}
          name={fname + " " + lname}
          className="gx-avatar gx-pointer"
          size={40}
        />
      </Popover>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  const { authUser, profile_url } = auth;
  return { authUser, auth, profile_url };
};
export default connect(
  mapStateToProps,
  { userSignOut }
)(UserInfo);
