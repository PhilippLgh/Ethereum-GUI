import React, { Component } from 'react'

export default class Error extends Component {
  render() {
    const { error } = this.props
    return (
      <div style={{ color: 'red' }}>
        { error && error.message }
      </div>
    )
  }
}
