import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Box } from '@material-ui/core'

const useStyles = makeStyles(() => ({
	root: ({ size, avatar }) => ({
		width: size,
		height: size,
		borderRadius: '50%',
		backgroundColor: '#c5c5c5',
		border: '1px solid white',
		position: 'relative',
		backgroundImage: avatar && `url(${avatar})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
	}),
	root__status: ({ status, size }) => ({
		width: size / 5,
		height: size / 5,
		borderRadius: '50%',
		backgroundColor: status === 'online' ? 'green' : 'gray',
		border: '1px solid white',
		position: 'absolute',
		bottom: 1,
		right: 1,
	}),
	root__infor: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}))

const Avatar = props => {
	const { size, avatar, status, showStatus } = props

	const classes = useStyles({ size, status, avatar })
	return (
		<Box className={classes.root}>
			{showStatus && <Box className={classes.root__status} />}
		</Box>
	)
}
export default Avatar

Avatar.propTypes = {
	avatar: PropTypes.string.isRequired,
	status: PropTypes.string,
	showStatus: PropTypes.bool,
	size: PropTypes.number,
}

Avatar.defaultProps = {
	avatar: '',
	status: '',
	showStatus: false,
	size: 20,
}
