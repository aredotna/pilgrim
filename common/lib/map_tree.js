import { map, reduce, findIndex, assign, take } from 'lodash';

export default (path, links) => {
  let data = map(path, (url, index) => {
    let title = url;
    let active = false;

    if (links[url]){
      title = links[url].title;
      active = true;
    }

    let link = {
      name: url,
      title: title,
      parent: path[index - 1],
      index: index,
      active: active,
      children: []
    };

    if (links[url] && links[url].hrefs) {
      take(links[url].hrefs, 20).forEach((childUrl) => {
        if (path[index - 1] != childUrl){
          let title = childUrl;
          let active = false;

          if (links[childUrl]){
            title = links[childUrl].title;
          }

          link.children.push({
            name: childUrl,
            title: title,
            parent: path[index - 1],
            index: index,
            children: []
          });
        }
      });
    }
    return link;
  });

  let pathTree = reduce(data, (map, node) => {
    map[node.name] = node;
    return map;
  }, {});

  let treeData = [];
  data.forEach((node) => {
    let parent = pathTree[node.parent];
    if (parent) {
      let children = (parent.children || (parent.children = []));
      let existingNodeIndex = findIndex(children, (child) => {
        return child.name == node.name;
      });

      if (existingNodeIndex > -1) {
        children[existingNodeIndex] = assign(children[existingNodeIndex], node);
      } else {
        children.push(node);
      }
     } else {
      // parent is null or missing
      treeData.push(node);
     }
  });

  return treeData[0];
}
