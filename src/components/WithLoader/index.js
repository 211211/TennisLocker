import React from 'react'
import CircularProgress from '../CircularProgress'

const withLoader = (loadCondition, RenderComponent, props) => {
    return loaderCondition(props)
                ? <CircularProgress />
                : <RenderComponent {...props} />
}

export default withLoader