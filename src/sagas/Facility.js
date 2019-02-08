import { all, call, fork, put, select, takeEvery, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux'
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
import { sendRequest } from '../helpers/saga';
import ColorHelper from '../helpers/colorDashboardSelect';
import DashboardSplitFilter from '../helpers/dashboardSplitFilter';
import config from '../config';

export const selectorFacilityActiveButtons = ({ facilityActiveButton }) => facilityActiveButton.facilityActiveButtons;


const getAllFacilitiesSelectDate = async(payload) => {
    const activeFacilityArray = []
    const { id, startDay, endDay, activeButtons } = payload
    const url = `${config.baseUrl}/analytics/metricsByDate/facility/${id}/${startDay}/${endDay}`
    
    return await Api
        .get({ url })
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
}

function* requestGetAllFacilitiesSelectDate({ payload }) {
    const activeButtons = yield select(selectorFacilityActiveButtons)
    payload = {
        ...payload,
        activeButtons
    }
    yield call(sendRequest, getAllFacilitiesSelectDate, GET_FACILITIES_SELECT_DATE, payload)
    
}

const getFacilities = async() => {
    const url = `${config.baseUrl}/facility/all`
    return await Api.get({ url })
                .then(response => response.data)
}
function* requestGetFacilities() {
    yield call(sendRequest, getFacilities, GET_FACILITIES)
}

const getFacilitiesToday = async (payload) => {
    const url = `${config.baseUrl}/analytics/metrics/facility/${payload.id}`;
    return await Api.get({ url })
        .then(ColorHelper.colorButtons)
        .then(DashboardSplitFilter.split)
        .then(DashboardSplitFilter.filterAll)
        .then(response => {
            response.data.map(function (btn) {
                btn.activeFlag = payload.activeButtons.indexOf(btn.name) !== -1 ? true : false;
            });

            return response;
        })
        .then(response => ({ facilityDate: response.data, flagFilter: false }))
}

function* requestGetFacilitiesToday({ payload }) {
    const activeButtons = yield select(selectorFacilityActiveButtons);
    
    payload = {
        ...payload,
        activeButtons
    }
    yield call(sendRequest, getFacilitiesToday, GET_FACILITIES_TODAY, payload)
}

export function* watchFacilities() {
    yield takeEvery(GET_FACILITIES, requestGetFacilities);
    yield takeEvery(GET_FACILITIES_TODAY, requestGetFacilitiesToday);
    yield takeEvery(GET_FACILITIES_SELECT_DATE, requestGetAllFacilitiesSelectDate);
}

export default function* watch() {
    yield fork(watchFacilities)
}
