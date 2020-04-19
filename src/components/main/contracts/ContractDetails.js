import React, { Component, Fragment } from 'react'
import Container from '../../../widgets/Container'
import { withRouter } from 'react-router-dom'
import Address from '../../../widgets/Address'
import { Column } from '../../../widgets/Column'
import { Row } from '../../../widgets/Row'
import ContractCode from './ContractCode/ContractCode'
import { ethers } from 'ethers'
import { getDataProvider } from '../../../js/DataProvider'
import ContractTransactionBrowser from './TxBrowser/ContractTransactionBrowser'
import ContractConsole from './InteractiveConsole/ContractConsole'
import { withGlobalState } from '../../../Context'

class ContractDetails extends Component {
  state = {
    abi: undefined,
    bytecode: '',
    contractProxy: undefined, // instance of "metaclass"
    signer: undefined,
    signerAddress: undefined,
    transactions: [],
    selectedTx: undefined
  }
  getAddress() {
    const { match } = this.props
    const { params } = match
    const { address } = params
    return address
  }
  getProvider() {
    const { global } = this.props
    const { state: globalState } = global
    const { provider } = globalState
    return provider
  }
  componentDidMount = async () => {
    const provider = this.getProvider()
    this.loadContractTransactions(provider)
    this.loadActiveSigner(provider)
    try {
      provider.on('block', this.loadContractTransactions)
    } catch (error) { }
  }
  componentWillUnmount = () => {
    const provider = this.getProvider()
    try {
      provider.off('block', this.loadContractTransactions)
    } catch (error) { }
  }
  loadContractTransactions = async (provider) => {
    try {
      const transactions = await getDataProvider(provider).getAllTxByContract(this.getAddress())
      this.setState({
        transactions,
        selectedTx: transactions[transactions.length - 1]
      })
    } catch (error) {
      this.setState({
        transactions: [],
        selectedTx: undefined
      })
    }
  }
  loadActiveSigner = async (provider) => {
    try {
      const signer = await provider.getSigner()
      const signerAddress = await signer.getAddress()
      this.setState({
        signer,
        signerAddress
      })
    } catch (error) {
      this.setState({
        signer: undefined,
        signerAddress: undefined
      })
    }
  }
  handleSelectedTransaction = (tx) => {
    this.setState({
      selectedTx: tx
    })
  }
  handleSolcArtifacts = async (data, persist = false) => {
    const { abi, source, bytecode, ast } = data
    this.setState({
      source,
      abi,
      bytecode,
      ast
    })
    try {
      const { signer } = this.state
      const provider = this.getProvider()
      let contractProxy = new ethers.Contract(this.getAddress(), abi, signer || provider);
      this.setState({
        contractProxy
      })
    } catch (error) {
      console.warn('could not create contract proxy', error)
    }
  }
  render() {
    const address = this.getAddress()
    const provider = this.getProvider()

    // required for console
    const { contractProxy, signerAddress, selectedTx } = this.state
    // for tx browser
    const { transactions } = this.state

    return (
      <Container
        style={{
          padding: 0,
          borderRadius: 0,
          maxHeight: '100%',
          overflowY: 'hidden'
        }}
        header={() => (<Fragment>Contract at <Address address={address} /></Fragment>)}
        headerStyle={{
          margin: 10
        }}
      >
        <Column style={{
          justifyContent: 'space-between',
          maxHeight: '100%'
        }}>
          <Row style={{
            overflowY: 'auto',
            flex: 3,
          }}>
            <div style={{
              flex: 1,
              display: 'flex'
            }}>
              {provider &&
                <ContractCode
                  provider={provider}
                  address={address}
                  // called when solidity artifacts become available:
                  // either through compilation, user selection or database
                  onData={data => this.handleSolcArtifacts(data, true)}
                />
              }
            </div>
            <div style={{
              flex: 1,
              display: 'flex',
            }}>
              <ContractTransactionBrowser
                provider={provider}
                transactions={transactions}
                selectedTransaction={selectedTx}
                onSelect={this.handleSelectedTransaction}
                contractInterface={contractProxy} // used to decode tx
              />
            </div>
          </Row>
          <div style={{
            backgroundColor: 'red',
            flex: 2,
            display: 'flex'
          }}>
            <ContractConsole
              signerAddress={signerAddress}
              selectedTx={selectedTx}
              contractProxy={contractProxy} // commands are executed on proxy instance
            />
          </div>
        </Column>
      </Container>
    )
  }
}

export default withRouter(withGlobalState(ContractDetails))
