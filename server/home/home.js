import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import snippet from './snippet';
import examples from './examples';

const { APP_URL } = process.env;

class Home extends React.Component {
  render() {
    const { onSubmitClick } = this.props;

    return (
      <div className='l-home home'>
        <div className="home__module">
          <h1 className="home__module__form">
            Open
            <input id="open-in-pilgrim" type="text" placeholder="enter URL here"/>
            in <strong>Pilgrim</strong>
            <span className="home__module__go" onClick={onSubmitClick}>→</span>
          </h1>

          <h1 className="home__module__bm">
            Or drag the
            <div className="home__module__bookmarklet">
              <span className="home__module__bookmarklet__display">bookmarklet</span>
              <a href={snippet} className="home__module__bookmarklet__snippet">Open in Pilgrim</a>
            </div>
            to your bookmarks bar ^
          </h1>
        </div>
        <div className="home__module">
          <h1>What's <strong>Pilgrim</strong>, pilgrim?</h1>
          <img src="https://s3.amazonaws.com/arena_images-temp/uploads%2Fr2vtrllc%2Fpilgrim-take-4.gif" />
          <div className="home__module__about">
            <p>Pilgrim is something like a combination of a bookmarklet and web-crawler. It provides a better experience for consuming long-form text and exploring related materials on the web.</p>
            <p>It works by extracting the content of an article, and loading any links clicked inline on the page. As you go deeper into supplemental material, your path is maintained, giving one a better sense of where the relevant information flows.</p>
            <p>Pilgrim is an <a href="http://github.com/arenahq/pilgrim">open source</a> project by <a href="https://www.are.na">Are.na</a> initiated with generous support from the <a href="http://www.knightfoundation.org/grants/201551668/">Knight Foundation Prototype Fund</a></p>
          </div>
        </div>
        <div className="home__module">
          <h1>Example paths to explore</h1>
          <ul className="home__module__examples">
            {map(examples, ({url, title}) => {
              let endcodedUrl = `${APP_URL}${encodeURIComponent(url)}`;
              return (
                <li key={url}>
                  <a className="home__module__examples__title" href={endcodedUrl}>{title}</a>
                  <a className="home__module__examples__domain" href={endcodedUrl}>{url}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="home__module home__module__screenshots">
          <h1>Screenshots</h1>
          <img src="https://d2w9rnfcy7mm78.cloudfront.net/594476/original_d147f89e29ea39e4ac3f799fdf2fb23c.png" />
          <img src="https://d2w9rnfcy7mm78.cloudfront.net/594477/original_2c67d32dc6092b16b2d5d5233fca8c4f.png" />
        </div>
        <div className="home__module">
          <h1>Feedback</h1>
          <div className="home__module__about">
            <p>Pilgrim is an experiment and an ongoing work in progress. Please, by all means, <a href="https://docs.google.com/forms/d/1rMMk8NMegcqp9LbIPin_gsFudijB2NN6R5xQ1TU9a4Q/viewform">leave us some feedback</a>.</p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    onSubmitClick: () => {
      const url = $("#open-in-pilgrim").val();
      window.location = `${APP_URL}`+ encodeURIComponent(url);
    }
  }
}

export default connect(mapStateToProps)(Home);
