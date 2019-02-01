import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import Settings from './Settings';
import Auth from './Auth';
import Facility from './Facility/Facility';
import FacilityActive from './Facility/FacilityActive';
import FacilityActiveButton from './Facility/FacilityActiveButton';
import FacilityFilter from './Facility/FacilityFilter';
import LoadingReducer from './Loading';
import CalendarReducer from './Calendar';

const reducers = combineReducers({
    routing: routerReducer,
    settings: Settings,
    auth: Auth,

    // TODO: Mininal reducers
    facilities: Facility,
    facilityFilter: FacilityFilter,
    facilityActive: FacilityActive,
    facilityActiveButton: FacilityActiveButton,
    loading: LoadingReducer,
    calendar: CalendarReducer,
});

export default reducers;
