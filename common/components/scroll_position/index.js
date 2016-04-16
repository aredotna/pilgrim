import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux';

class ScrollPosition extends React.Component {
  shouldComponentUpdate(){
    return true;
  }
  componentDidUpdate(){
    const { scroll_index } = this.props;
    setTimeout(() => {
      if (scroll_index > -1 && $('.link').eq(scroll_index).length) {
        $('.l-links').animate({
          scrollLeft: $('.link').eq(scroll_index).position().left
        }, 100);
      }
    }, 10);
  }

  render() {
    return ( <div /> );
  }
}


const mapStateToProps = (state) => {
  return {
    scroll_index: state.scroll_index,
  }
}

export default connect(mapStateToProps)(ScrollPosition);
