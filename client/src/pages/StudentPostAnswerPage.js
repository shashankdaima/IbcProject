import React, { Component,useState, useEffect } from "react";
import { Container, Card, Form, Button } from "react-bootstrap"
import axios from 'axios'
import MyPdfViewer from "./../components/pdf_view.js";

function StudentPostAnswerPage  () {
  const state = {
    //No file
    selectedFile: null
  };
  const onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };
  const onFileUpload = () => {

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
  const fileData = () => {

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

  //USE STATES
  

  



    const [email, setEmail] = useState();
    const [emailArr, setEmailArr] = useState([]);
    const [attachedFile, setAttachFile] = useState();
    

    function answerPostOnClicked(params) {
       
    }
    function formSubmit(e){
      e.preventDefault();
      setEmail({email})
      setEmailArr(prev=>prev.concat({email})) 
    }
    
    useEffect(()=>{
      const mem=JSON.parse(localStorage.getItem('emailArr_stored'))
      console.log(mem)
      setEmailArr(mem)
    },[])

    useEffect(()=>{
        localStorage.setItem('emailArr_stored',JSON.stringify(emailArr))
        console.log(emailArr)
    },[emailArr])


    return (
      <Container >
        <Card style={{ padding: "10px 10px 10px 10px", margin: "10px 10px 10px 10px" }} >
          {/* top right bottom left */}
          <Card.Body>
            <Card.Title>Submit Answer Sheet</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Please Write Every Details</Card.Subtitle>

            <Form style={{ textAlign: "start" }} onSubmit={formSubmit}>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                {/* <input type="text" value={email} onChange={(e) => setName(e.target.value)} placeholder="Student Name" /> */}
                <Form.Control type="email" value={email}  onChange={(e) => setEmail(e.target.value)} placeholder="Enter email"/>
                
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label >Answer Sheet</Form.Label>
                {/* <Button variant="outline-primary" className="m-3" onClick={answerPostOnClicked} >
                  Attach
                </Button> */}
                <Form.Control type="file" size="sm" />
                <br />
                {/* <div style={{ textAlign: "center" }}>
                  <MyPdfViewer />
                </div>
                */}

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
export default StudentPostAnswerPage;