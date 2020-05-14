import React from 'react'

import { Box, IconButton, Typography } from '@material-ui/core'
import { GetApp, InsertDriveFile } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	root: {
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
	const { fileName, fileUrl } = props
	const classes = useStyles()

	return (
		<Box className={classes.root}>
			<InsertDriveFile
				color='primary'
				fontSize='large'
				className={classes.fileicon}
			/>
			<Typography component='h5' className={classes.filename}>
				{fileName}
			</Typography>
			<a
				href={fileUrl}
				rel='noopener noreferrer'
				download
				className={classes.downloadicon}
			>
				<IconButton aria-label='upload image' component='span'>
					<GetApp />
				</IconButton>
			</a>
		</Box>
	)
}

export default FileMessage
