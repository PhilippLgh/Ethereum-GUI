import React, { Component } from 'react'
import ContractListItem from './ContractListItem'
import { getAllContracts } from '../../../js/utils'
import List from '../../../widgets/List'
import NavButton from '../../../widgets/NavButton'
import Button from '../../../widgets/Button'
import Modal from '../../../widgets/Modal'

export default class Contracts extends Component {
  state = {
    contracts: [],
    showPrompt: false
  }
  componentDidMount = async () => {
    const { provider } = this.props
    const contracts = await getAllContracts(provider)
    this.setState({
      contracts: [...contracts]
    })
  }
  bookmarkContract = () => {
    this.setState({
      showPrompt: true
    })
  }
  render() {
    const { contracts, showPrompt } = this.state
    const { provider } = this.props
    return (
      <List elements={() => (
        <div>
          <NavButton to={'/contracts/new'} label="New" />
          <Button onClick={this.bookmarkContract} label="Bookmark" />
        </div>
      )}>
        <Modal onClose={() => this.setState({ showPrompt: false })} show={showPrompt} />
        {contracts.map(contract => <ContractListItem provider={provider} key={contract} contract={contract} />)}
      </List>
    )
  }
}
