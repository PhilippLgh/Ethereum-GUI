import React, { Component } from 'react'
import TransactionItem from './TransactionItem'
import { getAllTransactions } from '../../../js/utils'
import Container from '../../../widgets/Container'
import ProviderList from '../../ProviderList'

export default class TransactionList extends Component {
  render() {
    return (
      <Container>
        <ProviderList
          className="TransactionList"
          itemName="Transactions"
          loadItems={provider => getAllTransactions(provider)}
          renderItem={({ provider, item: tx}) => <TransactionItem key={tx.hash} provider={provider} tx={tx} /> }
        />
      </Container>
    )
  }
}
