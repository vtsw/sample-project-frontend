import React from 'react'

import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Loading } from '@views_components'

const useStyles = makeStyles(() => ({
	root: {
		position: 'absolute',
		left: 87,
		top: 0,
		right: 0,
		bottom: 0,
	},
}))

const SuspenseLoading = () => {
	const classes = useStyles()

	return (
		<Box className={classes.root}>
			<Loading open={true} msg={'Loading...'} />
		</Box>
	)
}

export default SuspenseLoading
