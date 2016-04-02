import express from 'express';
import { take } from 'lodash';
import cachedLink from '../../common/api/cached_link';
import prefetchLinks from '../../common/lib/prefetch_links.js';

let app = express();

app.get('/api/:url', (req, res, next) => {
  cachedLink(req.params.url).then(results => {
    res.json(results);
    prefetchLinks(results.hrefs, 10);
  }).catch(err => {
    console.log('API ERROR | ', err.stack);
    next();
  });
})

export default app;
