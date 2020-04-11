import React, { Component } from 'react'
import Clickable from './Clickable'

export default class BlockNumber extends Component {
  render() {
    const { block } = this.props
    return (
      <Clickable>
        {block}
      </Clickable>
    )
  }
}
