import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { ThemeProvider } from '@material-ui/core/styles'

import muiTheme from './theme/muiTheme'
import client from './client'

import App from './App'

import './index.scss'

const Root = () => (
	<BrowserRouter>
		<ThemeProvider theme={muiTheme}>
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>
		</ThemeProvider>
	</BrowserRouter>
)

ReactDOM.render(<Root />, document.getElementById('root'))

if (module && module.hot) {
	module.hot.accept()
}
