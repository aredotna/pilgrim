import Q from 'bluebird-q';
import $ from 'jquery';
import { jsdom } from 'jsdom';
import { map, reject as remove } from 'lodash';
import fs from 'fs';

export default function(html){
  return Q.promise((resolve, reject) => {
    jsdom.env({
      html: html,
      done: (err, window) => {
        if(err) return reject(err);
        const links = map(window.document.getElementsByTagName('a'), (el) => { return el.href; });
        const filteredLinks = remove(links, (link) => {
          return (link.includes('#') || link.includes('.jpg') || link.includes('.jpeg') || link.includes('.gif') || link.includes('.pdf') || link.includes('.png'));
        });
        window.close();
        return resolve(filteredLinks);
      }
    });
  });
}
