// react
import React, { PropTypes, Component } from 'react'

// firebase  
import { isLoaded } from 'react-redux-firebase'

// material-ui
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

//lodash
import sortBy from 'lodash/sortBy'
import stubArray from 'lodash/stubArray'
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
      editDirty: false
    }
  }

  // TODO: Remove following eslint override
  /*eslint no-console: "off" */
  handleRowClick = (e) => {
    const playerKey = e.target.getAttribute('data-item')

    console.log('In PlayersTabView.handleRowClick')
    console.log('..playerKey = \'' + playerKey + '\'')

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

  handleCancelButtonTap = () => {
    this.setState({
      firstName: '',
      lastName: '',
      nickName: '',
      playerKey: null,
      editable: false,
      editDirty: false
    })
  }

  handleNewButtonTap = () => {
    alert('Not implemented yet')
  }

  handleSaveButtonTap = () => {
    var workingEntry = cloneDeep(this.props.players[this.state.playerKey])
    workingEntry.firstName = this.state.firstName
    workingEntry.lastName = this.state.lastName
    workingEntry.nickName = this.state.nickName
    // this.props.firebase.update('/players/' + this.state.playerKey, workingEntry)

    console.log('In PlayersTabView.handleSaveButtonTap')
    console.log('..dumping workingEntry')
    console.log(workingEntry)

    this.setState({
      firstName: null,
      lastName: null,
      nickName: null,
      playerKey: null,
      editable: false,
      editDirty: false
    })
  }

  render () {
    const { players } = this.props

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
          label='Cancel'
          style={style}
          secondary={false}
          disabled={!this.state.editDirty}
          onTouchTap={this.handleCancelButtonTap}
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
      </div>
    )
  }
}
