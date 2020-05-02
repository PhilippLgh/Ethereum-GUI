import React, { Component } from 'react'
import ListItem from '../../../../widgets/ListItem'
import { Column } from '../../../../widgets/Column'
import { Row } from '../../../../widgets/Row'
import Gas from '../../../../widgets/Gas'
import BlockTime from '../../../../widgets/BlockTime'
import Address from '../../../../widgets/Address'
import JsonView from '../../../../widgets/JsonView'
import EthValue from '../../../../widgets/EthValue'

export default class TransactionItem extends Component {
  state = { receipt: undefined }
  componentDidMount = async () => {
    const { tx } = this.props
    try {
      const { provider } = this.props
      const receipt = await provider.getTransactionReceipt(tx.hash)
      this.setState({ receipt })
    } catch (error) {

    }
  }
  renderArgs(parsed) {
    if (!parsed || !parsed.args) {
      return ''
    }
    /**
     * arguments are often passed as arrays or structs for various reasons
     * information is then written next to element as comment in the source :
     * myFunction(address[2] tx) // [0]: from, [1]: to
     * with metainfo we can enrich the displayed information
     * for example: args is an array and the first parameter is an array too
     * the first item of the first parameter would have path
     * 0/0
     * we can now say the first item in the array is valueX by defining the meta info structure
     * {
     *  0: {
     *    0: 'from',
     *    1: 'to'
     *  }
     * }
     */
    const metaInfo = {
      trade: {
        0: {
          0: 'amountBy',
          1: 'amountSell',
          2: 'expires',
          3: 'nonce',
          4: 'amount',
          5: 'tradeNonce',
          6: 'feeMake',
          7: 'feeTake'
        },
        1: {
          0: 'tokenBuy',
          1: 'tokenSell',
          2: 'maker',
          3: 'taker'
        }
      },
    }
    const render = {
      'expires': val => (parseInt(val) / 1000) + ' seconds',
      'amount': val => <EthValue wei={val} />,
      'feeMake': val => <EthValue wei={val} />,
      'feeTake': val => <EthValue wei={val} />
    }
    return <JsonView
      name={null}
      displayDataTypes={false}
      displayIndices={false}
      indentation={10}
      path={parsed.name}
      metaInfo={undefined /*metaInfo*/}
      render={render}
      src={parsed.args} />
  }
  render() {
    const { receipt } = this.state
    const { tx, contractInterface, idx } = this.props

    // tx can be of type TransactionResponse (e.g. etherscan provider)
    // see https://docs.ethers.io/ethers.js/html/api-providers.html#transaction-response
    const {
      blockHash,
      blockNumber,
      chainId,
      confirmations,
      creates,
      data,
      from,
      to,
      gasLimit,
      gasPrice,
      hash,
      networkId,
      nonce,
      timestamp,
      transactionIndex,
      value
    } = tx

    let parsed
    let calledFunctionName = '<unknown fn>'
    try {
      parsed = contractInterface.parseTransaction(tx)
      calledFunctionName = parsed ? parsed.name : (idx === 0 ? 'constructor' : calledFunctionName)
    } catch (error) { }

    const selectedBorder = '2px solid #08a79c'
    return (
      <ListItem
        onClick={this.props.onClick}
        style={{
          flexDirection: 'column',
          padding: 10,
          margin: '0px 10px 0px 0px',
          boxSizing: 'border-box',
          borderTop: this.props.isSelected ? selectedBorder : '2px solid transparent',
          borderBottom: this.props.isSelected ? selectedBorder : '2px solid #e6e6e6',
          borderLeft: this.props.isSelected ? selectedBorder : '2px solid transparent',
          borderRight: this.props.isSelected ? selectedBorder : '2px solid transparent',

        }}>
        <Column style={{
          justifyContent: 'normal'
        }}>
          <span style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span style={{ fontSize: '0.8rem' }}>At: <BlockTime block={tx.blockNumber} style={{ padding: 0 }} /> </span>
            <span style={{ fontSize: '0.8rem' }}>Gas: <Gas gas={receipt ? receipt.gasUsed : undefined} /> </span>
          </span>
          <span style={{
            fontWeight: 'bold',
            padding: 5,
            marginLeft: 20
          }}>{calledFunctionName}({this.renderArgs(parsed)})</span>
        </Column>
        <Row>
          <span style={{ fontSize: '0.75rem' }}>By: <Address address={tx.from} /></span>
        </Row>
      </ListItem>
    )
  }
}
