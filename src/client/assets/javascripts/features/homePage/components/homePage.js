import React, { Component } from 'react'
import { Link } from 'react-router'

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Download from 'material-ui/svg-icons/file/file-download';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import HamburgerMenuIcon from 'material-ui/svg-icons/navigation/menu';
import ProfileIcon from 'material-ui/svg-icons/social/person';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import './homePage.scss';

export default class HomePageView extends Component {

  render() {
	return (
		<div className='homePageMainDiv'>
			<div className='homePageMenu'>
				<IconMenu
					iconButtonElement={<IconButton><HamburgerMenuIcon /></IconButton>}
					anchorOrigin={{horizontal: 'left', vertical: 'top'}}
					targetOrigin={{horizontal: 'left', vertical: 'top'}}
				>
				<MenuItem
				  primaryText="New game"
				/>
				<MenuItem
				  primaryText="Restore game"
				/>
				<Divider />
				<MenuItem
				  primaryText="Clubs"
				  rightIcon={<ArrowDropRight />}
				  menuItems={[
					<MenuItem primaryText="Change current club" />,
					<Divider />,
					<MenuItem primaryText="Manage clubs" />,
					]}
				/>
				</IconMenu>

				<div className='rightFloater'>
					<IconMenu
						iconButtonElement={<IconButton><ProfileIcon /></IconButton>}
						anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
						targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
					>
						<MenuItem primaryText="Edit profile" />
						<Divider />
						<MenuItem primaryText="Sign out" />
					</IconMenu>
				</div>
				<br />
			</div>

			<div className='bottomAbsolute'>
				<br />
				<h1>This is one of the newest home page</h1>
				<ul>
					<li><Link to="ProfileView">Edit profile</Link></li>
					<li><Link to="PlayersView">Edit players</Link></li>
					<li><Link to="NewGameView">New game</Link></li>
					<li><Link to="SignOnPage">Sign out</Link></li>
				</ul>
			</div>
		</div>
	);
  }
}
