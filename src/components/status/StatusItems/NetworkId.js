import React, { Component } from 'react'
import StatusItem from '../StatusItem'

export default class NetworkId extends Component {
  state = {
    network: undefined
  }
  componentDidMount = async () => {
    const { provider } = this.props
    const network = await provider.getNetwork() 
    this.setState({
      network
    })
  }
  render() {
    const { network } = this.state
    return (
      <StatusItem label="Network" value={network && `${network.chainId} ("${network.name}")` } />
    )
  }
}
