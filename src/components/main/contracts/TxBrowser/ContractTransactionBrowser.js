import React, { Component } from 'react'
import TransactionItem from './TransactionItem'
import Text from '../../../../widgets/Text'
import Overlay from '../../../../widgets/Overlay'

export default class ContractTransactionHistory extends Component {
  state = {
    selectedTx: undefined
  }
  handleTransactionSelect = (tx) => {
    let { onSelect = () => { }  } = this.props
    onSelect(tx)
  }
  componentDidMount = () => {
    const { transactions } = this.props
    if (transactions && transactions.length > 0) {
      this.setState({
        selectedTx: transactions[0]
      })
    }
  }
  renderOverlay() {
    return (
      <Overlay 
        text="Loading transaction list" 
        spinner={true} 
        color="#6e6e6e" 
        background="white"
        border='1px dashed #999'
        blur={false} 
      />
    )
  }
  renderTransactions() {
    const { selectedTx } = this.state
    let {
      provider,
      transactions,
      contractInterface
    } = this.props


    const MAX_ITEMS = 20
    transactions = transactions.slice(0, MAX_ITEMS)

    return (
      transactions.map((tx, idx) =>
        <TransactionItem
          key={tx.hash}
          provider={provider}
          isSelected={selectedTx && tx.hash === selectedTx.hash}
          tx={tx}
          idx={idx}
          contractInterface={contractInterface}
          onClick={this.handleTransactionSelect}
        />
      )
    )
  }
  render() {
    const { transactions = [], isLoading } = this.props
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
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
          position: 'relative',
          overflowY: 'auto',
          flex: 1,
        }}>
          {this.renderTransactions()}
          {isLoading && this.renderOverlay()}
        </div>
      </div>
    )
  }
}
