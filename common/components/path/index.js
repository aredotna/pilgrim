import { default as React, PropTypes } from 'react';
import { map } from 'lodash';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { scrollTo, highlightLink, toggleViewMode } from '../../actions';
import classNames from 'classnames';
import linkSelector from '../../selectors/link';

class PathItem extends React.Component {
  componentDidMount(){
    const {
      url,
      onPathItemClick,
      index
    } = this.props;

    $('.path-list').animate({ scrollLeft: $('.path-list')[0].scrollWidth }, 100);
  }
  render() {
    const { link, index, onPathItemClick, url, highlighted_link, will_be_chopped } = this.props;
    const itemClasses = classNames({
      'path-list__item': true,
      'is-hovered': (url == highlighted_link),
      'will-be-chopped': will_be_chopped
    });

    return (
      <div className={itemClasses} key={url} onClick={() => onPathItemClick(index, url)}>
        <div
          className="path-list__item__wrap"
          dangerouslySetInnerHTML={{__html: link.title}} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPathItemClick: (index, url) => {
      dispatch(scrollTo(index));
      dispatch(highlightLink(url));
      dispatch(toggleViewMode('explore'));
    },
  }
}

export default connect(linkSelector, mapDispatchToProps)(PathItem);
