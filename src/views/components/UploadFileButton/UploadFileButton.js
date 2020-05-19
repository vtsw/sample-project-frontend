import React from 'react'

import { Box, IconButton } from '@material-ui/core'
import { AttachFile } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
	uploadinput: {
		display: 'none',
	},
}))

const UploadFileButton = props => {
	const { onChange } = props
	const classes = useStyles()

	return (
		<Box>
			<input
				id='upload-file-button'
				type='file'
				accept='application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf'
				className={classes.uploadinput}
				onChange={onChange}
			/>
			<label htmlFor='upload-file-button'>
				<IconButton aria-label='upload image' component='span'>
					<AttachFile />
				</IconButton>
			</label>
		</Box>
	)
}

export default UploadFileButton
