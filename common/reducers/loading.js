import { REQUEST_LINK, RECEIVE_LINK } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case REQUEST_LINK:
      return action.href;
    case RECEIVE_LINK:
      return false;
    default:
      return state;
  }
}
