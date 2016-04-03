import express from 'express';
import cachedLink from '../../common/api/cached_link';
import { savePath, getPath } from '../../common/api/path';
import prefetchLinks from '../../common/lib/prefetch_links';
import Q from 'bluebird-q';

let app = express();

app
  .get('/api/:url', (req, res, next) => {
    cachedLink(req.params.url).then(results => {
      res.json(results);
      prefetchLinks(results.hrefs, 10);
    }).catch(err => {
      console.log('API ERROR | ', err.stack);
      next();
    });
  })
  .post('/api/path', (req, res, next) => {
    console.log('body', req.body);
    savePath(req.body).then((response) => {
      return res.json(response);
    }).catch(err => {
      console.log('API ERROR | ', err.stack);
      next();
    });
  })
  .get('/api/path/:id', (req, res, next) => {
    getPath(req.params.id).then((response) => {
      return res.json(response);
    }).catch(err => {
      console.log('API ERROR | ', err.stack);
      next();
    });
  })

export default app;
