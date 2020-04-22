import React, { Component } from 'react'
import Container from '../../../widgets/Container'
import GridAPI from '../grid/GridAPI'

import Tabs from '../../../widgets/Tabs'
import Tab from '../../../widgets/Tab'
import WorkflowListItem from './WorkflowListItem'
import JobListItem from './JobListItem'
import List from '../../../widgets/List'

export default class Workflows extends Component {
  handleRunWorkflow = (workflow) => {
    GridAPI.runWorkflow(workflow.releaseId)
  }
  renderGridRequired = () => {
    return (
      <div style={{
        height: 200,
        border: '2px solid #ff9245',
        borderRadius: 20,
        padding: 30,
        fontSize: '1.2rem'
      }}>
        <div>Workflows require Grid to be running</div>
        <div>Check back another day to see instructions for a setup.</div>
      </div>
    )
  }
  renderTabs = () => {
    return (
      <Tabs style={{
        fontSize: '1.25rem',
        padding: 7,
        marginBottom: 10 
      }}>
        <Tab label="Workflows" key="1">
          <List
            header={false}
            loadItems={() => GridAPI.searchWorkflows()}
            itemName="workflows"
            renderItem={workflow => <WorkflowListItem key={workflow.name} workflow={workflow} onRunWorkflow={this.handleRunWorkflow} />}
          />
        </Tab>
        <Tab label="Jobs" key="2">
          <List
            loadItems={() => GridAPI.getJobs()}
            itemName="jobs"
            polling={5 * 1000}
            renderItem={job => <JobListItem key={job.id} job={job} />}
          />
        </Tab>
      </Tabs>
    )
  }
  render() {
    const inNano = true
    const isGridConnected = false
    return (
      <Container
        isCard={inNano ? false : true}
        style={{
          padding: inNano ? 0 : 10
        }}
      >
        {isGridConnected
        ? this.renderTabs()
        : this.renderGridRequired()
        }
      </Container>
    )
  }
}
