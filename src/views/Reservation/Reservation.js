import React from 'react'

import { Box, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import {
	ReservationFormEditorQueue,
	ReservationRequestList,
	ConfirmedReservationList,
} from './components'

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
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		paddingLeft: theme.spacing(1.5),
		height: '100%',
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
					<ConfirmedReservationList />
					<ReservationRequestList />
				</Grid>
			</Grid>
		</Box>
	)
}

export default Reservation
