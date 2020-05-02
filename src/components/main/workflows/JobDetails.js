import React, { Component, Fragment } from 'react'
import Container from '../../../widgets/Container'
import Tabs from '../../../widgets/Tabs'
import Tab from '../../../widgets/Tab'
import GridAPI from '../grid/GridAPI'
import { withRouter } from 'react-router-dom'
import Terminal from '../../../widgets/Terminal'

class JobProcessTerminal extends Component {
  state = {
    port: undefined
  }
  componentDidMount = async () => {
    console.log('terminal did mount')
    const result = await GridAPI.attachToJobProcess(this.props.processId)
    console.log('result', result)
    const { port } = result
    this.setState({
      port
    })
  }
  render() {
    const { port } = this.state
    return (
      <div style={{
        backgroundColor: '#333',
        padding: 5,
        overflowX: 'hidden',
        flex: 1,
        display: 'flex'
      }}>
        {port
        ? <Terminal socketUrl={`127.0.0.1:${port}`} />
        : <span>Waiting for connection</span>
        }
      </div>
    )
  }
}


class JobDetails extends Component {
  state = {
    jobId: '',
    processes: []
  }
  componentDidMount = () => {
    const jobId = this.getJobId()
    this.setState({
      jobId
    })
    this.fetchJobDetails(jobId)
    this.fetchJobProcesses()
    this.handler = setInterval(this.fetchJobProcesses, 2000)
  }
  componentWillUnmount = () => {
    clearInterval(this.handler)
  }
  getJobId() {
    const { match } = this.props
    const { params } = match
    const { jobId } = params
    return jobId
  }
  fetchJobDetails = async (jobId) => {
    try {
      const jobs = await GridAPI.getJobs()
      const job = jobs.find(job => job.id.includes(jobId))
      console.log('job found', job)
      this.setState({
        job
      })
    } catch (error) {

    }
  }
  fetchJobProcesses = async () => {
    try {
      const jobId = this.getJobId()
      const processes = await GridAPI.getProcessesByJobId('jobId:'+jobId)
      console.log('processes', processes)
      this.setState({
        processes: [...processes]
      })
    } catch (error) {
      console.log('error fetching job procs', error)
    }
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
    } = job || { name: 'error', version: 'error' }
    return (
      <div style={{
        border: '1px solid black',
        padding: 30,
        margin: 20,
        marginLeft: 10,
        marginRight: 10,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <span>Name: {name}</span>
        <span>Version: {version}</span>
      </div>
    )
  }
  render() {
    const { jobId, job, processes } = this.state

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
        <Tabs style={{
          fontSize: '1.25rem',
          padding: 7,
          marginBottom: 10
        }}>
          { 
          processes.map((p, idx) => (
            <Tab label={p.name} key={idx}>
              <JobProcessTerminal processId={p.id} />
            </Tab>
          )) 
          }
        </Tabs>
      </Container>
    )
  }
}

export default withRouter(JobDetails)

