import Q from 'bluebird-q';
import fetch from 'isomorphic-fetch';
import qs from 'qs';
import { map, filter } from 'lodash';
import url from 'url';

let { ABSTRACT_ENDPOINT } = process.env;

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response){
  return response.json()
}

export default (url) => {
  return Q.promise((resolve, reject) => {
    let query = qs.stringify({ url: url })
    fetch(`${ABSTRACT_ENDPOINT}?${query}`)
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        return resolve(data);
      })
      .catch((error) => {
        return reject(error);
      });
  });
}
