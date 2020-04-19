import React, { Component } from 'react'
import StatusItem from '../StatusItem'
import EthValue from '../../../widgets/EthValue'

export default class GasPrice extends Component {
  state = {
    gasPrice: -1
  }
  componentDidMount = async () => {
    const { provider } = this.props
    try {
      const gasPrice = await provider.getGasPrice()
      this.setState({
        gasPrice
      })
    } catch (error) {
      this.setState({
        gasPrice: -1
      })
    }

  }
  render() {
    const { gasPrice } = this.state
    return (
      <StatusItem label="Gas Price" value={() => <EthValue wei={gasPrice} unit="gwei" style={{ padding: 0}} />} />
    )
  }
}
