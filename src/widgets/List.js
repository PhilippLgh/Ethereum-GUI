import React, { Component } from 'react'
import Pagination from './Pagination'
import Spinner from './Spinner'
import Error from './Error'

// TODO implement list header
class ListHeader extends Component { }

export default class List extends Component {
  state = {
    items: [],
    isLoading: false,
    error: undefined
  }
  componentDidMount = async () => {
    const { loadItems } = this.props
    if (loadItems) {
      this.setState({
        isLoading: true
      })
      try {
        let items = await loadItems()
        // filter null and undefined
        items = items.filter(item => !!item)
        this.setState({
          items,
          isLoading: false
        })
      } catch (error) {
        console.log('loading error', error)
        this.setState({
          error,
          isLoading: false
        })
      }
    }
  }
  renderLoading() {
    return (
      <div style={{
        maxHeight: 300,
        display: 'flex',
        flexDirection: 'column',
        opacity: 0.6,
        alignItems: 'center'
      }}>
        <div style={{
          fontSize: '2rem',
          alignSelf: 'center',
          margin: 20
        }}>Loading items...</div>
       <Spinner style={{
         width: 50,
         height: 50
       }} />
      </div>
    )
  }
  renderItems() {
    const { items } = this.state
    const { style, renderItem, itemName = "items" } = this.props
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
      }}>
        { items.length > 0
          ? items.map(renderItem)
          : <h2 style={{ alignSelf: 'center', color: '#ccc' }}>No {itemName} found</h2>
        }
      </div>
    )
  }
  render() {
    const { isLoading, items, error } = this.state
    const { elements } = this.props
    return (
      <div style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
      }}>
        {
          elements && elements()
        }
        {items.length > 25 && <Pagination />}
        {error
        ? <Error error={error}/>
        : isLoading ? this.renderLoading() : this.renderItems()
        }
      </div>
    )
  }
}
