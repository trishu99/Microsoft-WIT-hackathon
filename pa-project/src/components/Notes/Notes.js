import { faNotesMedical } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import Header from '../Header';


const Notes = () => {
  const { transcript, resetTranscript } = useSpeechRecognition()

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log("not working")
    return null
  }

  return (
    <div id="container">
		<Header/>
        <div>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <br/>
        <br/>
        <p>{transcript}</p>
        </div>
    </div>
  )
}
export default Notes;