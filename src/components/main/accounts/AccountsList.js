import React, { Component } from 'react'
import AccountItem from './AccountListItem'
import List from '../../../widgets/List'
import Button from '../../../widgets/Button'
import { createFundedTestAccount } from '../../../js/utils'

export default class AccountsList extends Component {
  state = {
    accounts: []
  }
  componentDidMount = () => {
    this.loadAccounts()
  }
  loadAccounts = async () => {
    const { provider } = this.props
    const accounts = await provider.listAccounts()
    this.setState({
      accounts: [...accounts]
    })
  }
  addAccount = async () => {
    const { provider } = this.props
    await createFundedTestAccount(provider)
    this.loadAccounts()
  }
  render() {
    const { provider } = this.props
    const { accounts } = this.state
    return (
      <List className="AccountList" elements={() => (
        <div>
          <Button onClick={this.addAccount} >add</Button>
          <Button onClick={this.loadAccounts} >refresh</Button>
        </div>
      )} >
        { provider && accounts.map(address => <AccountItem key={address} provider={provider} address={address} />) }
      </List>
    )
  }
}
