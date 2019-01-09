import {all} from 'redux-saga/effects';
import authSagas from './Auth';
import facilitySagas from './Facility';

export default function* rootSaga(getState) {
    yield all([
        authSagas(),
        facilitySagas()
    ]);
}
