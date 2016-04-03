import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { isEmpty } from 'lodash';
import configureStore from '../common/store/configure_store';
import Explore from '../server/explore/explore.js';
import Home from '../server/home/home.js';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const rootElement = document.getElementById("root");
window.__QUEUE__ = [];

if(!isEmpty(initialState.root_link)){
  render(
    <Provider store={store}>
      <Explore />
    </Provider>,
    rootElement
  )
}else{
  render(
    <Provider store={store}>
      <Home />
    </Provider>,
    rootElement
  )
}
