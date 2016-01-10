import express from 'express';
import morgan from 'morgan';
import path from 'path';
import http from 'http';

const { PORT } = process.env;
const app = express();

app
  .use(morgan('dev'))
  .use(express.static(path.resolve(__dirname, '../public')));

app.get('/', (req, res) => {
  res.send("howdy pilgrim");
});

app.get('/:url', (req, res, next) => {
  let url = decodeURIComponent(req.params.url);
  if(!isURL(url)){
    return next();
  }

});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

