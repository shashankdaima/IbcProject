import React, { Component } from "react";
import { Container, Card, Form, Button } from "react-bootstrap"
import axios from 'axios'
import MyPdfViewer from "./../components/pdf_view.js";

class StudentPostAnswerPage extends Component {
  state = {
    //No file
    selectedFile: null
  };
  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };
  onFileUpload = () => {

    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    // Details of the uploaded file
    console.log(this.state.selectedFile);

    // Request made to the backend api
    // Send formData object
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
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };


  render() {

    function answerPostOnClicked(params) {

    }
    return (
      <Container >
        <Card style={{ padding: "10px 10px 10px 10px", margin: "10px 10px 10px 10px" }} >
          {/* top right bottom left */}
          <Card.Body>
            <Card.Title>Submit Answer Sheet</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Please Write Every Details</Card.Subtitle>
            <Form style={{ textAlign: "start" }}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label >Answer Sheet</Form.Label>
                <Button variant="outline-primary" className="m-3" onClick={answerPostOnClicked} >
                  Attach
                </Button>
                <br />
                <div style={{ textAlign: "center" }}>
                  <MyPdfViewer />
                </div>


                <Form.Text className="text-muted">
                  Please don't share this sheet to anyone to avoid plag.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="I hereby confirm my submission" />
              </Form.Group>
              <div style={{ textAlign: "center" }}>

                <Button variant="primary" type="submit" >
                  Submit
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
export default StudentPostAnswerPage;