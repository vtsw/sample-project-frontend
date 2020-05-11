import React from 'react'
import PropTypes from 'prop-types'
import {
	Box,
	makeStyles,
	Typography,
	Grid,
	Card,
	CardMedia,
} from '@material-ui/core'
import { ShowRichText } from '@views_components'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
	root: ({ leftOrRight }) => ({
		display: 'flex',
		flexDirection: leftOrRight % 2 !== 0 ? 'row-reverse' : 'row',
	}),
	root__message: {
		marginBottom: 4,
		marginLeft: 8,
		marginRight: 8,
		borderRadius: 8,
		minWidth: '32px',
		maxWidth: 'calc(100% - 150px)',
		backgroundColor: '#DAE9FF',
		whiteSpace: 'pre-line',
		padding: 12,
		wordBreak: 'break-word',
	},
	root__timestamp: {
		marginRight: theme.spacing(2),
		fontSize: '12px',
		color: '#7a869a',
	},
	root__sent: {
		fontSize: '12px',
		color: '#7a869a',
	},
	root__box: {
		marginTop: theme.spacing(1),
	},
}))

export default function MessageCard(props) {
	const {
		content,
		attachments = {},
		from,
		meId,
		endOfList,
		timestamp,
		refFristMessage,
	} = props
	const classes = useStyles({ leftOrRight: meId === from.id })
	// console.log(attachments)
	return (
		<div className={classes.root}>
			<Box className={classes.root__message}>
				{attachments && attachments[0]?.payload?.url ? (
					<Card>
						<CardMedia component='img' image={attachments[0].payload.url} />
					</Card>
				) : (
					content
				)}

				{/* <textarea value={content} readOnly /> */}
				{/* <ShowRichText valueDefault={JSON.parse(`${content}`)} /> */}
				{endOfList && (
					<Grid container className={classes.root__box}>
						<Typography className={classes.root__timestamp}>
							{moment(parseInt(timestamp, 10)).format('HH:mm')}
						</Typography>
						<Typography className={classes.root__sent}> Đã gửi</Typography>
					</Grid>
				)}
			</Box>
		</div>
	)
}

MessageCard.propTypes = {
	content: PropTypes.string,
}

MessageCard.defaultProps = {
	content: '',
}
