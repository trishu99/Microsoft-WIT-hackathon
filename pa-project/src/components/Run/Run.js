// import React from 'react';
import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
//import { UserRegistration, UsernameValidation } from '../services/RegistrationService';
import { REGISTRATION_FIELDS, REGISTRATION_MESSAGE, COMMON_FIELDS, ERROR_IN_REGISTRATION } from '../MessageBundle';
import axios from 'axios';
import Header from '../Header';


class Run extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			isDialogOpen: false,
			pid_t:'',
			pid_s:'',
			programname:'',
			programnameforaftertime:'',
			starttime: '',
			programnameforattime:'',
			attime:'',
			processnameforterminate:'',
			processnameforsignal: '',
			processnameforcheck:'',
			signal:'',
			output:'',
			signaloutput:'',
			checkoutput:'',
			startpoutput:'',
			startpatoutput:'',
			startattimeoutput:'',
			
			poweroutput:'',
			cancelval:'',
			shutdownaftermin:'',
			shutdownattime:'',

			sdnow:'',
			sdaftermin:'',
			sdattime:'',
			restartsys:'',
			rebootsys:'',
			suspendsys:'',
			hibernatesys:'',

			screenlocksys:'',
			logoutsys:'',

		};
		 this.handleChange = this.handleChange.bind(this);

	}
	
	  handleChange (e) {
	console.log(e.target.value)
    this.setState({ [e.target.name]: e.target.value });
  }

	
	/*handleOnChangeText = e => {
		const
		this.setState({
			[programename] : value
		})
	}*/
	/*handleOnChangeProgramName = e => {
		this.setState({
			programname: e.target.value
		});
	}

	handleOnChangePidT = e => {
		this.setState({
			pid_t: e.target.value
		});
	}

	handleOnChangePidS = e => {
		this.setState({
			pid_s: e.target.value
		});
	}

	handleOnChangeSignal = e => {
		this.setState({
			signal : e.target.value
		});
	}
	handleOnChangeProcessNameForSignal = e => {
		this.setState({
			processnameforsignal : e.target.value
		});
	}

	handleOnChangeProcessNameForTerminate = e => {
		this.setState({
			processnameforterminate : e.target.value
		});
	}

	handleOnChangeProcessNameForCheck = e => {
		this.setState({
			processnameforcheck : e.target.value
		});
	}
	handleOnChangeShutdownaftermin = e => {
		this.setState({
			shutdownaftermin : e.target.value
		});
	}
	handleOnChangeShutdownattime = e => {
		this.setState({
			shutdownattime: e.target.value
		});
	}*/


	StartProgram = async e => {
		
		e.preventDefault();
		const data = {
			programname : this.state.programname,
			// filename : this.state.filename
		};
		console.log(data);
		await axios.post('http://localhost:5000/startprocess', data)
		.then((response) => {
			console.log(response)
			 this.setState({
				startpoutput: response.data	
			})
		}) 
	}
	
	
	StartProgramAfterTime = async e => {
		
		e.preventDefault();
		const data = {
			programname : this.state.programnameforaftertime,
			atime : this.state.starttime,
		};
		console.log(data);
		await axios.post('http://localhost:5000/startprocessaftermins', data)
		.then((response) => {
			console.log(response)
			 this.setState({
				startpatoutput: response.data	
			})
		}) 
	}
	
	StartProgramAtTime = async e => {
		
		e.preventDefault();
		const data = {
			programname : this.state.programnameforattime,
			attime : this.state.attime,
		};
		console.log(data);
		await axios.post('http://localhost:5000/startprocessattime', data)
		.then((response) => {
			console.log(response)
			 this.setState({
				startattimeoutput : response.data	
			})
		}) 
	}
	
	


	checkprocess = async e => {

		e.preventDefault();
		const data = {
			processname : this.state.processnameforcheck,
		};
		console.log(data);
		await axios.post('http://localhost:5000/checkprocess', data)
		.then((response) => {
			console.log(response)
			 this.setState({
				checkoutput: response.data	
		})     
		   /*const url = window.URL.createObjectURL(new Blob([response.data]));
		   const link = document.createElement('a');
		   link.href = url;
		   link.setAttribute('download', data.filename); //or any other extension
		   document.body.appendChild(link);
		   link.click();*/
		});
	}
	

	sendsignal = async e => {

		e.preventDefault();
		const data = {
			processname : this.state.processnameforsignal,
			signal : this.state.signal,
			pid : this.state.pid_s,
			// filename : this.state.filename
		};
		console.log(data);
		await axios.post('http://localhost:5000/sendsignal', data)
		.then((response) => {
			console.log(response)
			 this.setState({
			signaloutput: response.data	
		})     
		   /*const url = window.URL.createObjectURL(new Blob([response.data]));
		   const link = document.createElement('a');
		   link.href = url;
		   link.setAttribute('download', data.filename); //or any other extension
		   document.body.appendChild(link);
		   link.click();*/
		});
	}
	


	downloadEmployeeData = async e => {

		e.preventDefault();
		const data = {
			processname : this.state.processnameforterminate,
			pid : this.state.pid_t,
			// filename : this.state.filename
		};
		console.log(data);
		await axios.post('http://localhost:5000/terminateprocess', data)
		.then((response) => {
			console.log(response)
			 this.setState({
			output: response.data	
		})     
		   /*const url = window.URL.createObjectURL(new Blob([response.data]));
		   const link = document.createElement('a');
		   link.href = url;
		   link.setAttribute('download', data.filename); //or any other extension
		   document.body.appendChild(link);
		   link.click();*/
		});
	}
	
	shutdownnow = async e => {
			
		console.log('shutdown');
		await axios.post('http://localhost:5000/shutdownnow')
		.then((response) => {
			console.log(response)
			 this.setState({
				sdnow: response.data	
			})
		}) 
	}

	shutdownaftergivenmin = async e => {
		
		e.preventDefault();
		const data = {
			mins : this.state.shutdownaftermin,
			// filename : this.state.filename
		};
		console.log('shutdown after min');
		await axios.post('http://localhost:5000/shutdownaftermin', data)
		.then((response) => {
			console.log(response)
			 this.setState({
				sdaftermin: response.data	
			})
		}) 
	}

	shutdownattime = async e => {
		
		e.preventDefault();
		const data = {
			gtime : this.state.shutdownattime,
			// filename : this.state.filename
		};
		console.log('shutdown after min');
		await axios.post('http://localhost:5000/shutdownattime', data)
		.then((response) => {
			console.log(response)
			 this.setState({
				sdattime: response.data	
			})
		}) 
	}


	shutdowncancel = async e => {
	
		console.log('cancel shutdown');
		await axios.post('http://localhost:5000/cancelshutdown')
		.then((response) => {
			console.log(response)
			 this.setState({
				cancelval: response.data	
			})
		}) 
	}

	restartsystem = async e => {
	
		console.log('restart');
		await axios.post('http://localhost:5000/restartsystem')
		.then((response) => {
			console.log(response)
			 this.setState({
				restartsys: response.data	
			})
		}) 
	}
	rebootsystem = async e => {
	
		console.log('reboot');
		await axios.post('http://localhost:5000/rebootsystem')
		.then((response) => {
			console.log(response)
			 this.setState({
				rebootsys: response.data	
			})
		}) 
	}

	suspendsystem = async e => {
	
		console.log('suspend');
		await axios.post('http://localhost:5000/suspendsystem')
		.then((response) => {
			console.log(response)
			 this.setState({
				suspendsys: response.data	
			})
		}) 
	}

	hibernatesystem = async e => {
	
		console.log('hibernate');
		await axios.post('http://localhost:5000/hibernatesystem')
		.then((response) => {
			console.log(response)
			 this.setState({
				hibernatesys: response.data	
			})
		}) 
	}
	
	screenlocksystem = async e => {
	
		console.log('screen lock');
		await axios.post('http://localhost:5000/screenlocksystem')
		.then((response) => {
			console.log(response)
			 this.setState({
				screenlocksys: response.data	
			})
		}) 
	}

	logoutsystem = async e => {
	
		console.log('logout');
		await axios.post('http://localhost:5000/logoutsystem')
		.then((response) => {
			console.log(response)
			 this.setState({
				logoutsys: response.data	
			})
		}) 
	}

	




	
	//openDialog = () => this.setState({ isDialogOpen: true })
 
   // handleClose = () => this.setState({ isDialogOpen: false })



	render() {
	
		return (
			<div id="container">
				<Header/>
				<center>
				<h5>provide either processname or processid</h5>
				
				<h1>Start processes</h1>
				<p>path</p>
				<input type="text" value={this.state.programname} name="programname" onChange={this.handleChange}/>
				<button onClick={this.StartProgram}>Run</button>
				<h4>{this.state.startpoutput}</h4>
				<br/><br/><br/>	

				<h1>Start processes after secs/mins/hrs/days</h1>
				<h6>(suffix the time with m for mins, s for secs , h for hours, d for days)</h6>
				<label>Program Name</label>
				<input type="text" value={this.state.programnameforaftertime} name="programnameforaftertime" onChange={this.handleChange}/>
				<br/>
				<label>Time  </label>
				<input type="text" value={this.state.starttime} name="starttime" onChange={this.handleChange}/>
				<br/>
				<button onClick={this.StartProgramAfterTime}>Run</button>
				<h4>{this.state.startpatoutput}</h4>
				<br/><br/><br/>	
				
				
				<h1>Start processes at time in (mm/dd/yyyy 24hr format:time) format</h1>
				<h6>(give time in 24 hr format)</h6>
				<label>Program Name</label>
				<input type="text" value={this.state.programnameforattime} name="programnameforattime" onChange={this.handleChange}/><br/>
				<label>Date and time</label>
				<input type="text" value={this.state.attime} name="attime" onChange={this.handleChange}/><br/>
				<button onClick={this.StartProgramAtTime}>Run</button>
				<h4>{this.state.startattimeoutput}</h4>
				<br/><br/><br/>	
				
			
							
				<h1>Stop/Terminate processes</h1>
				<h3>Process Name</h3>
				<input type="text" value={this.state.processnameforterminate} name="processnameforterminate" onChange={this.handleChange}/><br/><br/>
				<h3>Process Pid</h3>
				<input type="text" value={this.state.pid_t} name="pid_t" onChange={this.handleChange}/><br/><br/>
				<button onClick={this.downloadEmployeeData}>Stop or Terminate</button><br/>
				<h4>{this.state.output}</h4>
				<br/><br/><br/>
				
				
				
				<h1>Signal processes</h1>
				<h3>Process Name</h3>
				<input type="text" value={this.state.processnameforsignal} name="processnameforsignal" onChange={this.handleChange}/><br/><br/>
				<h3>Process Pid</h3>
				<input type="text" value={this.state.pid_s} name="pid_s" onChange={this.handleChange}/><br/><br/>
				<h3>Signal Type</h3>
				<input type="text" value={this.state.signal} name="signal" onChange={this.handleChange}/>			
				<br/><br/>
				<button onClick={this.sendsignal}>Send Signal</button>
				<h4>{this.state.signaloutput}</h4>
				<br/><br/><br/>


				<h1>check if process is running or not</h1>
				<h3>Process Name</h3>
				<input type="text" value={this.state.processnameforcheck} name="processnameforcheck" onChange={this.handleChange}/><br/><br/>
				<button onClick={this.checkprocess}>Check</button>
				<h4>{this.state.checkoutput}</h4>
				<br/><br/><br/>


				<h1>power options</h1>
				<br/>
				<button onClick={this.shutdownnow}>shutdown now</button>
				<h4>{this.state.sdnow}</h4>
				{/*<button type="button" onClick={this.openDialog}>Open Dialog</button>
                {
                    this.state.isDialogOpen &&
                    <Dialog
                        title="Dialog Title"
                        modal={true}
						onClose={this.handleClose}
						isDraggable={false}

                        buttons={
                            [{
                                text: "Close",
                                onClick: () => this.handleClose()
                            }]
                        }>
                        <h1>Dialog Content</h1>
                        <p>More Content. Anything goes here</p>
                    </Dialog>
                }*/}


				<input type="text" value={this.state.shutdownaftermin} name="shutdownaftermin" onChange={this.handleChange}/>
				<button onClick={this.shutdownaftergivenmin}>shutdown after mins</button>
				<h4>{this.state.sdaftermin}</h4>
				{/*<button onClick={this.shutdowncancel}>cancel the shutdown</button>
				<h4>{this.state.cancelval}</h4>*/}

				<h5>Give time in 24-hour format when you want to shutdown your pc</h5>
				<input type="text" value={this.state.shutdownattime} name="shutdownattime" onChange={this.handleChange}/>
				<button onClick={this.shutdownattime}>shutdown at given time</button>
				<h4>{this.state.sdattime}</h4>

				<button onClick={this.shutdowncancel}>cancel the shutdown</button>
				<h4>{this.state.cancelval}</h4>


				<button onClick={this.restartsystem}>restart system</button>
				<h4>{this.state.restartsys}</h4>

				<button onClick={this.rebootsystem}>reboot system</button>
				<h4>{this.state.rebootsys}</h4>

				<button onClick={this.suspendsystem}>suspend system</button>
				<h4>{this.state.suspendsys}</h4>

				<button onClick={this.hibernatesystem}>place system in hibernate mode</button>
				<h4>{this.state.hibernatesys}</h4>

				
				<button onClick={this.screenlocksystem}>lock the screen</button>
				<h4>{this.state.screenlocksys}</h4>
	
				<button onClick={this.logoutsystem}>logout</button>
				<h4>{this.state.logoutsys}</h4>
	
				
				
				</center>
			</div>
		)
	}

}

export default Run;
