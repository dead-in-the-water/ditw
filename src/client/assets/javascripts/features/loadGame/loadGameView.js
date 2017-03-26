import React, { Component } from 'react'
import { Link } from 'react-router'

export default class LoadGameView extends Component {
  render () {
    return (
      <div className='container text-center'>
        <h1>This is where we load save games</h1>
        <Link to='HomePageView'>Back to main</Link>
      </div>
    )
  }
}
