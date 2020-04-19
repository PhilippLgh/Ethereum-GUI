import React, { Component, Fragment } from 'react'

class OptionListItem extends Component {
  render() {
    const { option, isActive, onMouseEnter, onMouseLeave } = this.props
    return (
      <div
        style={{
          backgroundColor: isActive ? '#6f6f6f6b' : 'transparent',
          color: isActive ? 'greenyellow' : '#eee',
          padding: 2
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {option}
      </div>
    )
  }
}

class OptionList extends Component {
  state = {
    selectedIndex: undefined
  }
  render() {
    const { selectedIndex: _sIdx } = this.state
    const { options, selectedIndex = 0, top = 0, left = 0 } = this.props
    let _selectedIndex = _sIdx !== undefined ? _sIdx : selectedIndex
    return (
      <div style={{
        position: 'fixed',
        top,
        left,
        minWidth: 200,
        minHeight: 50,
        backgroundColor: '#3c3c3c',
        visibility: (options && options.length > 1) ? 'visible' : 'hidden',
        boxShadow: 'rgba(72, 154, 212, 0.2) 0px 1px 2px 0px'
      }}>
        {options && options.map((option, idx) => {
          const isActive = idx === _selectedIndex
          return (
            <OptionListItem 
              key={idx}
              option={option} 
              isActive={isActive} 
              onMouseEnter={() => this.setState({ selectedIndex: idx })}
              onMouseLeave={() => this.setState({ selectedIndex: undefined })}
            />
          )
        })}
      </div>
    )
  }
}

/*
const _getTextLength = (text, fontSize) => {
  const c = document.createElement('canvas');
  const ctx = c.getContext("2d");
  ctx.font = `${fontSize}px Arial`;
  return Math.ceil(ctx.measureText(text).width + 1)
}
*/

const getTextLength = (text, font) => {
  const el = document.createElement('div');
  text = text.split(' ').join(String.fromCharCode(160)) // replace space with &nbsp;
  const textNode = document.createTextNode(text)
  el.appendChild(textNode)
  el.style.font = font;
  el.style.position = 'absolute'
  el.style.visibility = 'hidden'
  el.style.left = '-999px'
  el.style.top = '-999px'
  el.style.height = 'auto'

  document.body.appendChild(el)
  // let wString = getComputedStyle(el).width
  // const w = parseFloat(wString.replace('px', ''))
  const box = el.getBoundingClientRect()
  const w = box.width
  document.body.removeChild(el)
  return w
}

const getSuggestions = (userInput, words) => {
  const suggestions = []
  userInput = userInput || ''
  for (const word of words) {
    if (word.startsWith(userInput)) {
      suggestions.push({
        word,
        suggestion: word.slice(userInput.length)
      })
    }
  }
  return suggestions
}

export default class AutoCompleteField extends Component {
  state = {
    value: '',
    suggestion: '',
    suggestions: [],
    selectedIndex: 0,
    suggestBox: {
      top: 0,
      left: 0
    }
  }
  componentDidMount() {
    const box = this.userInput.getBoundingClientRect()
    this.setState({
      suggestBox: {
        top: box.top + box.height + 3,
        left: box.left
      }
    })
  }
  onKeyDown = (e) => {
    const SPACE = 32
    if (e.keyCode === SPACE && e.ctrlKey) {
      e.stopPropagation();
      e.preventDefault();
      return this.displaySuggestionsFor(this.state.value)
    }
    else if (e.key === 'Escape') {
      this.setState({
        suggestions: []
      })
    }
    else if (e.key === 'Tab') {
      const { value: userInput, selectedIndex } = this.state
      const suggestions = getSuggestions(userInput, this.props.options)
      const suggestion = suggestions.length > 0 ? suggestions[selectedIndex].word : ''
      this.setState({
        value: suggestion,
        suggestions: [],
        selectedIndex: 0
      })
      e.stopPropagation();
      e.preventDefault();
    }
    else if(e.key === 'Enter') {
      const { value: userInput, selectedIndex } = this.state
      const suggestions = getSuggestions(userInput, this.props.options)
      const suggestion = suggestions.length > 0 ? suggestions[selectedIndex].word : ''
      if (!suggestion || suggestion === userInput) {
        this.props.onEnter(userInput)
      } else {
        // user accepts suggestion (same as tab)
        this.setState({
          value: suggestion,
          suggestions: [],
          selectedIndex: 0
        })
      }
      e.stopPropagation();
      e.preventDefault();
    }
    else if (e.key === 'ArrowUp') {
      let { selectedIndex, suggestions } = this.state
      if (suggestions.length === 0) {
        return
      }
      this.setState({
        selectedIndex: (selectedIndex - 1) >= 0 ? selectedIndex - 1 : (suggestions.length - 1)
      })
      e.stopPropagation();
      e.preventDefault();
    }
    else if (e.key === 'ArrowDown') {
      let { selectedIndex, suggestions } = this.state
      if (suggestions.length === 0) {
        return
      }
      this.setState({
        selectedIndex: (selectedIndex + 1) % suggestions.length
      })
      e.stopPropagation();
      e.preventDefault();
    }
  }
  displaySuggestionsFor(userInput) {
    const suggestions = getSuggestions(userInput, this.props.options)
    this.setState({
      value: userInput,
      suggestions: [...suggestions],
      selectedIndex: 0
    })
  }
  onChange = (e) => {
    const userInput = e.currentTarget.value;
    this.displaySuggestionsFor(userInput)
  }
  focus() {
    this.userInput.focus();
  }
  blur = () => {
    // hide suggestions
    this.setState({
      suggestions: []
    })
  }
  render() {
    const { value, suggestions, selectedIndex, suggestBox } = this.state
    const suggestion = suggestions.length > selectedIndex ? suggestions[selectedIndex].suggestion : ''
    const { fontSize = 16 } = this.props
    return (
      <Fragment>
        <OptionList
          selectedIndex={selectedIndex}
          options={suggestions.map(s => s.word)}
          top={suggestBox.top}
          left={suggestBox.left}
        />
        <input
          type="text"
          ref={(input) => { this.userInput = input; }}
          style={{
            backgroundColor: 'transparent',
            font: `${fontSize}px Arial`,
            color: 'white',
            caretColor: 'cyan',
            padding: 0,
            border: 'none',
            outline: 'none',
            width: `${getTextLength(value, `${fontSize}px Arial`) || 1}px`,
            ...this.props.style
          }}
          value={value}
          onKeyPress={this.onKeyPress}
          onKeyDown={this.onKeyDown}
          onChange={this.onChange}
        />
        <span style={{
          color: 'rgba(197, 197, 197, 0.4)',
          fontSize: `${fontSize}px`,
        }}>{suggestion}</span>
      </Fragment>
    )
  }
}
