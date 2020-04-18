import React, { Component } from 'react'
import { withGlobalState } from '../Context'
import List from '../widgets/List'

/*
 * a list whose data provider is set to the global ethereum provider
 * if the provider is changed it will request a re-render
 */
class ProviderList extends Component {
  render() {
    const { global, className, elements, itemName, loadItems, renderItem } = this.props
    const { state } = global
    const { provider } = state
    console.log('render provider list', provider.connection.url)
    return (
      <List 
        className={className}
        elements={elements}
        dataSource={provider.connection.url}
        itemName={itemName}
        loadItems={() => loadItems(provider)}
        renderItem={item => renderItem({ provider, item }) }
      />
    )
  }
}

export default withGlobalState(ProviderList)
