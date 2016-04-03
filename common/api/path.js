import Q from 'bluebird-q';
import rs from 'randomstring';
import redis from 'redis';
import { pick } from 'lodash';

const { NODE_ENV, REDISCLOUD_URL, APP_URL } = process.env;

const createClient = () => {
  if (NODE_ENV === 'test') return fakeredis.createClient();
  return redis.createClient(REDISCLOUD_URL);
};

let client = createClient();

export function savePath(pathData){
  return Q.promise((resolve, reject) => {
    const id = rs.generate(10);
    const dataString = JSON.stringify(pick(pathData, ['root_link', 'path']));
    client.set(id, dataString);
    resolve({id: id });
  });
}

export function getPath(id){
  return Q.promise((resolve, reject) => {
    client.get(id, (err, data) => {
      if (err) return reject(err);
      return resolve(JSON.parse(data));
    });
  });
}
