import React from 'react'

import { Box } from '@material-ui/core'
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

const TextMessage = props => {
	const { content, endOfList, timestamp, fromMe } = props
	const classes = useStyles({ leftOrRight: fromMe })

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

export default TextMessage
