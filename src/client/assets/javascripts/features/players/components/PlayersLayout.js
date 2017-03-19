import React, { Component, PropTypes } from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

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
  ** On entry: rows is integer[] containing rows of all currently selected rows/players
  ** Note: There is no explicit function for row deselect, so it all has to be handled here
  */  
  _handleRowSelection(rows) {
    // Creates an array of ids that need to be added to game
    var needToBeAdded = rows.filter((row) => (this.props.players[row].inThisGame === false))
    // Create local array of players currently marked as inThisGame
    var currentInGamePlayers = this.props.players.filter((player) => (player.inThisGame))

    // Build array of players that are marked inThisGame but are not included in the passed rows array
    // (which means they've been deselected)
    var needToBeRemoved = []
    for (var i = 0; i < currentInGamePlayers.length; i++) {
      var found = false
      for (var j = 0; j < rows.length; j++) {
        if (currentInGamePlayers[i].id === rows[j]) {
          found = true
          break;
        }
      }
      if (!found) {
        needToBeRemoved.push(currentInGamePlayers[i])
      }
    }

    console.log('++++++ In _handleRowSelection')
    console.log('!!this.props.key: ' + !!this.props.key)
    if (needToBeAdded.length > 0) {
      console.log('  Id\'s to be added are:')
      needToBeAdded.map((row) => (console.log('    ' + row)))
    } else {
      console.log('No Id\'s to be added.')
    }

    console.log('\n')

    if (needToBeRemoved.length > 0) {
      console.log('       Id\'s to be removed are: ')
      needToBeRemoved.map((player) => (console.log('  ' + player.id)))
    } else {
      console.log('No Id\'s to be removed.')
    }


    // Now execute the adds & removals
    needToBeAdded.map((row) => (this.props.actions.addPlayerToGame(row)))
    needToBeRemoved.map((player) => (this.props.actions.removePlayerFromGame(player.id)))

    // Try to get the Table to reflect the changes

    // console.log('++++++ Trying to clean up table')
    // this.forceUpdate()
    // this.render()
    // console.log('++++++ Done trying')
    console.log('++++++ Exiting _handleRowSelection.')
  }

  render() {

    const style = {
      margin: 12,
    };

    console.log('====== In render')
    this.props.players.map((player) => (console.log('  player id: ' + player.id + ': ' + player.firstName + ', ordinal: ' + player.ordinalPosition)))
    console.log('======')

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
            <TableHeaderColumn>
              <RaisedButton 
                label="Force update" 
                primary={true} 
                style={style} 
                onTouchTap={() => this.forceUpdate()}              
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
