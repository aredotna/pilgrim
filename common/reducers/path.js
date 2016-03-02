import { RECEIVE_ABSTRACT } from '../actions';
import { slice, indexOf } from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ABSTRACT:
      let index = indexOf(state, action.parent);
      let chopped = slice(state, 0, index + 1);
      console.log('chopped', chopped, 'index', index, 'parent', action.parent);

      return [
        ...chopped,
        action.href
      ];
    default:
      return state;
  }
}
