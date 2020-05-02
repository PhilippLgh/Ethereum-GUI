import React, { Component, Fragment } from 'react'
import Select from 'react-select'

export default class CustomSelect extends Component {
  render() {
    let { options = [], label, value: selectedOption, onChange, style, hint = '', isMulti } = this.props
    if (typeof selectedOption === 'string') {
      if (isMulti) {
        // selected value might be comma separated list
        const values = selectedOption.split(',')
        selectedOption = options.filter(o => values.includes(o.value))
      } else {
        selectedOption = options.find(o => o.value === selectedOption)
      }
    }
    return (
      <div style={{
        ...style,
        marginBottom: hint ? -12 : 0
      }}>
        <label htmlFor={label}>{label}</label>
        <div style={{
          marginTop: label ? 5 : 0,
          width: 330
        }}>
          <Select 
            menuPortalTarget={document.body}
            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
            defaultValue={selectedOption}
            options={options}
            onChange={onChange} 
            isMulti={isMulti}
            />
        </div>
        { hint && <div style={{ padding: 5 }}>{hint}</div> }
      </div>
    )
  }
}
