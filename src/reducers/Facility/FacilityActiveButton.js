import { FACILITY_ACTIVE_BUTTONS } from "../../constants/ActionTypes";

const initial = {
  facilityActiveButtons: []
};

const FacilityActiveButton = (state = initial, action) => {
  switch (action.type) {
    case FACILITY_ACTIVE_BUTTONS:
      return {
        ...state,
        facilityActiveButtons: action.payload
      };
    default:
      return state;
  }
};

export default FacilityActiveButton;
