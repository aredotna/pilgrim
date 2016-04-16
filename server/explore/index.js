import express from 'express';
import Q from 'bluebird-q';
import React from 'react';
import { take, map, find, keys } from 'lodash';
import { renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'react-redux';
import configureStore from '../../common/store/configure_store';
import { isURL } from 'validator';
import Explore from './explore.js';
import render from '../render.js';
import cachedLink from '../../common/api/cached_link';
import { getPath } from '../../common/api/path';
import prefetchLinks from '../../common/lib/prefetch_links';

let app = express();

const { APP_URL } = process.env;

app
  .get('/:url', (req, res, next) => {
    const url = req.params.url;
    cachedLink(url, req).then( results => {
      // set initial state as fetched info
      const store = configureStore({
        root_link: url,
        links: {
          [url]: results
        },
        preview_url: false,
        hovered_link: false,
        path: [url],
        loading: false,
        path_url: false,
        scroll_index: 0,
        view_mode: 'explore'
      });

      // Render the component to a raw string
      const html = renderToStaticMarkup(
        <Provider store={store}>
          <Explore />
        </Provider>
      );

      // Render our boilerplate page with HTML and the initial state set
      res.send(render(html, store.getState(), results.title));
      prefetchLinks(results.hrefs);
    }).catch( err => {
      console.log('ERROR | ', err.stack)
      next()
    })
  })
  .get('/path/:id', (req, res, next) => {
    const id = req.params.id;
    getPath(id).then( pathData => {
      Q.all(map(pathData.path, url => cachedLink(url))).then((results) => {
        let links = {};
        map(pathData.path, (url)=>{
          let linkData = find(results, { url: url });
          links[url] = linkData;
        });

        const store = configureStore({
          root_link: pathData.root_link,
          links: links,
          preview_url: false,
          hovered_link: false,
          path: pathData.path,
          loading: false,
          path_url: id,
          scroll_index: pathData.path.length - 1,
          view_mode: 'explore'
        });

        // Render the component to a raw string
        const html = renderToStaticMarkup(
          <Provider store={store}>
            <Explore />
          </Provider>
        );

        // Render our boilerplate page with HTML and the initial state set
        return res.send(render(html, store.getState(), results[0].title));
      });
    }).catch( err => {
      console.log('ERROR | ', err.stack)
      next()
    });
  })

export default app;
