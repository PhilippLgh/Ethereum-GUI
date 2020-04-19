import React, { Component } from 'react';
import './App.css';
import { ethers, providers } from 'ethers';
import {
  BrowserRouter as Router,
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
    interval = setInterval(async () => {
      const { global } = this.props
      const { state: globalState } = global
      let { provider, isConnected, selectedProvider, providers } = globalState
      provider = provider || createProvider(selectedProvider, providers)
      try {
        const block = await provider.getBlockNumber()
        // network cannot be used to check - seems to get cached
        // const network = await provider.getNetwork()
        if (block && !isConnected) {
          global.setState({ isConnected: true, provider: provider })
        }
      } catch (error) {
        // console.log('error', error)
        if (isConnected) {
          global.setState({ isConnected: false  })
        }
      }
    }, 2000)
    this.setState({
      interval,
    })
  }
  startPolling = (provider) => {
    let { interval, currentBlock } = this.state
    if (interval) { return }
    let errorCounter = 0
    interval = setInterval(async () => {
      try {
        let _currentBlock = await provider.getBlockNumber()
        if (_currentBlock > currentBlock) {
          this.setState({
            currentBlock: _currentBlock
          })
        }
      } catch (error) {
        errorCounter++
      }
    }, 500)
    this.setState({
      interval,
      errorCounter
    })
  }
  render() {
    const { state: globalState } = this.props.global
    const theme = useTheme(this.props.global)
    const navItems = globalState.navItems.filter(item => !item.exclude)
    const { currentBlock, error } = this.state
    const { provider } = globalState

    return (
      <Router>
        <div className="App" style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          backgroundColor: theme.backgroundColor,
          fontFamily: `'Roboto', sans-serif`
        }} >
          <Row style={{ padding: 3 }}>
            <span style={{ color: '#939393' }}>Ethereum GUI v1.0.0</span>
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