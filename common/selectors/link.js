import { createSelector } from 'reselect';

const linksSelector = state => state.links;
const urlSelector = (state, props) => props.url;

const linkSelector = createSelector(
  linksSelector,
  urlSelector,
  (links, url) => {
    return {
      link: links[url]
    }
  }
);

export default linkSelector;
