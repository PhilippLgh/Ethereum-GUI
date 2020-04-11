import React, { Component } from 'react'
import { ethers } from 'ethers'
import Clickable from './Clickable'

const prices = {
  eth: 1,
  usd: 159.59,
  eur: 144.36
}

const weiTo = (wei, selectedCurrency) => {
  const price = prices[selectedCurrency]
  const etherString= ethers.utils.formatEther(wei, { commify: 2})
  // FIXME dangerous but bigNumberify('100.00') not working
  const _ethers = parseFloat(etherString)
  return (price * _ethers).toFixed(2)
}

export default class EthValue extends Component {
  state = {
    selectedCurrency: 'eth'
  }
  changeCurrency = (e) => {
    const { selectedCurrency } = this.state
    const currencies = Object.keys(prices)
    const idx = currencies.findIndex(el => el === selectedCurrency)
    this.setState({
      selectedCurrency: currencies[(idx + 1) % currencies.length]
    })
  }
  render() {
    const { selectedCurrency } = this.state
    const { value: wei } = this.props
    let valueString = weiTo(wei, selectedCurrency)
    if (valueString.length > 10) {
      valueString = '∞'
    }
    return (
      <Clickable onClick={this.changeCurrency}>
        <span>
          <span>{valueString}</span> <span>{ selectedCurrency.toUpperCase() }</span>
        </span>
      </Clickable>
    )
  }
}
