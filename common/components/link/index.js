import { default as React, PropTypes } from 'react';
import { shuffle, take } from 'lodash';
import { fetchAbstract } from '../../actions'
import classNames from 'classnames';

export default class Link extends React.Component {

  render() {
    let { link, links, dispatch, url } = this.props;
    let hasAbstract = link !== undefined;

    const linkClasses = classNames({
      'linkAbstract': true,
      'is-expanded': hasAbstract
    });

    if(hasAbstract){
      const content = link.text.match(/[^\.!\?]+[\.!\?]+/g);
      const tags = take(shuffle(link.keywords.split(',')), 6);
      let preview = '';

      if(content !== undefined){
        preview = content[0];
      }

      return (
        <li className={linkClasses}>
          <div className="ab-title">{link.title}</div>
          <div className="ab-content" dangerouslySetInnerHTML={{__html: preview}}></div>
          <div className="ab-keywords">
            {tags.map(function(tag) {
              return <span className="ab-tag" key={tag}><a href={tag}>#{tag}</a></span>;
            })}
          </div>
          <hr className="ab-divider"/>
          <ul className="ab-links">
            {link.hrefs.map(function(url) {
              let childLink = links[url];
              return (<Link key={url} url={url} links={links} link={childLink} dispatch={dispatch}/>);
            })}
          </ul>
        </li>
      );
    }else{
      return (
        <li className="childlink" onClick={() => dispatch(fetchAbstract(url))}>{url}</li>
      );
    }
  }
}
