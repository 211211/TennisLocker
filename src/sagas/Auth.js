import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
    SIGNIN_USER,
    REFRESH_TOKEN,
    SIGNOUT_USER,
} from '../constants/ActionTypes';
import {
    showAuthMessage,
    userSignInSuccess,
    userSignOutSuccess,
    userRefreshTokenSuccess,
} from '../actions/Auth';
import Api from '../helpers/api';
import AuthHelper from '../helpers/AuthHelper';
import config from '../config';

const generateFreshTokenAuthObject = () => {
    let formBody = [];
    const data = {
        refresh_token: AuthHelper.getToken().refreshToken,
        grant_type: 'refresh_token',
        client_id: 'mobile'
    }

    for (let property in data) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue
        if (property === 'refresh_token') {
            encodedValue = data[property].replace(/['"«»]/g, '')
        } else {
            encodedValue = encodeURIComponent(data[property]);
        }

        formBody.push(encodedKey + '=' + encodedValue);
    }

    return formBody.join('&');
}

const generateHashedAuthObject = (email, password) => {
    let formBody = [];
    const data = {
        username: email,
        password: password,
        grant_type: 'password',
        client_id: 'mobile'
    }

    for (let property in data) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(data[property]);

        formBody.push(encodedKey + '=' + encodedValue);
    }

    return formBody.join('&');
}

const signInUserWithEmailPasswordRequest = async (email, password, rememberMe) => {
    const formBody = generateHashedAuthObject(email, password)
    const params = {
        url: `${config.baseUrl}/oauth/token`,
        data: formBody.toString()
    };

    return await Api
        .post(params)
        .then((response) => AuthHelper.saveToken(response, rememberMe))
        .then(response => response.data)
}

const signOutRequest = () => {
    AuthHelper.removeToken()
}

const refreshUserTokenRequest = async () => {
    const formBody = generateFreshTokenAuthObject();
    const params = {
        url: `${config.baseUrl}/oauth/token`,
        data: formBody.toString()
    };
    return await Api
        .post(params)
        .then(AuthHelper.saveToken)
        .then(response => response.data)
}

function* signInUserWithEmailPassword({ payload }) {
    try {
        const { email, password, rememberMe } = payload;
        const signInUser = yield call(signInUserWithEmailPasswordRequest, email, password, rememberMe);
        if (!signInUser || signInUser.error || !!(signInUser.data && signInUser.data.error)) {
            yield put(showAuthMessage('Invalid email or password. Please try again!'));
        } else {
            yield put(userSignInSuccess(signInUser));
        }
    } catch (error) {
        yield put(showAuthMessage('Invalid email or password. Please try again!'));
    }
}

function* signOut() {
    try {
        yield call(signOutRequest);
        yield put(userSignOutSuccess());
    } catch (error) {
        yield put(showAuthMessage(error));
    }
}

function* refreshUserToken() {
    try {
        const response = yield call(refreshUserTokenRequest);
        if (!response || response.error || !!(response.data && response.data.error)) {
            yield put(userSignOutSuccess());
            yield put(showAuthMessage('Token is invalid!'));
        } else {
            yield put(userRefreshTokenSuccess(response));
        }
    } catch (error) {
        yield put(userSignOutSuccess());
        yield put(showAuthMessage('Token is invalid!'));
    }
}

export function* signInUser() {
    yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword);
}

export function* signOutUser() {
    yield takeEvery(SIGNOUT_USER, signOut);
}

export function* refreshToken() {
    yield takeEvery(REFRESH_TOKEN, refreshUserToken);
}

export default function* rootSaga() {
    yield all([
        fork(signInUser),
        fork(signOutUser),
        fork(refreshToken),
    ]);
}