import React, { Component } from 'react'

export default class TextField extends Component {
  render() {
    const { label, value, onChange, suffix, disabled=false, required=false, style } = this.props
    return (
      <div style={{
        alignItems: 'center',
        ...style
      }}>
        <label
          style={{
            fontSize: '1rem'
          }}
          data-shrink="true"
          htmlFor="standard-required"
          id="standard-required-label">
          {label}
          { required && <span>*</span> }
        </label>
        <div
          style={{
            marginTop: 5,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <input
            disabled={disabled}
            size="50"
            style={{
              fontSize: 'inherit',
              boxSizing: 'content-box',
              background: 'none',
              margin: 0,
              padding: 10,
              font: 'inherit',
              height: '1.4rem',
              border: '1px solid gray',
              borderRadius: 3
            }}
            type="text"
            aria-invalid="false"
            id="standard-required"
            required=""
            value={value}
            onChange={e => onChange(e.target.value)}
          />
          { suffix && <span style={{ padding: 5, opacity: 0.7 }}>{suffix}</span>}
        </div>
      </div>
    )
  }
}
