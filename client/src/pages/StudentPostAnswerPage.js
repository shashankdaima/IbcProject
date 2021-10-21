import React, { Component } from "react";
import { Container, Card, Form, Button } from "react-bootstrap"

class StudentPostAnswerPage extends Component {
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
                <Button variant="outline-primary" className="m-3" onClick="answerPostOnClicked">
                  Attach
                </Button>
                <br />
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