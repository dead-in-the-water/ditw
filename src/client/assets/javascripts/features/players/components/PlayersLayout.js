import React, { Component, PropTypes } from 'react'
import {_find, _without, _difference} from 'lodash'
import {SORT_BY_ID, SORT_BY_ORDINAL, SORT_BY_FNAME, INVALID_ORDINAL_POSITION} from '../../homePage/homePage'

import RaisedButton from 'material-ui/RaisedButton';

import './PlayerTableApp.scss'

export default class PlayersLayout extends Component {
	static propTypes = {
		actions: PropTypes.object.isRequired,
		gameStatus: PropTypes.object.isRequired
	}

	render() {
		return (
			<div className='container text-center'>
				<PlayerTable players={this.props.gameStatus.playerRoster} actions={this.props.actions} rules={this.props.gameStatus.currentRuleSet} />
			</div>
		) 
	}
}

class PlayerTable extends Component {
	static propTypes = {
		actions: PropTypes.object.isRequired,
		players: PropTypes.array.isRequired
	}

	_handleClick = (e) => {

			const row = e.target.getAttribute('data-item')

			if (!this.props.players[row].inThisGame) {
				if (this.props.players.filter((player) => player.inThisGame).length < this.props.rules.maxPlayers) {
					this.props.actions.addPlayerToGame(this.props.players[row].id)
				} else {
					// If we have too many players, don't process
					alert('Too many players! (max = ' + this.props.rules.maxPlayers + ')\n\nDeselect one or more players before adding more.')
				}
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
					<tr className='player-table-super-header-row'>
						<th className='player-table-super-header-cell'>
							<h1>Available Players</h1>
						</th>
					</tr>
					<tr className='player-table-header-row'>
						<th className='player-table-header-cell'>
							Name
						</th>
						<th className='player-table-header-cell'>
							Position
						</th>
					</tr>
				</thead>
				<tbody className='player-table-body'>
					{this.props.players.map((player, i) => (
								<tr 
									key={player.id} 
									className='player-table-body-row' 
									onClick={this._handleClick}
								>
									<td data-item={i} 
										className={ ((player.inThisGame) ? 
																		'selected-player-cell' : 
																		'non-selected-player-cell') +
																	' player-table-name-cell'
										} 
									>
											{ player.firstName + ' ' + player.lastName }
									</td>
									<td data-item={i} 
										className={ ((player.inThisGame) ? 
																		'selected-player-cell' : 
																		'non-selected-player-cell') +
																	' player-table-position-cell'
										} 
									>
											{ (player.ordinalPosition !== INVALID_ORDINAL_POSITION ? (player.ordinalPosition + 1 )  : '') }
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
