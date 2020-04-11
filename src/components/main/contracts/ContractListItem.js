import React, { Component } from 'react'
import ListItem from '../../../widgets/ListItem'
import { LabeledField } from '../../../widgets/LabeledField'
import Pill from '../../../widgets/Pill'
import Address from '../../../widgets/Address'
import BlockNumber from '../../../widgets/BlockNumber'

export default class ContractListItem extends Component {
  render() {
    const { contract } = this.props
    const { contractAddress, blockNumber } = contract
    return (
      <ListItem to={`/contracts/${contractAddress}`} style={{ justifyContent: 'space-between' }} >
        <LabeledField label={'Block'}>
          <BlockNumber block={blockNumber} />
        </LabeledField>
        <LabeledField label={'Name'}>
          <span>Unnamed</span>
        </LabeledField>
        <LabeledField label={'Address'}>
          <Address address={contractAddress} contract={true} style={{
            paddingLeft: 5,
            paddingRight: 5
          }} />
        </LabeledField>
        <Pill>Deployed</Pill>
      </ListItem>
    )
  }
}
