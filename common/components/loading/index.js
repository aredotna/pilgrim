import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

class Loading extends React.Component {
  render() {
    const { loading } = this.props;
    const loadingClasses = classNames({
      'loading--start': loading == 'start',
      'loading--done': loading == 'done',
      'l-loading': true
    });

    return (
      <div className={loadingClasses} title={loading}>
        <div className="loading--bar"></div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    loading: state.loading
  }
}

export default connect(mapStateToProps)(Loading);
