import React from 'react'

import { Box, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { ReservationFormEditorQueue, ReservationList } from './components'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		height: '100vh',
	},
	container: {
		padding: theme.spacing(3),
		height: '100%',
	},
	item__reservationformeditorqueue: {
		paddingRight: theme.spacing(1.5),
	},
	item__reservationlist: {
		paddingLeft: theme.spacing(1.5),
	},
}))

const Reservation = () => {
	const classes = useStyles()

	return (
		<Box className={classes.root}>
			<Grid container className={classes.container}>
				<Grid item xs={5} className={classes.item__reservationformeditorqueue}>
					<ReservationFormEditorQueue />
				</Grid>
				<Grid item xs={7} className={classes.item__reservationlist}>
					<ReservationList />
				</Grid>
			</Grid>
		</Box>
	)
}

export default Reservation
