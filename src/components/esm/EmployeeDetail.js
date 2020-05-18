import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import { connect } from "react-redux";
import { getEmployeeById } from "../../actions/employeeActions";
import { Spinner } from "../utils/Spinner";
import { toast } from "react-toastify";
class EmployeeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeModel: {
        employeeId: 0,
        firstName: "",
        lastName: "",
        dob: new Date(),
        email: "",
        sex: "",
        experiences: [],
        skills: []
      }
    };

    this.navigate = this.navigate.bind(this);
  }
  componentDidMount() {
    // this.props.setActiveTab(tabs.personalinformation);

    let empId = this.props.match.params.id;
    if (empId) {
      // Bind all information by Id.
      this.props.getEmployeeById(empId);
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.employeeModelResult !== null && props.employeeModelResult !== state.employeeModel) {
      var model = state.employeeModel;
      model.employeeId = props.employeeModelResult.employeeId;
      model.firstName = props.employeeModelResult.firstName;
      model.lastName = props.employeeModelResult.lastName;
      model.sex = props.employeeModelResult.sex;
      model.email = props.employeeModelResult.email;
      model.dob = new Date(props.employeeModelResult.dob);
      if (
        props.employeeModelResult.experiences !== null &&
        props.employeeModelResult.experiences !== undefined &&
        props.employeeModelResult.experiences !== ""
      ) {
        model.experiences = props.employeeModelResult.experiences;
        model.experiences.forEach(item => {
          item.fromDate = new Date(item.fromDate);
          item.toDate = new Date(item.toDate);
        });
      } else {
        // exp model
        let objExp = {
          company: "",
          level: 1,
          designation: "",
          fromDate: new Date(),
          toDate: new Date(),
          employeeId: this.state.employeeModel.employeeId
        };
        model.experiences.push(objExp);
      }
      if (
        props.employeeModelResult.skills !== null &&
        props.employeeModelResult.skills !== undefined &&
        props.employeeModelResult.skills !== ""
      ) {
        model.skills = props.employeeModelResult.skills;
      } else {
        // skills model
        let objSkills = { skill: "", level: 1, employeeId: this.state.employeeModel.employeeId };
        model.skills.push(objSkills);
      }
      return {
        employeeModel: model
      };
    }
    return null;
  }

  navigate(link){
    this.props.history.push(link);
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
        <Spinner isLoading={this.props.loading} />
          {/* <!-- Page-header start --> */}
          <div className="page-header">
            <div className="page-block">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <div className="page-header-title">
                    <h5 className="m-b-10">Employee Detail</h5>
                    <p className="m-b-0">Showing detail of employee</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      {" "}
                      <i className="fa fa-home" />{" "}
                    </li>
                    <li className="breadcrumb-item">Employees</li>
                    <li className="breadcrumb-item">Employee Detail</li>
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
                          <h5>Employee Detail</h5>
                          <button
                            type="button"
                            className="btn btn-primary waves-effect waves-light f-right d-inline-block md-trigger"
                            onClick={() => this.navigate("/employee/edit/"+this.state.employeeModel.employeeId)}
                          >
                            {" "}
                            <i className="icofont icofont-edit  " /> Edit Employee
                          </button>
                          <button
                            type="button"
                            className="btn btn-warning waves-effect waves-light f-right d-inline-block md-trigger  m-r-5"
                            onClick={() => this.navigate("/employees")}
                          >
                            {" "}
                            <i className="icofont icofont-swoosh-left m-r-5" /> Back
                          </button>
                          
                        </div>
                        <div className="card-block">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="tab-header card">
                                <ul className="nav nav-tabs md-tabs tab-timeline" role="tablist" id="mytab">
                                  <li className="nav-item">
                                    <a className="nav-link active" data-toggle="tab" href="#personalInfo" role="tab">
                                      Personal Info
                                    </a>
                                    <div className="slide" />
                                  </li>
                                  <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#pastExp" role="tab">
                                      Past Experience
                                    </a>
                                    <div className="slide" />
                                  </li>
                                  <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#skills" role="tab">
                                      Skills
                                    </a>
                                    <div className="slide" />
                                  </li>
                                </ul>
                             
                              </div>

                              <div className="tab-content">
                                <div className="tab-pane active" id="personalInfo" role="tabpanel">
                                  <div className="card ">
                                    <div className="card-header">
                                      <h5 className="card-header-text">Personal Info</h5>
                                    </div>
                                    <div className="card-block">
                                      <div className="view-info">
                                        <div className="row">
                                          <div className="col-lg-12">
                                            <div className="general-info">
                                              <div className="row">
                                                <div className="col-lg-12 col-xl-6">
                                                  <div className="table-responsive">
                                                    <table className="table m-0 content">
                                                      <tbody>
                                                        <tr>
                                                          <th scope="row">Full Name</th>
                                                          <td>
                                                            {this.state.employeeModel.firstName}{" "}
                                                            {this.state.employeeModel.lastName}
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <th scope="row">Gender</th>
                                                          <td>{this.state.employeeModel.sex}</td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </div>
                                                </div>

                                                <div className="col-lg-12 col-xl-6">
                                                  <div className="table-responsive">
                                                    <table className="table content">
                                                      <tbody>
                                                        <tr>
                                                          <th scope="row">Email</th>
                                                          <td>
                                                            <a href={ "mailto:" + this.state.employeeModel.email} > {this.state.employeeModel.email }</a>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <th scope="row">Birth Date</th>
                                                          <td>
                                                            {" "}
                                                            {new Intl.DateTimeFormat("en-GB", {
                                                              year: "numeric",
                                                              month: "long",
                                                              day: "2-digit"
                                                            }).format(new Date(this.state.employeeModel.dob))}
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
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

                                <div className="tab-pane" id="pastExp" role="tabpanel">
                                  <div className="card table-card">
                                    <div className="card-header">
                                      <h5 className="card-header-text">Past Experience</h5>
                                    </div>
                                    <div className="card-block">
                                      <div className="table-responsive">
                                        <table className="table content">
                                          <thead>
                                            <tr>
                                              <th> Company</th>
                                              <th>Designation</th>
                                              <th>From Date</th>
                                              <th>To Date</th>
                                              <th>Level</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {this.state.employeeModel.experiences.map((exp, i) => {
                                              return (
                                                <tr key={i}>
                                                  <td>{exp.company}</td>
                                                  <td>{exp.designation}</td>
                                                  <td>
                                                    {" "}
                                                    {new Intl.DateTimeFormat("en-GB", {
                                                      year: "numeric",
                                                      month: "long",
                                                      day: "2-digit"
                                                    }).format(new Date(exp.fromDate))}
                                                  </td>
                                                  <td>
                                                    {" "}
                                                    {new Intl.DateTimeFormat("en-GB", {
                                                      year: "numeric",
                                                      month: "long",
                                                      day: "2-digit"
                                                    }).format(new Date(exp.toDate))}
                                                  </td>
                                                  <td>
                                                    <StarRatings
                                                      rating={exp.level}
                                                      starRatedColor="#448aff"
                                                      numberOfStars={5}
                                                      starDimension="20px"
                                                      starSpacing="1px"
                                                      name="level"
                                                    />
                                                  </td>
                                                </tr>
                                              );
                                            })}
                                             {this.state.employeeModel.experiences.length === 0 && (
                                          <div className="alert alert-info border-default">No experience added</div>
                                        )}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="tab-pane" id="skills" role="tabpanel">
                                  <div className="card">
                                    <div className="card-header">
                                      <h5 className="card-header-text">Skills</h5>
                                    </div>
                                    <div className="card-block">
                                      <div className="row">
                                        {this.state.employeeModel.skills.map((sk, i) => {
                                          return (
                                            <div key={i} className="col-md-4">
                                              <div className="card b-l-success business-info services m-b-20">
                                                <div className="card-header">
                                                  <div className="service-header">
                                                    <h5 className="card-header-text">{sk.skill}</h5>
                                                  </div>
                                                  <StarRatings
                                                    rating={sk.level}
                                                    starRatedColor="#448aff"
                                                    numberOfStars={5}
                                                    starDimension="20px"
                                                    starSpacing="1px"
                                                    name="level"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        })}

                                        {this.state.employeeModel.skills.length === 0 && (
                                          <div className="alert alert-info border-default">No skill added</div>
                                        )}
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

function mapStateToProps(state) {
  console.log("mapStateToProps - detail.js", state);
  return {
    employeeModelResult: state.employeeReducer.employeeModelResult,
    loading: state.employeeReducer.loading,
    error: state.employeeReducer.error
  };
}
export default connect(
  mapStateToProps,
  { getEmployeeById }
)(EmployeeDetail);
