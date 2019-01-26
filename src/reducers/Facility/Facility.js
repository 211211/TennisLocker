import { GET_FACILITIES_SUCCESS } from '../../constants/ActionTypes';

const initial = {
  facilityArr: []
};

const Facility = (state = initial, action) => {
  switch (action.type) {
    case GET_FACILITIES_SUCCESS:
      return {
        ...state,
        facilityArr: action.payload
      };
    default:
      return state;
  }
};

export default Facility;
