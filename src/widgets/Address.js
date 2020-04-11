import React, { Component, Fragment } from 'react'
import Clickable from './Clickable'
import Text from './Text'
import { withGlobalState } from '../Context'

class Address extends Component {
  handleClick = () => {
    let { address } = this.props
    // TODO handle not available
    navigator.clipboard.writeText(address).then(function () {
      console.log('Async: Copying to clipboard was successful!');
      alert('copied')
    }, function (err) {
      console.error('Async: Could not copy text: ', err);
      alert('failed to copy')
    });
  }
  render() {
    let { address, short = false, contract = false, style = {}, label, global } = this.props
    const useAlias = global.state.alias
    if (useAlias) {
      const aliases = global.state.aliases
      address = address in aliases ? aliases[address] : address
    }
    else if (short) {
      address = [
        ...address.split('').slice(0, 7),
        '...',
        ...address.split('').slice(42 - 5)
      ].join('')
    }
    return (
      <Fragment>
        {label && <Text text={label} style={{ paddingRight: 7 }} />}
        <Clickable
          onClick={this.handleClick}
          style={{
            ...style,
            backgroundColor: contract ? '#0095ff14' : style.backgroundColor
          }}
        >
          <span>
            {address}
          </span>
        </Clickable>
      </Fragment>
    )
  }
}

export default withGlobalState(Address)
