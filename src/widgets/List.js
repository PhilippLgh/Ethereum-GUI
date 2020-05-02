import React, { Component } from 'react'
import Pagination from './Pagination'
import Spinner from './Spinner'
import Error from './Error'
import { Row } from './Row'

// TODO implement list header
// class ListHeader extends Component { }

export default class List extends Component {
  state = {
    items: [],
    isLoading: false,
    error: undefined,
    intervalHandler: undefined,
    dataSource: undefined
  }
  componentDidMount = async () => {
    const { polling, dataSource } = this.props
    this.setState({
      dataSource
    })
    this.loadItems()
    if (polling) {
      this.startPolling(polling)
    }
  }
  componentWillUnmount() {
    this.stopPolling()
  }
  loadItems = async () => {
    const { loadItems = () => undefined, items: providedItems = [], processItems } = this.props
    this.setState({
      isLoading: true
    })
    try {
      let items = (await loadItems()) || providedItems
      // filter null and undefined
      items = items.filter(item => !!item)
      if (typeof processItems === 'function') {
        items = processItems(items)
      }
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
  startPolling = (interval) => {
    const intervalHandler = setInterval(this.loadItems, interval)
    this.setState({
      intervalHandler
    })
  }
  stopPolling = () => {
    const { intervalHandler } = this.state
    if (intervalHandler) {
      clearInterval(intervalHandler)
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.dataSource !== prevState.dataSource) {
      return { dataSource: nextProps.dataSource }
    }
    return null
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.dataSource !== this.props.dataSource ){
      console.log('data source changed in list', this.props.dataSource)
      this.loadItems()
      // TODO handle polling here
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
  renderHeader() {
    const { items } = this.state
    const { elements } = this.props
    return (
      <Row style={{
        height: 40,
        padding: 10,
        backgroundColor: 'rgba(243, 243, 243, 0.1)',
        alignItems: 'center'
      }}>
        {elements && elements()}

        {items.length > 100 && <Pagination />}
      </Row>
    )
  }
  renderItems() {
    const { items } = this.state
    const { style, renderItem = () => { }, itemName = "items" } = this.props
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        ...style
      }}>
        {items.length > 0
          ? items.map(renderItem)
          : <h2 style={{ alignSelf: 'center', color: '#ccc' }}>No {itemName} found</h2>
        }
      </div>
    )
  }
  render() {
    const { isLoading, error } = this.state
    const { header = true } = this.props
    return (
      <div
        className="List"
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
        }}>
        {header && this.renderHeader()}
        {error
          ? <Error error={error} />
          : isLoading ? this.renderLoading() : this.renderItems()
        }
      </div>
    )
  }
}
