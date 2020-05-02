import React, { Component, Fragment } from 'react'
import GetGridOverlay from './GetGridOverlay'
import VersionList from './VersionList'
import Controls from './Controls'
import DynamicForm from './DynamicConfigForm'
import CommandLineSnippet from '../../../widgets/CommandLineSnippet'
import { Row } from '../../../widgets/Row'
import { clients, flagsToSettings } from './Clients'
import CustomSelect from '../../../widgets/Select'
import Button from '../../../widgets/Button'
import TextField from '../../../widgets/TextField'
import ClientItem from './ClientItem'

const getProfileSettings = (clientSettings, profile) => {

  if (profile.name === 'custom') {
    return [...clientSettings]
  }

  const profileSettings = Object.keys(profile)
  const settings = []
  for (const key of profileSettings) {
    const value = profileSettings[key]
    // e.g.: setting: network, value: 'dev'
    // check if client has a setting with id: 'network'
    const clientSetting = clientSettings.find(s => s.id === key)
    if (!clientSetting) { continue; } // TODO issue warning
    const copy = { ...clientSetting }

    // the client setting has a default that is overwritten by the profile
    /*
    {
    id: 'network',
    default: 'main',
    label: 'Network',
    options: [...]
    }
    */
    // profile default network - value = dev
    // copy.default = value
    settings.push(copy)
  }
  return settings
}

const flagsFromSettings = (clientSettings, profile) => {
  if (!profile) {
    return ''
  }
  if (!Array.isArray(clientSettings)) {
    throw new Error('Settings must be an Array instance')
  }
  let relevantSettings = getProfileSettings(clientSettings, profile)
  let flags = './geth '
  for (const setting of relevantSettings) {
    const selectedValue = setting.default // or user setting
    if (selectedValue) {
      if (setting.flag) {
        flags += setting.flag.replace('%s', setting.default) + ' '
      }
      else if (setting.options) {
        const selectedOption = setting.options.find(o => o.value === setting.default)
        console.log('selected otpion', selectedOption)
        flags += selectedOption.flag + ' '
      }
    }
  }
  return flags
}

class ClientConfig extends Component {
  state = {
    selectedProfile: 'main'
  }
  handleProfileChanged = (profile) => {
    const { value } = profile
    this.setState({
      selectedProfile: value
    })
  }
  renderProfileConfig() {
    const { selectedProfile } = this.state
    const { client } = this.props
    const { profiles } = client
    return (
      <Row style={{ justifyContent: 'normal', alignItems: 'flex-end' }}>
        <span style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          paddingTop: 10,
          paddingBottom: 10,
          paddingRight: 10,
        }}>Preset: </span>
        <CustomSelect
          style={{
            marginRight: 10,
          }}
          value={selectedProfile}
          options={profiles.map(p => ({ label: p.name, value: p.name }))}
          onChange={this.handleProfileChanged}
        />
        { selectedProfile === 'custom' &&
          <Fragment>
            <TextField label="Config Name" style={{ marginRight: 10 }} />
            <Button icon="Save" label="Save" />
          </Fragment>
        }
      </Row>
    )
  }
  renderSettingsConfig() {
    const { client } = this.props
    const { selectedProfile: profileName } = this.state
    const selectedProfile = client.profiles.find(p => p.name === profileName)
    if (!selectedProfile.flags) {
      return <span>WARNING: Profile does not contain flags</span>
    }
    const profileSettings = flagsToSettings(selectedProfile.flags)
    return (
      <DynamicForm style={{ marginTop: 10 }} settings={profileSettings} />
    )
  }
  render() {
    const { selectedProfile: profileName } = this.state
    const { client } = this.props
    const selectedProfile = client.profiles.find(p => p.name === profileName)
    const flags = selectedProfile.flags || 'error'
    return (
      <Fragment>
        <h2>Client config</h2>
        { this.renderProfileConfig() }
        { this.renderSettingsConfig() }
        <h2>Flags preview</h2>
        <CommandLineSnippet command={flags} />
      </Fragment>
    )
  }
}

export default class Grid extends Component {
  state = {
    selectedClient: 'Geth',
    selectedProfile: 'main'
  }
  handleClientChanged = (client) => {
    this.setState({
      selectedClient: client.name
    })
  }

  renderMainPanel = () => {
    const { selectedClient, selectedProfile: selectedProfileName } = this.state

    const client = clients.find(c => c.name === selectedClient)
    const { profiles = [] } = client

    return (
      <div style={{
        maxHeight: '100%'
      }}>
        <Row style={{ justifyContent: 'normal' }}>
          {clients.map(client => <ClientItem
            key={client.name}
            client={client}
            selected={client.name === selectedClient}
            onClick={() => this.handleClientChanged(client)}
          />)}
        </Row>
        <h2>Client version</h2>
        <Row style={{ justifyContent: 'normal', alignItems: 'flex-end' }}>
          <VersionList /> 
          <Button style={{ marginLeft: 10, fontSize: '1.35rem', padding: 5 }} icon="Download" enabled={false} label="Download" />
        </Row>
        {client.profiles &&  <ClientConfig client={client} />}
        {/*
        <h2>Client controls</h2>
        <Controls style={{
          marginTop: 20
        }} />
         */}
        {
          /* TODO  Disk Info */
        }
      </div>
    )
  }
  render() {
    const gridRunning = true
    return (
      <div style={{
        position: 'relative',
      }}>
        {gridRunning
          ? this.renderMainPanel()
          : <GetGridOverlay />
        }
      </div>
    )
  }
}
