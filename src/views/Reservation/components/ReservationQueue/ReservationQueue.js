import React from 'react'

import { Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { InfiniteTable } from '@views_components'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		height: '100%',
	},
	reservationqueue__table: {
		position: 'relative',
		display: 'flex',
		height: 'calc(100% - 108px)',
		borderBottom: `1px solid ${theme.palette.grey[300]}`,
	},
	container__buttons: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '100%',
		padding: 24,
	},
	item__button: {
		width: '48%',
		color: theme.palette.common.white,
		fontWeight: 600,
		textTransform: 'capitalize',
		padding: '18px 0',
	},
}))

const tableHeaders = [
	{ headerLabel: 'PATIENT', xs: 4, headerVariable: 'patient' },
	{ headerLabel: 'DOCTOR', xs: 4, headerVariable: 'doctor' },
	{ headerLabel: 'TIME', xs: 4, headerVariable: 'time' },
]

const ReservationQueue = props => {
	const classes = useStyles()
	const { tableItems, onSubmit, onCancel } = props

	return (
		<Box className={classes.root}>
			<Box className={classes.reservationqueue__table}>
				<InfiniteTable items={tableItems} columns={tableHeaders} />
			</Box>
			<Box className={classes.container__buttons}>
				<Button
					color='primary'
					variant='contained'
					fullWidth
					className={classes.item__button}
					onClick={onSubmit}
				>
					Submit
				</Button>
				<Button
					variant='contained'
					fullWidth
					className={classes.item__button}
					onClick={onCancel}
				>
					Cancel
				</Button>
			</Box>
		</Box>
	)
}

export default ReservationQueue
