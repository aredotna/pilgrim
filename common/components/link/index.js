import { default as React, PropTypes } from 'react';
import { shuffle, take } from 'lodash';
import { connect } from 'react-redux';
import { fetchAbstract } from '../../actions';
import randomColor from 'randomcolor';
import classNames from 'classnames';
import { createSelector } from 'reselect';

class Node extends React.Component {
  render() {
    const { link, onLinkClick, url } = this.props;

    const linkClasses = classNames({
      'linkAbstract': true,
      'is-expanded': link
    });

    if(link){
      const content = link.html;
      const tags = take(shuffle(link.keywords.split(',')), 6);
      let preview = '';
      let borderColor = { borderColor: randomColor({ luminosity: 'bright' }) };

      return (
        <li className={linkClasses} style={borderColor}>
          <div className="ab-title">
            <a href={url} target="_blank">{link.title}</a>
          </div>
          <div className="ab-image">
            <img src={link.top_image}/>
          </div>
          <div className="ab-content" dangerouslySetInnerHTML={{__html: content}}></div>
          <div className="ab-keywords">
            {tags.map( tag => <span className="ab-tag" key={tag}><a href={tag}>#{tag}</a></span> )}
          </div>
          <hr className="ab-divider"/>
          <ul className="ab-links">
            {link.hrefs.map( url => <li className="childlink" onClick={() => onLinkClick(url)}>{url}</li> )}
          </ul>
        </li>
      );
    }
  }
}

const linksSelector = state => state.links;
const urlSelector = (state, props) => props.url;

const linkSelector = createSelector(
  linksSelector,
  urlSelector,
  (links, url) => {
    return {
      link: links[url]
    }
  }
);

const mapDispatchToProps = (dispatch) => {
  return {
    onLinkClick: (url) => {
      dispatch(fetchAbstract(url))
    }
  }
}

let Link = connect(linkSelector, mapDispatchToProps)(Node);
export default Link;
