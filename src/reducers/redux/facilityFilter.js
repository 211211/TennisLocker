import {
  GET_FACILITY_TODAY,
  GET_FACILITY_SELECT_DATE,
  ADD_FACILITY_SELECT_DATE,
  ADD_SELECT_FACILITY
} from "../../constants/ActionTypes";

const initial = {
  facilityDate: [],
  activeDateSelect: null,
  facilityActive: {
    id: null,
    active: {}
  },
  flagFilter: false
};

const facilityFilter = (state = initial, action) => {
  // const { data } = action;
  switch (action.type) {
    case GET_FACILITY_TODAY:
      return {
        ...state,
        facilityDate: action.facilityDate,
        flagFilter: action.flagFilter
      };
    case GET_FACILITY_SELECT_DATE:
      return {
        ...state,
        facilityDate: action.facilityDate,
        flagFilter: action.flagFilter
      };
    case ADD_FACILITY_SELECT_DATE:
      return {
        ...state,
        activeDateSelect: action.activeDateSelect,
        flagFilter: action.flagFilter
      };
    case ADD_SELECT_FACILITY:
      return {
        ...state,
        facilityActive: action.activeDateSelect,
        flagFilter: action.flagFilter
      };
    default:
      return state;
  }
};
export default facilityFilter;
