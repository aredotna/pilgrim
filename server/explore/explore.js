import { default as React, PropTypes } from 'react';
import { map } from 'lodash';
import { connect } from 'react-redux';
import Link from '../../common/components/link/index';

const { APP_URL } = process.env;

class Explore extends React.Component {

  render() {
    const { links } = this.props;
    return (
      <ul className='l-abstract'>
        {map(links, (value, url) => <Link key={url} url={url} /> )}
      </ul>
    );
  }
}


function mapStateToProps(state) {
  return {
    links: state.links
  }
}

Explore = connect(mapStateToProps)(Explore);
export default Explore;
