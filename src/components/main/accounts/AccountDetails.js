import React, { Component } from 'react'
import Container from '../../../widgets/Container'
import { withRouter } from 'react-router-dom'
import Address from '../../../widgets/Address'

class AccountDetails extends Component {
  render() {
    const { match } = this.props
    const { params } = match
    const { address } = params
    return (
    <Container header={() => <Address label="Account" address={address}/>}>

      </Container>
    )
  }
}

export default withRouter(AccountDetails)
