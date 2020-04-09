import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import NavBarItem from '../NavBarItem'

const useStyles = makeStyles(theme => ({
	root: {
		position: 'relative',
		backgroundColor: theme.palette.primary.main,
		display: 'flex',
		flexDirection: 'column',
		height: '100vh',
	},
	tab: {
		fontSize: theme.typography.htmlFontSize,
		fontWeight: theme.typography.fontWeightMedium,
		color: theme.palette.common.white,
		cursor: 'pointer',
		padding: `${theme.spacing(3)}px ${theme.spacing(1.5)}px`,
		textAlign: 'center',
		transition: `all ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut}`,
		'&:last-child': {
			position: 'absolute',
			bottom: 0,
		},
	},
	active: {
		backgroundColor: theme.palette.common.white,
		color: theme.palette.text.primary,
	},
}))

const NavBarContainer = props => {
	const { location, history, items, handleOnLogOut } = props
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
		<ul className={classes.root}>
			{items.map((item, index) => (
				<NavBarItem
					key={index}
					handleOnChangePage={handleOnChangePage}
					styles={`${classes.tab} ${setActiveTab(item.pathname)}`}
					{...item}
				/>
			))}
			<li
				data-testid='navbaritem-logout'
				className={classes.tab}
				onClick={handleOnLogOut}
			>
				Logout
			</li>
		</ul>
	)
}

export default NavBarContainer
