import React, { Component } from 'react'
import StatusItem from '../StatusItem'

export default class RpcServer extends Component {
  render() {
    const { provider } = this.props
    const { connection } = provider
    return (
      <StatusItem label="RPC Server" value={ connection.url } />
    )
  }
}
