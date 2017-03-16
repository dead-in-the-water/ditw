import React, { Component, PropTypes } from 'react'

import PlayerTableItem from '../PlayerTableItem'
import './PlayerTable.scss'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

export default class PlayerTable extends Component {
  static propTypes = {
	actions: PropTypes.object.isRequired,
	players: PropTypes.array.isRequired
  }

  renderList() {
		return this.props.players.map((Player, i) =>
		  (
				<PlayerTableItem
				  key={i}
				  id={Player.id}
				  name={Player.firstName + ' ' + Player.lastName}
				  gamesPlayed={Player.gamesPlayed}
				  inThisGame={Player.inThisGame}
				  {...this.props.actions} 
				/>
		  )
		)
  }

  render() {
		return (
		  <Table className='player-table'>
				<TableHeader className='player-table-header'>
				  <TableRow className='player-table-header-row'>
						<TableHeaderColumn>Player Number</TableHeaderColumn>
						<TableHeaderColumn>Name</TableHeaderColumn>
						<TableHeaderColumn>Games played</TableHeaderColumn>
				  </TableRow>
				</TableHeader>
			<TableBody className='player-table-body'>
			  {this.renderList()}
			</TableBody>
		  </Table>
		)
  }
}
