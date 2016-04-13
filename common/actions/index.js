import { fetchLocalLink } from '../api/local_link';
import { saveLocalPath } from '../api/local_path';
import { map, pick } from 'lodash';
import { clearQueue } from '../lib/queue';

export const REQUEST_LINK = 'REQUEST_LINK';
export const RECEIVE_LINK = 'RECEIVE_LINK';
export const SELECT_LINK = 'SELECT_LINK';
export const HOVER_LINK = 'HOVER_LINK';
export const UNHOVER_LINK = 'UNHOVER_LINK';
export const HOVER_LINK_ANCHOR = 'HOVER_LINK_ANCHOR';
export const UNHOVER_LINK_ANCHOR = 'UNHOVER_LINK_ANCHOR';
export const REQUEST_PATH_LINK = 'REQUEST_PATH_LINK';
export const RECEIVE_PATH_LINK = 'RECEIVE_PATH_LINK';
export const TOGGLE_VIEW_MODE = 'TOGGLE_VIEW_MODE';

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

function selectLink(href, link, parent) {
  return {
    type: SELECT_LINK,
    href: href,
    link: link,
    parent: parent
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

export function hoverLinkAnchor(href){
  return {
    type: HOVER_LINK_ANCHOR,
    href: href
  }
}

export function unhoverLinkAnchor(){
  return {
    type: UNHOVER_LINK_ANCHOR
  }
}

export function requestPathLink(){
  return {
    type: REQUEST_PATH_LINK
  }
}

export function receivePathLink(id){
  return {
    type: RECEIVE_PATH_LINK,
    id: id
  }
}

export function toggleViewMode(mode){
  return {
    type: TOGGLE_VIEW_MODE,
    mode: mode
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

export function fetchLink(href, parent) {
  return (dispatch, getState) => {
    const state = getState();
    let link = linkSelector(state, { url: href });
    clearQueue();
    if(link.link){
      return dispatch(selectLink(href, link.link, parent));
    } else {
      dispatch(requestLink(href))
      return fetchLocalLink(href)
        .then(link => {
          dispatch(receiveLink(href, link));
          dispatch(selectLink(href, link, parent));
        });
    }
  }
}
