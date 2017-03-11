import React, { Component } from 'react'
import { Link } from 'react-router'

export default class SignOutView extends Component {
	render () {
		return(
			<div className="container text-center">
				<h1>Gotta Sign Out</h1>
				<Link to="HomePageView">Back to main</Link>
			</div>
		)
	}
}