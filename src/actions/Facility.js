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

export const addSelectFacility = (id, active) => {
  const selectDate = { id, active };

  return {
    type: ADD_SELECT_FACILITY,
    activeDateSelect: selectDate,
    flagFilter: true
  }
}

export function activeFacilityArray(activeArray) {
  return {
    type: ACTIVE_FACILITY_ARRAY,
    activeFacilityArray: activeArray
  }
}

export function activeFacilityAddButtons(facilityActiveButtons) {
  return {
    type: FACILITY_ACTIVE_BUTTONS,
    facilityActiveButtons,
  }
}

export function activeFacilityRemoveButtons(facilityActiveButtons) {
  return {
    type: FACILITY_ACTIVE_BUTTONS,
    facilityActiveButtons,
  }
}
