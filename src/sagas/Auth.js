import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
    SIGNIN_USER,
    SIGNOUT_USER,
} from '../constants/ActionTypes';
import { showAuthMessage, userSignInSuccess, userSignOutSuccess } from '../actions/Auth';
import AxiosHelper from "../helpers/api/AxiosHelper";
import AuthHelper from "../helpers/AuthHelper";
import config from "../config";

const generateHashedAuthObject = (email, password) => {
    let formBody = [];
    const data = {
        username: email,
        password: password,
        grant_type: "password",
        client_id: "mobile"
    }

    for (let property in data) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(data[property]);

        formBody.push(encodedKey + "=" + encodedValue);
    }

    return formBody.join("&");
}

const signInUserWithEmailPasswordRequest = async (email, password) => {
    const formBody = generateHashedAuthObject(email, password)
    return await AxiosHelper
        .post(`${config.baseUrl}/oauth/token`, formBody.toString())
        .then(AuthHelper.checkStatus)
        .then(AuthHelper.saveToken)
        .then(response => response.data)
}

const signOutRequest = async () => {
    try {
        return await AuthHelper.removeToken()
    } catch (error) {
        return error
    }
}

function* signInUserWithEmailPassword ({payload}) {
    try {
        const { email, password } = payload;
        const signInUser = yield call (signInUserWithEmailPasswordRequest, email, password);
        yield put (userSignInSuccess (signInUser));
        // if (signInUser && signInUser.error) {
        //     yield put (showAuthMessage (signInUser.error_description));
        // } else {
        //     yield put (userSignInSuccess (signInUser));
        // }
    } catch (error) {
        yield put (showAuthMessage ('Invalid email or password. Please try again!'));
    }
}

function* signOut () {
    try {
        const signOutUser = yield call (signOutRequest);
        yield put (userSignOutSuccess ());
        // if (signInUser.error) {
        //     yield put (showAuthMessage (signInUser.error_description));
        // } else {
        //     yield put (userSignOutSuccess ());
        // }
    } catch (error) {
        yield put (showAuthMessage (error));
    }
}

export function* signInUser () {
    yield takeEvery (SIGNIN_USER, signInUserWithEmailPassword);
}

export function* signOutUser () {
    yield takeEvery (SIGNOUT_USER, signOut);
}

export default function* rootSaga () {
    yield all ([fork (signInUser),
        fork (signOutUser)]);
}