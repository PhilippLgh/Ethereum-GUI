import React, { Component } from 'react'
import AccountItem from './AccountListItem'
import Button from '../../../widgets/Button'
import { createFundedTestAccount } from '../../../js/utils'
import Container from '../../../widgets/Container'
import Connectivity from '../../../widgets/Connectivity'
import ProviderList from '../../ProviderList'

export default class AccountsList extends Component {
  addAccount = async () => {
    /* FIXME refresh logic
    const { provider } = this.props
    await createFundedTestAccount(provider)
    this.loadAccounts()
    */
  }
  importAccount = async () => {
    
  }
  render() {
    return (
      <Connectivity>
        <Container>
          <ProviderList
            className="AccountList"
            elements={() => (
              <div>
                <Button enabled={false} onClick={this.addAccount} >Add</Button>
                <Button enabled={false} onClick={this.importAccount} >Import</Button>
                <Button enabled={false} onClick={this.loadAccounts} >Refresh</Button>
              </div>
            )}
            itemName="accounts"
            loadItems={(provider) => provider.listAccounts()}
            renderItem={({ provider, item: address }) => <AccountItem key={address} provider={provider} address={address} /> }
          />
        </Container>
      </Connectivity>
    )
  }
}
