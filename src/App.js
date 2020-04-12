import React, { Component } from 'react';
import './App.css';
import { ethers } from 'ethers';
import BlockList from './components/main/blocks/BlockList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom"
import TransactionList from './components/main/transactions/TransactionList';
import StatusBar from './components/status/StatusBar';
import AccountsList from './components/main/accounts/AccountsList';
import Contracts from './components/main/contracts/Contracts';
import { Row } from './widgets/Row';
import CreateContractView from './components/main/contracts/CreateContractView';
import AccountDetails from './components/main/accounts/AccountDetails';
import ContractDetails from './components/main/contracts/ContractDetails';
import SendTransaction from './components/main/transactions/SendTransaction';
import BlockDetails from './components/main/blocks/BlockDetails';
import TransactionDetails from './components/main/transactions/TransactionDetails';
import ScriptList from './components/main/scripts/ScriptList';
import Error from './widgets/Error';
import Settings from './components/main/settings/Settings';
import { withNewContext, withGlobalState } from './Context'
import Text from './widgets/Text';
import { useTheme } from './Theme';
import AddressList from './components/main/addresses/AddressList';

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
      state.currentBlock = await state.provider.getBlockNumber()
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
          <nav className="TopNav" style={{
              backgroundColor: theme.topNav.backgroundColor,
              padding: 5,
              display: 'flex',
              justifyContent: 'left',
              borderBottom: '1px solid #c5c5c5'
          }}>
            {navItems.map(({ route, label }) => {
              return (
                <div className="NavItem" key={route} style={{
                  padding: 10,
                  fontWeight: 200,
                  fontSize: '1.25rem',
                  marginLeft: 10,
                  marginRight: 10
                }}>
                  <NavLink to={route} activeClassName="ActiveNav" style={{
                    color: theme.topNav.item.color,
                    textDecoration: 'none',
                    padding: 5
                  }}><Text>{label}</Text></NavLink>
                </div>
              )
            })}
          </nav>
          {
            provider && <StatusBar provider={provider} currentBlock={currentBlock} />
          }
          {
            provider
              ? (
                <main>
                  <Switch>
                    <Route path="/accounts/:address">
                      <AccountDetails provider={provider} />
                    </Route>
                    <Route path="/accounts">
                      <AccountsList provider={provider} />
                    </Route>
                    <Route path="/addresses">
                      <AddressList provider={provider} />
                    </Route>
                    <Route path="/blocks/:number">
                      <BlockDetails provider={provider} />
                    </Route>
                    <Route path="/blocks">
                      <BlockList provider={provider} start={0} end={currentBlock} />
                    </Route>
                    <Route path="/transactions/new" exact={true} >
                      <SendTransaction provider={provider} />
                    </Route>
                    <Route path="/transactions/:hash" exact={true} >
                      <TransactionDetails provider={provider} />
                    </Route>
                    <Route path="/transactions">
                      <TransactionList provider={provider} blockNumber={currentBlock} />
                    </Route>
                    <Route path="/contracts/new" exact={true} >
                      <CreateContractView provider={provider} />
                    </Route>
                    <Route path="/contracts/:address">
                      <ContractDetails provider={provider} />
                    </Route>
                    <Route path="/contracts">
                      <Contracts provider={provider} />
                    </Route>
                    <Route path="/scripts">
                      <ScriptList provider={provider} />
                    </Route>
                    <Route path="/settings">
                      <Settings provider={provider} />
                    </Route>
                  </Switch>
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