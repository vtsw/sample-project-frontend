import React, { Suspense, lazy } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import { Box } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { getToken } from '@src/shares/utils'

import { NavBar } from '@views_components'

const Main = lazy(() => import('@views/Main'))
const Message = lazy(() => import('@views/Message'))
const User = lazy(() => import('@views/User'))
const SignIn = lazy(() => import('@views/SignIn'))
const SignUp = lazy(() => import('@views/SignUp'))

const styles = {
	root: {
		display: 'flex',
	},
}

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
		if (!authToken && this.props.location.pathname !== '/sign-in') {
			this.props.history.push('/sign-in')
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
		const { classes } = this.props
		return (
			<Box className={classes.root}>
				{this.shouldRenderNavBar()}

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
}

export default withRouter(withStyles(styles)(App))
