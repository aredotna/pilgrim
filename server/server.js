import http from 'http';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import explore from './explore';
import home from './home';
import api from './api';
import compression from 'compression';
import kue from 'kue';
import url from 'url';

const { PORT, NODE_ENV, REDISCLOUD_URL } = process.env;

const redisUrl = url.parse(REDISCLOUD_URL);
let q = kue.createQueue({
  prefix: 'q',
  redis: {
    port: redisUrl.port,
    host: redisUrl.hostname
  }
});

const app = express();

import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackDevelopmentConfig from '../webpack.development.config';

const compiler = webpack(webpackDevelopmentConfig);

if (NODE_ENV !== 'production') {
  app
    .use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackDevelopmentConfig.output.publicPath,
    }))
    .use(webpackHotMiddleware(compiler));
}

app
  // Other various middleware
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(morgan('combined'))

  // Apps
  .use(compression())
  .use(express.static(path.resolve(__dirname, '../public')))
  .use(explore)
  .use(home)
  .use(api)

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
