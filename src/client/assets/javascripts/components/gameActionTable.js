
class gameActionTable extends Component {
  render () {
    <table className='game-table'>
      <thead className='game-table-header'>
        <tr className='game-table-super-header-row'>
          <th className='game-table-super-header-cell'>
            <h1>New Game Setup</h1>
          </th>
        </tr>
        <tr className='game-table-header-row'>
          <th className='text-center'>Role</th>
          <th className='game-table-header-cell-left'>Player</th>
          <th className='game-table-header-cell'>Bid</th>
          <th className='game-table-header-cell'>Won</th>
          <th className='game-table-header-cell'>Score</th>
        </tr>
      </thead>
      <tbody className='game-table-body'>
        { this.props.gameStatus.playerRoster.filter((player) => player.inThisGame).map((player, i) =>
						(
  <tr key={i} data-item={i} className='game-table-data-row'>
    <td className='game-table-icon-cell'>
      {(player.id === this.props.gameStatus.currentDealer) ? <img src={dealerIcon} height='36px' width='auto' /> : ''}
      {(player.id === this.props.gameStatus.currentBidder) ? <img src={bidderIcon} height='36px' width='auto' /> : '' }
    </td>
    <td className='game-table-name-cell'>{player.firstName + ' ' + player.lastName}</td>
    <td className='game-table-bid-cell'>0</td>
    <td className='game-table-won-cell'>0</td>
    <td className='game-table-score-cell'>0</td>
  </tr>
							)
						)
				}
      </tbody>
    </table>
  }
}
