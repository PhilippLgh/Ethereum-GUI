import React, { Component } from 'react'
import StatusItem from '../StatusItem'

export default class Currency extends Component {
  render() {
    return (
      <StatusItem label={"Currency"} value="ETH" />
    )
  }
}
