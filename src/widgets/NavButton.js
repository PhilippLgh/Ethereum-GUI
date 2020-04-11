import React, { Component } from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'

export default class NavButton extends Component {
  render() {
    return (
      <Button onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }} >
        <Link to={this.props.to} >{this.props.children || this.props.label}</Link>
      </Button>
    )
  }
}
