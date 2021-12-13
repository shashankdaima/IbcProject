import React, { Component, useRef, useState, useEffect } from 'react'
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './../App.css'
import { usePdf } from '@mikecousins/react-pdf'
import MyPdfViewer from './../components/pdf_view.js'
import Dialog from '@material-ui/core/Dialog'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'

function MainCheckerPage(props) {
  const [answerSheetId,setAnswerSheetId]=useState()
  const [checkerID, setCheckerID] = useState()
  const [studentID, setStudentID] = useState()
  const [answerSheet, setAnswerSheet]=useState();
  const [q1, setq1] = useState()
  const [r1, setr1] = useState()

  const [q2, setq2] = useState()
  const [r2, setr2] = useState()

  const [q3, setq3] = useState()
  const [r3, setr3] = useState()

  const [open, setOpen] = useState(false)

  const openit = () => {
    setOpen(true)
  }

  const closeit = () => {
    setOpen(false)
  }

  const [formData, setFormData] = useState([
    {
      TA_ID: '',
      sID: '',
      q1f: '',
      r1f: '',
      q2f: '',
      r2f: '',
      q3f: '',
      r3f: '',
    },
  ])
  function formSubmit(e) {
    e.preventDefault()
    console.log(r3)

    setFormData((prev) =>
      prev.concat({
        TA_ID: checkerID,
        sID: studentID,
        q1f: q1,
        r1f: r1,
        q2f: q2,
        r2f: r2,
        q3f: q3,
        r3f: r3,
      }),
    )
    console.log(formData)
    const mem = JSON.parse(localStorage.getItem('form_data'))
    console.log(mem[2].q3f);
  }

  //useEffect
  useEffect(() => {
    const mem = JSON.parse(localStorage.getItem('form_data'))
    console.log(mem)
    if (mem !== null) {
      setFormData(mem)
      console.log('run')
    }
  }, [])
  useEffect(() => {
    localStorage.setItem('form_data', JSON.stringify(formData))
    console.log(formData)
  }, [formData])

  useEffect(async ()=>{
    var answerSheet=await props.contract.methods.answerSheets(1).call();
    setAnswerSheet(answerSheet)
    // console.log(answerSheet)
  },[])
  return (
    <Container fluid="md mt-2">
      <Card>
        <Row>
          <Col>
            <MyPdfViewer fileHash={async ()=>{await props.contract.methods.answerSheets(1).call()}}/>
          </Col>

          <Col>
            <Card.Body>
              <Card.Title>To be filled by GroupTA </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Please Write Every Details
              </Card.Subtitle>
              <Form onSubmit={formSubmit} style={{ textAlign: 'start' }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>GroupTA ID</Form.Label>
                  <Form.Control
                    type="ID"
                    value={checkerID}
                    onChange={(e) => setCheckerID(e.target.value)}
                    placeholder="Enter your ID"
                  />
                  <br />
                  <Form.Control
                    type="studentID"
                    value={studentID}
                    onChange={(e) => setStudentID(e.target.value)}
                    placeholder="Student PublicID"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Q1 Details</Form.Label>
                  <Form.Control
                    type="mark1"
                    value={q1}
                    onChange={(e) => setq1(e.target.value)}
                    placeholder="Enter Marks for this Question"
                  />
                  <Form.Control
                    type="Remark1"
                    value={r1}
                    onChange={(e) => setr1(e.target.value)}
                    placeholder="Provide Your Remark for this Question"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Q2 Details</Form.Label>
                  <Form.Control
                    type="mark2"
                    value={q2}
                    onChange={(e) => setq2(e.target.value)}
                    placeholder="Enter Marks for this Question"
                  />
                  <Form.Control
                    type="Remark2"
                    value={r2}
                    onChange={(e) => setr2(e.target.value)}
                    placeholder="Provide Your Remark for this Question"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Q3 Details</Form.Label>
                  <Form.Control
                    type="mark3"
                    value={q3}
                    onChange={(e) => setq3(e.target.value)}
                    placeholder="Enter Marks for this Question"
                  />
                  <Form.Control
                    type="Remark3"
                    value={r3}
                    onChange={(e) => setr3(e.target.value)}
                    placeholder="Provide Your Remark for this Question"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <br />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="I hereby confirm my submission"
                  />
                </Form.Group>

                <div style={{ textAlign: 'center' }}>
                  <Button variant="primary" type="submit" onClick={openit}>
                    Submit
                  </Button>

                  <Dialog open={open} onClose={closeit}>
                    <DialogTitle>{'Checked Successfully !!!! '}</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        You have Succesfully checked the answer sheet for
                        Student {studentID} Marks provided{' '}
                        {parseInt(q1) + parseInt(q2) + parseInt(q3)}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={closeit} color="primary" autoFocus>
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </Form>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  )
}

export default MainCheckerPage
