import React, { Component } from 'react'
import { EventEmitter } from 'events'

const emitter = new EventEmitter()

export const showNotification = (msg, options) => {
  emitter.emit('show', msg, options)
}

export default class Notification extends Component {
  state = {
    offset: -500,
    msg: '',
    options: undefined
  }
  showNotification = (msg, options) => {
    this.setState({
      offset: 50,
      msg,
      options
    })
    this.timeout = setTimeout(this.hideNotification, 3000)
  }
  hideNotification = () => {
    this.setState({
      offset: -500,
    }) 
  }
  componentDidMount = () => {
    emitter.on('show', (msg, options) => this.showNotification(msg, options))
  }
  componentWillUnmount = () => {
    if (this.timeout) {
      clearInterval(this.timeout)
    }
  }
  handleClick = () => {
    this.hideNotification()
  }
  render() {
    const { offset, msg, options } = this.state
    const position = 'bottom' // 'top'
    const style = {}
    style[position] = offset

    return (
      <div 
      onClick={this.handleClick}
      onBlur={this.hideNotification}
      style={{
        position: 'fixed',
        right: 20,
        backgroundColor: options && options.type === 'success' ? '#08a79c' : 'white',
        color: options && options.type === 'success' ? 'white' : '#6e6e6e',
        zIndex: 99,
        transition: position+' .75s ease',
        border: '1px solid #80808040',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        padding: 20,
        paddingLeft: 80,
        paddingRight: 80,
        ...style
      }}>
        <h3>{msg}</h3>
      </div>
    )
  }
}
