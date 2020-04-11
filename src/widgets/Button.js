import React, { Component } from 'react'
import { withGlobalState } from '../Context'
import { useTheme } from '../Theme'
import Text from './Text'

class Button extends Component {
  render() {
    const { style, global } = this.props
    const theme = useTheme(global)
    return (
      <button style={{
        paddingTop: 3,
        paddingBottom: 3,
        ...style,
        backgroundColor: 'transparent',
        color: theme.foreground
      }} onClick={this.props.onClick}>{this.props.children || <Text>{this.props.label}</Text>}</button>
    )
  }
}

export default withGlobalState(Button)
