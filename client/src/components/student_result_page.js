import React, {useState, Component } from "react";
import styles from './../App.css'
import getWeb3 from "./../getWeb3";
import Popup from "../components/popup"
import 'bootstrap/dist/css/bootstrap.min.css';

function StudentResultPage(props){  
    {/*props -> name  marks remarks*/}
    const handleEvent = (a) => {
        alert(a);
      };
      const mainBorderStyle = {
        color: "black",
        //backgroundColor: "black",
        padding: "10px",
        //fontFamily: "Arial",
        border: '1.5px solid black',

        
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
                    <text >Student Name: {props.name}<br /></text>    
                    <text>Status: {isChecked &&"Checked"}{!isChecked &&"Not Checked"}<br /></text>  
                    <input
                        type="button"
                        value="Status"
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
                            <text>Total Marks Obtained: {props.marks}</text>
                            <p>Remark: {props.remarks}</p>
                            <button>View TA's</button>
                        </>}
                        handleClose={togglePopup}
                        />}
                </div>
   )
   }
export default StudentResultPage;