import React, { Component } from 'react'
import StatusItem from '../StatusItem'

export default class HardforkName extends Component {
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
    return (
      <StatusItem label="Hardfork" value="Petersburg" />
    )
  }
}
