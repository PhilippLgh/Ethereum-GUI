import React, { Component } from 'react'
import { withGlobalState } from '../../Context'
import { useTheme } from '../../Theme'
import Text from '../../widgets/Text'

class StatusItem extends Component {
  render() {
    const { label, value, global } = this.props
    const theme = useTheme(global)
    return (
      <div className="StatusItem">
        <span className="StatusLabel" style={{
          color: theme.statusBar.label.color,
          textTransform: 'uppercase',
          fontWeight: 'bold',
          paddingTop: 5
        }}><Text>{ label }</Text></span>
        <span className="StatusValue" style={{
          color: theme.statusBar.value.color
        }}>
          { typeof value === 'function' ? value() : value }
        </span>
      </div>
    )
  }
}

export default withGlobalState(StatusItem)
