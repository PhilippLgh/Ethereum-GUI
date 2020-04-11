import React, { Component } from 'react'

function FlatButton({ label }) {
  return(
    <div style={{ 
      display: 'inline-flex', 
      padding: 5,
      backgroundColor: '#f5f6fa',
      border: '1px solid #f5f6fa',
      color: '#a3a9b5',
      fontWeight: 'bold'
      }}>
      {label}
    </div>
  )
}

export default class Pagination extends Component {
  render() {
    return (
      <div style={{
        alignSelf: 'flex-end',
        padding: 5,
        borderRadius: 10,
        fontSize: '0.7rem'
      }}>
      <FlatButton label="<"/> <FlatButton label="Page 2"/> <FlatButton label=">"/> 
      </div>
    )
  }
}
