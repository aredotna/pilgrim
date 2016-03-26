import { combineReducers } from 'redux';
import rootLink from './rootLink';
import path from './path';
import links from './links';
import loading from './loading';
import preview_url from './preview_url';
import hovered_link from './hovered_link';

const rootReducer = combineReducers({
  rootLink,
  path,
  links,
  loading,
  preview_url,
  hovered_link
});

export default rootReducer;
