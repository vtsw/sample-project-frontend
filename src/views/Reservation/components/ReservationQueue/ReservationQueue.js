import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'

import { Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { InfiniteTable } from '@views_components'

import {
	GET_RESERVATION_QUEUE,
	GET_RESERVATION_LIST,
} from '@views/Reservation/gql/query'
import {
	CREATE_RESERVATION_REQUEST,
	RESET_RESERVATION_QUEUE,
} from '@views/Reservation/gql/mutation'
import { PAGE_LIMIT } from '@src/configs.local'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	reservationqueue__table: {
		position: 'relative',
		display: 'flex',
		height: 'calc(100vh - 500px)',
		borderBottom: `1px solid ${theme.palette.common.border}`,
	},
	container__buttons: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '100%',
		padding: 20,
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

const DEFAULT_RESERVATION_PATIENT_ID = '4556061936982532685'

const ReservationQueue = () => {
	const classes = useStyles()
	const { data: reservationQueueData } = useQuery(GET_RESERVATION_QUEUE)
	const [createReservationRequest] = useMutation(CREATE_RESERVATION_REQUEST, {
		onError: err => alert(err),
	})
	const [resetReservationQueue] = useMutation(RESET_RESERVATION_QUEUE)

	const handleOnSubmit = () => {
		if (reservationQueueData?.reservationQueue?.items.length) {
			const reservationData = reservationQueueData.reservationQueue.items.map(
				item => ({
					doctor: item.doctor,
					time: item.unixTime,
				})
			)

			createReservationRequest({
				variables: {
					reservation: {
						patient: DEFAULT_RESERVATION_PATIENT_ID,
						bookingOptions: reservationData,
					},
				},
				refetchQueries: [
					{
						query: GET_RESERVATION_LIST,
						variables: {
							query: {
								limit: PAGE_LIMIT,
							},
						},
					},
				],
				awaitRefetchQueries: true,
			}).then(() => {
				resetReservationQueue()
			})
		}
	}

	const handleOnCancel = () => {
		resetReservationQueue()
	}

	return (
		<Box className={classes.root}>
			<Box className={classes.reservationqueue__table}>
				<InfiniteTable
					items={reservationQueueData?.reservationQueue?.items}
					columns={tableHeaders}
				/>
			</Box>
			<Box className={classes.container__buttons}>
				<Button
					color='primary'
					variant='contained'
					fullWidth
					className={classes.item__button}
					onClick={handleOnSubmit}
				>
					Submit
				</Button>
				<Button
					variant='contained'
					fullWidth
					className={classes.item__button}
					onClick={handleOnCancel}
				>
					Cancel
				</Button>
			</Box>
		</Box>
	)
}

export default ReservationQueue
