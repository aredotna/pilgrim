
import fs from 'fs';
import path from 'path';

export default (html, initialState, title = '') =>  {
  const assets = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets.json'), 'utf8'));
  return `
    <!doctype html>
    <html>
      <head>
        <title>${title}</title>
        <link href='https://fonts.googleapis.com/css?family=Lora:400,400italic,700,700italic' rel='stylesheet' type='text/css'>
        <link href="${assets.main.css}" rel="stylesheet" type="text/css"/>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
        <script src="${assets.main.js}"></script>
      </body>
    </html>
    `
}
