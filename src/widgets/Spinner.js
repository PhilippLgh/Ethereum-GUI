import React, { Component } from 'react'

export default class Spinner extends Component {
  state = {
    dimensions: undefined
  }
  componentDidMount() {
    const dimensions = this.container.getBoundingClientRect();
    const { width } = dimensions
    this.setState({
      dimensions: {
        width
      }
    });
  }
  render() {
    const { dimensions } = this.state
    let size = dimensions ? dimensions.width * 0.1 : undefined
    const fillColor = '#7D4CDB'
    return (
      <div 
      ref={c => (this.container = c)}
      style={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }} >
        <svg
          version="1.1"
          viewBox="0 0 32 32"
          width={ size || '48px'}
          height={ size || '48px'}
          fill={ fillColor }
        >
          <path
            opacity=".25"
            d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"
          />
          <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 16 16"
              to="360 16 16"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
    )
  }
}

