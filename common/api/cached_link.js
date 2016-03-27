import Q from 'bluebird-q';
import cache from '../lib/cache';
import { isURL } from 'validator';
import fetchLink from './link';
import throttled from '../lib/throttled';
import { verbose } from '../lib/loggers';
import { take } from 'lodash';

export default (url, req) => {
  const decodedURL = decodeURIComponent(url);
  return Q.promise((resolve, reject) => {
    if(!isURL(decodedURL)) return reject(new Error("Not a URL"));
    cache
      .get(decodedURL)
      .then((data) => {
        resolve(data);
      }, () => {
        fetchLink(decodedURL, req).then( results => {
          cache.set(url, results);
          resolve(results);

          // preload 10 links
          take(results.hrefs, 10).map(href => {
            fetchLink(href, req).then( results => {
              cache.set(href, results);
            });
          });
        }).catch( err => {
          reject(err);
        })
      })
  });
}
