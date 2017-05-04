// react-redux stuff
import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

// firebase
import {
  firebaseConnect,
  isLoaded,
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
    players: PropTypes.object,
    clubs: PropTypes.object
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

// TODO: Remove this eslint override 
  render () {
    const { firebase, players } = this.props

    return (
      <div className='container text-center'>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
        >
          <Tab label='Players' value='a'>
            {isLoaded(players) 
              ? <PlayersTabView firebase={firebase} players={players}/>
              : <p>loading...</p>
            }
          </Tab>
          <Tab label='Clubs' value='b'>
            <div>
              <h2 style={styles.headline}>Controllable Tab B</h2>
              <p>
                Not yet implemented.
              </p>
            </div>
          </Tab>
          <Tab label='Rules' value='c'>
            <div>
              <h2 style={styles.headline}>Controllable Tab C</h2>
              <p>
                Not yet implemented.
              </p>
            </div>
          </Tab>
        </Tabs>
        <Link to='HomePageView'>Back to main</Link>
      </div>
    )
  }
}
