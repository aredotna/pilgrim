import { default as React, PropTypes } from 'react';
import { map } from 'lodash';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import linkSelector from '../../selectors/link'

class PathItem extends React.Component {
  componentDidMount(){
    $('.path-list').animate({ scrollLeft: $('.path-list')[0].scrollWidth }, 100);
  }
  render() {
    const { link, onPathItemClick, url, preview_url } = this.props;
    const itemClasses = classNames({
      'path-list__item__wrap': true,
      'is-hovered': (url == preview_url)
    });

    return (
      <div className="path-list__item" key={url}>
        <div
          className={itemClasses}
          dangerouslySetInnerHTML={{__html: link.title}} />
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onPathItemClick: (url, parent) => {
      dispatch(fetchAbstract(url, parent))
    }
  }
}

export default connect(linkSelector, mapDispatchToProps)(PathItem);
