import React, { Component } from 'react'
import { Row } from './Row'

export default class Tabs extends Component {
  state = {
    selectedTab: 0
  }
  componentDidMount() {
    
  }
  changeSelectedTab(idx) {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(idx)
    } else {
      this.setState({ selectedTab: idx })
    }
  }
  render() {
    let { selectedTab } = this.state
    selectedTab = this.props.selectedTab || selectedTab
    let { children, style } = this.props
    if (!Array.isArray(children)) {
      children = [children]
    }
    return (
      <div 
      className="Tabs"
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflow: 'hidden'
      }}>
        <Row style={{ justifyContent: 'normal' }}>{children.map((c, idx) => c && // && allows children to be empty / false / conditionally  inserted
        <div
          key={idx}
          style={{ 
            margin: 5, 
            fontWeight: 'bold',
            borderBottom: idx === selectedTab ? '2px solid #08a79c' : 'none',
            cursor: 'pointer',
            padding: 3,
            ...style 
          }}
          onClick={() => this.changeSelectedTab(idx)}
        >{c.props.label}</div>)}
        </Row>

        {children[selectedTab]}

      </div>
    )
  }
}