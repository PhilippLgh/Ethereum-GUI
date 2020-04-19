import React, { Component } from 'react'
import CreateScript from './CreateScript'
import Container from '../../../widgets/Container'

export default class ScriptList extends Component {
  state = {
    scripts: []
  }
  componentDidMount = async () => {
    // get scripts here
  }
  render() {
    const { scripts } = this.state
    return (
      <Container>
        {
          scripts.length > 0
          ? <span>script list</span>
          : <CreateScript />
        }
      </Container>
    )
  }
}
