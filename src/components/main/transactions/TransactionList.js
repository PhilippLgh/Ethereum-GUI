import React, { Component } from 'react'
import TransactionItem from './TransactionItem'
import { getDataProvider } from '../../../js/DataProvider'
import Container from '../../../widgets/Container'
import ProviderList from '../../ProviderList'
import Connectivity from '../../../widgets/Connectivity'

export default class TransactionList extends Component {
  render() {
    return (
      <Connectivity>
        <Container>
          <ProviderList
            className="TransactionList"
            itemName="Transactions"
            loadItems={provider => getDataProvider(provider).getAllTransactions()}
            processItems={items => items.reverse()}
            renderItem={({ provider, item: tx}) => <TransactionItem key={tx.hash} provider={provider} tx={tx} /> }
          />
        </Container>
      </Connectivity>
    )
  }
}
