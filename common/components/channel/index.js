import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { toggleChannelSelect } from '../../actions';

class Channel extends React.Component {
  render() {
    const { channel, onChannelClick } = this.props;

    const channelClasses = classNames({
      'channel': true,
      'is-selected': channel.is_selected,
      'is-loading': channel.is_loading,
      'channel__public': (channel.status == 'public'),
      'channel__closed': (channel.status == 'closed'),
      'channel__private': (channel.status == 'private'),
    });

    return (
      <div className={channelClasses} onClick={() => onChannelClick(channel)}>
        {channel.user.username} / {channel.title}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    channel: props.channel
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChannelClick: (channel) => {
      dispatch(toggleChannelSelect(channel));
    }
  }
}

let ConnectedChannel = connect(mapStateToProps, mapDispatchToProps)(Channel);
export default ConnectedChannel;
