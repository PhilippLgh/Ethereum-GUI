import React, { Component } from 'react'
import Container from '../../../widgets/Container'
import GridAPI from '../grid/GridAPI'

import Tabs from '../../../widgets/Tabs'
import Tab from '../../../widgets/Tab'
import WorkflowListItem from './WorkflowListItem'
import JobListItem from './JobListItem'
import List from '../../../widgets/List'
import { withRouter } from 'react-router-dom'

class Workflows extends Component {
  state = {
    selectedTab: 0
  }
  handleRunWorkflow = async (workflow) => {
    const isConnected = true
    if (isConnected) {
      try {
        const job = await GridAPI.runWorkflow(workflow.releaseId || workflow.workflowId)
        // this.setState({ selectedTab: 1 })
        this.props.history.push(`/workflows/jobs/${job.id.replace('jobId:','')}`)
      } catch (error) {
        alert('error: '+error.message)
      }


    } else {
      alert('This functionality requires Grid')
    }
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
    const { selectedTab } = this.state
    // const loadItems = () => GridAPI.getWorkflows()
    const loadItems = () => GridAPI.searchWorkflows()
    return (
      <Tabs
        style={{
          fontSize: '1.25rem',
          padding: 7,
          marginBottom: 10,
        }}
        selectedTab={selectedTab}
        onChange={idx => this.setState({ selectedTab: idx })}
      >
        <Tab label="Workflows" key="1">
          <List
            header={false}
            loadItems={loadItems}
            itemName="workflows"
            renderItem={workflow => <WorkflowListItem key={workflow.name} workflow={workflow} onRunWorkflow={this.handleRunWorkflow} />}
          />
        </Tab>
        <Tab label="Jobs" key="2">
          <List
            header={false}
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
    const isGridConnected = true
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

export default withRouter(Workflows)