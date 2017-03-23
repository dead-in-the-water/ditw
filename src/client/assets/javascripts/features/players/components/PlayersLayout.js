import React, { Component, PropTypes } from 'react'
import {_find, _without, _difference} from 'lodash'
import {SORT_KEY_BY_ID, SORT_KEY_BY_ORDINAL, SORT_KEY_BY_NAME, INVALID_ORDINAL_POSITION} from '../players'

import RaisedButton from 'material-ui/RaisedButton';

import './PlayerTableApp.scss'

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

	_handleClick = (e) => {
		const row = e.target.getAttribute('data-item')

		if (!this.props.players[row].inThisGame) {
			this.props.actions.addPlayerToGame(this.props.players[row].id)
		} else {
			this.props.actions.removePlayerFromGame(this.props.players[row].id)
		}
	}

	render() {

		const style = {
			margin: 12,
		};

		return (
			<table>
				<thead className='player-table-header'>
					<tr className='player-table-header-row'>
						<th className='player-table-header-col'>
							<h1>Available Players</h1>
						</th>
					</tr>
				</thead>
				<tbody className='player-table-body'>
					{this.props.players.map((player, i) => (
								<tr key={player.id} className='player-table-body-row' onClick={this._handleClick}>
									<td data-item={i} className={ (player.inThisGame) ? 'selected-player-row' : 'non-selected-player-row' }>
											{ player.firstName + ' ' + player.lastName + (player.ordinalPosition !== INVALID_ORDINAL_POSITION ? ' (' + (player.ordinalPosition + 1 ) + ')' : '') }
									</td>
								</tr>
							)
						)
					}
				</tbody>
			</table>
		)
	}
}
