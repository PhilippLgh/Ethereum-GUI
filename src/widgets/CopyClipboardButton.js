import React, { Component } from 'react'
import Clickable from './Clickable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaste } from '@fortawesome/free-solid-svg-icons'


export default class CopyClipboardButton extends Component {
  copyToClipboard = () => {
    const { value } = this.props
    if (!value) { return }
    navigator.clipboard.writeText(value).then(function () {
      console.log('Async: Copying to clipboard was successful!');
      alert('copied: '+value)
    }, function (err) {
      console.error('Async: Could not copy text: ', err);
      alert('failed to copy')
    });
  }
  render() {
    return (
      <Clickable onClick={this.copyToClipboard} style={{ width: '1.5rem', height: '1.5rem'}}>
        <FontAwesomeIcon icon={faPaste} style={{ width: '100%', height: '100%', color: '#666' }} />
      </Clickable>
    )
  }
}
