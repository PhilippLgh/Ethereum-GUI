import React, { Component } from 'react'
import CopyClipboardButton from './CopyClipboardButton'

export default class CommandLineSnippet extends Component {
  render() {
    const { command } = this.props
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <pre style={{
          backgroundColor: '#313131',
          color: 'white',
          padding: 10,
          paddingTop: 15,
          marginRight: 10,
          borderRadius: 5,
          fontSize: '1.2rem',
          overflow: 'scroll'
        }}>$ {command}</pre> <CopyClipboardButton value={command} />
      </div>
    )
  }
}
