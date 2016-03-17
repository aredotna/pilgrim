import Q from 'bluebird-q';
import request from 'superagent';
import { addToQueue, removeFromQueue } from '../lib/queue.js';

let { ABSTRACT_ENDPOINT, APP_URL } = process.env;

export function fetchLocalAbstract(url){
  return Q.promise((resolve, reject) => {
    const req = request(`${APP_URL}api/${encodeURIComponent(url)}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err || !res.ok) {
          reject(new Error("Error fetching abstract"));
        } else {
          removeFromQueue(url);
          resolve(res.body);
        }
      });
    addToQueue({url: url, req: req});
  });
}
