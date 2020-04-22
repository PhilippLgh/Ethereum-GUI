import React, { Component } from 'react'
import { Row } from '../../../widgets/Row'
import Select from '../../../widgets/Select'
import Switch from '../../../widgets/Switch'
import CompilerWorker from '../../../js/Compiler.worker'
import { remote } from '../../../js/remote'
import Button from '../../../widgets/Button'

export default class Compiler extends Component {
  state = {
    compiler: undefined,
    compilerVersions: [],
    compiling: false,
    result: undefined
  }
  componentDidMount = async () => {
    const compiler = remote(new CompilerWorker())
    this.setState({ compiler })

    const compilerVersions = await compiler.getVersions()
    this.setState({
      compilerVersions: [...compilerVersions]
    })
  }
  compile = async () => {
    const { source, onData = () => {} } = this.props
    const { compiler } = this.state
    this.setState({
      compiling: true
    })
    try {
      const result = await compiler.compile(source)
      this.setState({
        compiling: false,
        result
      })
      onData(result)
    } catch (error) {
      this.setState({
        compiling: false,
      })
      alert('compiler crashed'+error.message)
    }
  }
  render() {
    const { source } = this.props
    const { compiling, compilerVersions, result } = this.state
    return (
      <div>
        <Row style={{
          marginBottom: 10,
          marginTop: 10,
          padding: 20,
          border: '1px solid #80808040',
          justifyContent: 'normal',
          alignItems: 'flex-end'
        }}>
          <Select label={"Compiler version:"} options={compilerVersions} />
          <Button 
            style={{
              marginLeft: 20,
              marginRight: 20
            }}
            enabled={!!source && !compiling}
            label="Compile"
            icon={compiling ? 'Spinner' : 'Play'}
            onClick={this.compile}
          />
          <Switch style={{ alignSelf: 'flex-end' }} label="compile on change"></Switch>
        </Row>
        <Row>
        {result && result.errors && 
          result.errors.map((error, idx) => <span key={idx}>Compiler error: <pre>{error.formattedMessage}</pre></span>)
        }
        </Row>
      </div>
    )
  }
}
