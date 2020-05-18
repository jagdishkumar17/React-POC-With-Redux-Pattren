import React, { Component } from "react";
 import {appendScript} from '../utils/AppendScript';
// import {removeScript} from '../utils/RemoveScript';
import {Router, Switch, Route, Redirect, withRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
//CSS
import "../../styles/bootstrap.min.css";
import "../../styles/waves.min.css";
import "../../styles/themify-icons/themify-icons.css";
import "../../styles/icofont/css/icofont.css";
import "../../styles/font-awesome/css/font-awesome.min.css";
import "../../styles/style.css";
import "../../styles/pcoded-horizontal.min.css";
import 'react-toastify/dist/ReactToastify.min.css';


// Components
// import AppStartLoader from "../shared/AppStartLoader";
import Header from "../shared/Header";
import Navigation from "../shared/Navigation";
import Dashboard from "../esm/Dashboard";
import EmployeesList from "../esm/EmployeesList";
import AddEmployee from "../esm/AddEmployee";
import EmployeeDetail from "../esm/EmployeeDetail";
import history from '../utils/history';

class Wrapper extends Component {
  render() {
    return (
      // <HashRouter>
      <Router history={history}>
        <div>
          {/* <AppStartLoader /> */}
          <div id="pcoded" className="pcoded">
            <div className="pcoded-container">
              {/* Header area */}
              <Header />
              <div className="pcoded-main-container">
                {/* Navigation area */}
                <Navigation />
                <Switch>
                  {/* BASE  ROUTES  */}
                  <Route exact path="/">
                    <Redirect to="/dashboard" />
                  </Route>
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/employees" component={EmployeesList} />
                  <Route exact path="/employee/add" component={AddEmployee} />
                  <Route exact path="/employee/:id" component={EmployeeDetail} />
                  <Route exact path="/employee/edit/:id" component={AddEmployee} />
                
                </Switch>
                <ToastContainer autoClose={5000} />
              </div>
            </div>
          </div>
        </div>
      {/* </HashRouter> */}
      </Router>
    );
  }

  componentDidMount() {
    //  appendScript("jquery/dist/jquery.min.js");
    // // appendScript("../../js/jquery-ui.min.js");
    // appendScript("popper.js/dist/popper.min.js");
    // appendScript("bootstrap/dist/js/bootstrap.min.js");
    // appendScript("../../js/pcoded.min.js");
    // appendScript("../../js/menu-hori-fixed.js");
    // appendScript("../../js/script.js");
  }
  // componentDidUnmount () {
  //   removeScript("../../js/jquery.min.js");
  //   removeScript("../../js/jquery-ui.min.js");
  //   removeScript("../../js/popper.min.js");
  //   removeScript("../../js/bootstrap.min.js");
  //   removeScript("../../js/pcoded.min.js");
  //   removeScript("../../js/menu-hori-fixed.js");
  //   removeScript("../../js/script.js");
  // }
}

export default withRouter(Wrapper);
