import React, { Component } from 'react'
import Spinner from './Spinner'

export default class Overlay extends Component {
  render() {
    const { text, spinner, color = 'rgba(238, 238, 238, 0.58)', blur=true, background = 'rgba(144, 144, 144, 0.1)', border } = this.props
    return (
      <div style={{
        backgroundColor: background,
        backdropFilter: blur ? 'blur(6px)' : undefined,
        border,
        boxSizing: 'border-box',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        { spinner && <Spinner size="1.5rem" style={{ marginRight: 20 }} /> }
        <span style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color,
        }}>{text}</span>
      </div>
    )
  }
}
