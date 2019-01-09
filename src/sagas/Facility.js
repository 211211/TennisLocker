import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
    GET_FACILITIES,
} from '../constants/ActionTypes';
import { showAuthMessage } from '../actions/Auth';
import { getFacilitiesSuccess } from '../actions/Facility';
import AxiosHelper from "../helpers/api/AxiosHelper";
import AuthHelper from "../helpers/AuthHelper";
import config from "../config";

const getAllFacilitiesRequest = async () => {
    return await AxiosHelper
        .get(`${config.baseUrl}/facility/all`)
        .then(AuthHelper.checkStatus)
        .then(response => response.data)
        .catch(error => error);
}

function* getAllFacilities() {
    try {
        const facilitiesResponse = yield call(getAllFacilitiesRequest);
        if (facilitiesResponse.error) {
            yield put(showAuthMessage(facilitiesResponse.error_description));
        } else {
            yield put(getFacilitiesSuccess(facilitiesResponse));
        }
    } catch (error) {
        yield put(showAuthMessage(error));
    }
}

export function* getFacilities() {
    yield takeEvery(GET_FACILITIES, getAllFacilities);
}

export default function* rootSaga() {
    yield all([
        fork(getFacilities),
    ]);
}
