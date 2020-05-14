import { Card, CardMedia, makeStyles } from '@material-ui/core'
import React from 'react'

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
