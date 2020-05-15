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
		marginBottom: 4,
		marginLeft: 8,
		marginRight: 8,
		borderRadius: 8,
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

	messsage__image: {
		backgroundImage:
			'url(https://vn112.com/wp-content/uploads/2019/03/dentist-1552158168plc84.jpg)',
		backgroundPosition: 'center center',
		borderBottomLeftRadius: '0px',
		borderBottomRightRadius: '0px',
		width: 360,
		height: 232,
		objectFit: 'cover',
		backgroundColor: '#f2f5fa',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		borderRadius: '8px',
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
	message__iconalarm: {
		fontSize: 48,
		marginRight: 12,
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
				<div className={classes.messsage__image}></div>
				<Typography className={classes.messsage__comfirm}>
					Xác nhận lịch đi khám vào ngày: 2020-05-13
				</Typography>
				<Typography className={classes.message__comfirmdate}>
					Xin vui lòng xác nhận lịch đi khám
				</Typography>

				<Box className={classes.message__option}>
					<AlarmIcon className={classes.message__iconalarm} />
					<Box>
						<Typography>Khám bác sỹ A vào lúc 16:03</Typography>
					</Box>
				</Box>
				<Box className={classes.message__option}>
					<AlarmIcon className={classes.message__iconalarm} />
					<Box>
						<Typography>Khám bác sỹ A vào lúc 16:03</Typography>
					</Box>
				</Box>

				{endOfList && (
					<Grid container className={classes.boxsendtime}>
						<Typography className={classes.boxsendtime__sendtime}>
							{moment(parseInt(timestamp, 10)).format('HH:mm')}
						</Typography>
						<Typography className={classes.boxsendtime__status}>
							{' '}
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
