import React, { Component, Fragment } from 'react'
import Address from './Address'

function TypeInfo({ type }) {
  return (
    <span style={{ fontSize: '0.8rem', color: '#666', marginRight: 5 }}>{type}</span>
  )
}

const PATH_DELIMITER = '.'

const flattenObject = function (ob) {
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

export default class JsonView extends Component {
  state = { tree: undefined }
  componentDidMount = () => {
    const { src, metaInfo = {}, path = '' } = this.props

    this.flattenedMeta = flattenObject(metaInfo)

    const tree = this.walk(src, 1, path)
    this.setState({
      tree
    })
  }
  renderValue = (val, idx, l, depth, path = '') => {
    const { displayIndices = false, displayDataTypes = true, indentation = 5, displayCommas = true, render: customRenderFunctions = {} } = this.props
    let _type = typeof val
    if (_type === 'string' && val.startsWith('0x')) {
      _type = 'address'
    }
    if (val && val._hex) {
      _type = 'bignumber'
    }
    if (Array.isArray(val)) {
      _type = 'array'
    }
    let style = {
      marginLeft: depth * indentation
    }

    // values for children / nested elements
    let newPath = path + PATH_DELIMITER + idx
    let newDepth = depth + 1
    let varName = this.flattenedMeta[newPath] || ''

    const renderers = {
      'string': val => `"${val}"`,
      'number': val => val,
      'boolean': val => val ? 'true' : 'false',
      'address': val => <span><Address address={val} /></span>,
      'bignumber': val => val.toString('hex'),
      'array': val => <div style={{ display: 'inline' }}>[ {this.walk(val, newDepth, newPath)} ] </div>,
      'object': val => this.walk(val, newDepth, newPath),
      ...customRenderFunctions
    }
    let render = renderers[varName] || renderers[_type]
    if (typeof render === 'function') {
      return (
        <div key={newPath} style={{ ...style }}>
          {displayIndices && <span style={{ background: 'yellow', paddingRight: 5 }}>{idx}:</span>}
          {displayDataTypes && <TypeInfo type={_type} />}
          <span>{render(val)}</span>
          {varName && <span style={{ paddingLeft: 5 }}>( {varName} )</span>}
          {displayCommas && (l > 0 && idx !== l - 1) && <span style={{ paddingLeft: 2, fontSize: '1.35rem', color: '#555' }}>,</span>}
        </div>
      )
    }
    return <div style={{ background: 'red', ...style }}>unknown type: {_type}</div>
  }
  walk = (obj, depth = 0, path = '') => {
    const keys = Object.keys(obj)
    if (keys.length === 0) {
      return <span></span>
    }
    return keys.map((k, idx) => this.renderValue(obj[k], idx, keys.length, depth, path))
  }
  render() {
    const { tree } = this.state
    return (
      <Fragment>
        {tree}
      </Fragment>
    )
  }
}
