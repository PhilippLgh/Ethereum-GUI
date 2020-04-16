import React, { Component } from 'react'
import { Row } from '../../../widgets/Row'
import Select from '../../../widgets/Select'
import Button from '../../../widgets/Button'
import CompilerWorker from '../../../js/Compiler.worker'
import { remote } from '../../../js/remote'

export default class Compiler extends Component {
  state = {
    compiler: undefined,
    compilerVersions: [],
    compiling: false,
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
    const { compiler } = this.state
    this.setState({
      compiling: true
    })
    const result = await compiler.compile()
    this.setState({
      compiling: false,
      result
    })
  }
  render() {
    const { compiling, compilerVersions } = this.state
    return (
      <div>
        <Row style={{ marginTop: 2, padding: 10, borderBottom: '1px solid #80808040' }}>
          <Select label={"Compiler version:"} options={compilerVersions} />
          <Button
            enabled={compiling ? false : true}
            onClick={this.compile}
            style={{ alignSelf: 'end' }}
            label="Compile"
          />
        </Row>
      </div>
    )
  }
}
