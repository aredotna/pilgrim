import { default as React, PropTypes, } from 'react';
import { shuffle, take } from 'lodash';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import {
  fetchLink,
  hoverLink,
  unhoverLink,
  hoverLinkAnchor,
  unhoverLinkAnchor,
  preloadLinks
} from '../../actions';
import classNames from 'classnames';
import Swipeable from 'react-swipeable';
import linkSelector from '../../selectors/link';

class Link extends React.Component {
  componentDidMount(){
    const {
      onLinkClick,
      url,
      onLinkHover,
      onLinkUnhover,
      onLinkAnchorHover,
      onLinkAnchorUnhover,
      link,
      onLinkLoad
    } = this.props;

    const $linkEl = $(findDOMNode(this));

    // handle clicks
    $linkEl.on('click', 'a:not(.no-intercept)', function(e){
      e.preventDefault();
      const $target = $(e.currentTarget);
      const href = $target.attr('href');
      if(href.indexOf('.pdf') > 0){
        window.open(href, '_blank');
      }else{
        $linkEl.find('a.is-active').removeClass('is-active');
        $target.addClass('is-active');
        onLinkClick(href, url);
      }
    });

    // handle hovers
    $linkEl.hover(function(e){
      e.preventDefault();
      onLinkHover(url);
    }, function(e){
      e.preventDefault();
      onLinkUnhover();
    });

    $linkEl.find('a:not(.no-intercept)').hover(function(e){
      e.preventDefault();
      const href = $(e.currentTarget).attr('href');
      onLinkAnchorHover(href);
    }, function(e){
      e.preventDefault();
      onLinkAnchorUnhover();
    });

    // scroll to link (always at the end)
    $('.l-links').animate({ scrollLeft: $('.l-links')[0].scrollWidth }, 100);
  }

  render() {
    const { link, onLinkClick, url, preview_url, will_be_chopped } = this.props;
    const noContent = !link.html || link.html.length < 200 ;
    const title = link.title;

    const linkClasses = classNames({
      'link': true,
      'is-expanded': link,
      'has-no-content': noContent,
      'is-hovered': (url == preview_url),
      'will-be-chopped': will_be_chopped
    });

    if(link && !noContent){
      const content = link.html;

      return (
        <Swipeable
          className={linkClasses}
          id={encodeURIComponent(url)}
          data-host={link.host}
          >
          <div className="link-title">
            <a className="link-title__link no-intercept" href={url} target="_blank" dangerouslySetInnerHTML={{__html: title}}></a>
            <a className="link-title__domain no-intercept" href={url} target="_blank">{url}</a>
          </div>
          <div className="link-content" dangerouslySetInnerHTML={{__html: content}}></div>
        </Swipeable>
      );
    }else if(link || noContent){
      return (
        <Swipeable id={url} className={linkClasses}>
          <div className="link-title">
            <a className="link-title__link" href={url} target="_blank" dangerouslySetInnerHTML={{__html: title}}></a>
          </div>
          <div className="link-content__error">
            Pilgrim can't parse any content from this link, try <a href={url} target="_blank" className="no-intercept">opening this page in a normal tab</a>.
          </div>
        </Swipeable>
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
    onLinkAnchorHover: (href) => {
      dispatch(hoverLinkAnchor(href))
    },
    onLinkAnchorUnhover: () => {
      dispatch(unhoverLinkAnchor())
    },
    onLinkLoad: (url) => {
      dispatch(preloadLinks(url))
    }
  }
}

let ConnectedLink = connect(linkSelector, mapDispatchToProps)(Link);
export default ConnectedLink;
