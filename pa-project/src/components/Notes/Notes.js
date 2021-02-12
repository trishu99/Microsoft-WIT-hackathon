import { faNotesMedical } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import Header from '../Header';
import axios from "axios";
import TextareaAutosize from 'react-textarea-autosize';


const Notes = () => {
  const { transcript, resetTranscript } = useSpeechRecognition()
  const [summarize, setSummarize] = useState('');

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  function   getPrediction() {    
        console.log('get prediction');
        console.log(transcript)
        const data = {
          text : transcript,
        };
    

        axios.post('http://localhost:5000/getSummarize', data)
        .then(response => {
                console.log("inside response")
                console.log(response.data);
                setSummarize(response.data)
        })
        .catch(error => {
            console.log(error.response);
        });
          
    }

  return (
    <div>
      <Header/>
      <br/>
      <br/>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <br/>
      <br/>
      <TextareaAutosize value={transcript}/>

      <textarea value={transcript}/>
      <br/>
      <br/>
      <button onClick={getPrediction}>Summarize</button>
      <br/>
      <br/>
      <textarea value={summarize}/>


    </div>
  )
}
export default Notes


