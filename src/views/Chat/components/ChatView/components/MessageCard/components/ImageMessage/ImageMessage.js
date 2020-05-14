import React from 'react'
import { Card, CardMedia } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
	image: {
		maxHeight: 'calc(100vh - 500px)',
		width: 'auto',
	},
}))

const ImageMessage = props => {
	const { url } = props
	const classes = useStyles()

	return (
		<Card>
			<CardMedia component='img' image={url} className={classes.image} />
		</Card>
	)
}

export default ImageMessage
