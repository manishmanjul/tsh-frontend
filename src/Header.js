import React, { Component } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";

class Header extends Component {
  render() {
    const menuitem = JSON.parse(JSON.stringify(this.props.mainMenu));
    if (menuitem) {
      for (var i in menuitem) {
        if (menuitem[i].featureType.typeName !== "MainMenu") {
          delete menuitem[i];
        }
      }
    }

    return (
      <div className="sub-container pl-3">
        <ul className="header">
          <li className="text-center pb-0">
            <NavLink
              to="/schedule"
              className="text-white text-capitalize medium-text mb=0 h-100"
            >
              <i className="glyphicon glyphicon-home" /> Home
            </NavLink>
          </li>{" "}
          {menuitem ? (
            menuitem.map((item) => (
              <li className="text-center pb-0" key={item.key}>
                <NavLink
                  to={"/" + item.target}
                  className="text-white text-capitalize medium-text mb=0 h-100"
                >
                  <i className={item.style} />
                  {" " + item.name}
                </NavLink>
              </li>
            ))
          ) : (
            <div></div>
          )}
        </ul>
      </div>
    );
  }
}

export default Header;
