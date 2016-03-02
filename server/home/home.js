import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux';
import snippet from './snippet'

class Home extends React.Component {
  render() {
    const { dispatch, abstract } = this.props;

    return (
      <div className='l-home'>
        <p>
          <strong>Drag the link below to your bookmarks bar</strong>
        </p>
        <a href={snippet}>⇨ Pilgrimage</a>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    abstract: state.abstract
  }
}

export default connect(mapStateToProps)(Home);
