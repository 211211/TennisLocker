import React from 'react'
import curry from 'lodash/curry'
import CircularProgress from '../CircularProgress'

const withLoader = (loaderCondition, RenderComponent, props) => {
    return loaderCondition(props)
                ? <CircularProgress />
                : <RenderComponent {...props} />
}

export default curry(withLoader)