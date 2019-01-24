import {
    HIDE_MESSAGE,
    INIT_URL,
    ON_HIDE_LOADER,
    ON_SHOW_LOADER,
    SHOW_MESSAGE,
    SIGNIN_USER_SUCCESS,
    SIGNOUT_USER_SUCCESS,
    REFRESH_TOKEN_SUCCESS,

} from '../constants/ActionTypes';

const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    initURL: '',
    authUser: localStorage.getItem('access_token'),
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case REFRESH_TOKEN_SUCCESS:
        case SIGNIN_USER_SUCCESS: {
            return {
                ...state,
                loader: false,
                authUser: action.payload.access_token
            }
        }
        case INIT_URL: {
            return {
                ...state,
                initURL: action.payload
            }
        }
        case SIGNOUT_USER_SUCCESS: {
            return {
                ...state,
                authUser: null,
                initURL: '',
                loader: false
            }
        }

        case SHOW_MESSAGE: {
            return {
                ...state,
                alertMessage: action.payload,
                showMessage: true,
                loader: false
            }
        }
        case HIDE_MESSAGE: {
            return {
                ...state,
                alertMessage: '',
                showMessage: false,
                loader: false
            }
        }
        case ON_SHOW_LOADER: {
            return {
                ...state,
                loader: true
            }
        }
        case ON_HIDE_LOADER: {
            return {
                ...state,
                loader: false
            }
        }
        default:
            return state;
    }
}
