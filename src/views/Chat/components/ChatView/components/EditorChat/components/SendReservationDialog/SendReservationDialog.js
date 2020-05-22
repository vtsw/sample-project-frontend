import React, { useState, useEffect } from 'react'
import { format } from 'date-fns/esm'

import { Dialog, makeStyles, Slide, Box, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'

import {
	ReservationFormEditor,
	ReservationQueue,
} from '@views/Reservation/components'

const useStyles = makeStyles(theme => ({
	root: {
		boxShadow: 'none',
	},
	closebutton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
	reservationqueue: {
		height: 400,
	},
}))

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />
})

const doctors = [
	{ id: '5ec37efc0b4bcd353424affb', value: 'Doctor A', label: 'Doctor A' },
	{ id: '5e68995fb6d0bc05829b6e79', value: 'Doctor B', label: 'Doctor B' },
]

const patients = [
	{ id: '4556061936982532685', value: 'Patient A', label: 'Patient A' },
	{ id: '4556061936982532685', value: 'Patient B', label: 'Patient B' },
	{ id: '4556061936982532685', value: 'Patient C', label: 'Patient C' },
]

const SendReservationDialog = props => {
	const classes = useStyles()
	const { open, onClose } = props

	const [reservationList, setReservationList] = useState([])

	const handleOnCreateReservation = ({ type, patient, doctor, time }) => {
		const reservation = {
			id: new Date().getTime(),
			type,
			patient,
			doctor,
			time: format(time, 'HH:mm - dd/MM/yyyy'),
			unixTime: time.getTime(),
		}
		setReservationList([reservation, ...reservationList])
	}

	const handleOnSubmit = () => {}
	const handleOnCancel = () => {
		setReservationList([])
		onClose()
	}

	return (
		<Dialog
			TransitionComponent={Transition}
			open={open}
			onClose={onClose}
			classes={{ paper: classes.root }}
		>
			<IconButton
				aria-label='close'
				className={classes.closebutton}
				onClick={onClose}
			>
				<Close />
			</IconButton>
			<ReservationFormEditor
				patients={patients}
				doctors={doctors}
				handleOnCreateReservation={handleOnCreateReservation}
			/>
			<Box className={classes.reservationqueue}>
				<ReservationQueue
					tableItems={reservationList}
					onSubmit={handleOnSubmit}
					onCancel={handleOnCancel}
				/>
			</Box>
		</Dialog>
	)
}

export default SendReservationDialog
