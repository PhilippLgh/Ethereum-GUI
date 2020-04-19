import React, { Component } from 'react'
import Block from './BlockListItem'
import { getDataProvider } from '../../../js/DataProvider'
import Container from '../../../widgets/Container'
import ProviderList from '../../ProviderList'
import Connectivity from '../../../widgets/Connectivity'

export default class BlockList extends Component {
  render() {
    const latestBlock = 2000
    // let { start, end } = this.props
    let end = latestBlock
    let start = Math.max(latestBlock - 100, 0)
    return (
      <Connectivity>
        <Container>
          <ProviderList
            className="BlockList"
            itemName="Blocks"
            elements={() => <div>Block: {start}-{end}</div>}
            loadItems={provider => getDataProvider(provider).getBlocks(end, start)}
            processItems={items => items.reverse()} // display latest block first
            renderItem={({ provider, item: block}) => <Block key={block.number} block={block} /> }
          />
        </Container>
      </Connectivity>
    )
  }
}
