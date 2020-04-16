import React, { Component } from 'react'
import { withGlobalState } from '../Context'
import { useTheme } from '../Theme'
import Text from './Text'

class Button extends Component {
  render() {
    const { style, global, enabled= true } = this.props
    const theme = useTheme(global)
    return (
      <button 
        style={{
          paddingTop: 3,
          paddingBottom: 3,
          ...style,
          backgroundColor: 'transparent',
          color: theme.foreground,
        }}
        disabled={!enabled}
        onClick={this.props.onClick}
      >
        <span style={{
          opacity: enabled ? 1 : 0.25
        }}>{this.props.children || <Text>{this.props.label}</Text>}</span>
      </button>
    )
  }
}

export default withGlobalState(Button)
