import Q from 'bluebird-q';
import request from 'superagent';
import { addToQueue, removeFromQueue } from '../lib/queue.js';

let { APP_URL } = process.env;

export function fetchLocalLink(url){
  return Q.promise((resolve, reject) => {
    const req = request(`${APP_URL}/api/${encodeURIComponent(url)}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err || !res.ok) {
          reject(new Error("Error fetching link"));
        } else {
          removeFromQueue(url);
          resolve(res.body);
        }
      });
    addToQueue({url: url, req: req});
  });
}
