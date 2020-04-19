import React, { Component, Fragment } from 'react'
import Container from './Container'
import Button from './Button'
import { withGlobalState } from '../Context'

class NoConnection extends Component {
  renderError() {
    return (
      <Container>
        <h2>No connection to the Ethersnet ;-( </h2>
        <Button>Fix it</Button>
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
