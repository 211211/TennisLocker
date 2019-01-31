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
import {sendRequest} from '../helpers/saga';
import {makeSelectFacilityFilterActive} from '../selectors/Facility/FacilityFilterSelector'

// TODO: switch to new api
function* requestGetFilterEventType() {
    const url = `${config.hrefUrl}lookups/eventTypes/external/${config.token}`
    const request = sendRequest.bind(
        null, 
        async () => {
            return await Api.get({url})
                  .then(response => response.data)
                  .catch(error => error);
        }, 
        GET_FILTER_EVENT_TYPE
    );
    yield call(request)
};

function* requestGetMonthCalendar({payload}) {
    const {year, month} = payload;
    const facilityActive = yield select(makeSelectFacilityFilterActive());
    const url = `${config.baseUrl}/events/facility/${facilityActive.id}/${year}/${month + 1}`;
    const request = sendRequest.bind(
        null, 
        async () => {
            return await Api.get({url})
                  .then(response => response.data)
                  .catch(error => error);
        }, 
        GET_MONTH_CALENDAR
    )
    yield call(request)
}

export function* getMonthCalendarSaga() {
    yield takeEvery(GET_MONTH_CALENDAR, requestGetMonthCalendar);
}

export function* getFilterEventTypeSaga() {
    yield takeEvery(GET_FILTER_EVENT_TYPE, requestGetFilterEventType);
}

export default function* rootSaga() {
    yield all([
        fork(getMonthCalendarSaga),
        fork(getFilterEventTypeSaga),
    ]);
}
