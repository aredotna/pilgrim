import { createSelector } from 'reselect';

const linksSelector = state => state.links;
const previewUrlSelector = state => state.preview_url;
const pathSelector = state => state.path;
const hoveredLinkSelector = state => state.hovered_link;
const urlSelector = (state, props) => props.url;

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
