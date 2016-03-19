import { RECEIVE_LINK } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_LINK:
      let newState = Object.assign({}, state, {
        [action.href]: action.link
      });
      return newState;
    default:
      return state;
  }
}
