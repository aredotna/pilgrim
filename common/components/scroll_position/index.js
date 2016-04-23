import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux';

class ScrollPosition extends React.Component {
  scrollToIndex(scroll_index){
    setTimeout(() => {
      if (scroll_index > -1 && $('.link').eq(scroll_index).length) {
        const $link = $('.link').eq(scroll_index);
        const link_position = $link.position().left;
        const window_width = $( window ).width();
        const link_width = $link.outerWidth();
        $('.l-links').animate({
          scrollLeft: link_position - ((window_width - link_width) / 2)
        }, 100, 'linear', () => {
          setTimeout(() => {
            $link.css('overflowY', 'scroll');
          }, 100);
        });
      }
    }, 10);
  }

  shouldComponentUpdate(){
    return true;
  }

  componentDidUpdate(){
    const { scroll_index, highlighted_link } = this.props;
    this.scrollToIndex(scroll_index);
  }

  componentDidMount(){
    const { scroll_index } = this.props;
    this.scrollToIndex(scroll_index);
  }

  render() {
    return ( <div /> );
  }
}


const mapStateToProps = (state) => {
  return {
    scroll_index: state.scroll_index,
    view_mode: state.view_mode,
    highlighted_link: state.highlighted_link,
  }
}

export default connect(mapStateToProps)(ScrollPosition);
