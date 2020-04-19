import React, { Component } from 'react'
import ListItem from '../../../../widgets/ListItem'
import { Column } from '../../../../widgets/Column'
import { Row } from '../../../../widgets/Row'
import BlockTime from '../../../../widgets/BlockTime'
import Address from '../../../../widgets/Address'

export default class TransactionItem extends Component {
  state = { receipt: undefined }
  componentDidMount = async () => {
    const { tx } = this.props
    const { provider } = this.props
    const receipt = await provider.getTransactionReceipt(tx.hash)
    this.setState({ receipt })
  }
  render() {
    const { receipt } = this.state
    const { tx, bytecode, contract } = this.props
    const _bytecode = bytecode ? bytecode.slice(2) : ''

    const parsed = contract && contract.interface.parseTransaction(tx)

    if (parsed && !parsed.args) {
      console.log('parsed', parsed)
    }

    const selectedBorder = '2px solid #57ffb594'

    return (
      <ListItem
        onClick={this.props.onClick}
        style={{
          flexDirection: 'column',
          padding: 10,
          margin: '0px 10px 0px 0px',
          boxSizing: 'border-box',
          borderTop: this.props.isSelected ? selectedBorder : '1px solid #e6e6e6',
          borderBottom: this.props.isSelected ? selectedBorder : '2px solid transparent',
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
            <span style={{ fontSize: '0.8rem' }}>Gas: {receipt && receipt.gasUsed.toString()} </span>
          </span>
          <span style={{
            fontWeight: 'bold',
            padding: 5,
            marginLeft: 20
          }}>{parsed ? parsed.name : 'constructor'}({parsed && parsed.args ? JSON.stringify(...parsed.args) : ''})</span>

        </Column>
        <Row>
          <span style={{ fontSize: '0.75rem' }}>By: <Address address={tx.from} /></span>
        </Row>
        <span style={{
          maxWidth: '100%',
          wordWrap: 'break-word',
          display: 'none'
        }} >Tx Data: {tx.data.includes(_bytecode) ? tx.data.replace(_bytecode, '<bytecode>') : tx.data}</span>
      </ListItem>
    )
  }
}
