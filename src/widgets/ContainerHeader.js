import React, { Component } from 'react'
import { Row } from './Row'
import BackButton from './BackButton'

export default class ContainerHeader extends Component {
  render() {
    const { title } = this.props
    return (
      <Row style={{
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <BackButton />
        <span style={{
          fontSize: '1.35rem',
          color: '#666',
          alignSelf: 'center'
        }}>{typeof title === 'function' ? title() : title}</span>
        {/* space element */}
        <div></div>
      </Row>
    )
  }
}
