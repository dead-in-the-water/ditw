import React, { Component } from 'react'
import { Link } from 'react-router'

export default class MainView extends Component {
	render () {
		return(
			<div className="container text-center">
				<h1>This is the main view</h1>
				<hr/>
				<h2>Welcome!</h2>
				<Link to="/ProfileView">Manage profile</Link>
			</div>
		)
	}
}