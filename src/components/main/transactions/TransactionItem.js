import React, { Component } from 'react'
import { Row } from '../../../widgets/Row'
import { Column } from '../../../widgets/Column'
import { LabeledField } from '../../../widgets/LabeledField'
import ListItem from '../../../widgets/ListItem'
import Pill from '../../../widgets/Pill'
import Address from '../../../widgets/Address'
import EthValue from '../../../widgets/EthValue'
import Gas from '../../../widgets/Gas'

export default class TransactionItem extends Component {
  state = {
    receipt: undefined
  }
  componentDidMount = async () => {
    const { provider, tx } = this.props
    const { hash: txHash } = tx
    const receipt = await provider.getTransactionReceipt(txHash)
    this.setState({
      receipt
    })
  }
  render() {
    const { receipt } = this.state
    const { tx } = this.props
    const {
      // Only available for mined transactions
      // blockHash,
      blockNumber,
      // timestamp,

      // Exactly one of these will be present (send vs. deploy contract)
      // They will always be a properly formatted checksum address
      creates,
      to,

      hash,

      // See above "Transaction Requests" for details
      // data,
      from,
      // gasLimit,
      // gasPrice,
      // nonce,
      value,

      // The chain ID; 0 indicates replay-attack vulnerable
      // (eg. 1 = Homestead mainnet, 3 = Ropsten testnet)
      // chainId,

      // r, s, v,
      // raw
    } = tx

    const {
      gasUsed,

      blockNumber: blockNumberMined,

      contractAddress
    } = (receipt || {})
    return (
      <ListItem style={{
        flexDirection: 'column'
      }} to={`/transactions/${hash}`}>
        <Row>
          <LabeledField label="Tx Hash" value={hash} />
          <Pill>{creates ? 'Contract Creation' : 'Contract Call' }</Pill>
        </Row>
        <Row>
          <Column>
            <LabeledField label="From Address">
              <Address address={from} />
            </LabeledField>
          </Column>
          <Column>
            <LabeledField label={contractAddress ? "Contract Address" : "To Address"}>
              <Address address={to || contractAddress} contract={contractAddress ? true : false} />
            </LabeledField>
          </Column>
          <Column>
            <LabeledField label="Value" >
              <EthValue value={value} />
            </LabeledField>
          </Column>
          <Column>
            <LabeledField label="Gas Used" alignValue={'flex-end'}>
              <Gas gas={gasUsed} />
            </LabeledField>
          </Column>
        </Row>
        <Row style={{
          justifyContent: 'normal'
        }}>
          <LabeledField label="Block Created" value={blockNumber} />
          <LabeledField label="Block Mined" value={blockNumberMined} />
        </Row>

        {/*
        <span>block hash: { blockHash }</span>
        <span>block #: { blockNumber }</span>
        <span>timestamp: { timestamp }</span>

        <span>creates: { creates }</span>
        <span>to: { to }</span>

        <span>data: { data }</span>
        <span>from: { from }</span>
        <span>gasLimit: { gasLimit && gasLimit.toString() }</span>
        <span>gasPrice: { gasPrice && gasPrice.toString() }</span>
        <span>nonce: { nonce }</span>
        <span>value: { value && value.toString() }</span>

        <span>chain id: { chainId }</span>
        <span>raw sig: { raw }</span>
        */}

      </ListItem>
    )
  }
}
