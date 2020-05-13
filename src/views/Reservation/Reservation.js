import React from 'react'

import { Box, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { ReservationFormEditor, ReservationQueue } from './components'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		height: '100vh',
	},
	container: {
		padding: theme.spacing(3),
		height: '100vh',
	},
	item__reservation__formeditor__queue: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		height: '100%',
		border: `1px solid ${theme.palette.common.border}`,
		marginRight: theme.spacing(1.5),
		position: 'relative',
	},
}))

const Reservation = () => {
	const classes = useStyles()

	return (
		<Box className={classes.root}>
			<Grid container className={classes.container}>
				<Grid item xs={5}>
					<Box className={classes.item__reservation__formeditor__queue}>
						<ReservationFormEditor />
						<ReservationQueue />
					</Box>
				</Grid>
				<Grid item xs={7}>
					Reservation list
				</Grid>
			</Grid>
		</Box>
	)
}

export default Reservation
