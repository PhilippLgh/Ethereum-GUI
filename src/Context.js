import React from 'react';
import { globalState } from './State'

export const StoreContext = React.createContext({})

export const withNewContext = WrappedComponent => {
  return class extends React.Component {
    state = globalState
    render() {
      return (
        <StoreContext.Provider value={this}>
          <WrappedComponent {...this.props} />
        </StoreContext.Provider>
      )
    }
  }
}

export const withGlobalState = WrappedComponent => {
  return class extends React.Component {
    render() {
      return (
        <StoreContext.Consumer>
          { (val) => {
            // console.log('render with ctx value', val)
            return <WrappedComponent {...this.props } global={val} />
          }}
        </StoreContext.Consumer>
      )
    }
  }
}