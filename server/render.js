
import fs from 'fs';
import path from 'path';

export default (html, initialState) =>  {
  const assets = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets.json'), 'utf8'));
  return `
    <!doctype html>
    <html>
      <head>
        <title>Pilgrim by Are.na</title>
        <link href="${assets.main.css}" rel="stylesheet" type="text/css"/>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="${assets.main.js}"></script>
      </body>
    </html>
    `
}
