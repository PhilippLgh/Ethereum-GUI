import React, { Component } from 'react'
import Block from './BlockListItem'
import List from '../../../widgets/List'
import { getBlocks } from '../../../js/utils'

export default class BlockList extends Component {
  render() {
    let { provider, start, end } = this.props
    end = 100
    return (
      <List 
        className="BlockList"
        itemName="Blocks"
        loadItems={
          () => getBlocks(provider, end, Math.max(start, 0))
        }
        renderItem={ block => <Block key={block.number} block={block} /> }
      />
    )
  }
}
