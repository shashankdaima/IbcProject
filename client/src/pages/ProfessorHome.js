import { auto, read } from '@popperjs/core'
import FileUploader from '../components/file_uploader'
import React, { Component, useState } from 'react'
import {
  Row,
  Col,
  Container,
  Card,
  Form,
  Button,
  CardGroup,
} from 'react-bootstrap'
import stylesApp from './../App.css'
import TaList from '../components/ta_list'

export default function ProfessorHome(props) {
  const ipfsClient = require('ipfs-http-client')
  const ipfs = ipfsClient.create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
  }) // leaving out the arguments will default to these values

  const [fileBuffer, setFileBuffer] = useState(0)
  const [roomId, setRoomId] = useState(0)
  const [taList, setTaList] = useState(0)

  const createExamRoom = () => {
    ipfs.add(fileBuffer,(error,result)=>{
        // console.log(result[0].hash);
        //props.onRoomCreate(result[0].hash, taList[0])
      })
  }
  return (
    <div className="container">
      <div>
        <br />
        <CardGroup>
          <Card className="md-3 mt-5">
            <FileUploader
              fileUpdate={(file) => {
                setFileBuffer(file)
              }}
            />
          </Card>

          <Card className="md-3 mt-5">
            <TaList
              addTa={(todo_list) => {
                setTaList(todo_list)
              }}
            />
          </Card>
        </CardGroup>
        <Card className="my-auto">
          <Button variant="primary" onClick={() => createExamRoom()}>
            {' '}
            Create Room{' '}
          </Button>
        </Card>
      </div>
    </div>
  )
}