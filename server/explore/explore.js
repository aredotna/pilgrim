import { default as React, PropTypes } from 'react';
import { map } from 'lodash';
import { connect } from 'react-redux';
import Link from '../../common/components/link/index';
import PathItem from '../../common/components/path/index';
import SavedPathLink from '../../common/components/saved_path_link/index';
import SavePathContentsLink from '../../common/components/save_path_contents/index';
import Loading from '../../common/components/loading/index';
import PathMap from '../../common/components/path_map/index';
import ViewMode from '../../common/components/view_mode/index';
import ScrollPosition from '../../common/components/scroll_position/index';
import SaveContentsModal from '../../common/components/save_modal/index';

class Explore extends React.Component {

  render() {
    const { path, preview_url, view_mode } = this.props;

    return (
      <div className="l-explore">
        <div className="l-path">
          <div className="path-list">
            {map(path, (url) => <PathItem url={url} key={url} /> )}
          </div>
          <SavedPathLink />
          <SavePathContentsLink />
        </div>
        <Loading />
        <div className="l-contents">
          {(() => {
            if (view_mode == 'explore') {
              return (
                <ul className='l-links'>
                  {map(path, (url) => <Link key={url} url={url} /> )}
                </ul>
              );
            } else {
              return (
                <div className="l-map">
                  <PathMap />
                </div>
              );
            }
          })()}
        </div>
        <div className="l-view-mode">
          <ViewMode />
        </div>
        <ScrollPosition />
        <SaveContentsModal />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    path: state.path,
    preview_url: state.preview_url,
    view_mode: state.view_mode
  }
}

Explore = connect(mapStateToProps)(Explore);
export default Explore;
