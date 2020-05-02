import React, { Component, Fragment } from 'react'
import Container from './Container'
import Button from './Button'
import { withGlobalState } from '../Context'

class NoConnection extends Component {
  renderError() {
    return (
      <Container style={{ alignItems: 'center' }}>
        <h2>No connection to the Ethersnet... </h2>
        <h3>click on "Client" to see instructions</h3>
        <img src="https://lh3.googleusercontent.com/I39p4qQ7NebJ9Q6CAGzjzTuFt7naS5dCd3Gh7yS9aivaGh4pZKwU5tNLfWSQoeoke1TfMtfy=w640-h400-e365" style={{ height: 'auto', width: 'auto' }} />
        <Button style={{ display:'none'}}>Fix it</Button>
      </Container>
    )
  }
  render() {
    const { children } = this.props
    const { global } = this.props
    const { state: globalState } = global
    const { isConnected } = globalState
    return (
      <Fragment>
        { isConnected
        ? { ...children }
        : this.renderError()
        }
      </Fragment>
    )
  }
}

export default withGlobalState(NoConnection)
