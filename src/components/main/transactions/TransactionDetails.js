import React, { Component } from 'react'
import Container from '../../../widgets/Container'
import Text from '../../../widgets/Text'
import { withGlobalState } from '../../../Context'

class TransactionDetails extends Component {
  state = { tx: undefined }
  componentDidMount = async () => {
    const { global, match } = this.props
    const { provider } = global.state
    const { params } = match
    const { txHash } = params
    const tx = await provider.getTransaction(txHash)
    this.setState({
      tx
    })
  }
  renderTransactionDetails(tx) {
    return (
      <div>
        <pre>{JSON.stringify(tx, null, 2)}</pre>
      </div>
    )
  }
  render() {
    const { match } = this.props
    const { params } = match
    const { txHash } = params
    const { tx } = this.state
    return (
      <Container header={() => <Text text={`Transaction #${txHash}`} />}>
        { tx && this.renderTransactionDetails(tx) }
      </Container>
    )
  }
}

export default withGlobalState(TransactionDetails)
