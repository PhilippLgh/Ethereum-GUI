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
    contractInterface: undefined,
    signer: undefined,
    signerAddress: undefined,
    transactions: [],
    selectedTx: undefined,
    isLoadingTransactions: false
  }
  getAddress() {
    const { match } = this.props
    const { params } = match
    const { address } = params
    return address
  }
  getNetwork() {
    const { match } = this.props
    const { params } = match
    const { network } = params
    return network === 'main' ? 'homestead' : network
  }
  isPublicNetwork() {
    const network = this.getNetwork()
    const supported_networks = ['homestead', 'kovan', 'ropsten', 'rinkeby', 'goerli']
    const isPublicNetwork = supported_networks.includes(network)
    return isPublicNetwork
  }
  getProvider() {
    const { global } = this.props
    const { state: globalState } = global
    const { provider } = globalState

    //TODO fix  experimental
    if (this.isPublicNetwork()) {
      return new ethers.getDefaultProvider(this.getNetwork())
    }

    return provider
  }
  componentDidMount = async () => {

    const isPublic = this.isPublicNetwork()

    // we use etherscan provider to fetch tx history if connected to public network
    let txProvider =  isPublic ? new ethers.providers.EtherscanProvider(this.getNetwork()) : this.getProvider()

    if (!isPublic) {
      try {
        // TODO in dev mode with auto-mining
        txProvider.on('block', () => this.loadContractTransactions(txProvider))
      } catch (error) { }
    }
  
    this.loadContractTransactions(txProvider)
    this.loadActiveSigner()

  }
  componentWillUnmount = () => {
    const provider = this.getProvider()
    try {
      provider.off('block', this.loadContractTransactions)
    } catch (error) { }
  }
  loadContractTransactions = async (provider) => {
    provider = provider || this.getProvider()
    try {
      this.setState({ isLoadingTransactions: true })
      const skipCache = false
      const transactions = await getDataProvider(provider).getAllTxByContract(this.getAddress(), skipCache)
      this.setState({
        isLoadingTransactions: false,
        transactions,
        selectedTx: transactions[transactions.length - 1]
      })
    } catch (error) {
      console.log('error while fetching contract transactions', error)
      this.setState({
        transactions: [],
        selectedTx: undefined
      })
    }
  }
  loadActiveSigner = async (provider) => {
    provider = provider || this.getProvider()
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
    console.log('handle new artifacts', data)
    const { abi, source, bytecode, ast } = data
    this.setState({
      source,
      abi,
      bytecode,
      ast
    })

    try {
      const contractInterface = new ethers.utils.Interface(abi)
      this.setState({
        contractInterface
      })
      console.log('contract interface ready' /*, contractInterface*/)
    } catch (error) {

    }
    try {
      let { signer } = this.state
      const provider = this.getProvider()
      signer = signer || provider
      const contractProxy = new ethers.Contract(this.getAddress(), abi, signer);
      this.setState({
        contractProxy,
      })
      // console.log('created proxy from abi', abi)
    } catch (error) {
      console.warn('could not create contract proxy', error)
    }
  }
  render() {
    const address = this.getAddress()
    const provider = this.getProvider()
    // required for console
    const { contractProxy, contractInterface, signerAddress, selectedTx, isLoadingTransactions } = this.state
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
              <ContractCode
                provider={provider}
                address={address}
                // called when solidity artifacts become available:
                // either through compilation, user selection or database
                onData={data => this.handleSolcArtifacts(data, true)}
              />
            </div>
            <div style={{
              flex: 1,
              display: 'flex',
              marginTop: 3
            }}>
              <ContractTransactionBrowser
                // provider={provider}
                transactions={transactions}
                isLoading={isLoadingTransactions}
                onSelect={this.handleSelectedTransaction}
                contractInterface={contractInterface} // used to decode tx
              />
            </div>
          </Row>
          <div style={{
            flex: 2,
            display: 'flex'
          }}>
            <ContractConsole
              signerAddress={signerAddress}
              transactions={transactions}
              selectedTx={selectedTx}
              contractAddress={address}
              contractProxy={contractProxy} // commands are executed on proxy instance
            />
          </div>
        </Column>
      </Container>
    )
  }
}

export default withRouter(withGlobalState(ContractDetails))
