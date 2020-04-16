import React, { Component } from 'react'

export default class Gas extends Component {
  render() {
    const { gas } = this.props
    // const gasPriceGwei = 10
    return (
      <span style={{
      }}>
        { gas !== undefined ? gas.toString() : 'undefined' }
      </span>
    )
  }
}
