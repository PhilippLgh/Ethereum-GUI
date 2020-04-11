import React, { Component } from 'react'
import TransactionItem from './TransactionItem'
import List from '../../../widgets/List'
import { getAllTransactions } from '../../../js/utils'

export default class TransactionList extends Component {
  state = {
    transactions: []
  }
  componentDidMount = async () => {
    const { provider, blockNumber } = this.props
    const block = await provider.getBlock(blockNumber)

    const transactions = await getAllTransactions(provider)
    this.setState({
      transactions: [...transactions]
    })
  }
  render() {
    const { provider } = this.props
    const { transactions } = this.state
    return (
      <List className="TransactionList">
        { transactions.length > 0
          ? transactions.map(tx => <TransactionItem key={tx.hash} provider={provider} tx={tx} />) 
          : <h4 style={{ alignSelf: 'center', color: '#ccc' }}>No transactions yet</h4>
        }
      </List>
    )
  }
}
