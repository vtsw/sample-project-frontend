import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Box } from '@material-ui/core'

MessageNoti.propTypes = {}

const useStyles = makeStyles(theme => ({
	root__infor__boxname__numbermessage: {
		margin: '0 8px',
		fontSize: '12px',
		background: 'red',
		borderRadius: '50%',
		color: 'white',
		width: '20px',
		height: '18px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}))

export default function MessageNoti({ numberNoti, maximumValueNoti = 5 }) {
	const classes = useStyles()
	return (
		<Box className={classes.root__infor__boxname__numbermessage}>
			{numberNoti > maximumValueNoti ? `${maximumValueNoti}+` : numberNoti}
		</Box>
	)
}
