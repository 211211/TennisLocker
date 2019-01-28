import {
  GET_MONTH_CALENDAR,
  GET_MONTH_CALENDAR_SUCCESS,
  GET_FILTER_EVENTtYPE,
  GET_FILTER_EVENTtYPE_SUCCESS,
} from '../constants/ActionTypes';

export const getMonthCalendar = ({year, month}) => {
  return {
      type: GET_MONTH_CALENDAR,
      payload: {
        year,
        month,
      }
  };
};

export const getMonthCalendarSuccess = (payload) => {
  return {
      type: GET_MONTH_CALENDAR_SUCCESS,
      payload,
  }
};

export const getFilterEventType = () => {
  return {
      type: GET_FILTER_EVENTtYPE,
  };
};

export const getFilterEventTypeSuccess = (payload) => {
  return {
      type: GET_FILTER_EVENTtYPE_SUCCESS,
      payload,
  }
};
