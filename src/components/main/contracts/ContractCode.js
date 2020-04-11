import React, { Component } from 'react'
import { Row } from '../../../widgets/Row'
import Tabs from '../../../widgets/Tabs'
import Tab from '../../../widgets/Tab'
import FileChooser from '../../../widgets/FileChooser'

class CodeTab extends Component {
  state = {
    value: '',
    hasFocus: false
  }
  handleChange = (ev) => {
    this.setState({
      value: ev.target.value
    })
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
        top: '40%'
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
    const { source } = this.props
    let { value, hasFocus } = this.state
    value = source || value
    return (
      <Tab label="Source"
        onBlur={this.onBlur}
      >
        <div style={{
          position: 'relative',
          display: 'flex',
          flex: 1
        }}>
          <textarea
            readOnly={false}
            style={{ 
              width: '100%',
              backgroundColor: hasFocus ? 'transparent' : '#cacaca17'
            }}
            rows={20}
            value={value}
            onChange={this.handleChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
          {!hasFocus && !value && this.renderOverlay()}
        </div>
      </Tab >
    )
  }
}

export default class ContractCode extends Component {
  state = {
    code: '',
    abi: '',
    bytecode: '',
  }
  componentDidMount = async () => {
    const { provider, address } = this.props
    if (!address) {
      return
    }
    const bytecode = await provider.getCode(address)
    this.setState({
      bytecode
    })
  }
  handleSolcArtifact = (data) => {
    console.log('data', data)
    const { abi, source, bytecode } = data
    this.setState({
      source,
      abi: JSON.stringify(abi, null, 2),
      bytecode
    })
    this.props.onData(data)
  }
  renderTabs() {
    return (
      <Row style={{
        marginTop: 30,
        justifyContent: 'left'
      }}>
        <Tabs>
          {['Bytecode', 'Source', 'ABI'].map(a => <CodeTab key={a} label={a} source={this.state[a.toLowerCase()]} onData={this.handleSolcArtifact} />)}
        </Tabs>
      </Row>
    )
  }
  renderPlaceholder() {
    return (
      <div style={{
        height: 100,
        width: '100%',
        border: '1px dashed black'
      }}>
      </div>
    )
  }
  render() {
    return (
      <div style={{
        margin: 10
      }}>
        {this.renderTabs()}
      </div>
    )
  }
}
