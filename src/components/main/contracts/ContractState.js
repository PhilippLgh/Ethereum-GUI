/* eslint-disable */
import React, { Component } from 'react'
import ReactJson from 'react-json-view'
import Address from '../../../widgets/Address'
import Switch from '../../../widgets/Switch'
import { Row } from '../../../widgets/Row'
import EthStateMachine from '../../../js/EthStateMachine'
import Overlay from '../../../widgets/Overlay'

export default class ContractState extends Component {
  state = {
    transactions: [],
    storage: {
    },
    contractAddress: '',
    isLoading: false
  }
  componentDidMount = async () => {
    const { provider, address: contractAddress, transactions, until, ast } = this.props

    this.setState({
      contractAddress,
      isLoading: true
    })

    const stateMachine = new EthStateMachine()
    const { createdAddress, storage } = await stateMachine.replayContractTransactions(transactions, until)

    // console.log('calculated storage', storage)
    this.setState({
      storage,
      isLoading: false
    })

  }
  handleSwitch = () => {

  }
  renderJson(jsonState) {
    return (
      <ReactJson
        src={jsonState}
        theme="monokai"
        name="storage"
        displayDataTypes={false}
        enableClipboard={false}
        style={{
          flex: 1,
          padding: 10,
        }}
      />
    )
  }
  renderOverlay() {
    return (
      <Overlay spinner={true} text="calculating contract state..." />
    )
  }
  render() {
    const { contractAddress } = this.props
    const { storage, isLoading } = this.state
    const jsonState = storage
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.88)',
        ...this.props.style
      }}>
        <Row>
          <span style={{ paddingLeft: 5, color: 'white' }}>Contract: <Address address={contractAddress} /></span>
          <Switch label="Decoded" onSwitch={this.handleSwitch} style={{ color: 'white' }} />
        </Row>
        <div style={{
          position: 'relative',
          flex: 1
        }}>
          { this.renderJson(jsonState) }
          { /* isLoading && this.renderOverlay() */ }
        </div>
      </div>
    )
  }
}
