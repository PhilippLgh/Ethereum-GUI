import React, { Component } from 'react'
import Container from '../../../widgets/Container'
import Tree from '../../../widgets/Tree'
import Error from '../../../widgets/Error'
import Connectivity from '../../../widgets/Connectivity'

export default class Network extends Component {
  state = {
    networkData: undefined,
    error: undefined
  }
  componentDidMount = async () => {
    const { provider } = this.props
    // const modules = await provider.send('rpc_modules', [])
    // console.log('modules', modules)
    const root = {
      name: 'This Computer',
      children: []
    }
    try {
      const peers = await provider.send('admin_peers')
      console.log('peers', peers)

      for (const peer of peers) {
        const {
          name, // client-version-info
          id,
          enode,
          enr,
          protocol,
          network
        } = peer
        root.children.push({
          name,
          attributes: network,
          children: []
        })
      }

    } catch (error) {
      console.log('error', error)
      return this.setState({
        error
      })
    }
    this.setState({
      networkData: root
    })
  }
  render() {
    const { networkData, error } = this.state
    return (
      <Connectivity>
        <Container>
          {networkData && <Tree
            data={networkData}
            orientation="horizontal"
            pathFunc="straight"
            centered="vertically"
          />}
          <Error error={error} />
        </Container>
      </Connectivity>
    )
  }
}
