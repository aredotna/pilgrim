import { RECEIVE_PATH_LINK, SELECT_LINK } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_PATH_LINK:
      return action.id;
    case SELECT_LINK:
      return false;
    default:
      return state;
  }
}
