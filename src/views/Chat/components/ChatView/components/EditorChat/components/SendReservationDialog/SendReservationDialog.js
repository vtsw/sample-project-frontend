import React, { useState } from 'react'
import { format } from 'date-fns/esm'

import { useQuery, useMutation } from '@apollo/react-hooks'

import { Dialog, makeStyles, Slide, Box, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'

import {
	ReservationFormEditor,
	ReservationQueue,
} from '@views/Reservation/components'

import { GET_ZALO_INTERESTED_USER_LIST } from '@views/Reservation/gql/query'
import { FETCH_USER_LIST } from '@views/User/gql/query'
import { GET_SELECTED_USER_OF_CHAT } from '@views/Chat/gql/query'
import { CREATE_RESERVATION_REQUEST } from '@views/Reservation/gql/mutation'
import { PAGE_LIMIT, DEFAULT_RESERVATION_PATIENT_ID } from '@src/configs.local'

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

const SendReservationDialog = props => {
	const classes = useStyles()
	const { open, onClose } = props

	const [reservationList, setReservationList] = useState([])
	const { data: dataSelectedUserOfChat } = useQuery(GET_SELECTED_USER_OF_CHAT)
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
	const [createReservationRequest] = useMutation(CREATE_RESERVATION_REQUEST, {
		onError: err => alert(err),
	})

	const handleOnCreateReservation = ({ type, patientId, doctorId, time }) => {
		const doctor = dataUserList.userList.items.filter(
			item => item.id === doctorId
		)
		const patient = dataInterestedUserList.zaloInterestedUserList.items.filter(
			item => item.id === patientId
		)
		const reservation = {
			id: new Date().getTime(),
			type,
			patientId,
			patient: patient[0].displayName,
			doctorId,
			doctor: doctor[0].name,
			time: format(time, 'HH:mm - dd/MM/yyyy'),
			unixTime: time.getTime(),
		}
		setReservationList([reservation, ...reservationList])
	}

	const handleOnSubmit = () => {
		if (reservationList.length) {
			const reservationData = reservationList.map(item => ({
				id: item.doctorId,
				time: item.unixTime,
			}))
			createReservationRequest({
				variables: {
					reservation: {
						patient: dataSelectedUserOfChat.selectedUserOfChat.id,
						doctors: reservationData,
					},
				},
			}).then(() => {
				handleOnCancel()
			})
		}
	}
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
				selectedPatientId={dataSelectedUserOfChat?.selectedUserOfChat?.id}
				patients={dataInterestedUserList?.zaloInterestedUserList?.items ?? []}
				doctors={dataUserList?.userList?.items ?? []}
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
