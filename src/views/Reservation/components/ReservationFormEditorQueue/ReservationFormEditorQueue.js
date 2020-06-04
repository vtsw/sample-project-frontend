import React from 'react'
import { format } from 'date-fns/esm'
import { useQuery, useMutation } from '@apollo/react-hooks'

import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import {
	ReservationFormEditor,
	ReservationQueue,
} from '@views/Reservation/components'

import {
	GET_RESERVATION_QUEUE,
	GET_ZALO_INTERESTED_USER_LIST,
	GET_RESERVATION_REQUEST_LIST,
} from '@views/Reservation/gql/query'
import { FETCH_USER_LIST } from '@views/User/gql/query'
import {
	CREATE_RESERVATION,
	CREATE_RESERVATION_REQUEST,
	RESET_RESERVATION_QUEUE,
} from '@views/Reservation/gql/mutation'
import { PAGE_LIMIT, DEFAULT_RESERVATION_PATIENT_ID } from '@src/configs.local'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		height: '100%',
		border: `1px solid ${theme.palette.common.border}`,
		position: 'relative',
	},
}))

const ReservationFormEditorQueue = () => {
	const classes = useStyles()

	const { data: reservationQueueData } = useQuery(GET_RESERVATION_QUEUE)
	const { data: dataUserList } = useQuery(FETCH_USER_LIST, {
		variables: {
			query: {
				searchText: '',
				limit: PAGE_LIMIT,
			},
		},
		onError: err => {
			alert(err)
		},
	})
	const { data: dataInterestedUserList } = useQuery(
		GET_ZALO_INTERESTED_USER_LIST,
		{
			variables: {
				query: {
					limit: PAGE_LIMIT,
				},
			},
			onError: err => {
				alert(err)
			},
		}
	)
	const [createReservation] = useMutation(CREATE_RESERVATION)
	const [createReservationRequest] = useMutation(CREATE_RESERVATION_REQUEST, {
		onError: err => alert(err),
	})
	const [resetReservationQueue] = useMutation(RESET_RESERVATION_QUEUE)

	const handleOnCreateReservation = ({ type, patientId, doctorId, time }) => {
		const doctor = dataUserList.userList.items.filter(
			item => item.id === doctorId
		)
		const patient = dataInterestedUserList.zaloInterestedUserList.items.filter(
			item => item.id === patientId
		)
		createReservation({
			variables: {
				reservation: {
					id: new Date().getTime(),
					type,
					patientId,
					patient: patient[0].displayName,
					doctorId,
					doctor: doctor[0].name,
					time: format(time, 'HH:mm - dd/MM/yyyy'),
					unixTime: time.getTime(),
					__typename: 'ReservationInput',
				},
			},
		})
	}

	const handleOnSubmit = () => {
		if (reservationQueueData?.reservationQueue?.items.length) {
			const reservationData = reservationQueueData.reservationQueue.items.map(
				item => ({
					id: item.doctorId,
					time: item.unixTime,
				})
			)

			createReservationRequest({
				variables: {
					reservation: {
						patient: DEFAULT_RESERVATION_PATIENT_ID,
						doctors: reservationData,
					},
				},
				refetchQueries: [
					{
						query: GET_RESERVATION_REQUEST_LIST,
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
			<ReservationFormEditor
				patients={dataInterestedUserList?.zaloInterestedUserList?.items ?? []}
				doctors={dataUserList?.userList?.items ?? []}
				handleOnCreateReservation={handleOnCreateReservation}
			/>
			<ReservationQueue
				tableItems={reservationQueueData?.reservationQueue?.items}
				onSubmit={handleOnSubmit}
				onCancel={handleOnCancel}
			/>
		</Box>
	)
}

export default ReservationFormEditorQueue
