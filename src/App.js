import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'

import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import NavBar from '@components/NavBar'

const Main = lazy(() => import('@views/Main'))
const Message = lazy(() => import('@views/Message'))
const User = lazy(() => import('@views/User'))

const useStyles = makeStyles({
	root: {
		display: 'flex',
	},
})

const App = () => {
	const classes = useStyles()
	return (
		<Box className={classes.root}>
			<NavBar />
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					<Route exact path='/' component={Main} />
					<Route path='/message' component={Message} />
					<Route path='/user' component={User} />
				</Switch>
			</Suspense>
		</Box>
	)
}

export default App
