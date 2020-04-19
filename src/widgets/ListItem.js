import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Clickable from './Clickable'

class ListItem extends Component {
  render() {
    const { children, clickable = true, style, to, onClick = (() => {
      if(!to) return
      this.props.history.push(to)
    })} = this.props
    return (
      <Clickable clickable={clickable} onClick={onClick} style={{
        display: 'flex',
        cursor: clickable? 'pointer' : 'default',
        borderTop: '1px solid #e6e6e6',
        color: '#3e3e3e',
        padding: 5,
        marginBottom: 2,
        ...style
      }}>
        { children }
      </Clickable>
    )
  }
}

export default withRouter(ListItem)
