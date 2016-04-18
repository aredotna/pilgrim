import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux';
import { map, debounce, find } from 'lodash';
import Channel from '../channel/index';
import {
  searchChannels,
  closeSaveModal,
  saveConnections
} from '../../actions';

class SavePathToChannels extends React.Component {
  render() {
    const {
      onLinkClick,
      onCloseDialog,
      onInputChange,
      onSaveConnections,
      connections,
      path,
    } = this.props;

    return (
      <div className="l-save-path-to-channels save-dialog">
        <h1 className="save-dialog__headline">
          Save {path.length} URL{path.length == 1 ? '' : 's'} to <strong>Are.na?</strong>
        </h1>
        <div className="save-dialog__search">
          <input type="text" placeholder="Search channels" onChange={onInputChange} />
        </div>
        <div className="save-dialog__caption">
          Recent channels
        </div>
        <div className="save-dialog__channels">
          {map(connections, (connection) => <Channel channel={connection} key={connection.id} />)}
        </div>
        <div className="save-dialog__save">
          {(() => {
            if (find(connections, 'is_selected')) {
              return (
                <button onClick={onSaveConnections}>Save and Close</button>
              );
            }
            return (<button onClick={onCloseDialog}>Close</button>);
          })()}
        </div>
      </div>
    );
  }
}

const fetchResults = (dispatch, value) => {
  dispatch(searchChannels(value));
}
const delayFetchResults = debounce(fetchResults, 400);

const mapStateToProps = (state) => {
  return {
    connections: state.connections,
    any_selected: find(state.connections, 'is_selected'),
    path: state.path,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLinkClick: () => {
      dispatch();
    },
    onInputChange: (event) => {
      delayFetchResults(dispatch, event.target.value);
    },
    onCloseDialog: () => {
      dispatch(closeSaveModal());
    },
    onSaveConnections: () => {
      dispatch(saveConnections());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavePathToChannels);
