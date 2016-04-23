import { createSelector } from 'reselect';
import { indexOf } from 'lodash';

export const linksSelector = state => state.links;
export const highlightedLinkSelector = state => state.highlighted_link;
export const pathSelector = state => state.path;
export const hoveredLinkSelector = state => state.hovered_link;
export const urlSelector = (state, props) => props.url;

const linkSelector = createSelector(
  linksSelector,
  urlSelector,
  highlightedLinkSelector,
  pathSelector,
  hoveredLinkSelector,
  (links, url, highlighted_link, path, hovered_link) => {
    return {
      link: links[url],
      highlighted_link: highlighted_link,
      index: indexOf(path, url),
      will_be_chopped: hovered_link && hovered_link != url && (path.indexOf(url) > path.indexOf(preview_url))
    }
  }
);

export default linkSelector;
