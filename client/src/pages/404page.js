import React, {useState, Component, useEffect } from "react";
import styles from './../App.css'
import getWeb3 from "./../getWeb3";
import Popup from "../components/popup"
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentResultPage from "./../components/student_result_page";

export default function Page404(){  
    return(
            <h1>404- Response not found</h1>
        )
}
