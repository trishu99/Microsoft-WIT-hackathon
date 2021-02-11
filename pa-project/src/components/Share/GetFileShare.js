// import React from 'react';
import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
//import { UserRegistration, UsernameValidation } from '../services/RegistrationService';
import { REGISTRATION_FIELDS, REGISTRATION_MESSAGE, COMMON_FIELDS, ERROR_IN_REGISTRATION } from '../MessageBundle';
import axios from 'axios';
class GetFileShare extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			filename : '',
			path : ''
		};
	}
	
	handleOnChangeFileName = e => {
		this.setState({
			filename : e.target.value
		});
	}

	handleOnChangePath = e => {
		this.setState({
			path : e.target.value
		});
	}

	downloadEmployeeData = async e => {

		e.preventDefault();
		const data = {
			path : this.state.path,
			// filename : this.state.filename
		};
		console.log(data);
		await axios.post('http://localhost:5000/getFile', data)
		.then((response) => {
		   const url = window.URL.createObjectURL(new Blob([response.data]));
		   const link = document.createElement('a');
		   link.href = url;
		   link.setAttribute('download', data.filename); //or any other extension
		   document.body.appendChild(link);
		   link.click();
		});
	}
	
	render() {
		return (
			<div id="container">
				<h1>Download File using React App</h1>
				<p>path</p>
				<input type="text" value={this.state.path} name="path" onChange={this.handleOnChangePath}/>
				<button onClick={this.downloadEmployeeData}>Download</button>
			</div>
		)
	}

}

export default GetFileShare;