import { ACTIVE_TAB } from "../actions/activeTabActions";
// import { tabs } from "../components/utils/tabs";

const initialState = {
  currentTab: null
};
export default function activeTabReducer(state = initialState, action) {
  
  switch (action.type) {
    case ACTIVE_TAB:
      return {
        
        ...state,
        currentTab: action.payload.tab
      };
    default:
      return state;
  }
}
