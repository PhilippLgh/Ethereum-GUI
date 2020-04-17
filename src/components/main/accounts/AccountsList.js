import React, { Component } from 'react'
import AccountItem from './AccountListItem'
import List from '../../../widgets/List'
import Button from '../../../widgets/Button'
import { createFundedTestAccount } from '../../../js/utils'
import Container from '../../../widgets/Container'

export default class AccountsList extends Component {
  addAccount = async () => {
    /* FIXME refresh logic
    const { provider } = this.props
    await createFundedTestAccount(provider)
    this.loadAccounts()
    */
  }
  render() {
    const { provider } = this.props
    return (
      <Container>
        <List
          className="AccountList"
          elements={() => (
            <div>
              <Button onClick={this.addAccount} >add</Button>
              <Button onClick={this.loadAccounts} >refresh</Button>
            </div>
          )}
          loadItems={() => provider.listAccounts()}
          renderItem={address => <AccountItem key={address} provider={provider} address={address} /> }
        />
      </Container>
    )
  }
}
