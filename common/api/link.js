import Q from 'bluebird-q';
import read from 'node-readability';
import qs from 'qs';
import { map, filter } from 'lodash';
import url from 'url';

let { ABSTRACT_ENDPOINT } = process.env;

export default (url) => {
  return Q.promise((resolve, reject) => {
    read(url, (err, article, meta) => {
      console.log('err', err);
      console.log('article', article);
      console.log('meta', meta);
      resolve(article);
    })
  });
}
