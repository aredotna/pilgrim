import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux';
import Link from '../../common/components/link/index';

const { APP_URL } = process.env;

class Explore extends React.Component {
  render() {
    const { dispatch, abstract, href } = this.props;

    return (
      <ul className='l-abstract'>
        <Link key={href} href={href} abstract={abstract} />
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    abstract: state.abstract,
    href: state.href
  }
}

export default connect(mapStateToProps)(Explore);
