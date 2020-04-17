import React, { Component } from 'react';
import './App.css';
import { ethers } from 'ethers';
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
import NoConnection from './widgets/NoConnection';



class App extends Component {
  state = {
    provider: undefined,
    currentBlock: 0,
    interval: undefined
  }
  componentDidMount = async () => {
    // initial state
    const state = {}
    try {
      // const provider = new ethers.providers.InfuraProvider()
      // ./geth --dev --rpc --rpccorsdomain="*" --rpcapi "eth,web3,personal,net,debug" --allow-insecure-unlock
      state.provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545')
      // state.currentBlock = await state.provider.getBlockNumber()
    } catch (error) {
      return this.setState({
        error
      })
    }
    // const provider = new ethers.providers.JsonRpcProvider('http://localhost:7545')
    this.setState({
      ...state
    })
    // this.startPolling(state.provider)
    const { global } = this.props
    global.setState({
      provider: state.provider
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
    const { provider, currentBlock, error } = this.state
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
          {
            provider && <StatusBar provider={provider} currentBlock={currentBlock} />
          }
          {
            provider
              ? (
                <main>
                  <Routes provider={provider} currentBlock={currentBlock} />
                </main>
              )
              : (error ? <Error error={error} /> : <span>Waiting for provider</span>)
          }
        </div>
      </Router>
    );
  }
}

export default withNewContext(withGlobalState(App))