import React, { Component } from 'react'
import Button from './Button'
import { Link, withRouter } from 'react-router-dom'

class NavButton extends Component {
  render() {
    const { label, children, to } = this.props
    return (
      <Button label={label} onClick={() => this.props.history.push(to)}>{children}</Button>
    )
  }
}

export default withRouter(NavButton)
