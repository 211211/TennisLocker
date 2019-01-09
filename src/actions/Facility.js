import {
GET_FACILITIES,
GET_FACILITIES_SUCCESS,
// GET_FACILITIES_SELECT_DATE,
// ADD_FACILITIES_SELECT_DATE,
} from '../constants/ActionTypes';

export const getFacilities = () => {
  return {
      type: GET_FACILITIES,
  };
};

export const getFacilitiesSuccess = (facilities) => {
  return {
      type: GET_FACILITIES_SUCCESS,
      payload: facilities
  }
};
