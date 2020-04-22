import React, { Component } from 'react'
import Container from '../../../widgets/Container'
import { Row } from '../../../widgets/Row'
import { utils } from 'ethers'
import LabeledForm from '../../../widgets/LabeledForm'
import TrieViz from './TrieViz'
import { Switch, Route, withRouter } from 'react-router-dom'
import ListItem from '../../../widgets/ListItem'
import List from '../../../widgets/List'
import Ethpkg from './Ethpkg'

class InputField extends Component {
  render() {
    const { label, value, onChange = () => { } } = this.props
    return (
      <Row style={{
        justifyContent: 'normal',
        marginTop: 10,
        fontSize: '1.1rem'
      }}>
        <span style={{ marginRight: 10, width: 50, padding: 5 }}>{label}</span>
        <input style={{ flexGrow: 1 }} type="text" value={value} onChange={(e) => onChange(e.target.value)} />
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
        <InputField label="Input" value={input} onChange={this.handleInput} />
        <InputField label="Output" value={output} />
      </LabeledForm>
    )
  }
}

class Tools extends Component {
  renderOverview() {
    const { match } = this.props
    const { path } = match
    const tools = [
      { name: 'ethpkg', to: `${path}/ethpkg` }
      , { name: 'trie', to: `${path}/trie` }
    ]
    return (
      <List
        items={tools}
        renderItem={item => <ListItem key={item.to} to={item.to}><span>{item.name}</span></ListItem>}
      />
    )
  }
  render() {
    const { match } = this.props
    const { path } = match
    console.log('route path', match)
    return (
      <Container>
        <h2>Tools</h2>
        {this.renderOverview()}
        <div style={{
          flex: 5
        }}>
          <Switch>
            <Route exact path={path}>
              {/* 
            <Row>
              <Converter />
              next contract address calculator + lurch support
              <span></span>
              <span></span>
            </Row>
            */}
            </Route>
            <Route path={`${path}/ethpkg`}>
              <Ethpkg />
            </Route>
            <Route path={`${path}/trie`}>
              <TrieViz />
            </Route>
          </Switch>
        </div>
      </Container>
    )
  }
}

export default withRouter(Tools)
