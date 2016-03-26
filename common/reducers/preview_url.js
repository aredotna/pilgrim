import { HOVER_LINK, UNHOVER_LINK } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case HOVER_LINK:
      return action.href;
    case UNHOVER_LINK:
      return false;
    default:
      return state;
  }
}
