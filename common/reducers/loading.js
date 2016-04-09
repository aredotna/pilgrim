import { REQUEST_LINK, RECEIVE_LINK } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case REQUEST_LINK:
      return 'start';
    case RECEIVE_LINK:
      return 'done';
    default:
      return state;
  }
}
