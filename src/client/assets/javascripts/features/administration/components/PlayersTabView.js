// react
import React, { PropTypes, Component } from 'react'

// firebase  
import { isLoaded } from 'react-redux-firebase'

// material-ui
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import RefreshIndicator from 'material-ui/RefreshIndicator'

//lodash
import sortBy from 'lodash/sortBy'
import stubArray from 'lodash/stubArray'
import stubObject from 'lodash/stubObject'
import cloneDeep from 'lodash/cloneDeep'

// project
import PlayerTable from './PlayerTable'

const style = {
  margin: 12
}

export default class PlayersTabView extends Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
    players: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      nickName: '',
      playerKey: '',
      editable: false,
      editDirty: false,
      newEntry: false,
      refreshStatus: 'hide'
    }
  }

  // TODO: Remove following eslint override
  /*eslint no-console: "off" */
  handleRowClick = (e) => {
    const playerKey = e.target.getAttribute('data-item')
    this.setState({
      firstName: this.props.players[playerKey].firstName,
      lastName: this.props.players[playerKey].lastName,
      nickName: this.props.players[playerKey].nickName,
      playerKey: playerKey,
      editable: true
    })
  }

  handleFirstNameChange = (event, newVal) => {
    this.setState({
      firstName: newVal,
      editDirty: true
    })
  }

  handleLastNameChange = (event, newVal) => {
    this.setState({
      lastName: newVal,
      editDirty: true
    })
  }

  handleNickNameChange = (event, newVal) => {
    this.setState({
      nickName: newVal,
      editDirty: true
    })
  }

  handleClearButtonTap = () => {
    this.setState({
      firstName: '',
      lastName: '',
      nickName: '',
      playerKey: null,
      editable: false,
      editDirty: false,
      newEntry: false
    })
  }

  handleNewButtonTap = () => {
    this.setState({
      firstName: '',
      lastName: '',
      nickName: '',
      playerKey: null,
      editable: true,
      editDirty: false,
      newEntry: true
    })
  }

  handleSaveButtonTap = () => {
    var workingEntry = stubObject()

    // If this is an edit of existing player object, get changes & set to firebase
    if (!this.state.newEntry) {
      workingEntry = cloneDeep(this.props.players[this.state.playerKey])
    }

    // Whether new or edited, get the new values
    workingEntry.firstName = this.state.firstName
    workingEntry.lastName = this.state.lastName
    workingEntry.nickName = this.state.nickName

    // Start the refresh indicator spinning
    this.setState({
      refreshStatus: 'loading'
    })

    if (this.state.newEntry) { // This is a new player 'record'
      this.props.firebase.push('/players', workingEntry)
        .then(() => {
          // When the push operation completes, clear the edit area
          this.setState({
            firstName: '',
            lastName: '',
            nickName: '',
            playerKey: '',
            editable: false,
            editDirty: false,
            newEntry: false,
            refreshStatus: 'hide'
          })
        })
        .catch(() => {
          console.log('ERROR: Caught error in push of new entry')
        })

    } else { // This is an update to existing player 'record'
      this.props.firebase.set('/players/' + this.state.playerKey, workingEntry)
      .then(() => {
        // When the set operation completes, clear the edit area
        this.setState({
          firstName: '',
          lastName: '',
          nickName: '',
          playerKey: '',
          editable: false,
          editDirty: false,
          refreshStatus: 'hide'
        })
      })
    }
  }

  render () {
    const { players } = this.props

    const refreshIndicatorStyle = {
      container: {
        position: 'relative',
      },
      refresh: {
        display: 'inline-block',
        position: 'relative',
      },
    }

    // Copy the firebase-generated players collection into a(n sorted) array
    var playerList = stubArray()

    if (isLoaded(players)) {
      Object.keys(players).map((key, i) => playerList.push({ ...players[key], playerKey: key }))
      playerList = sortBy(playerList, ['firstName', 'lastName'])
    } else {
      playerList = stubArray()
    }

    return (
      <div>
        <div>
          <PlayerTable players={playerList} clickHandler={this.handleRowClick} /><br/>
          <TextField 
            value={this.state.firstName} 
            hintText='first name' 
            onChange={this.handleFirstNameChange}
            disabled={!this.state.editable}
          />
          <br />
          <TextField 
            value={this.state.lastName} 
            hintText='last name' 
            onChange={this.handleLastNameChange}
            disabled={!this.state.editable}
          />
          <br />
          <TextField 
            value={this.state.nickName} 
            hintText='nickname' 
            onChange={this.handleNickNameChange}
            disabled={!this.state.editable}
          />
          <br />
          <RaisedButton
            label='Clear'
            style={style}
            secondary={false}
            disabled={!this.state.editDirty}
            onTouchTap={this.handleClearButtonTap}
          />
          <RaisedButton
            label='New'
            style={style}
            secondary
            disabled={this.state.editDirty}
            onTouchTap={this.handleNewButtonTap}
          />
          <RaisedButton
            label='Save'
            style={style}
            primary
            disabled={!this.state.editDirty}
            onTouchTap={this.handleSaveButtonTap}
          />
          <br />
        </div>
        <div>
          <RefreshIndicator
            size={36}
            left={346}
            top={519}
            style={refreshIndicatorStyle}
            status={this.state.refreshStatus}
          />
        </div>
      </div>
    )
  }
}
