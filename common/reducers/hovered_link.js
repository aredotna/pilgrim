import { HOVER_LINK_ANCHOR, UNHOVER_LINK_ANCHOR } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case HOVER_LINK_ANCHOR:
      return action.href;
    case UNHOVER_LINK_ANCHOR:
      return false;
    default:
      return state;
  }
}
