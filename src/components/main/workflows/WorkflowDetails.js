import React, { Component, Fragment } from 'react'
import Container from '../../../widgets/Container'
import { withRouter } from 'react-router-dom'
import Tabs from '../../../widgets/Tabs'
import Tab from '../../../widgets/Tab'
import Markdown from '../../../widgets/Markdown'
import GridAPI from '../grid/GridAPI'
import CodeEditor from '../../../widgets/CodeEditor'
import Button from '../../../widgets/Button'
import { LabeledField } from '../../../widgets/LabeledField'
import Pill from '../../../widgets/Pill'
import { Row } from '../../../widgets/Row'
import CommandLineSnippet from '../../../widgets/CommandLineSnippet'
import ethpkg from 'ethpkg'
import Address from '../../../widgets/Address'
import Icon from '../../../widgets/Icon'

class WorkflowTag extends Component {
  render() {

    const { tag } = this.props

    const tagValue = tag.replace('tag:workflow:','').replace('workflow:tag:', '')

    const colors = {
      dangerous: 'red',
      docker: '#3396EC',
      mainnet: 'orange',
      advanced: 'orange',
    }

    return <Pill color={colors[tagValue]} style={{ marginRight: 5, opacity: 0.7 }} > { tagValue } </Pill>
  }
}

