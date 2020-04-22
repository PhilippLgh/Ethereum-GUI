import React, { Component } from 'react';
import './App.css';
import { ethers, providers } from 'ethers';
import {
  HashRouter as Router,
} from "react-router-dom"
import TopNavigation from './components/navigation/TopNavigation';
import StatusBar from './components/status/StatusBar';
import Error from './widgets/Error';
import { Row } from './widgets/Row';
import { withNewContext, withGlobalState } from './Context'
import { useTheme } from './Theme';
import Routes from './Routes';

const createProvider = (selectedProvider, providers) => {
  const providerConfig = providers.find(p => p.name === selectedProvider)
  const { url, name } = providerConfig
  let newProvider
  if (url === 'web3') {
    newProvider = new ethers.providers.Web3Provider(window.web3.currentProvider)
  } else {
    newProvider = new ethers.providers.JsonRpcProvider(`http://${url}`)
  }
  // we need a way to detect new instances of provider
  newProvider.createdAt = Date.now()
  return newProvider
}

class App extends Component {
  state = {
    currentBlock: 0,
    interval: undefined
  }
  componentDidMount = async () => {
    this.tryConnect()
  }
  tryConnect = () => {
    let { interval } = this.state
    if (interval) {
      return
    }
    const { global: _global } = this.props
    const connectionInterval = _global.state.connectionInterval || 2000

    const checkConnection = async () => {
      const { global } = this.props
      const { state: globalState } = global
      // some values are cached on old provider sow e should not re-use it when the connection comes back
      // such as the createdAt flag & potentially calls to getNetwork()
      // if we want to detect network changes of re-started clients we have to reset completely
      let { /*provider,*/ isConnected, selectedProvider, providers, } = globalState
      let provider = createProvider(selectedProvider, providers)
      let block
      try {
        block = await provider.getBlockNumber()
        // network cannot be used to check - seems to get cached
        // const network = await provider.getNetwork()
        if (block !== undefined && !isConnected) {
          global.setState({ isConnected: true, provider: provider })
        }
      } catch (error) {
        // console.log('error', error)
        if (isConnected) {
          global.setState({ isConnected: false })
        }
      }
      // only update if changed?
      // FIXME this causes many re-renders on all components
      if (block && this.state.currentBlock !== block) {
        this.setState({
          currentBlock: block || 0
        })
      }
    }

    // run once immediately
    checkConnection()
    interval = setInterval(checkConnection, connectionInterval)
    this.setState({
      interval,
    })
  }
  render() {
    const { state: globalState } = this.props.global
    const theme = useTheme(this.props.global)
    const navItems = globalState.navItems.filter(item => !item.exclude)
    const { currentBlock, error } = this.state
    const { provider } = globalState

    // TODO allows workflow to be part of url so that a link to a contract e.g. includes the infrastructure info
    return (
      <Router>
        <div className="App" style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          backgroundColor: theme.backgroundColor,
          fontFamily: `'Roboto', sans-serif`
        }} >
          <Row style={{ padding: 3, fontSize: '1.0rem' }}>
            <span style={{ color: '#939393' }}>Ethereum GUI v1.0.0</span>
            <span style={{ color: '#939393', marginRight: 10 }}>philipplgh.eth</span>
          </Row>
          <TopNavigation items={navItems} />
          <StatusBar provider={provider} currentBlock={currentBlock} />
          {error
            ? <Error error={error} />
            : (
              <main>
                <Routes provider={provider} currentBlock={currentBlock} />
              </main>
            )
          }
        </div>
      </Router>
    );
  }
}

export default withNewContext(withGlobalState(App))