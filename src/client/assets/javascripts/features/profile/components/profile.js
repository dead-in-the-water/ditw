import React, { Component } from 'react'
import { Link } from 'react-router'

export default class ProfileView extends Component {
	render () {
		return(
			<div className="container text-center">
				<h1>This is the profile view</h1>
				<hr/>
				<h2>Who do you want to be today?</h2>
				<p>Assuming different than current</p>
				<Link to="/">Back to main</Link>
			</div>
		)
	}
}