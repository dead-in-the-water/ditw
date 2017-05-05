import React, { PropTypes, Component } from 'react'

import './PlayerTable.scss'

export default class PlayersTabView extends Component {
  static propTypes = {
    players: PropTypes.array,
    clickHandler: PropTypes.func
  }

  render () {
    const { players, clickHandler } = this.props

    return (
      <div className="box-container-table">
        <div  className="container-table">
          <table  className="table-scroll">
            <thead>
              <tr>
                <th>
                  <div>First name</div>
                </th>
                <th>
                  <div>Last name</div>
                </th>
                <th>
                  <div>Nickname</div>
                </th>
              </tr>
            </thead>
            <tbody>
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
        </div>
      </div>
    )
  }
}