class WorkflowDetails extends Component {
  state = {
    workflowId: '',
    readme: '### The author did not provide a README.md',
    sourceCode: '',
    dockerfile: '',
    packageJson: undefined,
    packageSignature: undefined
  }
  componentDidMount = () => {
    this.setState({
      workflowId: this.getWorkflowId()
    })
    this.fetchWorkflowInfo()
    this.fetchWorkflowPackage()
  }
  getWorkflowId() {
    const { match } = this.props
    const { params } = match
    const { workflowId } = params
    return workflowId
  }
  fetchWorkflowInfo = async () => {
    try {
      const workflowId = this.getWorkflowId()
      const info = await GridAPI.getWorkflow(workflowId)
      console.log('workflow info', info)
    } catch (error) {
      console.log('info error', error)
    }
  }
  fetchWorkflowPackage = async () => {
    let pkg
    try {
      const workflowId = this.getWorkflowId().replace('-', '/')
      pkg = await GridAPI.getWorkflowPackage(workflowId)
    } catch (error) {
      console.log('fetch workflow package error', error)
    }
    if (!pkg) { return }
    this.recoverSignature(pkg)
    // console.log('package metadata', pkg.metadata, pkg)
    const entries = await pkg.getEntries()
    console.log('entries', entries.map(e => e.relativePath))
    this.loadFile(pkg, 'README.md', 'readme')
    this.loadFile(pkg, 'Dockerfile', 'dockerfile')
    this.loadFile(pkg, 'index.js', 'sourceCode')
    this.loadPackageJson(pkg)
  }
  recoverSignature = async (pkg) => {
    try {
      const result = await ethpkg.verifyPackage(pkg)
      console.log('result', result)
      this.setState({
        packageSignature: result
      })
    } catch (error) {
    }
  }
  loadFile = async (pkg, fileName, stateVar) => {
    try {
      const contents = await pkg.getContent(fileName)
      const change = {}
      change[stateVar] = contents.toString()
      this.setState(change)
    } catch (error) {
      console.log('fetch file error', error)
    }
  }
  loadPackageJson = async (pkg) => {
    try {
      const packageJson = await pkg.getContent('package.json')
      this.setState({
        packageJson: JSON.parse(packageJson.toString())
      })
    } catch (error) {
      
    }
  }
  renderWorkflowInfo() {
    const { packageJson, packageSignature } = this.state
    const {
      name,
      version,
      description,
      repository,
      author,
      license,
      grid
    } = (packageJson || {})

    const {
      name: authorName,
      email
    } = (author || {})

    const {
      version: gridVersion,
      type,
      tags = []
    } = (grid || {})

    const {
      signers = [],
      isValid = false,
      isTrusted
    } = (packageSignature || {})

    const spacerStyle = { borderLeft: '1px solid black', marginLeft: 10, marginRight: 10, marginTop: 4, marginBottom: 4 }
    // FIXME hardcoded signer
    const signer = 'grid.philipplgh.eth'

    return (
      <div style={{
        border: '1px solid #0c6c7144',
        borderRadius: 2,
        padding: 20,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Row style={{ justifyContent: 'normal' }}>
          <h2 style={{ color: '#2e2e2e', paddingLeft: 5 }}>{name}</h2>
          { version && <Pill color="#efefef" style={{ color: '#969696', marginTop: -15, marginLeft: 15 }}>v{version}</Pill> }
        </Row>
        <Row style={{ justifyContent: 'normal' }}>
          <LabeledField 
            label="Author"
            value={authorName || '<undefined>'}
            />
            <div style={spacerStyle}></div>
          <LabeledField 
            label={() => <span style={{ display: 'inline-flex' }}>Package Signature
            <Icon icon="certificate" color="#72e0a4" style={{ fontSize: '1.3rem', marginTop: -8, marginLeft: 5 }} />
            </span>}
            >
              <span>{signers.length > 0 
              ? <Address address={signers[0].address} style={{ paddingTop: 0 }} /> 
              : <Pill color="red" style={{  color: 'white', fontWeight: 'bold' }}>UNSIGNED!</Pill> 
              }</span>
            </LabeledField>
            <div style={spacerStyle}></div>
            <LabeledField 
              label="Repository"
              value={repository || '<undefined>'}
            />
            <div style={spacerStyle}></div>
            <LabeledField 
              label="License"
              value={license}
            />
        </Row>

        <Row style={{ alignItems: 'center' }}>
          <LabeledField 
            label="Description"
          >
            <span style={{ fontSize: '1.35rem' }}>{description}</span>
          </LabeledField>
        </Row>

        <LabeledField label="One-Liner">
            <div style={{ display: 'flex', alignItems: 'baseline'}}><CommandLineSnippet command={`npx grid-core workflow run ${signer}/${name}`} /></div>
        </LabeledField>

        <Row
          style={{
            marginTop: 10,
            paddingTop: 10,
            borderTop: '1px solid #eee',
            justifyContent: 'normal'
          }}
          >
          { tags.map(t => <WorkflowTag key={t} tag={t} />)}
        </Row>

      </div>
    )
  }
  handleRunWorkflow() {

  }
  render() {
    const { workflowId, readme, sourceCode, packageJson, dockerfile } = this.state
    const { name } = (packageJson || {})
    const isGridConnected = false
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
    
        { this.renderWorkflowInfo()}

        { /* TODO DISPLAY JOBS for this workflow */ }


        <div style={{
          marginTop: 30,
          marginBottom: 10,
          display: 'flex',
          flexDirection: 'column'
        }}>

          <Button
            icon={"Play"} 
            iconColor="#08a79c"
            style={{ fontSize: '1.25rem',  alignSelf: 'flex-end', marginRight: 15 }}
            label="Run Workflow" 
            enabled={isGridConnected}
            onClick={this.handleRunWorkflow} />
        </div>

        <Tabs style={{
          fontSize: '1.5rem',
          marginRight: 20
        }}>
          <Tab label="Readme">
            <Markdown source={readme}/>
          </Tab>
          <Tab label="Code" style={{ overflow: 'hidden'}}>
            <CodeEditor source={sourceCode} language="javascript" />
          </Tab>
          { dockerfile && 
          <Tab label="Dockerfile" style={{ overflow: 'hidden'}}>
            <CodeEditor source={dockerfile} language="docker" />
          </Tab>
          }
        </Tabs>
      </Container>
    )
  }
}

export default withRouter(WorkflowDetails)