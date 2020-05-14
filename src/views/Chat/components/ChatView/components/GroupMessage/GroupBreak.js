import { Box, makeStyles, Typography } from '@material-ui/core'
import moment from 'moment'
import React from 'react'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	root__timestamp: {
		background: '#00000033',
		borderRadius: '8px',
		padding: '3px 12px',
		fontSize: '14px',
		color: 'white',
	},
	root__line: {
		display: 'flex',
		justifyContent: 'center',
		margin: theme.spacing(2, 0),

		padding: '0 46px',
	},
	root_line1: {
		border: '0.5px solid #d2d2d2',
		display: 'flex',
		flex: 1,
		height: 1,
		marginTop: 12,
	},
}))

const GroupBreak = props => {
	const { timestamp } = props

	const classes = useStyles()

	return (
		<Box className={classes.root}>
			<Box className={classes.root__line}>
				<div className={classes.root_line1} />
				<Typography className={classes.root__timestamp}>
					{moment(parseInt(timestamp, 10)).format('hh:mm DD/MM/YYYY')}
				</Typography>
				<div className={classes.root_line1} />
			</Box>
		</Box>
	)
}

export default GroupBreak
