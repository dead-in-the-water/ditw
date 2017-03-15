import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators as userStatusActions, selector } from './homePage';

import { Link } from 'react-router'
import { Navigation } from 'react-router'

import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import Divider from 'material-ui/Divider'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'

import HamburgerMenuIcon from 'material-ui/svg-icons/navigation/menu'
import ProfileIcon from 'material-ui/svg-icons/social/person'
import ClubIcon from 'material-ui/svg-icons/social/people'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import HelpIcon from 'material-ui/svg-icons/action/help'
import EditIcon from 'material-ui/svg-icons/image/edit'
import SignoutIcon from 'material-ui/svg-icons/action/exit-to-app'
import SaveGameIcon from 'material-ui/svg-icons/file/cloud-upload'
import RestoreGameIcon from 'material-ui/svg-icons/file/cloud-download'
import AdministrationIcon from 'material-ui/svg-icons/action/supervisor-account'
import NewGameIcon from 'material-ui/svg-icons/content/add-box'
import './homePageView.scss'

import imgDeadInTheWater from './images/dead-in-the-water.jpg'
import googleSignOnButton from './images/btn_google_signin_dark_pressed_web.png'

const appBarStyles = {
  title: {
    cursor: 'pointer'
  }
}

@connect(selector, (dispatch) => ({
  actions: bindActionCreators(userStatusActions, dispatch)
}))
export default class HomePageView extends Component {
  
/*  static propTypes = {
    setLoggedIn: PropTypes.func.isRequired,
    clearLoggedIn: PropTypes.func.isRequired,
  }
*/
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: false
    }
  }

  render () {
  	console.log('this.props.actions:' + this.props.actions)

    return (
      <div className='home-page-container'>
        <AppBar
          title={<span style={appBarStyles.title}>Dead In The Water</span>}
          iconElementLeft={
            <IconMenu
              iconButtonElement={<IconButton>
                <HamburgerMenuIcon color='white' />
              </IconButton>}
              anchorOrigin={{horizontal: 'left', vertical: 'top'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
						>
              <MenuItem
                primaryText='New game'
                leftIcon={<NewGameIcon />}
                disabled={!this.state.loggedIn}
                onTouchTap={() => this.props.history.push('/NewGameView')}
							/>
              <MenuItem
                primaryText='Save game'
                leftIcon={<SaveGameIcon />}
                disabled={!this.state.loggedIn}
                onTouchTap={() => this.props.history.push('/SaveGameView')}
							/>
              <Divider />
              <MenuItem
                primaryText='Load saved game'
                leftIcon={<RestoreGameIcon />}
                disabled={!this.state.loggedIn}
                onTouchTap={() => this.props.history.push('/LoadGameView')}
							/>
              <Divider />
              <MenuItem
                primaryText='Administration'
                leftIcon={<AdministrationIcon />}
                disabled={!this.state.loggedIn}
                onTouchTap={() => this.props.history.push('/AdminView')}
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
                primaryText='Edit profile'
                leftIcon={<EditIcon />}
                disabled={!this.state.loggedIn}
                onTouchTap={() => this.props.history.push('/ProfileView')}
							/>
              <MenuItem
                primaryText='Change current club'
                leftIcon={<ClubIcon />}
                disabled={!this.state.loggedIn}
                onTouchTap={() => this.props.history.push('/ChangeClubView')}
							/>
              <Divider />
              <MenuItem
                primaryText='Help'
                leftIcon={<HelpIcon />}
                onTouchTap={() => this.props.history.push('/HelpView')}
							/>
              <Divider />
              <MenuItem
                primaryText='Sign out'
                leftIcon={<SignoutIcon />}
                disabled={!this.state.loggedIn}
                onTouchTap={() => this.props.history.push('/SignOutView')}
							/>
            </IconMenu>
					}
				/>
        <div className='image'>
          <img className='home-page-signon-button'
            src={googleSignOnButton}
            alt='Google signin buttom'
            onTouchTap={() => this.props.setLoggedIn()}
					/>
        </div>
      </div>
    )
  }
}