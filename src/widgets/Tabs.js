import React, { Component } from 'react'
import { Row } from './Row'

export default class Tabs extends Component {
  state = {
    selectedTab: 0
  }
  render() {
    let { selectedTab } = this.state
    selectedTab = this.props.selectedTab || selectedTab
    let { children } = this.props
    if (!Array.isArray(children)) {
      children = [children]
    }
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}>
        <Row style={{ justifyContent: 'normal' }}>{children.map((c, idx) => <div
          key={idx}
          style={{ 
            margin: 5, 
            fontWeight: 'bold',
            borderBottom: idx === selectedTab ? '1px solid black' : 'none',
            cursor: 'pointer' 
          }}
          onClick={() => this.setState({ selectedTab: idx })}
        >{c.props.label}</div>)}</Row>

        {children[selectedTab]}

      </div>
    )
  }
}