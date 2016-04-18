# Pilgrim by Are.na
Pilgrim is a prototype tool for assisting in web-based research.

This project was initiated with generous support from the [Knight Foundation Prototype Fund](http://www.knightfoundation.org/funding-initiatives/knight-prototype-fund/).

![Pilgrim screenshot](https://d2w9rnfcy7mm78.cloudfront.net/594477/original_2c67d32dc6092b16b2d5d5233fca8c4f.png)
![Pilgrim screenshot](https://d2w9rnfcy7mm78.cloudfront.net/594476/original_d147f89e29ea39e4ac3f799fdf2fb23c.png)

### Table of contents

- [Installation](https://github.com/arenahq/pilgrim#installation)
- [API](https://github.com/arenahq/pilgrim#api-endpoint-reference)
- [Credits](https://github.com/arenahq/pilgrim#api-endpoint-reference)

## Installation

1. Install node modules: `npm install`
2. Install Memcached: `brew install memcached`
3. Install Redis: `brew install redis`
4. Create a new `.env` file and copy contents from `.env.example`
5. Run the server `npm run dev`

## API

Routes can be found in server/api/index.js

### /api/:url

Returns extracted content from a url, along with all inner links.

**Example result**

Request: `/api/http%3A%2F%2Fwww.ribbonfarm.com%2F2016%2F02%2F11%2Fminimum-viable-superorganism%2F`

Result:

```
{
  "html": (stripped html from webpage),
  "title": "Minimum Viable Superorganism",
  "hrefs": [
    "http://www.meltingasphalt.com/tears/",
    "https://en.wikipedia.org/wiki/Reciprocal_altruism",
    "https://en.wikipedia.org/wiki/Free_rider_problem",
    "http://www.ribbonfarm.com/2015/09/29/what-is-the-largest-collective-action-ever/",
    "http://peterturchin.com/blog/2016/01/19/naked-self-interest-is-a-recipe-for-social-dissolution-a-response-to-branko-milanovic/",
    "http://www.bartleby.com/17/1/67.html",
    "http://www.meltingasphalt.com/social-status-down-the-rabbit-hole/",
    "https://en.wikipedia.org/wiki/Competitive_altruism",
    "https://en.wikipedia.org/wiki/Enlightened_self-interest",
    "https://twitter.com/KevinSimler/status/650336275954860033",
    "https://twitter.com/mdc/status/573547255115968514",
    "https://en.wikipedia.org/wiki/Agent_detection",
    "http://billmoyers.com/2014/02/21/anatomy-of-the-deep-state/",
    "http://slatestarcodex.com/2014/09/14/does-class-warfare-have-a-free-rider-problem/",
    "https://en.wikipedia.org/wiki/Trade_association",
    "https://en.wikipedia.org/wiki/FWD.us",
    "http://www.amazon.com/Hierarchy-Forest-Evolution-Egalitarian-Behavior/dp/0674006917",
    "http://www.amazon.com/SuperCooperators-Altruism-Evolution-Other-Succeed/dp/1451626630",
    "http://www.amazon.com/Why-We-Talk-Evolutionary-Evolution/dp/0199276234"
  ],
  "url": "http://www.ribbonfarm.com/2016/02/11/minimum-viable-superorganism/",
  "host": "www.ribbonfarm.com",
  "cached": 1461013525246
}
```

## Credits
Pilgrim is built on the shoulders of giants and we'd like to highlight a few of the open-source projects that made it possible (and enjoyable) to develop:

- [readability](https://github.com/luin/readability)
- [redux](https://github.com/reactjs/redux)
- [reselect](https://github.com/reactjs/reselect)
- [redux-thunk](redux-thunk)
- [bluebird-q](https://github.com/petkaantonov/bluebird-q)


