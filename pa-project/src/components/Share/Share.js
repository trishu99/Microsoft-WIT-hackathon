import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
//import { UserRegistration, UsernameValidation } from '../services/RegistrationService';
import { REGISTRATION_FIELDS, REGISTRATION_MESSAGE, COMMON_FIELDS, ERROR_IN_REGISTRATION } from '../MessageBundle';
import axios from 'axios';
import SendFileShare from './SendFileShare';
import GetFileShare from './GetFileShare';
import Header from '../Header';

export default class Share extends Component {
	render() {
		return (
			<div>
				<Header/>
				<center><h1>Share files</h1></center>
				<SendFileShare />
				<br/>
				<br/>
				<br/>
				<br/>
				<GetFileShare />
			</div>
		)
	}
}
