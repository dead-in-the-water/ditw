import React, { Component, PropTypes } from 'react'

//import PlayerTableItem from '../PlayerTableItem'
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
	    <TableRow className='player-table-row'>
        <TableRowColumn>{Player.id}</TableRowColumn>
        <TableRowColumn>{Player.firstName + ' ' + Player.lastName}</TableRowColumn>
        <TableRowColumn>{Player.gamesPlayed}</TableRowColumn>
      </TableRow>
		  )
		)
  }

  render() {
		return (
		  <Table className='player-table' multiSelectable={true}>
				<TableHeader className='player-table-header' displaySelectAll={false}>
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
