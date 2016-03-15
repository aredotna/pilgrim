import Q from 'bluebird-q';
import fetch from 'isomorphic-fetch';
import qs from 'qs';
import { map, filter } from 'lodash';
import url from 'url';
import $ from 'jquery';
import ajaxq from 'ajaxq';

let { ABSTRACT_ENDPOINT, APP_URL } = process.env;

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

export function fetchLocalAbstract(url){
  return Q.promise((resolve, reject) => {
    $.getq('pilgrim', `${APP_URL}api/${encodeURIComponent(url)}`, (data) => {
      resolve(data);
    });
  });
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
