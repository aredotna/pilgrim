import { RECEIVE_ABSTRACT } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ABSTRACT:
      let newState = Object.assign({}, state, {
        [action.href]: action.abstract
      });
      return newState;
    default:
      return state;
  }
}
