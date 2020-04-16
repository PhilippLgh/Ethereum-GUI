import React, { Component } from 'react'
import Block from './BlockListItem'
import List from '../../../widgets/List'
import { getBlocks } from '../../../js/utils'

export default class BlockList extends Component {
  state = {
    blocks: []
  }
  componentDidMount = async () => {
    let { provider, start, end } = this.props
    console.log('get blocks for range', start, end)
    end = 100
    this.setState({
      isLoading: true
    })
    const blocks = await getBlocks(provider, end, Math.max(start, 0))
    this.setState({
      blocks: [...blocks],
      isLoading: false
    })
  }
  render() {
    let { blocks, isLoading } = this.state
    return (
      <List className="BlockList" isLoading={isLoading} >
        { blocks.map(block => <Block key={block.number} block={block} />) }
      </List>
    )
  }
}
