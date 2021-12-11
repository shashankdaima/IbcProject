import React, {useState, Component, useEffect } from "react";
import styles from './../App.css'
import getWeb3 from "./../getWeb3";
import Popup from "../components/popup"
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentResultPage from "./../components/student_result_page";

function ResultPage(){  
  

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
    //inputs for push to list
        {/**
        const [idVar,setID]=useState(1);
        const [name, setName] =useState();
        const [marks, setMarks]=useState();
        const [review, setReview]=useState();
    const [data,setData] =useState([{"id":"", "name":"", "marks":"", "remarks":""}])

    function handleSubmit(e){
        e.preventDefault();
        setData(prev=>prev.concat({id:idVar,name:name, marks:marks, remarks:review}))
        
        //listData = data.map((d) => <li key={d.id}>{d.resultBox}</li>);
        setID(idVar+1);
    }
    
    //useEffect
    useEffect(()=>{
        const mem=JSON.parse(localStorage.getItem('result'))
        console.log(mem)
        if(mem !==null){
          setData(mem)
          console.log("run")
        }
      },[])   
       
    useEffect(()=>{
        localStorage.setItem('result',JSON.stringify(data))
        console.log(data)
    },[data])
**/}
    var mainCheck=JSON.parse(localStorage.getItem('form_data'));

    {/* https://www.cluemediator.com/create-simple-popup-in-reactjs*/}
    return(
        <div style={mainBorderStyle}>    
                <h1 style={subBorderStyle}>Result Page</h1>     
            
            <div style={{textAlign:"left" , padding:"10px" }} >
                    <div  style={mainBorderStyle} >
                    <table class="table table-striped">
                                    <tr>
                                    <th>Student ID</th>   
                                    <th>GroupTA ID</th>
                                    <th>Q1 Marks</th>
                                    <th>Q1 Rem.</th>
                                    <th>Q2 Marks</th>
                                    <th>Q2 Rem.</th>
                                    <th>Q3 Marks</th>
                                    <th>Q3 Rem.</th>
                                    </tr>
                                    {mainCheck.map((val) => {
                                    if(val.sID=="test@test.com")
                                    return (                                        
                                        <tr>
                                        <td>{val.sID}</td>
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
                    </div>
                    
            </div>
            <div>
            {/**
            <form onSubmit={handleSubmit}>
                <label>
                Name:
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Student Name"/>
                </label>
                <label>
                Marks:
                <input type="text"  value={marks} onChange={(e)=>setMarks(e.target.value)}/>
                </label>
                <label>
                Remarks:
                <input type="text"  value={review} onChange={(e)=>setReview(e.target.value)}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>

**/}   
            </div>
           
        </div>
    )
}

export default ResultPage;