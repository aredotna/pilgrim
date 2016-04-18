import { OPEN_SAVE_MODAL, CLOSE_SAVE_MODAL } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case CLOSE_SAVE_MODAL:
      return false;
    case OPEN_SAVE_MODAL:
      return true;
    default:
      return state;
  }
}
