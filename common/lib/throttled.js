import config from '../../config.js';

export const requesting = {};

export const throttled = (key, fn) => {
  if (requesting[key]) return;
  fn();
  requesting[key] = true;
  setTimeout(() => {
    delete requesting[key];
  }, config.REQUEST_THROTTLE_MS);
};
