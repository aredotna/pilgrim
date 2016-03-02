import getAbstract from '../api/abstract';

export const REQUEST_ABSTRACT = 'REQUEST_ABSTRACT';
export const RECEIVE_ABSTRACT = 'RECEIVE_ABSTRACT';

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

export function fetchAbstract(href, parent) {
  console.log('fetchAbstract', href, parent);
  return dispatch => {
    dispatch(requestAbstract(href))
    return getAbstract(href)
      .then(abstract => dispatch(receiveAbstract(href, abstract, parent)))
  }
}
