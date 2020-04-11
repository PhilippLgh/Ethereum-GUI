import React, { Component } from 'react'

export default class Pill extends Component {
  render() {
    return (
      <div style={{
        backgroundColor: 'lightblue',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 20,
        color: 'white',
        alignSelf: 'center'
      }}>{this.props.children}</div>
    )
  }
}
