import { default as React, PropTypes } from 'react';
import { shuffle, take } from 'lodash';
import { connect } from 'react-redux';
import { fetchAbstract } from '../../actions';
import randomColor from 'randomcolor';
import classNames from 'classnames';

class Node extends React.Component {
  render() {
    const { link, dispatch, url } = this.props;

    const linkClasses = classNames({
      'linkAbstract': true,
      'is-expanded': link
    });

    if(link){
      const content = link.text.match(/[^\r\n]+/g);
      const tags = take(shuffle(link.keywords.split(',')), 6);
      let preview = '';
      let borderColor = { borderColor: randomColor({ luminosity: 'light' }) };

      if(content !== undefined){
        preview = content[0];
      }

      return (
        <li className={linkClasses} style={borderColor}>
          <div className="ab-title">
            <a href={url} target="_blank">{link.title}</a>
          </div>
          <div className="ab-content" dangerouslySetInnerHTML={{__html: preview}}></div>
          <div className="ab-keywords">
            {tags.map( tag => <span className="ab-tag" key={tag}><a href={tag}>#{tag}</a></span> )}
          </div>
          <hr className="ab-divider"/>
          <ul className="ab-links">
            {link.hrefs.map( url => <Link key={url} url={url} dispatch={dispatch} /> )}
          </ul>
        </li>
      );
    }else{
      return (
        <li className="childlink" onClick={() => dispatch(fetchAbstract(url))}>{url}</li>
      );
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    link: state.links[ownProps.url],
  }
}

let Link = connect(mapStateToProps)(Node);
export default Link;
