import { fetchLocalLink } from '../api/local_link';
import { map } from 'lodash';
import { clearQueue } from '../lib/queue';

export const REQUEST_LINK = 'REQUEST_LINK';
export const RECEIVE_LINK = 'RECEIVE_LINK';
export const SELECT_LINK = 'SELECT_LINK';
export const PREVIEW_LINK = 'PREVIEW_LINK';
export const UNPREVIEW_LINK = 'UNPREVIEW_LINK';
export const PRELOAD_LINK_LINKS = 'PRELOAD_LINK_LINKS';

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

export function previewLink(href) {
  return {
    type: PREVIEW_LINK,
    href: href
  }
}

export function unpreviewLink() {
  return {
    type: UNPREVIEW_LINK
  }
}

export function preloadLinks(href) {
  return (dispatch, getState) => {
    const state = getState();
    let { link } = linkSelector(state, { url: href });
    if(link && link.hrefs.length){
      map(link.hrefs.slice(0, 10), (href) => {
        let { link } = linkSelector(state, { url: href });
        if(!link){
          dispatch(requestLink(href))
          fetchLocalLink(href).then(link => {
            dispatch(receiveLink(href, link))
          });
        }
      })
    }
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
