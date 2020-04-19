import React, { Component } from 'react'

export default class Badge extends Component {
  render() {
    return (
      <div style={{
        backgroundColor: '#ff22a7e0',
        position: 'absolute',
        width: 10,
        height: 10,
        padding: 5,
        borderRadius: 10,
        top: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <span style={{
          fontSize: '1.25rem',
          color: 'white',
          fontWeight: 'bold'
        }}>!</span>
      </div>
    )
  }
}
