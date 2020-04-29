import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { NavBar } from '../../src/views/components/NavPanel/components'
import { BrowserRouter } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
	root: {
		position: 'relative',
		backgroundColor: theme.palette.primary.main,
		display: 'flex',
		flexDirection: 'column',
		height: '100vh',
		width: 80,
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

const navbarItems = [
	{ page: 'main', pathname: '/' },
	{ page: 'user', pathname: '/user' },
	{ page: 'message', pathname: '/message' },
	{ page: 'file', pathname: '/file' },
]

const NavBarDefault = () => {
	const classes = useStyles()
	return (
		<BrowserRouter>
			<div className={classes.root}>
				<NavBar items={navbarItems} />
			</div>
		</BrowserRouter>
	)
}

export default NavBarDefault

NavBarDefault.propTypes = {
	items: PropTypes.array.isRequired,
	location: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
}
NavBarDefault.defaultProps = {}
