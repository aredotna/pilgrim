import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

class Explore extends React.Component {
  render() {
    const { dispatch, abstract } = this.props
    return (
      <div className='l-abstract'>
        hello world. {abstract.title}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    abstract: state.abstract
  }
}

// https://github.com/rackt/react-redux/blob/master/docs/api.md#inject-dispatch-and-todos
export default connect(mapStateToProps)(Home)
