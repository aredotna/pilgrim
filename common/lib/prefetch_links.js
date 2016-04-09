import kue from 'kue';
import url from 'url';
import { take } from 'lodash';

const { REDISCLOUD_URL } = process.env;
let queue = kue.createQueue({
  prefix: 'q',
  redis: REDISCLOUD_URL
});

export default (hrefs) => {
  take(hrefs, 10).map(href => {
    queue.create('fetchLink', href).priority('high').removeOnComplete( true ).save();
  });
}
