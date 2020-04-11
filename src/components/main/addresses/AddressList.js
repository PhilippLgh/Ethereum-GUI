import React, { Component } from 'react'
import List from '../../../widgets/List'
import AddressItem from './AddressListItem'
import { getAllAddresses } from '../../../js/utils'

export default class AddressList extends Component {
  state = {
    addresses: []
  }
  componentDidMount = async () => {
    const { provider } = this.props
    const addresses = await getAllAddresses(provider)
    this.setState({
      addresses
    })
  }
  render() {
    const { provider } = this.props
    const { addresses } = this.state
    return (
      <List className="AddressList" >
        { provider && addresses.map(address => <AddressItem key={address} provider={provider} address={address} />) }
      </List>
    )
  }
}
