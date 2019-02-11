import {
    GET_MONTH_CALENDAR_SUCCESS,
    GET_FILTER_EVENT_TYPE_SUCCESS
} from '../constants/ActionTypes';

const initial = {
    eventForMonth: [],
    eventFilterTypes: []
};

const Calendar = (state = initial, action) => {
    const { payload, type } = action;
    switch (type) {
        case GET_MONTH_CALENDAR_SUCCESS:
            return {
                ...state,
                eventForMonth: payload
            };
        case GET_FILTER_EVENT_TYPE_SUCCESS:
            console.log('payload: ', payload)
            return {
                ...state,
                eventFilterTypes: payload
            };
        default:
            return state;
    }
};
export default Calendar;
