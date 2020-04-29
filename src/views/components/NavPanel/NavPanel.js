import React from 'react'
import { withRouter } from 'react-router-dom'

import { useMutation } from '@apollo/react-hooks'
import { RESET_CACHE } from './gql/mutation'

import { NavBar } from './components'
import { LogOutButton } from '@views_components'

import { deleteToken } from '@src/shares/utils'
import { initialState } from '@src/client'

const navbarItems = [
	{ page: 'main', pathname: '/' },
	{ page: 'user', pathname: '/user' },
	{ page: 'message', pathname: '/message' },
	{ page: 'file', pathname: '/file' },
]

const NavPanel = props => {
	const { history } = props

	const [resetCache, { client }] = useMutation(RESET_CACHE, {
		onCompleted: async () => {
			deleteToken()
			history.push('/sign-in')
			await client.resetStore()
			client.writeData({ data: initialState })
		},
		onError: err => alert(err),
	})

	const handleOnLogOut = () => {
		resetCache({ variables: { data: initialState } })
	}

	return (
		<React.Fragment>
			<NavBar items={navbarItems} {...props} />
			<LogOutButton handleOnLogOut={handleOnLogOut} />
		</React.Fragment>
	)
}

export default withRouter(NavPanel)
