import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux';
import Link from '../../common/components/link/index';

const { APP_URL } = process.env;

class Explore extends React.Component {

  render() {
    const { rootLink } = this.props;
    return (
      <ul className='l-abstract'>
        <Link key={rootLink} url={rootLink} />
      </ul>
    );
  }
}

export default Explore;
