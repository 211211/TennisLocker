import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import Settings from './Settings';
import Auth from './Auth';
import Facility from './Facility';

const reducers = combineReducers ({
    routing: routerReducer,
    settings: Settings,
    auth: Auth,
    facilities: Facility,
});

export default reducers;
