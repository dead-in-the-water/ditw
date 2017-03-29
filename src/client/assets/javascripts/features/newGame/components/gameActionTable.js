import React, { Component } from 'react'
import TextField from 'material-ui/TextField'

class gameActionTable extends Component {
/*	static propTypes = {
		actions: PropTypes.object.isRequired,
		players: PropTypes.array.isRequired,
		rules: PropTypes.object.isRequired,
		tableParms: PropTypes.object.isRequired,
		round: PropTypes.number.isRequired
	}
*/
  _handleBidChange () {
    console.log('@@@@@@ Entered gameActionTable._handleBidChange')
  }

  render () {
    <table className='game-action-table'>
      <thead className='game-action-table-header'>
        <tr className='game-action-table-super-header-row'>
          <th className='game-action-table-super-header-cell'>
            <h1>{tableParms.title}</h1>
          </th>
        </tr>
        <tr className='game-action-table-header-row'>
          <th className='game-action-table-header-cell-left'>Player</th>
          <th className='game-action-table-header-cell'>{tableParms.actionColHdr}</th>
        </tr>
      </thead>
      <tbody className='game-action-table-body'>
        { players.map((player, i) =>
						(
  <tr key={i} data-item={i} className='game-action-table-data-row'>
    <td className='game-action-table-name-cell'>{
										(tableParms.sortOrder === SORT_SPECIAL_1)
											? player.firstName + ' ' + player.lastName
											: player.nickName
									}
    </td>
    <td className='game-action-table-bid-cell'>
      <TextField
        hintText={tableParms.actionColHdr + ': 0 - ' + round.handSize}
        onChange={() => this._handleBidChange()}
									/>
    </td>
  </tr>
						)
					)
				}
      </tbody>
    </table>
  }
}
