import { Container, Card, Form, Button, CardGroup } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import MyPdfViewer  from "./../components/pdf_view.js";

function ReviewCheckerPage() {
    return (
        <Container >
            {/* <div >
                <h1>Review Checker's Page</h1>
            </div> */}

            <div>

                <CardGroup>


                    <Card>
                        <MyPdfViewer />
                    </Card>


                    <Card >
                        {/* top right bottom left */}
                        <Card.Body>
                            <Card.Title>To be filled by CheckerTA </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Please Write Every Details</Card.Subtitle>
                            <Form >
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>MainCheckerTA ID</Form.Label>
                                    <Form.Control type="ID" placeholder="Enter your ID" />
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Q1 Details</Form.Label>
                                    <Form.Control type="Remark1" placeholder="Provide Your Remark for this Question" />
                                    <Form.Label>Is this Question Correct?</Form.Label>
                                    <Form.Check inline type="checkbox" Controlid="IDQ1" label="Yes" />
                                    <Form.Check inline type="checkbox" Controlid="IDQ11" label="No" />
                                    <Form.Control type="mark1" placeholder="Enter Marks for this Question" />
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Q2 Details</Form.Label>
                                    <Form.Control type="Remark2" placeholder="Provide Your Remark for this Question" />
                                    <Form.Label>Is this Question Correct?</Form.Label>
                                    <Form.Check inline type="checkbox" Controlid="IDQ2" label="Yes" />
                                    <Form.Check inline type="checkbox" Controlid="IDQ22" label="No" />
                                    <Form.Control type="mark2" placeholder="Enter Marks for this Question" />
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Q3 Details</Form.Label>
                                    <Form.Control type="Remark3" placeholder="Provide Your Remark for this Question" />
                                    <Form.Label>Is this Question Correct?</Form.Label>
                                    <Form.Check inline type="checkbox" Controlid="IDQ3" label="Yes" />
                                    <Form.Check inline type="checkbox" Controlid="IDQ33" label="No" />
                                    <Form.Control type="mark3" placeholder="Enter Marks for this Question" />
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


            </div>

        </Container>
    )
}
export default ReviewCheckerPage;