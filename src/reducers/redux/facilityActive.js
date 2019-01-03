import {
  ACTIVE_FACILITY_ARRAY,
  GET_FACILITY_SELECT_DATE
} from "../../constants/ActionTypes";

const initial = {
  activeFacilityArray: []
};

const facilityActive = (state = initial, action) => {
  // const { data } = action;
  switch (action.type) {
    case ACTIVE_FACILITY_ARRAY:
      return {
        ...state,
        activeFacilityArray: action.activeFacilityArray
      };
    case GET_FACILITY_SELECT_DATE:
      console.log(action);
      return {
        ...state,
        activeFacilityArray: action.activeFacilityArray
      };
    default:
      return state;
  }
};
export default facilityActive;
