import React, { Component } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default class CodeEditor extends Component {
  render() {
    const { source, language ='javascript' } = this.props
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        minHeight: 0
      }}>
        <SyntaxHighlighter 
          language={language} 
          style={xonokai}
          customStyle={{
            flex: 1
          }}
        >
          {source}
        </SyntaxHighlighter>
      </div>
    )
  }
}
