import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import StarRatings from "react-star-ratings";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { tabs } from "../utils/tabs";
import { validationMessages } from "../utils/validationMessages";
import common from "../utils/common";
//calling components
import { Spinner } from "../utils/Spinner";
// Calling action
import { addEmployee, getEmployeeById, updateEmployee } from "../../actions/employeeActions";
// import { setActiveTab } from "../../actions/activeTabActions";
class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: tabs.personalinformation,
      employeeModel: {
        employeeId: 0,
        firstName: "",
        lastName: "",
        dob: "",
        email: "",
        sex: "",
        experiences: [],
        skills: []
      },
      personalInfoValidationErrors: {},
      skillValidationErrors: [{ rowIndex: "", skill: "", level: "" }],
      experienceValidationErrors: [{ rowIndex: "", company: "", designation: "", fromDate: "", toDate: "", level: "" }]
    };
    this.navigateToTab = this.navigateToTab.bind(this);
    this.navigateToEmployeesList = this.navigateToEmployeesList.bind(this);

    // Personal Information
    this.handlePersonalInformationInputChange = this.handlePersonalInformationInputChange.bind(this);
    this.handleDobChange = this.handleDobChange.bind(this);
    this.savePersonalInformation = this.savePersonalInformation.bind(this);

    // Past Exp
    this.handlePastExpInputChange = this.handlePastExpInputChange.bind(this);
    this.handleFromDateChange = this.handleFromDateChange.bind(this);
    this.handleToDateChange = this.handleToDateChange.bind(this);
    this.handleRemovePastExpClick = this.handleRemovePastExpClick.bind(this);
    this.handleAddPastExpClick = this.handleAddPastExpClick.bind(this);
    this.changeExpRating = this.changeExpRating.bind(this);
    this.savePastExp = this.savePastExp.bind(this);

    // Skills
    this.handleSkillInputChange = this.handleSkillInputChange.bind(this);
    this.handleRemoveSkillClick = this.handleRemoveSkillClick.bind(this);
    this.handleAddSkillClick = this.handleAddSkillClick.bind(this);
    this.changeRating = this.changeRating.bind(this);
  }
  componentDidMount() {
    // this.props.setActiveTab(tabs.personalinformation);

    let empId = this.props.match.params.id;
    if (empId) {
      // Bind all information by Id.
      this.props.getEmployeeById(empId);
    } else {
      const list = this.state.employeeModel;
      // exp model
      let objExp = {
        company: "",
        level: 0,
        designation: "",
        fromDate: "",
        toDate: "",
        employeeId: this.state.employeeModel.employeeId
      };
      list.experiences.push(objExp);
      this.setState({
        list
      });

      // skills model
      let objSkills = { skill: "", level: 0, employeeId: this.state.employeeModel.employeeId };
      list.skills.push(objSkills);
      this.setState({
        list
      });
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
                    <h5 className="m-b-10">{this.state.employeeModel.employeeId === 0 ? "Add Employee" : "Edit Employee"}</h5>
                    <p className="m-b-0">
                      {this.state.employeeModel.employeeId === 0
                        ? "Form for employee creation"
                        : "Form for edit employee information"}
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      {" "}
                      <i className="fa fa-home" />{" "}
                    </li>
                    <li className="breadcrumb-item">Employees</li>
                    <li className="breadcrumb-item">
                      {" "}
                      {this.state.employeeModel.employeeId === 0 ? "Add Employee" : "Edit Employee"}
                    </li>
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
                      {/* <!-- Product edit card start --> */}
                      <div className="card">
                        <div className="card-header">
                          <h5>{this.state.employeeModel.employeeId === 0 ? "Add Employee" : "Edit Employee"}</h5>
                        </div>
                        <div className="card-block">
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="product-edit">
                                <ul className="nav nav-tabs nav-justified md-tabs " role="tablist">
                                  <li className="nav-item">
                                    <a
                                      className={
                                        "nav-link  " +
                                        (this.state.activeTab === tabs.personalinformation ? "active" : "disabled")
                                      }
                                      data-toggle="tab"
                                      href="#personalinformation"
                                      role="tab"
                                    >
                                      <div className="f-20">
                                        <i className="icofont icofont-edit" />
                                      </div>
                                      Personal Information
                                    </a>
                                    <div className="slide" />
                                  </li>
                                  <li className="nav-item">
                                    <a
                                      className={
                                        "nav-link  disabled " + (this.state.activeTab === tabs.pastExp ? "active" : "disabled")
                                      }
                                      data-toggle="tab"
                                      href="#pastexp"
                                      role="tab"
                                    >
                                      <div className="f-20">
                                        <i className="icofont icofont-document-search" />
                                      </div>
                                      Past Experience
                                    </a>
                                    <div className="slide" />
                                  </li>

                                  <li className="nav-item">
                                    <a
                                      className={
                                        "nav-link  disabled " + (this.state.activeTab === tabs.skills ? "active" : "disabled")
                                      }
                                      data-toggle="tab"
                                      href="#skills"
                                      role="tab"
                                    >
                                      <div className="f-20">
                                        <i className="icofont icofont-comment" />
                                      </div>
                                      Skills
                                    </a>
                                    <div className="slide" />
                                  </li>
                                </ul>

                                {/* <!-- Tab panes --> */}
                                <div className="tab-content">
                                  <div
                                    className={
                                      "tab-pane  " + (this.state.activeTab === tabs.personalinformation ? "active" : "")
                                    }
                                    id="personalinformation"
                                    role="tabpanel"
                                  >
                                    <div className="form-material card-block">
                                      <div className="j-forms">
                                        <div className="row">
                                          <div className="col-sm-6">
                                            <div className="material-group">
                                              <div className="material-addone">
                                                <i className="icofont icofont-ui-user" />
                                              </div>
                                              <div className="form-group form-primary">
                                                <input
                                                  type="text"
                                                  value={this.state.employeeModel.firstName || ""}
                                                  onChange={this.handlePersonalInformationInputChange}
                                                  name="firstName"
                                                  className="form-control"
                                                />
                                                <span className="form-bar" />
                                                <label className="float-label">First Name</label>
                                                <label className="float-label-validation">
                                                  {this.state.personalInfoValidationErrors.firstName ||
                                                    validationMessages.EMPTY}
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-sm-6">
                                            <div className="material-group">
                                              <div className="material-addone">
                                                <i className="icofont icofont-man-in-glasses" />
                                              </div>
                                              <div className="form-group form-primary">
                                                <input
                                                  type="text"
                                                  value={this.state.employeeModel.lastName || ""}
                                                  onChange={this.handlePersonalInformationInputChange}
                                                  name="lastName"
                                                  className="form-control"
                                                />
                                                <span className="form-bar" />
                                                <label className="float-label">Last Name</label>
                                                <label className="float-label-validation">
                                                  {this.state.personalInfoValidationErrors.lastName || validationMessages.EMPTY}
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col-sm-6">
                                            <div className="material-group">
                                              <div className="material-addone">
                                                <i className="icofont icofont-ui-email" />
                                              </div>
                                              <div className="form-group form-primary">
                                                <input
                                                  type="text"
                                                  value={this.state.employeeModel.email || ""}
                                                  onChange={this.handlePersonalInformationInputChange}
                                                  name="email"
                                                  className="form-control"
                                                />
                                                <span className="form-bar" />
                                                <label className="float-label">Email</label>
                                                <label className="float-label-validation">
                                                  {this.state.personalInfoValidationErrors.email || validationMessages.EMPTY}
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-sm-6">
                                            <div className="material-group">
                                              <div className="material-addone">
                                                <i className="icofont icofont-tasks-alt" />
                                              </div>
                                              <div className="form-group form-primary">
                                                {/* <input type="text" id="txtDob" name="dob" className="form-control" value="2012-05-15 21:05"  /> */}
                                                <DatePicker
                                                  className="form-control"
                                                  name="dob"
                                                  selected={this.state.employeeModel.dob}
                                                  onChange={this.handleDobChange}
                                                />
                                                <span className="form-bar" />
                                                <label className="float-label">Date Of Birth</label>
                                                <label className="float-label-validation">
                                                  {this.state.personalInfoValidationErrors.dob || validationMessages.EMPTY}
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="row">
                                          <div className="col-sm-6">
                                            <div className="material-group">
                                              <div className="material-addone">
                                                <i className="icofont icofont-runner-alt-2" />
                                              </div>
                                              <div className="form-group form-primary">
                                                <select
                                                  value={this.state.employeeModel.sex}
                                                  onChange={this.handlePersonalInformationInputChange}
                                                  name="sex"
                                                  className="form-control"
                                                >
                                                  <option value="">Select Gender</option>;<option value="Male">Male</option>
                                                  <option value="Female">Female</option>
                                                </select>
                                                <span className="form-bar" />
                                                <label className="float-label">Gender</label>
                                                <label className="float-label-validation">
                                                  {this.state.personalInfoValidationErrors.sex || validationMessages.EMPTY}
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-sm-9">
                                          <div className="text-right m-t-20">
                                            <button
                                              type="button"
                                              onClick={() => this.navigateToEmployeesList()}
                                              className="btn btn-warning waves-effect waves-light m-r-10"
                                            >
                                              Back to employees list
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                this.savePersonalInformation();
                                              }}
                                              className="btn btn-primary waves-effect waves-light m-r-10"
                                            >
                                              Next
                                            </button>
                                          </div>
                                        </div>

                                        <div className="col-sm-3">
                                          {/* <Spinner isLoading={this.props.personalInformationLoading}/> */}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className={"tab-pane  " + (this.state.activeTab === tabs.pastExp ? "active" : "")}
                                    id="pastexp"
                                    role="tabpanel"
                                  >
                                    <div className="form-material card-block">
                                      {this.state.employeeModel.experiences.map((exp, i) => {
                                        return (
                                          <div key={i} className="j-forms">
                                            <div className="row ">
                                              <div className="col-sm-10">
                                                <div className="row">
                                                  <div className="col-sm-6">
                                                    <div className="material-group">
                                                      <div className="material-addone">
                                                        <i className="icofont icofont-site-map" />
                                                      </div>
                                                      <div className="form-group form-primary">
                                                        <input
                                                          type="text"
                                                          name="company"
                                                          value={exp.company}
                                                          onChange={e => this.handlePastExpInputChange(e, i)}
                                                          className="form-control"
                                                        />
                                                        <span className="form-bar" />
                                                        <label className="float-label">Company Name</label>
                                                        <label className="float-label-validation">
                                                          {(this.state.experienceValidationErrors[i] !== undefined &&
                                                            this.state.experienceValidationErrors[i].company) ||
                                                            validationMessages.EMPTY}
                                                        </label>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="col-sm-6">
                                                    <div className="material-group">
                                                      <div className="material-addone">
                                                        <i className="icofont icofont-medal" />
                                                      </div>
                                                      <div className="form-group form-primary">
                                                        <input
                                                          type="text"
                                                          name="designation"
                                                          value={exp.designation}
                                                          onChange={e => this.handlePastExpInputChange(e, i)}
                                                          className="form-control"
                                                        />
                                                        <span className="form-bar" />
                                                        <label className="float-label">Designation</label>
                                                        <label className="float-label-validation">
                                                          {(this.state.experienceValidationErrors[i] !== undefined &&
                                                            this.state.experienceValidationErrors[i].designation) ||
                                                            validationMessages.EMPTY}
                                                        </label>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="row">
                                                  <div className="col-sm-6">
                                                    <div className="material-group">
                                                      <div className="material-addone">
                                                        <i className="icofont icofont-tasks-alt" />
                                                      </div>
                                                      <div className="form-group form-primary">
                                                        <DatePicker
                                                          className="form-control"
                                                          name="fromDate"
                                                          selected={exp.fromDate}
                                                          onChange={e => this.handleFromDateChange(e, i)}
                                                        />
                                                        <span className="form-bar" />
                                                        <label className="float-label">From Date</label>
                                                        <label className="float-label-validation">
                                                          {(this.state.experienceValidationErrors[i] !== undefined &&
                                                            this.state.experienceValidationErrors[i].fromDate) ||
                                                            validationMessages.EMPTY}
                                                        </label>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="col-sm-6">
                                                    <div className="material-group">
                                                      <div className="material-addone">
                                                        <i className="icofont icofont-tasks-alt" />
                                                      </div>
                                                      <div className="form-group form-primary">
                                                        <DatePicker
                                                          className="form-control"
                                                          name="toDate"
                                                          selected={exp.toDate}
                                                          onChange={e => this.handleToDateChange(e, i)}
                                                        />
                                                        <span className="form-bar" />
                                                        <label className="float-label">To Date</label>
                                                        <label className="float-label-validation">
                                                          {(this.state.experienceValidationErrors[i] !== undefined &&
                                                            this.state.experienceValidationErrors[i].toDate) ||
                                                            validationMessages.EMPTY}
                                                        </label>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="row">
                                                  <div className="col-sm-6">
                                                    <div className="material-group">
                                                      <div className="material-addone">
                                                        <i className="icofont icofont-score-board" />
                                                      </div>
                                                      <div className="form-group form-primary">
                                                        <StarRatings
                                                          rating={exp.level}
                                                          starRatedColor="#448aff"
                                                          starHoverColor="#ffe100"
                                                          // changeRating={this.changeRating}
                                                          changeRating={e => this.changeExpRating(e, i)}
                                                          numberOfStars={5}
                                                          starDimension="25px"
                                                          starSpacing="5px"
                                                          name="level"
                                                        />
                                                        <span className="form-bar" />
                                                        <label className="float-label">Company Level</label>
                                                        <label className="float-label-validation">
                                                          {(this.state.experienceValidationErrors[i] !== undefined &&
                                                            this.state.experienceValidationErrors[i].level) ||
                                                            validationMessages.EMPTY}
                                                        </label>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="col-sm-2">
                                                <div className="row m-t-20">
                                                  <div className="clone-link cloneya-wrap">
                                                    <div className="toclone cloneya">
                                                      {this.state.employeeModel.experiences.length !== 1 && (
                                                        <button
                                                          onClick={e => this.handleRemovePastExpClick(e, i)}
                                                          className="btn btn-default clone-btn-left delete m-r-10"
                                                        >
                                                          <i className="icofont icofont-minus" />
                                                        </button>
                                                      )}
                                                      {this.state.employeeModel.experiences.length - 1 === i && (
                                                        <button
                                                          onClick={e => this.handleAddPastExpClick()}
                                                          className=" btn btn-primary clone-btn-left clone"
                                                        >
                                                          <i className="icofont icofont-plus" />
                                                        </button>
                                                      )}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}

                                      <div className="row">
                                        <div className="col-sm-9">
                                          <div className="text-right m-t-20">
                                            <button
                                              type="button"
                                              onClick={() => this.navigateToTab(tabs.personalinformation)}
                                              className="btn btn-warning waves-effect waves-light m-r-10"
                                            >
                                              Back
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() => this.savePastExp()}
                                              className="btn btn-primary waves-effect waves-light m-r-10"
                                            >
                                              Next
                                            </button>
                                          </div>
                                        </div>
                                        <div className="col-sm-3">{/* <Spinner isLoading={this.props.pastExpLoading}/> */}</div>
                                      </div>
                                    </div>
                                  </div>

                                  <div
                                    className={"tab-pane  " + (this.state.activeTab === tabs.skills ? "active" : "")}
                                    id="skills"
                                    role="tabpanel"
                                  >
                                    <div className="container">
                                      <div className="form-material card-block">
                                        {this.state.employeeModel.skills.map((x, i) => {
                                          return (
                                            <div key={i} className="j-forms">
                                              <div className="row ">
                                                <div className="col-sm-9">
                                                  <div className="row ">
                                                    <div className="col-sm-6">
                                                      <div className="material-group">
                                                        <div className="material-addone">
                                                          <i className="icofont icofont-underline" />
                                                        </div>
                                                        <div className="form-group form-primary">
                                                          <input
                                                            type="text"
                                                            value={x.skill}
                                                            name="skill"
                                                            onChange={e => this.handleSkillInputChange(e, i)}
                                                            className="form-control"
                                                          />
                                                          <span className="form-bar" />
                                                          <label className="float-label">Skill</label>

                                                          <label className="float-label-validation">
                                                            {(this.state.skillValidationErrors[i] !== undefined &&
                                                              this.state.skillValidationErrors[i].skill) ||
                                                              validationMessages.EMPTY}
                                                          </label>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                      <div className="material-group">
                                                        <div className="material-addone">
                                                          <i className="icofont icofont-score-board" />
                                                        </div>
                                                        <div className="form-group form-primary">
                                                          <StarRatings
                                                            rating={x.level}
                                                            starRatedColor="#448aff"
                                                            starHoverColor="#ffe100"
                                                            // changeRating={this.changeRating}
                                                            changeRating={e => this.changeRating(e, i)}
                                                            numberOfStars={5}
                                                            starDimension="25px"
                                                            starSpacing="5px"
                                                            name="level"
                                                          />
                                                          <span className="form-bar" />
                                                          <label className="float-label">Skill Level</label>
                                                          <label className="float-label-validation">
                                                            {(this.state.skillValidationErrors[i] !== undefined &&
                                                              this.state.skillValidationErrors[i].level) ||
                                                              validationMessages.EMPTY}
                                                          </label>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>

                                                <div className="col-sm-3">
                                                  <div className="row">
                                                    <div className="clone-link cloneya-wrap">
                                                      <div className="toclone cloneya">
                                                        {this.state.employeeModel.skills.length !== 1 && (
                                                          <button
                                                            onClick={e => this.handleRemoveSkillClick(e, i)}
                                                            className="btn btn-default clone-btn-left delete m-r-10"
                                                          >
                                                            <i className="icofont icofont-minus" />
                                                          </button>
                                                        )}
                                                        {this.state.employeeModel.skills.length - 1 === i && (
                                                          <button
                                                            onClick={e => this.handleAddSkillClick()}
                                                            className=" btn btn-primary clone-btn-left clone"
                                                          >
                                                            <i className="icofont icofont-plus" />
                                                          </button>
                                                        )}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        })}

                                        <div className="row">
                                          <div className="col-sm-9">
                                            <div className="text-right m-t-20">
                                              <button
                                                type="button"
                                                onClick={tab => this.navigateToTab(tabs.pastExp)}
                                                className="btn btn-warning waves-effect waves-light m-r-10"
                                              >
                                                Back
                                              </button>

                                              <button
                                                type="button"
                                                onClick={() => this.saveSkills()}
                                                className="btn btn-primary waves-effect waves-light "
                                              >
                                                Submit
                                              </button>
                                            </div>
                                          </div>
                                          <div className="col-sm-3">
                                            {/* <Spinner isLoading={this.props.loading} /> */}
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
                      {/* <!-- Product edit card end --> */}
                    </div>
                  </div>
                  ;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //start handle personal information

  // handle dob
  handleDobChange(date) {
    let personalInformation = this.state.employeeModel;
    personalInformation.dob = date;
    this.setState({
      personalInformation
    });
    let errors = this.state.personalInfoValidationErrors;
    errors["dob"] = "";
    this.setState({
      personalInfoValidationErrors: errors
    });
  }

  handlePersonalInformationInputChange(e) {
    let personalInformation = this.state.employeeModel;
    personalInformation[e.target.name] = e.target.value;
    this.setState({
      personalInformation
    });
    this.removePersonalInformationValidation(e);
  }
  savePersonalInformation() {
    if (this.validatePersonalInformation()) {
      this.navigateToTab(tabs.pastExp);
    }
  }

  validatePersonalInformation() {
    let employee = this.state.employeeModel;
    let errors = {};
    let formIsValid = true;

    if (!employee["firstName"]) {
      formIsValid = false;
      errors["firstName"] = validationMessages.REQUIRED;
    }
    if (!employee["lastName"]) {
      formIsValid = false;
      errors["lastName"] = validationMessages.REQUIRED;
    }
    if (!employee["dob"]) {
      formIsValid = false;
      errors["dob"] = validationMessages.REQUIRED;
    }
    if (!employee["sex"]) {
      formIsValid = false;
      errors["sex"] = validationMessages.REQUIRED;
    }
    if (!employee["email"]) {
      formIsValid = false;
      errors["email"] = validationMessages.REQUIRED;
    } else if (!common.validateEmail(employee["email"])) {
      formIsValid = false;
      errors["email"] = validationMessages.EMAILFORMATREQUIRED;
    }
    this.setState({
      personalInfoValidationErrors: errors
    });
    return formIsValid;
  }
  // to clear employee validation
  removePersonalInformationValidation(e) {
    let self = this;
    const type = e.target.name;
    let employee = self.state.employeeModel;
    let errors = self.state.personalInfoValidationErrors;
    if (!employee[type]) {
      errors[type] = validationMessages.REQUIRED;
    } else {
      errors[type] = "";
    }
    this.setState({
      personalInfoValidationErrors: errors
    });
  }

  // #end region personal information

  // #region Start Region  For add more in experience

  handlePastExpInputChange(e, index) {
    const { name, value } = e.target;
    const list = this.state.employeeModel.experiences;
    list[index][name] = value;
    this.setState({
      list
    });
    this.removePastExperienceValidation(name, index);
  }

  handleFromDateChange(e, index) {
    const list = this.state.employeeModel.experiences;
    list[index]["fromDate"] = e;
    this.setState({
      list
    });
    this.removePastExperienceValidation("fromDate", index);
  }
  handleToDateChange(e, index) {
    const list = this.state.employeeModel.experiences;
    list[index]["toDate"] = e;
    this.setState({
      list
    });
    this.removePastExperienceValidation("toDate", index);
  }
  // handle rating change
  changeExpRating(e, index) {
    const list = this.state.employeeModel.experiences;
    list[index]["level"] = e;
    this.setState({
      list
    });
    this.removePastExperienceValidation("level", index);
  }
  // handle remove item
  handleRemovePastExpClick(e, index) {
    const list = this.state.employeeModel;
    list.experiences.splice(index, 1);
    this.setState({
      list
    });

    // Clear error item from error array
    var errors = this.state.experienceValidationErrors;
    errors.splice(index, 1);
    this.setState({ experienceValidationErrors: errors });
  }
  // handle add item
  handleAddPastExpClick() {
    const list = this.state.employeeModel;
    let obj = {
      company: "",
      level: 0,
      designation: "",
      fromDate: "",
      toDate: "",
      employeeId: this.state.employeeModel.employeeId
    };
    list.experiences.push(obj);
    this.setState({
      list
    });

    let index = this.state.employeeModel.experiences.length - 1;
    let errors = this.state.experienceValidationErrors;
    errors.push({ rowIndex: index, company: "", designation: "", fromDate: "", toDate: "", level: "" });
    this.setState({ experienceValidationErrors: errors });
  }

  // to validate past experience form
  validatePastExperiences() {
    let formIsValid = true;
    let experiences = this.state.employeeModel.experiences;
    let errors = [],
      index = 0;
    for (const experience of experiences) {
      let company = "",
        designation = "",
        fromDate = "",
        toDate = "",
        level = "";
      if (experience.company === "" || experience.company === undefined) {
        company = validationMessages.REQUIRED;
        formIsValid = false;
      }
      if (experience.designation === "" || experience.designation === undefined) {
        designation = validationMessages.REQUIRED;
        formIsValid = false;
      }
      if (experience.fromDate === "" || experience.fromDate === undefined) {
        fromDate = validationMessages.REQUIRED;
        formIsValid = false;
      }
      if (experience.toDate === "" || experience.toDate === undefined) {
        toDate = validationMessages.REQUIRED;
        formIsValid = false;
      }
      if (experience.level === 0) {
        level = validationMessages.REQUIRED;
        formIsValid = false;
      }
      if (
        experience.fromDate !== "" &&
        experience.fromDate !== undefined &&
        experience.toDate !== "" &&
        experience.toDate !== undefined
      ) {
        if (Date.parse(experience.fromDate) > Date.parse(experience.toDate)) {
          toDate = validationMessages.DATESHOULDBEGREATER;
          formIsValid = false;
        }
      }
      if (!formIsValid) {
        errors.push({
          rowIndex: index,
          company: company,
          designation: designation,
          fromDate: fromDate,
          toDate: toDate,
          level: level
        });
      } else {
        errors.push({ rowIndex: index, company: "", designation: "", fromDate: "", toDate: "", level: "" });
      }
      index++;
    }
    this.setState({ experienceValidationErrors: errors });
    return formIsValid;
  }
  // to clear experience validation
  removePastExperienceValidation(type, index) {
    let errors = this.state.experienceValidationErrors;
    let pastExp = this.state.employeeModel.experiences;
      if (errors[index] != undefined) {
      if (!pastExp[index][type]) {
        errors[index][type] = validationMessages.REQUIRED;
      } else {
        errors[index][type] = errors[index][type] === "level" ? 0 : "";
      }
    }
   

    this.setState({ experienceValidationErrors: errors });
  }

  savePastExp() {
    if (this.validatePastExperiences()) {
      this.navigateToTab(tabs.skills);
    }
  }
  // EndRegion  For add more in experience

  // #region Start Region  For add more in skills

  // handle input change
  handleSkillInputChange(e, index) {
    const { name, value } = e.target;
    const list = this.state.employeeModel.skills;
    list[index][name] = value;
    this.setState({
      list
    });

    this.removeSkillValidation(name, index);
  }
  // handle rating change
  changeRating(e, index) {
    const list = this.state.employeeModel.skills;
    list[index]["level"] = e;
    this.setState({
      list
    });
    this.removeSkillValidation("level", index);
  }

  // handle remove item
  handleRemoveSkillClick(e, index) {
    const list = this.state.employeeModel;
    list.skills.splice(index, 1);
    this.setState({
      list
    });
    // Clear error item from error array
    var errors = this.state.skillValidationErrors;
    errors.splice(index, 1);
    this.setState({ skillValidationErrors: errors });
  }
  // handle add item
  handleAddSkillClick() {
    const list = this.state.employeeModel;
    let obj = { skill: "", level: 0, employeeId: this.state.employeeModel.employeeId };
    list.skills.push(obj);
    this.setState({
      list
    });

    let index = this.state.employeeModel.skills.length - 1;
    let errors = this.state.skillValidationErrors;
    errors.push({ rowIndex: index, skill: "", level: "" });
    this.setState({ skillValidationErrors: errors });
  }
  // to validate skill form
  validateSkills() {
    let formIsValid = true;
    let skills = this.state.employeeModel.skills;
    let errors = [],
      index = 0;
    for (const sk of skills) {
      let skill = "",
        level = "";
      if (sk.skill === "" || sk.skill === null || sk.skill === undefined) {
        skill = validationMessages.REQUIRED;
        formIsValid = false;
      }
      if (sk.level === 0) {
        level = validationMessages.REQUIRED;
        formIsValid = false;
      }
      if (!formIsValid) {
        errors.push({
          rowIndex: index,
          skill: skill,
          level: level
        });
      } else {
        errors.push({ rowIndex: index, skill: "", level: "" });
      }
      index++;
    }
    this.setState({ skillValidationErrors: errors });
    return formIsValid;
  }

  // to clear skill validation
  removeSkillValidation(type, index) {
    let errors = this.state.skillValidationErrors;
    let skills = this.state.employeeModel.skills;
    if (errors[index] != undefined) {
    if (!skills[index][type]) {
      errors[index][type] = validationMessages.REQUIRED;
    } else {
      errors[index][type] = errors[index][type] === "level" ? 0 : "";
    }
  }

    this.setState({ skillValidationErrors: errors });
  }

  saveSkills() {
    if (this.validateSkills()) {
      if (this.state.employeeModel != null && this.state.employeeModel.employeeId !== 0) {
        this.props.updateEmployee(this.state.employeeModel, this.state.employeeModel.employeeId);
      } else {
        this.props.addEmployee(this.state.employeeModel);
      }
    }
  }
  // endregion  For add more in skills

  navigateToTab(tab) {
    this.setState({ activeTab: tab });
  }

  navigateToEmployeesList() {
    this.props.history.push("/employees");
  }
}

function mapStateToProps(state) {
  console.log("mapStateToProps - add.js", state);
  return {
    employeeModelResult: state.employeeReducer.employeeModelResult,
    loading: state.employeeReducer.loading,
    error: state.employeeReducer.error
  };
}
export default connect(
  mapStateToProps,
  { addEmployee, getEmployeeById, updateEmployee }
)(AddEmployee);
