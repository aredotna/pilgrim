import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux';
import { generatePathLink } from '../../actions';
import classNames from 'classnames';

const { APP_URL } = process.env;

class SavedPathLink extends React.Component {
  render() {
    const { path_url, onLinkClick } = this.props;

    if(!path_url){
      return (
        <div className="saved-path-link">
          <span onClick={onLinkClick}>Link to this path</span>
        </div>
      );
    }else{
      const generatedLink = `${APP_URL}path/${path_url}`;
      return (
        <div className="saved-path-link">
          <input type="text" value={generatedLink} readOnly="true" />
        </div>
      );
    }
  }
}


const mapStateToProps = (state) => {
  return {
    path_url: state.path_url,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLinkClick: () => {
      dispatch(generatePathLink());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedPathLink);
