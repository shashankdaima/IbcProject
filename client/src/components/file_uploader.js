import axios from 'axios'
import React, { Component } from 'react';
import { Row, Col, Container, Card, Form, Button, CardGroup } from "react-bootstrap";

export default class FileUploader extends Component {

    state = {
        selectedFile: null
    };
    onFileChange = event => {

        this.setState({ selectedFile: event.target.files[0] });

    };
    onFileUpload = () => {
        const formData = new FormData();
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        console.log(this.state.selectedFile);

        axios.post("api/uploadfile", formData);
    };

    fileData = () => {

        if (this.state.selectedFile) {

            return (
                <div>
                    <h2>File Details:</h2>

                    <p>File Name: {this.state.selectedFile.name}</p>


                    <p>File Type: {this.state.selectedFile.type}</p>


                    <p>
                        Last Modified:{" "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>

                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h5>Choose the Upload button</h5>
                </div>
            );
        }
    };

    render() {

        return (
            <div>
                <h3>
                    Upload Question Paper
                </h3>
                <div>
                    <input type="file" onChange={this.onFileChange} />
                    <Button variant="primary" onClick={this.onFileUpload}>
                        Upload!
                    </Button>
                </div>
                {this.fileData()}
            </div>
        );
    }
}
