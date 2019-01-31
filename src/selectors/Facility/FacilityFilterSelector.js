import { createSelector } from 'reselect'
const facilityFilterSelector = state => state.facilityFilter

export const makeSelectFacilityFilterActive = () => 
    createSelector(
        facilityFilterSelector,
        data => data.facilityActive
    )
export const makeSelectFacilityFilterActiveId = () => 
    createSelector(
        makeSelectFacilityFilterActive,
        facility => facility.id
    )
