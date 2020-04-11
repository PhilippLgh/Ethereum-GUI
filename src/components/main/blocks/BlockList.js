import React, { Component } from 'react'
import Block from './BlockListItem'
import List from '../../../widgets/List'
import { getBlocks } from '../../../js/utils'

export default class BlockList extends Component {
  state = {
    blocks: []
  }
  componentDidMount = async () => {
    const { provider, start, end } = this.props
    const blocks = await getBlocks(provider, end, Math.max(start, 0))
    this.setState({
      blocks: [...blocks]
    })
  }
  render() {
    const { blocks } = this.state
    return (
      <List className="BlockList">
        {
          blocks.map(block => <Block key={block.number} block={block} />)
        }
      </List>
    )
  }
}
