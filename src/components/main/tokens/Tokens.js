import React, { Component } from 'react'
import Container from '../../../widgets/Container'

const tokens = [
  {
    name: 'Tether',
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7'
  }
]

class TokenListItem extends Component {
  render() {
    const { token = {} } = this.props
    const { name } = token
    return (
      <div>{name}</div>
    )
  }
}

export default class Tokens extends Component {
  render() {
    return (
      <Container>
        <h2>hello tokens</h2>
        {tokens.map((token, idx) => <TokenListItem key={token.address} token={token}/>)}
      </Container>
    )
  }
}
