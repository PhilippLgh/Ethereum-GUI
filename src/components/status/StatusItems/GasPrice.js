import React, { Component } from 'react'
import StatusItem from '../StatusItem'

export default class GasPrice extends Component {
  state = {
    gasPrice: -1
  }
  componentDidMount = async () => {
    const { provider } = this.props
    const gasPrice = await provider.getGasPrice()
    this.setState({
      gasPrice
    })
  }
  render() {
    const { gasPrice } = this.state
    return (
      <StatusItem label="Gas Price" value={ gasPrice ? gasPrice.toString() : '<undefined>'} />
    )
  }
}
