import React, { Component } from 'react'
import { withGlobalState } from '../Context'
import { useTheme } from '../Theme'
import Text from './Text'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/free-solid-svg-icons'

class Button extends Component {
  handleOnClick = (e) => {
    const { onClick = () => { console.warn('No button click handler provided') } } = this.props
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }
    onClick(e)
  }
  render() {
    const { style, global, enabled= true, icon, iconColor = undefined, dangerous = false } = this.props
    // TODO disable when dangerous active + conditions
    const theme = useTheme(global)
    return (
      <button 
        style={{
          display: 'inline-flex',
          paddingTop: 3,
          paddingBottom: 3,
          cursor: enabled ? 'pointer' : 'not-allowed',
          color: theme.foreground,
          ...style,
          backgroundColor: 'transparent',
        }}
        disabled={!enabled}
        onClick={this.handleOnClick}
      >
        <div style={{
          display: 'inline-flex',
          flex: 1,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          opacity: enabled ? 1 : 0.25
        }}>
          { icon && <FontAwesomeIcon icon={icons['fa'+icon]} style={{ color: iconColor, margin: 5 }} pulse={icon === 'Spinner'} /> }
          {this.props.children || <Text>{this.props.label}</Text>}
        </div>
      </button>
    )
  }
}

export default withGlobalState(Button)
