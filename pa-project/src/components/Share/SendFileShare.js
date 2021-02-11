import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
//import { UserRegistration, UsernameValidation } from '../services/RegistrationService';
import { REGISTRATION_FIELDS, REGISTRATION_MESSAGE, COMMON_FIELDS, ERROR_IN_REGISTRATION } from '../MessageBundle';
import axios from 'axios';

export default class SendFileShare extends Component {
  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      // console.log(response.data);
    })
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
  }


  fileUpload = async file => {
  	const formData = new FormData();
  	formData.append('file',file)
    await axios.post('http://localhost:5000/putFile', formData, {
  	    headers: {
  	      'Content-Type': 'multipart/form-data'
  	    }
  	}).then(response => {
  			console.log(response);
  	})
  	.catch(error => {
  		console.log(error.response);
  	});
  }

	render() {
		return (
			<div>
				<center>
				<br/> <br/> <br/> <br/>
				<h2>Send File</h2>
			     <form onSubmit={this.onFormSubmit}>
			        <input type="file" onChange={this.onChange} />
			        <button type="submit">Upload</button>
			     </form>
				</center>
			</div>
		)
	}
}
