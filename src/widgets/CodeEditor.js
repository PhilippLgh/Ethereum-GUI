import React, { Component } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default class CodeEditor extends Component {
  render() {
    const { source, language = 'javascript', onChange, onFocus, onBlur, style, readOnly = true } = this.props
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        minHeight: 0
      }}>
        {language === 'text' || readOnly === false
          ? (
            <textarea
              readOnly={readOnly}
              style={{
                ...style
              }}
              value={source}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          )
          : (
            <SyntaxHighlighter
              language={language}
              style={language !== 'text' ? xonokai : undefined}
              customStyle={{
                flex: 1
              }}
            >
              {source}
            </SyntaxHighlighter>
          )
        }
      </div>
    )
  }
}
