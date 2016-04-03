import Q from 'bluebird-q';
import request from 'superagent';

let { APP_URL } = process.env;

export function saveLocalPath(pathData){
  return Q.promise((resolve, reject) => {
    const req = request
      .post(`${APP_URL}api/path`)
      .set('Accept', 'application/json')
      .send(pathData)
      .end((err, res) => {
        if (err || !res.ok) {
          reject(new Error("Error fetching link"));
        } else {
          resolve(res.body);
        }
      });
  });
}
