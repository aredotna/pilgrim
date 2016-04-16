
import fs from 'fs';
import path from 'path';

export default (html, initialState, title = '') =>  {
  const assets = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets.json'), 'utf8'));
  return `
    <!doctype html>
    <html>
      <head>
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"/>
        <meta name="description" content="Pilgrim is a bookmarklet / web-crawler that aims to provide a better experience for consuming long-form text and exploring related materials on the web.">
        <meta name="keywords" content="Pilgrim, Are.na, crawler, bookmarklet, reading">
        <meta name="author" content="Are.na">

        <!-- Social Media -->
        <meta property="og:type" content="website" /> <!-- "website" is default, so only use this if other -->
        <meta property="og:url" content="http://pilgrim.are.na" />
        <meta property="og:title" content="Pilgrim / ${title}" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@aredotna"/>
        <meta name="twitter:title" content="Pilgrim / ${title}" />
        <meta name="twitter:description" content="Pilgrim is a bookmarklet / web-crawler that aims to provide a better experience for consuming long-form text and exploring related materials on the web." />
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
        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
          ga('create', 'UA-24572232-7', 'auto');
          ga('send', 'pageview');
        </script>
      </body>
    </html>
    `
}
