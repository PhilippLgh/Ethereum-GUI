import React, { Component } from 'react'

export default class Form extends Component {
  render() {
    const { style } = this.props
    return (
      <div style={{
        flex: 1,
        maxHeight: 500,
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        border: '1px solid gray',
        borderRadius: 10,
        overflow: 'auto',
        ...style
      }}>
        {this.props.children.map((c, idx) => <div key={idx} style={{ margin: 10}}>{c}</div>)}
      </div>
    )
  }
}
