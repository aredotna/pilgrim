import { default as React, PropTypes } from 'react';
import { map } from 'lodash';
import { connect } from 'react-redux';
import Link from '../../common/components/link/index';
import PreviewLink from '../../common/components/link/preview_link';
import PathItem from '../../common/components/path/index';

const { APP_URL } = process.env;

// <PreviewLink key={preview_url} url={preview_url} />

class Explore extends React.Component {

  render() {
    const { path, preview_url } = this.props;
    return (
      <div className="l-explore">
        <div className="l-path path-list">
          {map(path, (url) => <PathItem url={url} key={url} /> )}
        </div>
        <ul className='l-abstract'>
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
