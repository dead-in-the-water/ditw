import React, { Component } from 'react'
import { Link } from 'react-router'

export default class NotFound extends Component {
	render () {
		return(
			<div className="container text-center">
				<h1>This is not the page you were looking for</h1>
				<hr/>
				<Link to="/">Back to Home View</Link>
			</div>
		)
	}
}