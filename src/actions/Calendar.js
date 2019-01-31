import {
  GET_MONTH_CALENDAR,
  GET_MONTH_CALENDAR_SUCCESS,
  GET_FILTER_EVENT_TYPE,
  GET_FILTER_EVENT_TYPE_SUCCESS,
} from '../constants/ActionTypes';
import * as action from '../helpers/action'

export function getMonthCalendar(year, month) {
  return action.create(
    GET_MONTH_CALENDAR,
    {
      year,
      month,
    }
  )
}

export const getMonthCalendarSuccess = (payload) => {
  return {
      type: GET_MONTH_CALENDAR_SUCCESS,
      payload,
  }
};

export const getFilterEventType = () => {
  return {
      type: GET_FILTER_EVENT_TYPE,
  };
};

export const getFilterEventTypeSuccess = (payload) => {
  return {
      type: GET_FILTER_EVENT_TYPE_SUCCESS,
      payload,
  }
};
