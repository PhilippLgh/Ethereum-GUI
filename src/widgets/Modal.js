import React, { Component } from 'react'

export default class Modal extends Component {
  state = {
    visibility: 'hidden'
  } 
  render() {
    // let { visibility = this.props.show } = this.state
    let { show, onClose = () => {}, children } = this.props
    let visibility = show ? 'visible' : 'hidden'
    return (
      <div style={{
        position: 'fixed',
        display: 'flex',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#2222227a',
        alignItems: 'center', 
        justifyContent: 'center',
        zIndex: 10,
        visibility
      }}
      onClick={() => { 
        // TODO hide here for immediate feedback?
        onClose() 
      }}
      >
        <div className="card" style={{
          backgroundColor: 'white',
          width: 500,
          height: 250,
          display: 'flex',
          visibility
        }}>
          { children }
        </div>
      </div>
    )
  }
}
