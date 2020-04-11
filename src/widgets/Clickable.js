import React, { Component } from 'react'

export default class Clickable extends Component {
  state = {
    hover: false
  }
  onMouseOver = (e) => {
    // only display hover on top most element:
    this.setState({
      hover: true
    })
    e.stopPropagation();
  }
  render() {
    const { onClick = () => { }, style = {} } = this.props
    const { hover } = this.state
    return (
      <div
        onClick={(e) => {
          onClick()
          e.stopPropagation()
          e.preventDefault()
        }}
        className="clickable"
        style={{
          display: 'inline-block',
          paddingTop: 5,
          paddingBottom: 5,
          cursor: 'pointer',
          ...style,
          backgroundColor: hover ? '#bdbdbd15' : style.backgroundColor
        }}
        onMouseEnter={this.onMouseOver}
        onMouseOver={this.onMouseOver}
        onMouseOut={() => this.setState({ hover: false})}
      >
        {this.props.children}
      </div>
    )
  }
}
