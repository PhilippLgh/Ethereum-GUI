import React, { Component } from 'react'
import { Row } from '../../../../widgets/Row'
import Tabs from '../../../../widgets/Tabs'
import { getCompilerData } from '../../../../js/utils'
import Compiler from '../Compiler'
import CodeTab from './CodeTab'
import { showNotification } from '../../../../widgets/Notification'

export default class ContractCode extends Component {
  state = {
    selectedTab: 0,
    code: '',
    abi: '',
    bytecode: '',
    contractCode: '',
    bytecodeMatch: undefined,
  }
  componentDidMount() {
    const { address } = this.props
    if (!address) {
      return
    }
    this.loadArtifacts(address)
  }
  tryLoadAbiFromEtherscan = async (contractAddress) => {
    const abi = await fetch(`http://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}`)
                  .then(data => data.json())
                  .then(data => JSON.parse(data.result))
                  .catch(error => console.log('fetch error', error))
    console.log('abi?', abi)              
    if (abi) {
      this.handleSolcArtifacts({
        abi
      })
      this.setState({
        // if no source to display but abi -> go to abi tab
        selectedTab: 3
      })
      showNotification('Found ABI on Etherscan!')
      return true
    }
    return false
  }
  loadArtifacts = async (contractAddress) => {
    console.log('load artifacts', contractAddress)

    await this.tryLoadAbiFromEtherscan(contractAddress)

    // const data = loadContractArtifacts()

    /*
    try {
      const { provider, address } = this.props
      const contractCode = await provider.getCode(address)
      this.setState({ contractCode })
      // try to fetch compiler info based on contract code
      const solcArtifacts = await getCompilerData(contractCode)
      if (solcArtifacts) {
        this.handleSolcArtifacts(solcArtifacts, false)
      }
    } catch (error) {
      
    }
    */
  }
  handleCompilerData = (output) => {
    const { source } = this.state
    // TODO
    const ast = undefined

    const contracts = output.contracts['file.sol']
    const contractName = Object.keys(contracts)[0]
    const contract = contracts[contractName]
    const { abi, evm } = contract
    const { bytecode, deployedBytecode } = evm
    // todo bring in form: 
    const artifact = {
      source,
      abi,
      bytecode: bytecode.object,
      ast
    }
    this.handleSolcArtifacts(artifact)
  } 
  handleSolcArtifacts = (data) => {
    const { contractCode } = this.state
    const { source, abi, bytecode, ast } = data
    /*
    // https://ethereum.stackexchange.com/questions/195/how-can-i-verify-that-a-contract-on-the-blockchain-matches-the-source-code
    const bytecodeMatch = contractCode && contractCode === bytecode
    */
    let bytecodeMatch = true

    this.setState({
      source,
      abi,
      ast,
      bytecode,
      bytecodeMatch
    })
    this.props.onData(data)
  }
  renderPlaceholder() {
    return (
      <div style={{
        height: 100,
        width: '100%',
        border: '1px dashed black'
      }}>
      </div>
    )
  }
  render() {
    const { bytecodeMatch, source, selectedTab } = this.state
    const { compiler } = this.props

    const tabs = [
      { label: 'Source', data: 'source' }
      , { label: 'Contract Code', data: 'contractCode' }
      , { label: 'Bytecode', data: 'bytecode' }
      , { label: 'ABI', data: 'abi' }
      , { label: 'AST', data: 'ast' }
    ]

    return (
      <div
        className="ContractCode"
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          ...this.props.style
        }}>
        { compiler === 'top' && <Compiler source={source} onData={this.handleCompilerData} /> }
        <Tabs
          selectedTab={selectedTab}
          onChange={tab => this.setState({ selectedTab: tab })}
        >
          {tabs.map(t => <CodeTab 
            key={t.label} 
            label={t.label} 
            source={this.state[t.data]}
            onChange={value => {
              const change = {}
              change[t.data] = value
              this.handleSolcArtifacts(change) 
            }} 
            onData={value =>  {
              // handle case where file is plain string and not .json
              if (typeof value === 'string') {
                const change = {}
                change[t.data] = value
                value = change
              }
              this.handleSolcArtifacts(value)
            }} 
          />)}
        </Tabs>
        { compiler === 'bottom' && <Compiler source={source} onData={this.handleCompilerData} /> }
        <div style={{
          border: '1px solid #80808040',
        }}>
          {bytecodeMatch === false &&
            <Row style={{
              padding: 10,
              justifyContent: 'normal',
              letterSpacing: 1,
              fontWeight: 'bold'
            }}>
              <span style={{ color: 'red', paddingRight: 5 }}>!!! WARNING !!! </span><span>Generated bytecode does not match deployed code</span>
            </Row>
          }
        </div>
      </div>
    )
  }
}
