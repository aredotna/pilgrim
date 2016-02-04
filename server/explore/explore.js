import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux';
import Link from '../../common/components/link/index';

const { APP_URL } = process.env;

class Explore extends React.Component {

  render() {
    const { dispatch, rootLink, links } = this.props;
    let link = links[rootLink];

    return (
      <ul className='l-abstract'>
        <Link key={rootLink} url={rootLink} link={link} links={links} dispatch={dispatch} />
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    rootLink: state.rootLink,
    links: state.links
  }
}

export default connect(mapStateToProps)(Explore);
