import React, { Component } from 'react'
import List from '../../../widgets/List'
import AddressItem from './AddressListItem'
import { getAllAddresses } from '../../../js/utils'
import Container from '../../../widgets/Container'

export default class AddressList extends Component {
  render() {
    const { provider } = this.props
    return (
      <Container>
        <List 
          className="AddressList"
          itemName="Addresses"
          loadItems={() => getAllAddresses(provider)}
          renderItem={address => <AddressItem key={address} provider={provider} address={address} />}
        />
      </Container>
    )
  }
}
