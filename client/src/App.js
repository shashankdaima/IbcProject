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
    this.state.contract.createExamRoom(arrayOfTa,1,fileHash).send({from:this.state.account[0]}).on('transactionHash', (hash) => {
      window.location.reload()
    })
    .on('error', (e) => {
      window.alert('Error')
    })
  }

  uploadAnswerSheet = async (fileHash, email) => {
    this.state.contract.methods
      .uploadAnswerSheet(fileHash, email)
      .send({ from: this.state.accounts[0] })
      .on('transactionHash', (hash) => {
        window.location.reload()
      })
      .on('error', (e) => {
        window.alert('Error')
      })
    // console.log(await this.state.contract.methods.answerSheets(1).call())
  }

  runExample = async () => {
    const { accounts, contract } = this.state

    // Stores a given value, 5 by default.
    // await contract.methods.set(7).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    // // const response = await contract.taskCount();
    // const response= await contract.methods.taskCount().send({from:accounts[0]})
    // Update state with the result.
    // this.setState({ storageValue: response });
    // console.log(response)
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
                <Route exact path="/" >
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
                  <MainCheckerPage  contract ={this.state.contract}/>
                </Route>
                <Route path="/review_checker">
                  <ReviewCheckerPage />
                </Route>
                <Route path="/answer_upload">
                  <StudentPostAnswerPage
                    onAnswerSheetUpload={(fileHash, email) =>
                      this.uploadAnswerSheet(fileHash, email)
                    }
                  />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
      // <h1>The stored value is: {this.state.response}</h1>
    )
  }
}
export default App