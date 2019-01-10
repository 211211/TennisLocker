import {
GET_FACILITIES,
GET_FACILITIES_SUCCESS,
GET_FACILITIES_SELECT_DATE,
GET_FACILITIES_SELECT_DATE_SUCCESS,
GET_FACILITIES_TODAY,
GET_FACILITIES_TODAY_SUCCESS,
ADD_SELECT_FACILITY,
ACTIVE_FACILITY_ARRAY,
FACILITY_ACTIVE_BUTTONS,
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

export const getFacilitiesSelectDateSuccess = (payload) => {
  return {
      type: GET_FACILITIES_SELECT_DATE_SUCCESS,
      payload,
  }
};

export const userGetFacilitiesToday = (id) => {
  return {
      type: GET_FACILITIES_TODAY,
      payload: {
        id,
      }
  };
};

export const getFacilitiesTodaySuccess = (payload) => {
  return {
      type: GET_FACILITIES_TODAY_SUCCESS,
      payload,
  }
};

export const addSelectFacility = (id, active) => {
  const selectDate = { id, active };

  return {
    type: ADD_SELECT_FACILITY,
    activeDateSelect: selectDate,
    flagFilter: true
  }
}

export function activeFacilityArray(payload) {
  return {
    type: ACTIVE_FACILITY_ARRAY,
    payload,
  }
}

export function activeFacilityAddButtons(payload) {
  return {
    type: FACILITY_ACTIVE_BUTTONS,
    payload,
  }
}

export function activeFacilityRemoveButtons(payload) {
  return {
    type: FACILITY_ACTIVE_BUTTONS,
    payload,
  }
}
