import express from 'express';
import { take } from 'lodash';
import cachedLink from '../../common/api/cached_link';
import kue from 'kue';
import url from 'url';

const { REDISCLOUD_URL } = process.env;
let queue = kue.createQueue({
  prefix: 'q',
  redis: REDISCLOUD_URL
});

let app = express();

app.get('/api/:url', (req, res, next) => {
  cachedLink(req.params.url).then(results => {
    res.json(results);
    take(results.hrefs, 10).map(href => {
      queue.create('fetchLink', href).priority('high').save();
    });
  }).catch(err => {
    console.log('API ERROR | ', err.stack);
    next();
  });
})

export default app;
