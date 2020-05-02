import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'

export default class Markdown extends Component {
  render() {
    return (
      <div style={{
        backgroundColor: '#f9f9f9',
        padding: 5,
        flex: 1,
        overflow: 'auto'
      }}>
        <ReactMarkdown
          source={this.props.source}
          escapeHtml={false}
        />
      </div>
    )
  }
}
