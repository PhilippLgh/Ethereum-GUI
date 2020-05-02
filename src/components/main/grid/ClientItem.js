import React, { Component } from 'react'

export default class ClientItem extends Component {
  render() {
    const { client, selected, onClick } = this.props
    const { name, logo, deactivated } = client
    return (
      <div
        style={{
          width: 100,
          height: 100,
          padding: selected ? 5 : 6,
          margin: 5,
          borderWidth: selected ? 2 : 1,
          borderStyle: 'solid',
          borderColor: selected ? '#08a79c' : '#999',
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: deactivated ? 0.3 : 1,
          cursor: deactivated ? 'normal' : 'pointer',
        }}
        onClick={deactivated ? () => { } : onClick}
      >
        <img
          style={{
            maxWidth: '100%',
            height: 'auto',
            maxHeight: '100%'
          }}
          src={logo} />
      </div>
    )
  }
}
