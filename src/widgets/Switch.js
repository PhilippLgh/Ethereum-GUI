import React, { Component, Fragment } from 'react'
import Text from './Text'

export default class Switch extends Component {
  render() {
    const { checked = false, onChecked = () => { }, style = {} } = this.props
    return (
      <span style={{
        marginLeft: 5,
        marginRight: 10
      }}>

        <input type="checkbox" id="scales" name="scales" checked={checked} onChange={(ev) => {
          const exclude = !ev.target.checked

        }} />
        <Text style={{
          fontWeight: 'bold',
          color: 'white'
        }}>Decoded</Text>
      </span>

    )
  }
}
