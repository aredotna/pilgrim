import { combineReducers } from 'redux';
import rootLink from './rootLink';
import path from './path';
import links from './links';
import preview_url from './preview_url';


const rootReducer = combineReducers({
  rootLink,
  path,
  links,
  preview_url
});

export default rootReducer;
