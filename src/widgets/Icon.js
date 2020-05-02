import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee, faCircle, faCheck, faCertificate, faSquare } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckSquare, faCoffee, faCircle, faCheck, faSquare, faCertificate)


export default class Icon extends Component {
  render() {
    const { icon, color: iconColor, style } = this.props
    return (
      icon === 'certificate'
        ? <span className="fa-layers fa-fw" style={{ ...style }}>
          <FontAwesomeIcon icon="certificate" color={iconColor} />
          <FontAwesomeIcon icon="check" inverse transform="shrink-6" />
        </span>
        : <FontAwesomeIcon icon={icon} style={{ color: iconColor, margin: 5 }} pulse={icon === 'Spinner'} />
    )
  }
}
