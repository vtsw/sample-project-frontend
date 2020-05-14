import { Card, CardMedia, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
	message__image: {
		maxHeight: 'calc(100vh - 500px)',
		width: 'auto',
	},
}))

const ImageMessage = props => {
	const { url } = props
	const classes = useStyles()

	return (
		<Card>
			<CardMedia
				component='img'
				image={url}
				className={classes.message__image}
			/>
		</Card>
	)
}

export default ImageMessage
