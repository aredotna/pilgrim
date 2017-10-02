import http from 'http';
import path from 'path';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import explore from './explore';
import home from './home';
import api from './api';
import compression from 'compression';
import kue from 'kue';
import { parse } from 'url';
import arenaPassport from  'arena-passport';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'cookie-session';
import CurrentUser from '../common/lib/current_user'

import config from '../config.js';

const { PORT, NODE_ENV, APP_URL, SECURE_ARENA_URL } = process.env;

const app = express();

import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackDevelopmentConfig from '../webpack.development.config';

const compiler = webpack(webpackDevelopmentConfig);

kue.Job.rangeByState( 'complete', 0, 10000, 'asc', function( err, jobs ) {
  jobs.forEach( function( job ) {
    job.remove( function(){
      console.log( 'removed job #', job.id );
    });
  });
});

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
  .use(cors())

app
  // Auth
  .use(cookieParser())
  .use(session({
    secret: config.SESSION_SECRET,
    domain: config.COOKIE_DOMAIN,
    key: config.SESSION_COOKIE_KEY,
    maxage: config.SESSION_COOKIE_MAX_AGE,
  }))
  .use(arenaPassport({
    SECURE_ARENA_URL: SECURE_ARENA_URL || config.SECURE_ARENA_URL,
    APP_URL: APP_URL,
    CurrentUser: CurrentUser
  }))

  // Favicon
  .get('/favicon.ico', (req, res) => {
    res
      .status(200)
      .set({ 'Content-Type': 'image/x-icon' })
      .end();
  })

  // Ensure SSL
  .use((req, res, next) => {
    const protocol = req.get('X-Forwarded-Proto') || req.protocol;
    if(protocol !== 'https' && parse(APP_URL).protocol == 'https:'){
      url =
      res.redirect(301, APP_URL + req.url.replace("//", "/"))
    }else{
      next();
    }
  })

  // Apps
  .use(compression())
  .use(express.static(path.resolve(__dirname, '../public')))
  .use(explore)
  .use(home)
  .use(api);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
