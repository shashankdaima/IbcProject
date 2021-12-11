import axios from 'axios'
import React, { Component } from 'react'
import {
  Row,
  Col,
  Container,
  Card,
  Form,
  Button,
  CardGroup,
} from 'react-bootstrap'

export default class FileUploader extends Component {
  state = {
    selectedFile: null,
    fileBuffer: null,
  }

  constructor(props) {
    super(props)
    this.state.fileSelectionFunction = props.fileUpdate
  }

  retrieveFile = (e) => {
    const data = e.target.files[0]
    // this.selectedFile=data;
    this.setState({ selectedFile: data })
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(data)
    reader.onloadend = () => {
      //   console.log('Buffer data: ', Buffer(reader.result))
      this.setState({ fileBuffer: Buffer(reader.result) })
      this.props.fileUpdate(Buffer(reader.result))
    }
    e.preventDefault()
  }

  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {this.state.selectedFile.name}</p>

          <p>File Type: {this.state.selectedFile.type}</p>

          <p>
            Last Modified:{' '}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      )
    } else {
      return (
        <div>
          <br />
          <h5>Choose the Upload button</h5>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <h3>Upload Question Paper</h3>
        <div>
          <input type="file" onChange={this.retrieveFile}  accept="application/pdf,application/vnd.ms-excel" />
        </div>
        {this.fileData()}
      </div>
    )
  }
}
