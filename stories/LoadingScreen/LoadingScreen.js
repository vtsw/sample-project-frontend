import React from 'react'
import { makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'

const useStyles = makeStyles({
	root: {
		height: '100%',
		width: '100%',
		position: 'absolute',
		top: 0,
		left: 0,
		backgroundColor: 'gray',
		opacity: 0.9,
		zIndex: 1000,
	},
})
const LoadingScreen = props => {
	const { open, msg } = props
	const classes = useStyles()

	return open && <div className={classes.root}>{msg}</div>
}

export default LoadingScreen

LoadingScreen.propTypes = {
	loading: PropTypes.func.isRequired,
	msg: PropTypes.string,
}
LoadingScreen.defaultProps = {
	loading: false,
}
