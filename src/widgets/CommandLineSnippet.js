import React, { Component } from 'react'
import CopyClipboardButton from './CopyClipboardButton'

export default class CommandLineSnippet extends Component {
  render() {
    const { command } = this.props
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
      }}>
        <pre style={{
          backgroundColor: '#313131dd',
          flex: 1,
          color: 'white',
          padding: 5,
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 5,
          paddingTop: 10,
          fontSize: '1.2rem',
          margin: 0,
          marginRight: 10
        }}>$ {command}</pre> <CopyClipboardButton value={command} />
      </div>
    )
  }
}
