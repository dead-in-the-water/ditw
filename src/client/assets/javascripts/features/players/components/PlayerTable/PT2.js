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

renderList1() {
	return (
		  <TableRow>
		    <TableRowColumn>1</TableRowColumn>
		    <TableRowColumn>John Adams</TableRowColumn>
		    <TableRowColumn>3</TableRowColumn>
		  </TableRow>
	)
}

renderList2() {
	return (
		  <TableRow>
		    <TableRowColumn>2</TableRowColumn>
		    <TableRowColumn>Thomas Jefferson</TableRowColumn>
		    <TableRowColumn>300</TableRowColumn>
		  </TableRow>
	)
}

renderList3() {
	return (this.renderList1() + this.renderList2())
}

renderList4() {
	return (
			<div>
			  <TableRow>
			    <TableRowColumn>1</TableRowColumn>
			    <TableRowColumn>John Adams</TableRowColumn>
			    <TableRowColumn>3</TableRowColumn>
			  </TableRow>
			  <TableRow>
			    <TableRowColumn>2</TableRowColumn>
			    <TableRowColumn>Thomas Jefferson</TableRowColumn>
			    <TableRowColumn>300</TableRowColumn>
			  </TableRow>
		  </div>
	)
}

renderList5() {
	return (
				<PlayerTableItem
				  key='0'
				  id='1'
				  name='Benjamin Franklin'
				  gamesPlayed='122'
				  inThisGame='false'
				  {...this.props.actions} 
				/>
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
			  {this.renderList4()}
			</TableBody>
		  </Table>
		)
  }
}
