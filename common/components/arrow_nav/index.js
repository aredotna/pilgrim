import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux';
import { scrollTo, highlightLink } from '../../actions';
import classNames from 'classnames';

class ArrowNav extends React.Component {
  render() {
    const { path, highlighted_link, scroll_index, onLinkClick, view_mode } = this.props;

    const arrowClasses = classNames({
      "l-arrow-nav": true,
      "is-visible": (view_mode == 'explore')
    });

    return (
      <div className={arrowClasses}>
        {(() => {
          if (path[scroll_index - 1]) {
            return (
              <div className="arrow-nav__container arrow-nav__container--left" onClick={() => onLinkClick(scroll_index - 1, path[scroll_index - 1]) }>
                <div className="arrow-nav__container__link">
                  &lsaquo;
                </div>
              </div>
            );
          }
        })()}
        {(() => {
          if (path[scroll_index + 1]) {
            return (
              <div className="arrow-nav__container arrow-nav__container--right" onClick={() => onLinkClick(scroll_index + 1, path[scroll_index + 1]) }>
                <div className="arrow-nav__container__link">
                  &rsaquo;
                </div>
              </div>
            );
          }
        })()}
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    highlighted_link: state.highlighted_link,
    path: state.path,
    scroll_index: state.scroll_index,
    view_mode: state.view_mode
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLinkClick: (index, url) => {
      dispatch(scrollTo(index));
      dispatch(highlightLink(url));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArrowNav);
