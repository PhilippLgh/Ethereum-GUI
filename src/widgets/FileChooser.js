import React, { Component, Fragment } from 'react'

const readFile = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = (evt) => {
    resolve(reader.result)
  }
  reader.readAsText(file)
})

export default class FileChooser extends Component {
  handleFiles = async (evt) => {
    const files = evt.target.files; // FileList object
    if (!files.length) {
      alert('Please select a file!');
      return;
    }
    const file = files[0]
    let content = await readFile(file)
    if (file.name.endsWith('.json')) {
      content = JSON.parse(content)
    }
    this.props.onData(content)
  }
  render() {
    return (
      <Fragment>
        <input type="file" id="files" name="files[]" onChange={this.handleFiles} />
      </Fragment>
    )
  }
}