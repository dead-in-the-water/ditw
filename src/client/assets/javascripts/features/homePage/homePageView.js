import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// firebase
import {
  firebaseConnect,
  pathToJS
} from 'react-redux-firebase'

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

@firebaseConnect()
@connect(
({ firebase }) => ({
    auth: pathToJS(firebase, 'auth')
}))
@connect(selector, (dispatch) => ({
  actions: bindActionCreators(userStatusActions, dispatch)
}))
export default class HomePageView extends Component {
  static propTypes = {
    gameStatus: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    firebase: PropTypes.object.isRequired,
    auth: PropTypes.object
  }

  handleLoginButtonClick () {
    this.props.firebase.login({
      provider: 'google',
      type: 'popup'
    })
    .catch((err) => window.console.log('err', err))
  }


  render () {

    const { auth, history, firebase } = this.props

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
                onTouchTap={() => history.push('/NewGameView')}
                disabled={!auth}
              />
              <MenuItem
                primaryText='Save game'
                leftIcon={<SaveGameIcon />}
                onTouchTap={() => this.props.history.push('/SaveGameView')}
                disabled={!auth}
              />
              <Divider />
              <MenuItem
                primaryText='Load saved game'
                leftIcon={<RestoreGameIcon />}
                onTouchTap={() => this.props.history.push('/LoadGameView')}
                disabled={!auth}
              />
              <Divider />
              <MenuItem
                primaryText='Administration'
                leftIcon={<AdministrationIcon />}
                onTouchTap={() => this.props.history.push('/AdminView')}
                disabled={!auth}
              />
              <Divider />
              <MenuItem
                primaryText='Quit game'
                leftIcon={<CloseGameIcon />}
                disabled={!auth}
                onTouchTap={() => window.alert('Not implemented yet')}
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
                onTouchTap={() => history.push('/ProfileView')}
                disabled={!auth}
              />
              <MenuItem
                primaryText='Change current club'
                leftIcon={<ClubIcon />}
                onTouchTap={() => history.push('/ChangeClubView')}
                disabled={!auth}
              />
              <Divider />
              <MenuItem
                primaryText='Help'
                leftIcon={<HelpIcon />}
                onTouchTap={() => history.push('/HelpView')}
              />
              <Divider />
              <MenuItem
                primaryText='Sign out'
                leftIcon={<SignoutIcon />}
                onTouchTap={() => firebase.logout()}
                disabled={!auth}
              />
            </IconMenu>
          }
        />
        <div className='image'>
          <img
            className={auth ? 'home-page-signon-button-invisible' : 'home-page-signon-button-visible'}
            src={googleSignOnButton}
            alt='Google signin buttom'
            onTouchTap={() => this.handleLoginButtonClick()}
            display={auth ? 'none' : 'block' }
          />
        </div>
      </div>
    )
  }
}
