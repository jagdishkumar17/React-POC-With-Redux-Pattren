import React, { Component } from "react";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.css";
//calling components
import { Spinner } from "../utils/Spinner";
// Calling action
import { getEmployees } from "../../actions/employeeActions";

class EmployeesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paging: {
        pageNumber: 1,
        pageSize: 10,
        totalNumberOfRecords: 0, // default
        pageRangeDisplayed: 5,
        sortBy: "employeeId",
        isAsc: false
      },
      employeesModel: []
    };

    this.navigate = this.navigate.bind(this);
    this.handleSortBy = this.handleSortBy.bind(this);
  }
  componentDidMount() {
    this.props.getEmployees(
      this.state.paging.pageNumber,
      this.state.paging.pageSize,
      this.state.paging.isAsc,
      this.state.paging.sortBy
    );
  }

  static getDerivedStateFromProps(props, state) {
    if (props.employeeModelResult !== null && props.employeeModelResult !== state.employeeModel) {
      // fill paging model
      var pagingModel = state.paging;
      pagingModel.pageNumber = props.employeeModelResult.pageNumber;
      pagingModel.totalNumberOfRecords = props.employeeModelResult.totalNumberOfRecords;

      // fill employee model
      var model = state.employeesModel;
      model = props.employeeModelResult.results;
      return {
        employeesModel: model,
        paging: pagingModel
      };
    }
    return null;
  }
  handlePageChange(pageNumber) {
    let paging = this.state.paging;
    paging.pageNumber = pageNumber;
    this.setState({ paging });
    this.props.getEmployees(
      this.state.paging.pageNumber,
      this.state.paging.pageSize,
      this.state.paging.isAsc,
      this.state.paging.sortBy
    );
  }
  handleSortBy(sortBy, isAsc) {
    let paging = this.state.paging;
    paging.pageNumber = 1;
    paging.sortBy = sortBy;
    paging.isAsc = isAsc;
    this.setState({ paging });
    this.props.getEmployees(
      this.state.paging.pageNumber,
      this.state.paging.pageSize,
      this.state.paging.isAsc,
      this.state.paging.sortBy
    );
  }
  render() {
    // Show Errors
    if (this.props.error !== "" && this.props.error !== null) {
      toast.error(this.props.error.message !== undefined ? this.props.error.message : this.props.error, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
    return (
      <div className="pcoded-wrapper">
        <div className="pcoded-content">
          {/* <!-- Page-header start --> */}
          <div className="page-header">
            <div className="page-block">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <div className="page-header-title">
                    <h5 className="m-b-10">Employees List</h5>
                    <p className="m-b-0">Showing all employees</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      {" "}
                      <i className="fa fa-home" />{" "}
                    </li>
                    <li className="breadcrumb-item">Employees</li>
                    <li className="breadcrumb-item">Employees List</li>
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
                          <h5>Employees</h5>
                          <button
                            type="button"
                            onClick={() => this.navigate("/employee/add")}
                            className="btn btn-primary waves-effect waves-light f-right d-inline-block md-trigger"
                          >
                            {" "}
                            <i className="icofont icofont-plus m-r-5" /> Add Employee
                          </button>
                        </div>
                        <div className="card-block">
                           <div className="row ">
                            <div className="col-sm-6">
                              <div className="material-group">
                                <div className="form-group form-primary">
                                  <input type="text" name="skill" className="form-control" />
                                </div>
                              </div>
                            </div>

                            <div className="col-sm-6">
                              <div className="clone-link cloneya-wrap">
                                <div className="toclone cloneya">
                                  <button className=" btn btn-primary clone-btn-left clone">
                                    <i className="icofont icofont-search" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="table-responsive">
                            <table className="table content">
                              <thead>
                                <tr className="table-header">
                                  <th className="sortable">
                                    Employee Id
                                    <i
                                      onClick={() => this.handleSortBy("employeeId", true)}
                                      className={
                                        "icofont icofont-arrow-up m-r-0 " +
                                        (this.state.paging.sortBy === "employeeId" && this.state.paging.isAsc === true
                                          ? "sorted"
                                          : "")
                                      }
                                    />
                                    <i
                                      onClick={() => this.handleSortBy("employeeId", false)}
                                      className={
                                        "icofont icofont-arrow-down ml-3-neg " +
                                        (this.state.paging.sortBy === "employeeId" && this.state.paging.isAsc === false
                                          ? "sorted"
                                          : "")
                                      }
                                    />
                                  </th>
                                  <th className="sortable">
                                    First Name
                                    <i
                                      onClick={() => this.handleSortBy("FirstName", true)}
                                      className={
                                        "icofont icofont-arrow-up m-r-0 " +
                                        (this.state.paging.sortBy === "FirstName" && this.state.paging.isAsc === true
                                          ? "sorted"
                                          : "")
                                      }
                                    />
                                    <i
                                      onClick={() => this.handleSortBy("FirstName", false)}
                                      className={
                                        "icofont icofont-arrow-down ml-3-neg " +
                                        (this.state.paging.sortBy === "FirstName" && this.state.paging.isAsc === false
                                          ? "sorted"
                                          : "")
                                      }
                                    />
                                  </th>

                                  <th className="sortable">
                                    Last Name
                                    <i
                                      onClick={() => this.handleSortBy("LastName", true)}
                                      className={
                                        "icofont icofont-arrow-up m-r-0 " +
                                        (this.state.paging.sortBy === "LastName" && this.state.paging.isAsc === true
                                          ? "sorted"
                                          : "")
                                      }
                                    />
                                    <i
                                      onClick={() => this.handleSortBy("LastName", false)}
                                      className={
                                        "icofont icofont-arrow-down ml-3-neg " +
                                        (this.state.paging.sortBy === "LastName" && this.state.paging.isAsc === false
                                          ? "sorted"
                                          : "")
                                      }
                                    />
                                  </th>
                                  <th className="sortable">
                                    Gender
                                    <i
                                      onClick={() => this.handleSortBy("Sex", true)}
                                      className={
                                        "icofont icofont-arrow-up m-r-0 " +
                                        (this.state.paging.sortBy === "Sex" && this.state.paging.isAsc === true ? "sorted" : "")
                                      }
                                    />
                                    <i
                                      onClick={() => this.handleSortBy("Sex", false)}
                                      className={
                                        "icofont icofont-arrow-down ml-3-neg " +
                                        (this.state.paging.sortBy === "Sex" && this.state.paging.isAsc === false
                                          ? "sorted"
                                          : "")
                                      }
                                    />
                                  </th>
                                  <th className="sortable">
                                    Email
                                    <i
                                      onClick={() => this.handleSortBy("email", true)}
                                      className={
                                        "icofont icofont-arrow-up m-r-0 " +
                                        (this.state.paging.sortBy === "email" && this.state.paging.isAsc === true
                                          ? "sorted"
                                          : "")
                                      }
                                    />
                                    <i
                                      onClick={() => this.handleSortBy("email", false)}
                                      className={
                                        "icofont icofont-arrow-down ml-3-neg " +
                                        (this.state.paging.sortBy === "email" && this.state.paging.isAsc === false
                                          ? "sorted"
                                          : "")
                                      }
                                    />
                                  </th>
                                  <th className="sortable">
                                    Dob
                                    <i
                                      onClick={() => this.handleSortBy("DOB", true)}
                                      className={
                                        "icofont icofont-arrow-up m-r-0 " +
                                        (this.state.paging.sortBy === "DOB" && this.state.paging.isAsc === true ? "sorted" : "")
                                      }
                                    />
                                    <i
                                      onClick={() => this.handleSortBy("DOB", false)}
                                      className={
                                        "icofont icofont-arrow-down ml-3-neg " +
                                        (this.state.paging.sortBy === "DOB" && this.state.paging.isAsc === false
                                          ? "sorted"
                                          : "")
                                      }
                                    />
                                  </th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.employeesModel != null &&
                                  this.state.employeesModel.length !== 0 &&
                                  this.state.employeesModel.map((emp, i) => {
                                    return (
                                      <tr key={i}>
                                        <td>{emp.employeeId}</td>
                                        <td >
                                        <p className="overflow-ellipsis">{emp.firstName}</p></td>
                                        <td>{emp.lastName}</td>
                                        <td> {emp.sex}</td>
                                        <td> {emp.email}</td>
                                        <td>
                                          {new Intl.DateTimeFormat("en-GB", {
                                            year: "numeric",
                                            month: "long",
                                            day: "2-digit"
                                          }).format(new Date(emp.dob))}
                                        </td>
                                        <td className="action-icon">
                                          <button
                                            onClick={() => this.navigate("/employee/edit/" + emp.employeeId)}
                                            className="btn btn-sm  btn-info "
                                          >
                                            <i className="icofont icofont-ui-edit" />
                                          </button>

                                          <button
                                            onClick={() => this.navigate("/employee/" + emp.employeeId)}
                                            className="btn btn-sm btn-warning m-l-5 "
                                          >
                                            <i className="icofont icofont-warning-alt" />
                                          </button>

                                          {/* <Link className="p-2 text-dark" to={"/dashboard"} replace>
                                            <i className="icofont icofont-delete-alt" />
                                          </Link> */}
                                        </td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </table>
                          </div>

                          <div className="row">
                            <div className="col-sm-4 ">
                              Showing {(this.state.paging.pageNumber - 1) * this.state.paging.pageSize + 1} to{" "}
                              {this.state.paging.pageNumber * this.state.paging.pageSize} of{" "}
                              {this.state.paging.totalNumberOfRecords} entries
                            </div>
                            <div className="col-sm-8">
                              <div className="float-right ">
                                <Pagination
                                  itemClass="page-item"
                                  linkClass="page-link"
                                  activePage={this.state.paging.pageNumber}
                                  itemsCountPerPage={this.state.paging.pageSize}
                                  totalItemsCount={this.state.paging.totalNumberOfRecords}
                                  pageRangeDisplayed={this.state.paging.pageRangeDisplayed}
                                  onChange={this.handlePageChange.bind(this)}
                                />
                              </div>
                            </div>
                          </div>
                          <Spinner isLoading={this.props.loading} />
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

  // navigateToAddEmployee() {
  //   this.props.history.push("/employee/add");
  // }
  navigate(link) {
    this.props.history.push(link);
  }
}

function mapStateToProps(state) {
  console.log("mapStateToProps - employeesList.js", state);
  return {
    employeeModelResult: state.employeeReducer.employeeModelResult,
    loading: state.employeeReducer.loading,
    error: state.employeeReducer.error
  };
}
export default connect(
  mapStateToProps,
  { getEmployees }
)(EmployeesList);
