import React, { Component } from 'react'
import Container from '../../../widgets/Container'
import { Row } from '../../../widgets/Row'
import { BN } from 'ethereumjs-util'
import { Column } from '../../../widgets/Column'
import { bigNumberify } from 'ethers/utils'

const hexStringToDecimalString = val => {
  return new BN(val).toString(10)
}

class LargeNumber extends Component {
  render() {
    // TODO cache result / compute once
    let { num } = this.props
    num = hexStringToDecimalString(num)
    return <span>{num}</span>
  }
}

class SyncProgress extends Component {
  render() {
    const { syncInfo } = this.props
    const { startingBlock, currentBlock, highestBlock } = syncInfo
    const syncPercentage = highestBlock !== 0 ? Math.floor((currentBlock / highestBlock) * 100) : 0
    return (
      <Row>
        <Column>
          <span>Start: <LargeNumber num={startingBlock} /> </span>
          <span>Synced: <LargeNumber num={7000} /></span>
        </Column>
        <Column style={{
          display: 'flex',
          flexGrow: 2,
          alignItems: 'center'
        }}>
          <span>{syncPercentage}%</span>
          <progress style={{
            WebkitAppearance: 'none',
            width: '100%'
          }} id="file" value={syncPercentage} max="100" />
          <span>Block: <LargeNumber num={currentBlock} /></span>
        </Column>
        <Column>
        <span>Time left:</span>
        </Column>
        <Column>
        <span>Latest: {bigNumberify(highestBlock).toString()} </span>
        <span>Missing: { bigNumberify(highestBlock).sub(currentBlock).toString() } </span>
        </Column>
      </Row>
    )
  }
}

class SyncState extends Component {
  state = {
    intervalHandler: undefined,
    syncInfo: {
      startingBlock: 0,
      currentBlock: 0,
      highestBlock: 0
    }
  }
  componentDidMount = async () => {
    const { provider } = this.props
    const intervalHandler = setInterval(async () => {
      const syncInfo = await provider.send('eth_syncing')
      if (syncInfo) {
        this.setState({
          syncInfo: {
            ...syncInfo
          }
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
    const { syncInfo } = this.state
    return (
      <div>
        <h2>Blockchain Download</h2>
        <SyncProgress syncInfo={syncInfo} />
      </div>
    )
  }
}


export default class Client extends Component {
  state = {}
  componentDidMount = async () => {
    const { provider } = this.props
    const clientInfo = await provider.send('web3_clientVersion')
    this.setState({
      clientInfo
    })



  }
  render() {
    const { provider } = this.props
    const { clientInfo } = this.state
    return (
      <Container>
        <h2>Client</h2>
        <pre>
          {JSON.stringify(clientInfo, null, 2)}
        </pre>
        <SyncState provider={provider} />
        <h2>Disk Info</h2>
      </Container>
    )
  }
}
