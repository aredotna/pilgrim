import Q from 'bluebird-q';
import request from 'superagent';

let { APP_URL } = process.env;

export default function login(userData){
  return Q.promise((resolve, reject) => {
    const req = request
      .post(`${APP_URL}me/sign_in`)
      .set('Accept', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest')
      .send(userData)
      .end((err, res) => {
        console.log('res.body', res.body);
        if (err || !res.ok || (res.body && res.body.success == false)) {
          console.log('err', err);
          reject(new Error("Error logging in"));
        } else {
          resolve(res.body);
        }
      });
  });
}
