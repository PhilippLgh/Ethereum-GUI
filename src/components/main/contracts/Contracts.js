import React, { Component } from 'react'
import ContractListItem from './ContractListItem'
import { getAllContracts } from '../../../js/utils'
import List from '../../../widgets/List'
import NavButton from '../../../widgets/NavButton'
import Button from '../../../widgets/Button'
import Modal from '../../../widgets/Modal'
import Container from '../../../widgets/Container'

export default class Contracts extends Component {
  state = {
    showPrompt: false
  }
  bookmarkContract = () => {
    this.setState({
      showPrompt: true
    })
  }
  importContract = () => {
    // allows to import a contract
    // from another chain at a given block / state
    // can be auto-synced downstream
  }
  render() {
    const { showPrompt } = this.state
    const { provider } = this.props
    return (
      <Container>
        <List
          elements={() => (
            <div>
              <NavButton to={'/contracts/new'} label="New" />
              <Button onClick={this.bookmarkContract} label="Bookmark" />
              <Button onClick={this.importContract} label="Import" />
            </div>
          )}
          loadItems={() => getAllContracts(provider)}
          renderItem={contract => <ContractListItem provider={provider} key={contract.address} contract={contract} />}
        />
        <Modal onClose={() => this.setState({ showPrompt: false })} show={showPrompt} />
      </Container>
    )
  }
}
