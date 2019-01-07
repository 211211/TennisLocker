import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
    auth,
} from 'firebase/firebase';
import {
    SIGNIN_USER,
    SIGNOUT_USER,
} from 'constants/ActionTypes';
import { showAuthMessage, userSignInSuccess, userSignOutSuccess } from 'actions/Auth';

const signInUserWithEmailPasswordRequest = async (email, password) =>
    await  auth.signInWithEmailAndPassword (email, password)
        .then (authUser => authUser)
        .catch (error => error);

const signOutRequest = async () =>
    await  auth.signOut ()
        .then (authUser => authUser)
        .catch (error => error);

function* signInUserWithEmailPassword ({ payload }) {
    const { email, password } = payload;
    try {
        const signInUser = yield call (signInUserWithEmailPasswordRequest, email, password);
        if (signInUser.message) {
            yield put (showAuthMessage (signInUser.message));
        } else {
            localStorage.setItem ('user_id', signInUser.uid);
            yield put (userSignInSuccess (signInUser));
        }
    } catch (error) {
        yield put (showAuthMessage (error));
    }
}

function* signOut () {
    try {
        const signOutUser = yield call (signOutRequest);
        if (signInUser.message) {
            yield put (showAuthMessage (signInUser.message));
        } else {
            localStorage.removeItem ('user_id');
            yield put (userSignOutSuccess (signInUser));
        }
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