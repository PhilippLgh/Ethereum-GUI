import React, { Component } from 'react'
import FileChooser from '../../../../widgets/FileChooser'
import Tab from '../../../../widgets/Tab'
import JsonTreeView from './JsonTreeView'

export default class CodeTab extends Component {
  state = {
    value: '',
    hasFocus: false
  }
  handleChange = (ev) => {
    this.setState({
      value: ev.target.value
    })
    this.props.onChange(ev.target.value)
  }
  renderOverlay() {
    const { onData } = this.props
    return (
      <div style={{
        display: 'flex',
        position: 'absolute',
        backgroundColor: '#cecece29',
        left: '50%',
        width: 200,
        marginLeft: -110,
        padding: 20,
        top: '40%',
      }}>
        <FileChooser onData={onData} />
      </div>
    )
  }
  onFocus = () => {
    this.setState({ hasFocus: true })
  }
  onBlur = () => {
    this.setState({ hasFocus: false })
  }
  render() {
    const { source, label } = this.props
    let { value, hasFocus } = this.state
    value = source || value
    if (typeof value !== 'string') {
      value = JSON.stringify(value, null, 2)
    }
    return (
      <Tab label="Source"
        onBlur={this.onBlur}
        style={{
          flex: 1,
          overflow: 'auto'
        }}
      >
        <div style={{
          position: 'relative',
          display: 'flex',
          flex: 1
        }}>
          {label === 'AST'
            ? <JsonTreeView data={source} />
            : <textarea
              readOnly={false}
              style={{
                backgroundColor: hasFocus ? 'transparent' : '#cacaca17',
                flex: 1
              }}
              value={value}
              onChange={this.handleChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
            />
          }
          {!hasFocus && !value && this.renderOverlay()}
        </div>
      </Tab >
    )
  }
}
