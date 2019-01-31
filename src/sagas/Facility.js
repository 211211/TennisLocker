import { all, call, fork, put, select, takeEvery, take, cancel } from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux'
import {
    GET_FACILITIES,
    GET_FACILITIES_TODAY,
    GET_FACILITIES_SELECT_DATE,
} from '../constants/ActionTypes';
import { showAuthMessage } from '../actions/Auth';
import {
    getFacilitiesSuccess,
    getFacilitiesTodaySuccess,
    getFacilitiesSelectDateSuccess,
} from '../actions/Facility';
import Api from '../helpers/api';
import {sendRequest} from '../helpers/saga';
import ColorHelper from '../helpers/colorDashboardSelect';
import DashboardSplitFilter from '../helpers/dashboardSplitFilter';
import config from '../config';

export const selectorFacilityActiveButtons = ({ facilityActiveButton }) => facilityActiveButton.facilityActiveButtons;

function* requestGetAllFacilitiesSelectDate({ payload }) {
    const { id, startDay, endDay } = payload;
    const activeButtons = yield select(selectorFacilityActiveButtons);
    const url = `${config.baseUrl}/analytics/metricsByDate/facility/${id}/${startDay}/${endDay}`
    const request = sendRequest.bind(
        null, 
        async () => {
            const activeFacilityArray = [];
            return await Api
                .get({url})
                .then(ColorHelper.colorButtons)
                .then(DashboardSplitFilter.split)
                .then(DashboardSplitFilter.filterAll)
                .then(response => response.data)
                .then(data => {
                    data.forEach(btn => {
                        if (activeButtons.indexOf(btn.name) !== -1) {
                            btn.activeFlag = true;
                            activeFacilityArray.push(btn);
                        } else {
                            btn.activeFlag = false;
                        }
                    })
                    return data;
                })
                .then(data => ({
                    facilityDate: data,
                    flagFilter: false,
                    activeFacilityArray
                }))
                .catch(error => error);
        },
        GET_FACILITIES_SELECT_DATE
    );
    yield call(request)
}

function* requestGetFacilities() {
    const url = `${config.baseUrl}/facility/all`;
    const request = sendRequest.bind(
        null, 
        async () => {
            return await Api.get({url})
                  .then(response => response.data)
                  .catch(error => error);
        }, 
        GET_FACILITIES
    )
    yield call(request)
}

function* requestGetFacilitiesToday({payload}) {
    const { id } = payload;
    const activeButtons = yield select(selectorFacilityActiveButtons);
    const url = `${config.baseUrl}/analytics/metrics/facility/${id}`;
    const request = sendRequest.bind(
        null, 
        async () => {
            return await Api.get({url})
                .then(ColorHelper.colorButtons)
                .then(DashboardSplitFilter.split)
                .then(DashboardSplitFilter.filterAll)
                .then(response => {
                    response.data.map(function (btn) {
                        btn.activeFlag = activeButtons.indexOf(btn.name) !== -1 ? true : false;
                    });
        
                    return response;
                })
                .then(response => ({facilityDate: response.data, flagFilter: false}))
                .catch(error => error);
        }, 
        GET_FACILITIES_TODAY
    )

    yield call(request)
}

export function* getFacilities() {
    yield takeEvery(GET_FACILITIES, requestGetFacilities);
}

export function* getFacilitiesToday() {
    yield takeEvery(GET_FACILITIES_TODAY, requestGetFacilitiesToday);
}

export function* getFacilitiesSelectDate() {
    yield takeEvery(GET_FACILITIES_SELECT_DATE, requestGetAllFacilitiesSelectDate);
}

export default function* rootSaga() {
    yield all([
        fork(getFacilities),
        fork(getFacilitiesToday),
        fork(getFacilitiesSelectDate),
    ]);
}
