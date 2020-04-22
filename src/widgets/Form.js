import React, { Component } from 'react'

export default class Form extends Component {
  render() {
    const { style } = this.props
    return (
      <div style={{
        flex: 1,
        maxHeight: 500,
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        border: '1px solid gray',
        borderRadius: 10,
        ...style
      }}>
        {this.props.children}
      </div>
    )
  }
}
