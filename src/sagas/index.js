import {all} from 'redux-saga/effects';
import authSagas from './Auth';
import facilitySagas from './Facility';
import calendarSagas from './Calendar';

export default function* rootSaga(getState) {
    yield all([
        authSagas(),
        facilitySagas(),
        calendarSagas()
    ]);
}
