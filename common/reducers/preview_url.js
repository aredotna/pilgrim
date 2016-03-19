import { PREVIEW_LINK, UNPREVIEW_LINK } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case PREVIEW_LINK:
      return action.href;
    case UNPREVIEW_LINK:
      return false;
    default:
      return state;
  }
}
