import React, { Component } from "react";
import logo from "../../images/image.png"; // Tell Webpack this JS file uses this image
import { Link } from "react-router-dom";
class Header extends Component {
  render() {
    return (
      <nav className="navbar header-navbar pcoded-header">
        <div className="navbar-wrapper">
          <div className="navbar-logo">
            <Link className="p-2 text-dark" to={"/dashboard"} replace>
              <img className="img-fluid" src={logo} alt="logo" />
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
