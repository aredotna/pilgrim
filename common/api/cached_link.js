import Q from 'bluebird-q';
import cache from '../lib/cache';
import { isURL } from 'validator';
import fetchLink from './link';
import throttled from '../lib/throttled';
import { verbose } from '../lib/loggers';
import { take } from 'lodash';
import kue from 'kue';
import url from 'url';

const { REDISCLOUD_URL } = process.env;
let queue = kue.createQueue({
  prefix: 'q',
  redis: REDISCLOUD_URL
});

export default (url, req) => {
  const decodedURL = decodeURIComponent(url);
  return Q.promise((resolve, reject) => {
    if(!isURL(decodedURL)) return reject(new Error("Not a URL"));
    cache
      .get(decodedURL)
      .then((data) => {
        resolve(data);

        // preload 10 links
        take(data.hrefs, 10).map(href => {
          console.log('adding url to the queue', href);
          queue.create('fetchLink', href).priority('high').save();
        });
      }, () => {
        fetchLink(decodedURL, req).then( results => {
          cache.set(url, results);
          resolve(results);

          // preload 10 links
          take(results.hrefs, 10).map(href => {
            console.log('adding url to the queue', href);
            queue.create('fetchLink', href).priority('high').save();
          });
        }).catch( err => {
          reject(err);
        })
      })
  });
}
