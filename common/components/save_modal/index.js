import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { closeSaveModal } from '../../actions';
import LoginForm from '../login_form/index.js';
import SavePathToChannels from '../save_path_to_channels/index.js';

const { APP_URL } = process.env;

class SaveContentsModal extends React.Component {
  render() {
    const {
      onModalClose,
      save_modal,
      current_user
    } = this.props;

    const modalClasses = classNames({
      'l-save-modal': true,
      'is-active': save_modal
    });

    if(current_user.properties){
       return (
        <div className={modalClasses}>
          <span className="save-modal__close" onClick={onModalClose}>&times;</span>
          <SavePathToChannels />
        </div>
      );
    }else{
      return (
        <div className={modalClasses}>
          <span className="save-modal__close" onClick={onModalClose}>&times;</span>
          <LoginForm />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    save_modal: state.save_modal,
    current_user: state.current_user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onModalClose: () => {
      dispatch(closeSaveModal());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveContentsModal);
