import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux';
import snippet from './snippet'

class Home extends React.Component {
  render() {
    const { dispatch, abstract } = this.props;

    return (
      <div className='l-home'>
        <h1>Pilgrim</h1>
        <div className="home-content">
          <p style={{textAlign: 'center'}}>Drag the link below to your bookmarks bar:</p>
          <a href={snippet} className="home-snippet">Open in Pilgrim</a>
          <p>Pilgrim works best on articles that link out to other websites. For example:</p>
          <ul>
            <li>
              <a href="http://pilgrim.are.na/http%3A%2F%2Fwww.wired.com%2F2016%2F03%2Ffinal-game-alphago-lee-sedol-big-deal-humanity%2F" target="_blank">Why the Final Game Between AlphaGo and Lee Sedol Is Such a Big Deal for Humanity</a>
            </li>
            <li>
              <a href="http://pilgrim.are.na/http%3A%2F%2Fwww.ribbonfarm.com%2F2016%2F02%2F11%2Fminimum-viable-superorganism%2F" target="_blank">Minimum Viable Superorganism</a>
            </li>
            <li>
              <a href="http://pilgrim.are.na/http%3A%2F%2Fwww.thedailybeast.com%2Farticles%2F2016%2F01%2F03%2Fwhy-we-all-dream-of-being-jewel-thieves.html" target="_blank">We All Dream of Being Jewel Thieves</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    abstract: state.abstract
  }
}

export default connect(mapStateToProps)(Home);
