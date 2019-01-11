import {
    GET_FACILITIES_TODAY_SUCCESS,
    GET_FACILITIES_SELECT_DATE_SUCCESS,
    ADD_FACILITY_SELECT_DATE_SUCCESS,
    ADD_SELECT_FACILITY,
    ADD_FACILITY_SELECT_DATE
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
        case GET_FACILITIES_SELECT_DATE_SUCCESS:
            return {
                ...state,
                facilityDate: action.payload.facilityDate,
                flagFilter: action.payload.flagFilter
            };
        case ADD_FACILITY_SELECT_DATE_SUCCESS:
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
        case ADD_FACILITY_SELECT_DATE:
            const { activeDateSelect, flagFilter } = action.payload;
            return {
                ...state,
                activeDateSelect,
                flagFilter
            };
        default:
            return state;
    }
};

export default FacilityFilter;
