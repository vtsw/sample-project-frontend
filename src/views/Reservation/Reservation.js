import React from 'react'

import { Box, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { ReservationFormEditorQueue } from './components'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		height: '100vh',
	},
	container: {
		padding: theme.spacing(3),
		height: '100%',
	},
}))

const Reservation = () => {
	const classes = useStyles()

	return (
		<Box className={classes.root}>
			<Grid container className={classes.container}>
				<Grid item xs={5}>
					<ReservationFormEditorQueue />
				</Grid>
				<Grid item xs={7}>
					Reservation list
				</Grid>
			</Grid>
		</Box>
	)
}

export default Reservation
