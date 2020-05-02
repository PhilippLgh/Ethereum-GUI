import React, { Component, Fragment } from 'react'
import Clickable from './Clickable'
import Text from './Text'
import { withGlobalState } from '../Context'
import { showNotification } from './Notification'

const getTokenInfo = (address) => {
  if (address && address.toLowerCase() === '0x744d70FDBE2Ba4CF95131626614a1763DF805B9E'.toLowerCase()) {
    return {
      name: 'Status Token',
      icon: 'https://etherscan.io/token/images/status.png'
    }
  }
  return undefined
}

class Address extends Component {
  state = {
    tokenInfo: undefined
  }
  componentDidMount = () => {
    const { address } = this.props
    const tokenInfo = getTokenInfo(address)
    this.setState({
      tokenInfo
    })
  }
  handleClick = () => {
    let { address } = this.props
    // TODO handle not available
    navigator.clipboard.writeText(address).then(function () {
      console.log('Async: Copying to clipboard was successful!');
      showNotification('Copied: '+address)
    }, function (err) {
      console.error('Async: Could not copy text: ', err);
      alert('failed to copy')
    });
  }
  render() {
    const { tokenInfo } = this.state
    let { address, short = false, contract = false, style = {}, label, global } = this.props
    const useAlias = global.state.alias
    if (short) {
      address = [
        ...address.split('').slice(0, 7),
        '...',
        ...address.split('').slice(42 - 5)
      ].join('')
    }
    if (useAlias) {
      const aliases = global.state.aliases
      address = address in aliases ? aliases[address] : address
      if (tokenInfo) {
        address = tokenInfo.name
      }
    }
    return (
      <Fragment>
        {label && <Text text={label} style={{ paddingRight: 7 }} />}
        <Clickable
          onClick={this.handleClick}
          style={{
            ...style,
            fontWeight: (contract || tokenInfo) ? 'bold' : 'normal',
          }}
        >
          <div style={{
            color: tokenInfo ? 'rgb(8, 115, 167)' : 'inherit',
            height: '1rem'
          }}>
            { tokenInfo && <img alt={`${tokenInfo.name} token logo`} src={tokenInfo.icon} style={{
            maxWidth: '90%',
            height: 'auto',
            maxHeight: '90%', 
            marginRight: 5
            }} /> }
            {address}
          </div>
        </Clickable>
      </Fragment>
    )
  }
}

export default withGlobalState(Address)
