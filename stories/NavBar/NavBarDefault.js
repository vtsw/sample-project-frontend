import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import NavBar from '../../src/views/components/NavBar'
import { BrowserRouter } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
	root: {
		position: 'relative',
		backgroundColor: theme.palette.primary.main,
		display: 'flex',
		flexDirection: 'column',
		height: '80vh',
		width: '100px',
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

const NavBarDefault = () => {
	const classes = useStyles()
	return (
		<BrowserRouter>
			<div className={classes.root}>
				<NavBar />
			</div>
		</BrowserRouter>
	)
}

export default NavBarDefault

NavBarDefault.propTypes = {
	location: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
}
NavBarDefault.defaultProps = {}
