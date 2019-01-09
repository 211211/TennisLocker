import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import Settings from './Settings';
import Auth from './Auth';
import Facility from './Facility/Facility';
import FacilityActive from './Facility/FacilityActive';
import FacilityActiveButton from './Facility/FacilityActiveButton';
import FacilityFilter from './Facility/FacilityFilter';

const reducers = combineReducers ({
    routing: routerReducer,
    settings: Settings,
    auth: Auth,

    // TODO: Mininal reducers
    facilities: Facility,
    facilityFilter: FacilityFilter,
    facilityActive: FacilityActive,
    facilityActiveButton: FacilityActiveButton,
});

export default reducers;
