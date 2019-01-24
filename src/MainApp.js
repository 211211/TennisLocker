import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import configureStore, { history } from './store';
import App from './containers/App';
import {setGlobalVariable} from './helpers/WindowHelper'

export const store = configureStore ();

if(process.env.NODE_ENV === 'development') {
    store.subscribe(() => {
        setGlobalVariable('redux', store.getState())
    })
}

const MainApp = () =>
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </ConnectedRouter>
    </Provider>;


export default MainApp;