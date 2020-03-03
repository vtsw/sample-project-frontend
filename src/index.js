import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import client from './client'

import App from './App'

const Root = () => (
	<BrowserRouter>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</BrowserRouter>
)

ReactDOM.render(<Root />, document.getElementById('root'))

if (module && module.hot) {
	module.hot.accept()
}
