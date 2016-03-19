import { default as React, PropTypes } from 'react';
import { map } from 'lodash';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import linkSelector from '../../selectors/link'

class PathItem extends React.Component {
  componentDidMount(){
    findDOMNode(this).scrollIntoView();
  }
  render() {
    const { link, onPathItemClick, url } = this.props;
    return (
      <div className="path-list__item" key={url}>
        <div
          className="path-list__item__wrap"
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
