import Q from 'bluebird-q';
import cache from '../lib/cache';
import { isURL } from 'validator';
import fetchLink from './link';

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
        }).catch( err => {
          reject(err);
        })
      })
  });
}
