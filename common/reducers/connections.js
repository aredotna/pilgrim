import { OPEN_SAVE_MODAL, RECEIVE_CHANNELS, TOGGLE_CHANNEL_SELECT } from '../actions';
import { map, sortBy, concat, filter, compact, slice } from 'lodash';

export function getRecentConnections() {
  const recentConnections = localStorage.getItem('RecentConnections');
  if (!recentConnections) return [];
  const ids = recentConnections.split(',').slice(0, 3);
  return map(ids, (id) => {
    return JSON.parse(localStorage.getItem(`RecentConnections-${id}`));
  });
}

export default (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_CHANNEL_SELECT:
      let selected = map(state, (channel) => {
        if (channel.id == action.channel.id) {
          const selected = channel.is_selected ? false : true;
          return Object.assign({}, channel, { is_selected: selected });
        }
        return channel;
      });
      return selected;
    case RECEIVE_CHANNELS:
      const allChannels = compact(concat(filter(state, 'is_selected'), action.channels));
      return slice(sortBy(allChannels, ['is_selected']), 0, 3);
    case OPEN_SAVE_MODAL:
      return getRecentConnections();
    default:
      return state;
  }
}
