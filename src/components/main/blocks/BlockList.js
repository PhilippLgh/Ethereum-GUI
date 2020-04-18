import React, { Component } from 'react'
import Block from './BlockListItem'
import { getBlocks } from '../../../js/utils'
import Container from '../../../widgets/Container'
import ProviderList from '../../ProviderList'

export default class BlockList extends Component {
  render() {
    let { start, end } = this.props
    end = 100
    return (
      <Container>
        <ProviderList
          className="BlockList"
          itemName="Blocks"
          loadItems={provider => getBlocks(provider, end, Math.max(start, 0))}
          renderItem={({ provider, item: block}) => <Block key={block.number} block={block} /> }
        />
      </Container>
    )
  }
}
