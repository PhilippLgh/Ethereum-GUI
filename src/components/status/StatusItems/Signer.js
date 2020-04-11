import React, { Component } from 'react'
import StatusItem from '../StatusItem'
import Address from '../../../widgets/Address'

export default class Signer extends Component {
  state = {
    address: ''
  }
  componentDidMount = async () => {
    const { provider } = this.props
    const signer = await provider.getSigner()
    const address = await signer.getAddress()
    this.setState({
      address
    })
  } 
  render() {
    const { address } = this.state
    return (
      <StatusItem label={"Signer"} value={() => <Address address={address} short={true} style={{ padding: 0 }} />} />
    )
  }
}
