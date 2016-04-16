import { SCROLL_TO, SELECT_LINK } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case SELECT_LINK:
      return action.index;
    case SCROLL_TO:
      return action.index;
    default:
      return state;
  }
}
