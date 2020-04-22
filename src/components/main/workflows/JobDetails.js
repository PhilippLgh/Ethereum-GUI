import React, { Component, Fragment } from 'react'
import Container from '../../../widgets/Container'
import Tabs from '../../../widgets/Tabs'
import Tab from '../../../widgets/Tab'
import GridAPI from '../grid/GridAPI'
import { withRouter } from 'react-router-dom'


class JobDetails extends Component {
  state = {
    jobId: ''
  }
  componentDidMount = () => {
    const jobId = this.getJobId()
    this.setState({
      jobId
    })
    this.fetchJobDetails(jobId)
  }
  getJobId() {
    const { match } = this.props
    const { params } = match
    const { jobId } = params
    return jobId
  }
  fetchJobDetails = async (jobId) => {
    const jobs = await GridAPI.getJobs()
    const job = jobs.find(job => job.id.includes(jobId))
    this.setState({
      job
    })
  }
  renderJobDetails(job) {
    const {
      id, // job id
      workflowId, // 
      name,
      displayName,
      version,
      isInstalled,
      state,
      started_at,
      finished_at
    } = job
    return (
      <div style={{
        border: '1px solid black',
        padding: 50,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <span>Name: {name}</span>
        <span>Version: {version}</span>
      </div>
    )
  }
  render() {
    const { jobId, job } = this.state
    return (
      <Container
        style={{
          borderRadius: 0,
          maxHeight: '100%',
          overflowY: 'hidden'
        }}
        header={() => (<Fragment>Job details: {jobId}</Fragment>)}
        headerStyle={{
          margin: 10
        }}
      >
        {job && this.renderJobDetails(job)}
        <h3>Processes</h3>
        <Tabs>
          <Tab label="Process 1">
            <span>hello world</span>
          </Tab>
          <Tab label="Process 2">
            <span>hello world2</span>
          </Tab>
        </Tabs>
      </Container>
    )
  }
}

export default withRouter(JobDetails)

