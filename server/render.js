export default (html, initialState) =>  {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Pilgrim by Are.na</title>
        <link href="/main.css" rel="stylesheet" type="text/css"/>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/mains.js"></script>
      </body>
    </html>
    `
}
