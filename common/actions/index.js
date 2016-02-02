import getAbstract from '../api/abstract';

export const REQUEST_ABSTRACT = 'REQUEST_ABSTRACT';
export const RECEIVE_ABSTRACT = 'RECEIVE_ABSTRACT';

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
  }
}

export function fetchAbstract(href) {
  return dispatch => {
    dispatch(requestAbstract(href))
    return getAbstract(href)
      .then(abstract => dispatch(receiveAbstract(href, abstract)))
  }
}
