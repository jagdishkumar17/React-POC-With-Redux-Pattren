import React, { Component } from "react";

// Components

// import ShoppingBag from "./ShoppingBag";
// import Wallet from "./Wallet";
// import Stats from "./Stats";

class Dashboard extends Component {
  render() {
    return (
      <div className="pcoded-wrapper">
        <div className="pcoded-content">
          {/* <!-- Page-header start --> */}
          <div className="page-header">
            <div className="page-block">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <div className="page-header-title">
                    <h5 className="m-b-10">Dashboard</h5>
                    <p className="m-b-0">Showing API Details</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      {" "}
                      <i className="fa fa-home" />{" "}
                    </li>
                    <li className="breadcrumb-item">Dashboard</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Page-header end --> */}
          <div className="pcoded-inner-content">
            <div className="main-body">
              <div className="page-wrapper">
                <div className="page-body">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="card">
                        <div className="card-header">
                          <h5>API's</h5>
                        </div>
                        <div className="card-block">
                          <p className="m-t-15 m-b-15 text-muted">
                            Get Employees/Add Employee : http://13.94.203.73:1103/api/employees
                          </p>

                          <p className="m-t-15 m-b-15 text-muted">
                            Get Employee by id/Update Employee : http://13.94.203.73:1103/api/employees/1
                          </p>

                          <p className="m-t-15 m-b-15 text-muted">Get Skills/Add Skill : http://13.94.203.73:1103/api/skills</p>

                          <p className="m-t-15 m-b-15 text-muted">
                            Get Skills by id/ Update Skill : http://13.94.203.73:1103/api/skills/1
                          </p>

                          <p className="m-t-15 m-b-15 text-muted">
                            Get Experiences/Add Experience : http://13.94.203.73:1103/api/experience
                          </p>

                          <p className="m-t-15 m-b-15 text-muted">
                            Get Experience by id/ Update Experience: http://13.94.203.73:1103/api/experience/1
                          </p>

                          <p className="m-t-15 m-b-15 text-muted">
                            <b>Paging and sorting is implemented in API. Please check below URL</b>
                          </p>
                          <p className="m-t-15 m-b-15 text-muted">
                            http://13.94.203.73:1103/api/employees/1/10/true/firstName/
                          </p>

                          <p className="m-t-15 m-b-15 text-muted">
                            Route :[Route(" page: int/pageSize:int/isAsc:bool?/orderBy:alpha?")]
                          </p>
                          <p className="m-t-15 m-b-15 text-muted">
                          <b>
                          we have to pass case sensitive parameters for sorting the records</b>
                          </p>
                          <p className="m-t-15 m-b-15 text-muted">
                          Kindly follow the parameters like this :
                          </p>

                          <p className="m-t-15 m-b-15 text-muted">
                         <span>firstname => FirstName</span> 
                         <br/>
                         <span>dob => DOB </span>
                         <br/>
                         <span>sex => Sex</span>
                         <br/>
                         <span>lastname = > LastName</span>
                         <br/>
                         <span>email => email (same parameter)</span>
                      





                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
