import { ACTIVE_FACILITY_ARRAY } from "../../constants/ActionTypes";

export function activeFacilityArray(activeArray) {
  return dispatch => {
    dispatch({
      type: ACTIVE_FACILITY_ARRAY,
      activeFacilityArray: activeArray
    });
  };
}
