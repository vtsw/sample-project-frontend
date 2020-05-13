import React from 'react'

import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { InfiniteTable } from '@views_components'

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
		height: '100%',
	},
	reservationqueue__table: {
		position: 'relative',
		display: 'flex',
		height: 'calc(100vh - 400px)',
	},
}))

const tableHeaders = [
	{ headerLabel: 'PATIENT', xs: 4, headerVariable: 'patient' },
	{ headerLabel: 'DOCTOR', xs: 4, headerVariable: 'doctor' },
	{ headerLabel: 'TIME', xs: 4, headerVariable: 'time' },
]

const items = [
	{
		id: '123',
		patient: 'asd',
		doctor: 'DoctorA, Doctor B',
		time: '2014-08-18T21:11:54',
	},
	{
		id: '1234',
		patient: 'asd',
		doctor: 'DoctorA, Doctor B',
		time: '2014-08-18T21:11:54',
	},
	{
		id: '123',
		patient: 'asd',
		doctor: 'DoctorA, Doctor B',
		time: '2014-08-18T21:11:54',
	},
	{
		id: '1234',
		patient: 'asd',
		doctor: 'DoctorA, Doctor B',
		time: '2014-08-18T21:11:54',
	},
	{
		id: '123edasd',
		patient: 'asd',
		doctor: 'DoctorA, Doctor B',
		time: '2014-08-18T21:11:54',
	},
	{
		id: '123asd4',
		patient: 'asd',
		doctor: 'DoctorA, Doctor B',
		time: '2014-08-18T21:11:54',
	},
	{
		id: '1asdasd23',
		patient: 'asd',
		doctor: 'DoctorA, Doctor B',
		time: '2014-08-18T21:11:54',
	},
	{
		id: '12asd34',
		patient: 'asd',
		doctor: 'DoctorA, Doctor B',
		time: '2014-08-18T21:11:54',
	},
	{
		id: '12asdas3',
		patient: 'asd',
		doctor: 'DoctorA, Doctor B',
		time: '2014-08-18T21:11:54',
	},
	{
		id: '123asd4',
		patient: 'asd',
		doctor: 'DoctorA, Doctor B',
		time: '2014-08-18T21:11:54',
	},
	{
		id: '1edfsadf234',
		patient: 'asd',
		doctor: 'DoctorA, Doctor B',
		time: '2014-08-18T21:11:54',
	},
	{
		id: '12sdf3edasd',
		patient: 'asd',
		doctor: 'DoctorA, Doctor B',
		time: '2014-08-18T21:11:54',
	},
	{
		id: '123assdfd4',
		patient: 'asd',
		doctor: 'DoctorA, Doctor B',
		time: '2014-08-18T21:11:54',
	},
	{
		id: '1asdassdfd23',
		patient: 'asd',
		doctor: 'DoctorA, Doctor B',
		time: '2014-08-18T21:11:54',
	},
	{
		id: '12asdfsd34',
		patient: 'asd',
		doctor: 'DoctorA, Doctor B',
		time: '2014-08-18T21:11:54',
	},
	{
		id: '12assdfdas3',
		patient: 'asd',
		doctor: 'DoctorA, Doctor B',
		time: '2014-08-18T21:11:54',
	},
	{
		id: '123assdfd4',
		patient: 'asd',
		doctor: 'DoctorA, Doctor B',
		time: '2014-08-18T21:11:54',
	},
]

const ReservationQueue = props => {
	const classes = useStyles()

	return (
		<Box className={classes.root}>
			<Box className={classes.reservationqueue__table}>
				<InfiniteTable items={items} columns={tableHeaders} />
			</Box>
		</Box>
	)
}

export default ReservationQueue
