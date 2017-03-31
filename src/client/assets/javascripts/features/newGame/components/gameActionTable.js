import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField'

export default class GameActionTable extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    players: PropTypes.array.isRequired,
    rules: PropTypes.object.isRequired,
    tableParms: PropTypes.object.isRequired,
    round: PropTypes.number.isRequired
  }

  _handleBidChange () {
    console.log('@@@@@@ Entered GameActionTable._handleBidChange')
  }

  render () {
    console.log('>>>>>> In GameActionTable.render, about to dump props')
    console.log(props)

    return (
      <table className='game-action-table'>
        <thead className='game-action-table-header'>
          <tr className='game-action-table-super-header-row'>
            <th className='game-action-table-super-header-cell'>
              <h1>{props.title}</h1>
            </th>
          </tr>
          <tr className='game-action-table-header-row'>
            <th className='game-action-table-header-cell-left'>Player</th>
            <th className='game-action-table-header-cell'>Bid</th>
          </tr>
        </thead>
        <tbody className='game-action-table-body'>
          { props.playersRoster.map((player, i) =>
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
    )
  }
}
