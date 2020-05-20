import { Grid, makeStyles, Typography } from '@material-ui/core'
import moment from 'moment'
import React from 'react'

const useStyles = makeStyles(theme => ({
	root: {
		marginTop: theme.spacing(1),
	},
	sendtime: {
		marginRight: theme.spacing(2),
		fontSize: '12px',
		color: '#7a869a',
	},
	status: {
		fontSize: '12px',
		color: '#7a869a',
	},
}))

const LastCardIndicator = props => {
	const { timestamp, fromMe } = props
	const classes = useStyles()

	return (
		<Grid container justify='space-between' className={classes.root}>
			<Typography className={classes.sendtime}>
				{moment(parseInt(timestamp, 10)).format('HH:mm')}
			</Typography>
			<Typography className={classes.status}>
				{fromMe ? 'Đã gửi' : ''}
			</Typography>
		</Grid>
	)
}

export default LastCardIndicator
