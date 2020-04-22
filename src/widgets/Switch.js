import React, { Component } from 'react'
import Text from './Text'

export default class Switch extends Component {
  render() {
    const { checked = false, label, onChecked = () => { }, style = {} } = this.props
    return (
      <span style={{
        marginLeft: 5,
        marginRight: 10,
        ...style
      }}>

        <input type="checkbox" id="scales" name="scales" checked={checked} onChange={(ev) => {
          const exclude = !ev.target.checked
          onChecked(exclude)
        }} />
        <Text style={{
          fontWeight: 'bold',
          color: style.color
        }}>{label}</Text>
      </span>

    )
  }
}
