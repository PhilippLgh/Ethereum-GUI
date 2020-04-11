import React, { Component } from 'react'
import { withGlobalState } from '../Context'
import { useTheme } from '../Theme'
import ContainerHeader from './ContainerHeader'

class Container extends Component {
  render() {
    const { style = {}, global, header } = this.props
    const theme = useTheme(global)
    return (
      <div className="card" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        maxHeight: '100%',
        overflowY: 'scroll',
        backgroundColor: theme.container.backgroundColor,
        color: theme.container.color,
        margin: 10,
        borderRadius: 10,
        ...style
      }}>
        {header && <ContainerHeader title={header} /> }
        { this.props.children }
      </div>
    )
  }
}

export default withGlobalState(Container)
