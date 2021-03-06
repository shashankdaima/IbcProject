import React, { Component } from "react";
import { Row, Col, Container, Card, Form, Button, CardGroup, NavLink } from "react-bootstrap";
import stylesApp from "./../App.css";


function HomePage() {
  const subBorderStyle = {
    border: "10px solid black",
    backgroundColor: "skyblue",
    height: "100%",
    width: "100%",


  };


  return (
    <div style={{ backgroundImage: '/lib/blueBackground.jpg' }}>
      <div style={{ backgroundColor: "#90C5FF", }}>
        <h1 style={subBorderStyle}>SAMBLOCK</h1>
      </div>

      <div>

        <Row xs={1} md={2} >
          <Col >
            <Card style={{ height: "35rem", width: "100%", backgroundColor: "skyblue" }}>
              <Card.Img variant="top" src='/lib/studyImage.jpg' style={{ height: "35rem", width: "100%" }} />
              {/*<Card.Body>
        </Card.Body>*/}
            </Card>


            <Card style={{ height: "35rem", width: "100%" }}>
              <Card.Img variant="top" src='/lib/greyBackground.jpg' style={{ height: "35rem", width: "100%" }} />
              <Card.ImgOverlay>
                <Card.Body>
                  <Card.Title style={{ fontSize: "2rem", fontWeight: "bold" }}>Get Your Result Status</Card.Title>
                  <NavLink href="/result" style={{ fontSize: "1.6rem", backgroundColor: "white", border: '2.5px solid black' }}>Check Result</NavLink>
                  <NavLink href="/answer_upload" style={{ fontSize: "1.6rem", backgroundColor: "white", border: '2.5px solid black' }}>Upload your Solution here</NavLink>
                </Card.Body>
                <Card.Body>
                  <Card.Title style={{ fontSize: "2rem", fontWeight: "bold" }}>TA Section</Card.Title>
                  <NavLink href="/main_checker" style={{ fontSize: "1.6rem", backgroundColor: "white", border: '2.5px solid black' }}>Check Student Submission</NavLink>
                  <NavLink href="/review_checker" style={{ fontSize: "1.6rem", backgroundColor: "white", border: '2.5px solid black' }}>Cross Check here</NavLink>
                </Card.Body>
              </Card.ImgOverlay>
            </Card>
          </Col>
          <Col>
            <Card style={{ height: "35rem", width: "100%", backgroundColor: 'lightcoral' }}>
              <Card.Img variant="top" src='/lib/mainpage.jpeg'style={{ height: "15rem", width: "100%" }} />
              <Card.Img variant="bottom" src='/lib/blueBackground.jpg' style={{ height: "20rem", width: "100%" }} />
              <Card.Body >
                <Card.ImgOverlay style={{ marginTop: "15rem" }}>
                  <Card.Title style={{ color: "white", fontSize: "2rem", fontWeight: "bold" }}>About</Card.Title>
                  <Card.Text style={{ color: "white", fontSize: "1.5rem" }}>
                    SAMBLOCK is a transparent Examination-Evaluation system through which answer sheets submitted by a
                    student can be checked by GroupTA and further can be cross checked by cross checkerTA.
                  </Card.Text>
                </Card.ImgOverlay>
              </Card.Body>
            </Card>

            <Card style={{ height: "35rem", width: "100%", backgroundColor: "skyblue" }}>
              <h2> Team Members</h2>
              <CardGroup>
                <br />
                <Card style={{ height: "5rem", width: "50%", backgroundColor: "skyblue" }}>
                  <Card.Img variant="top" src="/lib/ashmeet.jpeg" style={{ height: "15rem", width: "100%" }} />
                  <Card.Body>
                    <h5 style={{ textAlign: 'center' }}> Ashmeet Singh </h5>
                    <p style={{ textAlign: 'center' }}> 2019412 </p>
                  </Card.Body>
                </Card>


                <Card style={{ height: "5rem", width: "50%", backgroundColor: "skyblue", }}>
                  <Card.Img variant="top" src='/lib/mohsin.jpeg' style={{ height: "15rem", width: "100%" }} />
                  <Card.Body>
                    <h5 style={{ textAlign: 'center' }}> Mohammad Mohsin Hussain </h5>
                    <p style={{ textAlign: 'center' }}> 2019255 </p>
                  </Card.Body>
                </Card>

                <Card style={{ height: "5rem", width: "50%", backgroundColor: "black" }}>
                  <Card.Img variant="top" src="/lib/shashank.jpeg" style={{ height: "15rem", width: "100%" }} />
                  <Card.Body>
                    <h5 style={{ textAlign: 'center' }}> Shashank Daima </h5>
                    <p style={{ textAlign: 'center' }}> 2019106 </p>
                  </Card.Body>
                </Card>
              </CardGroup>
            </Card>
          </Col>
        </Row>


      </div>
    </div>

  )
}
export default HomePage;