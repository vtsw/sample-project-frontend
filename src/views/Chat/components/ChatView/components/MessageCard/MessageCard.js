import React from 'react'
import PropTypes from 'prop-types'
import { Box, makeStyles, Typography, Grid } from '@material-ui/core'

import LastCardIndicator from './LastCardIndicator'
import ImageMessage from './ImageMessage'

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
}))

const MessageCard = props => {
	const {
		content,
		attachments = {},
		from,
		meId,
		endOfList,
		timestamp,
		fromMe,
	} = props
	const classes = useStyles({ leftOrRight: fromMe })

	if (attachments && attachments[0]?.payload?.url) {
		return (
			<Box className={classes.root}>
				<Box className={classes.message}>
					{attachments.map((attachment, index) =>
						attachment?.payload?.url ? (
							<ImageMessage url={attachment?.payload?.url} key={index} />
						) : (
							''
						)
					)}
					{content && <span>{content}</span>}
					{endOfList && (
						<LastCardIndicator timestamp={timestamp} fromMe={fromMe} />
					)}
				</Box>
			</Box>
		)
	} else {
		return (
			<Box className={classes.root}>
				<Box className={classes.message}>
					{content && <span>{content}</span>}
					{endOfList && (
						<LastCardIndicator timestamp={timestamp} fromMe={fromMe} />
					)}
				</Box>
			</Box>
		)
	}
}

MessageCard.propTypes = {
	content: PropTypes.string,
}

MessageCard.defaultProps = {
	content: '',
}

export default MessageCard
