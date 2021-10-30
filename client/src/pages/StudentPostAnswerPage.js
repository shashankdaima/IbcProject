import React, { useState, Component } from "react";
import {
  Navbar,
  Container
} from 'reactstrap';

//import React,{useState} from 'react'
import { Viewer } from '@react-pdf-viewer/core'; 
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Worker } from '@react-pdf-viewer/core';

function StudentPostAnswerPage(){   
   
      // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  
  // for onchange event
  const [pdfFile, setPdfFile]=useState(null);
  const [pdfFileError, setPdfFileError]=useState('');

  // for submit event
  const [viewPdf, setViewPdf]=useState(null);

  // onchange event
  const fileType=['application/pdf'];
  const handlePdfFileChange=(e)=>{
    let selectedFile=e.target.files[0];
    if(selectedFile){
      if(selectedFile&&fileType.includes(selectedFile.type)){
        let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = (e) =>{
              setPdfFile(e.target.result);
              setPdfFileError('');
            }
      }
      else{
        setPdfFile(null);
        setPdfFileError('Please select valid pdf file');
      }
    }
    else{
      console.log('select your file');
    }
  }

  // form submit
  const handlePdfFileSubmit=(e)=>{
    e.preventDefault();
    if(pdfFile!==null){
      setViewPdf(pdfFile);
    }
    else{
      setViewPdf(null);
    }
  }
      return (
        <div  >
              <div>
                <h2>Upload Solutins For Evalutaion</h2>
              </div>
              <div>
                <text>Please Upload your solutions in PDF format for evalution<br/></text>
              </div>              
              <div >
                  <br></br>
                  
                    <form  onSubmit={handlePdfFileSubmit}>
                      <input type="file" 
                        required onChange={handlePdfFileChange}
                      />
                      {pdfFileError&&<div>{pdfFileError}</div>}
                      <br></br>
                      <button type="submit" >
                        UPLOAD
                      </button>
                    </form>
                    <br></br>
                    <h4>View PDF</h4>
                    <div >
                      {/* show pdf conditionally (if we have one)  */}
                      {viewPdf&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                        <Viewer fileUrl={viewPdf}
                          plugins={[defaultLayoutPluginInstance]} />
                    </Worker></>}

                    {/* if we dont have pdf or viewPdf state is null */}
                    {!viewPdf&&<>No pdf file selected</>}
                    </div>
                </div>
        </div>
      )
  }
  {/** https://github.com/HamzaAnwar1998/Upload-View-Pdf-In-Reactjs/blob/main/src/index.css */}
export default StudentPostAnswerPage;

