import React, { Component } from 'react'
import Button from '../../../widgets/Button'
import Tabs from '../../../widgets/Tabs'
import Tab from '../../../widgets/Tab'

const scriptCode = `
const run = async () => {
  let i = 0
  while(i++ < 10){
    await api.createAccount(100)
  }
}
module.exports = { run, ui: { button: { label: 'Create 10' }, insert: 'accounts' } }
`

export default class CreateScript extends Component {
  state = {
    code: scriptCode,
    result: undefined,
    error: undefined
  }
  componentDidMount = () => {
    setTimeout(() => {
      this.runScript(this.state.code)
    }, 1000)
  }
  onChange = (ev) => {
    const code = ev.target.value
    this.setState({
      code
    })
    this.runScript(code)
  }
  runScript = (code) => {
    // eslint-disable-next-line
    const api = {
      createAccount: async () => {
        console.log('create account called')

      }
    }
    let result
    try {
      // eslint-disable-next-line
      result = eval(code)
    } catch (error) {
      return this.setState({
        error
      })
    }
    console.log('result', result)
    this.setState({
      result,
      error: undefined
    })
  }
  render() {
    const { code, result, error } = this.state
    return (
      <div>
        <h3>Create a script</h3>
        <h5>Examples</h5>
        <Tabs>
          <Tab label="Create 10 random accounts">
            <textarea
              value={code}
              onChange={this.onChange}
              rows="15"
              style={{
                flex: 1
              }}
            />
          </Tab>
        </Tabs>

        <h3>Preview</h3>
        <div style={{ height: 200, border: '1px solid black', padding: 5, marginBottom: 10 }}>
          {
            result && result.ui && !error
              ? <Button label={result.ui.button.label} onClick={result.run} />
              : <span>error: {error ? error.message : ''}</span>
          }
        </div>
        <Button>Save</Button>
      </div>
    )
  }
}
