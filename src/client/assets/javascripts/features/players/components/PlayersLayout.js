import React, { Component, PropTypes } from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

//import AddPlayerInput from './AddPlayerInput'
//import PlayerTable from './PlayerTable'
//import './PlayerTableApp.scss'

export default class PlayersLayout extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    players: PropTypes.object.isRequired
  }

  render() {
    const { players: { playersById }, actions } = this.props

    return (
      <div className='container text-center'>
        <PlayerTable players={playersById} actions={actions} />
      </div>
    ) 
  }
}

class PlayerTable extends Component {
  static propTypes = {
  actions: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired
  }

  // Called from onRowSelect
  // On entry: keys is integer[] containing keys of all currently selected rows/players
  // Note: There is no explicit function for row deselect, so it all has to be handled
  // here
  _handleRowSelection(keys) {
    // Creates an array of ids that need to be added to game
    var needToBeAdded = keys.filter((key) => (this.props.players[key].inThisGame === false))
    // Create local array of players currently marked as inThisGame
    var currentInGamePlayers = this.props.players.filter((player) => (player.inThisGame))

    // Build array of players that are marked inThisGame but are not included in the passed keys array
    // (which means they've been deselected
    var needToBeRemoved = []
    for (var i = 0; i < currentInGamePlayers.length; i++) {
      var found = false
      for (var j = 0; j < keys.length; j++) {
        if (currentInGamePlayers[i].id === keys[j]) {
          found = true
          break;
        }
      }
      if (!found) {
        needToBeRemoved.push(currentInGamePlayers[i])
      }
    }

    // Now execute the adds & removals
    needToBeAdded.map((key) => (this.props.actions.addPlayerToGame(key)))
    needToBeRemoved.map((player) => (this.props.actions.removePlayerFromGame(player.id)))
  }

  renderList() {
    return this.props.players.map((player) =>
      (
      <TableRow key={player.id} className='player-table-row' selected={player.inThisGame ? true : false}>
        <TableRowColumn>{player.firstName + ' ' + player.lastName}</TableRowColumn>
      </TableRow>
      )
    )
  }

  render() {
    return (
      <Table 
        className='player-table' 
        multiSelectable={true}
        onRowSelection={(key) => this._handleRowSelection(key)}
      >
        <TableHeader 
          className='player-table-header' 
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow className='player-table-header-row'>
            <TableHeaderColumn><h1>Available Players</h1></TableHeaderColumn>
          </TableRow>
        </TableHeader>
      <TableBody className='player-table-body' deselectOnClickaway={false}>
        {this.renderList()}
      </TableBody>
      </Table>
    )
  }
}
