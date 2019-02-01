import { REQUEST } from '../constants/ActionTypes'

let numberOfLoading = 0

export default function reduce(state = false, { type }) {
    const isStartLoading = type.endsWith(REQUEST.START)
    const isEndLoading = (type.endsWith(REQUEST.SUCCESS) || type.endsWith(REQUEST.FAIL))

    if (isStartLoading) numberOfLoading++
    else if (isEndLoading) numberOfLoading--

    return (isStartLoading || isEndLoading) ? numberOfLoading > 0 : state
}
