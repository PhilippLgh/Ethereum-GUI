import React, { Component } from 'react'
import Container from '../../../widgets/Container'
import CommandLineSnippet from '../../../widgets/CommandLineSnippet'
import { withGlobalState } from '../../../Context'
import Grid from '../grid/Grid'

class Client extends Component {
  state = {}
  componentDidMount = async () => {
    const { provider } = this.props
    try {
      const clientInfo = await provider.send('web3_clientVersion')
      this.setState({
        clientInfo
      })
    } catch (error) {
      console.log('error', error)
    }
  }
  renderClientInfo = () => {
    const { provider } = this.props
    const { clientInfo } = this.state
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <pre>
          {JSON.stringify(clientInfo, null, 2)}
        </pre>
        {/* <SyncState provider={provider} /> */}
      </div>
    )
  }
  renderHowTo = () => {
    const { global } = this.props
    const { state: globalState } = global
    const { selectedProvider } = globalState
    const command = './geth --dev --rpc --rpccorsdomain="*" --rpcapi "eth,web3,personal,net,debug" --allow-insecure-unlock'
    return (
      <div style={{
        border: '2px solid #ff9245',
        borderRadius: 20,
        padding: 30,
        fontSize: '1.2rem'
      }}>
        <div>It seems your client is not running or your connection has problems.</div>
        <div>Try selecting a different provider or restart your client.</div>
        <br />
        <div>Client start command:</div>
        {selectedProvider === 'Ganache'? <span>Download and run Ganache: https://github.com/trufflesuite/ganache/releases/latest</span> : <CommandLineSnippet command={command} /> }
      </div>
    )
  }
  render() {
    const { clientInfo } = this.state
    const { global } = this.props
    const { state: globalState } = global
    const { isConnected } = globalState
    return (
      <Container>
        <h2>Client info</h2>
        {!isConnected && this.renderHowTo() }
        { false && this.renderClientInfo() }
        <Grid />
      </Container>
    )
  }
}

export default withGlobalState(Client)