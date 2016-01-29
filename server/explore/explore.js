import { default as React, PropTypes } from 'react';
import { shuffle, take } from 'lodash';
import { connect } from 'react-redux';

const { APP_URL } = process.env;

class Explore extends React.Component {
  render() {
    const { dispatch, abstract } = this.props;
    const content = abstract.text.match(/[^\.!\?]+[\.!\?]+/g);
    const tags = take(shuffle(abstract.keywords.split(',')), 6);

    return (
      <div className='l-abstract'>
        <div className="ab-title">{abstract.title}</div>
        <div className="ab-content" dangerouslySetInnerHTML={{__html: content[0]}}></div>
        <div className="ab-keywords">
          {tags.map(function(tag) {
            return <span className="ab-tag" key={tag}><a href={tag}>#{tag}</a></span>;
          })}
        </div>
        <hr />
        <ol>
          {abstract.hrefs.map(function(href) {
            let url = `/${encodeURIComponent(href)}`;
            return <li key={href}><a href={url}>{href}</a></li>;
          })}
        </ol>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    abstract: state.abstract
  }
}

export default connect(mapStateToProps)(Explore);
