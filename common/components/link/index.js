import { default as React, PropTypes } from 'react';
import { shuffle, take } from 'lodash';
import classNames from 'classnames';
import './index.styl';

export default class Link extends React.Component {

  render() {
    let { href, abstract } = this.props;
    let hasAbstract = abstract !== undefined;

    const linkClasses = classNames({
      'linkAbstract': true,
      'is-expanded': hasAbstract
    });

    if(hasAbstract){
      const content = abstract.text.match(/[^\.!\?]+[\.!\?]+/g);
      const tags = take(shuffle(abstract.keywords.split(',')), 6);

      return (
        <li className={linkClasses}>
          <div className="ab-title">{abstract.title}</div>
          <div className="ab-content" dangerouslySetInnerHTML={{__html: content[0]}}></div>
          <div className="ab-keywords">
            {tags.map(function(tag) {
              return <span className="ab-tag" key={tag}><a href={tag}>#{tag}</a></span>;
            })}
          </div>
          <hr />
          <ul>
            {abstract.hrefs.map(function(href) {
              return (<Link key={href} href={href}/>);
            })}
          </ul>
        </li>
      );
    }else{
      return (
        <li>{href}</li>
      );
    }
  }
}
