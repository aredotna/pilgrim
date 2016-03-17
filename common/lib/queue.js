import { find, without } from 'lodash';

export function addToQueue(req){
  __QUEUE__.push(req);
}

export function removeFromQueue(urlToCancel){
  const request = find(__QUEUE__, ({ url, req }) => {
    return url === urlToCancel;
  });
  __QUEUE__ = without(__QUEUE__, request);
}

export function clearQueue(){
  __QUEUE__.map(({ url, req }) => {
    req.abort();
  });
  __QUEUE__ = [];
}
