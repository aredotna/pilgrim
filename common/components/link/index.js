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
      const content = link.text.match(/[^\r\n]+/g);
      const tags = take(shuffle(link.keywords.split(',')), 6);
      let preview = '';
      let borderColor = { borderColor: randomColor({ luminosity: 'bright' }) };

      if(content !== undefined){
        preview = `<p>${content[0]}</p><p>${content[1]}</p>`;
      }

      return (
        <li className={linkClasses} style={borderColor}>
          <div className="ab-title">
            <a href={url} target="_blank">{link.title}</a>
          </div>
          <div className="ab-image">
            <img src={link.top_image}/>
          </div>
          <div className="ab-content" dangerouslySetInnerHTML={{__html: preview}}></div>
          <div className="ab-keywords">
            {tags.map( tag => <span className="ab-tag" key={tag}><a href={tag}>#{tag}</a></span> )}
          </div>
          <hr className="ab-divider"/>
          <ul className="ab-links">
            {link.hrefs.map( url => <Link key={url} url={url} /> )}
          </ul>
        </li>
      );
    }else{
      return (
        <li className="childlink" onClick={() => onLinkClick(url)}>{url}</li>
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
      console.log('onLinkClick', url);
      dispatch(fetchAbstract(url))
    }
  }
}

let Link = connect(linkSelector, mapDispatchToProps)(Node);
export default Link;
