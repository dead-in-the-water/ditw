import React, { Component, PropTypes } from 'react'

import BidWonEditor from './BidWonEditorSelectField'
// import BidWonEditor from './BidWonEditorNumericInput'
import { SORT_SPECIAL_1, INVALID_NUMERIC_VALUE } from '../../homePage/homePage'

export default class GameActionTable extends Component {
  static propTypes = {
    players: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    sortOrder: PropTypes.number.isRequired,
    currentRoundIdx: PropTypes.number.isRequired,
    currentRound: PropTypes.object.isRequired,
    maxBid: PropTypes.number.isRequired,
    doBidding: PropTypes.bool,
    doScoring: PropTypes.bool
  }

  render () {
    const validOrZero = (numericVal) => ((numericVal === INVALID_NUMERIC_VALUE) ? 0 : numericVal)

    return (
      <table className='game-action-table'>
        <thead className='game-action-table-header'>
          <tr className='game-action-table-header-row'>
            <th className='game-action-table-header-cell-left'>Player</th>
            <th className='game-action-table-header-cell'>{ ((this.props.doBidding) ? 'Bidding' : 'Scoring') }</th>
          </tr>
        </thead>
        <tbody className='game-action-table-body'>
          { this.props.players.filter((player) => player.inThisGame).map((player, i) =>
              (
              <tr key={i} className='game-action-table-data-row'>
                <td className='game-action-table-name-cell'>{
                                                        ((this.props.sortOrder === SORT_SPECIAL_1)
                                                          ? player.firstName + ' ' + player.lastName
                                                          : player.nickName)
                                                      }
                </td>
                <td className='game-action-table-bid-cell'>
                  <BidWonEditor
                      componentId={ 'record-' + ((this.props.doBidding) ? 'bid' : 'score') + '-' + this.props.currentRoundIdx + '-' + player.id }
                      minEntry={ 0 }
                      maxEntry={ this.props.maxBid }
                      defaultEntry={ validOrZero(this.props.currentRound.results[i].tricksBid) }
                      player={ player }
                      playerIdx={ i }
                      currentRound={this.props.currentRound}
                      currentRoundIdx={ this.props.currentRoundIdx }
                      actions={ this.props.actions }
                      doBidding={ this.props.doBidding }
                      doScoring={ this.props.doScoring }
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
