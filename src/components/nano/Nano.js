import React, { Component } from 'react'
import Workflows from '../main/workflows/Workflows'
import { withGlobalState, withNewContext } from '../../Context'
import { BrowserRouter as Router } from 'react-router-dom'

class Nano extends Component {
  render() {
    return (
      <Router>
        <div style={{
          width: 320,
          height: 420,
          backgroundColor: 'white',
          fontSize: '10px'
        }}>
          <Workflows />
        </div>
      </Router>
    )
  }
}

export default withNewContext(withGlobalState(Nano))
