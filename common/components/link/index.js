import { default as React, PropTypes, } from 'react';
import { shuffle, take } from 'lodash';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import {
  fetchAbstract,
  previewAbstract,
  unpreviewAbstract,
  preloadAbstractLinks
} from '../../actions';
import classNames from 'classnames';
import linkSelector from '../../selectors/link'

class Node extends React.Component {
  componentDidMount(){
    const {
      onLinkClick,
      url,
      onLinkHover,
      onLinkUnhover,
      link,
      onLinkLoad
    } = this.props;

    // handle clicks
    $(findDOMNode(this)).on('click', 'a:not(.ab-title__link)', function(e){
      e.preventDefault();
      const href = $(e.currentTarget).attr('href');
      if(href.indexOf('.pdf') > 0){
        window.open(href, '_blank');
      }else{
        onLinkClick(href, url);
      }
    });

    // handle hovers
    $(findDOMNode(this)).find('a').hover(function(e){
      e.preventDefault();
      onLinkHover($(e.currentTarget).attr('href'));
    }, function(e){
      e.preventDefault();
      onLinkUnhover();
    });

    // preload links
    onLinkLoad(url);
  }
  render() {
    const { link, onLinkClick, url } = this.props;

    const linkClasses = classNames({
      'linkAbstract': true,
      'is-expanded': link
    });

    if(link){
      const title = link.title.replace(' - Wikipedia, the free encyclopedia', '');
      const content = link.html.replace('Advertisement', '').replace('From Wikipedia, the free encyclopedia', '');
      const tags = take(shuffle(link.keywords.split(',')), 6);

      return (
        <li id={url} className={linkClasses}>
          <div className="ab-title">
            <a className="ab-title__link" href={url} target="_blank" dangerouslySetInnerHTML={{__html: title}}></a>
          </div>
          <div className="ab-content" dangerouslySetInnerHTML={{__html: content}}></div>
        </li>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLinkClick: (url, parent) => {
      dispatch(fetchAbstract(url, parent))
    },
    onLinkHover: (url) => {
      dispatch(previewAbstract(url))
    },
    onLinkUnhover: () => {
      dispatch(unpreviewAbstract())
    },
    onLinkLoad: (url) => {
      dispatch(preloadAbstractLinks(url))
    }
  }
}

let Link = connect(linkSelector, mapDispatchToProps)(Node);
export default Link;
