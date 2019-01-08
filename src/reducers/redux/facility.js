import { GET_FACILITY_ALL } from "../../constants/ActionTypes";

const initial = {
  facilityArr: []
};

const facility = (state = initial, action) => {
  // const { data } = action;
  switch (action.type) {
    case GET_FACILITY_ALL:
      return {
        ...state,
        facilityArr: action.facilityArr
      };
    default:
      return state;
  }
};
export default facility;
