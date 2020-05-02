import React, { Component } from 'react'
import TransactionItem from './TransactionItem'
import { getDataProvider } from '../../../js/DataProvider'
import Container from '../../../widgets/Container'
import ProviderList from '../../ProviderList'
import Connectivity from '../../../widgets/Connectivity'
import NavButton from '../../../widgets/NavButton'

export default class TransactionList extends Component {
  render() {
    return (
      <Connectivity>
        <Container>
          <ProviderList
            className="TransactionList"
            itemName="Transactions"
            elements={() => (
              <div>
                <NavButton icon="File" to={`/transactions/new`} label="New" />
              </div>
            )}
            loadItems={provider => getDataProvider(provider).getAllTransactions()}
            processItems={items => items.reverse()}
            renderItem={({ provider, item: tx}) => <TransactionItem key={tx.hash} provider={provider} tx={tx} /> }
          />
        </Container>
      </Connectivity>
    )
  }
}
