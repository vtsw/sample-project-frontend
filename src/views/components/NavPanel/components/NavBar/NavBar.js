import React, { useState } from 'react'
import clsx from 'clsx'

import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import NavBarItem from '../NavBarItem'

const useStyles = makeStyles(theme => ({
	root: {
		position: 'relative',
		backgroundColor: theme.palette.primary.main,
		height: '100vh',
		width: 80,
	},
	tab: {
		color: theme.palette.common.white,
		width: '100%',
		cursor: 'pointer',
		padding: `28px 12px`,
		textTransform: 'lowercase',
		borderRadius: 0,
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

const NavBar = props => {
	const { location = { pathname: '' }, history, items } = props
	const classes = useStyles()

	const [currentPage, setCurrentPage] = useState(location.pathname || {})

	const handleOnChangePage = page => {
		setCurrentPage(page)
		history.push(page)
	}

	const setActiveTab = pathname => {
		return currentPage === pathname ? classes.active : ''
	}

	return (
		<Grid className={classes.root}>
			{items.map((item, index) => (
				<NavBarItem
					key={index}
					handleOnChangePage={handleOnChangePage}
					styles={clsx(classes.tab, setActiveTab(item.pathname))}
					{...item}
				/>
			))}
		</Grid>
	)
}

export default NavBar
