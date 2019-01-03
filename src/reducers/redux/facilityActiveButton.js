import { FACILITY_ACTIVE_BUTTONS } from "../../constants/ActionTypes";

const initial = {
  facilityActiveButtons: []
};

const facilityActiveButtons = (state = initial, action) => {
  // const { data } = action;
  switch (action.type) {
    case FACILITY_ACTIVE_BUTTONS:
      return {
        ...state,
        facilityActiveButtons: action.facilityActiveButtons
      };
    default:
      return state;
  }
};
export default facilityActiveButtons;
