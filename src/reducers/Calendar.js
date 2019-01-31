import {
  GET_MONTH_CALENDAR_SUCCESS,
  GET_FILTER_EVENT_TYPE_SUCCESS
} from '../constants/ActionTypes';

const initial = {
  eventForMonth: [],
  eventFilterTypes: []
};

const Calendar = (state = initial, action) => {
  const { data } = action;
  switch (action.type) {
    case GET_MONTH_CALENDAR_SUCCESS:
      return {
        ...state,
        eventForMonth: data
      };
    case GET_FILTER_EVENT_TYPE_SUCCESS:
      return {
        ...state,
        eventFilterTypes: data
      };
    default:
      return state;
  }
};
export default Calendar;
