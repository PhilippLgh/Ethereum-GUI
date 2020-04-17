import React, { Component } from 'react'
import TransactionItem from './TransactionItem'
import List from '../../../widgets/List'
import { getAllTransactions } from '../../../js/utils'
import Container from '../../../widgets/Container'

export default class TransactionList extends Component {
  render() {
    const { provider } = this.props
    return (
      <Container>
        <List 
          className="TransactionList"
          itemName="Transactions"
          loadItems={
            () => getAllTransactions(provider)
          }
          renderItem={
            tx => <TransactionItem key={tx.hash} provider={provider} tx={tx} />
          }
        />
      </Container>
    )
  }
}
