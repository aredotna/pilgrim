import express from 'express';
import _ from 'lodash';
import cachedLink from '../../common/api/cached_link';

let app = express();

app.get('/api/:url', (req, res, next) => {
  cachedLink(req.params.url).then(results => {
    res.json(results);
  }).catch(err => {
    console.log('API ERROR | ', err.stack);
    next();
  });
})

export default app;
