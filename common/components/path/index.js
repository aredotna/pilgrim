import { default as React, PropTypes } from 'react';
import { map } from 'lodash';
import { connect } from 'react-redux';
import stripTitle from '../../lib/strip_title';

class Path extends React.Component {
  render() {
    const { path, links } = this.props;
    return (
      <div className='path-list'>
        {path.map(url =>
          <div className="path-list__item" key={url}>
            <div className="path-list__item__wrap" key={url}>
              {stripTitle(links[url].title)}
            </div>
          </div>
        )}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    path: state.path,
    links: state.links
  }
}

Path = connect(mapStateToProps)(Path);
export default Path;
