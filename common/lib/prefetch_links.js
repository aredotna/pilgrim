import kue from 'kue';
import url from 'url';

const { REDISCLOUD_URL } = process.env;
let queue = kue.createQueue({
  prefix: 'q',
  redis: REDISCLOUD_URL
});

export default (hrefs) => {
  return take(hrefs, 10).map(href => {
    queue.create('fetchLink', href).priority('high').save();
  });
}
