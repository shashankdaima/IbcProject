import React, { Component, useState, useEffect } from 'react'
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
import CheckSelect from './pages/CheckSelect'
const regex = '/(w+:{0,1}w*@)?/'

class App extends Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    submitData: [
      {
        studentfileHash: '',
        studentEmail: '',
        studentRoomHash: '',
      },
    ],
    memory: JSON.parse(localStorage.getItem('submit')),
  }
  submitData = (fileHash, email, roomHash) => {
    this.state.submitData.concat({
      studentfileHash: fileHash,
      studentEmail: email,
      studentRoomHash: roomHash,
    })
  }
  // https://bafybeifzr4uvto2hm6e7ixpxgbngsnwgk5vhfxk3dxekm3zwmnupur3gom.ipfs.infura-ipfs.io/
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3()
      // if (this.state.memory !== null) {
      //   setSubmitData(mem)
      //   console.log('run')
      // }
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts()

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
  validRoomHashForAnswerSheets = async (roomHash) => {
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
  getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  // 40E3f37B69EB90BBc0DA7Ec5DBCAf3A4
  uploadAnswerSheet = async (fileHash, email, roomHash) => {
    let response = await this.validRoomHashForAnswerSheets(roomHash)
    console.log(response)
    if (response['response']) {
      // this.submitData(fileHash,email, roomHash);
      this.state.submitData = this.state.submitData.concat({
        studentfileHash: fileHash,
        studentEmail: email,
        studentRoomHash: roomHash,
      })

      localStorage.setItem('submit', JSON.stringify(this.state.submitData))

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
        return {
          response: true,
          data: iExamRoom['ta_list'],
          count: parseInt(Number(iExamRoom['ta_count'])),
        }
      }
      index++
    }
    return {
      response: false,
      error: 'Illegal State Exception: Invalid Room Hash',
    }
  }

  getValidUserIndex = (arrOfTas, currentUser) => {
    for (let i in arrOfTas) {
      if (arrOfTas[i] === currentUser) {
        return { result: true, index: Number(i) + 1 }
      }
    }
    return { result: false }
  }

  getAnswerSheets = async (roomHash, ta_index) => {
    let noOfAnswerSheets = await this.state.contract.methods
      .answerSheetPointer()
      .call()
    let result = []
    let response = await this.validRoomHashForAnswerSheets(roomHash)
    let mappingPosition = response['position']
    // console.log(typeof(mappingPosition))
    for (let i = 1; i <= parseInt(Number(noOfAnswerSheets)); i++) {
      let answerSheet = await this.state.contract.methods.answerSheets(i).call()
      if (
        Number(answerSheet['examRoomId']) == Number(mappingPosition) &&
        Number(answerSheet['taIndex']) == ta_index
      ) {
        result.push(answerSheet)
      }
    }
    if (result.length > 0) {
      return { response: true, result: result }
    }
    return { response: false }
  }

  getAllAnswerSheetsForChecker = async (examRoomHash) => {
    const currentUser = this.state.accounts[0]
    let response = await this.validRoomHashForChecker(examRoomHash)
    // console.log(currentUser)
    // console.log(response)
    let arrOfTas = this.taListDecoder(response['data'])
    let result = this.getValidUserIndex(arrOfTas, currentUser) // roomHash is authed and ta ka index bhi pata
    if (result['result']) {
      console.log(result)
      let response = await this.getAnswerSheets(examRoomHash, result['index'])
      if (response['response']) {
        return response['result']
      } else {
        return null
      }
    } else {
      alert('Failure')
    }
  }
  // A1DBE4AD6640875aF1cC74cd0128Ee48
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
                <Route path="/check_select">
                  <CheckSelect />
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

// 4aaC02de9547dA9CE31Da5BadBE6A037
