import { all, call, fork, put, takeEvery, select } from 'redux-saga/effects';

// ACTION TYPES
import {
    GET_MONTH_CALENDAR,
    GET_FILTER_EVENT_TYPE
} from '../constants/ActionTypes';

// AUTH MESSAGE
import { showAuthMessage } from '../actions/Auth';

// CALENDAR SUCCESS ACTION
import {
    getMonthCalendarSuccess,
    getFilterEventTypeSuccess,
} from '../actions/Calendar';

// HELPER
import Api from '../helpers/api';
import config from '../config';
import { sendRequest } from '../helpers/saga';
import { makeSelectFacilityFilterActive } from '../selectors/Facility/FacilityFilterSelector'

const getFilterEventType = async(payload) => {
    const url = `${config.baseUrl}/lookups/eventTypes/facility/${payload.facilityActive.id}`
    return await Api.get({ url })
                .then(response => response.data)
}

function* requestGetFilterEventType() {
    const facilityActive = yield select(makeSelectFacilityFilterActive());
    const payload = {
        facilityActive,
    };
    try {
        yield call(sendRequest, getFilterEventType, GET_FILTER_EVENT_TYPE, payload);
    } catch (error) {
        console.log(error)
    }
};

const getMonthCalendar = async(payload) => {
    const { year, month, facilityActive } = payload;
    const url = `${config.baseUrl}/events/facility/${facilityActive.id}/${year}/${month + 1}`;

    return await Api.get({ url })
                .then(response => response.data)
}

function* requestGetMonthCalendar({ payload }) {
    const facilityActive = yield select(makeSelectFacilityFilterActive());
    payload = {
        ...payload,
        facilityActive,
    };
    try {
        yield call(sendRequest, getMonthCalendar, GET_MONTH_CALENDAR, payload);
    } catch (error) {
        console.log(error)
    }
}

export function* watchCalendar() {
    yield takeEvery(GET_FILTER_EVENT_TYPE, requestGetFilterEventType);
    yield takeEvery(GET_MONTH_CALENDAR, requestGetMonthCalendar);
}

export default function* rootSaga() {
    yield fork(watchCalendar);
}
