import { fetchLocalAbstract } from '../api/abstract';
import { map } from 'lodash';
import $ from 'jquery';
import ajaxq from 'ajaxq';

export const REQUEST_ABSTRACT = 'REQUEST_ABSTRACT';
export const RECEIVE_ABSTRACT = 'RECEIVE_ABSTRACT';
export const SELECT_ABSTRACT = 'SELECT_ABSTRACT';
export const PREVIEW_ABSTRACT = 'PREVIEW_ABSTRACT';
export const UNPREVIEW_ABSTRACT = 'UNPREVIEW_ABSTRACT';
export const PRELOAD_ABSTRACT_LINKS = 'PRELOAD_ABSTRACT_LINKS';

import linkSelector from '../selectors/link';

function requestAbstract(href) {
  return {
    type: REQUEST_ABSTRACT,
    href
  }
}

function receiveAbstract(href, abstract) {
  return {
    type: RECEIVE_ABSTRACT,
    href: href,
    abstract: abstract,
    parent: parent
  }
}

function selectAbstract(href, abstract, parent) {
  return {
    type: SELECT_ABSTRACT,
    href: href,
    abstract: abstract,
    parent: parent
  }
}

export function previewAbstract(href) {
  return {
    type: PREVIEW_ABSTRACT,
    href: href
  }
}

export function unpreviewAbstract() {
  return {
    type: UNPREVIEW_ABSTRACT
  }
}

export function preloadAbstractLinks(href) {
  return (dispatch, getState) => {
    const state = getState();
    let { link } = linkSelector(state, { url: href });
    if(link && link.hrefs.length){
      map(link.hrefs.slice(0, 10), (href) => {
        let { link } = linkSelector(state, { url: href });
        if(!link){
          dispatch(requestAbstract(href))
          fetchLocalAbstract(href).then(abstract => {
            dispatch(receiveAbstract(href, abstract))
          });
        }
      })
    }
  }
}

export function fetchAbstract(href, parent) {
  return (dispatch, getState) => {
    const state = getState();
    let abstract = linkSelector(state, { url: href });
    if(abstract.link){
      return dispatch(selectAbstract(href, abstract.link, parent));
    } else {
      $.ajaxq.abort('pilgrim');
      dispatch(requestAbstract(href))
      return fetchLocalAbstract(href)
        .then(abstract => {
          dispatch(receiveAbstract(href, abstract))
          dispatch(selectAbstract(href, abstract, parent))
        });
    }
  }
}
