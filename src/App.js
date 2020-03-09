import React, { Suspense, lazy } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { NavBar } from '@components'

const Main = lazy(() => import('@views/Main'))
const Message = lazy(() => import('@views/Message'))
const User = lazy(() => import('@views/User'))
const SignIn = lazy(() => import('@views/SignIn'))
const SignUp = lazy(() => import('@views/SignUp'))

const useStyles = makeStyles({
	root: {
		display: 'flex',
	},
})

const App = ({ location }) => {
	const classes = useStyles()
	const shouldRenderNavBar = () => {
		if (location.pathname === '/sign-in' || location.pathname === '/sign-up') {
			return null
		}
		return <NavBar />
	}
	return (
		<Box className={classes.root}>
			{shouldRenderNavBar()}

			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					<Route exact path='/' component={Main} />
					<Route path='/message' component={Message} />
					<Route path='/user' component={User} />
					<Route path='/sign-in' component={SignIn} />
					<Route path='/sign-up' component={SignUp} />
				</Switch>
			</Suspense>
		</Box>
	)
}

export default withRouter(App)
