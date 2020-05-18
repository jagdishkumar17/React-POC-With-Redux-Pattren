import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navigation extends Component {
  render() {
    return (
      <nav className="pcoded-navbar">
        <div className="pcoded-inner-navbar">
          <ul className="pcoded-item pcoded-left-item">

          <li className="pcoded-hasmenu">
           
          <Link className="p-2 text-dark" to={"/dashboard"} replace>
          <span className="pcoded-micon">
                  <i className="ti-layout-cta-right" />
                  <b>N</b>
                </span>
                <span className="pcoded-mtext">Home</span>
                {/* <span className="pcoded-mcaret" /> */}
         
           </Link>
           
          
         </li>

         <li className="pcoded-hasmenu">
           
         <Link className="p-2 text-dark" to={"/employees"} replace>
         <span className="pcoded-micon">
                  <i className="ti-view-list-alt" />
                  <b>N</b>
                </span>
                <span className="pcoded-mtext">Employees</span>
                {/* <span className="pcoded-mcaret" /> */}
         
           </Link>
           
          
         </li>

            
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navigation;
