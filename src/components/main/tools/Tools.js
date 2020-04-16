import React, { Component } from 'react'
import Container from '../../../widgets/Container'
import { Row } from '../../../widgets/Row'
import { utils } from 'ethers'

class LabeledForm extends Component {
  render() {
    return (
      <div className="card" style={{
        backgroundColor: '#f3f3f34d',
        width: 500,
        height: 300,
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        borderRadius: 20
      }}>
        { this.props.children }
      </div>
    )
  }
}

class InputField extends Component {
  render() {
    const { label, value, onChange = () => {} } = this.props
    return (
      <Row style={{
        justifyContent: 'normal',
        marginTop: 10,
        fontSize: '1.1rem' 
      }}>
        <span style={{ marginRight: 10, width: 50, padding: 5  }}>{label}</span>
        <input style={{ flexGrow: 1 }} type="text" value={value} onChange={(e) => onChange(e.target.value) } />
      </Row>
    )
  }
}

class Converter extends Component {
  state = {
    input: '',
    output: ''
  }
  handleInput = (input) => {
    this.setState({
      input,
      output: utils.keccak256(Buffer.from(input))
      // output: utils.keccak256(utils.toUtf8Bytes(input))
    })
  }
  render() {
    const { input, output } = this.state
    return (
      <LabeledForm label="Converter">
        <select value="keccak">
         <option value="volvo">keccak</option>
        </select>
      <InputField label="Input" value={input} onChange={this.handleInput}/>
      <InputField label="Output" value={output} />
    </LabeledForm>
    )
  }
}

export default class Tools extends Component {
  render() {
    return (
      <Container>
          <h2>utils</h2>
          <Row>
            <Converter />
            {/* next contract address calculator + lurch support */}
            <span></span>
            <span></span>
            <span></span>
          </Row>

      </Container>
    )
  }
}
