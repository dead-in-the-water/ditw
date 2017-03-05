import React, { Component } from 'react'
import { Link } from 'react-router'

import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import Avatar from 'material-ui/Avatar';
import ActionHome from 'material-ui/svg-icons/action/home';

import googleSignOnButton from '../images/btn_google_signin_dark_pressed_web.png'
import './SignOnPage.scss'

export default class SignOnPage extends Component {
	render () {
		return(
			<div>	
				<img className='sign-in-button-1' src={googleSignOnButton} onClick={alert('TouchTap happened')}/>
			    <br />
			    <Link to="HomePageView">Back door</Link>
			</div>
		)
	}
}