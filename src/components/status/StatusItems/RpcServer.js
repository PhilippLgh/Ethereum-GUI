import React, { Component, Fragment } from 'react'
import StatusItem from '../StatusItem'
import Clickable from '../../../widgets/Clickable'
import Modal from '../../../widgets/Modal'
import { Column } from '../../../widgets/Column'
import List from '../../../widgets/List'
import ListItem from '../../../widgets/ListItem'
import { withGlobalState } from '../../../Context'

class RpcServer extends Component {
  state = {
    modalOpen: false
  }
  openModal = () => {
    this.setState({
      modalOpen: true
    })
  }
  handleProviderSelection = ({ name, url }) => {
    const { global } = this.props
    // completely reset connection here. will be re-created in App.js
    global.setState({
      selectedProvider: name,
      provider: undefined,
      isConnected: false
    })
    this.setState({
      modalOpen: false
    })
  }
  render() {
    const { modalOpen } = this.state
    const { global } = this.props
    const { state: globalState } = global
    const { provider, providers, selectedProvider } = globalState

    return (
      <Fragment>
        <Clickable onClick={this.openModal} style={{ paddingTop: 0 }}>
          <StatusItem label="Provider" value={ selectedProvider } />
        </Clickable>
        <Modal show={modalOpen} onClose={() => this.setState({ modalOpen: false })}>
          <Column style={{
            padding: 20,
            justifyContent: 'normal'
          }}>
            <h2>Select your provider</h2>
            <List
              header={ false }
              items={providers}
              renderItem={provider => <ListItem key={provider.name} onClick={() => this.handleProviderSelection(provider)} style={{ fontSize: '1.25rem', padding: 10 }}>{`${provider.name} - ${provider.url}`} </ListItem> }
            />
          </Column>
        </Modal>
      </Fragment>
    )
  }
}

export default withGlobalState(RpcServer)
