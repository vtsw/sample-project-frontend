import React, { Suspense, lazy } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import { Grid } from '@material-ui/core'

import { getToken } from '@src/shares/utils'

import { NavBar, Loading } from '@views_components'

const Main = lazy(() => import('@views/Main'))
const Message = lazy(() => import('@views/Message'))
const User = lazy(() => import('@views/User'))
const SignIn = lazy(() => import('@views/SignIn'))
const SignUp = lazy(() => import('@views/SignUp'))

class App extends React.Component {
	componentDidMount() {
		this.onRouteChanged()
	}
	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			this.onRouteChanged()
		}
	}

	onRouteChanged() {
		const authToken = getToken()
		const { location, history } = this.props

		if (!authToken && location.pathname === '/sign-up') {
			return
		}

		if (!authToken && location.pathname !== '/sign-in') {
			history.push('/sign-in')
			return
		}
	}

	shouldRenderNavBar = () => {
		const { location } = this.props
		if (location.pathname === '/sign-in' || location.pathname === '/sign-up') {
			return null
		}
		return <NavBar />
	}

	render() {
		return (
			<Grid container wrap='nowrap'>
				{this.shouldRenderNavBar()}

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
	}
}

export default withRouter(App)
