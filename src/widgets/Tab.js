import React, { Component } from 'react'

export default class Tab extends Component {
  render() {
    const { children } = this.props
    return (
      <div style={{ display: 'flex', flex: 1 }}>{children}</div>
    )
  }
}