import express from 'express';
import React from 'react';
import { take } from 'lodash';
import { renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'react-redux';
import configureStore from '../../common/store/configure_store';
import { isURL } from 'validator';
import Explore from './explore.js';
import render from '../render.js';
import cachedLink from '../../common/api/cached_link';
import kue from 'kue';
import url from 'url';

let app = express();

const { REDISCLOUD_URL } = process.env;
let queue = kue.createQueue({
  prefix: 'q',
  redis: REDISCLOUD_URL
});

app.get('/:url', (req, res, next) => {
  const url = req.params.url;
  cachedLink(url, req).then( results => {
    // set initial state as fetched info
    let store = configureStore({
      rootLink: url,
      links: {
        [url]: results
      },
      preview_url: false,
      hovered_link: false,
      path: [url],
      loading: false
    });

    // Render the component to a raw string
    const html = renderToStaticMarkup(
      <Provider store={store}>
        <Explore />
      </Provider>
    );

    // Render our boilerplate page with HTML and the initial state set
    res.send(render(html, store.getState(), results.title));
    take(results.hrefs, 10).map(href => {
      queue.create('fetchLink', href).priority('high').save();
    });
  }).catch( err => {
    console.log('ERROR | ', err.stack)
    next()
  })
})

export default app;
