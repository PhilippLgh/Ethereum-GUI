import React, { Component } from 'react'
import StatusItem from '../StatusItem'

export default class GasLimit extends Component {
  state = {
    gasLimit: -1
  }
  componentDidMount = async () => {
    const { provider } = this.props
    const gasLimit = 100// await provider.getGaslimt()
    this.setState({
      gasLimit
    })
  }
  render() {
    const { gasLimit} = this.state
    return (
      <StatusItem label="Gas Limit" value={gasLimit ? gasLimit.toString() : '<undefined>' }/>
    )
  }
}
