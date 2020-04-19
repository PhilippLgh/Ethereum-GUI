import React, { Component } from 'react'
import Container from '../../../widgets/Container'
import Text from '../../../widgets/Text'
import { withGlobalState } from '../../../Context'

class BlockDetails extends Component {
  state = { block: undefined }
  componentDidMount = async () => {
    const { global, match } = this.props
    const { provider } = global.state
    const { params } = match
    const { blockNumber } = params
    const block = await provider.getBlock(parseInt(blockNumber))
    this.setState({
      block
    })
  }
  renderBlockDetails(block) {
    return (
      <div>
        <pre>{JSON.stringify(block, null, 2)}</pre>
      </div>
    )
  }
  render() {
    const { match } = this.props
    const { params } = match
    const { blockNumber } = params
    const { block } = this.state
    return (
      <Container header={() => <Text text={`Block #${blockNumber}`} />}>
        { block && this.renderBlockDetails(block) }
      </Container>
    )
  }
}

export default withGlobalState(BlockDetails)