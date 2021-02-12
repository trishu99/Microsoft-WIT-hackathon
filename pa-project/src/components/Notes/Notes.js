import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Header from "../Header";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";

const Notes = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [summarize, setSummarize] = useState("");

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  function getPrediction() {
    console.log("get prediction");
    console.log(transcript);
    const data = {
      text:
        'Machine learning is the study of computer algorithms that improve automatically through experience. It is seen as a part of artificial intelligence. Machine learning algorithms build a model based on sample data, known as "training data", in order to make predictions or decisions without being explicitly programmed to do so.Machine learning algorithms are used in a wide variety of applications, such as email filtering and computer vision, where it is difficult or unfeasible to develop conventional algorithms to perform the needed tasks.A subset of machine learning is closely related to computational statistics, which focuses on making predictions using computers; but not all machine learning is statistical learning. The study of mathematical optimization delivers methods, theory and application domains to the field of machine learning. Data mining is a related field of study, focusing on exploratory data analysis through unsupervised learning. In its application across business problems, machine learning is also referred to as predictive analytics.',
    };

    axios
      .post("http://localhost:5000/getSummarize", data)
      .then((response) => {
        console.log("inside response");
        console.log(response.data);
        setSummarize(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  return (
    <div>
      <Header />
      <br />
      <br />
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <br />
      <br />

      <TextareaAutosize value={transcript} />

      <br />
      <br />
      <button onClick={getPrediction}>Summarize</button>
      <br />
      <br />
      <TextareaAutosize value={summarize} />
    </div>
  );
};
export default Notes;
