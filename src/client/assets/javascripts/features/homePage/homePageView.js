import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators as userStatusActions, selector } from './homePage'

import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import Divider from 'material-ui/Divider'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'

import HamburgerMenuIcon from 'material-ui/svg-icons/navigation/menu'
import ProfileIcon from 'material-ui/svg-icons/social/person'
import ClubIcon from 'material-ui/svg-icons/social/people'
import HelpIcon from 'material-ui/svg-icons/action/help'
import EditIcon from 'material-ui/svg-icons/image/edit'
import SignoutIcon from 'material-ui/svg-icons/action/exit-to-app'
import SaveGameIcon from 'material-ui/svg-icons/file/cloud-upload'
import RestoreGameIcon from 'material-ui/svg-icons/file/cloud-download'
import AdministrationIcon from 'material-ui/svg-icons/action/supervisor-account'
import NewGameIcon from 'material-ui/svg-icons/content/add-box'
import CloseGameIcon from 'material-ui/svg-icons/navigation/close'
import './homePageView.scss'

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
  static propTypes = {
    gameStatus: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render () {
    return (
      <div className='home-page-container'>
        <AppBar
          title={<span style={appBarStyles.title}>Dead In The Water</span>}
          iconElementLeft={
            <IconMenu
              iconButtonElement={<IconButton>
                <HamburgerMenuIcon color='white' />
              </IconButton>}
              anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            >
              <MenuItem
                primaryText='New game'
                leftIcon={<NewGameIcon />}
                onTouchTap={() => this.props.history.push('/NewGameView')}
                disabled={!this.props.gameStatus.currentUser.loggedIn}
              />
              <MenuItem
                primaryText='Save game'
                leftIcon={<SaveGameIcon />}
                onTouchTap={() => this.props.history.push('/SaveGameView')}
                disabled={!this.props.gameStatus.currentUser.loggedIn}
              />
              <Divider />
              <MenuItem
                primaryText='Load saved game'
                leftIcon={<RestoreGameIcon />}
                onTouchTap={() => this.props.history.push('/LoadGameView')}
                disabled={!this.props.gameStatus.currentUser.loggedIn}
              />
              <Divider />
              <MenuItem
                primaryText='Administration'
                leftIcon={<AdministrationIcon />}
                onTouchTap={() => this.props.history.push('/AdminView')}
                disabled={!this.props.gameStatus.currentUser.loggedIn}
              />
              <Divider />
              <MenuItem
                primaryText='Quit game'
                leftIcon={<CloseGameIcon />}
                disabled={!this.props.gameStatus.currentUser.loggedIn}
                onTouchTap={() => alert('Not implemented yet')}
              />
            </IconMenu>
          }
          iconElementRight={
            <IconMenu
              iconButtonElement={<IconButton><ProfileIcon /></IconButton>}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem
                primaryText='Edit profile'
                leftIcon={<EditIcon />}
                onTouchTap={() => this.props.history.push('/ProfileView')}
                disabled={!this.props.gameStatus.currentUser.loggedIn}
              />
              <MenuItem
                primaryText='Change current club'
                leftIcon={<ClubIcon />}
                onTouchTap={() => this.props.history.push('/ChangeClubView')}
                disabled={!this.props.gameStatus.currentUser.loggedIn}
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
                onTouchTap={() => this.props.actions.clearLoggedIn()}
                disabled={!this.props.gameStatus.currentUser.loggedIn}
              />
            </IconMenu>
          }
        />
        <div className='image'>
          <img
            className={this.props.gameStatus.currentUser.loggedIn ? 'home-page-signon-button-invisible' : 'home-page-signon-button-visible'}
            src={googleSignOnButton}
            alt='Google signin buttom'
            onTouchTap={() => this.props.actions.setLoggedIn()}
            display={this.props.gameStatus.currentUser.loggedIn ? 'none' : 'block'}
          />
        </div>
      </div>
    )
  }
}
