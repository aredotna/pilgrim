import { createSelector } from 'reselect';

const linksSelector = state => state.links;
const previewUrlSelector = state => state.preview_url;
const urlSelector = (state, props) => props.url;

const linkSelector = createSelector(
  linksSelector,
  urlSelector,
  previewUrlSelector,
  (links, url, preview_url) => {
    return {
      link: links[url],
      preview_url: preview_url
    }
  }
);

export default linkSelector;
