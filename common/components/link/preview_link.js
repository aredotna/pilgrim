import { default as React, PropTypes, } from 'react';
import { shuffle, take } from 'lodash';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { fetchAbstract } from '../../actions';
import classNames from 'classnames';
import linkSelector from '../../selectors/link'

class PreviewNode extends React.Component {
  componentDidMount(){
    findDOMNode(this).scrollIntoView();
  }
  render() {
    const { link, onLinkClick, url } = this.props;

    const linkClasses = classNames({
      'linkAbstract': true,
      'is-preview': true,
      'is-expanded': link
    });

    if(link){
      const title = link.title.replace(' - Wikipedia, the free encyclopedia', '');
      const content = link.html.replace('Advertisement', '').replace('From Wikipedia, the free encyclopedia', '');
      const tags = take(shuffle(link.keywords.split(',')), 6);

      return (
        <li id={url} className={linkClasses}>
          <div className="ab-title">
            <a href={url} target="_blank" dangerouslySetInnerHTML={{__html: title}}></a>
          </div>
          <div className="ab-content" dangerouslySetInnerHTML={{__html: content}}></div>
        </li>
      );
    } else {
      return (
        <div className="empty-link">
        </div>
      )
    }
  }
}


let Link = connect(linkSelector)(PreviewNode);
export default Link;
