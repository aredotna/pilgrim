import express from 'express';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'react-redux';
import configureStore from '../../common/store/configure_store';
import Home from './home.js';
import render from '../render.js';

let app = express();

app.get('/', (req, res, next) => {
  // set initial state as fetched info
  let store = configureStore();

  // Render the component to a raw string
  const html = renderToStaticMarkup(
    <Provider store={store}>
      <Home />
    </Provider>
  );

  // Render our boilerplate page with HTML and the initial state set
  res.send(render(html, store.getState(), 'Pilgrim'));
})

export default app;
