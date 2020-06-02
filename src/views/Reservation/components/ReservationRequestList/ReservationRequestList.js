import React from 'react'
import { format } from 'date-fns/esm'
import { useQuery } from '@apollo/react-hooks'

import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { InfiniteTable, Loading } from '@views_components'

import { GET_RESERVATION_REQUEST_LIST } from '@views/Reservation/gql/query'
import { PAGE_LIMIT, NETWORK_STATUS_FETCH_MORE } from '@src/configs.local'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		height: '49%',
		border: `1px solid ${theme.palette.common.border}`,
	},
	listtitle: {
		padding: theme.spacing(3),
		fontWeight: 700,
	},
	reservationqueue__table: {
		position: 'relative',
		display: 'flex',
		height: 'calc(100% - 80px)',
	},
}))

const tableHeaders = [
	{ headerLabel: 'PATIENT', xs: 4, headerVariable: 'patient' },
	{ headerLabel: 'DOCTOR', xs: 4, headerVariable: 'doctor' },
	{ headerLabel: 'TIME (HH/MM - DD/MM/YYYY)', xs: 4, headerVariable: 'time' },
]

const ReservationRequestList = () => {
	const classes = useStyles()

	const { loading, error, data, fetchMore, networkStatus } = useQuery(
		GET_RESERVATION_REQUEST_LIST,
		{
			variables: {
				query: {
					limit: PAGE_LIMIT,
				},
			},
			notifyOnNetworkStatusChange: true,
			onError: err => {
				alert(err)
			},
		}
	)

	const convertReservationList = reservationList => {
		const result = []
		reservationList.forEach(reservation => {
			reservation.doctors.forEach(doctor => {
				result.push({
					id: doctor.id,
					patient: reservation.patient?.name ?? '',
					doctor: doctor.name,
					time: format(new Date(parseInt(doctor.time)), 'HH:mm - dd/MM/yyyy'),
				})
			})
		})
		return result
	}

	const loadNextReservationPage = () => {
		try {
			fetchMore({
				variables: {
					query: {
						limit: PAGE_LIMIT,
						skip: data.reservationRequestList.items.length,
					},
				},
				updateQuery: (prev, { fetchMoreResult }) => {
					if (!fetchMoreResult) return prev
					const fetchedReservationRequestList =
						fetchMoreResult.reservationRequestList
					let cacheReservationList = prev.reservationRequestList

					const items = [
						...cacheReservationList.items,
						...fetchedReservationRequestList.items,
					]
					const hasNext = fetchedReservationRequestList.hasNext
					const total =
						cacheReservationList.total + fetchedReservationRequestList.total
					return {
						reservationRequestList: {
							...cacheReservationList,
							items,
							hasNext,
							total,
						},
					}
				},
			})
		} catch (error) {
			alert(error.message)
		}
	}

	if (error) return <div>Error :(</div>

	return (
		<Box className={classes.root}>
			{loading && networkStatus !== NETWORK_STATUS_FETCH_MORE ? (
				<Loading open={true} msg={'Loading...'} />
			) : (
				<>
					<Typography variant='h5' className={classes.listtitle}>
						Reservation request list
					</Typography>
					<Box className={classes.reservationqueue__table}>
						<InfiniteTable
							items={convertReservationList(data.reservationRequestList.items)}
							columns={tableHeaders}
							loadingMore={networkStatus === NETWORK_STATUS_FETCH_MORE}
							loadNextPage={loadNextReservationPage}
							hasNextPage={data.reservationRequestList.hasNext}
						/>
					</Box>
				</>
			)}
		</Box>
	)
}

export default ReservationRequestList
