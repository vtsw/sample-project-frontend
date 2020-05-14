import { Grid, makeStyles, Typography } from '@material-ui/core'
import moment from 'moment'
import React from 'react'

const useStyles = makeStyles(theme => ({
	boxsendtime: {
		marginTop: theme.spacing(1),
	},
	boxsendtime__sendtime: {
		marginRight: theme.spacing(2),
		fontSize: '12px',
		color: '#7a869a',
	},
	boxsendtime__status: {
		fontSize: '12px',
		color: '#7a869a',
	},
}))

const LastCardIndicator = props => {
	const { timestamp, fromMe } = props
	const classes = useStyles()

	return (
		<Grid container className={classes.boxsendtime}>
			<Typography className={classes.boxsendtime__sendtime}>
				{moment(parseInt(timestamp, 10)).format('HH:mm')}
			</Typography>
			<Typography className={classes.boxsendtime__status}>
				{fromMe ? 'Đã gửi' : ''}
			</Typography>
		</Grid>
	)
}

export default LastCardIndicator
