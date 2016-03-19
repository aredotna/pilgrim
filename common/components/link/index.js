import { default as React, PropTypes, } from 'react';
import { shuffle, take } from 'lodash';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import {
  fetchLink,
  previewLink,
  unpreviewLink,
  preloadLinks
} from '../../actions';
import classNames from 'classnames';
import linkSelector from '../../selectors/link'

class Link extends React.Component {
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
    $(findDOMNode(this)).on('click', 'a:not(.link-title__link)', function(e){
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

    // scroll to link
    findDOMNode(this).scrollIntoView();
  }
  render() {
    const { link, onLinkClick, url } = this.props;
    const hasError = link.html.indexOf('Error converting html to string.') > -1;
    const title = link.title.replace(' - Wikipedia, the free encyclopedia', '');

    const linkClasses = classNames({
      'link': true,
      'is-expanded': link,
      'has-error': hasError
    });

    if(link && !hasError){
      const content = link.html.replace('Advertisement', '').replace('From Wikipedia, the free encyclopedia', '');

      return (
        <li id={url} className={linkClasses}>
          <div className="link-title">
            <a className="link-title__link" href={url} target="_blank" dangerouslySetInnerHTML={{__html: title}}></a>
          </div>
          <div className="link-content" dangerouslySetInnerHTML={{__html: content}}></div>
        </li>
      );
    }else if(link && hasError){
      return (
        <li id={url} className={linkClasses}>
          <div className="link-title">
            <a className="link-title__link" href={url} target="_blank" dangerouslySetInnerHTML={{__html: title}}></a>
          </div>
          <div className="link-content">
            <h2> Pilgrim can't parse this link </h2>
          </div>
        </li>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLinkClick: (url, parent) => {
      dispatch(fetchLink(url, parent))
    },
    onLinkHover: (url) => {
      dispatch(previewLink(url))
    },
    onLinkUnhover: () => {
      dispatch(unpreviewLink())
    },
    onLinkLoad: (url) => {
      dispatch(preloadLinks(url))
    }
  }
}

let ConnectedLink = connect(linkSelector, mapDispatchToProps)(Link);
export default ConnectedLink;
