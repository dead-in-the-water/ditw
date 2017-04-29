import React, { Component } from 'react'
import { Link } from 'react-router'

import { Tabs, Tab } from 'material-ui/Tabs'

import PlayersTabView from './components/PlayersTabView'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  }
}

export default class AdminView extends Component {
 constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render () {
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
