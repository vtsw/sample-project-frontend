import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import { Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useMutation } from '@apollo/react-hooks'
import { RESET_CACHE } from './gql/mutation'

import NavBarItem from './NavBarItem'

import { deleteToken } from '@src/shares/utils'
import { initialState } from '@src/client'

const useStyles = makeStyles(theme => ({
	root: {
		position: 'relative',
		backgroundColor: theme.palette.primary.main,
		height: '100vh',
		width: 80,
	},
	tab: {
		color: theme.palette.common.white,
		cursor: 'pointer',
		padding: `${theme.spacing(3)}px ${theme.spacing(1.5)}px`,
		textTransform: 'lowercase',
		borderRadius: 0,
		transition: `all ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut}`,
		'&:last-child': {
			position: 'absolute',
			bottom: 0,
			width: 'inherit',
			textTransform: 'capitalize',
		},
		'&>span': {
			fontWeight: theme.typography.fontWeightBold,
		},
	},
	active: {
		backgroundColor: theme.palette.common.white,
		color: theme.palette.text.primary,
		'&:hover': {
			backgroundColor: theme.palette.common.white,
		},
	},
}))

const navbarItems = [
	{ page: 'main', pathname: '/' },
	{ page: 'user', pathname: '/user' },
	{ page: 'message', pathname: '/message' },
	{ page: 'file', pathname: '/file' },
]

const NavBar = props => {
	const { location = { pathname: '' }, history } = props
	const classes = useStyles()

	const [currentPage, setCurrentPage] = useState(location.pathname)
	const [resetCache, { client }] = useMutation(RESET_CACHE, {
		onCompleted: async () => {
			deleteToken()
			handleOnChangePage('/sign-in')
			await client.resetStore()
			client.writeData({ data: initialState })
		},
		onError: err => alert(err),
	})

	const handleOnChangePage = page => {
		setCurrentPage(page)
		history.push(page)
	}

	const setActiveTab = pathname => {
		return currentPage === pathname ? classes.active : ''
	}

	const handleOnLogOut = () => {
		resetCache({ variables: { data: initialState } })
	}

	return (
		<Grid container direction='column' wrap='nowrap' className={classes.root}>
			{navbarItems.map((item, index) => (
				<NavBarItem
					key={index}
					handleOnChangePage={handleOnChangePage}
					styles={`${classes.tab} ${setActiveTab(item.pathname)}`}
					{...item}
				/>
			))}
			<Button color='primary' className={classes.tab} onClick={handleOnLogOut}>
				Logout
			</Button>
		</Grid>
	)
}

export default withRouter(NavBar)

export { NavBar }
