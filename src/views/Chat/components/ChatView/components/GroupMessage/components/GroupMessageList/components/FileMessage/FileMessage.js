import React from 'react'

import { Box, IconButton, Typography } from '@material-ui/core'
import { GetApp, InsertDriveFile } from '@material-ui/icons'
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
	filemessage: {
		display: 'flex',
		alignItems: 'flex-start',
		position: 'relative',
	},
	fileicon: {
		fontSize: '4rem',
	},
	filename: {
		fontSize: '0.875rem',
		maxWidth: 400,
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		paddingRight: theme.spacing(5),
	},
	downloadicon: {
		position: 'absolute',
		right: 0,
		bottom: 0,
	},
}))

const FileMessage = props => {
	const { attachments = [], endOfList, timestamp, fromMe } = props
	const classes = useStyles({ leftOrRight: fromMe })

	return (
		<Box className={classes.root}>
			<Box className={classes.message}>
				{attachments.length &&
					attachments.map((attachment, index) => (
						<Box key={index} className={classes.filemessage}>
							<InsertDriveFile
								color='primary'
								fontSize='large'
								className={classes.fileicon}
							/>
							<Typography component='h5' className={classes.filename}>
								{attachment.payload.name}
							</Typography>
							<a
								href={attachment.payload.url}
								rel='noopener noreferrer'
								download
								className={classes.downloadicon}
							>
								<IconButton aria-label='upload image' component='span'>
									<GetApp />
								</IconButton>
							</a>
						</Box>
					))}
				{endOfList && (
					<LastCardIndicator timestamp={timestamp} fromMe={fromMe} />
				)}
			</Box>
		</Box>
	)
}

export default FileMessage
