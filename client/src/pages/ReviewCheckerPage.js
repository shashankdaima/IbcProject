import {
  Container,
  Card,
  Form,
  Button,
  CardGroup,
  Row,
  Col,
} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { Component, useState, useEffect } from 'react'

import MyPdfViewer from './../components/pdf_view.js'

import Dialog from '@material-ui/core/Dialog'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'

function ReviewCheckerPage() {
  const [crossChecker, setCrossChecker] = useState()

  const [q1, setq1] = useState()
  const [r1, setr1] = useState()
  const [c1, setc1] = useState()

  const [q2, setq2] = useState()
  const [r2, setr2] = useState()
  const [c2, setc2] = useState()

  const [q3, setq3] = useState()
  const [r3, setr3] = useState()
  const [c3, setc3] = useState()

  var name2 = JSON.parse(localStorage.getItem('form_data'))

  const [open, setOpen] = useState(false)

  const openit = () => {
    setOpen(true)
  }

  const closeit = () => {
    setOpen(false)
  }
  function ClickButton() {
    if (crossChecker && q1 && r1 && c1 && q2 && r2 && c2 && q3 && r3 && c3) {
      return (
        <Button variant="primary" type="submit" onClick={openit}>
          Submit
        </Button>
      )
    } else {
      return (
        <Button variant="primary" type="submit" disabled>
          Submit
        </Button>
      )
    }
  }
  const [formData, setFormData] = useState([
    {
      TA_ID: '',
      q1f: '',
      r1f: '',
      c1f: '',
      q2f: '',
      r2f: '',
      c2f: '',
      q3f: '',
      r3f: '',
      c3f: '',
    },
  ])
  function formSubmit(e) {
    e.preventDefault()
    console.log(r3)
    console.log(c1)
    setFormData((prev) =>
      prev.concat({
        TA_ID: crossChecker,
        q1f: q1,
        r1f: r1,
        c1f: c1,
        q2f: q2,
        r2f: r2,
        c2f: c2,
        q3f: q3,
        r3f: r3,
        c3f: c3,
      }),
    )
    console.log(formData)
  }

  //useEffect
  useEffect(() => {
    const mem = JSON.parse(localStorage.getItem('cross_check'))
    console.log(mem)
    if (mem !== null) {
      setFormData(mem)
      console.log('run')
    }
  }, [])
  useEffect(() => {
    localStorage.setItem('cross_check', JSON.stringify(formData))
    console.log(formData)
  }, [formData])

  return (
    <Container fluid="md mt-2">
      {/* <div >
                <h1>Review Checker's Page</h1>
            </div> */}

      <Card>
        <Row>
          <Col>
            <MyPdfViewer />
          </Col>
          {/* top right bottom left */}
          <Col>
            <Card.Body>
              <Card.Title>To be filled by CheckerTA </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Please Write Every Details
              </Card.Subtitle>
              <Form onSubmit={formSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>MainCheckerTA ID</Form.Label>
                  <Form.Control
                    type="ID"
                    value={crossChecker}
                    onChange={(e) => setCrossChecker(e.target.value)}
                    placeholder="Enter your ID"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Q1 Details</Form.Label>
                  <Form.Control
                    type="Remark1"
                    value={r1}
                    onChange={(e) => setr1(e.target.value)}
                    placeholder="Provide Your Remark for this Question"
                  />
                  <Form.Label>Is this Correct?</Form.Label>
                  <Form.Check
                    inline
                    type="checkbox"
                    onClick={(e) => setc1('Yes')}
                    Controlid="IDQ1"
                    label="Yes"
                  />
                  <Form.Check
                    inline
                    type="checkbox"
                    onClick={(e) => setc1('No')}
                    Controlid="IDQ11"
                    label="No"
                  />
                  <Form.Control
                    type="mark1"
                    value={q1}
                    onChange={(e) => setq1(e.target.value)}
                    placeholder="Enter Marks for this Question"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Q2 Details</Form.Label>
                  <Form.Control
                    type="Remark2"
                    value={r2}
                    onChange={(e) => setr2(e.target.value)}
                    placeholder="Provide Your Remark for this Question"
                  />
                  <Form.Label>Is this Marking Correct?</Form.Label>
                  <Form.Check
                    inline
                    type="checkbox"
                    onClick={(e) => setc2('Yes')}
                    Controlid="IDQ2"
                    label="Yes"
                  />
                  <Form.Check
                    inline
                    type="checkbox"
                    onClick={(e) => setc2('No')}
                    Controlid="IDQ22"
                    label="No"
                  />
                  <Form.Control
                    type="mark2"
                    value={q2}
                    onChange={(e) => setq2(e.target.value)}
                    placeholder="Enter Marks for this Question"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Q3 Details</Form.Label>
                  <Form.Control
                    type="Remark3"
                    value={r3}
                    onChange={(e) => setr3(e.target.value)}
                    placeholder="Provide Your Remark for this Question"
                  />
                  <Form.Label>Is this Marking Correct?</Form.Label>
                  <Form.Check
                    inline
                    type="checkbox"
                    onClick={(e) => setc3('Yes')}
                    Controlid="IDQ3"
                    label="Yes"
                  />
                  <Form.Check
                    inline
                    type="checkbox"
                    onClick={(e) => setc3('No')}
                    Controlid="IDQ33"
                    label="No"
                  />
                  <Form.Control
                    type="mark3"
                    value={q3}
                    onChange={(e) => setq3(e.target.value)}
                    placeholder="Enter Marks for this Question"
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

                <table class="table table-striped">
                  <tr>
                    <th>GroupTA_ID</th>
                    <th>Q1_Marks</th>
                    <th>Q1_Rem.</th>
                    <th>Q2_Marks</th>
                    <th>Q2_Rem.</th>
                    <th>Q3_Marks</th>
                    <th>Q3_Rem.</th>
                  </tr>
                  {name2.map((val, par) => {
                    return (
                      <tr par={par}>
                        <td>{val.TA_ID}</td>
                        <td>{val.q1f}</td>
                        <td>{val.r1f}</td>
                        <td>{val.q2f}</td>
                        <td>{val.r2f}</td>
                        <td>{val.q3f}</td>
                        <td>{val.r3f}</td>
                      </tr>
                    )
                  })}
                </table>

                <div style={{ textAlign: 'center' }}>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  )
}
export default ReviewCheckerPage
