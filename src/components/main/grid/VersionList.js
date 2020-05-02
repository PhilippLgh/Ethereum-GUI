import React, { Component } from 'react'
import Error from '../../../widgets/Error'
import Button from '../../../widgets/Button'
import Select from '../../../widgets/Select'
import ListItem from '../../../widgets/ListItem'
import GridAPI from './GridAPI'

class VersionListItem extends Component {
  downloadClient = () => {

  }
  render() {
    const { release } = this.props
    const {
      name,
      fileName,
      version,
      updated_ts,
      size,
      platform
    } = release
    return (
      <ListItem>
        <span>{release.name}</span>
        <Button label="download" onClick={this.downloadClient}/>
      </ListItem>
    )
  }
}


export default class VersionList extends Component {
  state = {
    versionList: [],
    isLoading: false,
    error: undefined
  }
  componentDidMount = async () => {
    try {
      this.setState({
        isLoading: true
      })
      let versionList = await GridAPI.getVersionList()
      versionList = versionList.map(v => v.fileName)
      this.setState({
        versionList: [...versionList]
      })
    } catch (error) {
      this.setState({ error })
    }
    this.setState({
      isLoading: false
    })
  }
  render() {
    const { versionList, error, isLoading } = this.state
    const selectOptions = versionList.map(v => ({
      label: v,
      value: v
    }))
    const selectedOption = selectOptions
    return (
      <div>
        <Select 
          label="Update available!"
          value={selectedOption}
          options={selectOptions} 
        />
        {error && <Error error={error} />}
      </div>
    )
  }
}
