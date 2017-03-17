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

  _handleRowSelection(keys) {
    // TODO: Convert to method chaining
    // brute force!
    // Go thru full player list
    for (var i = 0; i < this.props.players.length; i++) {
      // If current player id isn't in list of selected rows
      if (keys.indexOf(i) === -1) {
        // AND was previously selected
        if (this.props.players[i].inThisGame) {
          // Remove it from game
          this.props.actions.removePlayerFromGame(i)
        }
      }
      // The id = i IS in the list of selected players in Table
      else {
        // AND it wasn't already flagged as in the game
        if (!this.props.players[i].inThisGame) {
          // Flag it now
          this.props.actions.addPlayerToGame(i)
        }
      }
    }
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
