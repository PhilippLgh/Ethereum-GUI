import React, { Component } from 'react'
import ListItem from '../../../../widgets/ListItem'
import { Column } from '../../../../widgets/Column'
import { Row } from '../../../../widgets/Row'
import Gas from '../../../../widgets/Gas'
import BlockTime from '../../../../widgets/BlockTime'
import Address from '../../../../widgets/Address'

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
  render() {
    const { receipt } = this.state
    const { tx, contract, idx } = this.props

    let parsed
    let calledFunctionName = '<unknown fn>'
    try {
      parsed = contract && contract.interface.parseTransaction(tx)
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
          }}>{calledFunctionName}({parsed && parsed.args ? JSON.stringify(...parsed.args) : ''})</span>
        </Column>
        <Row>
          <span style={{ fontSize: '0.75rem' }}>By: <Address address={tx.from} /></span>
        </Row>
      </ListItem>
    )
  }
}
