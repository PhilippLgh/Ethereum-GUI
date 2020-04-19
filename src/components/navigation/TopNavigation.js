import React, { Component } from 'react'
import NavItem from './NavItem'
import { withGlobalState } from '../../Context'
import { useTheme } from '../../Theme'

class TopNavigation extends Component {
  render() {
    const { state: globalState } = this.props.global
    const theme = useTheme(this.props.global)
    const { items: navItems } = this.props
    const { isConnected } = globalState
    return (
      <nav className="TopNav" style={{
        backgroundColor: theme.topNav.backgroundColor,
        padding: 5,
        display: 'flex',
        justifyContent: 'left',
        borderBottom: '1px solid #c5c5c5'
      }}>
        {navItems.map(({ route, label }) => <NavItem 
        key={label}
        route={route} 
        label={label} 
        hasBadge={globalState.badge === label || (label === 'Client' && !isConnected) }
        color={theme.topNav.item.color} 
        />)}
      </nav>
    )
  }
}

export default withGlobalState(TopNavigation)
