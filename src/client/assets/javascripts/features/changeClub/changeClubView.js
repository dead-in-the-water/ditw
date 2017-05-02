import Component from 'react'
import { Link } from 'react-router'

export default class changeClubView extends Component {
  render () {
    return (
      <div className='container text-center'>
        <h1>Stuff to change current club</h1>
        <Link to='HomePageView'>Back to main</Link>
      </div>
    )
  }
}
