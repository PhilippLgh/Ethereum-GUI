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
    const content = await readFile(file)
    const parsed = JSON.parse(content)
    this.props.onData(parsed)
  }
  render() {
    return (
      <Fragment>
        <input type="file" id="files" name="files[]" onChange={this.handleFiles} />
      </Fragment>
    )
  }
}