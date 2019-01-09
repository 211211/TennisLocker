import {
GET_FACILITIES,
GET_FACILITIES_SUCCESS,
GET_FACILITIES_SELECT_DATE,
GET_FACILITIES_SELECT_DATE_SUCCESS,
GET_FACILITIES_TODAY,
GET_FACILITIES_TODAY_SUCCESS,
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

export const getFacilitiesSelectDate = () => {
  return {
      type: GET_FACILITIES_SELECT_DATE,
  };
};

export const getFacilitiesSelectDateSuccess = (facilities) => {
  return {
      type: GET_FACILITIES_SELECT_DATE_SUCCESS,
      payload: facilities
  }
};

export const getFacilitiesToday = () => {
  return {
      type: GET_FACILITIES_TODAY,
  };
};

export const getFacilitiesTodaySuccess = (facilities) => {
  return {
      type: GET_FACILITIES_TODAY_SUCCESS,
      payload: facilities
  }
};
