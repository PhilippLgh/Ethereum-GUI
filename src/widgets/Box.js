import React, { Component } from 'react'

export default class Box extends Component {
  render() {
    return (
      <div style={{
        display: 'flex',
        flex: 1
      }}>
        { this.props.children }
      </div>
    )
  }
}
