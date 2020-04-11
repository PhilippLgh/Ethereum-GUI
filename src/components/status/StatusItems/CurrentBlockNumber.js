import React, { Component } from 'react'
import StatusItem from '../StatusItem'

export default class CurrentBlockNumber extends Component {
  render() {
    const { block } = this.props
    return (
      <StatusItem label="Current Block" value={block} />
    )
  }
}
