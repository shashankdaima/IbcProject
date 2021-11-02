import React, { useState, Component } from "react";
import styles from './../App.css'
import getWeb3 from "./../getWeb3";
import Popup from "../components/popup"
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentResultPage from "./../components/student_result_page";

function ResultPage() {


    const mainBorderStyle = {
        color: "black",
        //backgroundColor: "black",
        padding: "10px",
        //fontFamily: "Arial",
        border: '2.5px solid black'
    };
    const subBorderStyle = {
        border: "2.5px solid black",
        backgroundColor: "skyblue",
        height: "50%",
        width: "18%"
    };
    const addStudent = () => {

    }
    //inputs for push to list

    const [idVar, setID] = useState(2);
    const [name, setName] = useState();
    const [marks, setMarks] = useState();
    const [review, setReview] = useState();
    const [data, setData] = useState([{ "id": "1", "resultBox": <StudentResultPage name="Student 1" marks="10" remarks="correct" /> }])
    var listData = data.map((d) => <ul key={d.id}>{d.resultBox}</ul>);
    function handleSubmit(e) {
        e.preventDefault();
        setData(prev => prev.concat({ id: idVar, resultBox: <StudentResultPage name={name} marks={marks} remarks={review} /> }))
        //listData = data.map((d) => <li key={d.id}>{d.resultBox}</li>);
        setID(idVar + 1);
    }


    {/* https://www.cluemediator.com/create-simple-popup-in-reactjs*/ }
    return (
        <div className="card">
            <h1 style={subBorderStyle}>Result Page</h1>
            <div style={{ textAlign: "left", padding: "50px" }} >
                <div style={mainBorderStyle} >
                    {listData}
                </div>

            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Student Name" />
                    </label>
                    <label>
                        Marks:
                        <input type="text" value={marks} onChange={(e) => setMarks(e.target.value)} />
                    </label>
                    <label>
                        Remarks:
                        <input type="text" value={review} onChange={(e) => setReview(e.target.value)} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
            <div>

            </div>
        </div>
    )
}

export default ResultPage;