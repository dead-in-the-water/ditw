import React, { Component, PropTypes } from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {_find, _without, _difference} from 'lodash'
import {SORT_KEY_BY_ID, SORT_KEY_BY_ORDINAL, SORT_KEY_BY_NAME} from '../players'

import RaisedButton from 'material-ui/RaisedButton';

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

  /* Called from onRowSelect
  ** On entry: rows is integer[] containing rows of all currently selected rows
  ** Note: There is no explicit function for row deselect, so it all has to be handled here
  */  
  _handleRowSelection(rowsSelected) {
    // Going to brute force this for now. Scan whole player table, compare passed list of 
    // rows selected and decide what needs to be added & removed
    var needToBeRemoved = []
    var needToBeAdded = []

    // Scacn whole player table
    for (var i = 0; i < this.props.players.length; i++) {
      var found = false
      // Scan rows selected list
      for (var j = 0; j < rowsSelected.length; j++) {
        // If current index to player table is found in rowsSelected
        if (i === rowsSelected[j]) {
          found = true
          // Check to see if already marked in game
          if (!this.props.players[i].inThisGame) {
            // if not, mark
            needToBeAdded.push(this.props.players[i].id)
          }
          // Don't search any further if we already found a match
          break
        }
      }
      // If current player index wasn't found in rowsSelected, see if previously marked in game
      if (!found && this.props.players[i].inThisGame) {
        // if so, needs to be removed
        needToBeRemoved.push(this.props.players[i].id)
      }
    }

    // Now execute the adds & removals
    needToBeAdded.map((id) => (this.props.actions.addPlayerToGame(id)))
    needToBeRemoved.map((id) => (this.props.actions.removePlayerFromGame(id)))
  }

  render() {

    const style = {
      margin: 12,
    };

    return (
      <Table 
        className='player-table' 
        multiSelectable={true}
        onRowSelection={(rowList) => this._handleRowSelection(rowList)}
      >
        <TableHeader 
          className='player-table-header' 
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow className='player-table-header-row'>
            <TableHeaderColumn><h1>Available Players</h1></TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn>
              <RaisedButton 
                label="By id" 
                onTouchTap={() => this.props.actions.sortPlayers(SORT_KEY_BY_ID)}
              />
            </TableHeaderColumn>
            <TableHeaderColumn>
              <RaisedButton 
                label="By ordinal" 
                secondary={true} 
                onTouchTap={() => this.props.actions.sortPlayers(SORT_KEY_BY_ORDINAL)}
              />
            </TableHeaderColumn>
            <TableHeaderColumn>
              <RaisedButton 
                label="By name" 
                primary={true} 
                onTouchTap={() => this.props.actions.sortPlayers(SORT_KEY_BY_NAME)}
              />
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody className='player-table-body' deselectOnClickaway={false}>
          {this.props.players.map((player) =>
            <TableRow key={player.id} className='player-table-row' selected={player.inThisGame ? true : false}>
              <TableRowColumn>{player.firstName + ' ' + player.lastName}</TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  }
}
