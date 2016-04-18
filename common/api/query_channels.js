import Q from 'bluebird-q';
import request from 'superagent';
import config from '../../config.js';

export function queryChannels(term, token){
  return Q.promise((resolve, reject) => {
    const req = request
      .get(`${config.SECURE_ARENA_URL}/search/connection`)
      .set('Accept', 'application/json')
      .set('X-AUTH-TOKEN', token)
      .query({access_token: token, q: term, per: 3, "filter['type']": 'channel'})
      .end((err, res) => {
        if (err || !res.ok) {
          reject(new Error("Error logging in"));
        } else {
          resolve(res.body.channels);
        }
      });
  });
}
