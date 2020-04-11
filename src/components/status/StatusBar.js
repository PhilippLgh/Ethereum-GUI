import React, { Component } from 'react'
import CurrentBlockNumber from './StatusItems/CurrentBlockNumber'
import GasPrice from './StatusItems/GasPrice'
import GasLimit from './StatusItems/GasLimit'
import HardforkName from './StatusItems/HardforkName'
import NetworkId from './StatusItems/NetworkId'
import RpcServer from './StatusItems/RpcServer'
import Currency from './StatusItems/Currency'
import Signer from './StatusItems/Signer'
import StateTime from './StatusItems/StateTime'
import { withGlobalState } from '../../Context'
import { useTheme } from '../../Theme'
import GlobalToggle from './GlobalToggle'



class StatusBar extends Component {
  renderItem = (item, provider) => {
    const { name, exclude } = item
    if (exclude) {
      return
    }
    if (name === 'current_block') {
      return <CurrentBlockNumber key={name} provider={provider} block={this.props.currentBlock} />
    } 
    else if(name === 'state_time'){
      return <StateTime key={name} />
    }
    else if(name === 'gas_price'){
      return <GasPrice key={name} provider={provider} />
    }
    /* <GasLimit provider={provider} /> */ 
    else if(name === 'hardfork'){
      return <HardforkName key={name} provider={provider} />
    }
    else if(name === 'network'){
      return <NetworkId key={name} provider={provider} />
    }
    else if(name === 'rpc_server'){
      return <RpcServer key={name} provider={provider} />
    }  
    else if(name === 'currency'){
      return <Currency key={name}/>
    }  
    else if(name === 'signer'){
      return <Signer key={name} provider={provider}/>
    }
    else if(name === 'alias'){
      return <GlobalToggle key={name} label="Alias" name={"alias"} options={[true, false]} />
    }        
    else if(name === 'theme'){
      return <GlobalToggle key={name} label="Theme" name={"theme"} options={['light', 'dark']}  />
    } 
  }
  render() {
    const { provider, global } = this.props
    const theme = useTheme(global)

    const items = global.state.statusBarItems

    return (
      <div className="StatusBar" style={{
        display: 'flex',
        backgroundColor: theme.statusBar.backgroundColor,
        padding: 5,
        marginBottom: 5,
        fontSize: '0.8rem',
        boxShadow: 'rgba(31, 30, 30, 0.1) 0px 2px 4px 0px'
      }}>
        {
          items.map(item => this.renderItem(item, provider))
        }
      </div>
    )
  }
}

export default withGlobalState(StatusBar)
