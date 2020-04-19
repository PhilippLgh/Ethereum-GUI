import React, { Component } from 'react'
import { ethers } from 'ethers'
import Clickable from './Clickable'

const prices = {
  eth: 1,
  usd: 159.59,
  eur: 144.36
}

// TODO  move to utils
const weiTo = (wei, selectedCurrency) => {
  const price = prices[selectedCurrency]
  const etherString= ethers.utils.formatEther(wei, { commify: 2})
  // FIXME dangerous but bigNumberify('100.00') not working
  const _ethers = parseFloat(etherString)
  return (price * _ethers).toFixed(2)
}

const weiToUnit = (wei, unit) => {
  console.log('transform', wei, unit)
  return ethers.utils.formatUnits(wei, unit) // as string
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
    const { wei, unit, style } = this.props

    let valueString = ''
    if (unit) {
      valueString = weiToUnit(wei, unit).replace('.0', '') + ' ' + unit
    } else {
      valueString = weiTo(wei, selectedCurrency) + ' ' +  selectedCurrency.toUpperCase()
    }
    if (valueString.length > 20) {
      valueString = '∞' + ' ' + selectedCurrency.toUpperCase()
    }
    return (
      <Clickable onClick={this.changeCurrency} style={{
        ...style
      }}>
        <span>
          <span>{valueString}</span>
        </span>
      </Clickable>
    )
  }
}
