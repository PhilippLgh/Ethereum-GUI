import React, { Component } from 'react'

export default class Tab extends Component {
  render() {
    const { children, style } = this.props
    return (
      <div 
        className="Tab"
        style={{ 
          display: 'flex', 
          flex: 1, 
          overflow: 'auto',
          ...style 
        }}
      >{children}</div>
    )
  }
}