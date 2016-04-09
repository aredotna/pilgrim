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

const { PORT, NODE_ENV } = process.env;

const app = express();

import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackDevelopmentConfig from '../webpack.development.config';

const compiler = webpack(webpackDevelopmentConfig);

kue.Job.rangeByState( 'complete', 0, 10000, 'asc', function( err, jobs ) {
  jobs.forEach( function( job ) {
    job.remove( function(){
      console.log( 'removed job#', job.id );
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

  // Apps
  .use(compression())
  .use(express.static(path.resolve(__dirname, '../public')))
  .use(explore)
  .use(home)
  .use(api)
  .get('/favicon.ico', (req, res) => {
    res
      .status(200)
      .set({ 'Content-Type': 'image/x-icon' })
      .end();
  });

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
