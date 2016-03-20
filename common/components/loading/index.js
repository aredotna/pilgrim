import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Star from './star';

class Loading extends React.Component {
  render() {
    const { loading } = this.props;
    const loadingClasses = classNames({
      'is-loading': loading,
      'l-loading': true
    });

    return (
      <div className={loadingClasses} title={loading}>
        <div className="loading-star loading-star__left">
          <Star />
        </div>
        <div className="loading-star loading-star__right">
          <Star />
        </div>
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
