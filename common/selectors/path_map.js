import { createSelector } from 'reselect';
import { map } from 'lodash';
import { linksSelector, pathSelector } from './link.js';

export const rootLinkSelector = state => state.root_link;

const pathMapSelector = createSelector(
  linksSelector,
  pathSelector,
  rootLinkSelector,
  (links, path, root_link) => {
    return {
      path: path,
      root_link: root_link,
      links: links
    }
  }
);

export default pathMapSelector;
