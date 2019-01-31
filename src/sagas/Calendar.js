import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

// ACTION TYPES
import {
    GET_MONTH_CALENDAR,
    GET_FILTER_EVENTtYPE,
} from '../constants/ActionTypes';

// AUTH MESSAGE
import { showAuthMessage } from '../actions/Auth';

// CALENDAR SUCCESS ACTION
import {
    getMonthCalendarSuccess,
    getFilterEventTypeSuccess,
} from '../actions/Calendar';

// HELPER
import AxiosHelper from '../helpers/api/AxiosHelper';
import AuthHelper from '../helpers/AuthHelper';
import config from '../config';

// TODO: switch to new api
const getMonthCalendarRequest = async (year, month) => {
  return await AxiosHelper.get(
    `${config.hrefUrl}events/external/${config.token}/${year}/${month + 1}`
  )
    .then(AuthHelper.checkStatus)
    .then(response => response.data)
    .catch(error => error);
};

// TODO: switch to new api
const getFilterEventTypeRequest = async () => {
    return await AxiosHelper.get(`${config.hrefUrl}lookups/eventTypes/external/${config.token}`)
        .then(AuthHelper.checkStatus)
        .then(response => response.data)
        .catch(error => error);
};

function* getMonthCalendarGenerator({ payload }) {
    try {
        const { year, month } = payload;
        const response = yield call(getMonthCalendarRequest, year, month);
        if (response.error) {
            yield put(showAuthMessage(response.error_description));
        } else {
            yield put(getMonthCalendarSuccess(response));
        }
    } catch (error) {
        yield put(showAuthMessage(error));
    }
}

function* getFilterEventTypeGenerator() {
    try {
        const response = yield call(getFilterEventTypeRequest);
        if (response.error) {
            yield put(showAuthMessage(response.error_description));
        } else {
            yield put(getFilterEventTypeSuccess(response));
        }
    } catch (error) {
        yield put(showAuthMessage(error));
    }
}

export function* getMonthCalendarSaga() {
    yield takeEvery(GET_MONTH_CALENDAR, getMonthCalendarGenerator);
}

export function* getFilterEventTypeSaga() {
    yield takeEvery(GET_FILTER_EVENTtYPE, getFilterEventTypeGenerator);
}

export default function* rootSaga() {
    yield all([
        fork(getMonthCalendarSaga),
        fork(getFilterEventTypeSaga),
    ]);
}
