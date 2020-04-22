import React, { Component } from 'react'
import TransactionItem from './TransactionItem'
import Text from '../../../../widgets/Text'

export default class ContractTransactionHistory extends Component {
  state = {}
  renderTransactions() {
    const {
      provider,
      transactions,
      selectedTransaction: selectedTx,
      onSelect = () => { },
      contractInterface
    } = this.props
    return (
      transactions.map((tx, idx) =>
        <TransactionItem
          key={tx.hash}
          provider={provider}
          isSelected={selectedTx && tx.hash === selectedTx.hash}
          tx={tx}
          idx={idx}
          contract={contractInterface}
          onClick={() => onSelect(tx)}
        />
      )
    )
  }
  render() {
    const { transactions = [] } = this.props
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        marginTop: 5
      }}>
        <Text
          style={{
            fontSize: '1.2rem',
            padding: 6,
            borderBottom: '1px solid #99999999'
          }}
          text={`Transactions (${transactions.length})`}
        />
        <div style={{
          overflowY: 'auto',
          flex: 1,
        }}>
          {this.renderTransactions()}
        </div>
      </div>
    )
  }
}
