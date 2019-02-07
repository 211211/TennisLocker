import { createSelector } from 'reselect'

export const calendarSelector = (state) => state.calendar

export const eventForMonthSelector = () =>
    createSelector(
        calendarSelector,
        calendar => calendar.eventForMonth
    )

export const eventFilterTypesSelector = () =>
    createSelector(
        calendarSelector,
        calendar => calendar.eventFilterTypes
    )