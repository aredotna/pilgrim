import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../common/store/configure_store';
import Explore from '../server/explore/explore.js';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const rootElement = document.getElementById("root");

render(
  <Provider store={store}>
    <Explore rootLink={initialState.rootLink} />
  </Provider>,
  rootElement
)
