import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import { Grid } from '@material-ui/core'

import { getToken } from '@src/shares/utils'

import { NavBar, Loading } from '@views_components'

const Main = lazy(() => import('@views/Main'))
const Message = lazy(() => import('@views/Message'))
const User = lazy(() => import('@views/User'))
const SignIn = lazy(() => import('@views/SignIn'))
const SignUp = lazy(() => import('@views/SignUp'))

const App = props => {
	console.log(props)
	const { history, location, match, staticContext } = props

	useEffect(() => {
		const authToken = getToken()

		if (!authToken && location.pathname === '/sign-up') {
			return
		}

		if (!authToken && location.pathname !== '/sign-in') {
			history.push('/sign-in')
			return
		}
	})

	return (
		<Grid container wrap='nowrap'>
			{location.pathname === '/sign-in' ||
			location.pathname === '/sign-up' ? null : (
				<NavBar />
			)}

			<Suspense fallback={<Loading open={true} msg={'Loading...'} />}>
				<Switch>
					<Route exact path='/' component={Main} />
					<Route path='/message' component={Message} />
					<Route path='/user' component={User} />
					<Route path='/sign-in' component={SignIn} />
					<Route path='/sign-up' component={SignUp} />
				</Switch>
			</Suspense>
		</Grid>
	)
	// }
}

export default withRouter(App)
