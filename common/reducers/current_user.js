import { LOGIN_SUCCESS } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.user;
    default:
      return state;
  }
}
