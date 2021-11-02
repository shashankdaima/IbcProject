import { auto } from "@popperjs/core";
import React, { Component } from "react";
import { Row,Col,Container, Card, Form, Button, CardGroup } from "react-bootstrap";
import stylesApp from "./../App.css";
// import studyImage from "./../components/studyImage.jpg";
// import greyBackground from "./../components/greyBackground.jpg";
import {NavItem,
    NavLink} from 'reactstrap';

function HomePage() {
    const subBorderStyle={
        border:"2.6px solid black",
        backgroundColor:"skyblue",
        height:"100%",
        width:"100%"
    };
    return (
        <div>
            <div style={{backgroundColor:"#90C5FF"}}>
            <h1 style={subBorderStyle}>Students Block Check</h1>
            </div>

            <div>
<Row xs={1} md={2} className="g-4">
    <Col >
      <Card style={{height:"35rem", width:"100%" , backgroundColor:"skyblue"}}>
        {/* <Card.Img variant="top" src={studyImage} style={{height:"35rem",width:"100%"}}/> */}
        {/*<Card.Body>
        </Card.Body>*/}
      </Card>


      <Card style={{height:"35rem", width:"100%"}}>
        {/* <Card.Img variant="top" src={greyBackground} style={{height:"35rem",width:"100%"}}/> */}
        <Card.ImgOverlay>
        <Card.Body>
          <Card.Title style={{fontSize:"2rem",fontWeight:"bold"}}>Get Your Result Status</Card.Title>
            <NavLink href="/result" style={{fontSize:"1.6rem",backgroundColor:"white",border:'2.5px solid black'}}>Check Result</NavLink>
            <NavLink href="/answer_upload" style={{fontSize:"1.6rem", backgroundColor:"white",border:'2.5px solid black'}}>Upload your Solution here</NavLink>
        </Card.Body>
        <Card.Body>
          <Card.Title style={{fontSize:"2rem",fontWeight:"bold"}}>TA Section</Card.Title>
            <NavLink href="/main_checker" style={{fontSize:"1.6rem",backgroundColor:"white",border:'2.5px solid black'}}>Check Student Submission</NavLink>
            <NavLink href="/review_checker" style={{fontSize:"1.6rem", backgroundColor:"white",border:'2.5px solid black'}}>Cross Check here</NavLink>
        </Card.Body>
        </Card.ImgOverlay>
      </Card>

    </Col>
    <Col>
    <Card>
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>Visit</Card.Title>
          <Card.Text>
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>  
</Row>
            

            </div>
        </div>

    )
}
export default HomePage;