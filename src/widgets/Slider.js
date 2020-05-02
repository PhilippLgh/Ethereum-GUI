import React, { Component } from 'react'

export default class Slider extends Component {
  render() {
    const { value, min=0, max = 1000, onChange = () => {}} = this.props
    return (
      <div>
        <input style={{ width: '100%' }} type="range" min={min} max={max} value={value} onChange={e => onChange(e.target.value)} />
      </div>
    )
  }
}
