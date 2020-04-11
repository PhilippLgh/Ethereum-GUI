import React, { Component } from 'react'
import ListItem from '../../../widgets/ListItem'
import { LabeledField } from '../../../widgets/LabeledField'
import Address from '../../../widgets/Address'
import EthValue from '../../../widgets/EthValue'
import InplaceEdit from '../../../widgets/InplaceEdit'
import { withGlobalState } from '../../../Context'

class AddressListItem extends Component {
  state = {
    balance: 0,
    txCount: 0,
    alias: ''
  }
  componentDidMount = async () => {
    const { provider, address, global } = this.props
    const { state : globalState } = global
    const { aliases } = globalState
    const alias = aliases[address] || ''
    const balance = await provider.getBalance(address)
    const txCount = await provider.getTransactionCount(address)
    this.setState({ balance, txCount, alias })
  }
  handleSetAlias = (alias) => {
    this.setState({
      alias
    })
    const { global, address } = this.props
    const { state : globalState } = global
    const { aliases } = globalState
    let newState = {
      ...aliases
    }
    newState[address] = alias
    global.setState({ aliases: newState})
  }
  render() {
    const { address, } = this.props
    const { balance, alias } = this.state
    return (
      <ListItem style={{
        justifyContent: 'space-between'
      }}>
        <LabeledField label="Address" style={{
          flexBasis: '30em'
        }} >
          <Address address={address} />
        </LabeledField>
        <LabeledField label="Alias">
          <InplaceEdit style={{ paddingTop: 5 }} value={alias} onChange={this.handleSetAlias} />
        </LabeledField>
        {/*spacer*/}
        <span></span>
        <LabeledField label="Balance" style={{
          flexBasis: '15em',
        }}>
          <EthValue value={balance} />
        </LabeledField>
        <LabeledField label="Contract" value="false" styleValue={{ paddingTop: 5 }} />
      </ListItem>
    )
  }
}

export default withGlobalState(AddressListItem)
