import { fetchLocalLink } from '../api/local_link';
import { map } from 'lodash';
import { clearQueue } from '../lib/queue';

export const REQUEST_LINK = 'REQUEST_LINK';
export const RECEIVE_LINK = 'RECEIVE_LINK';
export const SELECT_LINK = 'SELECT_LINK';
export const HOVER_LINK = 'HOVER_LINK';
export const UNHOVER_LINK = 'UNHOVER_LINK';
export const HOVER_LINK_ANCHOR = 'HOVER_LINK_ANCHOR';
export const UNHOVER_LINK_ANCHOR = 'UNHOVER_LINK_ANCHOR';

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
          dispatch(receiveLink(href, link))
          dispatch(selectLink(href, link, parent))
        });
    }
  }
}
