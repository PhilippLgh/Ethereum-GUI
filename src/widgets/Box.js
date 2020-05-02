import React, { Component } from 'react'

export default class Box extends Component {
  render() {
    return (
      <div style={{
        display: 'flex',
        flex: 1,
        minHeight: 0 // don't grow larger than parent
      }}>
        { this.props.children }
      </div>
    )
  }
}
