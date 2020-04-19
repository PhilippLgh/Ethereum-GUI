import React, { Component } from 'react'
import StatusItem from '../StatusItem'
import { withGlobalState } from '../../../Context'

class Network extends Component {
  state = {
    networkId: 'no network',
    networkName: ''
  }
  componentDidMount = async () => {
    const { provider } = this.props
    try {
      const network = await provider.getNetwork() 
      console.log('network', network)
      const { chainId: networkId, name: networkName } = network
      this.setState({
        networkId,
        networkName
      }) 
    } catch (error) {
      // reset
      this.setState({
        networkId: 'no network',
        networkName: ''
      }) 
    }
  }
  render() {
    const { global } = this.props
    const { state: globalState } = global
    const { isConnected } = globalState
    const { networkId, networkName } = this.state
    return (
      <StatusItem label="Network" value={isConnected ? `${networkId} ${networkName ? `(${networkName})` : ''}` : 'offline' } />
    )
  }
}

export default withGlobalState(Network)
