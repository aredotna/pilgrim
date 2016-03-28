import kue from 'kue';
import url from 'url';
import redis from 'redis';
import fetchLink from '../../common/api/link';
import cache from '../../common/lib/cache';

const { REDISCLOUD_URL } = process.env;
let q = kue.createQueue({
  prefix: 'q',
  redis: REDISCLOUD_URL
});

q.on('error', function(err) { console.log('error creating worker queue'); });

q.process('fetchLink', function(job, done) {
  console.log('gonna fetch link', job.data);
  fetchLink(job.data).then( results => {
    console.log('fetched link, setting cache', job.data);
    cache.set(job.data, results);
  });
  done();
});
