import React, { Component, PropTypes } from 'react'

//import PlayerTableItem from '../PlayerTableItem'
import './PlayerTable.scss'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

export default class PlayerTable extends Component {
	static propTypes = {
	actions: PropTypes.object.isRequired,
	players: PropTypes.array.isRequired
	}

	_handleRowSelection(keys) {
		console.log(keys.length + ' players selected')

		keys.map((key) => (
			console.log('  Player '+ key + ' -> ' + this.props.players[key].firstName)
		))

	}

	renderList() {
		return this.props.players.map((Player, i) =>
			(
			<TableRow key={Player.id} className='player-table-row'>
				<TableRowColumn>{Player.firstName + ' ' + Player.lastName}</TableRowColumn>
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
			<TableBody className='player-table-body'>
				{this.renderList()}
			</TableBody>
			</Table>
		)
	}
}
