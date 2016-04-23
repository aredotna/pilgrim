import { HIGHLIGHT_LINK } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case HIGHLIGHT_LINK:
      return action.href;
    default:
      return state;
  }
}
