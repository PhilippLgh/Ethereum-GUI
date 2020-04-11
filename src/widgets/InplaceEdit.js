import React, { Component } from 'react'

export default class InplaceEdit extends Component {
  state = {
    showInput: false,
    value: ''
  }
  componentDidMount = () => {
    const { value } = this.props
    this.setState({
      value
    })
  }
  /*
  static getDerivedStateFromProps(props, state){
    console.log('get derived')
    if (props.value) {
      // state.value = props.value
    }
    return state
  }
  */
  componentDidUpdate(prevProps, prevState) {
    if (this.props.value !== prevProps.value) {
      this.setState({ value: this.props.value })
    }
  }
  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.setState({
        showInput: false
      })
      this.props.onChange(this.state.value)
      // e.stopPropagation();
      // e.preventDefault();
    }
  }
  onChange = (ev) => {
    this.setState({ value: ev.target.value })
  }
  handleClick = () => {
    this.setState({ showInput: true })
    setTimeout(() => {
      this.focus()
    }, 500)
  }
  focus() {
    this.userInput.focus();
  }
  onBlur = () => {
    this.setState({
      showInput: false
    })
  }
  render() {
    const { showInput, value } = this.state
    let { placeholder = 'Edit me' } = this.props
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: 20,
          ...this.props.style
        }}
        onBlur={this.onBlur}
      >
        <div
          style={{
            display: showInput ? 'none' : 'block'
          }}
          onClick={this.handleClick}
        >{value || placeholder}</div>
        <input
          type="text"
          ref={(input) => { this.userInput = input; }}
          style={{
            visibility: showInput ? 'visible' : 'hidden'
          }}
          value={value}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
      </div>
    )
  }
}
