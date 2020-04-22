import React, { Component } from 'react'

export default class LabeledForm extends Component {
  render() {
    const { label } = this.props
    return (
      <div className="card" style={{
        backgroundColor: '#f3f3f34d',
        width: 500,
        height: 300,
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        padding: 20,
        margin: 10,
        borderRadius: 20
      }}>
        <fieldset>
          <legend>{label}</legend>
          { this.props.children }
        </fieldset>
      </div>
    )
  }
}
