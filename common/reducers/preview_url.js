import { PREVIEW_ABSTRACT, UNPREVIEW_ABSTRACT } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case PREVIEW_ABSTRACT:
      return action.href;
    case UNPREVIEW_ABSTRACT:
      return false;
    default:
      return state;
  }
}
