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
  render() {
    const { context = {} } = this.props
    const flattened = flattenObject(context['contract1'])
    const options = Object.keys(flattened)
    console.log('options', options)
    return (
      <div
        tabIndex={0}
        style={{
          backgroundColor: 'rgb(39, 40, 34)',
          height: 100,
          width: '100%',
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
          />
        </Row>
        <span style={{
          fontWeight: 'bold',
          fontSize: '1rem',
          color: 'red',
          padding: 5,
          marginTop: 25,
          visibility: 'hidden'
        }}>Error: foo bar baz!</span>
      </div>
    )
  }
}
