import React, { Component } from 'react'

import gameActionTable from './gameActionTable'

export default class bidEntryView extends Component {
  render () {
    return (
      <div>
        <gameActionTable
          actions={this.props.actions}
          players={this.props.gameStatus.playerRoster}
          rules={this.props.gameStatus.currentRuleSet}
          round={this.props.gameStatus.currentRound}
          tableParms={{
            title: 'Bid Entry (round ' + this.props.gameStatus.currentRound + ')',
            actionColHdr: 'Bids',
            sortOrder: this.props.gameStatus.defaultSortOrder
          }}
				/>
      </div>
    )
  }
}
