import isEmpty from 'lodash/isEmpty'
import {
    ACTIVE_FACILITY_ARRAY,
    GET_FACILITIES_SELECT_DATE_SUCCESS,
    GET_FACILITIES_TODAY_SUCCESS,
} from '../../constants/ActionTypes';

const initial = {
    activeFacilityArray: []
};

const FacilityActive = (state = initial, action) => {
    switch (action.type) {
        case ACTIVE_FACILITY_ARRAY:
            return {
                ...state,
                activeFacilityArray: action.payload
            };
        case GET_FACILITIES_SELECT_DATE_SUCCESS:
            return {
                ...state,
                activeFacilityArray: action.payload.activeFacilityArray
            };
        case GET_FACILITIES_TODAY_SUCCESS:
            let newActiveFacilityArray = []
            state.activeFacilityArray.forEach((activeFacility) => {
                newActiveFacilityArray.push(action.payload.facilityDate.find(({ code }) => code === activeFacility.code))
            })

            if (isEmpty(newActiveFacilityArray)) {
                return state
            }

            return {
                ...state,
                activeFacilityArray: newActiveFacilityArray
            };
        default:
            return state;
    }
};

export default FacilityActive;
