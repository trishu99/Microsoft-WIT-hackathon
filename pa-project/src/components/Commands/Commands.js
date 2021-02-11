import React, { Component } from 'react';
import axios from 'axios';
import Terminal from 'terminal-in-react';
import Header from '../Header';
export default class Commands extends Component {

	constructor(props) {
	    super(props);
	    this.state ={
			path : "path"
	    };
	  }
	 componentDidMount() {
	 	axios.get('http://localhost:5000/CWD')
            .then(response => {
                this.setState({
                  path : response.data
                });
                console.log(response.data)
            })
            .catch(function(error) {
                console.log(error);
            })
	 }
    changedir() {
        axios.get('http://localhost:5000/CWD')
            .then(response => {
                this.setState({
                  path : response.data
                });
                console.log(response.data)
            })
            .catch(function(error) {
                console.log(error);
            })
    }
	render() {
		return (
			<div>
			<Header/>
			
			<div
				style={{
		          display: "flex",
		          justifyContent: "center",
		          alignItems: "center",
		          height: "5vh"
		        }}
			>
			<center><h2>{this.state.path}</h2></center> 
     		</div>
			<div
				style={{
		          display: "flex",
		          justifyContent: "center",
		          alignItems: "center",
		          height: "100vh"
		        }}
			>
				<Terminal
				  commandPassThrough={(cmd, print) => {
				    const data = {
				    	'command' : cmd.join(" ")
				    };
				    if(cmd[0] == "path"){
				    	const data = {'command' : 'pwd'}
				    	var path = '';
				    	axios.post('http://localhost:5000/shell', data)
						.then(response => {
							// print(response.data.join('\n'));
							path += response.data.join(',') + '/';
							// console.log(path);
						})
						.catch(err => {
							console.log(err.response);
						});
						const filename = {'command' : 'ls ' + cmd[1]}
						axios.post('http://localhost:5000/shell', filename)
						.then(response => {
							// print(response.data.join('\n'));
							path += response.data;
							// console.log(path);
							path = path.replace(',', '');
							path = path.replace(',', '');
							// path.splice(0, path.length - 1);
							print(path);
						})
						.catch(err => {
							console.log(err.response);
						});
						
						console.log(path);
				    }
				    else if(cmd[0] == 'get'){
				    	const data = {'path' : cmd[1]};
				    	axios.post('')
				    	axios.post('http://localhost:5000/getFile', data)
						.then((response) => {
						   const url = window.URL.createObjectURL(new Blob([response.data]));
						   const link = document.createElement('a');
						   link.href = url;
						   link.setAttribute('download', data.filename); //or any other extension
						   document.body.appendChild(link);
						   link.click();
						});
				    }
				    else if(cmd[0] == 'cd'){
				    	const data = {'command' : cmd[1]};
				    	axios.post('')
				    	axios.post('http://localhost:5000/changedir', data)
						.then((response) => {
						 		{this.changedir()}
						});
				    }
					else{
					 	axios.post('http://localhost:5000/shell', data)
						.then(response => {
							print(response.data.join('\n'));
						})
						.catch(err => {
							console.log(err.response);
						});
					}
				   }}
				/>
			</div>
			</div>
		);
	}
}
