import { combineReducers } from 'redux';
import root_link from './root_link';
import path from './path';
import links from './links';
import loading from './loading';
import preview_url from './preview_url';
import hovered_link from './hovered_link';
import path_url from './path_url';
import scroll_index from './scroll_index';
import view_mode from './view_mode';

const rootReducer = combineReducers({
  root_link,
  path,
  links,
  loading,
  preview_url,
  hovered_link,
  path_url,
  scroll_index,
  view_mode
});

export default rootReducer;
