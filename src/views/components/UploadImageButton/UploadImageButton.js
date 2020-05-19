import React from 'react'

import { Box, IconButton } from '@material-ui/core'
import { Image } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
	uploadinput: {
		display: 'none',
	},
}))

const UploadImageButton = props => {
	const { onChange } = props
	const classes = useStyles()

	return (
		<Box>
			<input
				id='upload-input-button'
				type='file'
				accept='image/*'
				className={classes.uploadinput}
				onChange={onChange}
			/>
			<label htmlFor='upload-input-button'>
				<IconButton aria-label='upload image' component='span'>
					<Image />
				</IconButton>
			</label>
		</Box>
	)
}

export default UploadImageButton
