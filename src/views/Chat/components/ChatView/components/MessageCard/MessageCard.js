import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { FileMessage, ImageMessage, LastCardIndicator } from './components'

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
		attachments = [],
		from,
		meId,
		endOfList,
		timestamp,
		fromMe,
	} = props
	const classes = useStyles({ leftOrRight: fromMe })

	const renderMessage = ({ type, name, url, thumbnail }) => {
		switch (type) {
			case 'image':
				return <ImageMessage url={url} key={url} />
			case 'gif':
				return <ImageMessage url={thumbnail} key={thumbnail} />
			case 'file':
				return <FileMessage key={url} fileName={name} fileUrl={url} />
			default:
				return null
		}
	}

	return (
		<Box className={classes.root}>
			<Box className={classes.message}>
				{attachments?.length ? (
					attachments.map(attachment =>
						renderMessage({ ...attachment.payload, type: attachment.type })
					)
				) : (
					<React.Fragment>{content && <span>{content}</span>}</React.Fragment>
				)}
				{endOfList && (
					<LastCardIndicator timestamp={timestamp} fromMe={fromMe} />
				)}
			</Box>
		</Box>
	)
}

MessageCard.propTypes = {
	content: PropTypes.string,
}

MessageCard.defaultProps = {
	content: '',
}

export default MessageCard
