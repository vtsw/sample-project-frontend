import React, { Suspense, lazy, useEffect } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import { Grid } from '@material-ui/core'

import { getToken } from '@src/shares/utils'

import { NavPanel, SuspenseLoading, Loading } from '@views_components'

const Main = lazy(() => import('@views/Main'))
const Message = lazy(() => import('@views/Message'))
const User = lazy(() => import('@views/User'))
const SignIn = lazy(() => import('@views/SignIn'))
const SignUp = lazy(() => import('@views/SignUp'))
const File = lazy(() => import('@views/File'))
const Reservation = lazy(() => import('@views/Reservation'))
const Chat = lazy(() => import('@views/Chat'))
const ReservationWithoutSignin = lazy(() =>
	import('@views/ReservationWithoutSignin')
)

const App = props => {
	const { history, location } = props

	useEffect(() => {
		const authToken = getToken()

		if (!authToken && location.pathname === '/sign-up') {
			return
		}

		if (
			!authToken &&
			!['/sign-in', '/reservation-without-signin'].includes(location.pathname)
		) {
			history.push('/sign-in')
			return
		}

		if (authToken && location.pathname === '/sign-in') {
			history.push('/')
			return
		}
	})

	const fallbackOfSuspense = [
		'/sign-in',
		'/reservation-without-signin',
		'/sign-up',
	].includes(location.pathname) ? (
		<Loading open={true} msg={'Loading...'} />
	) : (
		<SuspenseLoading />
	)

	return (
		<Grid container wrap='nowrap'>
			{['/sign-in', '/reservation-without-signin', '/sign-up'].includes(
				location.pathname
			) ? null : (
				<NavPanel />
			)}

			<Suspense fallback={fallbackOfSuspense}>
				<Switch>
					<Route exact path='/' component={Main} />
					<Route path='/message' component={Message} />
					<Route path='/user' component={User} />
					<Route path='/sign-in' component={SignIn} />
					<Route path='/sign-up' component={SignUp} />
					<Route path='/file' component={File} />
					<Route path='/reservation' component={Reservation} />
					<Route path='/chat' component={Chat} />
					<Route
						path='/reservation-without-signin'
						component={ReservationWithoutSignin}
					/>
				</Switch>
			</Suspense>
		</Grid>
	)
}

export default withRouter(App)
