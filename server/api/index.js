import express from 'express';
import _ from 'lodash';
import cachedAbstract from '../../common/api/cached_abstract';

let app = express();

app.get('/api/:url', (req, res, next) => {
  cachedAbstract(req.params.url).then(results => {
    res.json(results);
  }).catch(err => {
    console.log('API ERROR | ', err.stack);
    next();
  });
})

export default app;
