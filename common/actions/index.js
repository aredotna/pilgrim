import getAbstract from '../api/abstract';

export const REQUEST_ABSTRACT = 'REQUEST_ABSTRACT';
export const RECEIVE_ABSTRACT = 'RECEIVE_ABSTRACT';
export const PREVIEW_ABSTRACT = 'PREVIEW_ABSTRACT';
export const UNPREVIEW_ABSTRACT = 'UNPREVIEW_ABSTRACT';

import linkSelector from '../selectors/link';

function requestAbstract(href) {
  return {
    type: REQUEST_ABSTRACT,
    href
  }
}

function receiveAbstract(href, abstract, parent) {
  return {
    type: RECEIVE_ABSTRACT,
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

export function fetchAbstract(href, parent) {
  return (dispatch, getState) => {
    const state = getState();
    let abstract = linkSelector(state, { url: href });
    if(abstract.link){
      return dispatch(receiveAbstract(href, abstract.link, parent));
    } else {
      dispatch(requestAbstract(href))
      return getAbstract(href)
        .then(abstract => dispatch(receiveAbstract(href, abstract, parent)));
    }
  }
}
