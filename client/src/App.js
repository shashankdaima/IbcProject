import React, { Component, useState } from 'react'
// import MainContract from "./contracts/SimpleStorage.json";
import MainContract from './contracts/MainContract.json'
import getWeb3 from './getWeb3'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Switch } from 'react-router'
import ResultPage from './pages/ResultPage'
import HomePage from './pages/HomePage'
import MainCheckerPage from './pages/MainCheckerPage'
import ReviewCheckerPage from './pages/ReviewCheckerPage'
import StudentPostAnswerPage from './pages/StudentPostAnswerPage'
import ProfessorHome from './pages/ProfessorHome'
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import { Navbar, Container } from 'react-bootstrap'
import Page404 from './pages/404page'
const regex = '/(w+:{0,1}w*@)?/'

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null }
  // https://bafybeifzr4uvto2hm6e7ixpxgbngsnwgk5vhfxk3dxekm3zwmnupur3gom.ipfs.infura-ipfs.io/
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3()

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts()

      console.log(accounts)
      // Get the contract instance
      const networkId = await web3.eth.net.getId()
      const deployedNetwork = MainContract.networks[networkId]
      const instance = new web3.eth.Contract(
        MainContract.abi,
        deployedNetwork && deployedNetwork.address,
      )

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample)
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      )
      console.error(error)
    }
  }
  createExamRoom = async (fileHash, arrayOfTa) => {
    let roomKey = this.randomHashGenerator32()
    this.state.contract.methods
      .createExamRoom(
        roomKey,
        this.taListEncoder(arrayOfTa),
        arrayOfTa.length,
        fileHash,
      )
      .send({ from: this.state.accounts[0] })
      .on('transactionHash', (hash) => {
        // window.location.reload()
        alert(
          'You exam room is Successfully added to Blockchain. Room Key:' +
            roomKey,
        )
      })
      .on('error', (e) => {
        window.alert('Error')
      })
  }
  taListEncoder = (taList) => {
    var result = ''
    for (var i in taList) {
      result += taList[i]['text'] + regex
    }
    return result
  }
  taListDecoder = (encodedTaList, taCount) => {
    var result = encodedTaList.split(regex)
    return result
  }
  randomHashGenerator32 = () => {
    var text = ''
    var possible = 'ABCDEFabcdef0123456789'
    for (var i = 0; i < 32; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    return text
  }
  validRoomHash = async (roomHash) => {
    let noOfExamRoomAvailable = await this.state.contract.methods
      .examRoomPointer()
      .call()
    var index = 1
    while (index <= noOfExamRoomAvailable) {
      let iExamRoom = await this.state.contract.methods.examRooms(index).call()

      if (iExamRoom['roomHash'] === roomHash) {
        var value = iExamRoom['ta_count']

        return {
          response: true,
          position: index,
          ta_pos: this.getRandomInt(1, parseInt(Number(value))),
        }
      }
      index++
    }
    return { response: false, position: -1 }
  }
  // 0e5e4A6e1e1A0d36CCe20cEF8E4BcF54
  // cCE95C3a142AfbCE0130e4bc99812ec8

  getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  uploadAnswerSheet = async (fileHash, email, roomHash) => {
    let response = await this.validRoomHash(roomHash)
    // console.log(response)
    if (response['response']) {
      this.state.contract.methods
        .uploadAnswerSheet(
          fileHash,
          response['position'],
          email,
          response['ta_pos'],
        )
        .send({ from: this.state.accounts[0] })
        .on('transactionHash', (hash) => {
          // window.location.reload()
        })
        .on('error', (e) => {
          window.alert('Error')
        })
      // console.log(await this.state.contract.methods.answerSheets(1).call())
    } else {
      alert('Illegal State Exception: Invalid Room Hash')
    }
  }
  validRoomHashForChecker = async (roomHash) => {
    let noOfExamRoomAvailable = await this.state.contract.methods
      .examRoomPointer()
      .call()
    var index = 1
    while (index <= noOfExamRoomAvailable) {
      let iExamRoom = await this.state.contract.methods.examRooms(index).call()

      if (iExamRoom['roomHash'] === roomHash) {
        return {response:true, data:iExamRoom["ta_list"],count:parseInt(Number(iExamRoom["ta_count"])) }
      }
      index++
    }
    return { response: false,error:"Illegal State Exception: Invalid Room Hash" }
  }

  getAllAnswerSheetsForMainChecker = async (examRoomHash) => {
    const currentUser= this.state.accounts[0];
    let response=await this.validRoomHashForChecker(examRoomHash)
    console.log(currentUser);
    console.log(response);
  }

  runExample = async () => {
    const { accounts, contract } = this.state

    // Stores a given value, 5 by default.
    // await contract.methods.set(7).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // Update state with the result.
    // this.setState({ storageValue: response });
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>
    }
    return (
      <Router>
        <div>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">Blockchain Examination</Navbar.Brand>
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>{this.state.accounts[0]}</Navbar.Text>
                <p>&nbsp; </p>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div className="App">
            <div>
              <Switch>
                <Route exact path="/">
                  {/* <HomePage /> */}
                  <ProfessorHome
                    onRoomCreate={(fileHash, arrayOfTa) => {
                      this.createExamRoom(fileHash, arrayOfTa)
                    }}
                  />
                </Route>
                <Route path="/result">
                  <ResultPage />
                </Route>
                <Route path="/main_checker">
                  <MainCheckerPage contract={this.state.contract} />
                </Route>
                <Route path="/review_checker">
                  <ReviewCheckerPage />
                </Route>
                <Route path="/answer_upload">
                  <StudentPostAnswerPage
                    onAnswerSheetUpload={(fileHash, email, roomHash) => {
                      // console.log(roomHash)
                      this.uploadAnswerSheet(fileHash, email, roomHash)
                    }}
                  />
                </Route>
                <Route>
                  <Page404 />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
