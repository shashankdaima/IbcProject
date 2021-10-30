import React, {useState, Component } from "react";
import styles from './../App.css'
import getWeb3 from "./../getWeb3";
import Popup from "../components/popup"
import 'bootstrap/dist/css/bootstrap.min.css';

function ResultPage(props){  
    const handleEvent = (a) => {
        alert(a);
      };
    
    const mainBorderStyle = {
        color: "black",
        //backgroundColor: "black",
        padding: "10px",
        //fontFamily: "Arial",
        border: '2.5px solid black'  
    };
    const subBorderStyle={
        border:"2.5px solid black",
        backgroundColor:"skyblue",
        height:"50%",
        width:"18%"
    };
    
    //Creating a popup
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const [isChecked, setIsChecked] = useState(false);
    const toggleCheck =() =>{
        setIsChecked(!isChecked);
    }


    {/* https://www.cluemediator.com/create-simple-popup-in-reactjs*/}
    return(
        <div style={mainBorderStyle}>    
                <h1 style={subBorderStyle}>Result Page</h1>     
            <div>
            </div>
            <div style={{textAlign:"left" , padding:"50px" }} >
                    <div  style={mainBorderStyle} >
                    <text >Student Name: Student 1<br /></text>    
                    <text>Status: {isChecked &&"Checked"}{!isChecked &&"Not Checked"}<br /></text>  
                    <input
                        type="button"
                        value="Status Toggle"
                        onClick={toggleCheck}
                        />
                    <input
                        type="button"
                        value="Fetch Result"
                        onClick={togglePopup}
                        />
                        {isOpen && isChecked && <Popup
                        content={<>
                            <b>Result <br/></b>
                            <text>Total Marks Obtained: 7/10</text>
                            <p>Remark: Incorrect assumption in Q2</p>
                            <button>View TA's</button>
                        </>}
                        handleClose={togglePopup}
                        />}
                    </div>
                </div>

        </div>
   )
   }
export default ResultPage;