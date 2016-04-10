import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleViewMode } from '../../actions';
import classNames from 'classnames';

const { APP_URL } = process.env;

class ViewMode extends React.Component {
  render() {
    const { view_mode, onLinkClick } = this.props;

    const viewModeClasses = classNames({
      'view-mode-link': true,
      'is-active': (view_mode == 'map')
    });

    let newMode = 'map';
    if (view_mode == 'map') {
      newMode = 'explore';
    }

    return (
      <div className={viewModeClasses} onClick={() => onLinkClick(newMode)}>
        Map
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    view_mode: state.view_mode,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLinkClick: (mode) => {
      dispatch(toggleViewMode(mode));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewMode);
