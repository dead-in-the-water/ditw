import React, { PropTypes, Component } from 'react'

export default class PlayersTabView extends Component {
  static propTypes = {
    players: PropTypes.array,
    clickHandler: PropTypes.func
  }

  render () {
    const { players, clickHandler } = this.props

    return (
      <table>
        <thead>
          <tr>
            <th>
              <h1>Available Players</h1>
            </th>
          </tr>
          <tr>
            <th>
              First name
            </th>
            <th>
              Last name
            </th>
            <th>
              Nickname
            </th>
          </tr>
        </thead>
        <tbody className='player-table-body'>
          { players.map((player, i) => (
                <tr
                  key={i}
                  onClick={clickHandler}
                >
                  <td data-item={player.playerKey}>
                      { player.firstName }
                  </td>
                  <td data-item={player.playerKey}>
                      { player.lastName }
                  </td>
                  <td data-item={player.playerKey}>
                      { player.nickName }
                  </td>
                </tr>))}
        </tbody>
      </table>
    )
  }
}
