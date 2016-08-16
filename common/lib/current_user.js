import Q from 'bluebird-q';
import { pick } from 'lodash';
import request from 'superagent';
import config from '../../config.js';

const { SECURE_ARENA_URL } = process.env;

export default class CurrentUser {
  constructor(properties){
    this.properties = properties;
  }
  get(attr) {
    return this.properties[attr];
  }
  pick(attrs) {
    return pick(this.properties, attrs);
  }
  fetch({ data, success, error }) {
    return Q.promise((resolve, reject) => {
      const req = request
        .get(`${(SECURE_ARENA_URL || config.SECURE_ARENA_URL)}/accounts`)
        .set('Accept', 'application/json')
        .query(data)
        .end((err, res) => {
          if (err || !res.ok) {
            error(err);
            reject(new Error("Error logging in"));
          } else {
            success(res);
            resolve(res.body);
          }
        });
    });
  }
}
