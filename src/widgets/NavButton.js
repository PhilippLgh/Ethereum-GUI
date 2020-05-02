import React, { Component } from 'react'
import Button from './Button'
import { withRouter } from 'react-router-dom'

class NavButton extends Component {
  render() {
    const { label, icon, children, to } = this.props
    return (
      <Button icon={icon} label={label} onClick={() => this.props.history.push(to)}>{children}</Button>
    )
  }
}

export default withRouter(NavButton)
