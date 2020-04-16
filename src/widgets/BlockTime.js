import React, { Component } from 'react'
import Clickable from './Clickable'
import DateField from './DateField'
import { withGlobalState } from '../Context'

class BlockTime extends Component {
  state = {
    block: undefined,
    error: undefined
  }
  componentDidMount = async () => {
    const { block: blockNumber, global } = this.props
    const { state: globalState } = global
    const { provider } = globalState
    try {
      const block = await provider.getBlock(blockNumber)
      this.setState({
        block
      })
    } catch (error) {
      this.setState({ error })
    }
  }
  render() {
    const { block, error } = this.state
    const { block: blockNumber, global } = this.props
    const { state: globalState } = global

    let blockTime = blockNumber
    if (globalState.time === 'unix') {
      blockTime = block ? block.timestamp : 0
    }

    return (
      <Clickable style={{
        ...this.props.style
      }}>
        { error
          ? <span>{error.message}</span>
          : globalState.time === 'block' ?  `#${blockTime}` : <DateField ts={blockTime} />
        }
      </Clickable>
    )
  }
}

export default withGlobalState(BlockTime)
