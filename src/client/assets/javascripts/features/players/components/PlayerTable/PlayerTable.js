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
			  lastName={Player.lastName}
			  firstName={Player.firstName}
			  avgScore={Player.avgScore}
			  avgPosition={Player.avgPosition}
			  gamesPlayed={Player.gamesPlayed}
			  inThisGame={Player.inThisGame}
			  {...this.props.actions} />
		  )
		)
  }

  render() {
		return (
		  <Table multiSelectable={true}>
				<TableHeader displaySelectAll={false}>
				  <TableRow>
						<TableHeaderColumn>Name</TableHeaderColumn>
						<TableHeaderColumn>Avg. score</TableHeaderColumn>
						<TableHeaderColumn>Games played</TableHeaderColumn>
				  </TableRow>
				</TableHeader>
			<TableBody>
			  {this.renderList()}
			</TableBody>
		  </Table>
		)
  }
}
