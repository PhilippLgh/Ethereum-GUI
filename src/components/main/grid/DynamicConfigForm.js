import React, { Component } from 'react'
import Form from '../../../widgets/Form'
import TextField from '../../../widgets/TextField'
import Select from '../../../widgets/Select'

export default class ClientConfiguration extends Component {
  handleChange = () => {

  }
  renderField(setting) {
    let { id, type, label, default: defaultValue,  disabled = false, options, hint, isMulti } = setting
    if (Array.isArray(options)) {
      type = 'select'
    }
    switch (type) {
      case 'select': {
        return (
          <Select
            key={id}
            data-test-id={`input-select-${id}`}
            label={label}
            value={defaultValue}
            options={options}
            disabled={disabled}
            hint={hint}
            isMulti={isMulti}
            onChange={value => this.handleChange(id, value)}
          />
        )
      }
      default:
        return (
          <TextField
            key={id}
            data-test-id={`input-text-${id}`}
            variant="outlined"
            label={label}
            value={defaultValue}
            disabled={disabled}
            onChange={event => this.handleChange(id, event.target.value)}
            fullWidth
          />
        )
    }
  }
  render() {
    const { settings = [], style } = this.props
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        minHeight: 300,
        ...style
      }}>
        <Form style={{
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}>
          {settings.map(setting => this.renderField(setting))}
        </Form>
      </div>
    )
  }
}
