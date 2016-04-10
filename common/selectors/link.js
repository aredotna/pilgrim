import { createSelector } from 'reselect';

export const linksSelector = state => state.links;
export const previewUrlSelector = state => state.preview_url;
export const pathSelector = state => state.path;
export const hoveredLinkSelector = state => state.hovered_link;
export const urlSelector = (state, props) => props.url;

const linkSelector = createSelector(
  linksSelector,
  urlSelector,
  previewUrlSelector,
  pathSelector,
  hoveredLinkSelector,
  (links, url, preview_url, path, hovered_link) => {
    return {
      link: links[url],
      preview_url: preview_url,
      will_be_chopped: hovered_link && hovered_link != url && (path.indexOf(url) > path.indexOf(preview_url))
    }
  }
);

export default linkSelector;
