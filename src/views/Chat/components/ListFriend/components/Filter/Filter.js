import React from 'react'
import { makeStyles, Box, Typography } from '@material-ui/core'
import Dropdown from '../Dropdown'

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		padding: '8px 16px 16px 16px',
		alignItems: 'center',
	},
	text: {
		fontSize: 12,
		color: '#7a869a',
		cursor: 'pointer',
		'&:hover': {
			color: '#00897b80',
		},
	},
}))

const Filter = () => {
	const classes = useStyles()
	return (
		<Box className={classes.root}>
			<Dropdown />
			<Typography className={classes.text}>Đánh dấu đã đọc</Typography>
		</Box>
	)
}

export default Filter
