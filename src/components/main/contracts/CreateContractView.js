import React, { Component } from 'react'
import Container from '../../../widgets/Container'
import Button from '../../../widgets/Button'
import { ethers } from 'ethers'
import ContractCode from './ContractCode/ContractCode'
import { Row } from '../../../widgets/Row'
import { NavLink } from 'react-router-dom'

export default class CreateContractView extends Component {
  state = {
    source: '',
    abi: '',
    contract: undefined
  }
  handleData = (data) => {
    const { abi, source, bytecode } = data
    this.setState({
      abi,
      source,
      bytecode
    })
  }
  deployContract = async () => {
    const { abi, bytecode } = this.state
    // TODO show confirmation modal
    const { provider } = this.props
    const accounts = await provider.listAccounts()
    // TODO global signer
    const signer = await provider.getSigner(accounts[0]);
    const password = ''
    const unlocked = await signer.unlock(password)
    console.log('unlocked?', unlocked)
    // Create an instance of a Contract Factory
    const factory = new ethers.ContractFactory(abi, bytecode, signer);
    // Notice we pass in "Hello World" as the parameter to the constructor
    const contract = await factory.deploy();
    this.setState({
      contract
    })
    console.log('contract', contract)
    // TODO toast alert('deployed')
  }
  render() {
    const { abi, bytecode, contract } = this.state
    const { provider } = this.props
    return (
      <Container header="New Contract">
        <Row style={{ justifyContent: 'normal', marginTop: 20, marginLeft: 10, marginRight: 10, alignItems: 'center' }}>
          { contract && <span style={{ marginLeft: 10, textDecoration: 'underscore' }}>Deployed at: <NavLink to={`/contracts/${contract.address}`}>{contract.address}</NavLink>></span>}
          <Button 
            style={{
              color: '#08a79c',
              fontWeight: 'bold',
              marginLeft: 'auto' // move to right "justifySelf"
            }}
            enabled={!!abi && !!bytecode}
            onClick={this.deployContract} 
            icon="CodeBranch"
            label="Deploy"
          />
        </Row>
        <ContractCode
          provider={provider}
          onData={this.handleData}
          compiler="top"
        />
      </Container>
    )
  }
}