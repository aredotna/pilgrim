import { REQUEST_LINK, RECEIVE_LINK, START_LOADING, STOP_LOADING } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case START_LOADING:
      return 'start';
    case STOP_LOADING:
      return 'done';
    case REQUEST_LINK:
      return 'start';
    case RECEIVE_LINK:
      return 'done';
    default:
      return state;
  }
}
