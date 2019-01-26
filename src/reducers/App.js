import {
    GET_FACILITIES_TODAY,
    GET_FACILITIES_TODAY_SUCCESS,
    GET_FACILITIES,
    GET_FACILITIES_SUCCESS,
    GET_FACILITIES_SELECT_DATE,
    GET_FACILITIES_SELECT_DATE_SUCCESS,
} from '../constants/ActionTypes';

const INIT_STATE = {
    loading: false,
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_FACILITIES:
        case GET_FACILITIES_TODAY:
        case GET_FACILITIES_SELECT_DATE: {
            return {
                ...state,
                loading: true,
            }
        }
        case GET_FACILITIES_SELECT_DATE_SUCCESS:
        case GET_FACILITIES_TODAY_SUCCESS:
        case GET_FACILITIES_SUCCESS: {
            return {
                ...state,
                loading: false,
            }
        }
        default:
            return state;
    }
}
