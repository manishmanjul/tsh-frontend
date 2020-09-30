import React, { Component } from "react";
import logo from "./logo3.png";
import Header from "./Header";
import { NavLink } from "react-router-dom";

class TopHeader extends Component {
  render() {
    const username = this.props.username;
    const isLoggedIn = this.props.isLoggedIn;
    const mainmenu = this.props.mainmenu;
    var inOrOut, styletext, navLinkStyle, target, logout;
    if (isLoggedIn === "true") {
      inOrOut = "Logout";
      styletext = "glyphicon glyphicon-log-out pl-2 pr-2";
      navLinkStyle = "logout-button";
      target = "/Login";
      logout = this.props.logout;
    } else {
      inOrOut = "Login";
      styletext = "glyphicon glyphicon-log-in pl-2 pr-2";
      navLinkStyle = "login-button";
      target = "/Login";
    }

    return (
      <div className="sub-container float justify-content-between mb-0 pb-0 pl-5 pr-5 sticky-top">
        <div className="d-flex flex-row">
          <img alt="The Study House" className="header-logo mr-0" src={logo} />
          <Header mainMenu={mainmenu} />
        </div>

        <div className="d-flex h-30 align-content-center h-25 align-self-center">
          <span className="text-verdena smaller-text font-weight-bold text-lightgrey pt-3 pr-3">
            {username}
          </span>{" "}
          <NavLink
            to={target}
            className={"medium-text text-white pb-1 pt-1 " + navLinkStyle}
            onClick={logout}
          >
            <center>
              {inOrOut} <i className={styletext}></i>
            </center>
          </NavLink>
        </div>
      </div>
    );
  }
}
export default TopHeader;
