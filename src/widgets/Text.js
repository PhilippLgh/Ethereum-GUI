import React, { Component } from 'react'
import { withGlobalState } from '../Context'

class Text extends Component {
  render() {
    // const { global } = this.props
    let { text } = this.props
    if (typeof this.props.children === 'string') {
      text = this.props.children
    } else {
      text = text || "<invalid>"
    }
    return (
      <span style={{...this.props.style}}>
        {text}
      </span>
    )
  }
}

export default withGlobalState(Text)
