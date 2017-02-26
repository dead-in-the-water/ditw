import React, { PropTypes } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const App = (props) => (
	<MuiThemeProvider>
	 	<div className="page-container">
	    {React.cloneElement({...props}.children, {...props})}
	  </div>
	</MuiThemeProvider>
)

App.propTypes = {
  children: PropTypes.element.isRequired
}

export default App
