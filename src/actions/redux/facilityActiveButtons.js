import { FACILITY_ACTIVE_BUTTONS } from "../../constants/ActionTypes";

export function activeFacilityAddButtons(facilityActiveBtns) {
  return (dispatch, getState) => {
    let activeBtns = getState().facilityActiveButton.facilityActiveButtons;
    if (facilityActiveBtns.flag) {
      activeBtns.push(facilityActiveBtns.name);
    }
    dispatch({
      type: FACILITY_ACTIVE_BUTTONS,
      facilityActiveButtons: activeBtns
    });
  };
}

export function activeFacilityRemoveButtons(facilityActiveBtns) {
  return (dispatch, getState) => {
    let activeBtns = getState().facilityActiveButton.facilityActiveButtons;
    activeBtns = activeBtns.filter(function(btn) {
      return btn !== facilityActiveBtns.name;
    });
    dispatch({
      type: FACILITY_ACTIVE_BUTTONS,
      facilityActiveButtons: activeBtns
    });
  };
}
