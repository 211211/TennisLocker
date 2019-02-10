import React from 'react';
import ReactDOM from 'react-dom';
import AuthHelper from './helpers/AuthHelper'
const rootEl = document.getElementById ('app-site');


// Create a reusable render method that we can call more than once
let render = () => {
    // Dynamically import our main App component, and render it
    const MainApp = require ('./MainApp').default;
    ReactDOM.render (
        <MainApp />,
        rootEl
    );
};

if (module.hot) {
    module.hot.accept ('./MainApp', () => {
        const NextApp = require ('./MainApp').default;
        render (
            <NextApp />,
            rootEl
        );
    });
}

AuthHelper.shareSessionStorage(render);
