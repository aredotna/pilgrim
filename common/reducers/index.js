import { combineReducers } from 'redux';
import rootLink from './rootLink';
import path from './path';
import links from './links';

const rootReducer = combineReducers({
  rootLink,
  path,
  links
});

export default rootReducer;
