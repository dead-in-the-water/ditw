import React, { Component } from 'react'
import { Link } from 'react-router'

import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import Avatar from 'material-ui/Avatar';
import ActionHome from 'material-ui/svg-icons/action/home';

export default class SignOnPage extends Component {
	handleClick = function() {
		alert('TouchTap happened');
	}

	render () {
		return(
			<div>				
				<br/>
			    <RaisedButton 
			    	label="Sign on with Google"
			    	primary={true}
			    />
			    <br />
			    <Link to="HomePageView">Back door</Link>
			</div>
		)
	}
}