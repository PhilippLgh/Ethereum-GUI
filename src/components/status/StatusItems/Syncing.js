import React, { Component } from 'react'
import StatusItem from '../StatusItem'
import SyncState from '../../../widgets/SyncState'

const getSyncPercentage = ({ currentBlock, highestBlock }) => Math.ceil((currentBlock / highestBlock) * 100)

export default class Syncing extends Component {
  render() {
    return (
      <SyncState
        provider={this.props.provider}
        renderSyncState={syncInfo => {
          return (
            <StatusItem label="Sync" value={syncInfo === undefined ? 'no sync' : ( syncInfo === false ? '100' : `${getSyncPercentage(syncInfo)}%` )} />
          )
        }}
      />
    )
  }
}
