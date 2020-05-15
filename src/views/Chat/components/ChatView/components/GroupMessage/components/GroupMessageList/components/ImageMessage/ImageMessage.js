import React from 'react'

import { Box, Card, CardMedia } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import LastCardIndicator from '../LastCardIndicator'

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
	image: {
		maxHeight: 'calc(100vh - 500px)',
		width: 'auto',
	},
}))

const ImageMessage = props => {
	const { attachments = [], endOfList, timestamp, fromMe } = props
	const classes = useStyles({ leftOrRight: fromMe })

	return (
		<Box className={classes.root}>
			<Box className={classes.message}>
				{attachments.length &&
					attachments.map((attachment, index) => (
						<Card key={index}>
							<CardMedia
								component='img'
								image={
									attachment.payload.url
										? attachment.payload.url
										: attachment.payload.thumbnail
								}
								className={classes.image}
							/>
						</Card>
					))}
				{endOfList && (
					<LastCardIndicator timestamp={timestamp} fromMe={fromMe} />
				)}
			</Box>
		</Box>
	)
}

export default ImageMessage
