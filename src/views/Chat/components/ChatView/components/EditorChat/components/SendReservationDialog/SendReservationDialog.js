import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	makeStyles,
	TextField,
	Slide,
	Box,
	IconButton,
} from '@material-ui/core'
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
		height: 350,
	},
}))

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />
})

const SendReservationDialog = props => {
	const { open, onClose, onAgree, valueDefault = '', onDisagree } = props
	const classes = useStyles()

	const [value, setValue] = useState()

	useEffect(() => {
		setValue(valueDefault)
	}, [valueDefault])

	const handleUpdate = () => {
		if (valueDefault === value) {
			onDisagree && onDisagree()
		} else {
			onAgree && onAgree(value)
		}
	}

	const handleCancel = () => {
		onDisagree && onDisagree()
	}

	const handleOnCreateReservation = () => {}

	const doctors = [
		{ id: '5ec37efc0b4bcd353424affb', value: 'Doctor A', label: 'Doctor A' },
		{ id: '5e68995fb6d0bc05829b6e79', value: 'Doctor B', label: 'Doctor B' },
	]

	const patients = [
		{ id: '4556061936982532685', value: 'Patient A', label: 'Patient A' },
		{ id: '4556061936982532685', value: 'Patient B', label: 'Patient B' },
		{ id: '4556061936982532685', value: 'Patient C', label: 'Patient C' },
	]

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
				<ReservationQueue />
			</Box>
		</Dialog>
	)
}

export default SendReservationDialog
