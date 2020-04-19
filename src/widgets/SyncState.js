import React, { Component } from 'react'

export default class SyncState extends Component {
  state = {
    intervalHandler: undefined,
    isSyncing: false,
    syncInfo: {
      startingBlock: 0,
      currentBlock: 0,
      highestBlock: 0
    }
  }
  componentDidMount = async () => {
    const { provider } = this.props
    const intervalHandler = setInterval(async () => {
      try {
        const syncInfo = await provider.send('eth_syncing')
        if (syncInfo) {
          this.setState({
            isSyncing: true,
            syncInfo: {
              ...syncInfo
            }
          })
        }
      } catch (error) {
        this.setState({
          isSyncing: false
        })
      }
    }, 1500)
    this.setState({
      intervalHandler
    })
  }
  componentWillUnmount = () => {
    const { intervalHandler } = this.state
    if (intervalHandler) {
      clearInterval(intervalHandler)
    }
  }
  render() {
    const { renderSyncState = () => <div>No renderer</div>} = this.props
    let { syncInfo, isSyncing } = this.state
    if (syncInfo) {
      const { highestBlock } = syncInfo
      if (highestBlock === 0) {
        syncInfo = false
      }
    }
    if (!isSyncing) {
      syncInfo = undefined
    }
    return renderSyncState(syncInfo)
  }
}