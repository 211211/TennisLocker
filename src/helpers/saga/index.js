import {put, call} from 'redux-saga/effects'
import * as action from '../action'
import {REQUEST, SHOW_MESSAGE} from '../../constants/ActionTypes'

export function* sendRequest(apiFn, type, payload) {
  try {
      const requestAction = action.createRequestTypes(type);
      yield put(action.create(requestAction.START))
      const response = yield call(apiFn);
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
      }
  } catch (error) {
    yield put(action.create(
      requestAction.FAIL,
    ))
    yield put(action.create(
      SHOW_MESSAGE,
      error
    ))
  }
}