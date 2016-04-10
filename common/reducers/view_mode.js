import { TOGGLE_VIEW_MODE } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_VIEW_MODE:
      return action.mode;
    default:
      return state;
  }
}
