import { put, call } from 'redux-saga/effects'
import * as action from '../action'
import { REQUEST, SHOW_MESSAGE } from '../../constants/ActionTypes'

export function* sendRequest(apiFn, type, payload) {
    const requestAction = action.createRequestTypes(type)
    let error
    try {
        yield put(action.create(requestAction.START))
        const response = yield call(apiFn, payload)
        if (response.error) {
            yield put(action.create(
                requestAction.FAIL,
            ))
            yield put(action.create(
                SHOW_MESSAGE,
                response.error_description
            ))
            // yield put((response.error_description));
        } else {
            yield put(action.create(
                requestAction.SUCCESS,
                response
            ))
            return response
        }
    } catch (err) {
        yield put(action.create(
            requestAction.FAIL,
            err.response
        ))
        yield put(action.create(
            SHOW_MESSAGE,
            err
        ))
        error = err
    }
    if (error) {
        throw error
    }
}