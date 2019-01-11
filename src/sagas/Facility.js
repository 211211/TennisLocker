import { all, call, fork, put, select, takeEvery } from "redux-saga/effects";
import {
    GET_FACILITIES,
    GET_FACILITIES_TODAY,
    GET_FACILITIES_SELECT_DATE,
} from "../constants/ActionTypes";
import { showAuthMessage } from "../actions/Auth";
import {
    getFacilitiesSuccess,
    getFacilitiesTodaySuccess,
    getFacilitiesSelectDateSuccess,
} from "../actions/Facility";
import AxiosHelper from "../helpers/api/AxiosHelper";
import AuthHelper from "../helpers/AuthHelper";
import ColorHelper from "../helpers/colorDashboardSelect";
import DashboardSplitFilter from "../helpers/dashboardSplitFilter";
import config from "../config";

const getAllFacilitiesRequest = async () => {
    return await AxiosHelper.get(`${config.baseUrl}/facility/all`)
        .then(AuthHelper.checkStatus)
        .then(response => response.data)
        .catch(error => error);
};

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

const getAllFacilitiesTodayRequest = async (id, activeButtons = []) => {
    return await AxiosHelper.get(
        `${config.baseUrl}/analytics/metrics/facility/${id}`
    )
        .then(AuthHelper.checkStatus)
        .then(ColorHelper.colorButtons)
        .then(DashboardSplitFilter.split)
        .then(DashboardSplitFilter.filterAll)
        .then(response => {
            response.data.map(function (btn) {
                btn.activeFlag = activeButtons.indexOf(btn.name) !== -1 ? true : false;
            });

            return response;
        })
        .then(response => response.data)
        .catch(error => error);
};

export const selectorFacilityActiveButtons = ({ facilityActiveButton }) => facilityActiveButton.facilityActiveButtons;

function* getAllFacilitiesToday({ payload }) {
    try {
        const { id } = payload;
        const activeButtons = yield select(selectorFacilityActiveButtons);
        const response = yield call(getAllFacilitiesTodayRequest, id, activeButtons);
        if (response.error) {
            yield put(showAuthMessage(response.error_description));
        } else {
            yield put(getFacilitiesTodaySuccess({ facilityDate: response, flagFilter: false }));
        }
    } catch (error) {
        yield put(showAuthMessage(error));
    }
}

const getAllFacilitiesSelectDateRequest = async (id, startDate, endDate) => {
    return await AxiosHelper.get(
        `${config.baseUrl}/analytics/metrics/facility/${id}/${startDate}/${endDate}`
            .then(AuthHelper.checkStatus)
            .then(ColorHelper.colorButtons)
            .then(DashboardSplitFilter.split)
            .then(DashboardSplitFilter.filterAll)
            .then(response => response.data)
            .catch(error => error)
    )
};

function* getAllFacilitiesSelectDate({ payload }) {
    try {
        const { id, startDate, endDate } = payload;
        const activeButtons = yield select(selectorFacilityActiveButtons);
        const activeFacilityArray = []
        let response = yield call(getAllFacilitiesSelectDateRequest, id, startDate, endDate);

        if (response.error) {
            yield put(showAuthMessage(response.error_description));
        } else {
            response = response.map(btn => {
                if (activeButtons.indexOf(btn.name) !== -1) {
                    btn.activeFlag = true;
                    activeFacilityArray.push(btn);
                } else {
                    btn.activeFlag = false;
                }
            });

            yield put(getFacilitiesSelectDateSuccess({
                facilityDate: response,
                flagFilter: false,
                activeFacilityArray,
            }));
        }
    } catch (error) {
        yield put(showAuthMessage(error));
    }
}

export function* getFacilities() {
    yield takeEvery(GET_FACILITIES, getAllFacilities);
}

export function* getFacilitiesToday() {
    yield takeEvery(GET_FACILITIES_TODAY, getAllFacilitiesToday);
}

export function* getFacilitiesSelectDate() {
    yield takeEvery(GET_FACILITIES_SELECT_DATE, getAllFacilitiesSelectDate);
}

export default function* rootSaga() {
    yield all([
        fork(getFacilities),
        fork(getFacilitiesToday),
        fork(getFacilitiesSelectDate),
    ]);
}
