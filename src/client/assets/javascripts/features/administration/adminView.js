// react-redux stuff
import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

// firebase
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS
} from 'react-redux-firebase'

// material-ui
import { Tabs, Tab } from 'material-ui/Tabs'

// project includes
import PlayersTabView from './components/PlayersTabView'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  }
}

@firebaseConnect([
  '/players',
  '/clubs'
])
@connect(
  ({ firebase }) => ({
    // Connect todos prop to firebase todos
    players: dataToJS(firebase, '/players'),
    clubs: dataToJS(firebase, '/clubs')
  })
)
export default class AdminView extends Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
    players: PropTypes.object.isRequired,
    clubs: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      value: 'a'
    }
  }

  handleChange = (value) => {
    this.setState({
      value: value
    })
  }

/* eslint no-console: "off" */
  render () {
    console.log('In AdminView.render(), dumping this')
    console.log(this)

    const { firebase, players, clubs } = this.props
    
    const playersList = !isLoaded(players)
      ? 'Loading'
      : isEmpty(players)
        ? 'Players list is empty'
        : Object.keys(players).map(
            (key, id) => (
              <li key={key} id={id} todo={players[key]} />
            )
          )

    console.log('..dumping playersList')
    console.log(playersList)

    return (
      <div className='container text-center'>
        <h1>Administration stuff</h1>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
        >
          <Tab label='Players' value='a'>
            <PlayersTabView />
          </Tab>
          <Tab label='Clubs' value='b'>
            <div>
              <h2 style={styles.headline}>Controllable Tab B</h2>
              <p>
                This is another example of a controllable tab. Remember, if you
                use controllable Tabs, you need to give all of your tabs values or else
                you wont be able to select them.
              </p>
            </div>
          </Tab>
        </Tabs>
        <Link to='HomePageView'>Back to main</Link>
      </div>
    )
  }
}
