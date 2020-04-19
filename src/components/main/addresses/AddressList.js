import React, { Component } from 'react'
import AddressItem from './AddressListItem'
import { getDataProvider } from '../../../js/DataProvider'
import Container from '../../../widgets/Container'
import ProviderList from '../../ProviderList'
import Connectivity from '../../../widgets/Connectivity'

export default class AddressList extends Component {
  render() {
    return (
      <Connectivity>
        <Container>
          <ProviderList
            className="AddressList"
            itemName="Addresses"
            loadItems={provider => getDataProvider(provider).getAllAddresses()}
            renderItem={({ provider, item: address}) => <AddressItem key={address} provider={provider} address={address} />}
          />
        </Container>
      </Connectivity>
    )
  }
}
