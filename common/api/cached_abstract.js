import Q from 'bluebird-q';
import cache from '../lib/cache';
import { isURL } from 'validator';
import fetchAbstract from './abstract';

export default (url) => {
  const decodedURL = decodeURIComponent(url);
  return Q.promise((resolve, reject) => {
    if(!isURL(decodedURL)) return reject(new Error("Not a URL"));
    cache
      .get(decodedURL)
      .then((data) => {
        resolve(data);
      }, () => {
        fetchAbstract(decodedURL).then( results => {
          cache.set(url, results);
          resolve(results);
        }).catch( err => {
          console.log('error getting cached', err.stack);
          reject(err);
        })
      })
  });
}
