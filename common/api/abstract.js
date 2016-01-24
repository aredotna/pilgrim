import Q from 'bluebird-q';
import request from 'superagent';
let { ABSTRACT_ENDPOINT } = process.env;

export default (url) => {
  return Q.promise((resolve, reject) => {
    request
      .get(ABSTRACT_ENDPOINT)
      .query({ url: url })
      .end((err, response) => {
        if(err) { return reject(err); }
        if(response.body.errors) { return reject(response.body.errors); }
        resolve(response.body);
      });
  });
}
