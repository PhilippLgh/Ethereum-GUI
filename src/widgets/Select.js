import React, { Component } from 'react'

export default class Select extends Component {
  render() {
    const { options = [], label } = this.props
    return (
      <div style={{
        display: 'inline-flex',
        flexDirection: 'column',
      }}>
        <label htmlFor={label}>{label}</label>
        <select id={label} style={{ marginTop: 5 }}>
          {
            options.map(option => <option key={option} value={option}>{option}</option>)
          }
        </select>
      </div>
    )
  }
}
