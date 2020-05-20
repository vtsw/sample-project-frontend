import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Box, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AlarmIcon from '@material-ui/icons/Alarm'

const useStyles = makeStyles(theme => ({
	root: ({ leftOrRight }) => ({
		display: 'flex',
		flexDirection: leftOrRight % 2 !== 0 ? 'row-reverse' : 'row',
	}),
	message: ({ leftOrRight }) => ({
		width: 360,
		marginBottom: 4,
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		borderRadius: theme.spacing(1),
		minWidth: '32px',
		maxWidth: 'calc(100% - 150px)',
		backgroundColor:
			leftOrRight % 2 !== 0 ? '#DAE9FF' : theme.palette.common.white,
		whiteSpace: 'pre-line',
		wordBreak: 'break-word',
	}),
	message__image: {
		maxHeight: 'calc(100vh - 500px)',
		width: 'auto',
	},
	boxsendtime: {
		margin: theme.spacing(1),
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

	messsage__thumnailoption1: {
		width: '100%',
		height: 232,
		objectFit: 'cover',
		borderRadius: '8px 8px 0 0',
	},
	d: {
		width: 60,
		height: 60,
		marginRight: 12,
	},

	messsage__comfirm: {
		fontWeight: 500,
		marginTop: 10,
		marginBottom: 12,
		padding: '0px 10px',
	},

	message__comfirmdate: {
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 10,
		whiteSpace: 'pre-line',
	},
	message__option: {
		padding: 10,
		display: 'flex',
		borderTop: '1px solid rgb(185, 185, 185)',
		alignItems: 'center',
	},
}))

const ReservationMessage = props => {
	const {
		content,
		attachments = [],
		from = { id: '' },
		meId = '',
		endOfList,
		timestamp,
	} = props
	const classes = useStyles({ leftOrRight: meId === from.id })

	return (
		<Box className={classes.root}>
			<Box className={classes.message}>
				{attachments && attachments[0] && (
					<Box>
						<img
							alt='thumbnail'
							src={attachments[0].payload.thumbnail}
							className={classes.messsage__thumnailoption1}
						/>
						<Typography className={classes.messsage__comfirm}>
							{attachments[0].payload.title}
						</Typography>
						<Typography className={classes.message__comfirmdate}>
							{attachments[0].payload.description}
						</Typography>
					</Box>
				)}

				{attachments && attachments[1] && (
					<Box className={classes.message__option}>
						<img
							alt='thumbnail'
							src={attachments[1].payload.thumbnail}
							className={classes.d}
						/>
						<Box>
							<Typography> {attachments[1].payload.title}</Typography>
						</Box>
					</Box>
				)}
				{attachments && attachments[2] && (
					<Box className={classes.message__option}>
						<img
							alt='thumbnail'
							src={attachments[2].payload.thumbnail}
							className={classes.d}
						/>
						<Box>
							<Typography> {attachments[2].payload.title}</Typography>
						</Box>
					</Box>
				)}
				{endOfList && (
					<Grid container className={classes.boxsendtime}>
						<Typography className={classes.boxsendtime__sendtime}>
							{moment(parseInt(timestamp, 10)).format('HH:mm')}
						</Typography>
						<Typography className={classes.boxsendtime__status}>
							Đã gửi
						</Typography>
					</Grid>
				)}
			</Box>
		</Box>
	)
}

ReservationMessage.propTypes = {
	content: PropTypes.string,
}

ReservationMessage.defaultProps = {
	content: '',
}

export default ReservationMessage
