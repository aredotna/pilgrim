import { default as React, PropTypes, } from 'react';
import { shuffle, take } from 'lodash';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import {
  fetchLink,
  hoverLink,
  unhoverLink,
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
    $(findDOMNode(this)).on('click', 'a:not(.no-intercept)', function(e){
      e.preventDefault();
      const href = $(e.currentTarget).attr('href');
      if(href.indexOf('.pdf') > 0){
        window.open(href, '_blank');
      }else{
        onLinkClick(href, url);
      }
    });

    // handle hovers
    $(findDOMNode(this)).hover(function(e){
      e.preventDefault();
      onLinkHover(url);
    }, function(e){
      e.preventDefault();
      onLinkUnhover();
    });

    // scroll to link
    $('.l-links').animate({ scrollLeft: $('.l-links')[0].scrollWidth }, 100);
  }
  render() {
    const { link, onLinkClick, url, preview_url } = this.props;
    const noContent = link.html.length < 200;
    const title = link.title.replace(' - Wikipedia, the free encyclopedia', '');

    const linkClasses = classNames({
      'link': true,
      'is-expanded': link,
      'has-no-content': noContent,
      'is-hovered': (url == preview_url)
    });

    if(link && !noContent){
      const content = link.html.replace('Advertisement', '').replace('From Wikipedia, the free encyclopedia', '');
      return (
        <li id={url} className={linkClasses}>
          <div className="link-title">
            <a className="link-title__link no-intercept" href={url} target="_blank" dangerouslySetInnerHTML={{__html: title}}></a>
            <a className="link-title__domain no-intercept" href={url} target="_blank">{url}</a>
          </div>
          <div className="link-content" dangerouslySetInnerHTML={{__html: content}}></div>
        </li>
      );
    }else if(link || noContent){
      return (
        <li id={url} className={linkClasses}>
          <div className="link-title">
            <a className="link-title__link" href={url} target="_blank" dangerouslySetInnerHTML={{__html: title}}></a>
          </div>
          <div className="link-content__error">
            Pilgrim can't parse any content from this link, try <a href={url} target="_blank" className="no-intercept">opening this page in a normal tab</a>.
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
      dispatch(hoverLink(url))
    },
    onLinkUnhover: () => {
      dispatch(unhoverLink())
    },
    onLinkLoad: (url) => {
      dispatch(preloadLinks(url))
    }
  }
}

let ConnectedLink = connect(linkSelector, mapDispatchToProps)(Link);
export default ConnectedLink;
