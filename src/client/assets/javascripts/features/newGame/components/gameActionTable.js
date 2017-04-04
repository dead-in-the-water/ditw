import React, { Component, PropTypes } from 'react'

import { NumberInput, NumberInputChangeHandler, NumberInputError, EventValue, NumberInputErrorHandler, NumberInputValidHandler, NumberInputReqestValueHandller } from 'material-ui-number-input';

import { SORT_SPECIAL_1, SORT_SPECIAL_2, INVALID_NUMERIC_VALUE } from '../../homePage/homePage'

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

    // private onKeyDown: React.KeyboardEventHandler;
    // private onChange: NumberInputChangeHandler;
    // private onError: NumberInputErrorHandler;
    // private onValid: NumberInputValidHandler;
    // private onRequestValue: NumberInputReqestValueHandller;

_onBlur = (event: React.FocusEvent): void => {
    const e: EventValue = event
    const playerIdx = e.target.getAttribute('data-item')

    if (this.props.doBidding) {
      this.props.actions.recordTricksBid(this.props.currentRoundIdx, this.props.players[playerIdx].id, parseInt(e.target.value))
    } else {
      this.props.actions.recordTricksWon(this.props.currentRoundIdx, this.props.players[playerIdx].id, parseInt(e.target.value))
    }
  }

  _onKeyDown = (event: React.KeyboardEvent): void => {
    const e: EventValue = event
    console.debug(`onKeyDown ${event.key}`)
  }

  _onChange = (event: React.FormEvent, value: string): void => {
    const e: EventValue = event
    console.debug(`  onChange ${e.target.value}, ${value}`) 

  }

  _onError = (error: NumberInputError): void => {
      let errorText: string;
      switch(error) {
          case 'required':
              errorText = 'This field is required'
              break
          case 'invalidSymbol':
              errorText = 'You are tring to enter non-numeric symbol'
              break
          case 'incompleteNumber':
              errorText = 'Number is incomplete'
              break
          case 'singleMinus':
              errorText = 'Bids must be positive'
              break
          case 'singleFloatingPoint':
              errorText = 'There is already a floating point'
              break
          case 'singleZero':
              errorText = 'Floating point is expected'
              break
          case 'min':
              errorText = 'You are tring to enter number less than 0'
              break
          case 'max':
              errorText = 'You are tring to enter number greater than ' + this.props.maxBid
              break
      }
      console.debug('In GameActionTable._onError. Error msg = \'' + errorText + '\'')
  }

  _onValid = (value: number): void => {
      console.debug(`${value} is a valid number!`)
  }

  _onRequestValue = (value: string): void => {
      console.debug(`request ${JSON.stringify(value)}`)
  }

  render() {
    
    const myErrorText = ""

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
                  <NumberInput
                      id={'record-' + ((this.props.doBidding) ? 'bid' : 'score') + '-' + this.props.currentRoundIdx + '-' + player.id}
                      required
                      min={0}
                      max={this.props.maxBid}
                      strategy="warn"
                      errorText={myErrorText}
                      onError={this._onError}
                      onValid={this._onValid}
                      onRequestValue={this._onRequestValue}
                      onChange={this._onChange}
                      onKeyDown={this._onKeyDown} 
                      autoFocus={ (i === 0) ? true : false}
                      hintText={'0 - ' + this.props.maxBid + ' tricks'}
                      defaultValue={ (this.props.doBidding ?
                        validOrZero(this.props.currentRound.results[i].tricksBid) :
                        validOrZero(this.props.currentRound.results[i].tricksWon))}
                      data-item={i}
                      onBlur={this._onBlur}
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
