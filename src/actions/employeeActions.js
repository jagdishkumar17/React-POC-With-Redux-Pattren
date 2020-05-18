import axios from "axios";
import history from '../components/utils/history';
// import { setActiveTab } from "./activeTabActions";
var root = "http://13.94.203.73:1103";


export const EMPLOYEE_BEGIN = "EMPLOYEE_BEGIN";
export const EMPLOYEE_SUCCESS = "EMPLOYEE_SUCCESS";
export const EMPLOYEE_FAILURE = "EMPLOYEE_FAILURE";
export const CLEAR = "CLEAR";

export function employeeBegin() {
  const action = {
    type: EMPLOYEE_BEGIN
  };
  return action;
}

export function employeeSuccess(employeeModel) {
  const action = {
    type: EMPLOYEE_SUCCESS,
    payload: { employeeModel }
  };
  return action;
}

export function employeeFailure(error) {
  const action = {
    type: EMPLOYEE_FAILURE,
    payload: { error }
  };
  return action;
}
export function employeeClear() {
  const action = {
    type: CLEAR
  };
  return action;
}

export function addEmployee(employeeModel) {
  return dispatch => {
    
    dispatch(employeeBegin());
    return axios
      .post(`${root}/api/employees`, employeeModel)
      .then(response => {
        dispatch(employeeSuccess(response.data));
      })
      .then(() => {
        dispatch(employeeClear());
      })
      .then(() => {
          history.push("/employees");
      })
      .catch(error => {
        
        dispatch(employeeFailure(error.message));
        dispatch(employeeClear());
      });
  };
}

export function updateEmployee(employeeModel, employeeId) {
  return dispatch => {
    dispatch(employeeBegin());
    return axios
      .put(`${root}/api/employees/${employeeId}`, employeeModel)
      .then(response => {
        dispatch(employeeSuccess(response.data));
      })
      .then(() => {
        dispatch(employeeClear());
      })
      .then(() => {
       history.push("/employees");
      })
      .catch(error => {
        
        dispatch(employeeFailure(error.message));
        dispatch(employeeClear());
      });
  };
}
export function getEmployeeById(employeeId) {
  return dispatch => {
    dispatch(employeeBegin());
    return axios
      .get(`${root}/api/employees/${employeeId}`)
      .then(response => {
        dispatch(employeeSuccess(response.data));
      })
      .then(() => {
        dispatch(employeeClear());
      })
      .catch(error => {
        
        dispatch(employeeFailure(error.message));
        dispatch(employeeClear());
      });
  };
}
  
  export function getEmployees(page, pageSize, isAsc, OrderBy) {
    return dispatch => {
      dispatch(employeeBegin());
      return axios
        .get(`${root}/api/employees/${page}/${pageSize}/${isAsc}/${OrderBy}`)
        .then(response => {
          dispatch(employeeSuccess(response.data));
        })
        .then(() => {
          dispatch(employeeClear());
        })
        .catch(error => {
          
          dispatch(employeeFailure(error.message));
          dispatch(employeeClear());
        });
    };
}
