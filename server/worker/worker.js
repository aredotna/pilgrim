import kue from 'kue';
import url from 'url';
import redis from 'redis';
import cachedLink from '../../common/api/cached_link';
import cache from '../../common/lib/cache';

const { REDISCLOUD_URL } = process.env;
let q = kue.createQueue({
  prefix: 'q',
  redis: REDISCLOUD_URL
});

q.on('error', function(err) { console.log('error creating worker queue'); });

q.process('fetchLink', function(job, done) {
  console.log('gonna prefetch link ->', job.data);
  cachedLink(job.data);
  done();
});
