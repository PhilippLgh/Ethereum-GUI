import React, { Component } from 'react'

export default class Pill extends Component {
  render() {
    const { color, style } = this.props
    return (
      <div style={{
        backgroundColor: color || '#08a79c',
        fontWeight: 'bold',
        letterSpacing: '0.075em',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 20,
        color: 'white',
        alignSelf: 'center',
        ...style
      }}>{this.props.children}</div>
    )
  }
}
