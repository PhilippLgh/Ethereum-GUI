import React, { Component } from 'react'
import ContractListItem from './ContractListItem'
import { getDataProvider } from '../../../js/DataProvider'
import NavButton from '../../../widgets/NavButton'
import Modal from '../../../widgets/Modal'
import Container from '../../../widgets/Container'
import ProviderList from '../../ProviderList'
import Connectivity from '../../../widgets/Connectivity'

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
  loadContracts = async (provider) => {
    // in a dev environment we want to load all contracts
    // on public testnet this should only load bookmarked contracts
    return getDataProvider(provider).getAllContracts()
  }
  render() {
    const { showPrompt } = this.state
    return (
      <Connectivity>
        <Container
          header="All Contracts"
          backButton={false}
        >
          <ProviderList
            elements={() => (
              <div>
                <NavButton icon="File" to={'/contracts/new'} label="New" />
                {/*
                <Button onClick={this.bookmarkContract} label="Bookmark" />
                <Button onClick={this.importContract} label="Import" />
                */}
              </div>
            )}
            itemName="contracts"
            loadItems={this.loadContracts}
            renderItem={({ provider, item: contract }) => <ContractListItem key={contract.contractAddress} provider={provider} contract={contract} />}
          />
          <Modal onClose={() => this.setState({ showPrompt: false })} show={showPrompt} />
        </Container>
      </Connectivity>
    )
  }
}
