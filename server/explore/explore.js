import { default as React, PropTypes } from 'react';
import { map } from 'lodash';
import { connect } from 'react-redux';
import Link from '../../common/components/link/index';
import PathItem from '../../common/components/path/index';
import SavedPathLink from '../../common/components/saved_path_link/index';
import Loading from '../../common/components/loading/index';

class Explore extends React.Component {

  render() {
    const { path, preview_url } = this.props;
    return (
      <div className="l-explore">
        <div className="l-path">
          <div className="path-list">
            {map(path, (url) => <PathItem url={url} key={url} /> )}
          </div>
          <Loading />
          <SavedPathLink />
        </div>
        <ul className='l-links'>
          {map(path, (url) => <Link key={url} url={url} /> )}
        </ul>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    path: state.path,
    preview_url: state.preview_url
  }
}

Explore = connect(mapStateToProps)(Explore);
export default Explore;
