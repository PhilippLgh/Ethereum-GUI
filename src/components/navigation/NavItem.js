import React, { Component } from 'react'
import Badge from '../../widgets/Badge';
import {
  NavLink
} from "react-router-dom"
import Text from '../../widgets/Text';

export default class NavItem extends Component {
  render() {
    const { route, label, color, hasBadge } = this.props
    return (
      <div className="NavItem" key={route} style={{
        position: 'relative',
        padding: 10,
        fontWeight: 200,
        fontSize: '1.25rem',
        marginLeft: 10,
        marginRight: 10
      }}>
        <NavLink to={route} activeClassName="ActiveNav" style={{
          color,
          textDecoration: 'none',
          padding: 5
        }}><Text>{label}</Text></NavLink>
        { hasBadge && <Badge /> }
      </div>
    )
  }
}
