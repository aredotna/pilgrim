import express from 'express';
import React from 'react';
import _ from 'lodash';
import { renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'react-redux';
import configureStore from '../../common/store/configure_store';
import { isURL } from 'validator';
import Explore from './explore.js';
import render from '../render.js';
import fetchAbstract from '../../common/api/abstract';

let app = express();

app.get('/:url', (req, res, next) => {
  let url = decodeURIComponent(req.params.url);
  if(!isURL(url)){
    return next();
  }

  fetchAbstract(url).then( results => {

    // set initial state as fetched info
    let store = configureStore({
      rootLink: url,
      links: {
        [url]: results
      }
    });

    // Render the component to a raw string
    const html = renderToStaticMarkup(
      <Provider store={store}>
        <Explore />
      </Provider>
    );

    // Render our boilerplate page with HTML and the initial state set
    res.send(render(html, store.getState()));
  }).catch( err => {
    console.log('error here', err.stack)
    next()
  })
})

export default app;
