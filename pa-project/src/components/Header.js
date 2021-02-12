import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	render() {
		return (
			<div>
			<nav className='navbar navbar-expand-lg navbar-light header'>
			<a className="navbar-brand" href="#">
            <h1><b>Dora</b></h1>
          	</a>
          	<h2>
          	<div className="nav navbar-nav ml-auto">
          	<Link to="/Terminal" className='nav-item nav-link'>Terminal</Link>
            <Link to="/Share" className='nav-item nav-link'>Share</Link>
            <Link to="/Run" className='nav-item nav-link'>Run</Link>	
			<Link to="/Notes" className='nav-item nav-link'>Notes</Link>	
			<Link to="/Health" className='nav-item nav-link'>Health</Link>	
			<Link to="/TimeTable" className='nav-item nav-link'>TimeTable</Link>	

			</div>
			</h2>
			</nav>			
			</div>
		)
	}
}
