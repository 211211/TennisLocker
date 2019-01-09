import {
  ACTIVE_FACILITY_ARRAY,
  GET_FACILITIES_SELECT_DATE_SUCCESS
} from "../../constants/ActionTypes";

const initial = {
  activeFacilityArray: []
};

const FacilityActive = (state = initial, action) => {
  switch (action.type) {
    case ACTIVE_FACILITY_ARRAY:
      return {
        ...state,
        activeFacilityArray: action.payload
      };
    case GET_FACILITIES_SELECT_DATE_SUCCESS:
      return {
        ...state,
        activeFacilityArray: action.payload
      };
    default:
      return state;
  }
};
export default FacilityActive;
