import React, { Component, useRef, useState } from "react";
import { Container, Card, Form, Button, CardGroup, ListGroup, ListGroupItem } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./../App.css"
import { usePdf } from "@mikecousins/react-pdf";
const MyPdfViewer = () => {
  const [page, setPage] = useState(1);
  const canvasRef = useRef(null);

  const { pdfDocument, pdfPage } = usePdf({
    file: 'book.pdf',
    page,
    canvasRef,
  });

  return (
    <div >
      {!pdfDocument && <span>Loading...</span>}
      <canvas ref={canvasRef} />
      {Boolean(pdfDocument && pdfDocument.numPages) && (
        <nav>
          <ul className="pager">
            <li className="previous">
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Previous
              </button>
            </li>
            <li className="next">
              <button
                disabled={page === pdfDocument.numPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};
class MainCheckerPage extends Component {

  render() {
    
    return (
      <Container >
        <br />
        <CardGroup>
          <Card>
            <MyPdfViewer />
          </Card>

          <Card >
            <Card.Body >
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


        </CardGroup>
      </Container>
    )
  }
}

export default MainCheckerPage;