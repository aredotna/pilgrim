import { SELECT_LINK } from '../actions';
import { slice, indexOf } from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case SELECT_LINK:
      let index = indexOf(state, action.parent);
      let chopped = slice(state, 0, index + 1);
      return [
        ...chopped,
        action.href
      ];
    default:
      return state;
  }
}
