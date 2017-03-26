import React, { Component } from 'react'
import { Link } from 'react-router'

export default class AdminView extends Component {
  render () {
    return (
      <div className='container text-center'>
        <h1>Administration stuff</h1>
        <Link to='HomePageView'>Back to main</Link>
      </div>
    )
  }
}
