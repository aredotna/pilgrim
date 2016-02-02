import { combineReducers } from 'redux';
import rootLink from './rootLink';
import links from './links';

const rootReducer = combineReducers({
  rootLink,
  links
});

export default rootReducer;
