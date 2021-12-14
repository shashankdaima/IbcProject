import React, {useState, Component, useEffect } from "react";
import { Container, Card, Form, Button, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function CheckSelect(){  
    const [searchit,setsearchit]=useState("");
    const mainBorderStyle = {
        color: "black",
        //backgroundColor: "black",
        padding: "10px",
        //fontFamily: "Arial",
        border: '4.5px solid black',
        
    };
    const subBorderStyle={
        border:"1.5px solid black",
        backgroundColor:"skyblue",
        height:"50%",
        width:"18%",
    };
    const addStudent =() =>{
        
    }
    
    //roomHash
    //SerialNumber
    //Name
    //EvalLink
    //Put in this part the array.
    var mainCheck=JSON.parse(localStorage.getItem('form_data'));

    return(
        <div style={{textAlign:"centre" , padding:"10px" }} >
        <div style={mainBorderStyle}>    
                <h1 style={subBorderStyle}>Check Papers</h1>  
                <h4>Enter Exam Room Hash</h4>
                <input
                    type="text"
                    placeholder="Exam Room Hash"
                    onChange={(event)=>{
                        setsearchit(event.target.value);
                    }}
                />
                

                <table class="table table-striped">
                                    <tr>
                                    <th>Sno.</th>   
                                    <th>Name</th>
                                    <th>Main Evalution</th>
                                    <th>Cross Checking</th>
                                    </tr>

                {mainCheck.filter((val)=>{
                    if (searchit==val.sID && searchit!=""){
                        return val
                    }
    
                }).map((val,key)=>{
                    return (
                       <tr className="hi" key={key}>
                                        <td>{val.SerialNumber}</td>
                                        <td>{val.Name}</td>
                                        <td><li><Link to={{
                                            pathname:"/main_checker",
                                            dataPass:{
                                                name: "Check",
                                                answerSheet:""
                                            }
                                        }
                                            }> Main Checking Link</Link></li></td>
                                        <td><li><Link to={{
                                            pathname:"/review_checker",
                                            dataPass:{
                                                name: "Check",
                                                answerSheet:""
                                            }
                                        }
                                            }> Main Checking Link</Link></li></td>
                                        </tr>
                           
                        );
                })}
                </table>
                    
            </div>
            <div>
            </div>
           
        </div>
    )
}

export default CheckSelect;