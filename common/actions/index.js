import Q from 'bluebird-q';
import { fetchLocalLink } from '../api/local_link';
import { saveLocalPath } from '../api/local_path';
import { queryChannels } from '../api/query_channels';
import { postConnections } from '../api/post_connections';
import { map, pick, filter, indexOf } from 'lodash';
import { clearQueue } from '../lib/queue';

export const REQUEST_LINK = 'REQUEST_LINK';
export const RECEIVE_LINK = 'RECEIVE_LINK';
export const START_LOADING = 'START_LOADING';
export const STOP_LOADING = 'STOP_LOADING';
export const SELECT_LINK = 'SELECT_LINK';
export const HOVER_LINK = 'HOVER_LINK';
export const UNHOVER_LINK = 'UNHOVER_LINK';
export const HOVER_LINK_ANCHOR = 'HOVER_LINK_ANCHOR';
export const UNHOVER_LINK_ANCHOR = 'UNHOVER_LINK_ANCHOR';
export const REQUEST_PATH_LINK = 'REQUEST_PATH_LINK';
export const RECEIVE_PATH_LINK = 'RECEIVE_PATH_LINK';
export const TOGGLE_VIEW_MODE = 'TOGGLE_VIEW_MODE';
export const SCROLL_TO = 'SCROLL_TO';
export const OPEN_SAVE_MODAL = 'OPEN_SAVE_MODAL';
export const CLOSE_SAVE_MODAL = 'CLOSE_SAVE_MODAL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const REQUEST_CHANNELS = 'REQUEST_CHANNELS';
export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const TOGGLE_CHANNEL_SELECT = 'TOGGLE_CHANNEL_SELECT';

import linkSelector from '../selectors/link';

function requestLink(href) {
  return {
    type: REQUEST_LINK,
    href: href
  }
}

function receiveLink(href, link) {
  return {
    type: RECEIVE_LINK,
    href: href,
    link: link,
    parent: parent
  }
}

function selectLink(href, link, parent, index) {
  return {
    type: SELECT_LINK,
    href: href,
    link: link,
    parent: parent,
    index: index
  }
}

export function hoverLink(href) {
  return {
    type: HOVER_LINK,
    href: href
  }
}

export function unhoverLink() {
  return {
    type: UNHOVER_LINK
  }
}

export function hoverLinkAnchor(href) {
  return {
    type: HOVER_LINK_ANCHOR,
    href: href
  }
}

export function unhoverLinkAnchor() {
  return {
    type: UNHOVER_LINK_ANCHOR
  }
}

export function requestPathLink() {
  return {
    type: REQUEST_PATH_LINK
  }
}

export function receivePathLink(id) {
  return {
    type: RECEIVE_PATH_LINK,
    id: id
  }
}

export function toggleViewMode(mode) {
  return {
    type: TOGGLE_VIEW_MODE,
    mode: mode
  }
}

export function scrollTo(index) {
  return {
    type: SCROLL_TO,
    index: index
  }
}

export function openSaveModal() {
  return {
    type: OPEN_SAVE_MODAL
  }
}

export function closeSaveModal() {
  return {
    type: CLOSE_SAVE_MODAL
  }
}

export function startLoading() {
  return {
    type: START_LOADING
  }
}

export function stopLoading() {
  return {
    type: STOP_LOADING
  }
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  }
}

export function requestChannels(value) {
  return {
    type: REQUEST_CHANNELS,
    value
  }
}

export function receiveChannels(channels) {
  return {
    type: RECEIVE_CHANNELS,
    channels
  }
}

export function toggleChannelSelect(channel) {
  return {
    type: TOGGLE_CHANNEL_SELECT,
    channel: channel
  }
}

export function searchChannels(term) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(requestChannels(term));
    return queryChannels(term, state.current_user.properties.access_token)
      .then((channels) => {
        dispatch(receiveChannels(channels));
      });
  }
}

export function saveConnections() {
  return (dispatch, getState) => {
    const state = getState();
    const channel_ids = map(filter(state.connections, 'is_selected'), 'slug');
    dispatch(startLoading());
    Q.all(map(state.path, (url) => {
      return postConnections(channel_ids, url, state.current_user.properties.access_token);
    })).then(() => {
      dispatch(stopLoading());
      dispatch(closeSaveModal());
    }).catch(() => {
      dispatch(stopLoading());
      dispatch(closeSaveModal());
    });
  }
}

export function generatePathLink() {
  return (dispatch, getState) => {
    const state = getState();
    const linkData = pick(state, ['root_link', 'path']);
    dispatch(requestPathLink())
    return saveLocalPath(linkData)
      .then(({ id }) => {
        dispatch(receivePathLink(id));
      });
  }
}

export function fetchLink(href, parent, index) {
  return (dispatch, getState) => {
    const state = getState();
    let link = linkSelector(state, { url: href });
    clearQueue();
    if(link.link){
      let index = indexOf(state.path, href);
      return dispatch(selectLink(href, link.link, parent, index));
    } else {
      dispatch(requestLink(href))
      return fetchLocalLink(href)
        .then(link => {
          dispatch(receiveLink(href, link));
          dispatch(selectLink(href, link, parent, index + 1));
        }).catch((e) => { console.log('error', e) });
    }
  }
}
