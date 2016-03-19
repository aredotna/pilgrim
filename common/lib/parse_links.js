import Q from 'bluebird-q';
import $ from 'jquery';
import { jsdom } from 'jsdom';
import { map } from 'lodash';
import fs from 'fs';

export default function(html){
  return Q.promise((resolve, reject) => {
    jsdom.env({
      html: html,
      done: (err, window) => {
        if(err) return reject(err);
        const links = map(window.document.getElementsByTagName('a'), (el) => { return el.href; });
        window.close();
        return resolve(links);
      }
    });
  });
}
