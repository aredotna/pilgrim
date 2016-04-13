import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';
import pathMapSelector from '../../selectors/path_map';
import mapTree from '../../lib/map_tree';
import {
  fetchLink,
} from '../../actions';

class PathMap extends React.Component {
  render() {
    const { path, root_link, links, dispatch } = this.props;
    let svg = ReactFauxDOM.createElement('svg');

    const sizes = {
      width: 4800,
      height: 1500
    };

    let tree = d3.layout.tree().size([sizes.height, sizes.width - 160]);
    let diagonal = d3.svg.diagonal()
      .projection((d) => {
        return [d.y, d.x];
      });

    let d3svg = d3.select(svg)
      .attr("width", sizes.width)
      .attr("height", sizes.height)
      .append("g")
      .attr("transform", "translate(480,0)");

    let i = 0;
    let root = mapTree(path, links);
    let nodes = tree.nodes(root);
    let treeLinks = tree.links(nodes);

    nodes.forEach((d) => {
      d.y = d.depth * 480;
    });

    let node = d3svg.selectAll("g.node")
      .data(nodes, (d) => { return d.id || (d.id = ++i); });

    let nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", (d) => {
        return "translate(" + d.y + "," + d.x + ")";
      })
      .on("click", (d) => {
        dispatch(fetchLink(d.name, d.parent.name));
      });

    nodeEnter.append("circle")
      .attr("r", 5)
      .style("fill", (d) => {
        if (d.active) {
          return "#000";
        }
        return "#fff";
      });

    nodeEnter.append("text")
      .attr("x", (d) => {
        return d.children || d._children ? -13 : 13; })
      .attr("dy", ".35em")
      .attr("text-anchor", (d) => {
        return d.children || d._children ? "end" : "start"; })
      .text((d) => {
        if(d.title.length > 50)
          return d.title.substring(0,50)+'...';
        else
          return d.title;
      })
      .style("fill", (d) => {
        if (d.active) {
          return "#000";
        }
        return "#999";
      });

    let link = d3svg.selectAll("path.link")
      .data(treeLinks , (d) => {
        return d.target.id;
      });

    // Enter the links.
    link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", diagonal)
      .style("stroke-opacity", (d) => {
        if (d.target.active) {
          return 1;
        }
        return 0.2;
      });

    return svg.toReact();
  }
}

PathMap = connect(pathMapSelector)(PathMap);
export default PathMap;
