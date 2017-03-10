import React, { Component } from 'react'
import { Link } from 'react-router'

import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

import HamburgerMenuIcon from 'material-ui/svg-icons/navigation/menu';
import ProfileIcon from 'material-ui/svg-icons/social/person';
import ClubIcon from 'material-ui/svg-icons/social/people';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import HelpIcon from 'material-ui/svg-icons/action/help';
import EditIcon from 'material-ui/svg-icons/image/edit';
import SignoutIcon from 'material-ui/svg-icons/action/exit-to-app';
import SaveGameIcon from 'material-ui/svg-icons/file/cloud-upload';
import RestoreGameIcon from 'material-ui/svg-icons/file/cloud-download';
import AdministrationIcon from 'material-ui/svg-icons/action/supervisor-account';
import NewGameIcon from 'material-ui/svg-icons/content/add-box';

import './homePage.scss';

import imgDeadInTheWater from '../images/dead-in-the-water.jpg'

/*function _handleTouchTap() {
	alert('onTouchTap triggered on the title component');
}*/

const styles = {
	title: {
		cursor: 'pointer',
	}
};

const MNU_NEW_GAME = 1;
const MNU_SAVE_GAME = 2;
const MNU_LOAD_GAME = 3;
const MNU_ADMIN = 4;
const MNU_EDIT_PROFILE = 5;
const MNU_CHG_CLUB = 6;
const MNU_HELP = 7;
const MNU_SIGNOUT = 8;


export default class HomePageView extends Component {

	_handleTouchTap(menuCode) {
		switch (menuCode) {
			case MNU_NEW_GAME: {
				console.log("  New game is requested");
				return;
			}
			case MNU_SAVE_GAME: {
				console.log("  Save game requested");
				return;
			}
			case MNU_LOAD_GAME: {
				console.log("  Load game requested");
				return;
			}
			case MNU_ADMIN: {
				console.log("  Administration requested");
				return;
			}
			case MNU_EDIT_PROFILE: {
				console.log("  Profile editing requested");
				return;
			}
			case MNU_CHG_CLUB: {
				console.log("  Club change requested");
				return;
			}
			case MNU_HELP: {
				console.log("  Help requested");
				return;
			}
			case MNU_SIGNOUT: {
				console.log("  Sign out requested");
				return;
			}
			default: {
				console.log("  Don't know what that was!")
			}
		}
	}

	render() {
		return (
			<div className="homePageContainer">
				<AppBar
					title={<span style={styles.title}>Dead In The Water</span>}
					iconElementLeft={
						<IconMenu
							iconButtonElement={<IconButton><HamburgerMenuIcon /></IconButton>}
							anchorOrigin={{horizontal: 'left', vertical: 'top'}}
							targetOrigin={{horizontal: 'left', vertical: 'top'}}
						>
							<MenuItem 
								primaryText="New game" 
								leftIcon={<NewGameIcon />} 
								onTouchTap={() => this._handleTouchTap(MNU_NEW_GAME)}
							/>
							<MenuItem 
								primaryText="Save game" 
								leftIcon={<SaveGameIcon />} 
								onTouchTap={() => this._handleTouchTap(MNU_SAVE_GAME)}
							/>
							<Divider />
							<MenuItem 
								primaryText="Load saved game" 
								leftIcon={<RestoreGameIcon />} 
								onTouchTap={() => this._handleTouchTap(MNU_LOAD_GAME)}
							/>
							<Divider />
							<MenuItem 
								primaryText="Administration" 
								leftIcon={<AdministrationIcon />}
								onTouchTap={() => this._handleTouchTap(MNU_ADMIN)}
							/>
						</IconMenu>
					}
					iconElementRight={
						<IconMenu
							iconButtonElement={<IconButton><ProfileIcon /></IconButton>}
							anchorOrigin={{horizontal: 'right', vertical: 'top'}}
							targetOrigin={{horizontal: 'right', vertical: 'top'}}
						>
							<MenuItem 
								primaryText="Edit profile" 
								leftIcon={<EditIcon />}
								onTouchTap={() => this._handleTouchTap(MNU_EDIT_PROFILE)}
							/>
							<MenuItem 
								primaryText="Change current club"
								leftIcon={<ClubIcon />}
								onTouchTap={() => this._handleTouchTap(MNU_CHG_CLUB)}
							/>
							<Divider />
							<MenuItem 
								primaryText="Help" 
								leftIcon={<HelpIcon />}
								onTouchTap={() => this._handleTouchTap(MNU_HELP)}
							/>
							<Divider />
							<MenuItem 
								primaryText="Sign out" 
								leftIcon={<SignoutIcon />}
								onTouchTap={() => this._handleTouchTap(MNU_SIGNOUT)}
							/>
						</IconMenu>
					}
				/>
				<div className='homePageContainer'>
					<img src={imgDeadInTheWater} 
						alt="Supposed to be picture of sinking ship" 
						width="500px"
					/>
				</div>
			</div>
		);
	}
}
