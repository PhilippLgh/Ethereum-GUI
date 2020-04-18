import React, { Component } from 'react'
import AddressItem from './AddressListItem'
import { getAllAddresses } from '../../../js/utils'
import Container from '../../../widgets/Container'
import ProviderList from '../../ProviderList'

export default class AddressList extends Component {
  render() {
    return (
      <Container>
        <ProviderList
          className="AddressList"
          itemName="Addresses"
          loadItems={provider => getAllAddresses(provider)}
          renderItem={({ provider, item: address}) => <AddressItem key={address} provider={provider} address={address} />}
        />
      </Container>
    )
  }
}
