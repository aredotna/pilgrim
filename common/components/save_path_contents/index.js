import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux';
import { openSaveModal } from '../../actions';
import AddToArena from './add_to_arena';

const { APP_URL } = process.env;

class SavePathContentsLink extends React.Component {
  render() {
    const { onLinkClick } = this.props;

    return (
      <div className="save-contents-link">
        <span onClick={onLinkClick}>
          <AddToArena />
        </span>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLinkClick: () => {
      dispatch(openSaveModal());
    }
  }
}

export default connect(null, mapDispatchToProps)(SavePathContentsLink);
