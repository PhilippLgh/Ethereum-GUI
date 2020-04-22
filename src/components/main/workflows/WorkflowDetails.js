import React, { Component, Fragment } from 'react'
import Container from '../../../widgets/Container'
import { withRouter } from 'react-router-dom'

class WorkflowDetails extends Component {
  state = {
    workflowId: ''
  }
  componentDidMount = () => {
    this.setState({
      workflowId: this.getWorkflowId()
    })
  }
  getWorkflowId() {
    const { match } = this.props
    const { params } = match
    const { workflowId } = params
    return workflowId
  }
  render() {
    const { workflowId } = this.state
    return (
      <Container
        style={{
          borderRadius: 0,
          maxHeight: '100%',
          overflowY: 'hidden'
        }}
        header={() => (<Fragment>Workflow details: "{workflowId}"</Fragment>)}
        headerStyle={{
          margin: 10
        }}
      >
      </Container>
    )
  }
}

export default withRouter(WorkflowDetails)