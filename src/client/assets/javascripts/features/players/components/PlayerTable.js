import React, { Component, PropTypes } from 'react'

import { SORT_SPECIAL_1, INVALID_NUMERIC_VALUE } from '../../homePage/homePage'

export default class PlayerTable extends Component {
	static propTypes = {
		actions: PropTypes.object.isRequired,
		players: PropTypes.array.isRequired,
		rules: PropTypes.object.isRequired,
		sortOrder: PropTypes.number.isRequired
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
																	' player-table-name-cell' } 
									>
											{ (this.props.sortOrder === SORT_SPECIAL_1) ? player.firstName + ' ' + player.lastName : player.nickName }
									</td>
									<td data-item={i} 
										className={ ((player.inThisGame) ? 
																		'selected-player-cell' : 
																		'non-selected-player-cell') +
																	' player-table-position-cell' } 
									>
											{ (player.ordinalPosition !== INVALID_NUMERIC_VALUE ? (player.ordinalPosition + 1 )  : '') }
									</td>
								</tr>))}
				</tbody>
			</table>)}}
