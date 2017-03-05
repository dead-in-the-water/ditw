import React, { Component } from 'react'
import { Link } from 'react-router'

export default class HomePageView extends Component {
	render () {
		return(
			<div className="container text-center">
				<h1>This is the new home page</h1>
				<ul>
					<li><Link to="ProfileView">Edit profile</Link></li>
					<li><Link to="PlayersView">Edit players</Link></li>
				</ul>
			</div>
		)
	}
}