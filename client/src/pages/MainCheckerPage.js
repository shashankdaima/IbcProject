import React, { Component } from "react";
import { Container, Card, Form, Button, CardGroup } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
import Ppp from "./PdfView"
import "./../App.css"

function MainCheckerPage() {
    return (
        <div className="Main">
          <div className="MainRightPortion">
              <h1>GroupTA Page</h1>
          </div>
      
          <div className="RightsideComponent">
          <br />
          <CardGroup>
            <Card style={{ left: "50%" , width: '100rem' }}>
            <Card.Body>
            <Card.Title>To be filled by GroupTA </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Please Write Every Details</Card.Subtitle>
            <Form style={{ textAlign: "start" }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>GroupTA ID</Form.Label>
                <Form.Control type="ID" placeholder="Enter your ID" />
                <br />
                <Form.Control type="studentID" placeholder="Student PublicID" />
                </Form.Group>

                <Form.Group className="mb-3" >
                <Form.Label>Q1 Details</Form.Label>
                <Form.Control type="mark1" placeholder="Enter Marks for this Question" />
                <Form.Control type="Remark1" placeholder="Provide Your Remark for this Question" />
                </Form.Group>
            
                <Form.Group className="mb-3" >
                <Form.Label>Q2 Details</Form.Label>
                <Form.Control type="mark2" placeholder="Enter Marks for this Question" />
                <Form.Control type="Remark2" placeholder="Provide Your Remark for this Question" />
                </Form.Group>
            
                <Form.Group className="mb-3" >
                <Form.Label>Q3 Details</Form.Label>
                <Form.Control type="mark3" placeholder="Enter Marks for this Question" />
                <Form.Control type="Remark3" placeholder="Provide Your Remark for this Question" />
                </Form.Group>

            <Form.Group className="mb-3" >
              <br />
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
      <div className="Pdf">
      <Card style={{ right:1000 }}>
       <Ppp/>
      </Card> 
      </div>
     
      </CardGroup>
      
      </div> 
         
      </div>
    )
}
export default MainCheckerPage;