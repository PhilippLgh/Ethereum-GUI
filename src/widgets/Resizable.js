import React, { Component } from 'react'

export default class Resizable extends Component {
  state = {
    width: 0,
    height: 0
  }
  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize)
    this.getDimensions()
  }
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleResize)
  }
  getDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    this.setState({
      width,
      height
    })
  }
  handleResize = () => {
    this.getDimensions()
  }
  render() {
    const { width, height } = this.state
    return (
      <div style={{
        display: 'flex',
        flex: 1
      }}>
        { this.props.children }
      </div>
    )
  }
}
