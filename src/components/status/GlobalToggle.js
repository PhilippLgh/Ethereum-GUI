import React, { Component } from 'react'
import StatusItem from './StatusItem'
import Clickable from '../../widgets/Clickable'
import { withGlobalState } from '../../Context'

class Toggle extends Component {
  toggle = () => {
    const { global, options, name } = this.props
    const value = global.state[name]
    const newValue = options.find(option => option !== value)
    const newState = {}
    newState[name] = newValue
    global.setState(newState)
  }
  render() {
    const { global, name, label } = this.props
    let value = global.state[name]
    return (
      <StatusItem label={label} value={() => <Clickable onClick={this.toggle} style={{ padding: 0 }}>{value.toString()}</Clickable> } />
    )
  }
}

export default withGlobalState(Toggle)