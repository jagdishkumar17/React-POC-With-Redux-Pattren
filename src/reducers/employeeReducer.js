import { EMPLOYEE_BEGIN, EMPLOYEE_SUCCESS, EMPLOYEE_FAILURE, CLEAR } from "../actions/employeeActions";
const initialState ={
employeeModelResult : null,
loading: false,
error: null
};
export default function employeeReducer(state = initialState, action) {
    
  switch (action.type) {
    case EMPLOYEE_BEGIN:
    return {
        ...state,
        loading: true,
        error: null
      };

    case EMPLOYEE_SUCCESS:

    return {
        ...state,
        loading: false,
        employeeModelResult: action.payload.employeeModel
      };

    case EMPLOYEE_FAILURE:
    
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        employeeModelResult: null
      };

      case CLEAR:
    
      return {
        ...state,
        loading: false,
        error: null,
        employeeModelResult: null
      };

    default:
      return state;
  }
}
