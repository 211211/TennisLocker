import {
  GET_FACILITIES_TODAY_SUCCESS,
  GET_FACILITIES_SELECT_DATE_SUCCESS,
  ADD_FACILITIES_SELECT_DATE_SUCCESS,
  ADD_SELECT_FACILITY,
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

const FacilityFilter = (state = initial, action) => {
  switch (action.type) {
    case GET_FACILITIES_TODAY_SUCCESS:
      return {
        ...state,
        facilityDate: action.payload.facilityDate,
        flagFilter: action.payload.flagFilter
      };
    // case GET_FACILITIES_SELECT_DATE_SUCCESS:
    //   return {
    //     ...state,
    //     facilityDate: action.facilityDate,
    //     flagFilter: action.flagFilter
    //   };
    // case ADD_FACILITIES_SELECT_DATE_SUCCESS:
    //   return {
    //     ...state,
    //     activeDateSelect: action.activeDateSelect,
    //     flagFilter: action.flagFilter
    //   };
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

export default FacilityFilter;
