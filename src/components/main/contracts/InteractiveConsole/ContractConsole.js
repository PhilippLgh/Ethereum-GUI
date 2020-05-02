import React, { Component } from 'react'
import { Row } from '../../../../widgets/Row'
import BlockTime from '../../../../widgets/BlockTime'
import Address from '../../../../widgets/Address'
import ContractState from '../ContractState'
import Console from '../../../console/Console'
import Overlay from '../../../../widgets/Overlay'

export default class ContractConsole extends Component {
  renderOverlay() {
    return (
      <Overlay text="Add ABI to interact with contract" />
    )
  }
  render() {
    const { signerAddress, selectedTx, contractProxy } = this.props // for console
    const { provider, transactions = [], contractAddress } = this.props // for state
    return (
      <div style={{
        position: 'relative',
        flex: 1,
        display: 'flex',
        backgroundColor: '#000000e0',
      }}>
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Row style={{
            color: 'white',
            padding: 5,
          }}>
            <span>State at: {selectedTx && <BlockTime block={selectedTx.blockNumber} style={{ padding: 0 }} />}</span>
            <span>Signer: { signerAddress
             ? <Address address={signerAddress} style={{ padding: 2 }} />
             : <span style={{ color: 'yellow' }} tooltip="Metamask login required?">WARNING: read-only</span>
            }
            </span>
          </Row>
          <div style={{
            flex: 2,
            display: 'flex'
          }}>
            {transactions.length > 10
            ? <span style={{ color: '#6e6e6e', fontSize: '1.4rem', alignSelf: 'center', margin: 'auto'}}>Too many transactions for state debugger (max: 10)</span>
            : (
              <ContractState
                key={selectedTx ? selectedTx.hash : '_'}
                provider={provider}
                contractAddress={contractAddress}
                // ast={ast}
                transactions={transactions}
                until={selectedTx}
              />
            )
            } 
          </div>
          <div style={{
            flex: 3,
            display: 'flex'
          }}>
            <Console context={contractProxy}  />
            {!contractProxy && this.renderOverlay()}
          </div>
        </div>
      </div>
    )
  }
}
