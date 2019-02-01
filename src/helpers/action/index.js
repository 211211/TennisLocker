import { REQUEST } from '../../constants/ActionTypes'

export const create = (type, payload) => ({ type, payload })

export const createRequestTypes = base =>
  [REQUEST.START, REQUEST.SUCCESS, REQUEST.END].reduce(
    (acc, type) => ({
      ...acc,
      [type]: `${base}_${type}`,
    }),
    {},
  )