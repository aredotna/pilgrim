import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux';

class Explore extends React.Component {
  render() {
    const { dispatch, abstract } = this.props;

    return (
      <div className='l-abstract'>
        <header>
          <strong>Pilgrim</strong>
        </header>
        <h2>{abstract.title}</h2>
        <div className="ab__keywords">
          <h6>{abstract.keywords}</h6>
        </div>
        <div className="ab__content" dangerouslySetInnerHTML={{__html: abstract.html}}></div>
        <hr />
        <ol>
          {abstract.hrefs.map(function(href) {
            return <li key={href}><a href={href}>{href}</a></li>;
          })}
        </ol>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    abstract: state.abstract
  }
}

export default connect(mapStateToProps)(Explore);
