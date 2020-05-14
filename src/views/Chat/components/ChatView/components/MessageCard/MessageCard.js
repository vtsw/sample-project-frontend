import React from 'react'
import PropTypes from 'prop-types'
import {
	Box,
	makeStyles,
	IconButton,
	Typography,
	Grid,
	Card,
	CardMedia,
} from '@material-ui/core'
import { GetApp, InsertDriveFile } from '@material-ui/icons'
import { ShowRichText } from '@views_components'
import moment from 'moment'

import { FileMessage } from './components'

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
		padding: 12,
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
	filecontainer: {},
}))

const MessageCard = props => {
	const { content, attachments = {}, from, meId, endOfList, timestamp } = props
	const classes = useStyles({ leftOrRight: meId === from.id })

	// console.log(attachments && attachments[0]?.payload.name)
	return (
		<Box className={classes.root}>
			<Box className={classes.message}>
				{attachments &&
				attachments[0]?.payload?.url &&
				attachments[0]?.type === 'image' ? (
					<Card>
						<CardMedia
							component='img'
							image={attachments[0].payload.url}
							className={classes.message__image}
						/>
					</Card>
				) : (
					<span>{content}</span>
				)}
				{attachments && attachments[0]?.payload?.name && (
					<FileMessage
						fileName={attachments[0].payload.name}
						fileUrl={attachments[0].payload.url}
					/>
				)}

				{/* <textarea value={content} readOnly /> */}
				{/* <ShowRichText valueDefault={JSON.parse(`${content}`)} /> */}
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

export default MessageCard

MessageCard.propTypes = {
	content: PropTypes.string,
}

MessageCard.defaultProps = {
	content: '',
}
