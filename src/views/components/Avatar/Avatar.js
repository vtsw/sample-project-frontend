import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Box } from '@material-ui/core'

const useStyles = makeStyles(() => ({
	root: ({ size, imgUrl }) => ({
		width: size,
		height: size,
		borderRadius: '50%',
		backgroundColor: '#c5c5c5',
		border: '1px solid white',
		position: 'relative',
		backgroundImage: imgUrl && `url(${imgUrl})`,
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

export default function Avatar(props) {
	const { size, imgUrl, status, showStatus } = props

	const classes = useStyles({ size, status, imgUrl })
	return (
		<Box className={classes.root}>
			{showStatus && <Box className={classes.root__status} />}
		</Box>
	)
}

Avatar.propTypes = {
	imgUrl: PropTypes.string.isRequired,
	status: PropTypes.string,
	showStatus: PropTypes.bool,
	size: PropTypes.number,
}

Avatar.defaultProps = {
	imgUrl:
		'http://s120-ava-talk.zadn.vn/3/e/5/2/2/120/c181045e8a31aa07c65e25d88bd249e6.jpg',
	status: '',
	showStatus: false,
	size: 20,
}
