import Q from 'bluebird-q';
import cache from '../lib/cache';
import { isURL } from 'validator';
import fetchLink from './link';
import throttled from '../lib/throttled';
import { verbose } from '../lib/loggers';

export default (url) => {
  const decodedURL = decodeURIComponent(url);
  return Q.promise((resolve, reject) => {
    if(!isURL(decodedURL)) return reject(new Error("Not a URL"));
    cache
      .get(decodedURL)
      .then((data) => {
        resolve(data);
      }, () => {
        fetchLink(decodedURL).then( results => {
          cache.set(url, results);
          resolve(results);
        }).catch( err => {
          reject(err);
        })
      })
  });
}
