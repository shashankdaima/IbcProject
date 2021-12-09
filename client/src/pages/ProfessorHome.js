import { auto } from "@popperjs/core";
import FileUploader from "../components/file_uploader";
import React, { Component } from "react";
import { Row, Col, Container, Card, Form, Button, CardGroup } from "react-bootstrap";
import stylesApp from "./../App.css";
import TaList from "../components/ta_list";
// import studyImage from "./../components/studyImage.jpg";
// import greyBackground from "./../components/greyBackground.jpg";


export default function ProfessorHome() {
    function onClick(name){
        console.log(name)
    }

    

    return (
        <div className="container">
            <div >
                <br />
                <CardGroup >

                    <Card className="md-3 mt-5" >
                        <FileUploader />
                    </Card>

                    <Card className="md-3 mt-5" >
                        <TaList />
                    </Card>

                </CardGroup>
                <Card className="my-auto" >
                    <Button variant="primary" onClick={() => onClick('James') } > Create Room </Button>
                </Card>
            </div>
        </div>
    )
}