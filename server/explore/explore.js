import { default as React, PropTypes } from 'react';
import { map } from 'lodash';
import { connect } from 'react-redux';
import Link from '../../common/components/link/index';
import Path from '../../common/components/path/index';

const { APP_URL } = process.env;

class Explore extends React.Component {

  render() {
    const { path } = this.props;
    return (
      <div>
        <div className="l-path">
          <Path />
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
    path: state.path
  }
}

Explore = connect(mapStateToProps)(Explore);
export default Explore;
