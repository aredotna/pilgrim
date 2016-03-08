import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import HtmlToReact from 'html-to-react';

let isValidNode = function() {
    return true;
};

let processingInstructions = [
  {
    // Custom <a> processing
    shouldProcessNode: function(node) {
        return node.parent &&
          node.parent.name &&
          node.parent.name === 'a' &&
          node.parent.attribs &&
          node.parent.attribs.href &&
          node.parent.attribs.href.charAt(0) != "#";
    },
    processNode: function(node, children) {
      node.parent.onclick = "alert('hi')";
      return node.data;
    }
  }
];
let htmlToReactParser = HtmlToReact.Parser(React)

export default function(html, linkCallBack) {
  console.log('html', html);
  let reactComponent = htmlToReactParser.parseWithInstructions(html, isValidNode, processingInstructions);
  console.log('reactComponent', reactComponent);
  return renderToStaticMarkup(reactComponent);
};

// export default function() {
//   console.log('HtmlToReact', HtmlToReact);
// }
