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
        <div className="home__top">
          <div className="home__top__inner">
            <div className="home__top__module">
              <h1>
                Open
                <input id="open-in-pilgrim" type="text" placeholder="enter URL here"/>
                in <strong>Pilgrim</strong>
              </h1>
              <span className="home__top__module__go" onClick={onSubmitClick}>Go →</span>
            </div>
            <div className="home__top__module">
              <h1> Or try <strong>Pilgrim</strong> in bookmarklet form</h1>
              <a href={snippet} className="home__snippet">Open in Pilgrim</a>
              <div className="home__snippet__instructions">
                (drag the link above to your bookmarks bar ↑)
              </div>
            </div>
          </div>
        </div>
        <div className="home__bottom">
          <div className="home__bottom__inner">
            <div className="home__bottom__module">
              <h1>Examples</h1>
              <ul className="home__bottom__module__examples">
                {map(examples, ({url, title}) => {
                  let endcodedUrl = `${APP_URL}${encodeURIComponent(url)}`;
                  return (
                    <li key={url}>
                      <a className="home__bottom__module__examples__title" href={endcodedUrl}>{title}</a>
                      <a className="home__bottom__module__examples__domain" href={endcodedUrl}>{url}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="home__bottom__module">
              <h1>About</h1>
              <div className="home__bottom__module__about">
                <img src="https://d2w9rnfcy7mm78.cloudfront.net/582128/original_60fe965af53f131eb41882a6fb325b63.png" />
                <p>Pilgrim is a bookmarklet / web-crawler that aims to provide a better experience for consuming long-form text and exploring related materials on the web.</p>
                <p>It works by extracting the content of an article, and loading any links clicked inline on the page. As you go deeper into supplemental material, your path is maintained, hopefully giving a reader a better sense of how the information flows.</p>
                <p>Pilgrim is a project by <a href="https://wwww.are.na">Are.na</a> made possible with generous support from the <a href="http://www.knightfoundation.org/grants/201551668/">Knight Foundation</a></p>
              </div>
            </div>
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
