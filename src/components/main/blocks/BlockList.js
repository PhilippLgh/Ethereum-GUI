import React, { Component } from 'react'
import Block from './BlockListItem'
import List from '../../../widgets/List'
import { getBlocks } from '../../../js/utils'
import Container from '../../../widgets/Container'

export default class BlockList extends Component {
  render() {
    let { provider, start, end } = this.props
    end = 100
    return (
      <Container>
        <List 
          className="BlockList"
          itemName="Blocks"
          loadItems={
            () => getBlocks(provider, end, Math.max(start, 0))
          }
          renderItem={ block => <Block key={block.number} block={block} /> }
        />
      </Container>
    )
  }
}
