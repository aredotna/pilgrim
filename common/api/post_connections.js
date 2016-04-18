import Q from 'bluebird-q';
import qs from 'qs';
import request from 'superagent';
import config from '../../config.js';

export function postConnections(channel_ids, url, token){
  return Q.promise((resolve, reject) => {
    const req = request
      .post(`${config.SECURE_ARENA_URL}/blocks/multi`)
      .set('Accept', 'application/json')
      .set('X-AUTH-TOKEN', token)
      .send(qs.stringify({ source: url, channel_ids: channel_ids }, { arrayFormat: 'brackets'}))
      .end((err, res) => {
        if (err || !res.ok) {
          reject(new Error("Error saving connections"));
        } else {
          resolve(res.body.channels);
        }
      });
  });
}
