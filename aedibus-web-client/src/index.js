import React from 'react'
import { render } from 'react-dom'
import { Provider } from "react-redux";
import configureStore from "./Redux/store";
import AppContainer from "./Components/AppContainer";

const store = configureStore().store;

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('root')
);
