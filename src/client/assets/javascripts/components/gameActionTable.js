
class gameActionTable extends Component {
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
        { .map((player, i) =>
						(
  <tr key={i} data-item={i} className='game-action-table-data-row'>
    <td className='game-action-table-icon-cell'>
      {(player.id === this.props.gameStatus.currentDealer) ? <img src={dealerIcon} height='36px' width='auto' /> : ''}
      {(player.id === this.props.gameStatus.currentBidder) ? <img src={bidderIcon} height='36px' width='auto' /> : '' }
    </td>
    <td className='game-action-table-name-cell'>{player.firstName + ' ' + player.lastName}</td>
    <td className='game-action-table-bid-cell'>0</td>
    <td className='game-action-table-won-cell'>0</td>
    <td className='game-action-table-score-cell'>0</td>
  </tr>
							)
						)
				}
      </tbody>
    </table>
  }
}
