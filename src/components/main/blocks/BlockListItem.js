import React, { Component } from 'react'
import ListItem from '../../../widgets/ListItem'
import DateField from '../../../widgets/DateField'
import Pill from '../../../widgets/Pill'
import Address from '../../../widgets/Address'
import Gas from '../../../widgets/Gas'

function BlockInfo({ number }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'left',
      padding: 5,
      marginRight: 5
    }}>
      <span>Block</span>
      <span style={{
        fontWeight: 'bold',
      }}># { number }</span>
    </div>
  )
}

function TxInfo({ txHashes }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'left',
      padding: 5
    }}>

      <Pill>{ txHashes.length } Transactions</Pill>
    </div>
  )
}

export default class Block extends Component {
  render() {
    const { block } = this.props
    const {
      parentHash,
      hash,
      number,
      difficulty,
      timestamp,
      nonce,
      // extraData,
      // gasLimit,
      gasUsed,
      miner,
      transactions: txHashes
    } = block
    return (
      <ListItem className="BlockListItem" to={`/blocks/${number}`}>
        <BlockInfo number={number} />
        <div style={{
          flex: 1,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <span>Hash: { hash }</span>
          <span>Parent: { parentHash.toString() }</span>
          <span>Nonce: { nonce }</span>
          <span>Difficulty: { difficulty }</span>
          <span>Gas Used: <Gas gas={gasUsed} /></span>
          <span>Mined: <DateField ts={timestamp} /> by: <Address address={miner} /></span>
        </div>
        <TxInfo txHashes={txHashes} />
      </ListItem>
    )
  }
}

