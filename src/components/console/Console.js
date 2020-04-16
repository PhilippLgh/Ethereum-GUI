import React, { Component } from 'react'
import AutoCompleteField from '../../widgets/AutoCompleteField'
import { Row } from '../../widgets/Row'

const flattenObject = function(ob) {
	var toReturn = {};
	for (var i in ob) {
		if (!ob.hasOwnProperty(i)) continue;
		if ((typeof ob[i]) == 'object') {
			var flatObject = flattenObject(ob[i]);
			for (var x in flatObject) {
				if (!flatObject.hasOwnProperty(x)) continue;
				toReturn[i + '.' + x] = flatObject[x];
			}
		} else {
			toReturn[i] = ob[i];
		}
	}
	return toReturn;
}

export default class Console extends Component {
  state = {
  }
  handleFocus = (e) => {
    this.autoCompleteField.focus();
  }
  handleBlur = () => {
    this.autoCompleteField.blur();
  }
  handleEnter = async (input) => {
    console.log('process input', input)
    const { context = {} } = this.props
    // eslint-disable-next-line
    const contract = context['contract1']
    try {
      // eslint-disable-next-line
      const result = await eval(`contract.${input}`)
      this.setState({ result, error: undefined })
    } catch (error) {
      console.log('error', error)
      this.setState({ error })
    }
  }
  render() {
    const { result, error } = this.state
    const { context = {} } = this.props
    const flattened = flattenObject(context['contract1'])
    const options = Object.keys(flattened).filter(el => !el.includes('.'))
    // console.log('options', options)
    return (
      <div
        tabIndex={0}
        style={{
          backgroundColor: 'rgb(39, 40, 34)',
          height: 100,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          ...this.props.style
        }}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <Row style={{
          backgroundColor: 'rgba(85, 85, 85, 0.22)',
          justifyContent: 'left',
          alignItems: 'center'
        }}>
          <span style={{ color: 'cyan', padding: 5, fontWeight: 'bold' }}>{">"}</span>
          <AutoCompleteField 
            ref={(autoComplete) => { this.autoCompleteField = autoComplete; }}
            fontSize={14}
            options={options}
            onEnter={this.handleEnter}
            style={{
              color: '#ffffffb8'
            }}
          />
        </Row>
        {error &&
        <span style={{
          fontWeight: 'bold',
          fontSize: '1rem',
          color: '#da4747c9',
          padding: 5,
          backgroundColor: '#ef565629'
        
        }}>Error: {error.message}</span>
        }
        {!error && result &&  <div style={{
          padding: 5,
          color: '#ffffff6b',
          maxWidth: '100%',
          wordWrap: 'break-word',
          overflowY: 'scroll'
        }}> {"<- " + JSON.stringify(result, null, 2)}</div>}

      </div>
    )
  }
}
